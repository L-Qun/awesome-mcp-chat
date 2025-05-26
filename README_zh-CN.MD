# Awesome MCP Chat

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

使用其他语言阅读：[English](./README.MD) | 简体中文

一个为模型上下文协议 (MCP) 工具打造的智能聊天交互界面。

## 简介

Awesome MCP Chat 是一个基于 Next.js 构建的现代化 Web 应用，旨在提供一个直观、高效的界面，让用户能够轻松地与实现了模型上下文协议 (MCP) 的 AI 工具进行交互。本项目支持连接多个 MCP 服务，聚合其提供的工具，并通过一个统一的聊天界面进行调用和展示结果。

## 主要功能

- **MCP Server 支持**: 可配置连接到多个 MCP 服务器，动态加载和使用其提供的工具。
- **多种模型支持**: 允许用户选择不同的语言模型进行交互。
- **用户认证**: 集成 Clerk 实现用户登录和注册，确保用户数据的安全。
- **聊天历史**: 保存用户的聊天记录，方便回顾和继续之前的对话。

## 技术栈

- **框架**: [Next.js](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lucide React](https://lucide.dev/) (图标库)
- **状态管理**: [Jotai](https://jotai.org/)
- **数据请求与缓存**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **用户认证**: [Clerk](https://clerk.com/)
- **数据库 ORM (如果适用)**: [Drizzle ORM](https://orm.drizzle.team/)
- **代码规范**: ESLint, Prettier

## 项目演示

我们准备了一个简短的视频来演示 Awesome MCP Chat 的核心功能：

https://github.com/user-attachments/assets/0b515bce-73b5-4cd4-8f2a-1ac2b9e0bd27

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) (版本 >= 18.x)
- [pnpm](https://pnpm.io/) (或 npm/yarn)

### 安装与运行

1.  **克隆项目到本地:**

    ```bash
    git clone https://github.com/yourusername/awesome-mcp-chat.git
    cd awesome-mcp-chat
    ```

2.  **安装依赖:**

    ```bash
    pnpm install
    ```

3.  **配置环境变量:**

    复制 `.env.local.example` 文件为 `.env.local`，并根据您的实际情况填写必要的环境变量，例如：

    - Clerk 相关的 Key (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
    - 数据库连接信息 (如果您使用了数据库)

    ```bash
    cp .env.local.example .env.local
    ```

    编辑 `.env.local` 文件。

4.  **获取 API 密钥:**

    要使用 Awesome MCP Chat 中集成的各种 AI 模型，您需要从其各自的提供商处获取 API 密钥。以下是每个提供商的链接：

    - OpenAI (GPT 模型): https://platform.openai.com/api-keys

    - Anthropic (Claude 模型): https://console.anthropic.com/settings/keys

    - Google (Gemini 模型): https://aistudio.google.com/app/apikey

5.  **运行数据库迁移:**
    如果您使用了 Drizzle ORM 并定义了数据库 schema，请运行迁移命令：

    ```bash
    pnpm db:push
    ```

6.  **运行开发服务器:**

    ```bash
    pnpm dev
    ```

7.  **构建项目:**

    ```bash
    pnpm build
    ```

8.  **启动生产服务器:**
    ```bash
    pnpm start
    ```

## 如何贡献

我们欢迎各种形式的贡献！如果您有任何建议、发现 Bug 或想添加新功能，请随时：

1.  Fork 本仓库
2.  创建您的 Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  Push 到 Branch (`git push origin feature/AmazingFeature`)
5.  提交一个 Pull Request

## 许可证

本项目采用 [MIT 许可证](./LICENSE)。

---

感谢您对 Awesome MCP Chat 的关注！
