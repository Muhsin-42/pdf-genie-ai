"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PdfView({ clientSessionId }: { clientSessionId: string }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const router = useRouter();
  const getPdfUrl = async () => {
    try {
      const { data } = await axios.get(`/pdf/${clientSessionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPdfUrl(data?.data?.pdfUrl);
    } catch (error) {
      router.push("/");
      console.log("ERROR PDF FETCHING", error);
    }
  };

  useEffect(() => {
    getPdfUrl();
  }, [clientSessionId]);

  return (
    <section className="hidden w-6/12 sm:block ">
      {pdfUrl.trim() !== "" ? (
        <iframe
          allowFullScreen
          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
          className="h-screen w-full"
          loading="lazy"
        ></iframe>
      ) : (
        <div className="space-y-5 p-5 h-full">
          <div className=" p-4 h-full w-full rounded-lg shadow-2xl bg-gradient-to-r from-slate-200 via-gray-300 to-gray-200 animate-pulse"></div>
        </div>
      )}
    </section>
  );
}

export default PdfView;
