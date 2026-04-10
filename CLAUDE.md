# Frankenstein App

## What is this?

A live workshop demo app. A "client from hell" gives wild, contradictory requirements and
the students use Claude to implement them in real time. After each round, we push to master
and it auto-deploys to Vercel.

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Deployed on Vercel (auto-deploys on push to master)

## How to work

- **Just do it.** When the user asks for a change, implement it. Don't ask clarifying questions
  unless the request is truly ambiguous. The client is chaotic — that's the point.
- **Keep it visual.** This is a live demo. Prioritize changes people can *see* on screen.
- **Stay in `src/app/`.** All pages and components live here. Create new files as needed.
- **Use Tailwind for styling.** Inline classes in JSX. No separate CSS files unless necessary.
- **Don't break the build.** Run `npm run build` before committing if you're unsure.
- **Commit and push when asked.** The deploy flow is: commit to master → push → Vercel auto-deploys.

## Common commands

```bash
npm run dev    # local dev server on :3000
npm run build  # production build (use to verify nothing is broken)
```
