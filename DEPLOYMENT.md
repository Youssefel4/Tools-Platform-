# Quick Deployment Commands

## 🚀 Quick Start (Copy & Paste)

### Step 1: Initialize Git
```bash
cd c:\Users\hp\Desktop\tools
git init
git add .
git commit -m "Initial commit: Tools Platform v1.0"
```

### Step 2: Create GitHub Repository
Go to https://github.com/new and create a repository named `tools-platform`

### Step 3: Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/tools-platform.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your `tools-platform` repository
4. Build settings (auto-detected from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

## ✅ That's it! Your site will be live in ~2 minutes.

---

## 📝 Future Updates

To update your live site:
```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push origin main
# Netlify auto-deploys!
```

---

## 🔗 Useful Links

- **Netlify Dashboard:** https://app.netlify.com
- **GitHub Repository:** https://github.com/YOUR_USERNAME/tools-platform
- **Full Guide:** See deployment_guide.md
