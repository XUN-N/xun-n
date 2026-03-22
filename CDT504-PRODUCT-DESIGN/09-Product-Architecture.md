# Product Architecture Design

**Product Name:** OpenClaw Onboarding and Knowledge Tuning Service  
**Architecture Version:** v1.0  
**Created Date:** 2026-03-19  
**Phase:** 5 - Product Architecture Design  
**Method:** CDT504 Lesson 8 - Functional Elements → Physical Elements Mapping

---

## I. Architecture Design Overview

### 1.1 Architecture Design Goals

Based on Phase 4 selected MVP concept combination (5 core concepts + C9 redesign), design clear product architecture:

| Goal | Description |
|------|-------------|
| **Modular** | Each function independent, can be updated and extended separately |
| **Low Coupling** | Minimized dependencies between modules |
| **Scalable** | Support v1.1/v1.2 feature additions |
| **Maintainable** | Content updates don't affect other modules |

### 1.2 MVP Concept Combination Update

Based on user feedback, include C9 after redesign in MVP:

| Concept | Original Decision | New Decision | Description |
|---------|------------------|--------------|-------------|
| **C1** Interactive Checklist | ✅ MVP | ✅ MVP | Unchanged |
| **C4** One-click Config Template | ✅ MVP | ✅ MVP | Unchanged |
| **C7** Automated Config Validation | ✅ MVP | ✅ MVP | Unchanged |
| **C15** One-click Diagnosis Report | ✅ MVP | ✅ MVP | Unchanged |
| **C10** Error Solution Library | ✅ MVP | ✅ MVP | Unchanged |
| **C9** Peer Learning (Redesigned) | ❌ v1.1 | ✅ MVP | Light guidance, integrated with C10 |

**MVP Concept Combination:** 6 concepts (original 5 + C9 redesigned)

---

## II. Functional Elements Definition

### 2.1 Functional Elements List

Decompose MVP features into independent functional elements:

| ID | Functional Element | Description | Corresponding Concept |
|----|-------------------|-------------|----------------------|
| **FE1** | Onboarding guidance flow | 5-minute quick onboarding step-by-step guidance | C1 |
| **FE2** | Progress tracking | Record user completion progress | C1 |
| **FE3** | Completion celebration | Milestone completion feedback and motivation | C1 |
| **FE4** | Config template management | Provide and manage config template files | C4 |
| **FE5** | Template application | One-click apply template to user environment | C4 |
| **FE6** | Config validation | Validate if config items are correct | C7 |
| **FE7** | Validation feedback | Instantly display validation results | C7 |
| **FE8** | Diagnosis execution | Run comprehensive diagnosis checks | C15 |
| **FE9** | Report generation | Generate diagnosis report | C15 |
| **FE10** | Error library browsing | Browse and search error solutions | C10 |
| **FE11** | Error matching | Match solutions based on error messages | C10 |
| **FE12** | Peer guidance | Guide users to find error library | C9 (Redesigned) |

### 2.2 Functional Elements Classification

```
Functional Elements (12)
│
├── Quick Onboarding Module (FE1, FE2, FE3)
│   └── Corresponds to user journey: Launch → Guidance → Complete
│
├── Config Wizard Module (FE4, FE5, FE6, FE7)
│   └── Corresponds to user journey: Configure → Validate → Confirm
│
├── Diagnosis Report Module (FE8, FE9)
│   └── Corresponds to user journey: Diagnose → Report
│
└── Error Guidance Module (FE10, FE11, FE12)
    └── Corresponds to user journey: Encounter problem → Find solution → Peer guidance
```

---

## III. Physical Elements Definition

### 3.1 Physical Elements (Modules/Components)

Map functional elements to physical implementation:

| ID | Physical Element | Type | Contains Functional Elements | Description |
|----|-----------------|------|------------------------------|-------------|
| **PE1** | Quick Onboarding Doc | Markdown doc | FE1, FE2, FE3 | Interactive checklist |
| **PE2** | Config Template Package | File package | FE4, FE5 | .env.template + replacement script |
| **PE3** | Validation Script Set | Python scripts | FE6, FE7 | Automated config validation |
| **PE4** | Diagnosis Script | Python script | FE8 | One-click diagnosis execution |
| **PE5** | Report Template | Markdown template | FE9 | Diagnosis report format |
| **PE6** | Error Library Doc | Markdown doc | FE10, FE11 | 50 error solutions |
| **PE7** | Peer Guidance Scripts | Text snippets | FE12 | Scripts guiding users to error library |

