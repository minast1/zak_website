"use client";

import React, { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Info, UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { PreviewFile } from "@/lib/types/types";
import { createPost } from "@/app/actions/posts/post";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { format } from "date-fns";

const RTEditor = dynamic(() => import("@/components/dashboard/editor"), {
  ssr: false,
});
const PostEditor = () => {
  const { execute, status, result } = useAction(createPost, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      formRef.current?.reset();
      setFile([]);
      setPreviewFile([]);
      setContent("");
      toast.success("Post created successfully", {
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a"),
      });
    },
  });
  const formRef = React.useRef<HTMLFormElement>(null);
  const [file, setFile] = React.useState<File[]>([]);
  const [previewFile, setPreviewFile] = React.useState<PreviewFile[]>([]);
  const [content, setContent] = React.useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const previewFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setPreviewFile(previewFiles);
    setFile(acceptedFiles);
  }, []);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });

  // Clean up previews to avoid memory leaks
  useEffect(() => {
    return () => {
      previewFile.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [previewFile]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("tags") as string);
    formData.append("content", content);
    file.forEach((file) => formData.append("file", file));

    execute(formData);
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="px-6 py-6 space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your post title..."
          />
          {result.validationErrors?.title && (
            <p className=" text-sm text-red-600">
              {result.validationErrors.title}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            name="label"
            id="label"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your post title..."
          />
          {result.validationErrors ? (
            <p className=" text- text-red-600">
              {result.validationErrors.label}
            </p>
          ) : (
            <p className=" text-xs flex items-center gap-1">
              <Info className="w-4 h-4" /> This field is optional.
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Featured Image/Video
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          >
            <input
              {...getInputProps()}
              type="file"
              name="featuredImage"
              accept="image/*"
              className="hidden"
              id="featuredImage"
            />
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              {isDragActive ? "Drop the image here" : "Upload File"}
              <UploadIcon className="w-4 h-4 ml-2" />
            </label>
          </div>
          {previewFile.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewFile.map((file) => (
                <div
                  key={file.name}
                  className="border rounded overflow-hidden flex flex-col gap-1"
                >
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-40 object-cover"
                  />
                  <p className="text-center text-sm p-1 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <RTEditor content={content} setContent={setContent} />
        {result.validationErrors?.content && (
          <p className=" text-sm text-red-600">
            {result.validationErrors.content}
          </p>
        )}

        <div className="space-y-1">
          <label htmlFor="tags" className="text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter tags separated by commas..."
          />
          {result.validationErrors?.tags && (
            <p className=" text-sm text-red-600">
              {result.validationErrors.tags}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {status === "executing" ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </form>
  );
};

export default PostEditor;
