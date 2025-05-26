import { useAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";

import {
  McpServerConfig,
  mcpServerConfigAtom,
  ServerConfig,
} from "@/atoms/mcp";
import { useToast } from "@/components/toast";

type ServerType = "stdio" | "sse";

const getServerType = (config: ServerConfig): ServerType => {
  return config.command ? "stdio" : "sse";
};

export function useMcpServer() {
  const [{ mcpServers, rawConfig }, setMcpConfig] =
    useAtom(mcpServerConfigAtom);
  const toast = useToast();

  const addServersMutation = useMutation({
    mutationFn: async () => {
      if (!rawConfig.trim()) {
        throw new Error("Please enter valid JSON configuration");
      }

      const config: McpServerConfig = JSON.parse(rawConfig);

      if (!config.mcpServers || typeof config.mcpServers !== "object") {
        throw new Error("Configuration must include mcpServers object");
      }

      const created: Array<{ name: string; cfg: ServerConfig; result: any }> =
        [];

      await Promise.all(
        Object.entries(config.mcpServers).map(async ([name, serverCfg]) => {
          if (mcpServers.some((server) => server.name === name)) return;

          const response = await fetch("/api/mcp", {
            method: "POST",
            body: JSON.stringify({ server: serverCfg }),
          });

          const result = await response.json();
          created.push({ name, cfg: serverCfg, result });
        })
      );

      return created;
    },
    onSuccess: (created) => {
      setMcpConfig((prev) => ({
        ...prev,
        mcpServers: [
          ...prev.mcpServers,
          ...created.map(({ name, cfg, result }) => ({
            ...cfg,
            id: `server-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 9)}`,
            name,
            type: getServerType(cfg),
            tools: result.tools ?? [],
            connected: true,
          })),
        ],
      }));
      toast.show("Server configuration added successfully", "success");
      return true;
    },
    onError: (err: unknown) => {
      toast.show(`Failed to add servers: ${(err as Error).message}`, "error");
      return false;
    },
  });

  const deleteServer = (id: string) => {
    setMcpConfig((config) => ({
      ...config,
      mcpServers: config.mcpServers.filter((config) => config.id !== id),
    }));
  };

  const toggleServer = (id: string) => {
    setMcpConfig((config) => ({
      ...config,
      mcpServers: config.mcpServers.map((config) => {
        if (config.id === id) {
          return { ...config, connected: !config.connected };
        }
        return config;
      }),
    }));
  };

  const updateRawConfig = (newConfig: string) => {
    setMcpConfig((config) => ({
      ...config,
      rawConfig: newConfig,
    }));
  };

  return {
    mcpServers,
    rawConfig,
    addServer: addServersMutation.mutateAsync,
    deleteServer,
    toggleServer,
    updateRawConfig,
    isAddingServer: addServersMutation.isPending,
  };
}
