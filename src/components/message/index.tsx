import { Message as UIMessage } from "@ai-sdk/react";

import { Message } from "./message";

interface MessageProps {
  messages: UIMessage[];
}

export function Messages({ messages }: MessageProps) {
  return (
    <div
      className="h-full overflow-y-auto p-4 space-y-6 scroll-smooth"
      id="message-container"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No messages yet. Start chatting!
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      )}
    </div>
  );
}
