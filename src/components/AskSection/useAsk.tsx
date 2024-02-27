"use client";
import { IConversation } from "@/Types";
import axios from "@/utils/axios";
import { BASE_URL } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const useAsk = ({ clientSessionId }: { clientSessionId: string }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<IConversation[]>([
    { role: "system", content: "" },
  ]);

  const getConversation = async () => {
    try {
      const { data } = await axios.get(`/conversation/${clientSessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setConversation(data?.data?.conversationHistory);
    } catch (error) {
      toast.error("Something went wrong! Try again!");
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  const handleAsk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() === "" || !prompt)
      return toast.warning("Type something to Ask.");
    setLoading(true);
    setConversation((prev) => [...prev, { role: "user", content: prompt }]);
    try {
      const res = await fetch(`${BASE_URL}/conversation/${clientSessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok || !res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let accumulatedChunks = "";
      const conversationLength = conversation?.length + 1;
      const delay = 150;

      const processChunk = async () => {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) {
          setPrompt("");
          setLoading(false);
          return;
        }

        const decodedChunk = decoder.decode(value);
        accumulatedChunks += decodedChunk;

        setTimeout(() => {
          setConversation((prev) => {
            const updatedConversation = [...prev];
            updatedConversation[conversationLength] = {
              role: "system",
              content: accumulatedChunks,
            };
            return updatedConversation;
          });
          if (!done) processChunk();
        }, delay);
      };

      // Start processing the first chunk
      processChunk();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! Try again!");
      console.log("error ", error);
    }
  };

  return { prompt, setPrompt, conversation, handleAsk, loading };
};

export default useAsk;
