## RootAccess.tech Scrollytelling Prototype

This is a minimal Next.js App Router setup for the RootAccess.tech scrollytelling experience.

### Tech stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animation**: GSAP + ScrollTrigger

### Key route

- **`/roadmaps/soc`**: Demonstrates the pinned scroll stage and world viewport.

### Development

```bash
npm install
npm run dev
```

`npm run dev` uses the stable Webpack dev server. If you explicitly want Turbopack, use `npm run dev:turbo`.

Then open `http://localhost:3000/roadmaps/soc`.

If you see Webpack `ENOENT` / missing `./NNN.js` chunks, or `/_next/static/...` 404s after a config change: **stop** the dev server, run `npm run clean`, start `npm run dev` again, and do a **hard refresh** in the browser (Ctrl+Shift+R). To wipe `.next` and start in one step:

```bash
npm run dev:clean
```

Use a single dev server instance. Avoid syncing the repo with OneDrive/Dropbox/Google Drive or aggressive antivirus scanning `.next`.

