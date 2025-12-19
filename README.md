# DailyCheck

## Overview

**DailyCheck** is a web application designed to help manage and organize daily household tasks.
It provides a simple and efficient way to keep track of chores, responsibilities, and routines, making everyday life easier and more structured.

---

## Technical Overview

The project is built with a modern and robust tech stack:

- **Next.js** – Frontend framework for building fast, scalable React applications
- **Prisma** – ORM for type-safe database access
- **Neon** – Serverless PostgreSQL database
- **shadcn/ui** – Reusable and accessible UI components

---

## How to Install Locally

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- A PostgreSQL database (Neon recommended)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dailycheck
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open your browser at:

   ```
   http://localhost:3000
   ```

---

## How to Contribute

Contributions are welcome! Please follow the rules below to ensure consistency and code quality.

### Branch Naming Convention

All branches must start with one of the following prefixes:

- `feature/`
- `bug/`
- `doc/`
- `db/`
- `ui/`
- `config/`

Example:

```bash
feature/add-task-reminders
```

Pull requests or pushes that do not follow this convention will fail the CI checks.

---

### Pull Request Title Convention

Pull request titles must start with one of the following prefixes:

- `feature:`
- `bug:`
- `doc:`
- `db:`
- `ui:`
- `config:`

Example:

```
feature: add recurring household tasks
```

PRs with invalid titles will be automatically rejected by the CI workflow.

---

### Contribution Flow

1. Create a new branch following the naming rules
2. Make your changes
3. Open a pull request with a valid title
4. Ensure all checks pass before requesting a review

Thank you for contributing to **DailyCheck** 🚀
