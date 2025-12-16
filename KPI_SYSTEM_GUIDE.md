# KPI Display System Guide

This guide explains how to use, customize, and extend the KPI visualization system for your resume website.

## Overview

The KPI system automatically displays your key performance metrics using **intelligent visualization styles** based on the type of metric. Different KPI types are rendered differently:

- **Count-based metrics** (40+ Apps, 240+ Findings) → **Stats Cards** with animated numbers
- **Percentage metrics** (95%+, 99.5%) → **Circular Progress** indicators
- **Reduction/Improvement metrics** (60% faster, 70% reduction) → **Progress Bars**
- **Badge previews** on experience cards → **Compact Pills**

---

## Quick Start

### 1. Edit Your KPIs

Open `kpis.json` and update the `value` field for any metric:

```json
{
  "label": "Applications in Security Pipeline",
  "value": "40+",  ← Change this number
  "description": "Managed security pipeline across Azure DevOps..."
}
```

### 2. Changes Reflect Automatically

The website reads from `kpis.json` on every page load, so your changes appear immediately after rebuilding.

---

## File Structure

```
/
├── kpis.json                          # Your KPI data (EDIT THIS FILE)
├── components/
│   ├── KPIDisplay.tsx                 # All visualization components
│   ├── ExperienceCard.tsx             # Shows 3 KPI badges on cards
│   └── ExperienceDetailClient.tsx     # Shows full KPI grid on detail pages
├── lib/
│   └── kpis.ts                        # Utility functions to load KPIs
└── KPI_SYSTEM_GUIDE.md                # This file
```

---

## KPI Data Format

Each KPI has three properties:

```json
{
  "label": "Short Label",           // Display name
  "value": "40+",                   // The metric value (string)
  "description": "Full context..."  // Tooltip/description
}
```

### Supported Value Formats

| Format | Example | Renders As |
|--------|---------|------------|
| `40+` | Applications | Stats Card with animated number |
| `95%` | Scan Coverage | Circular Progress (if ≥80%) or Progress Bar |
| `60%` (with "reduction" in label) | MTTR Reduction | Progress Bar |
| `99.5%` | Uptime | Circular Progress |
| `10M+` | Lines of Code | Stats Card |

---

## Visualization Components

### 1. **StatsCard** (Default for counts)
Large animated numbers with gradient backgrounds.

```tsx
<StatsCard kpi={{
  label: "Applications",
  value: "40+",
  description: "Managed across CI/CD platforms"
}} />
```

**Best for:** Applications, findings, team size, deployments

---

### 2. **CircularProgress** (For high percentages)
Animated circular rings that draw clockwise.

```tsx
<CircularProgress kpi={{
  label: "Scan Coverage",
  value: "95%",
  description: "Across SAST, DAST, SCA"
}} />
```

**Best for:** Coverage %, uptime %, completion rates ≥80%

---

### 3. **ProgressBar** (For reductions/improvements)
Horizontal bars with gradient fills.

```tsx
<ProgressBar kpi={{
  label: "MTTR Reduction",
  value: "60%",
  description: "Through automated gates"
}} />
```

**Best for:** Reductions, improvements, savings

---

### 4. **KPIBadge** (Compact pills)
Used on experience cards for quick preview.

```tsx
<KPIBadge kpi={{
  label: "Apps",
  value: "40+",
  description: "..."
}} />
```

**Best for:** Homepage experience cards (shows top 3 KPIs)

---

### 5. **StatRow** (Dense lists)
Compact rows for overflow metrics.

```tsx
<StatRow kpi={{...}} />
```

**Best for:** Additional metrics when you have >8 count-based KPIs

---

## How to Add New KPIs

### For Existing Experiences

1. Open `kpis.json`
2. Find your experience by `id` (e.g., `"qualitest-cyber-security-specialist"`)
3. Add a new object to the `kpis` array:

```json
{
  "experiences": [
    {
      "id": "qualitest-cyber-security-specialist",
      "kpis": [
        // ... existing KPIs
        {
          "label": "New Metric Name",
          "value": "100+",
          "description": "What this metric means"
        }
      ]
    }
  ]
}
```

### For New Experiences

If you add a new job experience, you need to:

1. Add it to `data/cases.ts` (experience data)
2. Add it to `kpis.json` with the same structure
3. Map the slug in `lib/kpis.ts`:

