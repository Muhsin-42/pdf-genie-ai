"use client";
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaInbox } from "react-icons/fa";
import useDropZone from "./use-drop-zone";

const DropZoneComp = () => {
  const { files, getInputProps, getRootProps, loading } = useDropZone();

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
