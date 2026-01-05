# Football Analytics Hub

Football Analytics Hub is a modern web application for exploring football league data.  

The application uses the **Football-Data.org free API tier** and is designed to respect its limitations while still providing meaningful insights.

---

## Overview

The app allows users to:

- Browse league standings
- View detailed team pages
- Explore squad lists with player profiles
- See upcoming fixtures for each team

The project emphasizes **server-side rendering**, **data caching**, and **defensive handling of incomplete API data**.

---

## Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Football-Data.org API (Free Tier)**
- Optional deployment: **Vercel**

---

## Features

- League standings (multiple competitions)
- Team detail pages with:
  - Club information
  - Upcoming fixtures
  - Squad list with calculated player ages
- Player profile pages
- Context-aware navigation (league → team → player)
- Server-side data fetching
- API response caching using ISR (`revalidate`)
- Secure API key handling with environment variables
- Responsive, clean UI designed for desktop-first usage

---

## API Usage Notes

This project intentionally uses the **Football-Data.org free tier**.

As a result:

- Player statistics are limited
- Shirt numbers are not always available
- No live match data is used
- No advanced analytics (xG, assists, etc.)

The UI is built to **gracefully handle missing or partial data**, reflecting real-world API constraints.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` file:

```env
FOOTBALL_DATA_API_KEY=your_api_key_here
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> Deployment (e.g. Vercel) can be added later when needed.
