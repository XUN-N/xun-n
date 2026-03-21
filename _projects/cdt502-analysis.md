---
layout: project
title: CDT502 Online Retail Analysis
description: End-to-end RFM analysis, customer segmentation, and churn prediction for online retail data
permalink: /projects/cdt502-analysis/
---

# CDT502 Online Retail Analysis

> **Customer Analytics Project** | RFM Analysis · K-Means Clustering · Churn Prediction

This project presents a comprehensive analysis of the [UCI Online Retail Dataset](https://archive.ics.uci.edu/ml/datasets/online+retail), covering the complete customer analytics pipeline from data cleaning to actionable insights.

---

## 📊 Project Overview

| Metric | Value |
|--------|-------|
| **Original Dataset** | 541,909 transactions |
| **After Cleaning** | 392,732 valid transactions (72.5% retention) |
| **Unique Customers** | 4,339 |
| **Date Range** | 2010-12-01 to 2011-12-09 |
| **Countries** | 37 |
| **Return Rate** | 2.27% (8,905 return transactions) |

---

## 🔗 Project Pages

Explore the complete analysis through our detailed documentation:

### 📚 Documentation
- [**Project Overview**]({{ '/cdt502/overview/' | relative_url }}) — Introduction, dataset description, and key findings
- [**Methodology**]({{ '/cdt502/methodology/' | relative_url }}) — Analysis strategies, decision rationale, and evaluation metrics
- [**Evolution**]({{ '/cdt502/evolution/' | relative_url }}) — Our journey from simple RFM to K-Means clustering

### 🔬 8-Step Analysis Pipeline

| Step | Topic | Description |
|------|-------|-------------|
| [Step 1]({{ '/cdt502/steps/step-01-data-loading/' | relative_url }}) | Data Loading | Loading and initial exploration |
| [Step 2]({{ '/cdt502/steps/step-02-data-cleaning/' | relative_url }}) | Data Cleaning | Handling missing values, outliers, and duplicates |
| [Step 3]({{ '/cdt502/steps/step-03-rfm-analysis/' | relative_url }}) | RFM Analysis | Recency, Frequency, Monetary scoring with 3D visualization |
| [Step 4]({{ '/cdt502/steps/step-04-customer-clustering/' | relative_url }}) | Customer Clustering | K-Means clustering for customer segmentation |
| [Step 5]({{ '/cdt502/steps/step-05-clv-analysis/' | relative_url }}) | CLV Analysis | Customer Lifetime Value calculation |
| [Step 6]({{ '/cdt502/steps/step-06-churn-prediction/' | relative_url }}) | Churn Prediction | Predicting customer churn risk |
| [Step 7]({{ '/cdt502/steps/step-07-sales-forecast/' | relative_url }}) | Sales Forecast | Time series forecasting |
| [Step 8]({{ '/cdt502/steps/step-08-country-analysis/' | relative_url }}) | Country Analysis | Geographic analysis of customer behavior |

---

## 🎯 Key Findings

### RFM Analysis
- **Champions (555 customers):** Highest value, most recent, most frequent buyers
- **Loyal Customers (817 customers):** High frequency and monetary value
- **At Risk (622 customers):** Previously valuable customers showing decline signs

### Customer Clustering
- Identified 5 distinct customer segments using K-Means
- Segments validated against RFM classifications
- Clear actionable strategies for each segment

### Churn Prediction
- Achieved 85% accuracy in predicting customer churn
- 190-day threshold identified as optimal for churn definition
- Key predictors: Recency, Frequency, and Category diversity

---

## 🛠️ Technical Stack

- **Python 3.12** — Core analysis language
- **Pandas** — Data manipulation
- **Scikit-learn** — Machine learning (K-Means, Logistic Regression)
- **Matplotlib/Plotly** — Visualization (including 3D RFM scatter plots)
- **Jekyll** — Documentation site

---

## 📁 Repository

View the complete source code and analysis notebooks on GitHub:

> **GitHub:** [github.com/XUN-N/xun-n-.github.io](https://github.com/XUN-N/xun-n-.github.io)

---

*Last updated: March 21, 2026*
