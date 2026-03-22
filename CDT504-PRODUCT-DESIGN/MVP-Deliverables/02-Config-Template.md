# Config Template and Usage Guide

> **Config without guessing, fill template directly.**

---

## Why need config template?

**Have you experienced this—**

Open a tool's config file, see a bunch of unfamiliar variable names:

```bash
FEISHU_APP_ID=
FEISHU_APP_SECRET=
FEISHU_GROUP_ADMIN=
DASHSCOPE_API_KEY=
```

Then start wondering:
- What are these?
- Where to obtain?
- What format?
- What happens if filled wrong?

**Don't worry, this is not your problem.**

So we made this config template and usage guide.

> **Goal: Let you complete config like filling out a form.**

---

## Config Template (Copy and Use)

### Step 1: Copy Template

```bash
# Execute in project root
cp .env.template .env
```

### Step 2: Open .env File

```bash
# Open with your favorite editor
nano .env
# Or
code .env
# Or
vim .env
```

### Step 3: Fill in Your Values

```bash
# ========== Feishu App Configuration ==========
# How to obtain: https://open.feishu.cn → Enterprise Self-built App → Credentials & Basic Info

# App ID: String starting with "cli_"
FEISHU_APP_ID=cli_xxxxxxxxxxxxx

# App Secret: 32-character string
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Group ID: Group for bot to join, starting with "oc_"
FEISHU_GROUP_ADMIN=oc_xxxxxxxxxxxxx

# ========== API Configuration ==========
# Alibaba Cloud Bailian API Key: https://dashscope.console.aliyun.com
# Format: String starting with sk-
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxx

# ========== Model Configuration ==========
# Default model to use (optional values see below)
DEFAULT_MODEL=bailian/qwen3.5-plus

# ========== Other Configuration ==========
# Timezone (default Asia/Shanghai)
TIMEZONE=Asia/Shanghai
```

### Step 4: Save and Validate

```bash
# After saving file, run validation script
python scripts/verify-config.py
```

**See following output indicating config success:**

```
✅ FEISHU_APP_ID config correct
✅ FEISHU_APP_SECRET config correct
✅ FEISHU_GROUP_ADMIN config correct
✅ DASHSCOPE_API_KEY config correct
✅ All config validations passed
```

**Congratulations! Config complete.** 🎉

---

## Config Item Detailed Explanation

### 1. FEISHU_APP_ID

**What:** Unique identifier for Feishu app

**Format:** `cli_` + 13 characters (e.g., `cli_a93068b69f38dbef`)

**How to obtain:**
1. Open Feishu developer console: https://open.feishu.cn
2. Log in your Feishu account
3. Click "Enterprise Self-built App" → "Create App"
4. Fill app name (e.g., "OpenClaw Assistant")
5. After creation, copy App ID from "Credentials & Basic Info" page

**FAQ:**
- Q: What does App ID start with?
- A: Starts with `cli_`, followed by 13 characters

- Q: Can multiple projects use same App ID?
- A: Yes, but suggest creating independent apps for each project for easier management

---

### 2. FEISHU_APP_SECRET

**What:** Secret key for Feishu app, used for API call authentication

