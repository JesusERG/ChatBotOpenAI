export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface MessageContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  hydrated: boolean;
}

export interface IncomingMessageContextType {
  incomingMessage: string;
  setIncomingMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface LoadingContextType {
  loadingState: boolean;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModelContextType {
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}
