import useSmoothScroll from "@/hooks/useSmoothScroll";
import { INITIAL_MSG } from "@/utils/constants";
import React from "react";
import { IConversation } from "@/Types";

const Answers = ({ conversation }: { conversation: IConversation[] }) => {
  const { conversationEndRef } = useSmoothScroll(conversation);

  return (
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
  );
};

export default Answers;
