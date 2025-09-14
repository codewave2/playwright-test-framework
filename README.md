## Overview

Playwright E2E automation framework for https://www.saucedemo.com using TypeScript and Page Object Model architecture.

## Structure

```bash
playwright/
├── config/             # App configuration (URLs, users, errors)
├── test-data/          # Test input data (products, checkout)
├── pages/              # Page Object Models
├── tests/              # Test specifications
├── playwright.config.ts
└── .env                # Pre-configured (demo task only - shouldn't be commited in a production project)
└── .env.example        # Mandatory PASSWORD for auth, optional BASE_URL
```

## Prerequisites

- Node 20 or later

## Setup

```bash
npm install
npx playwright install
cp .env.example .env   # add PASSWORD
```

## Run Tests

```bash
npm test
```

### Run By Tag

```bash
npm run test:login          # Login tests only
npm run test:checkout       # Checkout flow tests
npm run test:negative       # Negative scenario tests
```

### Cross-Browser Testing

```bash
npm run test:full           # All browsers & devices (CI mode)
```

### Test Configuration

**Local Development:**

- Local runs using only **chrome** for fast feedback

**CI/CD Environment:**

- Triggered when `CI` environment variable is set
- **Desktop browsers:** Chrome, Safari
- **Mobile devices:** Pixel 7 (Android), iPhone 14 (iOS)
- **Tablet:** iPad Pro 11
