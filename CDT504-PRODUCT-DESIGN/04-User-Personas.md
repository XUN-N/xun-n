# User Personas

**Product Name:** OpenClaw Onboarding and Knowledge Tuning Service  
**Created Date:** 2026-03-19  
**Phase:** 1 - Customer Needs Analysis  
**Method:** CDT504 Lesson 4 - User Persona Development

---

## I. User Personas Overview

Based on needs analysis, define 3 core user personas:

| Persona | Name | Type | Priority | Core Characteristics |
|---------|------|------|----------|---------------------|
| **Persona A** | Beginner Xiao Zhang | P0 Core User | ⭐⭐⭐⭐⭐ | First contact, needs quick onboarding |
| **Persona B** | Intermediate Lao Wang | P1 Secondary User | ⭐⭐⭐⭐ | Used for 2 months, wants efficiency improvement |
| **Persona C** | Expert Li Jie | P2 Long-term User | ⭐⭐⭐ | Deep usage, needs knowledge沉淀 |

---

## II. Core User Personas

### Persona A: Beginner Xiao Zhang

#### Basic Information

| Dimension | Description |
|-----------|-------------|
| **Name** | Zhang Ming (Xiao Zhang) |
| **Age** | 28 years old |
| **Occupation** | Product Manager at internet company |
| **Technical Background** | Non-technical background, can use basic software |
| **OpenClaw Experience** | 0 experience, just downloaded and installed |
| **Usage Scenario** | Wants to improve work efficiency, automate daily tasks |

#### Quote
> "I want to use OpenClaw to automate some repetitive work, but after installation I have no idea where to start... There's so much documentation, it's dizzying."

#### Goals and Motivations

| Goal | Motivation |
|------|------------|
| Complete simple tasks independently within 1 week | Improve work efficiency, reduce overtime |
| Understand what OpenClaw can do | Explore automation possibilities |
| Don't step on too many pitfalls | Save time, avoid frustration |

#### Pain Points and Frustrations

| Pain Point | Scenario | Emotion |
|-----------|----------|---------|
| Don't know where to start | Facing blank interface after first launch | Confused, anxious |
| Configuration files incomprehensible | Trying to modify configuration but afraid of breaking things | Worried, hesitant |
| Too many commands to remember | Want to check documentation but can't remember | Frustrated, want to give up |
| Don't know how to check when errors occur | Encountering error messages | Helpless, annoyed |

#### Behavioral Characteristics

| Characteristic | Description |
|---------------|-------------|
| **Learning Style** | Prefers video tutorials >图文 tutorials >纯 text documentation |
| **Patience Level** | Low, expects to see results within 5-10 minutes |
| **Exploration Willingness** | Medium, needs guidance to explore |
| **Sharing Willingness** | Low, feels like there's nothing to share |
| **Help-seeking Habit** | Search first, ask if can't find |

#### Usage Scenario Stories

**Scenario 1: First Contact**
```
Friday night 8pm, Xiao Zhang comes home from work.
- Heard OpenClaw can automate work, downloaded and installed
- Opens terminal, sees a bunch of configuration instructions
- "What are environment variables? Where to put .env file?"
- Tries to configure, gets errors
- Searches error message, finds GitHub issue
- Follows solution but still doesn't understand the principle
- Spends 2 hours, gives up, decides to look at it again on weekend
```

**Scenario 2: First Success**
```
Saturday afternoon, Xiao Zhang continues trying.
- Finds an onboarding tutorial
- Follows steps to configure Feishu
- Successfully sends first message!
- "So simple!"
- Confidence increases, wants to try more features
- But doesn't know what to learn next
```

#### Product Expectations

| Expectation | Importance |
|-------------|------------|
| Have clear onboarding path | ⭐⭐⭐⭐⭐ |
| Have step-by-step configuration guidance | ⭐⭐⭐⭐⭐ |
| Have video or interactive tutorials | ⭐⭐⭐⭐ |
| Have clear solution guidance when errors occur | ⭐⭐⭐⭐ |
| Know what to learn next after completing each step | ⭐⭐⭐⭐ |

