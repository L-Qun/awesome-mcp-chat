import { atomWithStorage } from "jotai/utils";

export interface Tool {
  name: string;
  description: string;
}

export interface ServerConfig {
  id: string;
  name: string;
  type: "sse" | "stdio";
  url?: string;
  command?: string;
  args?: string;
  tools?: Tool[];
  connected: boolean;
  env?: Record<string, string>;
}

const DEFAULT_CONFIG = `{
  "mcpServers": {
    "My Server": {
      "command": "python",
      "args": [
        "-m", "mcp_server"
      ],
      "env": {
        "API_KEY": "YOUR_API_KEY"
      }
    }
  }
}`;

export interface McpServerConfig {
  rawConfig: string;
  mcpServers: ServerConfig[];
}

export const mcpServerConfigAtom = atomWithStorage<McpServerConfig>(
  "mcp-server-config",
  {
    rawConfig: DEFAULT_CONFIG,
    mcpServers: [],
  }
);
