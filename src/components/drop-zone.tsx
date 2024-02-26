"use client";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { BiLoaderCircle } from "react-icons/bi";
import { FaInbox } from "react-icons/fa";

const DropZoneComp = () => {
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
    setLoading({ state: true, msg: "Processing" });
    setTimeout(() => setLoading({ state: true, msg: "Analyzing" }), 1000);
    if (!acceptedFiles[0]) {
      toast.error("Please select a file.");
      return;
    }
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

  return (
    <section className=" flex  flex-col items-end justify-end">
      <div
        {...getRootProps({
          className:
            "dropzone border-4 rounded-lg border-dashed border-black/30 py-12 cursor-move w-full",
        })}
      >
        <input {...getInputProps()} />
        {loading.state ? (
          <p className="flex items-center justify-center gap-3 text-center text-lg ">
            {loading.msg}{" "}
            <BiLoaderCircle className={"animate-spin"} size={"1.5rem"} />
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <FaInbox size={"3rem"} className="text-black/30" />
            <p className="text-center">Drop The Pdf Here, or click to select</p>
          </div>
        )}
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default DropZoneComp;
