# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Start the Development Server

```bash
docker-compose up
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### 2. Customize Your Content

Edit these files to make it yours:

#### **Your Profile** - [app/page.tsx](app/page.tsx)
```typescript
// Update your name, title, and bio
<h1 className="text-5xl font-black mb-2">Your Name</h1>
<p className="text-2xl uppercase text-mediumGray mb-6">Your Title</p>
```

#### **Your Case Studies** - [data/cases.ts](data/cases.ts)
```typescript
// Add your projects
{
  slug: "my-awesome-project",
  title: "My Awesome Project",
  date: "12/14/25",
  client: "Client Name",
  color: "cyan",
  summary: "What you built and why it matters...",
  // ... more details
}
```

#### **Social Links** - [components/Navigation.tsx](components/Navigation.tsx)
```typescript
// Update your social media links
<SocialLink href="https://linkedin.com/in/yourprofile" label="LinkedIn" />
<SocialLink href="https://github.com/yourusername" label="GitHub" />
```

#### **Your Resume** - [public/cv.pdf](public/cv.pdf)
- Replace with your actual PDF resume

### 3. Deploy to Azure (FREE)

```bash
# Create Azure Static Web App
az staticwebapp create \
  --name your-name-cv \
  --resource-group your-resource-group \
  --branch main

# Get deployment token
az staticwebapp secrets list \
  --name your-name-cv \
  --query "properties.apiKey"

# Add the token to GitHub Secrets
# Name: AZURE_STATIC_WEB_APPS_API_TOKEN
# Then push to GitHub - auto-deployment starts!
```

## 🎨 Design Colors

The site uses OutlineCV's color palette:

```typescript
colors: {
  cream: '#f6f7f1',        // Background
  darkGray: '#333333',     // Text
  mediumGray: '#777777',   // Secondary text
  accent: '#1020cc',       // Links and accents
  caseColors: {
    pink: '#ff6b9d',
    purple: '#8b5cf6',
    cyan: '#00d9ff',
    red: '#ff3b30',
    lime: '#32d74b',
  }
}
```

## 📝 Available Case Study Colors

Use these for your projects in [data/cases.ts](data/cases.ts):
- `darkGray` - Professional, serious projects
- `pink` - Creative, design-focused work
- `purple` - Tech, innovative projects
- `cyan` - Fresh, modern work
- `red` - Bold, important projects
- `lime` - Growth, success stories

## 🛠️ Docker Commands

```bash
# Start development
docker-compose up

# Rebuild after dependency changes
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Build production version
docker-compose run web npm run build
```

## 🔍 Project Structure at a Glance

```
app/
├── page.tsx           👈 Edit your homepage here
├── layout.tsx         👈 Site-wide layout and navigation
├── globals.css        👈 Global styles
└── cases/
    ├── page.tsx       👈 Cases archive page
    └── [slug]/page.tsx  👈 Individual case template

components/
├── Navigation.tsx     👈 Header with social links
├── CaseCard.tsx       👈 Case study card component
└── CaseDetailClient.tsx  Case detail page wrapper

data/
└── cases.ts          👈 Add your projects here!

public/
└── cv.pdf            👈 Replace with your resume
```

## ✅ Checklist

Before deploying, make sure you've:

- [ ] Updated your name and title in [app/page.tsx](app/page.tsx)
- [ ] Added your case studies in [data/cases.ts](data/cases.ts)
- [ ] Updated social links in [components/Navigation.tsx](components/Navigation.tsx)
- [ ] Replaced [public/cv.pdf](public/cv.pdf) with your resume
- [ ] Tested locally with `docker-compose up`
- [ ] Committed to GitHub
- [ ] Set up Azure Static Web App
- [ ] Added `AZURE_STATIC_WEB_APPS_API_TOKEN` to GitHub Secrets

## 🆘 Need Help?

Check the main [README.md](readme.md) for detailed documentation!
