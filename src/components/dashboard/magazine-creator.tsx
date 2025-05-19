"use client";
import React, { useCallback, useEffect } from "react";
import { Info, UploadIcon } from "lucide-react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { format } from "date-fns";
import { publishMagazine } from "@/app/actions/magazines/magazine";

const MagazineCreator = () => {
  const resetForm = () => {
    formRef.current?.reset();
    setCoverImage(null);
    setPdf(null);
    setImagePreview(null);
  };
  const { execute, status, result } = useAction(publishMagazine, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      resetForm();
      toast.success("Magazine Published Successfully", {
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a"),
      });
    },
  });
  const formRef = React.useRef<HTMLFormElement>(null);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const [pdf, setPdf] = React.useState<File | null>(null); //Magazine pdf
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.forEach((file: File) => {
      if (file.type === "application/pdf") {
        setPdf(file);
      } else if (file.type.startsWith("image/")) {
        setCoverImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    });
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
    },
  });

  // Clean up previews to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    formData.append("image", coverImage as File);
    formData.append("pdf", pdf as File);

    execute(formData);
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="px-6 py-6 space-y-6">
        {/* Magazine cover image  */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Upload Magazine Cover Image
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          >
            <input
              {...getInputProps()}
              type="file"
              name="coverImage"
              accept="image/*"
              className="hidden"
              id="coverImage"
            />
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              {isDragActive ? "Drop the image here" : "Upload Image"}
              <UploadIcon className="w-4 h-4 ml-2" />
            </label>
          </div>
          {imagePreview ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded overflow-hidden flex flex-col gap-1">
                <img
                  src={imagePreview}
                  alt={"Magazine Cover Image"}
                  className="w-full h-40 object-cover"
                />
                <p className="text-center text-sm p-1 truncate">
                  {coverImage?.name}
                </p>
              </div>
            </div>
          ) : result.validationErrors?.image && coverImage === null ? (
            <p className=" text-sm text-red-600 font-semibold">
              {result.validationErrors.image}
            </p>
          ) : null}
        </div>

        {/* Magazine pdf */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Upload Magazine Pdf
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          >
            <input
              {...getInputProps()}
              type="file"
              name="featuredImage"
              accept="application/pdf, image/*"
              className="hidden"
              id="featuredImage"
            />
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              {isDragActive ? "Drop the image here" : "Upload Pdf"}
              <UploadIcon className="w-4 h-4 ml-2" />
            </label>
          </div>
          {pdf ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <p className="text-center text-sm p-1 truncate">{pdf?.name}</p>
            </div>
          ) : result.validationErrors?.pdf && pdf === null ? (
            <p className=" text-sm text-red-600 font-semibold">
              {result.validationErrors.pdf}
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {status === "executing" ? "Publishing..." : "Publish Magazine"}
        </button>
      </div>
    </form>
  );
};

export default MagazineCreator;
