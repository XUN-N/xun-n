---
step_number: 8
step_name: 国家分析
step_icon: 🌍
title: Step 8 · 国家分析
description: 分析 37 个国家的消费差异，识别市场机会和跨国购买行为
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 8 / 8</div>
  <h1>🌍 国家分析</h1>
  <div class="step-subtitle">分析 37 个国家的消费差异，识别市场机会和跨国购买行为模式</div>
  <div class="step-nav">
    <a href="{{ '/cdt502/steps/step-07-sales-forecast/' | relative_url }}">← 上一步</a>
    <a href="{{ '/cdt502/overview/' | relative_url }}">返回概览 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>数据来自英国在线零售商，但客户遍布全球 37 个国家。本步骤的目标是：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>分析各国家的交易规模、客单价、购买频次</li>
    <li>识别主要市场和增长机会</li>
    <li>分析跨国购买行为差异</li>
    <li>为国际市场策略提供依据</li>
  </ul>
  <p>我们特别关注英国（主场市场）与其他欧洲国家的对比。</p>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么单独看 UK？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">英国客户占总交易量的 91%，是毫无疑问的核心市场。单独分析 UK 可以排除长尾国家的干扰，更清晰地识别本土客户的行为模式。同时，将 UK 与德国、法国、爱尔兰等欧洲国家对比，可以发现跨境市场机会。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>国家分组逻辑？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">按收入贡献将国家分为四组：Top Markets（UK，>80%）、Secondary Markets（德/法/爱尔兰，5-10%）、Emerging Markets（荷/比/瑞士等，1-5%）、Long Tail（其他 30+ 国家，<1%）。这种分层有助于制定差异化的市场策略。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>如何处理货币差异？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">原始数据以英镑（£）计价，所有国家统一使用此货币单位。由于数据来自英国零售商，可以假设国际订单已按汇率换算为英镑。对于客单价分析，按国家分组计算本地平均，避免汇率影响相对排名。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>主要市场</h4>
      <p>UK（91.4%）、Germany（2.1%）、France（1.8%）、Ireland（1.2%）</p>
    </div>
    <div class="strategy-card">
      <h4>分析维度</h4>
      <p>交易金额、订单数、客单价、客户数、RFM 分布对比</p>
    </div>
    <div class="strategy-card">
      <h4>机会识别</h4>
      <p>高客单价但低渗透率的市场是优先拓展目标</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — 国家维度聚合分析</h3>

  <details>
    <summary>查看完整代码 (analysis_core.py - Country Analysis)</summary>
```python
def analyze_by_country(df):
    """
    按国家分析客户行为
    """
    # 国家维度聚合
    country_stats = df.groupby('Country').agg({
        'InvoiceNo': 'nunique',        # 订单数
        'CustomerID': 'nunique',       # 客户数
        'Quantity': 'sum',             # 总销量
        'Revenue': ['sum', 'mean']     # 总收入、客单价
    }).reset_index()
    
    country_stats.columns = [
        'Country', 'Orders', 'Customers', 
        'TotalQuantity', 'TotalRevenue', 'AvgOrderValue'
    ]
    
    # 计算市场份额
    country_stats['RevenueShare'] = (
        country_stats['TotalRevenue'] / 
        country_stats['TotalRevenue'].sum() * 100
    )
    
    # 计算人均消费
    country_stats['RevenuePerCustomer'] = (
        country_stats['TotalRevenue'] / 
        country_stats['Customers']
    )
    
    # 国家分组
    def assign_country_tier(row):
        if row['RevenueShare'] >= 80:
            return 'Primary Market'
        elif row['RevenueShare'] >= 1:
            return 'Secondary Market'
        elif row['RevenueShare'] >= 0.1:
            return 'Emerging Market'
        else:
            return 'Long Tail'
    
    country_stats['MarketTier'] = country_stats.apply(
        assign_country_tier, axis=1
    )
    
    return country_stats.sort_values('TotalRevenue', ascending=False)


def analyze_country_rfm(rfm_df, df):
    """
    分析各国的 RFM 特征差异
    """
    # 合并 RFM 和国家信息
    rfm_country = rfm_df.merge(
        df[['CustomerID', 'Country']].drop_duplicates(),
        on='CustomerID'
    )
    
    # 按国家计算 RFM 均值
    country_rfm = rfm_country.groupby('Country').agg({
        'Recency': 'mean',
        'Frequency': 'mean',
        'Monetary': 'mean'
    }).reset_index()
    
    # 计算各国的客户细分分布
    segment_dist = rfm_country.groupby(['Country', 'Segment']).size().unstack(
        fill_value=0
    )
    segment_dist_pct = segment_dist.div(segment_dist.sum(axis=1), axis=0) * 100
    
    return country_rfm, segment_dist_pct


def identify_cross_border_patterns(df):
    """
    识别跨国购买行为模式
    """
    # 分析各国的购买频次分布
    patterns = {}
    
    for country in df['Country'].unique():
        country_data = df[df['Country'] == country]
        
        # 计算该国客户的平均订单数
        avg_orders = country_data.groupby('CustomerID')['InvoiceNo'].nunique().mean()
        
        # 计算平均客单价
        avg_order_value = country_data.groupby('InvoiceNo')['Revenue'].sum().mean()
        
        # 识别是否为批发客户为主（大单特征）
        large_orders = (country_data.groupby('InvoiceNo')['Quantity'].sum() > 100).sum()
        total_orders = country_data['InvoiceNo'].nunique()
        wholesale_ratio = large_orders / total_orders
        
        patterns[country] = {
            'avg_orders_per_customer': avg_orders,
            'avg_order_value': avg_order_value,
            'wholesale_ratio': wholesale_ratio,
            'pattern': 'Wholesale' if wholesale_ratio > 0.3 else 'Retail'
        }
    
    return pd.DataFrame(patterns).T
```
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
```python
# 国家维度聚合
country_stats = df.groupby('Country').agg({
    'InvoiceNo': 'nunique',        # 订单数
    'CustomerID': 'nunique',       # 客户数
    'Revenue': ['sum', 'mean']     # 总收入、客单价
})
```
    </div>
    <div class="explanation">
      <strong>国家聚合指标</strong><br>
      按国家分组计算核心指标：订单数、客户数、总收入、平均客单价。这是国家分析的基础数据。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 国家分组策略
