# Herald

Herald is a background job queue for sending transactional emails.
It uses PostgreSQL as a durable job store and Resend as the email delivery provider.

## How it works

When your application needs to send an email, it enqueues a job into the database
and returns immediately. A worker process runs in the background, picks up pending
jobs, sends them via Resend, and marks them as complete or failed. Failed jobs are
retried automatically up to a configurable limit.

## Features

- PostgreSQL-backed job queue with no external dependencies
- Automatic retries with configurable backoff
- Full job history and audit trail in the database
- Type-safe payload handling with TypeScript

## Stack

- Bun
- TypeScript
- PostgreSQL
- Resend
- Effect-ts

## Setup

1. Clone the repository
2. Install dependencies with `bun install`
3. Create a PostgreSQL database
4. Copy `.env.example` to `.env` and fill in your values
5. Run `bun run index.ts`

## Environment variables

DATABASE_URL=postgresql://user:password@localhost:5432/herald
RESEND_API_KEY=re_your_key_here
EMAIL_FROM=you@yourdomain.com
