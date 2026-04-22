# FoundiT | University of San Agustin Lost & Found

FoundiT is a modern, high-fidelity lost and found management system designed specifically for the University of San Agustin. It streamlines the recovery of misplaced items within the campus ecosystem through a centralized, community-driven platform.

![Status](https://img.shields.io/badge/Status-Overhauled-usa--maroon)

---

## 🚀 Core Features

- **Real-Time Dashboard**: Live tracking of lost and found items.
- **Photo-Driven Reporting**: Integrated image uploads to help identify items quickly.
- **Community Gallery**: Simple search and filter interface for browsing listings.
- **Brand Aligned**: Designed with University of San Agustin (USA) academic aesthetics.
- **Cloud Powered**: Direct integration with Supabase for real-time data and storage.

---

## 🛠 Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS (USA Maroon & Gold Theme)
- **Backend/DB**: Supabase (Database & Storage)
- **Icons**: Lucide React

---

## 💻 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Supabase Account

### 2. Setup Database
Run the provided `supabase_setup.sql` script in your Supabase SQL Editor to initialize the required tables and security policies.

### 3. Environment Variables
Create a `.env` file in the `foundit-frontend` directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Installation
```bash
cd foundit-frontend
npm install
npm run dev
```

---

## 🏛 Architecture
The system has been overhauled to use a modern direct-to-database architecture. The frontend communicates directly with Supabase, reducing latency and simplifying the codebase. 

- **Storage**: All item photos are stored in the `item-images` bucket.
- **Database**: Records are stored in `LostItems` and `FoundItems` tables.

---

## 🎨 Branding
- **USA Maroon**: `#800000`
- **USA Gold**: `#FFD700`

---
© 2026 University of San Agustin - FoundiT System