### 3.2 Function-Physical Mapping Matrix

| Functional Element \ Physical Element | PE1 | PE2 | PE3 | PE4 | PE5 | PE6 | PE7 |
|---------------------------------------|-----|-----|-----|-----|-----|-----|-----|
| **FE1** Onboarding guidance flow | ✅ | | | | | | |
| **FE2** Progress tracking | ✅ | | | | | | |
| **FE3** Completion celebration | ✅ | | | | | | |
| **FE4** Config template management | | ✅ | | | | | |
| **FE5** Template application | | ✅ | | | | | |
| **FE6** Config validation | | | ✅ | | | | |
| **FE7** Validation feedback | | | ✅ | | | | |
| **FE8** Diagnosis execution | | | | ✅ | | | |
| **FE9** Report generation | | | | | ✅ | | |
| **FE10** Error library browsing | | | | | | ✅ | |
| **FE11** Error matching | | | | | | ✅ | |
| **FE12** Peer guidance | | | | | | | ✅ |

### 3.3 Architecture Type Analysis

| Dimension | This Product Architecture | Description |
|-----------|--------------------------|-------------|
| **Mapping Type** | Mainly modular | Most functional elements → 1 physical element |
| **Interface Definition** | Clear | Documents, scripts, scripts independent |
| **Modification Impact** | Local | Modifying one module doesn't affect others |
| **Scalability** | High | Can add new feature modules separately |

**Architecture Decision:** Adopt **modular architecture**, each function implemented independently, easy to maintain and extend.

---

## IV. Product Architecture Diagram

### 4.1 Module-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    OpenClaw Onboarding Product Architecture      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐                                           │
│  │   User Interface Layer    │                                           │
│  │  (Markdown/Documents)│                                           │
│  └────────┬────────┘                                           │
│           │                                                     │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Functional Module Layer              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │   │
│  │  │ Quick    │  │ Config   │  │ Diagnosis│  │ Error    │ │   │
│  │  │ Onboarding│  │ Wizard   │  │ Report   │  │ Guidance │ │   │
│  │  │  (C1)    │  │ (C4+C7)  │  │  (C15)   │  │ (C10+C9) │ │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │   │
│  │       │             │             │             │       │   │
│  └───────┼─────────────┼─────────────┼─────────────┼───────┘   │
│          │             │             │             │           │
│          ↓             ↓             ↓             ↓           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Physical Implementation Layer        │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │   │
│  │  │Onboarding│ │Config  │ │Validation│ │Diagnosis│ │Error   │ │   │
│  │  │   Doc   │ │Template│ │ Scripts│ │ Script │ │Library+│ │   │
│  │  │         │ │        │ │        │ │        │ │Guidance│ │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Support Platform Layer               │   │
│  │         OpenClaw Framework + Feishu Docs + Python       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Module Interaction Diagram

```
User Journey → Module Call Flow
─────────────────────────────────

1. Launch product
       ↓
   ┌─────────────┐
   │ Quick Onboarding Module │ PE1
   └──────┬──────┘
          │ Guidance complete
          ↓
2. Configure environment
       ↓
   ┌─────────────┐
   │ Config Wizard Module │ PE2 + PE3
   │ (Template + Validation) │
   └──────┬──────┘
          │ Config complete
          ↓
3. Comprehensive check
       ↓
   ┌─────────────┐
   │ Diagnosis Report Module │ PE4 + PE5
   └──────┬──────┘
          │ Problem found
          ↓
4. Find solution
       ↓
   ┌─────────────┐
   │ Error Guidance Module │ PE6 + PE7
   │ (Error Library + Guidance)│
   └─────────────┘
```

---

## V. Module Interface Definition

### 5.1 Inter-Module Interfaces

| Interface | Source Module | Target Module | Interface Type | Description |
|-----------|--------------|---------------|----------------|-------------|
| **I1** | Quick Onboarding | Config Wizard | Document link | Guide to config after onboarding complete |
| **I2** | Config Wizard | Diagnosis Report | Script call | Suggest diagnosis after config complete |
| **I3** | Diagnosis Report | Error Guidance | Error code reference | Reference error library ID in report |
| **I4** | Error Guidance | Config Wizard | Config problem link | Suggest re-validation after error solved |

