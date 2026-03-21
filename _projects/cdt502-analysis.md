---
layout: project
title: CDT502 Online Retail Analysis
description: End-to-end RFM analysis, customer segmentation, and churn prediction for online retail data
permalink: /projects/cdt502-analysis/
custom_css:
  - /assets/cdt502/css/cdt502.css
---

# CDT502 Online Retail Analysis

> **Customer Analytics Project** | RFM Analysis · K-Means Clustering · Churn Prediction

This project presents a comprehensive analysis of the [UCI Online Retail Dataset](https://archive.ics.uci.edu/ml/datasets/online+retail), covering the complete customer analytics pipeline from data cleaning to actionable insights.

{% include cdt502/step-header.html number="1" title="Data Cleaning & Preprocessing" description="Clean raw transaction data, handle missing values, remove duplicates, and prepare features for analysis." tags="Complete:success|392K+ rows" %}

The initial dataset contains over 500,000 transactions from a UK-based online retailer. Key cleaning steps include:

- Removing cancelled transactions and refunds
- Filtering out rows with missing CustomerID
- Converting InvoiceDate to datetime format
- Creating macro and micro views of the data
- Identifying and analyzing return patterns

{% include cdt502/report-block.html title="Data Quality Report" icon="📊" %}

**Original Dataset:** 541,909 transactions  
**After Cleaning:** 392,732 valid transactions (72.5% retention)  
**Unique Customers:** 4,339  
**Date Range:** 2010-12-01 to 2011-12-09  
**Return Rate:** 2.27% (8,905 return transactions)

---

{% include cdt502/step-header.html number="2" title="RFM Analysis" description="Calculate Recency, Frequency, and Monetary scores for each customer and segment based on RFM scores." tags="Complete:success|9 Segments" %}

RFM (Recency, Frequency, Monetary) analysis segments customers based on:

| Metric | Description | Scoring |
|--------|-------------|---------|
| **Recency** | Days since last purchase | 1-5 (lower = better) |
| **Frequency** | Number of transactions | 1-5 (higher = better) |
| **Monetary** | Total purchase amount | 1-5 (higher = better) |

{% include cdt502/chart-gallery.html 
   layout="single"
   charts="/assets/cdt502/figures/hypothesis_test_rejection_region.svg:RFM Score Distribution:Distribution of RFM scores across customer base" %}

{% include cdt502/report-block.html title="Key RFM Insights" icon="💡" %}

**Top Segments:**
- **Champions (555):** 633 customers — Highest value, most recent, most frequent
- **Loyal Customers:** 817 customers — High frequency and monetary value
- **Potential Loyalists:** 492 customers — Recent customers with growth potential

**At-Risk Segments:**
- **At Risk:** 593 customers — Were valuable but haven't purchased recently
- **Lost:** 963 customers — Low recency, frequency, and monetary scores

---

{% include cdt502/step-header.html number="3" title="Customer Clustering" description="Apply K-Means clustering to identify natural customer groupings based on RFM features." tags="Complete:success|K-Means" %}

Using K-Means clustering with optimal k=4, customers are grouped into distinct behavioral clusters:

{% include cdt502/chart-gallery.html 
   layout="single"
   charts="/assets/cdt502/figures/bootstrap_confidence_interval.svg:Cluster Visualization:PCA projection of customer clusters" %}

---

{% include cdt502/step-header.html number="4" title="Statistical Analysis" description="Bootstrap confidence intervals and hypothesis testing for key business metrics." tags="Complete:success|95% CI" %}

Statistical validation ensures the reliability of our findings:

- **Bootstrap Analysis:** 10,000 resamples for robust confidence intervals
- **Confidence Level:** 95% (α = 0.05)
- **Key Tests:** Segment differences, seasonal effects, promotional impact

---

## Data & Resources

### Summary Statistics (JSON)

| File | Description | Size |
|------|-------------|------|
| [rfm_summary.json](/assets/cdt502/data/rfm_summary.json) | RFM segment distribution and statistics | 4.1 KB |
| [cluster_summary.json](/assets/cdt502/data/cluster_summary.json) | Clustering results summary | 1.0 KB |
| [sample_customers.json](/assets/cdt502/data/sample_customers.json) | Top 100 customers sample data | ~12 KB |

### Charts

- [Bootstrap Confidence Interval](/assets/cdt502/figures/bootstrap_confidence_interval.svg)
- [Hypothesis Test Rejection Region](/assets/cdt502/figures/hypothesis_test_rejection_region.svg)

---

## Technical Stack

- **Python 3.12** with pandas, numpy, scikit-learn
- **Jupyter Notebooks** for exploratory analysis
- **Matplotlib & Seaborn** for visualization
- **Jekyll** for documentation and reporting

---

*Last updated: March 2025*