#### Design Implications

| Implication | Product Design Meaning |
|-------------|------------------------|
| Need minimalist onboarding process | 5-minute quick start, avoid information overload |
| Configuration needs visual guidance | Graphical configuration wizard, real-time validation |
| Need instant feedback | Clear success/failure feedback after each operation |
| Need learning path | Design clear learning map, mark progress |

---

### Persona B: Intermediate Lao Wang

#### Basic Information

| Dimension | Description |
|-----------|-------------|
| **Name** | Wang Qiang (Lao Wang) |
| **Age** | 35 years old |
| **Occupation** | Technical Manager at internet company |
| **Technical Background** | Technical background, familiar with command line and configuration |
| **OpenClaw Experience** | Used for 2 months, can complete basic tasks |
| **Usage Scenario** | Daily workflow automation, team efficiency improvement |

#### Quote
> "Used it for two months, know basic functions, but feel efficiency could be higher. Saw others using it smoothly but don't know how they configured it."

#### Goals and Motivations

| Goal | Motivation |
|------|------------|
| Optimize existing workflows | Improve efficiency, reduce repetitive labor |
| Learn best practices | Avoid reinventing the wheel |
| Promote within team | Improve overall team efficiency |

#### Pain Points and Frustrations

| Pain Point | Scenario | Emotion |
|-----------|----------|---------|
| Repetitive configuration for multiple agents | Need to configure each new agent | Annoyed, feels like wasting time |
| Previously encountered pitfalls forgotten | Making same mistake again | Regretful, blames self |
| Don't know others' good configurations | Heard others use it well but can't see how | Curious, envious |
| Workflows hard to maintain after becoming complex | More and more configurations, hard to manage | Anxious, worried about errors |

#### Behavioral Characteristics

| Characteristic | Description |
|---------------|-------------|
| **Learning Style** | Prefers official documentation + community cases |
| **Patience Level** | High, willing to spend time researching |
| **Exploration Willingness** | High, actively explores new features |
| **Sharing Willingness** | Medium, willing to share but with concerns |
| **Help-seeking Habit** | Check documentation first, then community, then ask |

#### Usage Scenario Stories

**Scenario 1: Configuration Reuse Need**
```
Monday morning, Lao Wang needs to configure OpenClaw for new team members.
- Recalls his previous configuration process
- "Feishu appId, appSecret, group ID..."
- Needs to configure 5 new agents, each one needs to be configured
- "Can there be a template to reuse?"
- Looks for his notes but can't find previous configuration records
- Reconfigures, spends an afternoon
```

**Scenario 2: Experience Forgetting**
```
Wednesday afternoon, Lao Wang encounters a configuration problem.
- Error says "insufficient permission"
- Feels like encountered before
- Scrolls through chat history, looks through notes, can't find
- Searches GitHub issue again
- Finds solution, "Oh right, that's it!"
- "If only I could record it"
```

#### Product Expectations

| Expectation | Importance |
|-------------|------------|
| Support configuration templates and reuse | ⭐⭐⭐⭐⭐ |
| Lessons learned can be recorded and retrieved | ⭐⭐⭐⭐ |
| Can see others' best practices | ⭐⭐⭐⭐ |
| Configuration can be version managed | ⭐⭐⭐ |
| Workflow effectiveness can be evaluated | ⭐⭐⭐ |

#### Design Implications

| Implication | Product Design Meaning |
|-------------|------------------------|
| Need configuration template function | Support export/import configuration, one-click reuse |
| Need experience recording function | Built-in note function, automatically associate scenarios |
| Need best practices library | Community sharing mechanism, browsable and downloadable |
| Need version management | Configuration change history, can rollback |

---

### Persona C: Expert Li Jie

#### Basic Information

