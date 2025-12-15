# Football Analytics Dashboard

A modern web application for viewing football league data, built with Next.js and an official football data API.

---

## Overview

Football Analytics Dashboard displays **Premier League standings** in a clean, responsive dashboard. The project is designed as a portfolio piece, focusing on professional structure, secure API usage, and scalability.

---

## Tech Stack

* **Next.js 14 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Football-Data.org API (Free Tier)**
* Optional deployment: Vercel

---

## Features

* Premier League standings
* Server-side data fetching
* Secure API key handling with environment variables
* Basic caching to respect API rate limits
* Clean, responsive UI

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

---

## Roadmap

* Team detail pages
* Fixtures and results
* Search and filtering
* Data visualizations

---

## License

MIT License
