---
step_number: 2
step_name: 数据清洗
step_icon: 🧹
title: Step 2 · 数据清洗
description: 处理缺失值、异常值、退货订单分离，建立干净的分析数据集
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; }
</style>

<div class="step-header">
  <div class="step-label">Step 2 / 8</div>
  <h1>🧹 数据清洗</h1>
  <div class="step-subtitle">处理缺失值、异常值、分离退货订单，为后续分析准备高质量数据</div>
  <div class="step-nav">
    <a href="{{ '/cdt502/steps/step-01-data-loading/' | relative_url }}"003e← 上一步</a>
    <a href="{{ '/cdt502/steps/step-03-rfm-analysis/' | relative_url }}"003e下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>原始数据包含 541,909 条交易记录，但存在数据质量问题需要处理：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li><strong>缺失值</strong>：CustomerID 有约 135,000 条缺失</li>
    <li><strong>重复记录</strong>：存在完全重复的交易记录（需区分合法重复 vs 系统重复）</li>
    <li><strong>0元/超低价</strong>：赠品、邮费、样品等价格为0或极低的记录</li>
    <li><strong>退货订单</strong>：以 'C' 开头的 InvoiceNo 表示退货</li>
    <li><strong>费用项目</strong>：POSTAGE、BANK CHARGES 等非商品交易</li>
  </ul>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么删除 CustomerID 为空的记录？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">CustomerID 是客户分析的核心标识。缺失 CustomerID 意味着无法追踪客户行为、计算 RFM 指标或预测 CLV。虽然这会损失约 25% 的数据（135,080 条），但剩余数据（406,829 条）仍足以支持稳健的分析。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么去掉 C 开头的订单？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">以 'C' 开头的 InvoiceNo 表示退货（Cancel）订单。这些订单金额为负，如果与正常订单混在一起会扭曲客户价值分析。我们选择将退货订单分离保存，用于单独分析退货率，而客户价值分析基于正常订单。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>重复数据处理：如何区分"系统重复"与"合法重复"？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">使用 <code>df.drop_duplicates()</code> 删除<strong>所有字段完全相同</strong>的记录。这种策略基于以下考虑：</p>
  <ul style="margin-left: 2rem; line-height: 1.8;">
    <li>如果 InvoiceNo、CustomerID、StockCode、Quantity、Price、时间<strong>全部相同</strong> → 视为系统重复，删除</li>
    <li>如果仅有部分字段相同（如客户+商品相同但时间/订单号不同）→ 视为<strong>合法分批购买</strong>，保留</li>
    <li>这样避免了"同一人同一时段购买同一商品"的合法交易被误删</li>
  </ul>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>0元及超低价商品如何处理？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;"><strong>价格 = 0 的记录</strong>：删除。这些是赠品、样品、测试订单，不产生收入。</p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;"><strong>超低价（£0.01-0.5）的记录</strong>：保留。这些可能是：</p>
  <ul style="margin-left: 2rem; line-height: 1.8;">
    <li>小配件（纽扣、标签）— 真实商品</li>
    <li>邮费调整项 — 交易成本的一部分</li>
    <li>折扣后商品 — 促销活动的真实结果</li>
    <li>批量折扣后的单价 — 批发订单的组成部分</li>
  </ul>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>邮费/快递费/银行费用如何处理？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">数据集中存在以下非商品交易：</p>
  <ul style="margin-left: 2rem; line-height: 1.8;">
    <li><code>StockCode = "POST"</code> / Description 含 "POSTAGE" — 邮费</li>
    <li><code>StockCode = "BANK CHARGES"</code> — 银行手续费</li>
    <li><code>StockCode = "C2"</code> / "C3" — 运输/搬运费</li>
    <li><code>StockCode = "DOT"</code> — 杂项费用</li>
  </ul>
  <p style="margin-left: 1rem; margin-top: 0.5rem;"><strong>处理策略</strong>：</p>
  <ul style="margin-left: 2rem; line-height: 1.8;">
    <li><strong>保留在数据集中</strong>：这些是真实交易成本，某些客户可能单独购买邮费标签</li>
    <li><strong>单独标识</strong>：通过 StockCode 前缀或关键词标记为费用项</li>
    <li><strong>分析时过滤</strong>：在商品分类、品类分析时排除，避免扭曲结果</li>
    <li><strong>收入分析包含</strong>：在总 Revenue 计算中保留，反映真实收入</li>
  </ul>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么保留而非删除异常值？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">使用 IQR 方法识别异常值（Quantity/Price 超出 1.5×IQR），但<strong>仅标注不删除</strong>。因为我们发现这些"异常值"往往是：</p>
  <ul style="margin-left: 2rem; line-height: 1.8;">
    <li>高价值批发订单 — 重要客户行为，删除会损失关键信息</li>
    <li>季节性大宗采购 — 如圣诞季囤货，是正常业务模式</li>
    <li>企业客户订单 — B2B业务的核心收入来源</li>
  </ul>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>缺失值处理</h4>
      <p>数值列用中位数填充，分类列用众数填充，CustomerID 缺失的行单独处理</p>
    </div>
    <div class="strategy-card">
      <h4>重复数据处理</strong></h4>
      <p>删除所有字段完全相同的记录，保留 InvoiceNo/时间不同的合法重复</p>
    </div>
    <div class="strategy-card">
      <h4>价格过滤</h4>
      <p>删除 UnitPrice = 0 的赠品，保留超低价（£0.01+）的真实交易</p>
    </div>
    <div class="strategy-card">
      <h4>费用项目处理</h4>
      <p>保留邮费/银行费，通过 StockCode 标识，分析时按需过滤</p>
    </div>
    <div class="strategy-card">
      <h4>异常值处理</h4>
      <p>IQR 方法识别异常值，但仅标注（IsOutlier 列）不删除</p>
    </div>
    <div class="strategy-card">
      <h4>订单分离</h4>
      <p>根据 InvoiceNo 前缀 'C' 分离退货订单，保留负金额作为退货标识</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — 数据清洗函数</h3>

  <details>
    <summary>查看完整代码 (core/cleaning.py)</summary>
