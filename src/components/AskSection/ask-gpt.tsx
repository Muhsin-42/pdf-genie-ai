"use client";

import React, { useEffect, useRef } from "react";
import useAsk from "./useAsk";

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
    <section className="relative flex h-full w-6/12 flex-col gap-2 ">
      <div className="flex flex-col overflow-auto pb-32">
        {conversation.map((convo, index) => (
          <div
            className={`${convo.role === "user" ? "user-msg" : "system-msg"}`}
            key={index}
          >
            <p>{convo.content}</p>
          </div>
        ))}
        <div ref={conversationEndRef} />
      </div>
      <form
        className="fixed bottom-2 flex w-full gap-2  px-3"
        onSubmit={handleAsk}
      >
        <input
          type="text"
          placeholder="Don't ask me anything!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-5/12 rounded-full border border-black/20 px-5 py-3 text-black shadow-2xl shadow-red-500"
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