| Dimension | Description |
|-----------|-------------|
| **Name** | Li Na (Li Jie) |
| **Age** | 40 years old |
| **Occupation** | Independent consultant/knowledge blogger |
| **Technical Background** | Strong technical background, good at automation |
| **OpenClaw Experience** | Used for 6+ months, power user |
| **Usage Scenario** | Customer service, knowledge product delivery, content creation |

#### Quote
> "OpenClaw is already the core of my workflow. I'm thinking about how to productize my best practices and share them with more people."

#### Goals and Motivations

| Goal | Motivation |
|------|------------|
| Productize experience | Create additional income |
| Build personal brand | Increase industry influence |
| Help more people | Sense of achievement from knowledge sharing |

#### Pain Points and Frustrations

| Pain Point | Scenario | Emotion |
|-----------|----------|---------|
| Experience hard to systematize | Has a lot of experience but scattered everywhere | Regretful, wants to organize |
| Limited sharing channels | Wants to share but doesn't know where | Helpless |
| Lack of feedback mechanism | Don't know the effect after sharing | Uncertain |
| Hard to update continuously | Busy with work, no time to maintain content | Anxious |

#### Behavioral Characteristics

| Characteristic | Description |
|---------------|-------------|
| **Learning Style** | Self-exploration + practice summary |
| **Patience Level** | Very high, willing to study in-depth |
| **Exploration Willingness** | Very high, frequently tries new features |
| **Sharing Willingness** | High, willing to share but with thresholds |
| **Help-seeking Habit** | Basically never seeks help, researches independently |

#### Usage Scenario Stories

**Scenario 1: Knowledge Productization**
```
Friday evening, Li Jie is organizing customer cases.
- Used OpenClaw to build complete workflow for customer
- Good results, customer very satisfied
- "This case could be made into a course"
- Starts organizing materials: configuration instructions, usage guides, FAQs
- But formats inconsistent, organizing is troublesome
- "If only there were a template"
```

**Scenario 2: Community Contribution**
```
Sunday afternoon, Li Jie sees a beginner question in community.
- A problem she encountered before
- Replies with detailed solution
- Beginner expresses thanks
- "Such questions every day, can't reply to all"
- "If only there were a knowledge base for automatic answers"
```

#### Product Expectations

| Expectation | Importance |
|-------------|------------|
| Support experience systematic organization | ⭐⭐⭐⭐⭐ |
| Support content publishing and sharing | ⭐⭐⭐⭐ |
| Have feedback and data analysis | ⭐⭐⭐ |
| Support collaboration and version management | ⭐⭐⭐ |
| Have incentive mechanisms | ⭐⭐ |

#### Design Implications

| Implication | Product Design Meaning |
|-------------|------------------------|
| Need content templates | Provide knowledge cards, tutorial templates |
| Need publishing channels | Built-in publishing function, support multiple platforms |
| Need data analysis | Views, likes, favorites, etc. |
| Need collaboration function | Support multi-user collaborative editing |

---

## III. User Persona Comparison

### 3.1 Core Differences

| Dimension | Beginner Xiao Zhang | Intermediate Lao Wang | Expert Li Jie |
|-----------|---------------------|----------------------|---------------|
| **Technical Background** | Non-technical | Technical | Deep technical |
| **Usage Experience** | 0 | 2 months | 6+ months |
| **Core Needs** | Quick onboarding | Efficiency improvement | Knowledge productization |
| **Learning Preference** | Video tutorials | Documentation + cases | Self-exploration |
| **Sharing Willingness** | Low | Medium | High |
| **Payment Willingness** | Low | Medium | High |

### 3.2 Needs Priority Comparison

| Need | Beginner Xiao Zhang | Intermediate Lao Wang | Expert Li Jie |
|------|---------------------|----------------------|---------------|
| Quick Onboarding | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ |
| Configuration Guidance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Skill Understanding | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Problem Troubleshooting | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Workflow Design | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Experience沉淀 | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Efficiency Improvement | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Safety Assurance | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

