---
layout: cdt502-step
title: 项目概览
step_number: 0
step_name: 项目概览
step_icon: 🏠
---

<!-- Overview page - no step nav -->
<style>
.overview-hero {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}
</style>

<div class="step-header overview-hero">
  <div class="step-label">CDT502 · 项目概览</div>
  <h1>我们做了什么？</h1>
  <div class="step-subtitle">从一份原始 Excel 数据表，到 25+ 可视化图表和商业洞察的完整旅程</div>
</div>

<!-- Section: Project Background -->
<div class="step-section">
  <h2>📋 项目背景</h2>

  <p>这是一个在线零售数据集（类似 UCI Online Retail II），包含 2009-2011 年英国注册在线零售商的交易记录。我们的目标是：</p>

  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>理解客户行为模式 — 谁在买？什么时候买？买什么？</li>
    <li>构建客户价值评估体系 — RFM、CLV、流失风险</li>
    <li>识别高价值客户群体 — 通过聚类发现不同消费特征</li>
    <li>预测未来销售趋势 — 时间序列模型支持业务规划</li>
    <li>发现国家维度的业务机会 — 不同国家的消费差异</li>
  </ul>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>📥 数据来源</h4>
      <p>UCI Online Retail II 数据集，原始规模约 54 万条交易记录，37 个国家，4,300+ 独立客户</p>
    </div>
    <div class="strategy-card">
      <h4>🛠 工具栈</h4>
      <p>Python 3.12 / pandas / sklearn / matplotlib / seaborn — 纯 Python 环境，无需特殊依赖</p>
    </div>
    <div class="strategy-card">
      <h4>🔧 分析框架</h4>
      <p>CLI 工具驱动，可独立运行每一步分析，支持增量生成图表，JSON 中间结果</p>
    </div>
  </div>
</div>

<!-- Section: Dataset -->
<div class="step-section">
  <h2>📊 数据集概览</h2>

  <p>原始数据包含以下字段：</p>

  <table style="width:100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.875rem;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 0.75rem 1rem; text-align: left; border: 1px solid #e2e8f0;">字段名</th>
        <th style="padding: 0.75rem 1rem; text-align: left; border: 1px solid #e2e8f0;">说明</th>
        <th style="padding: 0.75rem 1rem; text-align: left; border: 1px solid #e2e8f0;">示例</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>InvoiceNo</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">发票编号（C 开头为取消订单）</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">536365, C536379</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>StockCode</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">商品编码</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">85123A, 71053</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>Description</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">商品描述</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">WHITE HANGING HEART...</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>Quantity</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">购买数量（负数为退货）</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">6, -6, 24</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>InvoiceDate</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">发票日期</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">2010-12-01 08:26:00</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>UnitPrice</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">单价（英镑）</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">2.55, 0.29</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>CustomerID</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">客户 ID</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">17850, 13047</td></tr>
      <tr><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;"><code>Country</code></td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">国家名称</td><td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">United Kingdom, Germany</td></tr>
    </tbody>
  </table>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/01_key_metrics_dashboard.png" | relative_url }}"
         alt="关键指标仪表板"
         loading="lazy" />
    <div class="figure-caption">图 1: 数据集关键指标仪表板 — 原始数据规模、字段数、时间范围一览</div>
  </div>
</div>

<!-- Section: 8-step flow overview -->
<div class="step-section">
  <h2>🔄 8 步分析流程</h2>

  <p>整个分析分为 8 个步骤，每一步的输出作为下一步的输入，形成完整的数据处理流水线：</p>

  <div style="margin-top: 1.5rem;">
    {% assign steps = site.cdt502-steps | sort: 'step_number' %}
    {% for step in steps %}
      {% unless step.step_number == 0 %}
        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 0.75rem; background: white;">
          <div style="width: 40px; height: 40px; background: #3b82f6; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">{{ step.step_number }}</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #1e293b;">{{ step.title }}</div>
            <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.2rem;">{{ step.description }}</div>
          </div>
          <a href="{{ step.url }}" style="padding: 0.4rem 1rem; background: #f1f5f9; border-radius: 6px; text-decoration: none; font-size: 0.8rem; color: #3b82f6; font-weight: 600;">阅读 →</a>
        </div>
      {% endunless %}
    {% endfor %}
  </div>
</div>

<!-- Section: Tech Stack -->
<div class="step-section">
  <h2>🛠 技术选型</h2>

  <div class="strategy-grid">
    <div class="strategy-card">
      <h4>pandas — 数据处理</h4>
      <p>用 DataFrame 作为核心数据结构，支持向量化操作，处理 54 万行数据毫秒级完成</p>
    </div>
    <div class="strategy-card">
      <h4>sklearn — 机器学习</h4>
      <p>K-Means 聚类、Logistic Regression、Random Forest — 统一接口，成熟稳定</p>
    </div>
    <div class="strategy-card">
      <h4>matplotlib + seaborn — 可视化</h4>
      <p>定制 publication theme，输出矢量 SVG 图表，学术/演示双重适用</p>
    </div>
    <div class="strategy-card">
      <h4>Rich — CLI 界面</h4>
      <p>进度条、表格、颜色输出，让命令行工具也有良好的交互体验</p>
    </div>
  </div>
</div>
