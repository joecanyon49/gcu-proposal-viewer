# GCU Proposal Viewer

A minimal, standalone Next.js app for viewing GCU partnership proposals. This is deployed separately from the main GCU Development Portal so that shared proposal links don't expose the internal portal URL.

## How It Works

1. Proposals are created in the **main GCU Development Portal**
2. When you click "Share", a unique ID is generated and the proposal is stored in PostgreSQL
3. The shareable link points to **this separate viewer site** (e.g., `https://gcu-proposals.vercel.app/abc123def456`)
4. Clients see a clean, professional proposal without any portal branding

## Deployment to Vercel

### 1. Create a New Vercel Project

1. Go to [vercel.com](https://vercel.com) and create a new project
2. Import this `gcu-proposal-viewer` folder as a new project
3. You can use your existing Vercel account or create a new one for separation

### 2. Add Environment Variables

Add the **same PostgreSQL credentials** as your main portal:

```
POSTGRES_URL=your_postgres_connection_string_here
```

This connects to the same database, so proposals created in the portal are instantly viewable here.

### 3. Deploy

That's it! Vercel will automatically deploy and give you a URL like:
- `gcu-proposal-viewer.vercel.app`

### 4. (Optional) Custom Domain

For a more professional look, you can add a custom domain:
- `proposals.gcu.dev`
- `gcuproposals.com`
- etc.

## Updating the Main Portal

After deploying, update the main portal to generate links with your new domain:

In `src/app/tools/proposal-builder/page.tsx`, change:
```typescript
const url = `${window.location.origin}/share/${id}`;
```

To:
```typescript
const url = `https://YOUR-NEW-DOMAIN.vercel.app/${id}`;
```

## Development

```bash
npm install
npm run dev
```

The dev server runs on port 3001 to avoid conflict with the main portal on 3000.

## Notes

- Images reference the main portal URL for assets (logos, template images)
- No authentication required - proposals are public by design
- The connection uses the same PostgreSQL database as the main portal
