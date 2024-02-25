"use client";

import React from "react";
import useAsk from "./useAsk";
import Answers from "./answers";

const AskGpt = ({ clientSessionId }: { clientSessionId: string }) => {
  const { conversation, handleAsk, prompt, setPrompt, loading } = useAsk({
    clientSessionId,
  });
  return (
    <section className="relative flex size-full flex-col gap-2 sm:w-6/12 ">
      <Answers conversation={conversation} />
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
