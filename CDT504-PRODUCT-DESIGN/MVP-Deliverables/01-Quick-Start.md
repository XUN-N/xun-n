# 5-Minute Quick Start OpenClaw

> **After 5 minutes, you may not be an expert yet, but you're already on your way.**

---

## Hello, Welcome to the World of OpenClaw

Before we begin, I want to ask you a question:

> **Have you ever experienced this—**> 
> Downloaded a powerful tool, opened it with full expectation,
> but was deterred by a pile of configuration files and unfamiliar terminology?
> 
> You wanted to use automation to improve work efficiency,
> but got stuck at the first step of "environment variable configuration"?
> > You searched for many tutorials, but each assumed you already knew a lot,
> and finally could only silently close it, telling yourself "maybe I'm not suitable"?

**If yes, this is not your problem. It's the tool's problem.**

So, we made this quick start guide. The goal is only one:

> **Let you complete your first successful experience in 5 minutes.**

Not 30 minutes, not 1 hour, but 5 minutes.

---

## Pre-start Check (30 sec)

Please first confirm these 3 items (all very simple):

- [ ] **OpenClaw and dependencies installed**
  - If not installed yet → [Installation Guide](Link)
  - Estimated time: 3 minutes
  
- [ ] **Feishu app credentials obtained**
  - If not obtained yet → [Feishu App Creation Guide](Link)
  - Need: App ID, App Secret, Group ID
  
- [ ] **5 minutes free time**
  - Need focus, not recommended to operate while in meetings

**All confirmed? Good, let's start.**

---

## Step 1: Config Check (2 min)

### 1.1 Open Terminal

```bash
# Enter your OpenClaw directory
cd /path/to/your/openclaw
```

### 1.2 Run Config Check Script

```bash
python scripts/check-config.py
```

### 1.3 View Output

**✅ If you see:**
```
✅ .env file exists
✅ FEISHU_APP_ID configured
✅ FEISHU_APP_SECRET configured
✅ All basic config checks passed
```

→ Congratulations, go to Step 2.

**❌ If you see warnings or errors:**

Don't panic, this is normal. Fix according to prompts:

```
⚠️ .env file does not exist
   Solution: Copy .env.template to .env
   Command: cp .env.template .env
```

**Problems?**
- [View error solutions](03-Error-Guide.md)
- Or run one-click diagnosis: `python scripts/diagnose.py`

---

## Step 2: Send First Message (2 min)

### 2.1 Create Test File

```bash
# Create a test file
touch test_message.py
```

### 2.2 Copy Following Code

```python
from openclaw import send_message

# Send test message
send_message(
    target="test",  # Target group
    message="Hello from OpenClaw! 🎉"
)

print("✅ Message sent successfully!")
```

### 2.3 Run Code

```bash
python test_message.py
```

### 2.4 Check Results

**Open your Feishu group and see if message received:**

```
┌─────────────────────────────────────┐
│  OpenClaw Bot                       │
│  Hello from OpenClaw! 🎉            │
└─────────────────────────────────────┘
```

**See it? Congratulations!**

> **This is your first OpenClaw automated message.**
> 
> From now on, you can control Feishu bot with code.

**Don't see it?**

Don't worry, 90% of problems are config issues:

1. Run diagnosis script: `python scripts/diagnose.py`
2. View error code in diagnosis report
3. [Find corresponding solution](03-Error-Guide.md)

---

## Step 3: Completion Celebration (1 min)

### 🎉 Congratulations on completing your first task!

You have:
- ✅ Completed config check
- ✅ Sent first message
- ✅ Verified OpenClaw runs normally

**These 5 minutes mean you're already on your way.**

---

## What to do next?

After completing quick start, suggest continuing:

### 1️⃣ Configure your environment (10 min)
→ [Config Wizard](02-Config-Template.md)
- 5 core config items, step-by-step guidance
- Each config has explanation, examples, validation

### 2️⃣ Learn about common errors (5 min)
→ [Error Solution Library](03-Error-Guide.md)
- 50 common error solutions
- Check here when encountering problems, usually solved within 5 min

### 3️⃣ Learn peer guidance (3 min)
→ [Peer Guidance Scripts](04-Troubleshooting.md)
- How to solve problems independently
- When to seek help

---

## FAQ

**Q1: I'm stuck at Step 1, what to do?**

A: First run one-click diagnosis to see the specific problem:
```bash
python scripts/diagnose.py
```
Diagnosis report will tell you which config has problems and solution links.

**Q2: Message sending failed, what to do?**

A: 90% are config issues. Check in this order:
1. Does .env file exist
2. Is FEISHU_APP_ID correct
3. Is FEISHU_APP_SECRET correct
4. Are Feishu app permissions enabled
→ [Detailed troubleshooting guide](03-Error-Guide.md)

**Q3: I'm a complete beginner, can I learn this?**

A: Yes. This guide is designed for zero foundation.
- No programming experience needed (code prepared, just copy)
- No technical background needed (each step has explanation)
- Only need 5 minutes + willingness to try

**Q4: What level can I reach after learning?**

A: After learning, you can:
- ✅ Send Feishu messages
- ✅ Check if config is correct
- ✅ Independently solve common problems

But this is just the beginning. Continue learning config wizard and workflow design, you can do more.

---

## Final Words

**Every expert was once a beginner.**

The difference is, some crossed the first step, some didn't.

Today, you have crossed the first step.

**Welcome to the world of OpenClaw.** 🎉

---

*5-Minute Quick Start · v1.0*  
*© 2026 OpenClaw Onboarding Project · CC BY-NC-SA 4.0*
