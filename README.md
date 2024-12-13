# Accountabuddy 👥

Accountabuddy is a social platform designed to help students connect with accountability partners to achieve their goals. Whether you're focusing on habit building, goal setting, or skill development, AccountaBuddy pairs you with like-minded individuals to stay on track. The project is built using Next.js, with features such as user profiles, matchmaking, and customizable preferences.

## Features

- **User Profiles**: Create and customize your personal profile to showcase your goals and accountability preferences.
- **Goal Buckets & Accountability Areas**: Select from predefined options to specify your focus areas and the type of support you need.
- **Matchmaking**: Swipe to find accountability partners with similar goals and interests.
- **Chat Integration (Coming Soon)**: Connect and communicate with matches directly on the platform.
- **Customizable Preferences**: Choose how you'd like to meet and collaborate with your accountability partner.

## Technologies Used

- **Frontend**: Next.js (with App Router), React, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (via Supabase and @vercel/postgres)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (version 16 or higher)
- npm, yarn, or pnpm

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/RiosNicholas/accountabuddy.git
cd accountabuddy
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

For production deployments, replace the `NEXTAUTH_URL` with your live application URL.
