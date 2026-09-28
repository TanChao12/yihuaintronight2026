# 毅见倾新 · The Beginning of Us — V2

Cinematic Chinese event landing page for KPZ / UKM.

## Stack
- Next.js 16 App Router
- React 19
- GSAP 3.15 + ScrollTrigger
- Lenis smooth scrolling
- TypeScript
- CSS-first visual system

## Run on Windows PowerShell
If `npm` is blocked by PowerShell script policy, use:

```powershell
npm.cmd install
npm.cmd run dev
```

Or change the current-user policy once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then:

```powershell
npm install
npm run dev
```

Open http://localhost:3000

## Vercel
Import the repository and choose **Next.js**. Leave Root Directory as `./` and keep the default build/install settings.

## Replace registration QR
V2 includes the QR artwork cropped from the supplied event poster at `public/qr.png`. Replace it if the registration link changes.

## Event data
Event copy and timeline are at the top of `app/page.tsx` so the committee can update them without touching the animation system.
