
# Supabase Setup Instructions

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys

## 2. Set Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

## 3. Run Database Migration
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-migration.sql`
4. Run the SQL script

## 4. Configure Storage
The migration script will create a storage bucket called `birthday-gallery` for image uploads.

## 5. Install Dependencies
```bash
npm install
```

## 6. Start Development Server
```bash
npm run dev
```

## 7. Deploy to Replit
Make sure your environment variables are set in Replit's Secrets tab:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