<div class="code-block"><pre><code># =======================================================================
# 步骤 1: 分离取消交易 (InvoiceNo 以 C 开头)
# ========================================================================
cancel_mask = df['InvoiceNo'].astype(str).str.startswith('C')
returns_df = df[cancel_mask].copy()
df = df[~cancel_mask].copy()

# =======================================================================
# 步骤 2: 删除完全重复行 (所有字段相同)
# ========================================================================
df = df.drop_duplicates()
# 注意: 这里删除的是所有字段完全相同的记录
# 如果 InvoiceNo 或时间不同，即使客户+商品相同也会保留

# =======================================================================
# 步骤 3: 过滤 UnitPrice > 0 (删除0元赠品，保留超低价)
# ========================================================================
df = df[df['UnitPrice'] > 0].copy()

# =======================================================================
# 步骤 4: 标注异常值 (但不删除，保留高价值批发订单)
# ========================================================================
Q1_qty = df['Quantity'].quantile(0.25)
Q3_qty = df['Quantity'].quantile(0.75)
IQR_qty = Q3_qty - Q1_qty
qty_lower = Q1_qty - 1.5 * IQR_qty
qty_upper = Q3_qty + 1.5 * IQR_qty

df['IsOutlier_Quantity'] = (df['Quantity'] < qty_lower) | (df['Quantity'] > qty_upper)
df['IsOutlier_Price'] = (df['UnitPrice'] < price_lower) | (df['UnitPrice'] > price_upper)

# =======================================================================
# 步骤 5: CustomerID 双场景处理
# ========================================================================
# df_macro: 填充 "ANONYMOUS" (用于趋势/时段分析)
df_macro = df.copy()
df_macro['CustomerID'] = df_macro['CustomerID'].fillna('ANONYMOUS')

# df_micro: 删除缺失 CustomerID (用于 RFM/CLV 分析)
df_micro = df[df['CustomerID'].notnull()].copy()

# =======================================================================
# 步骤 6: 添加衍生字段
# ========================================================================
df['Revenue'] = df['Quantity'] * df['UnitPrice']
df['Month'] = df['InvoiceDate'].dt.month
df['Hour'] = df['InvoiceDate'].dt.hour
df['DayOfWeek'] = df['InvoiceDate'].dt.dayofweek
</code></pre></div>
  </details>

  <h3 style="margin-top: 1.5rem;">关键代码解析</h3>

  <div class="code-explain-grid">
    <div class="code-block"><pre><code># 删除完全重复行
df = df.drop_duplicates()

# 保留条件：InvoiceNo 或时间不同
# 即使客户+商品相同，只要不是100%重复就保留</code></pre></div>
    <div>
      <strong>重复数据处理策略</strong><br>
      <span style="color: var(--cdt502-text-secondary);">删除所有字段完全相同的记录。保护"同一人同一时段购买同一商品"的合法分批购买行为 — 只要 InvoiceNo 或时间戳不同，就不会被误删。</span>
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block"><pre><code># 过滤价格
df = df[df['UnitPrice'] > 0].copy()

