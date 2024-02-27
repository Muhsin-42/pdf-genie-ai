"use client";
import { validateFile } from "@/utils";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const useDropZone = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [loading, setLoading] = useState({ state: false, msg: "" });
  const router = useRouter();

  useEffect(() => {
    if (acceptedFiles[0]) {
      console.log("uploading....");
      handleSubmit();
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    <li key={file?.name}>
      {file?.name} - {file.size} bytes
    </li>
  ));

  const handleSubmit = async () => {
    if (!acceptedFiles[0]) {
      toast.error("Please select a file.");
      return;
    }
    if (!validateFile(acceptedFiles[0])) return;
    setLoading({ state: true, msg: "Processing" });
    setTimeout(() => setLoading({ state: true, msg: "Analyzing" }), 1000);
    const formData = new FormData();
    formData.append("pdf", acceptedFiles[0]);
    try {
      const { data } = await axios.post("/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("sessionId", data?.data?.sessionId);
      router.push(`/chat/${data?.data?.sessionId}`);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setLoading({ state: false, msg: "" });
    }
  };

  return {
    handleSubmit,
    files,
    acceptedFiles,
    getRootProps,
    getInputProps,
    loading,
  };
};

export default useDropZone;