### 5.2 Interface Standardization

**Document Link Interface (I1):**
```markdown
<!-- Quick onboarding doc → Config wizard -->
[Next: Configure your OpenClaw environment](./02-Config-Wizard.md)
```

**Error Code Reference Interface (I3):**
```markdown
<!-- Diagnosis report → Error library -->
Found problem: FEISHU_APP_ID not configured

Solution: [ERR-CONFIG-001](./Error-Guide.md#err-config-001)
```

**Guidance Script Interface (I4 - C9 Redesigned):**
```text
<!-- Peer guidance script template -->
"Looks like you're having a [error type] problem.
Suggest checking our error library: [Error library link]
Search keywords: [keywords]
If you still have questions, come back anytime."
```

---

## VI. C9+C10 Integration Design

### 6.1 C9 Redesign Concept

**Original Design Problems:**
- ❌ Full accompaniment → High human resource cost
- ❌ Real-time response → Requires automation system
- ❌ Deep involvement → Beyond MVP scope

**New Design Proposal:**
- ✅ Light guidance → Only need script templates
- ✅ Guide self-check → Cultivate user independence
- ✅ On-demand involvement → Human support only when necessary

### 6.2 C9+C10 Integration Architecture

```
Error Guidance Module (C10 + C9)
│
├── C10: Error Solution Library (Main)
│   ├── 50 standard error solutions
│   ├── Error code index
│   └── Quick reference table
│
└── C9: Peer Guidance (Auxiliary)
    ├── Guidance script templates (3-5 scenarios)
    ├── Error library usage guide
    └── When to seek human help guidance
```

### 6.3 Guidance Script Design

**Scenario 1: User Reports Error**
```
User: "I encountered XXX error"

Guidance reply:
"This error is very common, we have detailed solutions in our error library.
👉 Click to view: [ERR-XXX](Link)
Follow the steps, usually solved within 5 minutes.
If you still have questions, come back anytime."
```

**Scenario 2: Config Problem**
```
User: "Config seems to have problems"

Guidance reply:
"Suggest running one-click diagnosis first to see the specific problem.
👉 Run command: python scripts/diagnose.py
Diagnosis report will tell you:
1. Which config has problems
2. Specific error code
3. Solution link

Send me the report after running, I'll help you analyze."
```

**Scenario 3: User Wants to Give Up**
```
User: "Too hard, don't want to continue"

Guidance reply:
"Understand your feelings, every beginner encounters this stage. 😊

Let me see your progress...
You've completed [X]% of configuration, very close to success!

How about:
1. Take a break first, come back to continue
2. Let me help see where you're stuck
3. We'll go step by step, I'll accompany you

Which do you choose?"
```

### 6.4 C9 Implementation Method

| Implementation Element | Specific Proposal | Hours |
|----------------------|-------------------|-------|
| **Script templates** | 3-5 standard scenario scripts | 2h |
| **Error library links** | Each error has unique ID and link | (In C10) |
| **Usage guide** | 1-page "How to use error library" doc | 1h |
| **Training materials** | Simple training for support staff | 2h |
| **C9 Subtotal** | | **5h** |

---

## VII. Module Detailed Design

### 7.1 Quick Onboarding Module (PE1)

| Attribute | Description |
|-----------|-------------|
| **Physical Form** | Markdown document |
| **Core Content** | 5-step interactive checklist |
| **Interaction Method** | Markdown checkboxes |
| **Progress Tracking** | Manual check + completion count |
| **Estimated Hours** | 15h (content 10h + testing 5h) |

**Document Structure:**
```markdown
# 5-Minute Quick Start

## Pre-start Check
- [ ] OpenClaw and dependencies installed
- [ ] Feishu app credentials obtained (App ID, App Secret)
- [ ] 5 minutes free time

## Step 1: Config Check (2 min)
- [ ] Run config check script
  ```bash
  python scripts/check-config.py
  ```
- [ ] Confirm output shows ".env file exists"
- [ ] Fix according to prompts if warnings

## Step 2: Send First Message (2 min)
- [ ] Copy code to test file
  ```python
  from openclaw import send_message
  send_message("test", "Hello from OpenClaw!")
  ```
- [ ] Run code
- [ ] Confirm Feishu group received message

## Step 3: Completion Celebration (1 min)
- [ ] 🎉 Congrats on completing first task!
- [ ] Screenshot and share your achievement
- [ ] Continue next: [Config Wizard](02-Config-Wizard.md)

## Problems?
- View [Error Solution Library](03-Error-Guide.md)
- Or run [One-click Diagnosis](scripts/diagnose.py)
```

