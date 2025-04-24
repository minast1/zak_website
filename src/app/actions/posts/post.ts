"use server";

import { actionClient } from "../../../lib/safe-action";
import { file, zfd } from "zod-form-data";
import z from "zod";
import { flattenValidationErrors } from "next-safe-action";
import sharp from "sharp";
import { db, storage } from "@/lib/firebase/firebase-admin";
import { firestore } from "firebase-admin";
import { DocumentData } from "firebase-admin/firestore";
import { Post } from "@/lib/types/types";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

const compressAndUploadFileToStorage = async (file: File): Promise<string> => {
  const filename = `${uuidv4()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileType = file.type;

  let compressedBuffer: Buffer;
  try {
    if (fileType.startsWith("image/")) {
      compressedBuffer = await sharp(buffer).jpeg({ quality: 70 }).toBuffer();
    } else {
      // If not image skip compression
      compressedBuffer = buffer;
    }

    const bucket = storage;

    const fileRef = bucket.file(`posts/${filename}`);

    await fileRef.save(compressedBuffer, {
      metadata: {
        contentType: fileType,
      },
      public: true,
    });

    //const publicUrl = `https://storage.googleapis.com/posts/${filename}`;
    return filename;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file");
  }
};

const createPostSchema = zfd.formData({
  file: zfd.file(
    z
      .instanceof(File)
      .refine((file) =>
        [
          "image/png",
          "image/webp",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type)
      )
      .optional()
  ),
  //filename: zfd.text(z.string().optional()),
  title: zfd.text(z.string({ required_error: "This is a required field." })),
  id: zfd.text(z.string().trim().optional()),
  content: zfd.text(
    z.string({ required_error: "Please write something about the post." })
  ),
  tags: zfd.text(
    z
      .string({ required_error: "This is a required field." })
      .trim()
      .regex(
        /^[a-zA-Z0-9]+(?:\s*,\s*[a-zA-Z0-9]+)*$/,
        "Tags must be a comma-separated list of words with no trailing commas or special characters."
      )
  ),
  label: zfd.text(z.string().optional()),
});

export const createPost = actionClient
  .schema(createPostSchema, {
    handleValidationErrorsShape: async (ve, utils) =>
      flattenValidationErrors(ve).fieldErrors,
  })

  .action(async ({ parsedInput: { file, title, content, tags, label } }) => {
    if (!file) {
      //save the post to the database
      let post = {
        title,
        content,
        image: "",
        createdAt: firestore.Timestamp.now(),
        tags: tags.split(",").map((tag) => tag.trim()),
        label: label ? label : "",
      };
      await db.collection("posts").doc().set(post);
      revalidatePath("/");
    }

    if (file) {
      try {
        const filename = await compressAndUploadFileToStorage(file);

        //save the post to the database
        let post = {
          title,
          content,
          createdAt: firestore.Timestamp.now(),
          tags: tags.split(",").map((tag) => tag.trim()),
          label: label ? label : "",
          image: filename,
        };
        await db.collection("posts").doc(filename).set(post);
        revalidatePath("/");
      } catch (error) {
        console.error("Error saving post to database", error);
      }
    }
  });

export const updatePost = actionClient
  .schema(createPostSchema, {
    handleValidationErrorsShape: async (ve, utils) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({ parsedInput: { file, title, content, tags, label, id } }) => {
      try {
        if (id) {
          const postRef = db.collection("posts").doc(id);
          const getPost = await postRef.get();
          const postData = getPost.data();

          let filename = "";

          //updating a post with an image
          if (postData && postData.image?.length > 0 && file) {
            filename = await compressAndUploadFileToStorage(file);

            await storage.file(`posts/${postData.image}`).delete();
          }
          //updating a post without an image with a file
          if (postData && postData.image == "" && file) {
            filename = await compressAndUploadFileToStorage(file);
          }
          //updating a post without an image without a file
          if (!file && postData && postData.image?.length == 0) {
            filename = postData.image;
          }

          let post = {
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            label: label ? label : "",
            image: filename,
          };

          await postRef.update(post);
          revalidatePath("/");
        }
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }
  );

export const fetchPosts = async () => {
  const postsRef = db.collection("posts");
  const snapshot = await postsRef.orderBy("createdAt", "desc").get();
  const posts = snapshot.docs.map((doc) => doc.data());
  interface GetReturnType {
    id: string;
    createdAt: string;
  }
  let data: DocumentData & GetReturnType[] = [];
  snapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
    });
  });
  return data as Post[];
};

export const fetchPostBySlug = async (id: string) => {
  const post = db.collection("posts").doc(id);
  const postRef = await post.get();
  let data: DocumentData;
  if (!postRef.exists) {
    throw new Error("Post with the Id does not exist..");
  } else {
    data = {
      ...postRef.data(),
      id: postRef.id,
      createdAt: postRef.data()?.createdAt.toDate().toISOString(),
    };
    return data;
  }
};

const deleteSchema = z.object({
  ids: z.array(z.string()),
});

export const bulkDeletePosts = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { ids } }) => {
    for (const id of ids) {
      const post = db.collection("posts").doc(id);
      const postRef = await post.get();
      const postData = postRef.data();
      //If image exists for the post
      if (postData && postData.image) {
        await storage.file(`posts/${id}`).delete();
      }
      await post.delete();
    }
    revalidatePath("/");
  });

export const fetchTotalPosts = async () => {
  const postsRef = db.collection("posts");
  const snapshot = await postsRef.orderBy("createdAt", "desc").get();
  return snapshot.size;
};
