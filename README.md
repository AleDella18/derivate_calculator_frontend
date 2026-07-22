# Derivative Calculator

A Next.js frontend for a derivative calculator application. The app provides authenticated access to a calculator UI, sends expressions to a backend service for differentiation, renders LaTeX previews, and displays generated graph images when the backend returns one.

## Features

- Authentication pages for user registration and login.
- Protected calculator route with JWT cookie validation in Next.js middleware.
- Calculator keypad for numeric input, operators, and common mathematical functions.
- Live LaTeX previews for the input expression and derivative result.
- Backend integration for expression differentiation and graph image display.
- Loading and error states for asynchronous requests.

## Screenshots

No application screenshots or GIFs are currently included in the repository.

<!-- Add screenshots or GIFs here when available, for example:
![Calculator screen](./public/screenshot-calculator.png)
-->

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [TanStack Query](https://tanstack.com/query/latest) for server-state mutations
- `fetch` for backend requests
- `jose` for JWT verification in middleware
- `react-katex` and KaTeX for mathematical previews
- ESLint with `eslint-config-next`
- Husky and Commitlint for Conventional Commits

## Architecture Overview

This project uses the Next.js App Router. Route files live under `app/`, shared UI components are colocated in `app/components/`, and backend request helpers are centralized in `app/api/clients.ts`.

The application is primarily client-rendered for interactive form and calculator behavior. `app/providers.tsx` installs a TanStack Query `QueryClientProvider` at the root layout so client components can use mutation hooks. `middleware.ts` protects selected routes by validating the `auth_token` cookie with an HS256 JWT secret.

## Project Structure

```text
.
├── app/
│   ├── api/                 # Backend request helpers and response types
│   ├── components/          # Reusable calculator, form, preview, and feedback UI
│   ├── hooks/               # TanStack Query mutation hooks
│   ├── login/               # Login page route
│   ├── models/              # TypeScript payload models
│   ├── registration/        # Registration page route
│   ├── types/               # Shared TypeScript declarations and utility types
│   ├── globals.css          # Global styles and Tailwind import
│   ├── layout.tsx           # Root layout and provider setup
│   ├── page.tsx             # Protected calculator page route
│   └── providers.tsx        # React Query provider
├── public/                  # Static SVG assets
├── middleware.ts            # Route protection and JWT cookie validation
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and npm scripts
├── postcss.config.mjs       # PostCSS configuration for Tailwind CSS
└── tsconfig.json            # TypeScript compiler configuration
```

## Prerequisites

- Node.js compatible with Next.js 16
- npm
- A running backend API that exposes the routes documented in [API Integration](#api-integration)

## Installation

```bash
git clone <repository-url>
cd derivative-calculator-frontend
npm install
```

## Environment Variables

There is no `.env.example` file in this repository. Create a local `.env.local` file when running the app locally.

| Variable | Required | Used by | Description | Example |
| --- | --- | --- | --- | --- |
| `SECRET_KEY` | Recommended for protected routes | Next.js middleware | JWT secret used to verify the `auth_token` cookie. The middleware contains a development fallback, but production deployments should set this explicitly to match the backend signing secret. | `replace-with-a-secure-secret` |

## Running the Application

### Development Mode

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Mode

```bash
npm run build
npm run start
```

By default, `next start` serves the production build on `http://localhost:3000`.

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `next dev` | Starts the Next.js development server. |
| `build` | `next build` | Creates an optimized production build. |
| `start` | `next start` | Starts the production server after `npm run build`. |
| `lint` | `eslint` | Runs ESLint using the project configuration. |
| `prepare` | `husky install` | Installs Husky Git hooks after dependency installation. |

## Routing

| Route | File | Description | Access |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Main derivative calculator UI. | Protected by middleware. |
| `/login` | `app/login/page.tsx` | Sign-in form. Authenticated users are redirected to `/`. | Public unless already authenticated. |
| `/registration` | `app/registration/page.tsx` | Account creation form. | Public. |

## API Integration

Backend communication is implemented in `app/api/clients.ts` with `fetch` requests that include `credentials: "include"`, allowing cookie-based authentication to work with the backend.

| Frontend action | Method | Endpoint | Payload | Response |
| --- | --- | --- | --- | --- |
| Differentiate expression | `POST` | `/api/backend/expression` | `{ expr, diff_var }` | `{ derivative, img_path }` |
| Register user | `POST` | `/api/backend/signup` | `{ username, password }` | `{ message }` |
| Sign in user | `POST` | `/api/backend/signin` | `{ username, password }` | `{ message }` |

The calculator uses the backend-provided `img_path` value directly as the full graph image URL. API requests are sent through the `/api/backend` rewrite configured in `next.config.ts`.

### Authentication

- Login and registration are handled by backend endpoints.
- Requests include cookies through `credentials: "include"`.
- The middleware checks for an `auth_token` cookie on protected routes.
- JWT validation uses HS256 and the `SECRET_KEY` environment variable.
- Unauthenticated or invalid sessions are redirected to `/login` when visiting `/`.

## State Management

- Local component state is managed with React `useState` for form inputs, calculator values, UI toggles, and error visibility.
- Server mutations are managed with TanStack Query `useMutation` hooks:
  - `useCreateExpression`
  - `useCreateUser`
  - `useLoginUser`
- A single `QueryClientProvider` is configured in `app/providers.tsx`.

## UI and Styling

- Tailwind CSS is imported globally through `app/globals.css`.
- The UI uses utility classes directly in React components.
- Google fonts are configured through `next/font` in the root layout.
- Static SVG backgrounds are stored in `public/` and referenced by page components.
- Mathematical previews are rendered with `react-katex` and KaTeX styles.

## TypeScript

- TypeScript strict mode is enabled.
- Path aliases are configured with `@/*` mapped to the repository root.
- Request payload models live in `app/models/`.
- Shared type declarations live in `app/types/`.

## Development Notes

- The app uses the Next.js App Router; route segments are represented by folders under `app/`.
- Most interactive UI files are Client Components and include the `"use client"` directive where required.
- No Next.js API routes are currently implemented in this frontend.
- The repository does not include Docker or Docker Compose configuration.
- ESLint is configured with Next.js Core Web Vitals and TypeScript rules.
- Commitlint is configured with `@commitlint/config-conventional`.
- Husky is present for Git hook installation, but no custom root hook scripts are currently defined.

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Install dependencies and make your changes:

   ```bash
   npm install
   ```

4. Run checks before committing:

   ```bash
   npm run lint
   npm run build
   ```

5. Commit using a Conventional Commit message:

   ```bash
   git commit -m "feat: describe your change"
   ```

6. Open a pull request with a concise description of the change.
