"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PdfView({ clientSessinId }: { clientSessinId: string }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const router = useRouter();
  console.log("clientSiesss ", clientSessinId);
  const getPdfUrl = async () => {
    try {
      const { data } = await axios.get(`/pdf/${clientSessinId}`, {
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
  }, []);

  return (
    <section className="hidden w-6/12 sm:block">
      <iframe
        allowFullScreen
        src={`${pdfUrl}`}
        className="h-screen w-full"
        loading="lazy"
      ></iframe>
    </section>
  );
}

export default PdfView;