### 7.2 Config Wizard Module (PE2 + PE3)

| Attribute | Description |
|-----------|-------------|
| **Physical Form** | .env.template + Python scripts |
| **Core Content** | 5 core config templates + validation scripts |
| **Interaction Method** | File replacement + command line |
| **Estimated Hours** | 35h (templates 10h + scripts 15h + testing 10h) |

**Template Structure:**
```bash
# .env.template
# Feishu app configuration
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Group ID (group for bot to join)
FEISHU_GROUP_ADMIN=oc_xxxxxxxxxxxxx

# API configuration
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxx

# Model configuration
DEFAULT_MODEL=bailian/qwen3.5-plus
```

### 7.3 Diagnosis Report Module (PE4 + PE5)

| Attribute | Description |
|-----------|-------------|
| **Physical Form** | Python script + Markdown template |
| **Core Content** | Comprehensive diagnosis check + report generation |
| **Interaction Method** | Command line + view report |
| **Estimated Hours** | 25h (script 15h + template 5h + testing 5h) |

**Report Structure:**
```markdown
# OpenClaw Config Diagnosis Report

**Generated:** 2026-03-19 18:30
**Overall Score:** 85/100

## ✅ Passed (5/7)
- FEISHU_APP_ID: Configured
- FEISHU_APP_SECRET: Configured
- ...

## ⚠️ Warnings (1/7)
- DEFAULT_MODEL: Not configured (using default)
  Solution: [View](Error-Guide.md#err-config-005)

## ❌ Errors (1/7)
- FEISHU_GROUP_ADMIN: Config invalid
  Solution: [View](Error-Guide.md#err-config-002)
```

### 7.4 Error Guidance Module (PE6 + PE7)

| Attribute | Description |
|-----------|-------------|
| **Physical Form** | Markdown doc + script templates |
| **Core Content** | 50 error solutions + 3-5 guidance scripts |
| **Interaction Method** | Document browsing + search |
| **Estimated Hours** | 30h (error library 25h + scripts 5h) |

**Error Library Structure:**
```markdown
# Error Solution Library

## Config Errors (ERR-CONFIG-xxx)
- ERR-CONFIG-001: FEISHU_APP_ID not configured
- ERR-CONFIG-002: FEISHU_GROUP_ID config invalid
- ...

## Permission Errors (ERR-PERM-xxx)
- ERR-PERM-001: Feishu app insufficient permissions
- ...

## Network Errors (ERR-NET-xxx)
- ERR-NET-001: API timeout
- ...
```

**Single Error Template:**
```markdown
### ERR-CONFIG-001: FEISHU_APP_ID Not Configured

**Error Message:**
```
ValueError: FEISHU_APP_ID is not set
```

**Cause:**
.env file not configured with FEISHU_APP_ID

**Solution Steps:**
1. Open .env file
2. Add: FEISHU_APP_ID=your_app_id
3. Re-run

**Related Resources:**
- [Config Wizard](02-Config-Wizard.md)
- [Feishu App Creation Guide](Link)
```

---

## VIII. Hours Estimation Update

### 8.1 Module Hours Summary

| Module | Physical Elements | Original Est. | New Est. | Change |
|--------|------------------|---------------|----------|--------|
| **Quick Onboarding** | PE1 | 15h | 15h | Unchanged |
| **Config Wizard** | PE2+PE3 | 35h | 35h | Unchanged |
| **Diagnosis Report** | PE4+PE5 | 20h | 25h | +5h (report template optimization) |
| **Error Guidance** | PE6+PE7 | 25h | 30h | +5h (C9 integration) |
| **C9 Peer Guidance** | PE7 | - | 5h | New (light guidance) |
| **Content Production** | All | 95h | 100h | +5h (C9 integration) |
| **Total** | | **190h** | **210h** | **+20h** |

### 8.2 Hours Distribution

