# Node Monorepo Template

A GitHub template for full-stack TypeScript monorepos using npm workspaces with a Hono backend and React (Vite) frontend.

## Structure

```
node-monorepo/
├── apps/
│   ├── backend/          # Hono API server
│   │   └── src/          # Backend source code
│   └── frontend/         # React + Vite app
│       └── src/          # Frontend source code
├── packages/             # Shared packages (future use)
├── .husky/               # Git hooks (pre-commit, commit-msg)
├── .vscode/              # VSCode settings and debug configs
├── package.json          # Root workspace config
├── tsconfig.base.json    # Shared TypeScript options
├── tsconfig.json         # Root TypeScript config
├── eslint.config.ts      # Shared ESLint config (flat config)
├── prettier.config.ts    # Shared Prettier config
├── commitlint.config.ts  # Commit linting config
└── .prettierignore       # Prettier ignore patterns
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

Run both backend and frontend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Backend only (http://localhost:3000)
npm run dev:backend

# Frontend only (http://localhost:5173)
npm run dev:frontend
```

### Build

```bash
npm run build:backend
npm run build:frontend
```

### Production

```bash
npm run start:backend
npm run preview:frontend
```

## Available Scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `dev`              | Start both backend and frontend concurrently |
| `dev:backend`      | Start backend dev server                     |
| `dev:frontend`     | Start frontend dev server                    |
| `build:backend`    | Build backend                                |
| `build:frontend`   | Build frontend                               |
| `start:backend`    | Start backend in production                  |
| `preview:frontend` | Preview frontend build                       |
| `lint`             | Run ESLint                                   |
| `lint:fix`         | Fix ESLint issues                            |
| `format`           | Format code with Prettier                    |
| `format:check`     | Check code formatting                        |
| `commit`           | Interactive commit with conventional commits |

## Path Aliases

| Alias | Location                             | Usage                        |
| ----- | ------------------------------------ | ---------------------------- |
| `#/*` | `apps/backend/src/*`                 | Internal backend imports     |
| `@/*` | `apps/frontend/src/*`                | Internal frontend imports    |
| `#/*` | `apps/backend/src/*` (from frontend) | Cross-workspace type imports |

Example:

```ts
// Backend
import { handler } from '#/routes/api';

// Frontend
import { Button } from '@/components/Button';
import type { User } from '#/types/user'; // Type-only from backend
```

## Commit Convention

This template uses [Conventional Commits](https://www.conventionalcommits.org/) with enforced scopes:

```
<type>(<scope>): <subject>

# Examples:
feat(backend): Add user authentication
fix(frontend): Resolve state update issue
chore(repo): Update dependencies
```

**Allowed scopes**: `backend`, `frontend`, `repo`

**Allowed subject case**: `sentence-case` or `lower-case`

## Debugging

VSCode debug configurations are included:

| Configuration        | Description                            |
| -------------------- | -------------------------------------- |
| **Debug Backend**    | Debug Node.js backend with source maps |
| **Debug Frontend**   | Debug React app in Chrome              |
| **Debug Full Stack** | Debug both simultaneously              |

### Debug Backend

1. Open Run and Debug panel (Ctrl+Shift+D)
2. Select "Debug Backend"
3. Press F5
4. Set breakpoints in `apps/backend/src/*.ts` files

### Debug Frontend

1. Start the frontend dev server first: `npm run dev:frontend`
2. Open Run and Debug panel (Ctrl+Shift+D)
3. Select "Debug Frontend"
4. Press F5 - Chrome will open
5. Set breakpoints in `apps/frontend/src/*.tsx` files
6. Interact with the app - breakpoints will be hit

### Debug Full Stack

1. Open Run and Debug panel (Ctrl+Shift+D)
2. Select "Debug Full Stack"
3. Press F5 - starts both debuggers
4. Set breakpoints in both backend and frontend files

## Tech Stack

- **Monorepo**: npm workspaces
- **Backend**: Hono + @hono/node-server
- **Frontend**: React 19 + Vite 7
- **Language**: TypeScript 5.7
- **Linting**: ESLint 9 (flat config)
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **Commit Linting**: Commitlint
- **Concurrency**: concurrently

## TypeScript Configuration

All TypeScript configurations extend from `tsconfig.base.json`, which defines shared strict options:

```
tsconfig.base.json          # Shared: strict, noUnusedLocals, noUnusedParameters, etc.
├── tsconfig.json           # Root config files (ESLint, Prettier, Commitlint)
├── apps/backend/tsconfig.json        # NodeNext module, Hono JSX
└── apps/frontend/
    ├── tsconfig.app.json   # Browser code, React JSX, DOM types
    └── tsconfig.node.json  # Vite config (Node.js)
```

**Benefits of base config:**

- Single source of truth for strict options
- Consistent settings across all packages
- Easier maintenance and updates

## License

MIT