### 3.3 Product Function Priority

| Function | Beginner Xiao Zhang | Intermediate Lao Wang | Expert Li Jie | Combined Priority |
|----------|---------------------|----------------------|---------------|-------------------|
| Interactive Onboarding Guidance | ⭐⭐⭐⭐⭐ | - | - | P0 |
| Configuration Wizard | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | P0 |
| Learning Path Map | ⭐⭐⭐⭐⭐ | ⭐⭐ | - | P0 |
| Configuration Template Library | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | P1 |
| Best Practices Library | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | P1 |
| Experience Recording Function | - | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | P1 |
| Workflow Templates | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | P1 |
| Content Publishing Function | - | ⭐⭐ | ⭐⭐⭐⭐⭐ | P2 |

---

## IV. User Journey Map (Beginner Xiao Zhang)

### 4.1 Complete Journey

```
Awareness → Try → Configure → First Success → Deep Learning → Proficient Use
   ↓        ↓       ↓            ↓              ↓             ↓
Heard    Download Configure     First         Learn More   Workflow
OpenClaw Install Environment   Message       Features    Automation
                                        Success
```

### 4.2 Moments of Truth (MOT)

| Moment | Scenario | User Emotion | Product Design Opportunity |
|--------|----------|--------------|---------------------------|
| **MOT1** | First launch | Confused → Expectant | Clear onboarding guidance |
| **MOT2** | Configure environment variables | Puzzled → Frustrated | Step-by-step guidance + real-time validation |
| **MOT3** | First message success | Surprised → Accomplished | Instant feedback + encouragement |
| **MOT4** | Encounter first error | Anxious → Helpless | Clear error guidance |
| **MOT5** | Complete first workflow | Satisfied → Confident | Achievement system + next step recommendation |

---

## V. Design Principles

Based on user personas, establish the following design principles:

### 5.1 For Beginner Xiao Zhang

| Principle | Specific Meaning |
|-----------|------------------|
| **Minimalist** | First experience only shows necessary information, avoid information overload |
| **Guided** | Each operation has clear guidance, don't assume users know |
| **Feedback** | Immediate feedback after operation, no silence |
| **Encouraging** | Celebrate small achievements, maintain user motivation |

### 5.2 For Intermediate Lao Wang

| Principle | Specific Meaning |
|-----------|------------------|
| **Efficient** | Support batch operations and shortcuts |
| **Reusable** | Configuration, experience, workflows can all be reused |
| **Transparent** | System behavior predictable, not black box |
| **Controllable** | Support version management and rollback |

### 5.3 For Expert Li Jie

| Principle | Specific Meaning |
|-----------|------------------|
| **Flexible** | Support customization and extension |
| **沉淀** | Experience can be systematically organized |
| **Shareable** | Low-barrier publishing and sharing |
| **Incentivizing** | Feedback and recognition mechanisms |

---

## VI. Phase 1 Completion Confirmation

### 6.1 Deliverables Checklist

| Deliverable | Status | Path |
|-------------|--------|------|
| Customer Needs Analysis Report | ✅ Complete | `03-Customer-Needs-Analysis.md` |
| User Personas | ✅ Complete | `04-User-Personas.md` (This file) |
| Needs Hierarchy Structure | ✅ Complete | See 03 document |
| Needs Priorities | ✅ Complete | See 03 document |

### 6.2 User Persona Validation Plan

| Validation Item | Method | Time |
|-----------------|--------|------|
| Persona accuracy | Follow-up interviews with users | Phase 2 |
| Needs priorities | Quantitative questionnaire validation | Phase 2 |
| Journey map | Usability testing | Phase 6 |

---

*User Personas v1.0 — 2026-03-19*  
*3 Core Personas: Beginner Xiao Zhang, Intermediate Lao Wang, Expert Li Jie*