```
Hours Distribution (Total 210 hours)
│
├── Quick Onboarding Module      15h (7%)
├── Config Wizard Module         35h (17%)
├── Diagnosis Report Module      25h (12%)
├── Error Guidance Module        30h (14%)
├── C9 Peer Guidance              5h (2%)
└── Content Production/Testing  100h (48%)
```

### 8.3 Timeline Update

| Phase | Original Plan | New Plan | Description |
|-------|---------------|----------|-------------|
| Phase 5: Architecture Design | 03-20~22 | 03-20~22 | Unchanged |
| Phase 6: Design Presentation | 03-23~25 | 03-23~26 | +1 day (C9 integration) |
| **MVP Delivery** | 03-25 | 03-26 | +1 day |
| **Total Hours** | 190h | 210h | +20h (still controllable) |

---

## IX. Intellectual Property Strategy

### 9.1 IP Type Analysis

| IP Type | Applicable Content | Protection Method | Decision |
|---------|-------------------|-------------------|----------|
| **Copyright** | Document content, script templates | Automatic protection | ✅ Apply |
| **Trademark** | Product name/Logo | Registration protection | ⚠️ Temporarily not registering |
| **Patent** | Innovative methods/processes | Apply for patent | ❌ Not applicable |
| **Trade Secret** | Internal processes/data | Confidentiality agreement | ❌ Not applicable |

### 9.2 Copyright Strategy

**Applicable Content:**
- ✅ All Markdown document content
- ✅ Error solution library
- ✅ Peer guidance script templates
- ✅ Diagnosis report template

**Copyright Statement:**
```markdown
© 2026 OpenClaw Onboarding Project
CC BY-NC-SA 4.0 License
(Attribution - NonCommercial - ShareAlike)
```

**License Description:**
- ✅ Allow sharing and copying
- ✅ Allow modification and adaptation
- ⚠️ Must attribute original author
- ❌ Prohibit commercial use
- ⚠️ Derivative works need same license

---

## X. Phase 5 Completion Confirmation

### 10.1 Deliverables Checklist

| Deliverable | Status | Path |
|-------------|--------|------|
| Product Architecture Document | ✅ Complete | `09-Product-Architecture.md` |
| Function-Physical Mapping | ✅ Complete | Section III |
| Product Architecture Diagram | ✅ Complete | Section IV |
| Module Interface Definition | ✅ Complete | Section V |
| C9+C10 Integration Design | ✅ Complete | Section VI |
| Hours Estimation Update | ✅ Complete | Section VIII |

### 10.2 Phase 5 Review Checklist

| Review Item | Status | Description |
|-------------|--------|-------------|
| Is architecture modular? | ✅ Pass | 4 independent modules |
| Are module interfaces clear? | ✅ Pass | 4 standardized interfaces |
| Is C9+C10 integration reasonable? | ✅ Pass | Light guidance + error library |
| Is hours estimation reasonable? | ✅ Pass | 210h, +20h controllable |
| Is IP strategy appropriate? | ✅ Pass | CC BY-NC-SA 4.0 |
| Can we enter Phase 6? | ✅ Pass | Recommend entering design presentation |

### 10.3 Review Conclusion

**Decision:** ✅ **Phase 5 complete, approved to enter Phase 6 - Design Presentation**

**MVP Architecture Confirmed:**
- 4 core modules (Quick Onboarding, Config Wizard, Diagnosis Report, Error Guidance)
- 7 physical elements (docs + scripts + templates)
- 6 MVP concepts (C1+C4+C7+C9+C10+C15)
- Total 210 hours (~5.25 person-weeks)

**Reviewer:** Consulting-Coordinator  
**Review Date:** 2026-03-19

---

## XI. Next Steps

**Execute Immediately:**
1. ✅ Phase 5 deliverables complete
2. ⏳ Wait for PM/user review
3. ⏳ Enter Phase 6 after review approval

**Phase 6 Preparation:**
- Prepare final design document templates
- Prepare user testing plans
- Prepare deliverables checklist
- Goal: Complete MVP all content production and testing

---

*Product Architecture Design v1.0 — 2026-03-19*  
*4 Modules + 7 Physical Elements + C9 Light Guidance Integration*  
*Phase 5 Complete, Awaiting Review → Phase 6 (Final Phase)*
