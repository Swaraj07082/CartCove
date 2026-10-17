# CartCove

Full-stack e-commerce storefront with an admin dashboard — browse products, manage a cart, place orders, and track sales.

## Features

- **Storefront** — product browsing, search, and animated landing experience (GSAP)
- **Cart & checkout** — Redux cart, shipping details, and order placement
- **Auth** — sign up / login with NextAuth (credentials + JWT sessions)
- **Orders** — customers can view their order history
- **Admin dashboard** — products, customers, transactions, and revenue charts (admin-gated)

## Tech stack

| Layer | Tech |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| UI | React 18, Tailwind CSS, Radix / shadcn-style components |
| State | Redux Toolkit |
| Auth | NextAuth.js |
| Database | MongoDB via [Prisma](https://www.prisma.io/) |
| Payments | Stripe (dependency integrated; checkout flow in progress) |
| Charts | Chart.js / Recharts |

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB database (Atlas or local)

### Setup

```bash
git clone https://github.com/Swaraj07082/CartCove.git
cd CartCove
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Generate the Prisma client and run the app:

```bash
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret used to sign NextAuth JWTs |
| `NEXT_PUBLIC_ADMIN_URL` | Admin user email (gates dashboard access) |
| `DOMAIN` | App base URL (e.g. `http://localhost:3000`) |

See [`.env.example`](.env.example) for a template. Never commit a real `.env` file.

## Project structure

```
src/
  app/           # Routes (storefront, cart, shipping, dashboard, API)
  components/    # UI and feature components
  lib/           # Auth, DB, helpers
  features/      # Redux slices (e.g. cart)
prisma/
  schema.prisma  # User, Products, Orders, OrderedProduct
```

## License

Private project — all rights reserved.
