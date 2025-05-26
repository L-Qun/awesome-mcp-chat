import { useState } from "react";
import { Wrench, ChevronUp } from "lucide-react";

interface ToolInvocationInfo {
  toolName: string;
  toolCallId: string;
  args: any;
  state: string;
  step?: number;
  result?: {
    content: any;
  };
}

interface ToolInvocationProps {
  tool: ToolInvocationInfo;
}

const formatContent = (content: any): string => {
  try {
    if (typeof content === "string") {
      try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return content;
      }
    }
    return JSON.stringify(content, null, 2);
  } catch {
    return String(content);
  }
};

export function ToolInvocation({ tool }: ToolInvocationProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`mt-2 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden ${
        !expanded ? "w-fit" : ""
      }`}
    >
      <div
        className={`flex items-center p-2 cursor-pointer bg-white dark:bg-[#444654] ${
          expanded ? "justify-between" : ""
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center mr-2">
          <Wrench className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {tool.toolName}
            </span>
          </div>
        </div>
        <ChevronUp
          className={`w-4 h-4 text-gray-500 transition-transform ${
            expanded ? "" : "rotate-180"
          }`}
        />
      </div>

      {expanded && (
        <div className="p-3 bg-white dark:bg-[#444654]">
          <div className="mb-3">
            <div className="text-gray-500 mb-1">Request</div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-2">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {formatContent(tool.args)}
              </pre>
            </div>
          </div>

          {tool.result && (
            <div>
              <div className="text-gray-500 mb-1">Response</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded p-2">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {formatContent(tool.result)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
