# AstroBiz OS

AstroBiz OS is a desktop-first SaaS application for professional astrologers.
The current repository contains the HTML, CSS, JavaScript, and Tauri frontend
prototype. The backend will be developed separately and will later be accessed
through REST APIs.

## Current Status

The current implementation includes:

- Reusable design-system components
- Desktop application shell
- Sidebar navigation
- Top header/navigation
- Client-side navigation placeholders
- Responsive desktop layout behavior

Business modules are not implemented yet. The current pages are placeholders
for Dashboard, Customers, Kundalis, Appointments, Services, Billing, CRM,
Reports, and Settings.

## Technology

- HTML
- CSS
- JavaScript (ES modules)
- Vite
- Tauri 2
- Rust for the Tauri application wrapper

The mobile application will be developed separately with Flutter and Dart.

## Repository Structure

```text
docs/
└── FRONTEND_SPEC.md          # Product and frontend requirements

apps/desktop/
├── src/
│   ├── app/
│   │   ├── main.js           # Desktop app entry point
│   │   ├── router/           # Lightweight client-side router
│   │   ├── pages/            # Generic placeholder pages
│   │   └── demo/             # Design-system demonstration
│   ├── shared/
│   │   ├── components/       # Reusable UI components
│   │   └── shell/            # Sidebar and topbar components
│   ├── styles/               # Design tokens, layout, components, utilities
│   └── index.html            # Frontend entry document
├── src-tauri/                # Tauri Rust wrapper
├── package.json              # Desktop scripts and dependencies
├── tauri.conf.json           # Tauri configuration
├── vite.config.js            # Vite configuration
└── README.md                 # Desktop-specific documentation
```

## Prerequisites

For the browser-based frontend prototype:

- Node.js 18 or newer
- npm

For the full Tauri desktop application:

- Node.js and npm
- Rust stable toolchain
- Windows WebView2 on Windows
- Tauri system prerequisites for the target operating system

## Install Dependencies

From the repository root:

```bash
cd apps/desktop
npm install
```

## Run the Frontend Prototype

To run the frontend in a browser without the Tauri wrapper:

```bash
cd apps/desktop
npx vite
```

Open [http://localhost:5173](http://localhost:5173).

This mode is useful while working on the HTML, CSS, JavaScript, shell, and
design-system components.

## Run the Tauri Desktop Application

After the Rust stable toolchain is installed and configured:

```bash
cd apps/desktop
npm run dev
```

The `dev` script starts the Tauri development application. If the Rust
toolchain is not configured, verify it with:

```bash
rustup default stable
rustc --version
cargo --version
```

## Build the Frontend

Build the browser frontend bundle with:

```bash
cd apps/desktop
npx vite build
```

The output is generated in `apps/desktop/dist`.

Build the Tauri application and installers with:

```bash
cd apps/desktop
npm run build
```

## Available Placeholder Routes

The desktop shell currently supports these routes:

- `/dashboard`
- `/customers`
- `/kundalis`
- `/appointments`
- `/services`
- `/billing`
- `/crm`
- `/reports`
- `/settings`

These routes only render generic placeholder content. They do not contain
business workflows, backend calls, authentication, database access, or domain
repositories.

## Architecture

The frontend is organized around this boundary:

```text
UI components → shell/router/state → repositories → mock data
```

When the backend is available, repository implementations can be replaced by
REST API repositories without coupling API details to reusable UI components:

```text
UI components → shell/router/state → repositories → REST API → backend
```

Reusable components should remain presentation-focused. Future business modules
should own their domain-specific pages, controllers, models, repositories, and
mock data rather than adding business logic to the shared design system.

## Design System

Centralized design tokens are defined in
`apps/desktop/src/styles/design-tokens.css` and cover:

- Colors and semantic status colors
- Typography and font weights
- Spacing
- Border radii and borders
- Shadows
- Layout dimensions
- Focus, hover, disabled, and responsive states

Shared components include buttons, inputs, selects, cards, stat cards, badges,
tables, modals, confirmation dialogs, tabs, avatars, loading states, empty
states, error states, and toast notifications.

## Scope Rules

The frontend must not:

- Connect directly to PostgreSQL
- Implement database logic
- Make backend or REST API calls during the prototype phase
- Put business logic in reusable UI components
- Implement business modules before their planned development phase

See [docs/FRONTEND_SPEC.md](docs/FRONTEND_SPEC.md) for the complete product
and frontend specification.