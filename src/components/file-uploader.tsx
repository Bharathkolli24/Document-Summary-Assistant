"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type FileUploaderProps = {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
};

export default function FileUploader({ onFileSelect, isProcessing }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError("");

    const file = acceptedFiles[0];
    if (!file) return;

    const validTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!validTypes.includes(file.type)) {
      setError("Only PDF, JPG, and PNG files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Max file size is 10MB.");
      return;
    }

    onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer transition-all",
          dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30 hover:border-primary",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} disabled={isProcessing} />

        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-primary" />
          <p className="font-medium text-lg">Drag & Drop your file here</p>
          <p className="text-sm text-muted-foreground">or click to select PDF / JPG / PNG</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
}
