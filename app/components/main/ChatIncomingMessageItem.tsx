import { memo } from "react";
import { ChatMessage } from "../../utils/interfaces";

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <div
      className={` p-3 w-fit rounded-2xl mb-1 bg-bg-light max-w-4/5 animate-fadeInUp `}
    >
      <p>{message.content}</p>
    </div>
  );
};

export default memo(ChatMessageItem);
