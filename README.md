# ⚖️ PAO Finder

**PAO Finder** is an open community initiative designed to help Filipinos quickly locate their corresponding regional Public Attorney's Office (PAO) and check their provisional eligibility for free legal aid in the Philippines.

Built with **Vue 3, Vite, Tailwind CSS, and Cloudflare Workers**, the application is optimized to run lightning-fast on slow mobile networks and low-end devices in the provinces.

---

## 🌟 Key Features

- 📍 **Geographic locator:** A responsive, autocomplete search for provinces, cities, and regions to resolve which regional bureau covers their locality.
- 🏛️ **Satellite Office Support:** Displays both the main regional headquarters and nested satellite bureaus (e.g., MIMAROPA and Zamboanga Peninsula).
- 🗺️ **One-click Maps Integration:** Instant links to view directories and map paths directly on Google Maps.
- 📊 **Indigency Income Calculator:** Interactive eligibility calculator supporting different location zones (Metro Manila, Other Cities, Municipalities) and statutory deductions (SSS, Pag-IBIG, PhilHealth).
- 🌐 **Tagalog & English Bilingual Support:** Fully localized interface with Vue I18n for maximum accessibility.
- ⚡ **Offline-First Lookup Fallback:** Standalone search caching that falls back to local data if the Edge worker API is unreachable or during local development.

---

## 📁 Repository Structure

This repository is organized as a **Vite+ monorepo** managed with Bun:

```text
├── apps/
│   ├── api/          # Cloudflare Workers API backend (CORS preflight, edge query handling)
│   └── website/      # Vue 3 + Tailwind CSS + Lucide Icons SPA client website
├── packages/
│   └── utils/        # Shared helper libraries
├── tools/
│   └── compile-db.ts # Node/Bun compilation script parsing "PAO Offices.csv" into structured JSON
└── package.json      # Monorepo workspaces and validation task commands
```

---

## 🛠️ Getting Started

### Prerequisites

You must have [Bun](https://bun.sh/) and Node.js installed on your machine.

### Installation

1. Clone the repository and navigate to the root directory:

   ```bash
   git clone https://github.com/fujiDevv/PAO-finder.git
   cd PAO-finder
   ```

2. Install the monorepo dependencies:

   ```bash
   bun install
   ```

3. (Optional) Compile the database from the raw CSV:
   ```bash
   bun tools/compile-db.ts
   ```

---

## 🚀 Running Locally

- **Start the website dev server:**

  ```bash
  bun run dev
  ```

  This serves the client web app on [http://localhost:5173](http://localhost:5173).

- **Start the edge API server locally (via Wrangler):**
  ```bash
  cd apps/api
  bun run dev
  ```
  This serves the worker backend locally on port `8787`.

---

## 💎 Validation & Build

Run the following commands to check quality and compile for production:

- **Format, lint, and type check the monorepo:**
  ```bash
  vp check
  ```
- **Format and auto-fix codebase issues:**
  ```bash
  vp check --fix
  ```
- **Compile all monorepo workspaces for production:**
  ```bash
  bun run build
  ```

---

## 🌐 Deployment

### 1. Cloudflare Workers API

Navigate to the api folder and deploy to your Cloudflare account:

```bash
cd apps/api
npx wrangler login
bun run deploy
```

### 2. Cloudflare Pages (Frontend Web App)

Connect your GitHub repository to Cloudflare Pages:

- **Build command:** `bun run build`
- **Build output directory:** `apps/website/dist`
- **Root directory:** (Keep empty / root directory)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions from the community are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
