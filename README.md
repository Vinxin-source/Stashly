# Stashly

The beautiful, trustworthy yarn & project tracker for makers.

Designed to beat existing apps on calm design, honesty, and craftsmanship.

## Current Features

- Premium design system (Clay / Cream / Sage)
- Stash + Projects with real Supabase data
- Add Yarn & New Project forms
- Search + Filters
- Yarn & Project detail pages
- Magic link authentication
- Pricing page + Soft paywall
- Free vs Pro plan structure
- Ready for Dodo Payments / Paddle

## Stack
- Next.js 15 + TypeScript + Tailwind
- Supabase (Auth + Database + Storage)
- Merchant of Record ready (Dodo / Paddle)

## Deploy Steps

1. Create free Supabase project → run `supabase/schema.sql`
2. Enable Email auth in Supabase (Authentication → Providers)
3. Push this folder to GitHub
4. Import on Vercel
5. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy

## Payments Setup (Important for Nigeria → Global clients)

Because Stripe is not available for Nigerian businesses directly:

**Recommended: Dodo Payments or Paddle (Merchant of Record)**

1. Create account at https://dodopayments.com or https://paddle.com
2. They become the legal seller, handle VAT/tax, and pay you out
3. Replace the alert() in `/pricing` with their checkout link or SDK
4. On successful payment, set `profiles.is_pro = true` via webhook

This is the cleanest way to accept US/EU payments from Nigeria.

## Design System
- Clay `#C4785A` · Cream `#F9F5F0` · Sage `#7D8F7E`
- Fraunces (display) + Plus Jakarta Sans
- Soft motion, generous space, real-photo first

## Roadmap left
- Photo upload (Supabase Storage)
- Edit / Delete
- Real checkout integration
- Onboarding flow
