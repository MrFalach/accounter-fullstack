# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Accounter is a tax management monorepo built with GraphQL, React, and PostgreSQL. The project helps manage business transactions, documents, and tax reporting with automated scraping capabilities for various financial institutions.

## Development Commands

### Core Development
```bash
# Initial setup (new local database)
yarn local:setup

# Setup with existing database
yarn setup

# Start development
yarn client:dev       # Start client (Vite dev server on port 3001)
yarn server:dev       # Start server (GraphQL API on port 4000)
yarn generate:watch   # Watch for GraphQL/SQL changes and regenerate types

# Build everything
yarn build

# Testing
yarn test             # Run Vitest tests
```

### Code Generation
```bash
yarn generate         # Generate GraphQL and SQL types
yarn generate:graphql # Generate GraphQL types only
yarn generate:sql     # Generate SQL types only (pgtyped)
```

### Database Operations
```bash
yarn db:migrate       # Run database migrations
yarn seed             # Seed database with business details (edit scripts/seed.ts first)
yarn scrape           # Load financial data via scrapers
```

### Code Quality
```bash
yarn lint              # ESLint with cache
yarn prettier:check    # Check Prettier formatting
yarn prettier:fix      # Fix Prettier formatting
```

### Storybook
```bash
yarn storybook         # Run Storybook dev server
yarn storybook:build   # Build Storybook
```

## Architecture

