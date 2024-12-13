
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
