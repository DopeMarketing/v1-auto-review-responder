# CLAUDE.md - V1 Auto Review Responder

This file contains essential information for AI coding sessions. **Always read this file first** before making any code changes.

## Project Overview

V1 Auto Review Responder is a SaaS tool that automates review responses across platforms like Google My Business using AI-generated, personalized responses. It features tiered response templates, manual approval for negative reviews, and a centralized dashboard for review management.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time subscriptions)
- **AI**: OpenAI GPT-4 for response generation
- **Deployment**: Vercel
- **Key Integrations**: Google My Business API, Facebook Business API (roadmap)

## Folder Structure & Conventions


app/                    # Next.js App Router - server components by default
├── (auth)/            # Auth pages: login, signup, onboarding
├── (dashboard)/       # Protected pages with layout
├── api/               # API routes for webhooks, integrations
components/
├── ui/                # shadcn/ui base components
├── dashboard/         # Dashboard-specific components
lib/                   # Client-side utilities, configurations
db/                    # Database access layer ONLY
├── queries/          # All database queries go here
├── types.ts          # Database type definitions
actions/              # Server actions for forms and mutations
hooks/                # Custom React hooks
supabase/             # Database migrations and config


## Coding Conventions

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Server components by default, mark client components explicitly
- **Data Access**: Only in `/db` folder - never query database directly from components
- **Business Logic**: Only in `/lib` and `/actions` folders
- **Secrets**: Never access environment variables in client components
- **Styling**: Tailwind CSS with shadcn/ui components
- **Forms**: Use server actions, not API routes for mutations

## Current State (Scaffold)

The project scaffold includes:
- ✅ Next.js 15 app with TypeScript and Tailwind CSS
- ✅ Supabase integration with auth and database
- ✅ Data model with 10 tables (users, businesses, reviews, etc.)
- ✅ Route structure with 21 pages from site map
- ✅ Basic UI components from shadcn/ui
- ✅ Authentication setup with role-based access
- ✅ Integration stubs for all planned services

## V1 Features to Build Next

### 1. Google My Business API Integration (~6 hours)
- Set up OAuth flow for Google My Business
- Implement review syncing from GMB API
- Store reviews in database with proper relationships

### 2. Tiered Response Template System (~4 hours)
- Create template management interface
- Build template editor with variables (reviewer name, etc.)
- Implement template selection logic by review rating

### 3. Real-time Review Monitoring Dashboard (~5 hours)
- Build dashboard showing new reviews across platforms
- Add response status indicators
- Implement real-time updates using Supabase subscriptions

### 4. AI-Powered Response Generator (~7 hours)
- Integrate OpenAI API for response generation
- Build prompt engineering for personalized responses
- Implement template + AI content merging
- Add manual approval workflow for negative reviews

## Never Touch Without Permission

- `.env*` files - environment variables are managed separately
- Migration files in `supabase/migrations/` - database changes need explicit approval
- RLS policies - security implications require review
- Package.json dependencies - discuss major updates first

## How to Work on This Project

### Before Starting Any Session
1. Read this CLAUDE.md file completely
2. Check TECHNICAL_DEBT.md for known issues
3. Review recent entries in CHANGELOG.md

### Development Workflow
1. Always run `npm run build` before committing to catch TypeScript errors
2. Commit small, focused changes with conventional commit messages:
   - `feat: add review sync from Google My Business API`
   - `fix: resolve template variable parsing issue`
   - `refactor: extract response generation logic`
3. Update CHANGELOG.md with meaningful changes
4. Document any technical debt in TECHNICAL_DEBT.md

### Testing Your Changes
1. Run `npm run dev` and test in browser
2. Check browser console for errors
3. Test database queries in Supabase dashboard
4. Verify TypeScript compilation with `npm run build`

### Key Files to Know
- `lib/supabase.ts` - Supabase client configuration
- `lib/auth.ts` - Authentication helpers
- `db/queries/` - All database operations
- `actions/` - Server actions for form submissions
- `app/(dashboard)/layout.tsx` - Protected route layout

## Database Schema Notes

- Use Row Level Security (RLS) for all tables
- Users can only access their own businesses and reviews
- Foreign keys enforce data relationships
- Use proper indexes for query performance
- Store sensitive tokens encrypted

## Integration Patterns

- API credentials stored in `platform_integrations` table
- Use server actions for OAuth flows
- Implement retry logic for external API calls
- Queue background jobs for review syncing
- Log all integration activities for debugging

## Error Handling Standards

- Use try/catch in all async functions
- Log errors with context using structured logging
- Return meaningful error messages to users
- Handle rate limiting gracefully
- Implement exponential backoff for retries