"use client";
import WelcomeMessage from "../main/WelcomeMessage";
import Conversation from "../main/Conversation";
import Loading from "../general/Loading";
import Dropdown from "../main/Dropdown";
import { memo } from "react";
import { useChatContexts } from "@/app/customHooks/useChatContext";

const ContentContainer = () => {
  const { messageContext } = useChatContexts();
  const { hydrated, messages } = messageContext;

  if (!hydrated) {
    return (
      <div className="flex-9 w-5/6 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-9 w-5/6 max-h-9/10 overflow-y-scroll no-scrollbar">
      <Dropdown />
      {hydrated && messages.length > 0 ? <Conversation /> : <WelcomeMessage />}
    </div>
  );
};

export default memo(ContentContainer);
