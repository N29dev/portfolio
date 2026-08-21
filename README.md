# Nurlybek (N29) — Portfolio

Modern personal portfolio website.

**Live (after enabling Pages):** https://n29dev.github.io/portfolio

## How to enable GitHub Pages

1. Go to the repository: https://github.com/N29dev/portfolio
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main` → folder: `/ (root)` → Save
5. Wait 1–2 minutes. Your site will be at:
   - `https://n29dev.github.io/portfolio`

## Using your domain `n29.kz`

Currently `n29.kz` points to the **GK Reaction Trainer** repo.

### Option A — Make portfolio the main site on n29.kz
1. In this repo (`portfolio`), go to Settings → Pages
2. Under **Custom domain**, type `n29.kz` and save
3. GitHub will create a `CNAME` file
4. In your domain registrar (DNS settings for n29.kz):
   - Add / update **A records** to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or use **CNAME** record for `www` → `n29dev.github.io`
5. Remove the old `CNAME` file from the `gk-reaction-trainer` repo (or change it to a subdomain like `gk.n29.kz`)

### Option B — Keep trainer on n29.kz and put portfolio on a subdomain
- Use `portfolio.n29.kz` or just use the free GitHub URL `n29dev.github.io/portfolio`

## Customize

Edit `index.html` to change:
- Bio text
- Project descriptions / links
- Skills
- Social links

Then commit & push — Pages will update automatically.

---

Made for Nurlybek · Aktau, Kazakhstan
