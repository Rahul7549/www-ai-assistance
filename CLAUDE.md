# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build (also the main type-check)
npm run start    # Start production server
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

No test framework is configured. The app needs the Express backend (`../api-ai-assistance`, port 3001) running for anything past the login page.

## Architecture

**Next.js 16** App Router, React 19, TypeScript, Tailwind CSS v4 (via `@tailwindcss/postcss`; there's no `tailwind.config`, so configuration lives in `app/globals.css`, which also loads `@tailwindcss/typography`). Path alias: `@/*` → project root. Nearly everything is a client component (`"use client"`), and auth state lives in `localStorage`, so server components can't see the user.

### Routing and auth gating

- `app/layout.tsx` wraps the whole app in `AuthProvider` (`app/lib/auth-context.tsx`).
- `app/(auth)/`: `/login` and the multi-step `/registration` wizard (framer-motion transitions).
- `app/(protected)/`: its `layout.tsx` redirects to `/login` when `useAuth()` has no user. It contains `/` (Sidebar + ChatArea) and `/voice-assistance`.
- `/` wraps its tree in `ConversationProvider`. **Any component that calls `useConversation()` (including `VoiceOverlay` → `useVoiceSession`) must render under that provider.**

### Backend communication: REST and Socket.IO

**REST** goes through `app/lib/api.ts` (`api.get/post/put/patch/delete/upload`). Never call `fetch` with a hardcoded URL. Paths come from `app/lib/endpoints.ts` (`ENDPOINTS`); when you add or change a backend route, update it there. `api.ts` handles:
- the base URL from `NEXT_PUBLIC_API_BASE_URL`
- Bearer tokens from `localStorage` (`accessToken` / `refreshToken`)
- proactive refresh when the JWT expires within 60s, and a retry after a 401. Concurrent refreshes are de-duplicated through a shared promise.
- a hard redirect to `/login` when refresh fails

The backend responds with `{ success, data }`, so callers read `res.data`.

**Streaming chat** uses Socket.IO through the singleton in `app/lib/socket.ts` (`getSocket` / `reconnectSocket` / `disconnectSocket`). The socket sends the current access token in its `auth` callback. `ChatArea` owns the connection lifecycle: it connects on mount and disconnects on unmount.
- Client → server: `user_message` `{ conversationId, content, fileIds?, mode? }`, `cancel_stream`, `warm_model`.
- Server → client: `ai_token`, `ai_done` (`{ conversationId, sourceFiles? }`), `ai_error`, `ai_searching`, `ai_image`, `pdf_ready`, `indexing_complete`, `model_ready`.

Message flow in `ChatArea`: append the user message plus a placeholder assistant message with `id: "streaming"`, append each `ai_token` to it, then on `ai_done` reload the full message list from the REST API (that list is the source of truth) and refresh the conversation list. When there's no selected conversation, `ChatArea` creates one over REST first and sets `skipLoadRef` so the selection change doesn't wipe the optimistic messages.

### Conversation state

`ConversationProvider` loads the user's first assistant on mount, or creates a default "Nova" assistant if there isn't one. It then lists that assistant's conversations and tracks `selectedConversationId`. The single-assistant-per-user assumption runs through the UI.

### Voice

There are two voice paths:
- **In-chat voice overlay** (`VoiceOverlay` → `hooks/useVoiceSession` → `voice/VoiceSession.ts`): `VoiceSession` is a plain TS class implementing a state machine (`IDLE | LISTENING | PROCESSING | SPEAKING | MUTED | ERROR`) on top of the browser Web Speech API (SpeechRecognition + speechSynthesis). The hook mirrors its state into React through an `onChange` snapshot and bridges it to the socket, sending `mode: "voice"`. Voice names map to native browser voices via `VOICE_MAP`.
- **`/voice-assistance` page**: a standalone page that manages its own socket listeners.

Design and technical background: `docs/superpowers/specs/2026-07-13-voice-chat-design.md` and `docs/voice-chat-technical-reference.html`.

### Components

Shared components live in `app/_components/` (the underscore keeps them out of routing). Chat message rendering is in `app/_components/chat/`: `MessageBubble` dispatches to `UserMessage` / `AssistantMessage`, and `AssistantMessage` renders markdown with `react-markdown`, using `CodeBlock` (`react-syntax-highlighter`), `FileChip` and `PdfPreviewCard`.

### Styling

The app has a dark theme only. Design tokens are CSS custom properties in `globals.css` (`--bg-*`, `--text-*`, `--primary*`). Components mix these variables with Tailwind utilities, and glass cards use `.glass-card`. Icons come from `lucide-react`, and the font is Inter via `next/font/google`.

### Environment

`NEXT_PUBLIC_API_BASE_URL` is the only variable (see `.env.example`). `.env.development` points it at `http://localhost:3001`, and `.env.production` points it at the deployed backend.

### Planning docs

Feature specs and implementation plans are in `docs/superpowers/specs/` and `docs/superpowers/plans/`, and the roadmap is in `docs/feature-roadmap.md`. Check the relevant spec before changing a feature that has one.
