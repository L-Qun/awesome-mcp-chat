import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ReasoningProps {
  reasoning: string;
}

export function Reasoning({ reasoning }: ReasoningProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="my-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-t-md"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Reasoning
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Hide Reasoning
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show Reasoning
            </>
          )}
        </button>
      </div>

      {expanded && (
        <div className="p-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 whitespace-pre-wrap">
          {reasoning}
        </div>
      )}
    </div>
  );
}
