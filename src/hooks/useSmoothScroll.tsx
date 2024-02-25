import { IConversation } from "@/Types";
import { useEffect, useRef } from "react";

const useSmoothScroll = (conversation: IConversation[]) => {
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationEndRef.current)
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return { conversationEndRef };
};

export default useSmoothScroll;
