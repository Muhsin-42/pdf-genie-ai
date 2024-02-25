import AskGpt from "@/components/AskSection/ask-gpt";
import PdfView from "@/components/pdf-view";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  console.log("id ", params);
  return (
    <main className="flex h-screen ">
      <PdfView clientSessionId={params.id} />
      <AskGpt clientSessionId={params.id} />
    </main>
  );
};

export default page;
