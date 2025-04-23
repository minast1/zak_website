"use server";

import { actionClient } from "../../../lib/safe-action";
import { zfd } from "zod-form-data";
import z from "zod";
import { flattenValidationErrors } from "next-safe-action";
import sharp from "sharp";
import { db, storage } from "@/lib/firebase/firebase-admin";
import { firestore } from "firebase-admin";
import { DocumentData } from "firebase-admin/firestore";

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
  title: zfd.text(z.string({ required_error: "This is a required field." })),
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
        createdAt: firestore.FieldValue.serverTimestamp(),
        tags: tags.split(",").map((tag) => tag.trim()),
        label: label ? label : "",
      };
      await db.collection("posts").doc().set(post);
    }

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileType = file.type;

      let compressedBuffer: Buffer;
      try {
        if (fileType.startsWith("image/")) {
          compressedBuffer = await sharp(buffer)
            .jpeg({ quality: 70 })
            .toBuffer();
        } else {
          // If not image skip compression
          compressedBuffer = buffer;
        }

        const bucket = storage;
        const filename = `${Date.now()}-${file.name}`;
        const fileRef = bucket.file(`posts/${filename}`);

        await fileRef.save(compressedBuffer, {
          metadata: {
            contentType: fileType,
          },
          public: true,
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

        //save the post to the database
        let post = {
          title,
          content,
          createdAt: firestore.FieldValue.serverTimestamp(),
          tags: tags.split(",").map((tag) => tag.trim()),
          label: label ? label : "",
          image: publicUrl,
        };
        await db.collection("posts").doc(filename).set(post);
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }
  });

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
  return data;
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