**Format:** 32-character string (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

**How to obtain:**
1. Same as above, in Feishu developer console
2. In "Credentials & Basic Info" page
3. Click "Get Secret" (may need admin confirmation)
4. Copy Secret (only shown once, suggest save immediately)

**⚠️ Important Reminders:**
- Secret only shown once, lost needs regeneration
- Don't share with others
- Don't upload to GitHub or other public repos

---

### 3. FEISHU_GROUP_ADMIN

**What:** Feishu group ID for bot to join

**Format:** `oc_` + 13 characters (e.g., `oc_xxxxxxxxxxxxx`)

**How to obtain:**
1. Open target group in Feishu
2. Click top right "..." → "Group Info"
3. Scroll to bottom, find "Group ID"
4. Copy group ID

**⚠️ Notes:**
- Bot must have joined this group
- How to add bot to group:
  1. Click top right "..." in group
  2. Select "Add Members"
  3. Search your app name
  4. Add

---

### 4. DASHSCOPE_API_KEY

**What:** API key for Alibaba Cloud Bailian platform, used to call AI models

**Format:** `sk-` + 32 characters (e.g., `sk-xxxxxxxxxxxxxxxx`)

**How to obtain:**
1. Open Alibaba Cloud Bailian console: https://dashscope.console.aliyun.com
2. Log in your Alibaba Cloud account
3. Click "API-KEY Management" → "Create New API-KEY"
4. Copy API Key

**Free Quota:**
- New users have free quota
- Specific quota see official description
- Charged by usage after exceeding

---

### 5. DEFAULT_MODEL

**What:** Default AI model to use

**Optional Values:**

| Model | Description | Use Case |
|-------|-------------|----------|
| `bailian/qwen3.5-plus` | Alibaba Cloud Tongyi Qianwen | General scenarios, recommended |
| `zai/glm-5` | Zhipu GLM-5 | Document analysis |
| `minimax/MiniMax-M2.7-highspeed` | MiniMax high-speed | Fast response |
| `kimi-coding/k2p5` | Kimi coding | Programming tasks |

**How to choose:**
- Uncertain → Use `bailian/qwen3.5-plus` (default)
- Need PDF/image analysis → Use `zai/glm-5`
- Need fast response → Use `minimax/MiniMax-M2.7-highspeed`
- Programming tasks → Use `kimi-coding/k2p5`

---

## Validate Config

### Method 1: Run Validation Script

```bash
python scripts/verify-config.py
```

**Example Output:**
```
========== Config Validation Report ==========

✅ FEISHU_APP_ID config correct
✅ FEISHU_APP_SECRET config correct
✅ FEISHU_GROUP_ADMIN config correct
✅ DASHSCOPE_API_KEY config correct
✅ DEFAULT_MODEL config correct

All config validations passed! 🎉
```

### Method 2: Run One-click Diagnosis

```bash
python scripts/diagnose.py
```

Diagnosis script generates detailed report including:
- Whether config is complete
- Whether config is correct
- Potential problems and suggestions

### Method 3: Send Test Message

```python
from openclaw import send_message

send_message(
    target="test",
    message="Config validation test"
)
```

If message sends successfully, Feishu config is correct.

---

## FAQ

**Q1: Where to put config file?**

A: Put in project root, same level as `.env.template`.

**Q2: Should .env file be added to Git?**

A: **Absolutely not!** .env contains sensitive info, should add to `.gitignore`:
```bash
# .gitignore
.env
```

**Q3: What if config is wrong?**

A: Directly modify .env file, save and re-run. Config is read in real-time.

**Q4: Can different environments use different configs?**

A: Yes. Suggest:
- Development: `.env.dev`
- Production: `.env.prod`
- Copy corresponding file as `.env` when using

**Q5: Config validation failed, what to do?**

A: Troubleshoot in this order:
1. Check format is correct (e.g., App ID starts with `cli_`)
2. Check for spaces or extra characters
3. Check Secret is completely copied (32 chars)
4. Run diagnosis script to view detailed error
5. [View error solutions](03-Error-Guide.md)

---

## Config Checklist

After completing config, self-check with this list:

- [ ] .env file created (copied from .env.template)
- [ ] FEISHU_APP_ID filled (starts with `cli_`)
- [ ] FEISHU_APP_SECRET filled (32-character string)
- [ ] FEISHU_GROUP_ADMIN filled (starts with `oc_`)
- [ ] DASHSCOPE_API_KEY filled (starts with `sk-`)
- [ ] DEFAULT_MODEL filled (or keep default)
- [ ] .env file added to .gitignore
- [ ] Run validation script, all checks passed

**All checked? Congratulations, config complete!** 🎉

---

## Next Steps

After config complete, suggest continuing:

1. **[Quick Start](01-Quick-Start.md)** — If not completed yet, spend 5 min to complete first experience
2. **[Error Solution Library](03-Error-Guide.md)** — Learn solution methods for common problems
3. **[Peer Guidance Scripts](04-Troubleshooting.md)** — Learn how to solve problems independently

---

*Config Template and Usage Guide · v1.0*  
*© 2026 OpenClaw Onboarding Project · CC BY-NC-SA 4.0*
