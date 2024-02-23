"use client";

import React, { useEffect, useRef } from "react";
import useAsk from "./useAsk";
import { INITIAL_MSG } from "@/utils/constants";

const AskGpt = ({ clientSessinId }: { clientSessinId: string }) => {
  const { conversation, handleAsk, prompt, setPrompt, loading } = useAsk({
    clientSessinId,
  });
  const conversationEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  return (
    <section className="relative flex size-full flex-col gap-2 sm:w-6/12 ">
      <div className="flex flex-col overflow-auto pb-32">
        <div
          className={"system-msg"}
          dangerouslySetInnerHTML={{
            __html: INITIAL_MSG.replace(/\n/g, "<br />"),
          }}
        />
        {Array.isArray(conversation) &&
          conversation?.map((convo, index) => (
            <div
              key={index}
              className={`${convo.role === "user" ? "user-msg" : "system-msg"}`}
              dangerouslySetInnerHTML={{
                __html: convo.content.replace(/\n/g, "<br />"),
              }}
            />
          ))}
        <div ref={conversationEndRef} />
      </div>
      <form
        className="fixed bottom-3 flex w-full gap-2  px-3"
        onSubmit={handleAsk}
      >
        <input
          type="text"
          placeholder="Don't ask me anything!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-9/12 rounded-full border border-black/20 px-5 py-3 text-black shadow-2xl shadow-red-500 sm:w-4/12 lg:w-5/12"
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          Ask
          {loading && <span className="loader-primary"></span>}
        </button>
      </form>
    </section>
  );
};

export default AskGpt;
