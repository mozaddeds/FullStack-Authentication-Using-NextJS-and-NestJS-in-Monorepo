# 🔐 FullStack Authentication Using NextJS and NestJS in Monorepo

A modern full-stack authentication system built using **Next.js 15** for the frontend and **NestJS 11** for the backend — organized in a monorepo setup using **Turborepo**. The project demonstrates social login (Google), JWT-based session management, secure credential handling, and scalable app architecture for production-ready apps.

---

## ✨ Features

- 🔒 Authentication with **Google OAuth** and **JWT**
- 🧠 Built-in form validation using **Zod**
- 🧱 Monorepo setup using **Turborepo**
- ⚡ Backend with **NestJS**, **Prisma ORM**, and **Passport**
- 🎨 Frontend with **Next.js App Router**, **TailwindCSS**, and **Radix UI**
- 🧪 Unit testing with **Jest**, **Supertest**
- 🔧 Configurable via **dotenv** and **@nestjs/config**
- ☁️ Deployable to **Vercel** or **Netlify**

---

## 🛠️ Tech Stack

### 🔹 Frontend (Next.js 15 – `apps/web`)
- `next`
- `react`, `react-dom`
- `tailwindcss`, `postcss`, `clsx`, `tailwind-merge`, `tw-animate-css`
- `lucide-react`, `@radix-ui/react-label`, `@radix-ui/react-slot`
- Shared UI via `@repo/ui`
- Linting via `eslint`, `@repo/eslint-config`, `prettier`
- TypeScript config via `@repo/typescript-config`

### 🔹 Backend (NestJS 11 – `apps/backend`)
- `@nestjs/common`, `@nestjs/core`, `@nestjs/graphql`, `@nestjs/passport`, `@nestjs/config`
- Authentication with `passport`, `passport-local`, `passport-jwt`, `passport-google-oauth20`
- `@prisma/client`, `argon2` for password hashing
- `rxjs`, `graphql-tools`
- Testing with `jest`, `supertest`, `ts-jest`, `@nestjs/testing`

### 🔹 Shared & Tooling
- `typescript`
- `turbo` for monorepo orchestration
- `eslint`, `prettier`, `@typescript-eslint` for consistent code quality

---

## 🧬 Folder Structure (Monorepo)

root/
├── apps/
│ ├── web/ # Frontend (Next.js)
│ └── backend/ # Backend (NestJS)
├── packages/
│ └── ui/ # Shared UI components (if any)
├── .env
├── turbo.json
├── package.json
└── tsconfig.json
