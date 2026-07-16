# Deployment

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Shazonique's Inspirations v1"
git branch -M main
git remote add origin https://github.com/<you>/shazoniques-inspirations.git
git push -u origin main
```

## 2. Deploy on Vercel

1. Go to **vercel.com → Add New → Project**.
2. Import the repository.
3. Vercel detects Next.js. **Change nothing.** Framework: Next.js. Build: `next build`.
   Output: `.next`.
4. **No environment variables are required.**
5. Click **Deploy**.

The first build takes about two minutes. Every push to `main` redeploys automatically; every
pull request gets its own preview URL.

## 3. Point the domain

**Project → Settings → Domains → Add.** Vercel gives you the DNS records to set with your
registrar. An apex domain wants an `A` record; a `www` subdomain wants a `CNAME`.

Then update `SITE.url` in `data/site.ts` to the live domain. This matters — it is what
`sitemap.xml`, `robots.txt`, canonical URLs, and every Open Graph social preview are built
from. **If you skip this, social shares will point at the placeholder domain.**

## 4. After launch

- Submit `https://<your-domain>/sitemap.xml` to Google Search Console.
- Share one reflection URL on Facebook and WhatsApp and confirm the preview card renders.
- Turn on Vercel Analytics if you want traffic numbers (privacy-conscious, no cookie banner).

## Rollback

**Vercel → Deployments → the last good one → Promote to Production.** Instant. Nothing is lost.
