# CDT501 Deployment Record

## Deployment Information

| Field | Value |
|-------|-------|
| **Course** | CDT501 - 探索人工智能 (Exploring Artificial Intelligence) |
| **Deployment Date** | 2026-03-22 |
| **Git Commit Hash** | `30c7082` |
| **Live URL** | https://xun-n.github.io/xun-n/cdt501/ |

## Structure Created

```
xun-n-.github.io/
├── cdt501/
│   ├── index.html          # Landing page
│   └── README.md           # Course info
├── _cdt501_pages/          # Future lesson pages
│   └── (empty for now)
├── index.html              # Updated with Courses section
├── CDT501-DEPLOY.md        # This file
└── CDT501-README.md        # Structure documentation
```

## Changes Made

1. **Created CDT501 folder structure** (`cdt501/`, `_cdt501_pages/`)
2. **Created landing page** (`cdt501/index.html`) with placeholder content
3. **Updated `_config.yml`** - Added cdt501_pages collection and navigation
4. **Updated `index.html`** - Added Courses section with CDT501 and CDT502 links

## Recovery Instructions

### Rollback to Previous State

```bash
# Navigate to repository
cd /home/xun/xun-n-.github.io

# Reset to commit before CDT501 (replace HASH with actual pre-deployment hash)
git reset --hard HASH

# Force push to GitHub (⚠️ Dangerous - overwrites remote)
git push -f origin main
```

### Remove CDT501 Files Only

```bash
# Remove CDT501 specific files
git rm -r cdt501/
git rm -r _cdt501_pages/
git rm CDT501-DEPLOY.md

# Revert config changes manually (see git diff)
git checkout _config.yml

# Commit and push
git commit -m "Revert: Remove CDT501 section"
git push origin main
```

## Verification Checklist

- [ ] Landing page loads: https://xun-n.github.io/xun-n/cdt501/
- [ ] Navigation links work
- [ ] Main index shows Courses section
- [ ] Jekyll builds without errors

---
*Deployed: 2026-03-22*
