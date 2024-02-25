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
      console.log("data", data?.data);
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
      while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) break;

        const decodedChunk = decoder.decode(value);
        console.log(decodedChunk);
        accumulatedChunks += decodedChunk; // Accumulate chunks
        setConversation((prev) => {
          const updatedConversation = [...prev];
          updatedConversation[conversationLength] = {
            role: "system",
            content: accumulatedChunks,
          };
          return updatedConversation;
        });
      }

      console.log("Prompt sent successfully");
      setPrompt("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
    }
  };

  return { prompt, setPrompt, conversation, handleAsk, loading };
};

export default useAsk;
