# AstroBiz OS — Desktop Frontend

This is the desktop application for AstroBiz OS built with HTML, CSS, JavaScript, and Tauri.

## Architecture

The project follows a clean separation of concerns:

- **UI Components** - Reusable, framework-agnostic components
- **State/Controllers** - Application state and business logic coordination
- **Repositories** - Data abstraction layer
- **Mock Data** - Prototype data (to be replaced with REST API)

## Project Structure

```
src/
├── app/                    # Application logic and pages
│   ├── main.js            # App entry point
│   └── demo/              # Design system demo
├── shared/                # Reusable across features
│   ├── components/        # UI components (Button, Input, Card, etc.)
│   ├── shell/            # App shell (Sidebar, Topbar)
│   ├── styles/           # Design tokens and global styles
│   └── hooks/            # Custom hooks (future)
├── core/                  # App-wide utilities
│   ├── config/           # Configuration
│   ├── constants/        # Enums and constants
│   └── utils/            # Formatters, validators, dates
├── state/                 # Application state (future)
├── models/                # Domain models
├── repositories/          # Data layer
├── data/                  # Mock data
└── index.html            # HTML entry point

src-tauri/                # Rust backend for Tauri
```

## Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Design System

All styling is based on CSS design tokens defined in `src/styles/design-tokens.css`:

- **Colors** - Primary, accent, success, danger, warning, neutral
- **Typography** - Font sizes, weights, line heights
- **Spacing** - Consistent spacing scale
- **Borders** - Border radii, widths
- **Shadows** - Elevation levels
- **Transitions** - Animation durations
- **Z-index** - Layering order

## Components Implemented

### UI Components

- Button - Primary, secondary, accent, danger, success variants
- Input - Text input with validation
- Select - Dropdown with options
- Card - Container with optional header and footer
- StatCard - Statistics display with change indicator
- StatusBadge - Status indicator with icon
- Avatar - User avatar with initials
- Table - Data table with columns and rows
- Modal - Dialog box with header, body, footer
- ConfirmDialog - Confirmation dialog
- Tabs - Tabbed interface
- LoadingState - Loading spinner
- EmptyState - Empty data state
- ErrorState - Error message state
- Toast - Notification messages

### Shell Components

- Sidebar - Navigation menu
- Topbar - Top navigation bar

## No Business Modules Yet

This phase implements only the design system and shell. Business modules (customers, billing, appointments, kundali, CRM, reports, settings) will be added in subsequent phases.

## Future: Mock Data → REST API

Repositories are abstracted so mock data can be replaced with API calls:

```javascript
// Current: Mock data
const customerRepo = new MockCustomerRepository();

// Future: REST API
const customerRepo = new ApiCustomerRepository('http://api.astrobiz.com');

// UI code remains the same
const customers = await customerRepo.getAll();
```

## State Management

The app uses a simple central store pattern (to be implemented) with:

- Slices for each domain (customers, appointments, billing, etc.)
- Actions to mutate state
- Selectors to retrieve state
- Reducers to handle mutations

## Build with Tauri

The desktop app is packaged with Tauri for cross-platform distribution:

- Windows: MSI, NSIS installers
- macOS: DMG, App bundles
- Linux: AppImage, deb

See `tauri.conf.json` for configuration.
