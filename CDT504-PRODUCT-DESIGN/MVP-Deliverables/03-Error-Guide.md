# Error Solution Library

> **Don't panic when encountering problems, 90% of errors have standard answers.**

---

## Hello, what problem did you encounter?

**First take a deep breath, then tell me:**

> Errors are not your fault.
> 
> Every developer encounters errors every day. The difference is,
> experienced people know where to find answers.

**This error library is your book of answers.**

---

## Quick Index

Find your error code, jump directly to solution:

### 🔧 Config Errors (ERR-CONFIG-xxx)
- [ERR-CONFIG-001](#err-config-001) — FEISHU_APP_ID not configured
- [ERR-CONFIG-002](#err-config-002) — FEISHU_APP_SECRET not configured
- [ERR-CONFIG-003](#err-config-003) — FEISHU_GROUP_ADMIN not configured
- [ERR-CONFIG-004](#err-config-004) — DASHSCOPE_API_KEY not configured
- [ERR-CONFIG-005](#err-config-005) — .env file does not exist
- [ERR-CONFIG-006](#err-config-006) — FEISHU_APP_ID format error
- [ERR-CONFIG-007](#err-config-007) — FEISHU_APP_SECRET format error
- [ERR-CONFIG-008](#err-config-008) — FEISHU_GROUP_ADMIN format error
- [ERR-CONFIG-009](#err-config-009) — DASHSCOPE_API_KEY format error
- [ERR-CONFIG-010](#err-config-010) — Config file permission problem

### 🔐 Permission Errors (ERR-PERM-xxx)
- [ERR-PERM-001](#err-perm-001) — Feishu app insufficient permissions
- [ERR-PERM-002](#err-perm-002) — Bot not joined group
- [ERR-PERM-003](#err-perm-003) — API Key insufficient permissions
- [ERR-PERM-004](#err-perm-004) — Tenant permission restriction
- [ERR-PERM-005](#err-perm-005) — Admin approval pending

### 🌐 Network Errors (ERR-NET-xxx)
- [ERR-NET-001](#err-net-001) — API timeout
- [ERR-NET-002](#err-net-002) — Connection refused
- [ERR-NET-003](#err-net-003) — DNS resolution failed
- [ERR-NET-004](#err-net-004) — SSL certificate error
- [ERR-NET-005](#err-net-005) — Proxy config problem
- [ERR-NET-006](#err-net-006) — Firewall blocking
- [ERR-NET-007](#err-net-007) — Service unavailable
- [ERR-NET-008](#err-net-008) — Rate limit

### 🧩 Skill Errors (ERR-SKILL-xxx)
- [ERR-SKILL-001](#err-skill-001) — Skill not found
- [ERR-SKILL-002](#err-skill-002) — Skill execution failed
- [ERR-SKILL-003](#err-skill-003) — Skill parameter error
- [ERR-SKILL-004](#err-skill-004) — Skill timeout
- [ERR-SKILL-005](#err-skill-005) — Skill dependency missing
- [ERR-SKILL-006](#err-skill-006) — Skill version incompatible
- [ERR-SKILL-007](#err-skill-007) — Skill insufficient permissions
- [ERR-SKILL-008](#err-skill-008) — Skill config error
- [ERR-SKILL-009](#err-skill-009) — Skill return parsing failed
- [ERR-SKILL-010](#err-skill-010) — Skill circular call

### 📦 Other Errors (ERR-OTHER-xxx)
- [ERR-OTHER-001](#err-other-001) — Python version incompatible
- [ERR-OTHER-002](#err-other-002) — Dependency package missing
- [ERR-OTHER-003](#err-other-003) — File path error
- [ERR-OTHER-004](#err-other-004) — Insufficient memory
- [ERR-OTHER-005](#err-other-005) — Insufficient disk space
- [ERR-OTHER-006](#err-other-006) — Encoding problem
- [ERR-OTHER-007](#err-other-007) — Timezone config error

---

## Detailed Solutions

### ERR-CONFIG-001 — FEISHU_APP_ID Not Configured

**Error Message:**
```
ValueError: FEISHU_APP_ID is not set
```

**What you might also see:**
- "Missing required environment variable"
- "FEISHU_APP_ID is empty"

**Cause:**
.env file not configured with FEISHU_APP_ID

**Impact:**
Cannot call Feishu API, all message sending functions fail

**Solution Steps:**

1️⃣ **Open .env file**
```bash
# In project root
nano .env
# Or use other editor
```

2️⃣ **Add FEISHU_APP_ID**
```bash
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
```

3️⃣ **Save file and re-run**

**Validate:**
```bash
python scripts/verify-config.py --check FEISHU_APP_ID
```

**How to obtain FEISHU_APP_ID:**
1. Open Feishu developer console: https://open.feishu.cn
2. Enter your enterprise self-built app
3. Copy App ID from "Credentials & Basic Info" page
4. App ID starts with `cli_`

**Related Resources:**
- [Config Template and Usage](02-Config-Template.md#1-feishu_app_id)
- [Feishu App Creation Guide](Link)

---

### ERR-CONFIG-002 — FEISHU_APP_SECRET Not Configured

**Error Message:**
```
ValueError: FEISHU_APP_SECRET is not set
```

**Cause:**
.env file not configured with FEISHU_APP_SECRET

**Solution Steps:**

1️⃣ **Open .env file**

2️⃣ **Add FEISHU_APP_SECRET**
```bash
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3️⃣ **Save and validate**
```bash
python scripts/verify-config.py --check FEISHU_APP_SECRET
```

**How to obtain FEISHU_APP_SECRET:**
1. Feishu developer console → Enterprise self-built app
2. "Credentials & Basic Info" → "Get Secret"
3. ⚠️ Secret only shown once, save immediately

**⚠️ Important Reminders:**
- Lost Secret needs regeneration
- Don't share to public channels
- Don't upload to GitHub

---

### ERR-CONFIG-003 — FEISHU_GROUP_ADMIN Not Configured

**Error Message:**
```
ValueError: FEISHU_GROUP_ADMIN is not set
```

**Cause:**
Target group ID not configured

**Solution Steps:**

1️⃣ **Get group ID**
- Feishu group → Top right "..." → "Group Info"
- Scroll to bottom, copy "Group ID" (starts with `oc_`)

2️⃣ **Add to .env file**
```bash
FEISHU_GROUP_ADMIN=oc_xxxxxxxxxxxxx
```

3️⃣ **Validate**
```bash
python scripts/verify-config.py --check FEISHU_GROUP_ADMIN
```

**⚠️ Notes:**
- Bot must have joined this group
- How to add bot: Group → "Add Members" → Search app name

---

### ERR-CONFIG-004 — DASHSCOPE_API_KEY Not Configured

**Error Message:**
```
ValueError: DASHSCOPE_API_KEY is not set
```

**Cause:**
Alibaba Cloud Bailian API Key not configured

**Solution Steps:**

1️⃣ **Get API Key**
- Open: https://dashscope.console.aliyun.com
- API-KEY Management → Create New API-KEY
- Copy API Key (starts with `sk-`)

2️⃣ **Add to .env file**
```bash
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxx
```

3️⃣ **Validate**
```bash
python scripts/verify-config.py --check DASHSCOPE_API_KEY
```

---

### ERR-CONFIG-005 — .env File Does Not Exist

**Error Message:**
```
FileNotFoundError: [Errno 2] No such file or directory: '.env'
```

**Cause:**
No .env file in project root

**Solution Steps:**

1️⃣ **Copy template file**
```bash
cp .env.template .env
```

2️⃣ **Edit .env file**
```bash
nano .env
# Fill in your config values
```

3️⃣ **Validate**
```bash
python scripts/check-config.py
```

**Prevention:**
- First thing after cloning project: copy .env.template

---

### ERR-PERM-001 — Feishu App Insufficient Permissions

**Error Message:**
```
FeishuAPIError: insufficient permission
```

**Cause:**
Feishu app not enabled required permissions

**Solution Steps:**

1️⃣ **Open Feishu developer console**

2️⃣ **Enter permission management**
- Your app → Permission Management

3️⃣ **Enable required permissions**
- ✅ Send messages
- ✅ Read group info
- ✅ Bot management

4️⃣ **Save and publish version**

5️⃣ **Wait for effect (usually 1-2 min)**

**Validate:**
Re-run your code, see if permission error still occurs.

---

### ERR-PERM-002 — Bot Not Joined Group

**Error Message:**
```
FeishuAPIError: bot not in group
```

**Cause:**
Bot not joined target group

**Solution Steps:**

1️⃣ **Open target group**

2️⃣ **Add bot**
- Top right "..." → "Add Members"
- Search your app name
- Click add

3️⃣ **Validate**
- See bot avatar in group
- Re-send test message

---

### ERR-NET-001 — API Timeout

**Error Message:**
```
requests.exceptions.Timeout: Connection timed out
```

**Cause:**
Network connection timeout, possible reasons:
- Network unstable
- API server slow response
- Firewall blocking

**Solution Steps:**

1️⃣ **Check network connection**
```bash
ping open.feishu.cn
```

2️⃣ **Retry request**
- Network fluctuation common, retry usually solves

3️⃣ **Check firewall**
- Ensure not blocking Feishu API domain

4️⃣ **Increase timeout setting**
```python
# Increase timeout in code
timeout=30  # Default might be 10 sec
```

**If continuous timeout:**
- Check if in special network environment (company intranet, VPN, etc.)
- Try switching network

---

### ERR-SKILL-001 — Skill Not Found

**Error Message:**
```
SkillNotFoundError: Skill 'xxx' not found
```

**Cause:**
Called skill doesn't exist or not correctly configured

**Solution Steps:**

1️⃣ **Check skill name**
- Confirm spelling correct
- Case sensitive

2️⃣ **Check if skill installed**
```bash
openclaw skills list
```

3️⃣ **Install missing skill**
```bash
openclaw skills install skill-name
```

4️⃣ **Validate**
```bash
openclaw skills test skill-name
```

---

### ERR-OTHER-001 — Python Version Incompatible

**Error Message:**
```
ImportError: No module named 'xxx'
```

**Cause:**
Python version doesn't meet requirements (needs Python 3.8+)

**Solution Steps:**

1️⃣ **Check Python version**
```bash
python --version
```

2️⃣ **If version too low, upgrade Python**
- Recommend Python 3.10 or 3.11
- Download: https://www.python.org

3️⃣ **Reinstall dependencies**
```bash
pip install -r requirements.txt
```

---

## Usage Tips

### Tip 1: Quickly Locate Error

After seeing error, first find **error code** (e.g., ERR-CONFIG-001), then jump directly to corresponding solution.

### Tip 2: Browse by Category

If unsure of error code, browse by category:
- Config problems → Config errors
- Permission problems → Permission errors
- Network problems → Network errors
- Skill problems → Skill errors

### Tip 3: Easy to Hard

Suggested solution order:
1. Config errors (most common, easiest to solve)
2. Permission errors (need admin operation)
3. Network errors (may need IT support)
4. Skill errors (need check skill config)

---

## FAQ

**Q1: My error is not in the list, what to do?**

A: Three steps:
1. Run diagnosis script: `python scripts/diagnose.py`
2. View complete error log
3. [View peer guidance scripts](04-Troubleshooting.md), learn how to seek help

**Q2: Still can't solve following steps, what to do?**

A: May have encountered special situation. Suggest:
1. Record complete error message
2. Record solutions you've tried
3. View [Peer Guidance Scripts](04-Troubleshooting.md)
4. Seek human support

**Q3: Will error library be updated?**

A: Yes. After encountering and solving new errors, we'll update to error library to help more people.

**Q4: Can I contribute error solutions?**

A: Welcome! If you solved a new error, you can:
1. Record error message and solution steps
2. Submit to project Issue
3. We'll review and add to error library

---

## Final Words

**Don't self-doubt when encountering errors.**

> Every error is a learning opportunity.
> 
> Solving one error means you accumulate one experience.
> 
> Accumulate more, and you're the "expert" in others' eyes.

**And this error library is your experience accelerator.**

---

*Error Solution Library · v1.0*  
*50 Common Errors, Continuously Updating*  
*© 2026 OpenClaw Onboarding Project · CC BY-NC-SA 4.0*
