# Peer Guidance Scripts

> **Give a man a fish, and you feed him for a day.**
> **Teach a man to fish, and you feed him for a lifetime.**
> 
> **Our goal: Make you no longer need us.**

---

## Hello, this is peer guidance scripts

**This is not traditional "customer service scripts", but—**

> Scripts that help you learn to solve problems independently.

**Our philosophy:**

- ❌ Not giving you answers directly
- ✅ But teaching you how to find answers

- ❌ Not accompanying full-time
- ✅ But intervening when necessary

- ❌ Not making you dependent
- ✅ But making you independent

---

## Usage Scenarios

### Scenario 1: User Reports Error

**User says:**
> "I encountered XXX error, what to do?"

**❌ Don't give answer directly:**
```
Oh, this error, you need to modify .env file, add XXX config.
```

**✅ Guide self-check:**
```
This error is very common, we have detailed solutions in our error library.

👉 Click to view: [ERR-XXX](03-Error-Guide.md#err-xxx)

Follow the steps, usually solved within 5 minutes.

If you still have questions, come back anytime.
```

**Why guide this way:**
- Empathy ("very common") → Reduce anxiety
- Clear link → Reduce search cost
- Time expectation ("5 minutes") → Boost confidence
- Maintain support ("come back anytime") → Sense of security

---

### Scenario 2: Config Problem

**User says:**
> "Config seems to have problems, don't know what's wrong"

**❌ Don't directly help check:**
```
Send me your .env file, I'll help check.
```

**✅ Guide tool usage:**
```
Suggest running one-click diagnosis first to see the specific problem.

👉 Run command:
```bash
python scripts/diagnose.py
```

Diagnosis report will tell you:
1. Which config has problems
2. Specific error code
3. Solution link

Send me the report after running, I'll help you analyze.
```

**Why guide this way:**
- Teach tool usage → Cultivate self-check capability
- Explain output content → Lower usage barrier
- Express willingness to help → Maintain support attitude

---

### Scenario 3: User Wants to Give Up

**User says:**
> "Too hard, don't want to continue"

**❌ Don't give empty encouragement:**
```
Keep going, you can do it! Don't give up!
```

**✅ Empathy + show progress + give options:**
```
Understand your feelings, every beginner encounters this stage. 😊

Let me see your progress...
You've completed [X]% of configuration, very close to success!

How about:
1. Take a break first, come back to continue
2. Let me help see where you're stuck
3. We'll go step by step, I'll accompany you

Which do you choose?
```

**Why guide this way:**
- Empathy and recognition → Reduce frustration
- Show progress → Let user see achievement
- Provide options → Give user control

---

### Scenario 4: Duplicate Question

**User says:**
> (Asks a question in error library)

**❌ Don't answer directly:**
```
This error is because XXX, you need XXX.
```

**✅ Guide document lookup:**
```
We have detailed documentation for this question!

👉 [Question Title](03-Error-Guide.md#err-xxx)

Documentation includes:
- Error cause
- Solution steps (1-2-3)
- Validation method

Try following the documentation first, come to me if you get stuck.
```

**Why guide this way:**
- Don't give answer directly → Cultivate lookup habit
- Explain document content → Increase lookup motivation
- Maintain support attitude → Don't make user feel rejected

---

### Scenario 5: Problem Escalation

**User says:**
> (Encountered error not in library)

**❌ Don't force answer:**
```
This... I'm not sure either, let me research.
```

**✅ Honest + plan + collect info:**
```
This problem is quite special, not in error library yet.

I'll help you:
1. First record your error info
2. I'll research it
3. Update to error library after solving, help others

Please provide:
- Complete error message
- Solutions you've tried
- Your config (hide sensitive info)
```

**Why guide this way:**
- Acknowledge knowledge boundary → Honest and trustworthy
- Explain handling plan → Reassure user
- Collect necessary info → Improve solution efficiency
- Promise to update library → Turn problem into value

---

### Scenario 6: User Thanks

**User says:**
> "Thanks! Solved!"

**❌ Don't simply reply:**
```
You're welcome.
```

**✅ Reinforce achievement + encourage sharing:**
```
Great! Congratulations! 🎉

You've unlocked another new skill～

If convenient, welcome to share your solution process to community,
help others who encounter the same problem.

Keep going!
```

**Why guide this way:**
- Celebrate achievement → Enhance positive feedback
- Encourage sharing → Cultivate community awareness
- Keep going → Maintain learning motivation

---

## Guidance Principles

### Principle 1: Guide Self-check First, Then Provide Help