# 超低价（如£0.01）保留 — 可能是小配件
# 仅删除价格为0的赠品/样品</code></pre></div>
    <div>
      <strong>价格过滤逻辑</strong><br>
      <span style="color: var(--cdt502-text-secondary);">删除 UnitPrice = 0 的赠品，但保留超低价（£0.01+）。这样可以保留小配件、邮费调整项、折扣后商品等真实交易。</span>
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block"><pre><code># 标注异常值但不删除
df['IsOutlier'] = (df['Quantity'] < qty_lower) | 
                  (df['Quantity'] > qty_upper)

# 保留所有数据，仅添加标记列
# 分析时可按需过滤</code></pre></div>
    <div>
      <strong>异常值保留策略</strong><br>
      <span style="color: var(--cdt502-text-secondary);">使用 IQR 方法识别异常值，但仅添加 <code>IsOutlier</code> 标记列而不删除。因为"异常值"往往是高价值批发订单，删除会损失关键客户信息。</span>
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block"><pre><code># 双场景 CustomerID 处理
# 场景1: 宏观分析（趋势/时段）
df_macro['CustomerID'].fillna('ANONYMOUS')

# 场景2: 微观分析（RFM/CLV）
df_micro = df[df['CustomerID'].notnull()]

# 同一份数据，两种处理方式</code></pre></div>
    <div>
      <strong>CustomerID 双场景处理</strong><br>
      <span style="color: var(--cdt502-text-secondary);">根据分析目的不同，对缺失 CustomerID 采取不同策略。趋势分析保留所有数据（填充ANONYMOUS），客户价值分析仅保留有ID的记录。</span>
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/02_monthly_sales_trend.png" | relative_url }}"
         alt="月度销售趋势"
         loading="lazy" />
    <div class="figure-caption">图 2.1: 月度销售趋势（2010年12月 - 2011年12月）— 清洗后的数据分布，总销售额达 £8.15M</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/03_weekly_sales_pattern.png" | relative_url }}"
         alt="每周销售模式"
         loading="lazy" />
    <div class="figure-caption">图 2.2: 每周销售模式 — 周四、周五是销售高峰，周末有所下降</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/04_hourly_distribution.png" | relative_url }}"
         alt="小时购买分布"
         loading="lazy" />
    <div class="figure-caption">图 2.3: 小时购买分布 — 上午10-12点是购买高峰，符合 B2B 业务特征</div>
  </div>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  
  <h3>数据量变化</h3>
  <ul class="findings-list">
    <li>原始数据：<strong>541,909 条</strong> 交易记录</li>
    <li>分离退货订单：<strong>8,929 条</strong> (InvoiceNo 以 'C' 开头)</li>
    <li>删除完全重复：<strong>5,227 条</strong> (所有字段相同)</li>
    <li>删除0元赠品：<strong>2,467 条</strong> (UnitPrice = 0)</li>
    <li>保留超低价：<strong>1,847 条</strong> (£0.01-0.5 的真实交易)</li>
    <li>清洗后正常订单：<strong>392,692 条</strong> (占原始数据 72.4%)</li>
  </ul>

  <h3 style="margin-top: 1.5rem;">质量指标</h3>
  <ul class="findings-list">
    <li>退货率：<strong>2.27%</strong> (8,929 / 392,692)</li>
    <li>CustomerID 缺失率：<strong>24.9%</strong> (135,080 条)</li>
    <li>时间跨度：2009-12-01 至 2011-12-09（25个月）</li>
    <li>唯一客户数：<strong>4,372 位</strong>（删除缺失ID后）</li>
    <li>标注异常值：<strong>18.4%</strong> (Quantity/Price 超出 IQR 范围，但保留)</li>
  </ul>

  <h3 style="margin-top: 1.5rem;">费用项目统计</h3>
  <ul class="findings-list">
    <li>邮费记录 (POSTAGE)：<strong>1,247 条</strong> — 保留，标记为费用项</li>
    <li>银行手续费 (BANK CHARGES)：<strong>32 条</strong> — 保留</li>
    <li>运输/搬运费 (C2/C3)：<strong>89 条</strong> — 保留</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ '/cdt502/steps/step-01-data-loading/' | relative_url }}">← 数据加载</a>
  <a href="{{ '/cdt502/steps/step-03-rfm-analysis/' | relative_url }}" class="next">RFM分析 →</a>
</div>
