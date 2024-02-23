"use client";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "sonner";

const fileTypes = ["PDF"];

const UploadForm = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (file: any) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    try {
      const { data } = await axios.post("/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("sessionId", data?.data?.sessionId);
      localStorage.setItem("pdfUrl", data?.data?.pdfUrl);
      router.push(`/chat/${data?.data?.sessionId}`);
      toast.success("File uploaded successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  return (
    <section className="mt-28">
      <div className=" !z-50 m-auto w-5/12 rounded-2xl bg-white/10 p-10 py-16 shadow-2xl">
        <h2 className="mb-4 text-center text-2xl font-bold">PdfGenie</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 space-y-4">
          <FileUploader
            handleChange={handleFileChange}
            name="pdf"
            types={fileTypes}
            dropMessageStyle={{ backgroundColor: "red" }}
            className="rounded border p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="btn-primary !gap-5"
            disabled={loading}
          >
            Upload
            {loading && <span className="loader-primary"></span>}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadForm;
