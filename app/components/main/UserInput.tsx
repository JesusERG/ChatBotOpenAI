"use client";
import { useState, memo, useEffect, useContext, useRef } from "react";
import { useChatContexts } from "@/app/customHooks/useChatContext";
import { IconSend, IconClear } from "@/app/assets/Icons";
import ErrorModal from "../general/ErrorModal";
import { ModelContext } from "@/app/context/ModelContext";

const UserInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Controler to abort request in case the user clears the message hystory mid fetch
  const controllerRef = useRef<AbortController | null>(null);

  const model = useContext(ModelContext);
  const { messageContext, incomingMessageContext, loadingContext } =
    useChatContexts();

  const { messages, setMessages } = messageContext;
  const { setIncomingMessage } = incomingMessageContext;
  const { loadingState, setLoadingState } = loadingContext;

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (prompt.trim() === "") return;

    setLoadingState(true);

    // Abort any previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create new AbortController
    const controller = new AbortController();
    controllerRef.current = controller;

    const newMessages = [...messages, { role: "user", content: prompt }];
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
    ]);
    setPrompt("");

    try {
      const response = await fetch("../../api/chat", {
        method: "POST",
        body: JSON.stringify({
          model: model?.model,
          messages: newMessages,
        }),
        signal: controller.signal, // 👈 attach the controller
      });

      if (!response.body) return;

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      setLoadingState(false);

      let incomingMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: incomingMessage },
          ]);
          setIncomingMessage("");
          break;
        }
        if (value) {
          incomingMessage += value;
          setIncomingMessage(incomingMessage);
        }
      }
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Aborted");
      } else {
        console.error("Error:", error);
        setIsModalOpen(true);
      }
    } finally {
      setLoadingState(false);
      controllerRef.current = null; // clean up
    }
  };

  const handleClear = () => {
    // 👇 Cancel any ongoing request
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }

    localStorage.removeItem("messages");
    setMessages([]);
    setIncomingMessage("");
    setLoadingState(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form
      className="flex flex-1 w-full items-center justify-center gap-3 my-3"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="Input a prompt..."
        className="bg-bg-light rounded-xl field-sizing-content max-h-40 w-9/10 p-2 overflow-y-scroll no-scrollbar resize-none shadow-md shadow-border"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loadingState}
      />

      <button
        type="submit"
        className={`button-base bg-primary ${
          loadingState ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loadingState}
      >
        <span className="hidden lg:inline">Submit</span>
        <IconSend />
      </button>

      <button
        type="button"
        className="button-base bg-warning"
        onClick={handleClear}
      >
        <span className="hidden lg:inline">Clear</span>
        <IconClear />
      </button>

      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>An error has occurred</h3>
        <p>Please try submitting your prompt again.</p>
      </ErrorModal>
    </form>
  );
};

export default memo(UserInput);
