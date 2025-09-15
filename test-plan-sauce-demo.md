# Sauce Demo Test Plan

## Goal

Prove the **core shopping journey** is functional (login → browse → add → checkout), then expand to the **riskiest defects first**. We will implement test automation coverage of the core scenarios using Playwright framework. We will also prepare the necessary **test data** (users, products, error messages) and proper configuration for the cross-browser testing support.

---

## Functionalities to Test (Scope)

- **Login / Auth**: valid login; invalid/locked users; error messaging & basic validation.
- **Inventory**: item list loads; sorting; tile data (name, price, image); navigation to Product Detail.
- **Product detail** description present & consistent with inventory;  add/remove items in the cart from Product detail.
- **Cart**: add/remove items; badge count; proceed to checkout (guard against empty cart).
- **Checkout**: mandatory fields validation; edit item selection; finish purchase; confirmation.
- **Basic Navigation**: header/burger menu links, back/forward paths.
- **Performance Sanity**: user-perceived responsiveness (not load testing): page switches, button clicks, sorting feedback.

---

## Types & Levels of Testing

- **UI Automation (Playwright + TS)** using Page Object Model, test data management, tags, code quality and formatting tools, cross-browser support.
- **Manual Exploratory** for visual alignment, copy, error checks, quick performance feel.
- **Smoke vs. Regression**
  - **Smoke**: the shortest path to buy an item (green path) and minimal nav checks.
  - **Regression**: high‑risk areas first (checkout, inventory integrity, navigation), then UX polish.

---

## Prioritization & Phasing (Three Short Iterations)

**Iteration 1 — Smoke**

- **User**: `standard_user`.
- **Flow**:
  1. Login success → Inventory.
  2. Add one in‑stock item from Inventory → Cart (badge increments).
  3. Checkout: fill valid data → Finish → see confirmation.
  4. Open/close menu; basic navigation works.
- **Exit**: All pass, this suite blocks merges.
- **Rationale**: If you can’t buy, nothing else matters.

**Iteration 2 — High‑Risk Regression (breakers first)**

- **Users**: `problem_user`, `locked_out_user`, `performance_glitch_user`, `standard_user_user`, `error_user`, `visual_user`.
- **Focus**:
  - **Checkout blockers**: Finish button clickable & enabled; required fields  editable and validated; consistent success page.
  - **Navigation**: external/internal links do not throw errors; return paths work.
  - **Inventory integrity**: proper  item information (images, prices, description, title and proper formatting/design).
- **Evidence per defect**: reproducible steps, screenshots, necessary information from devtools console, clear severity/priority.
- **Exit**: No Critical/Blocker open in these areas or they have immediate workarounds.

**Iteration 3 — Extended Regression & UX Polish**

- **Focus**: design, layout, spaces, consistent price formats, guardrails (e.g. empty cart/fields behaviour, check error messages).
- **Exit**: No new regressions vs Iteration 1; majors triaged; minors logged.

---

## Test Data & Environments

- **Base URL**: [https://www.saucedemo.com/](https://www.saucedemo.com/)
- **Users**: standard, locked, problem, performance‑glitch.



---

## Tools To Be Used (Playwright framework)

- **Playwright (TypeScript)**: core automation framework, Page Object Model, parallel execution, HTML/trace reports, cross-browser configuration support.
- **Test Data Management**: configuration files for users, products, and errors to support repeatable test runs, .env variables for sensitive data (credentials).
- **Reporting**: built-in Playwright HTML report (reporting format improved by using test steps and assertions with messages)
- **Formatting**:  ESLint, prettier for best practices and code formating checks.


---

## Out of Scope / Limitations (for this short cycle)

- No deep API/database validation (UI‑level only).

- No full accessibility audit (only basic keyboard/use checks).

- No localization, emails, or real payments.

- No load/stress testing (only UX responsiveness sanity).

##

---

## Acceptance Criteria

- **Login**: valid user lands on inventory; invalid credentials result in a clear error.
- **Inventory**: each tile shows correct name/price/image; sorting by Price (low→high) and Name (A→Z) works; clicking name/image opens PDP.
- **PDP**: details match inventory; Add/Remove updates cart badge immediately.
- **Cart**: items/quantities correct; Remove works; badge reflects changes; cannot continue checkout with empty cart.
- **Checkout**: Key client information like **First Name, Last Name, Postal Code** are mandatory and editable; helpful error messages; Checkout finish leads to a confirmation screen.
- **Navigation**: header/menu links open valid pages; no navigation errors for standard paths.
- **Performance sanity**: page transitions feel responsive (e.g., <\~2s to render key view) and button clicks give feedback within \~500ms.

## Risks

### High-impact risks
- **Checkout flow**: As the core revenue path, any failure to complete checkout (e.g., unresponsive Finish button, missing validations) would block purchases.
- **Authentication (access failures)**: Inability to log in prevents access to the platform.

### Medium-impact risks
- **Catalog integrity**: Inconsistent product data (images, descriptions, prices) can mislead customers and reduce trust in the platform.
- **Navigation**: Broken links or navigation errors in key menus would disrupt user flow and damage credibility.
- **Performance**: Noticeable delays or freezes after user actions would frustrate customers and lower conversion.
- **Authentication (error messages)**: Unclear or poorly worded error messages do not block access but harm usability and credibility.

### Low-impact risks
- **UI/UX quality**: Misaligned elements, inconsistent formatting, or unclear copy may not block tasks but still degrade user experience.

---