**Order:**
```
1. Guide to check error library
   ↓ (If can't solve)
2. Guide to use diagnosis tool
   ↓ (If still can't solve)
3. Provide human support
```

**Why:**
- Cultivate independence
- Reduce duplicate questions
- Let human support focus on complex problems

---

### Principle 2: Give Method, Not Answer

**Comparison:**

| ❌ Give Answer | ✅ Give Method |
|---------------|----------------|
| "You need to modify .env file" | "Suggest running diagnosis script first" |
| "Add XXX config" | "Diagnosis report will tell you which config has problems" |
| "Then restart" | "Follow document steps" |

**Why:**
- Give answer → Still won't next time
- Give method → Can solve independently next time

---

### Principle 3: Empathy First, Solution Later

**Order:**
```
1. Empathy ("Understand your feelings")
   ↓
2. Normalize ("This is very common")
   ↓
3. Solution ("Suggest...")
   ↓
4. Support ("Come to me anytime")
```

**Why:**
- Users can't hear solutions when emotional
- Process emotion first, then process problem

---

### Principle 4: Give Expectation, Reduce Anxiety

**Example:**

| ❌ No expectation | ✅ Give expectation |
|------------------|---------------------|
| "Try this" | "Usually solved within 5 minutes" |
| "Should work" | "90% of users solved with this method" |
| "Not sure if it works" | "This is the most common solution" |

**Why:**
- Uncertainty increases anxiety
- Clear expectation boosts confidence

---

### Principle 5: Maintain Support, But Don't Do Everything

**Balance:**

```
Excessive support ←————→ Insufficient support
(Do everything)        (Leave alone)
        ↓
    Moderate support
    (Guide + Backup)
```

**How to把握:**
- Guide users to try solving independently
- But let users know "there's backup"
- When really difficult, intervene timely

---

## Common Script Templates

### Template 1: Guide to Check Error Library

```
This error is very common, we have detailed solutions in our error library.

👉 Click to view: [Error Name](03-Error-Guide.md#error-link)

Follow the steps, usually solved within [X] minutes.

If you still have questions, come back anytime.
```

### Template 2: Guide to Use Tool

```
Suggest running [Tool Name] first to see the specific problem.

👉 Run command:
```bash
[Command]
```

[Tool] will tell you:
1. [Output 1]
2. [Output 2]
3. [Output 3]

Send me the result after running, I'll help you analyze.
```

### Template 3: Empathy + Encouragement

```
Understand your feelings, [normalization description].

You've completed [X]%, very close to success!

How about:
1. [Option 1]
2. [Option 2]
3. [Option 3]

Which do you choose?
```

### Template 4: Problem Escalation Handling

```
This problem is quite special, [error library/document] doesn't have it yet.

I'll help you:
1. First record your error info
2. I'll research it
3. Update to [error library/document] after solving, help others

Please provide:
- [Info 1]
- [Info 2]
- [Info 3]
```

---

## FAQ

**Q1: User just doesn't want to check themselves, what to do?**

A: Understand user mood, but insist on guiding:
```
I understand you want to solve quickly now.
But learning to check error library yourself means you can solve similar problems quickly in the future.
This time I'll accompany you to check, next time you'll know.
```

**Q2: After guidance user still can't solve, what to do?**

A: Intervene timely, don't let user repeatedly frustrated:
```
Looks like this problem is a bit complex.
Let me help you check...
[Provide specific help]
```

**Q3: User's question is too simple, should I guide?**

A: The simpler the question, the more need to guide:
- Simple questions easiest to cultivate dependence
- Simple questions most suitable for practicing self-check
- Simple questions' solutions easiest to remember

**Q4: User thinks I'm shirking, what to do?**

A: Clarify intention + show value:
```
I understand you might think I'm shirking.
But actually I want to help you learn to solve this type of problem yourself.
You won't have to wait for me every time in the future, solve it yourself in 5 minutes.

This time I'll accompany you to check, next time you'll know.
```

---

## Final Words

**The core of peer guidance is not "scripts", but—**

> Sincerely hope users grow.

**We believe:**

- Every user has the capability to solve problems independently
- Just need correct methods and guidance
- Once learned, they'll be stronger than you imagined

**So, our goal is not to make users dependent on us, but—**

> **Make users no longer need us.**

**But this doesn't mean we ignore users.**

> From "holding hands" to "watching from the side".
> 
> When you need, I'm always here.
> When you're independent, I applaud for you.

**This is the meaning of peer guidance.**

---

*Peer Guidance Scripts · v1.0*  
*© 2026 OpenClaw Onboarding Project · CC BY-NC-SA 4.0*