def assign_country_tier(row):
    if row['RevenueShare'] >= 80:
        return 'Primary Market'     # UK
    elif row['RevenueShare'] >= 1:
        return 'Secondary Market'   # DE/FR/IE
    elif row['RevenueShare'] >= 0.1:
        return 'Emerging Market'    # NL/BE/CH...
    else:
        return 'Long Tail'          # Others
```
    </div>
    <div class="explanation">
      <strong>市场分层逻辑</strong><br>
      按收入贡献将国家分为四级：Primary（>80%）、Secondary（1-10%）、Emerging（0.1-1%）、Long Tail（<0.1%），支持差异化策略。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 跨国购买模式识别
wholesale_ratio = large_orders / total_orders
pattern = 'Wholesale' if wholesale_ratio > 0.3 else 'Retail'
```
    </div>
    <div class="explanation">
      <strong>模式识别</strong><br>
      通过大单比例（单笔数量>100）识别批发/零售模式。英国以零售为主，部分欧洲国家的批发比例较高。
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/25_country_transaction_distribution.png" | relative_url }}"
         alt="国家销售分布"
         loading="lazy" />
    <div class="figure-caption">图 8.1: Top 10 国家销售分布 — UK 以 £7.45M 绝对领先，占总额 91.4%</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/28_country_rfm_heatmap.png" | relative_url }}"
         alt="国家 RFM 热力图"
         loading="lazy" />
    <div class="figure-caption">图 8.2: 各国 RFM 特征对比热力图 — 颜色深浅表示指标高低，可直观比较不同国家客户的行为差异</div>
  </div>
</div>

<!-- Section: Country Profiles -->
<div class="step-section">
  <h2>📋 国家市场画像</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
    <thead>
      <tr style="background: #f8fafc;">
        <th style="padding: 12px; border: 1px solid #e2e8f0;">国家</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">收入占比</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">客户数</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">客单价</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">人均消费</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">市场类型</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">🇬🇧 United Kingdom</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">91.4%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">3,950</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£380</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£1,885</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><span style="color: #059669; font-weight: bold;">Primary</span></td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #e2e8f0;">🇩🇪 Germany</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">2.1%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">95</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£520</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£1,805</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><span style="color: #d97706; font-weight: bold;">Secondary</span></td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">🇫🇷 France</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">1.8%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">88</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£485</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£1,670</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><span style="color: #d97706; font-weight: bold;">Secondary</span></td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #e2e8f0;">🇮🇪 Ireland</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">1.2%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">24</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£920</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£4,075</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><span style="color: #d97706; font-weight: bold;">Secondary</span></td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">🇳🇱 Netherlands</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">0.6%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">30</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£415</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">£1,630</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><span style="color: #6366f1; font-weight: bold;">Emerging</span></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li><strong>UK 主导</strong>：英国客户贡献 91.4% 的收入（£7.45M），是绝对的核心市场</li>
    <li><strong>德国法国机会</strong>：德国和法国分别是第 2、3 大市场，但渗透率仍低，存在增长空间</li>
    <li><strong>爱尔兰高价值</strong>：虽然客户数少（24人），但人均消费 £4,075，客单价 £920，是最高价值市场</li>
    <li><strong>欧洲集中</strong>：Top 5 国家中 4 个在欧洲，地理邻近性驱动跨境购买</li>
    <li><strong>批发 vs 零售</strong>：部分国家（如澳大利亚、新加坡）批发比例较高，可能是 B2B 业务机会</li>
    <li><strong>长尾分布</strong>：32 个国家合计贡献 <3% 的收入，但这些市场可能是未来增长点</li>
    <li><strong>建议</strong>：重点投入德国、法国市场本地化营销；研究爱尔兰高客单价原因并复制到其他市场</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ '/cdt502/steps/step-07-sales-forecast/' | relative_url }}"003e← 销售预测</a>
  <a href="{{ '/cdt502/steps/overview/' | relative_url }}" class="next">返回概览 →</a>
</div>
