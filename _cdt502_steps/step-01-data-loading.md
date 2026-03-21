---
step_number: 1
step_name: 数据加载
step_icon: 📥
title: Step 1 · 数据加载
description: 加载原始 Excel 数据，解析日期格式，建立分析基础
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 1 / 8</div>
  <h1>📥 数据加载</h1>
  <div class="step-subtitle">将原始 Excel 文件读入 pandas DataFrame，建立分析的起点</div>
  <div class="step-nav">
    <a href="{{ site.baseurl }}/cdt502/overview/">← 概览</a>
    <a href="{{ site.baseurl }}/cdt502/steps/step-02-data-cleaning/">下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>数据加载是整个分析流水线的第零步。我们的目标是：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>将 Excel 文件读取为结构化 DataFrame</li>
    <li>将 <code>InvoiceDate</code> 解析为 Python <code>datetime</code> 类型</li>
    <li>了解数据的基本规模：行数、列数、时间跨度</li>
    <li>为后续步骤准备"干净的加载状态"</li>
  </ul>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么不用 CSV？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">原始数据来自 Excel（<code>.xlsx</code>），包含中文描述字段。CSV 可能引发编码问题，而 <code>pd.read_excel()</code> 对 Excel 原生支持更好。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么显式转换 <code>InvoiceDate</code>？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">原始日期是字符串或 Excel serial date，不进行类型转换会导致后续按时间排序、分组等操作出错。显式转换让数据类型清晰可见。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么不在这里做清洗？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">数据加载与数据清洗职责分离。加载只负责读取，清洗逻辑独立成 step-02，这样更容易追踪问题来源。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>数据文件</h4>
      <p>online_retail_II.xlsx — 包含 2009-2011 年英国在线零售交易数据</p>
    </div>
    <div class="strategy-card">
      <h4>加载策略</h4>
      <p>直接 <code>pd.read_excel()</code>，无特殊参数，速度可接受（< 54 万行）</p>
    </div>
    <div class="strategy-card">
      <h4>日期解析</h4>
      <p><code>pd.to_datetime()</code> 自动识别格式，避免手动指定 format 字符串</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — 数据加载函数</h3>

  <details>
    <summary>查看完整代码 (core/cleaning.py — load_data)</summary>
```python
def load_data(input_path: Path) -> pd.DataFrame:
    """
    加载原始 Excel 数据文件

    参数:
        input_path: Excel 文件路径 (.xlsx)

    返回:
        pd.DataFrame: 包含所有交易记录的 DataFrame
    """
    df = pd.read_excel(input_path)
    df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])
    return df
```
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
```python
df = pd.read_excel(input_path)
```
    </div>
    <div class="explanation">
      <strong>加载 Excel 文件</strong><br>
      pandas 的 <code>read_excel()</code> 内部调用 xlrd（.xls）或 openpyxl（.xlsx）引擎，自动识别工作表。此处无特殊参数，读取第一个工作表全部数据。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])
```
    </div>
    <div class="explanation">
      <strong>日期列类型转换</strong><br>
      将发票日期列转换为 datetime 类型。后续需要按时间排序、按月分组、计算 RFM 中的 Recency，都依赖这个转换。没有这一步，日期操作全部失效。
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/01_key_metrics_dashboard.png" | relative_url }}"
         alt="关键指标仪表板"
         loading="lazy" />
    <div class="figure-caption">图 1.1: 数据集关键指标仪表板 — 展示原始数据规模、字段数、时间范围和基础统计</div>
  </div>

  <p style="margin-top: 1rem; font-size: 0.9rem; color: #64748b;">
    上图展示了数据加载后的关键指标：原始记录数、字段数、时间跨度（2009-12-01 至 2011-12-09）、国家覆盖数（37 个）、商品种类数（4,000+）。
  </p>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li>原始数据共 <strong>541,909 条</strong> 交易记录，规模适中，可全量加载到内存</li>
    <li>时间跨度 <strong>2 年 10 天</strong>（2009-12-01 至 2011-12-09），足够做季节性分析和客户行为研究</li>
    <li>数据来自 <strong>37 个国家</strong>，英国为主（后续步骤会验证）</li>
    <li>字段结构清晰，8 个字段无需额外解析可直接使用</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ site.baseurl }}/cdt502/overview/">← 概览</a>
  <a href="{{ site.baseurl }}/cdt502/steps/step-02-data-cleaning/" class="next">数据清洗 →</a>
</div>
