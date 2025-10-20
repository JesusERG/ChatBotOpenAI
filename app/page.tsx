"use client";
import ContentContainer from "./components/containers/ContentContainer";
import UserInputContainer from "./components/containers/UserInputContainer";
import MessageProvider from "./context/MessageContext";
import IncomingMessageProvider from "./context/IncomingMessageContext";
import LoadingProvider from "./context/LoadingContext";
import ModelContext from "./context/ModelContext";

export default function Home() {
  return (
    <ModelContext>
      <LoadingProvider>
        <IncomingMessageProvider>
          <MessageProvider>
            <div className="flex justify-center items-center h-screen bg-bg-dark flex-col">
              <ContentContainer />
              <UserInputContainer />
            </div>
          </MessageProvider>
        </IncomingMessageProvider>
      </LoadingProvider>
    </ModelContext>
  );
}