### Monorepo Structure
- **packages/client/**: React SPA with Vite, Tailwind, shadcn/ui, URQL for GraphQL
- **packages/server/**: GraphQL API with Yoga, GraphQL Modules, PostgreSQL
- **packages/migrations/**: Database migration files
- **packages/***-scraper/**: Financial institution scrapers (Poalim, Discount, etc.)
- **packages/storybook/**: Component documentation

### Technology Stack

#### Frontend (Client)
- **React 19** with TypeScript
- **shadcn/ui** components (Radix-based)
- **Tailwind CSS** for styling
- **URQL** for GraphQL client
- **React Hook Form** with Zod validation
- **React Router** for navigation
- **Zustand** for state management

#### Backend (Server)
- **GraphQL Yoga** with GraphQL Modules architecture
- **PostgreSQL** with pgtyped for type-safe SQL
- **bcrypt** for password hashing
- **Cloudinary** for image storage
- **AI SDK** with Anthropic for OCR
- **DataLoader** for efficient data fetching

#### Code Generation
- **GraphQL Codegen** for client/server type generation
- **pgtyped** for SQL type generation from .sql files

### Key Patterns

#### GraphQL Module Structure
Each server module follows this pattern:
```
modules/[feature]/
├── module.ts              # Module definition
├── typeDefs/              # GraphQL schema definitions
│   └── [feature].graphql.ts
├── resolvers/             # Resolver implementations
│   ├── index.ts
│   ├── queries/
│   ├── mutations/
│   └── [type].ts
└── providers/             # Business logic and data access
    └── [feature].provider.ts
```

#### Client Component Structure
- Use shadcn/ui components with Tailwind classes
- Implement React Hook Form with Zod schemas
- Follow the component patterns in `.cursor/rules/components.mdc`
- Use URQL for GraphQL operations with generated types

#### Database Integration
- SQL queries in `.sql` files for pgtyped generation
- Use DataLoader for efficient N+1 query prevention
- Database migrations in `packages/migrations/`

### Authentication & Security
- Basic HTTP authentication for GraphQL API
- Password hashing with bcrypt
- Environment-based user management via `AUTHORIZED_USERS`
- API key protection for external integrations (Anthropic, Google Drive)

### Financial Data Sources
The project includes scrapers for:
- Bank Poalim (modern-poalim-scraper)
- Israeli VAT authority
- Green Invoice API
- Hashavshevet mesh
- Payper mesh
- Various crypto exchanges (Kraken, Etherscan)

### Package Management
- Uses Yarn 4 with workspace support
- Install exact versions: `yarn add package@1.0.0`
- Install in correct workspace: `yarn workspace @accounter/client add package`
- Follow patterns in `.cursor/rules/packages.mdc`

### Development Environment
- Node.js 24.4.0 (check .node-version)
- PostgreSQL via Docker (docker-compose.dev.yml)
- Environment configuration via .env (copy from .env.template)

## Storybook Development Guidelines

### Primary Goal
Create Storybook components that mirror client components exactly but use mock data instead of GraphQL. These Storybook components will eventually replace the original client components, so they must maintain:
- **Identical UI structure** to original components
- **Clean separation** between UI logic and data fetching
- **Easy migration path** from mock data to real GraphQL data

### Storybook Structure
```
packages/storybook/
├── src/
│   ├── components/           # Duplicated components with mock data
│   │   ├── charges/         # e.g., ChargesTable.tsx
│   │   ├── transactions/
│   │   ├── documents/
│   │   └── shared/          # Common UI components
│   ├── mocks/              # Mock data that mirrors GraphQL types
│   │   ├── charges-data.ts
│   │   ├── transactions-data.ts
│   │   └── index.ts
│   └── styles/             # Shared styling
└── stories/                # Storybook story files
    ├── charges/            # e.g., ChargesTable.stories.tsx
    └── TransactionsTable.stories.tsx
```

### Component Duplication Process

#### 1. Analyze Original Component
- Study the client component structure in `packages/client/src/components/`
- Identify GraphQL dependencies (useQuery, useMutation calls)
- Note props interface and component behavior
- Document any complex state management

#### 2. Create Mock Data
- Create TypeScript interfaces that match GraphQL types
- Generate realistic mock data in `packages/storybook/src/mocks/`
- Ensure mock data covers edge cases and various scenarios
- Example mock data structure:
```typescript
export interface ChargeData {
  id: string;
  __typename: 'Common' | 'CreditCardBankCharge' | 'BusinessTripCharge';
  date: string;
  amount: string;
  vat: string;
  // ... other fields matching GraphQL schema
}
```

#### 3. Create Storybook Component
- Copy component logic to `packages/storybook/src/components/`
- Replace GraphQL hooks with props that accept mock data
- Maintain identical JSX structure and styling
- Remove or mock external dependencies (e.g., routing, global state)

#### 4. Design for Future Migration
Structure components to accept data as props:
```typescript
// Instead of GraphQL inside component:
const [{ data }] = useQuery({ query: ChargesQuery });

// Design for props injection:
interface ChargesTableProps {
  data: ChargeData[];
  loading?: boolean;
  error?: Error;
  onRefetch?: () => void;
}
```

#### 5. Create Comprehensive Stories
- **Default story**: Standard use case
- **Loading state**: Show skeleton/spinner
- **Error state**: Handle error scenarios
- **Edge cases**: Empty data, minimal data, maximum data
- **Interactive variants**: Different states and behaviors

### Best Practices

#### Data Separation
- Keep all GraphQL logic in client components
- Pass data as props to UI components
- Create "container" vs "presentational" component pattern
- Mock external dependencies (authentication, routing, etc.)

#### Story Structure
```typescript
const meta = {
  title: 'Components/Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'fullscreen', // or 'centered'
    docs: {
      description: {
        component: 'Detailed component description for documentation'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for interactive props
  }
} satisfies Meta<typeof ComponentName>;
```

#### Component Props Design
- Accept `data` prop for main content
- Include `loading` and `error` states
- Add `onAction` callbacks for user interactions
- Maintain backwards compatibility with original component API

#### Mock Data Guidelines
- Use realistic business data (transactions, charges, documents)
- Include multiple scenarios (approved/pending/rejected states)
- Cover different entity types (__typename variants)
- Include edge cases (empty arrays, null values, long text)

### Migration Strategy
1. **Phase 1**: Create Storybook components alongside originals
2. **Phase 2**: Gradually replace client components with prop-based versions
3. **Phase 3**: Move data fetching to page/container level
4. **Phase 4**: Delete original tightly-coupled components

### Development Workflow
```bash
# Start Storybook development
yarn storybook

# Watch for changes while developing
yarn generate:watch  # Keep types updated

# Build Storybook for deployment
yarn storybook:build
```

### Component Categories to Focus On
- **Tables**: ChargesTable, TransactionsTable, LedgerTable, DocumentsTable
- **Forms**: Business forms, transaction forms, document upload
- **Cards**: Summary cards, charge details, business trip info
- **Complex UI**: Expandable rows, modals, multi-step workflows