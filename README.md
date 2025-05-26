# Awesome MCP Chat

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Read this in other languages: English | [简体中文](./README_zh-CN.MD)

An intelligent chat interface designed for seamless interaction with Model Context Protocol (MCP) tools.

## Introduction

Awesome MCP Chat is a modern web application built with Next.js. It provides an intuitive and efficient platform for users to easily engage with AI tools that implement the Model Context Protocol (MCP). This project facilitates connections to multiple MCP services, aggregates their diverse tools, and enables users to invoke them through a unified chat interface, with results clearly displayed.

## Key Features

- **MCP Server Integration**: Configure connections to multiple MCP servers, allowing for dynamic loading and utilization of their provided tools.
- **Multi-Model Support**: Empowers users to select from various language models for their interactions.
- **Secure User Authentication**: Leverages Clerk for robust user login and registration, ensuring data privacy and security.
- **Persistent Chat History**: Saves user chat records, enabling easy review and continuation of past conversations.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Libraries & Tools**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/) (for accessible UI components)
  - [Framer Motion](https://www.framer.com/motion/) (for animations)
  - [Lucide React](https://lucide.dev/) (Icon library)
- **State Management**: [Jotai](https://jotai.org/)
- **Data Fetching & Caching**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **User Authentication**: [Clerk](https://clerk.com/)
- **Database ORM (if applicable)**: [Drizzle ORM](https://orm.drizzle.team/)
- **Code Quality**: ESLint, Prettier

## Project Demo

A brief video demonstration of Awesome MCP Chat's core functionalities:

https://github.com/user-attachments/assets/09976480-ed66-413a-9ef6-f85079cfa593

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version >= 18.x recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation and Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/awesome-mcp-chat.git
    cd awesome-mcp-chat
    ```

2.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env.local` file by copying `.env.local.example`. Update it with your specific environment variables:

    - Clerk authentication keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
    - Database connection string (if applicable)

    ```bash
    cp .env.local.example .env.local
    ```

    Then, edit the `.env.local` file with your credentials.

4.  **Obtaining API Keys:**

    To use the various AI models integrated into Awesome MCP Chat, you will need to obtain API keys from their respective providers. Below are links for each:

    - OpenAI (GPT models): https://platform.openai.com/api-keys

    - Anthropic (Claude models): https://console.anthropic.com/settings/keys

    - Google (Gemini models): https://aistudio.google.com/app/apikey

5.  **Run Database Migrations (if applicable):**
    If you're using Drizzle ORM and have defined a database schema, apply migrations:

    ```bash
    pnpm db:push
    ```

6.  **Start the Development Server:**

    ```bash
    pnpm dev
    ```

    The application will be accessible at `http://localhost:3000` (or your configured port).

7.  **Build for Production:**

    ```bash
    pnpm build
    ```

8.  **Run in Production Mode:**
    ```bash
    pnpm start
    ```

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or want to introduce new features, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/YourAmazingFeature`).
3.  Commit your changes (`git commit -m 'Add YourAmazingFeature'`).
4.  Push to your branch (`git push origin feature/YourAmazingFeature`).
5.  Submit a Pull Request.

## License

This project is licensed under the [MIT License](./LICENSE).

---

Thank you for checking out Awesome MCP Chat!
