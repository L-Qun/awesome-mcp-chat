import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { NextResponse } from "next/server";

import { VERSION } from "@/constants/common";

export interface IMcpServer {
  name: string;
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, string>;
}

export async function POST(req: Request) {
  try {
    const { server } = await req.json();

    const client = new Client({
      name: "AWESOME MCP CHAT",
      version: VERSION,
    });

    let transport: StdioClientTransport | SSEClientTransport;

    if (server.command) {
      transport = new StdioClientTransport({
        command: server.command,
        args: server.args,
        env: server.env,
      });
    } else {
      transport = new SSEClientTransport(new URL(server.url!));
    }

    await client.connect(transport, { timeout: 10 * 60 * 1000 });

    const { tools } = await client.listTools();

    return NextResponse.json({ tools });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to connect to MCP server" },
      { status: 500 }
    );
  }
}
