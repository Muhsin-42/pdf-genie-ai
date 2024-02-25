import React from "react";
import DropZoneComp from "./drop-zone";

const UploadForm = () => {
  return (
    <section className="mt-28">
      <div className=" !z-50 m-auto w-10/12 rounded-2xl bg-white/10 p-10 py-16 shadow-2xl sm:w-9/12 md:w-5/12">
        <h2 className="mb-4 text-center text-2xl font-bold">PdfGenie</h2>
        <DropZoneComp />
      </div>
    </section>
  );
};

export default UploadForm;
