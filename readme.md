# Prasana - Portfolio & Resume Site

A minimalist, content-first portfolio website built with Next.js, inspired by OutlineCV's design philosophy.

## 🚀 Features

- **Modern Stack**: Next.js 15 + React 18 + TypeScript + Tailwind CSS
- **Smooth Animations**: Framer Motion for buttery 60fps transitions
- **Fully Containerized**: Docker-first development workflow
- **Azure Static Web Apps**: FREE hosting with global CDN
- **Static Export**: Optimized for performance and SEO
- **Responsive Design**: Mobile-first, works on all devices

## 🐳 Docker Development (Recommended)

Everything runs in containers - zero local installation needed!

### Start Development Server

```bash
docker-compose up
```

Visit [http://localhost:3000](http://localhost:3000)

### Rebuild Container

```bash
docker-compose up --build
```

### Stop Containers

```bash
docker-compose down
```

## 📦 Production Build

Build the static export:

```bash
docker-compose run web npm run build
```

Output will be in the `out/` directory.

## 🌐 Azure Static Web Apps Deployment

### Prerequisites

1. Azure account (free tier available)
2. GitHub repository
3. Azure Static Web Apps resource

### Setup Steps

1. **Create Azure Static Web App**:
   ```bash
   az staticwebapp create \
     --name prasana-cv \
     --resource-group your-resource-group \
     --source https://github.com/yourusername/prasana-resume-site \
     --location "Central US" \
     --branch main \
     --app-location "/" \
     --output-location "out" \
     --login-with-github
   ```

2. **Get Deployment Token**:
   ```bash
   az staticwebapp secrets list \
     --name prasana-cv \
     --query "properties.apiKey" \
     --output tsv
   ```

3. **Add GitHub Secret**:
   - Go to GitHub repo → Settings → Secrets → New repository secret
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: [paste the token from step 2]

4. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

GitHub Actions will automatically build and deploy your site!

## 📁 Project Structure

```
prasana-resume-site/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── cases/
│   │   ├── page.tsx          # Cases archive
│   │   └── [slug]/
│   │       └── page.tsx      # Individual case study
│   └── not-found.tsx         # 404 page
├── components/
│   ├── Navigation.tsx        # Header navigation
│   ├── CaseCard.tsx          # Case study card
│   └── CaseDetailClient.tsx  # Case detail wrapper
├── data/
│   └── cases.ts              # Case studies data
├── public/
│   └── cv.pdf                # Your resume PDF
├── Dockerfile                # Production container
├── Dockerfile.dev            # Development container
├── docker-compose.yml        # Docker services
├── staticwebapp.config.json  # Azure SWA config
└── .github/
    └── workflows/
        └── azure-static-web-apps.yml  # CI/CD pipeline
```

## 🎨 Customization

### Update Your Information

1. **Homepage** ([app/page.tsx](app/page.tsx)):
   - Update name, title, bio
   - Edit education, experience, skills sections

2. **Case Studies** ([data/cases.ts](data/cases.ts)):
   - Add/edit your project case studies
   - Each case includes: title, summary, what you did, results

3. **Navigation** ([components/Navigation.tsx](components/Navigation.tsx)):
   - Update social links
   - Change email contact

4. **Design System** ([tailwind.config.ts](tailwind.config.ts)):
   - Customize colors
   - Adjust spacing, fonts

### Add Your CV

Replace [public/cv.pdf](public/cv.pdf) with your actual resume PDF.

## 🎯 Design Philosophy

This site follows OutlineCV's content-first principles:

- **Minimalist**: Clean, no visual clutter
- **Content-Focused**: Work speaks for itself
- **Accessible**: High contrast, readable typography
- **Fast**: Static export, globally cached
- **Professional**: Polished but approachable

## 💰 Cost

**FREE** on Azure Static Web Apps:
- 100 GB bandwidth/month
- Custom domain + SSL included
- Global CDN distribution
- Automatic HTTPS

## 📝 License

MIT License - feel free to use this template for your own portfolio!
