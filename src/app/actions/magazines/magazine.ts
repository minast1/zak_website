"use server";

import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { db, storage } from "@/lib/firebase/firebase-admin";
import { firestore } from "firebase-admin";
import { DocumentData } from "firebase-admin/firestore";
import { Magazine, Post } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

const compressAndUploadFileToStorage = async (
  file: File,
  location: string
): Promise<string> => {
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

    const fileRef = bucket.file(`${location}/${filename}`);

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

const createMagazineSchema = zfd.formData({
  image: zfd.file(
    z
      .instanceof(File)
      .refine(
        (file) =>
          ["image/png", "image/webp", "image/jpeg", "image/jpg"].includes(
            file.type
          ),
        { message: "Please upload a valid image file." }
      )
  ),

  pdf: zfd.file(
    z
      .instanceof(File, { message: "Please add a file to upload" })
      .refine((file) => ["application/pdf"].includes(file.type), {
        message: "Please upload a valid pdf file.",
      })
  ),
});

export const publishMagazine = actionClient
  .schema(createMagazineSchema, {
    handleValidationErrorsShape: async (ve, utils) =>
      flattenValidationErrors(ve).fieldErrors,
  })

  .action(async ({ parsedInput: { image, pdf } }) => {
    const coverImage = await compressAndUploadFileToStorage(
      image,
      "coverImages"
    );
    const magazine = await compressAndUploadFileToStorage(pdf, "magazines");

    let publication = {
      coverImage: coverImage,
      pdf: magazine,
      createdAt: firestore.Timestamp.now(),
    };
    await db.collection("magazines").doc().set(publication);
    revalidatePath("/");
    return {
      success: true,
    };
  });

export const fetchMagazines = async () => {
  const postsRef = db.collection("magazines");
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
  return data as Magazine[];
};

const deleteMagazineSchema = z.object({
  id: z.string(),
});
export const deleteMagazine = actionClient
  .schema(deleteMagazineSchema)
  .action(async ({ parsedInput: { id } }) => {
    const magazine = db.collection("magazines").doc(id);
    const magazineRef = await magazine.get();
    const magazineData = magazineRef.data();
    await Promise.all([
      storage.file(`magazines/${magazineData?.pdf}`).delete(),
      storage.file(`coverImages/${magazineData?.coverImage}`).delete(),
      magazine.delete(),
    ]);

    revalidatePath("/");
  });

async (id: string) => {
  await db.collection("magazines").doc(id).delete();
  revalidatePath("/");
};

export const fetchTotalMagazines = async () => {
  const postsRef = db.collection("magazines");
  const snapshot = await postsRef.orderBy("createdAt", "desc").get();
  return snapshot.size;
};
