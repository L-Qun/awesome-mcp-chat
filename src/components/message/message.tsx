import type { Message } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { ToolInvocation } from "./tool-invocation";
import { Text } from "./text";
import { Reasoning } from "./reasoning";

interface MessageProps {
  message: Message;
}

export function Message({ message }: MessageProps) {
  return (
    <motion.div
      key={message.id}
      className={`max-w-3xl mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div
        className={`flex items-start gap-4 ${
          message.role === "user" ? "justify-end" : ""
        }`}
      >
        <div
          className={`${
            message.role === "user" ? "max-w-[80%]" : "max-w-[90%]"
          }`}
        >
          <div
            className={`prose prose-sm max-w-none dark:prose-invert rounded-lg p-3`}
          >
            {message.parts?.map((part, index) => {
              switch (part.type) {
                case "text":
                  return (
                    <Text
                      key={`${message.id}-text-${index}`}
                      text={part.text}
                      role={message.role}
                    />
                  );
                case "tool-invocation":
                  return (
                    <ToolInvocation
                      key={`${message.id}-tool-${index}`}
                      tool={part.toolInvocation}
                    />
                  );
                case "reasoning":
                  return (
                    <Reasoning
                      key={`${message.id}-reasoning-${index}`}
                      reasoning={part.reasoning}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
