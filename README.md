# V1 - Auto Review Responder

Automated review response system that connects to Google My Business and other platforms to generate personalized, human-like responses using AI.

## What this project does

V1 Auto Review Responder automates the tedious task of responding to customer reviews across multiple platforms. It monitors Google My Business (with Facebook and other platforms coming in future versions), detects new reviews in real-time, and generates personalized responses using AI that feel genuinely human-written.

Key features:
- **Automated Review Detection**: Real-time monitoring of connected platforms
- **AI-Powered Responses**: Personalized responses using reviewer names and review content
- **Tiered Response System**: Different templates for 1-2 star, 3 star, and 4-5 star reviews
- **Manual Approval for Negatives**: Safety gate requiring approval before responding to negative reviews
- **Centralized Dashboard**: Monitor all reviews and responses across platforms in one place

## Who this is for

Small to medium business owners who:
- Receive reviews on Google My Business and want consistent, professional responses
- Don't have time to manually respond to every review
- Want to maintain brand voice while scaling customer communication
- Need visibility into review response performance

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **AI**: OpenAI GPT-4 for response generation
- **Integrations**: Google My Business API, Facebook Business API
- **Future Integrations**: Zapier, Gmail, Zendesk, Twilio, HubSpot
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase CLI installed (`npm install -g supabase`)
- Git for version control

## Local Development Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v1-auto-review-responder
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.example .env.local
   
   Fill in the required environment variables (see table below)

4. **Start Supabase locally**
   bash
   supabase start
   

5. **Run database migrations**
   bash
   supabase db reset
   

6. **Start development server**
   bash
   npm run dev
   

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |
| `OPENAI_API_KEY` | OpenAI API key for response generation | Yes |
| `GOOGLE_MY_BUSINESS_CLIENT_ID` | Google My Business OAuth client ID | Yes |
| `GOOGLE_MY_BUSINESS_CLIENT_SECRET` | Google My Business OAuth client secret | Yes |
| `FACEBOOK_APP_ID` | Facebook App ID for Business integration | No |
| `FACEBOOK_APP_SECRET` | Facebook App secret | No |
| `NEXTAUTH_URL` | Base URL for NextAuth callbacks | Yes |
| `NEXTAUTH_SECRET` | NextAuth JWT encryption secret | Yes |

## Database Setup

The project uses Supabase with the following core tables:
- `users` - User authentication and profiles
- `businesses` - Business information and settings
- `platform_integrations` - Connected platform credentials
- `reviews` - Synced reviews from all platforms
- `review_responses` - Generated and posted responses
- `response_templates` - Customizable response templates by rating

Run migrations:
bash
supabase db reset


## Deploy to Vercel

1. **Connect to Vercel**
   bash
   npm install -g vercel
   vercel
   

2. **Set environment variables in Vercel dashboard**
   - Go to your project settings
   - Add all environment variables from the table above

3. **Deploy**
   bash
   vercel --prod
   

## Project Structure


├── app/                    # Next.js 15 app router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── dashboard/        # Dashboard-specific components
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # Authentication configuration
│   ├── supabase.ts       # Supabase client configuration
│   └── utils.ts          # General utility functions
├── db/                    # Database access layer
│   ├── queries/          # Database query functions
│   └── types.ts          # Database type definitions
├── actions/              # Server actions for form handling
├── hooks/                # Custom React hooks
├── supabase/             # Supabase configuration
│   ├── migrations/       # Database migrations
│   └── config.toml       # Supabase configuration
└── public/               # Static assets


## Getting Started

1. Complete the local development setup above
2. Create your first business profile in `/onboarding`
3. Connect your Google My Business account in `/platforms/connect`
4. Set up response templates in `/templates`
5. Monitor incoming reviews in `/reviews`

For detailed development guidelines, see [CLAUDE.md](./CLAUDE.md).