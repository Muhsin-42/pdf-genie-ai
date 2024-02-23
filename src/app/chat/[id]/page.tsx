import AskGpt from "@/components/AskSection/ask-gpt";
import PdfView from "@/components/ui/pdf-view";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex h-screen ">
      <PdfView clientSessinId={params.id} />
      <AskGpt clientSessinId={params.id} />
    </main>
  );
};

export default page;
