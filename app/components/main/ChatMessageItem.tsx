import { memo } from "react";
import { ChatMessage } from "../../utils/interfaces";

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <div
      className={` p-3 w-fit rounded-2xl my-2  ${message.role === "user" ? "bg-primary max-w-4/5 self-end animate-fadeInUp " : "bg-bg-light max-w-4/5"}`}
    >
      <p className={`${message.role === "user" && "user-message-text"}`}>
        {message.content}
      </p>
    </div>
  );
};

export default memo(ChatMessageItem);