```typescript
export const experienceSlugToKPIId: Record<string, string> = {
  "your-company-slug": "your-kpi-id",
  // ... existing mappings
};
```

---

## Customization

### Change Which KPIs Show on Cards

Edit `ExperienceCard.tsx`, line 17:

```tsx
const topKPIs = getTopKPIsForExperience(kpiId, 3); // Change 3 to show more/fewer
```

### Change Visualization Style

The system auto-detects the best visualization based on the value, but you can override it:

```tsx
<SmartKPI kpi={myKPI} style="circular" />
// Options: "card" | "progress" | "badge" | "circular" | "metric" | "row" | "auto"
```

### Customize Colors

Edit `components/KPIDisplay.tsx` to change gradients:

```tsx
// Stats Cards
className="bg-gradient-to-br from-darkGray/5 to-accent/5"

// Progress Bars
className="bg-gradient-to-r from-accent to-cyan-400"

// Badges
className="bg-accent/10 border-accent/20"
```

### Adjust Animation Speed

In `KPIDisplay.tsx`, search for `duration:` to adjust animation timing:

```tsx
// Number count-up speed
const duration = 1500; // milliseconds

// Framer Motion animations
transition={{ duration: 0.5, delay }}
```

---

## Where KPIs Appear

### Homepage (`app/page.tsx`)
- **Experience cards** show **top 3 KPIs as badges**
- Compact, scannable format

### Experience Detail Pages (`/experience/[slug]`)
- **Full KPI section** with all visualizations
- Categorized by type (counts, percentages, improvements)
- Animated on scroll

---

## Troubleshooting

### KPIs Not Showing Up

1. **Check the mapping** in `lib/kpis.ts` - does your experience slug match the KPI ID?
2. **Verify JSON syntax** - use a JSON validator if needed
3. **Check the console** for errors when the page loads

### Wrong Visualization Type

The auto-detection looks at:
- Value format (`%`, `+`, numbers)
- Label keywords (`reduction`, `improvement`)

To force a specific type, use `<SmartKPI style="progress" />` instead of relying on auto-detection.

### TypeScript Errors

The IDE may show errors before building with Docker. These are safe to ignore - the Docker build includes all dependencies.

---

## Examples from Your Resume

### Count-Based (Stats Cards)
```json
{
  "label": "Applications in Security Pipeline",
  "value": "40+",
  "description": "Managed security pipeline across Azure DevOps, Jenkins..."
}
```

### Percentage (Circular Progress)
```json
{
  "label": "Scan Coverage",
  "value": "95%+",
  "description": "Coverage across SAST, DAST, SCA, and container security scans"
}
```

### Reduction (Progress Bar)
```json
{
  "label": "MTTR Reduction",
  "value": "60%",
  "description": "Reduced mean time to remediation through automated security gates"
}
```

---

## Tips for Great KPIs

✅ **Use specific numbers:** "40+ apps" beats "many apps"
✅ **Show impact:** "60% faster" beats "improved speed"
✅ **Keep descriptions short:** One sentence max
✅ **Be consistent:** Use `+` for counts (10+, 40+, 100+)
✅ **Round percentages:** 95% beats 94.7%

❌ Avoid vague terms like "several", "numerous", "significant"
❌ Don't duplicate KPIs across experiences
❌ Don't use KPIs for non-quantifiable things

---

## Advanced: Custom Visualization

To create a completely custom KPI visualization:

1. Add a new component to `KPIDisplay.tsx`
2. Export it
3. Import it in `ExperienceDetailClient.tsx`
4. Use it in the KPI section

Example:

```tsx
// In KPIDisplay.tsx
export function CustomMetric({ kpi }: { kpi: KPI }) {
  return (
    <div className="...">
      {/* Your custom design */}
    </div>
  );
}

// In ExperienceDetailClient.tsx
<CustomMetric kpi={someKPI} />
```

---

## Summary

- **Edit KPIs:** Open `kpis.json`, change the `value` field
- **Auto-visualization:** System picks the best display style automatically
- **Homepage:** Shows top 3 as badges
- **Detail pages:** Shows all with full visualizations
- **Rebuild Docker** to see changes

Enjoy your data-driven resume! 🚀
