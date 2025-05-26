import { Message as UIMessage } from "@ai-sdk/react";

import { Message } from "./message";

interface MessageProps {
  messages: UIMessage[];
}

export function Messages({ messages }: MessageProps) {
  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
      id="message-container"
    >
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}
