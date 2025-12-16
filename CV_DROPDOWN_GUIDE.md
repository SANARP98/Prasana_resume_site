# CV Dropdown System Guide

## Overview

Your website now has an intelligent CV dropdown menu in the navigation bar. It automatically detects and displays all PDF and DOCX files from the `/public/cv/` folder.

---

## How It Works

### 1. **Automatic Detection**
- The system scans `/public/cv/` for `.pdf` and `.docx` files
- Files are automatically added to the dropdown
- No code changes needed when adding/removing CVs

### 2. **Dropdown Features**
- Click the "CV" button to see all available resumes
- Hover effects highlight each option
- Click any CV to download it
- Dropdown closes automatically after selection
- Click outside to close dropdown
- Shows file type (PDF/DOCX) badge

### 3. **Smart Naming**
- Filename → Display name conversion
- `Prasana_CV_DevSecOps.pdf` → **"Prasana CV DevSecOps"**
- Underscores are replaced with spaces
- Files are sorted alphabetically

---

## Adding Your CVs

### Step 1: Prepare Your CV Files

Rename your files using this pattern:
```
Prasana_CV_[Specialization].pdf
Prasana_Resume_[Job_Type].pdf
```

Examples:
- `Prasana_CV_DevSecOps.pdf`
- `Prasana_CV_Cloud_Security.pdf`
- `Prasana_CV_Platform_Engineer.pdf`
- `Prasana_Resume_Full_Stack.pdf`
- `Prasana_Resume_2_Page.docx`

### Step 2: Copy Files to the CV Folder

```bash
cp /path/to/your/cv.pdf public/cv/Prasana_CV_DevSecOps.pdf
```

Or drag and drop files into:
```
/public/cv/
```

### Step 3: Rebuild Docker (if needed)

If the site is running in Docker:
```bash
docker-compose restart
```

The files will appear in the dropdown automatically!

---

## Current Sample Files

Two placeholder PDFs are included for demonstration:
- `Prasana_CV_DevSecOps.pdf`
- `Prasana_Resume_Cloud_Security.pdf`

**Replace these with your actual CVs!**

---

## File Structure

```
/public/cv/
├── README.md                              # Instructions
├── Prasana_CV_DevSecOps.pdf              # Sample (replace with yours)
├── Prasana_Resume_Cloud_Security.pdf     # Sample (replace with yours)
└── [Your actual CV files go here]
```

---

## Dropdown Behavior

### When CVs Exist:
```
┌─────────────────────────────────┐
│ CV ▼                            │ ← Button
└─────────────────────────────────┘
        ↓ (on click)
┌─────────────────────────────────┐
│ Prasana CV DevSecOps       PDF  │ ← Clickable
│ Prasana Resume Cloud...   PDF  │
│ Prasana CV Platform...    DOCX │
└─────────────────────────────────┘
```

### When No CVs:
```
┌─────────────────────────────────┐
│ No CV files available           │
│ Add files to /public/cv/        │
└─────────────────────────────────┘
```

---

## Customization

### Change Number of CVs Displayed

All CVs are shown by default. To limit the dropdown, edit `components/Navigation.tsx`:

```tsx
// Show only first 5 CVs
{cvFiles.slice(0, 5).map((cv, index) => (
  <a href={cv.path} download>
    {cv.name}
  </a>
))}
```

### Change Dropdown Styling

Edit `components/Navigation.tsx` to customize colors, sizes, etc:

```tsx
// Change dropdown width
className="w-64"  // Change to w-80, w-96, etc.

// Change background color
className="bg-white"  // Change to bg-cream, bg-darkGray, etc.

// Change hover color
className="hover:bg-accent/10"  // Adjust accent color
```

### Add File Icons

You can add custom icons for PDF vs DOCX:

```tsx
{cv.extension === '.pdf' ? (
  <svg><!-- PDF Icon --></svg>
) : (
  <svg><!-- DOCX Icon --></svg>
)}
```

---

## Best Practices

### ✅ DO:
- Use descriptive filenames
- Keep filenames under 50 characters
- Use underscores instead of spaces
- Update CVs regularly
- Test downloads after adding files

### ❌ DON'T:
- Use spaces in filenames (use underscores)
- Use special characters (!, @, #, etc.)
- Upload files larger than 5MB
- Use unclear names like `cv1.pdf`, `resume_final.pdf`

---

## Recommended CV Variants

Create specialized versions for different roles:

1. **Prasana_CV_DevSecOps.pdf**
   - Focus: Security automation, CI/CD pipelines
   - Highlight: SAST/DAST, Kubernetes security

2. **Prasana_CV_Cloud_Security.pdf**
   - Focus: Azure security, compliance, audits
   - Highlight: CIS Benchmarks, PCI DSS, SOC 2

3. **Prasana_CV_Platform_Engineer.pdf**
   - Focus: Infrastructure, containers, automation
   - Highlight: Kubernetes, Terraform, GitLab CI/CD

4. **Prasana_Resume_Full.pdf**
   - Comprehensive 2-3 page version
   - All skills and projects

5. **Prasana_Resume_1_Page.pdf**
   - Condensed single-page version
   - For quick applications

---

## Troubleshooting

### Dropdown Not Showing Files

1. **Check file location:**
   ```bash
   ls -la public/cv/
   ```

2. **Verify file extensions:**
   - Must be `.pdf` or `.docx` (lowercase)

3. **Rebuild Docker:**
   ```bash
   docker-compose restart
   ```

### Files Not Downloading

1. **Check file permissions:**
   ```bash
   chmod 644 public/cv/*.pdf
   ```

2. **Verify file paths:**
   - Files must be in `/public/cv/`
   - Not `/cv/` or `/public/cvs/`

### Dropdown Doesn't Close

- Click outside the dropdown area
- Press ESC key (if implemented)
- Refresh the page

---

## Technical Details

### Component: `Navigation.tsx`
- Uses React state to manage dropdown open/close
- Implements click-outside detection
- Animated with Framer Motion

### Utility: `lib/cv.ts`
- Reads files from `/public/cv/` server-side
- Filters for `.pdf` and `.docx` only
- Sorts alphabetically by display name
- Returns downloadable paths

### Layout: `app/layout.tsx`
- Fetches CV files on server render
- Passes files to Navigation component
- Updates automatically on rebuild

---

## Example File Names

Good:
- ✅ `Prasana_CV_DevSecOps.pdf`
- ✅ `Prasana_Resume_Cloud_Security_Engineer.pdf`
- ✅ `Prasana_CV_2025.pdf`

Bad:
- ❌ `my cv.pdf` (spaces)
- ❌ `CV-Final-FINAL (1).pdf` (unclear, special chars)
- ❌ `resume.docx` (too generic)

---

## Summary

1. **Add CVs** → Copy PDF/DOCX files to `/public/cv/`
2. **Name properly** → Use `Prasana_CV_[Role].pdf` format
3. **Rebuild** → Restart Docker if needed
4. **Test** → Click CV button, select a file, verify download

Your CV dropdown is now fully functional and will automatically display all files you add to the folder! 🎉
