"use client";
import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface IConversaton {
  role: "system" | "user";
  content: string;
}

const useAsk = ({ clientSessinId }: { clientSessinId: string }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [conversation, setConversation] = useState<IConversaton[]>([]);

  const getConversation = async () => {
    try {
      const { data } = await axios.get(`/conversation/${clientSessinId}`, {
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
    try {
      const { data } = await axios.post(
        `/conversation/${clientSessinId}`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConversation(data?.data?.conversationHistory);
      setLoading(false);
      setPrompt("");
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
    }
  };
  return { prompt, setPrompt, conversation, handleAsk, loading };
};

export default useAsk;
