---
step_number: 3
step_name: RFM分析
step_icon: 📊
title: Step 3 · RFM分析
description: 通过 Recency、Frequency、Monetary 三维指标评估客户价值，实现客户分层
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 3 / 8</div>
  <h1>📊 RFM 分析</h1>
  <div class="step-subtitle">通过 Recency、Frequency、Monetary 三维指标评估客户价值，实现精准客户分层</div>
  <div class="step-nav">
    <a href="{{ '/cdt502/steps/step-02-data-cleaning/' | relative_url }}"003e← 上一步</a>
    <a href="{{ '/cdt502/steps/step-04-customer-clustering/' | relative_url }}"003e下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>RFM 分析是客户价值评估的经典方法，通过三个维度衡量客户行为：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li><strong>Recency (R)</strong>：最近一次消费距今天数，越小越好</li>
    <li><strong>Frequency (F)</strong>：消费频次，越大越好</li>
    <li><strong>Monetary (M)</strong>：消费金额，越大越好</li>
  </ul>
  <p>目标是识别不同价值层级的客户群体，为精准营销提供依据。</p>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么用 1-5 分制而非原始值？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">原始 RFM 值的量纲不同（天数 vs 次数 vs 英镑），无法直接比较。使用五分位数（quintile）将每个维度标准化为 1-5 分，既保留了相对排序信息，又实现了跨维度可比性。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么用中位数而非均值计算评分边界？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">客户价值数据通常呈偏态分布（少数高价值客户，多数低价值客户）。中位数比均值更能代表"典型"客户，且不受极端值影响，使分层更加稳健。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么采用 11 层细分模型？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">经典 RFM 模型只分 8 层，但我们发现某些关键群体（如"Can't Lose Them"）对业务至关重要。扩展至 11 层可以更精准地识别 Champions、Loyal Customers、At Risk 等细分群体。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>R 评分规则</h4>
      <p>Recency 越小越好，使用 <code>qcut(..., labels=[5,4,3,2,1])</code> 倒序打分</p>
    </div>
    <div class="strategy-card">
      <h4>F/M 评分规则</h4>
      <p>Frequency 和 Monetary 越大越好，使用 <code>labels=[1,2,3,4,5]</code> 正序打分</p>
    </div>
    <div class="strategy-card">
      <h4>细分策略</h4>
      <p>基于 R、F、M 分数组合，使用规则引擎分配客户到 11 个细分群体</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — RFM 计算与分层</h3>

  <details>
    <summary>查看完整代码 (step_03_rfm_analysis.py)</summary>
```python
def calculate_rfm(df: pd.DataFrame, reference_date: datetime = None) -> pd.DataFrame:
    """
    计算 RFM 指标（Recency, Frequency, Monetary）
    
    Args:
        df: 订单数据框，需包含 CustomerID, OrderDate, Amount 列
        reference_date: 参考日期，默认为数据中最晚日期
        
    Returns:
        pd.DataFrame: 包含 RFM 指标的数据框
    """
    df = df.copy()
    df['OrderDate'] = pd.to_datetime(df['OrderDate'])
    
    # 设置参考日期
    if reference_date is None:
        reference_date = df['OrderDate'].max() + timedelta(days=1)
    
    # 计算 RFM 指标
    rfm = df.groupby('CustomerID').agg({
        'OrderDate': lambda x: (reference_date - x.max()).days,  # R
        'OrderID': 'count',  # F
        'Amount': 'sum'  # M
    }).reset_index()
    
    rfm.columns = ['CustomerID', 'R', 'F', 'M']
    return rfm


def segment_customers(rfm_df: pd.DataFrame, n_segments: int = 11) -> pd.DataFrame:
    """
    基于分位数对客户进行分层（默认 11 层）
    """
    df = rfm_df.copy()
    
    # 为 R/F/M 分别打分（1-5）
    # R: 天数越少越好，所以用倒序
    df['R_Score'] = pd.qcut(df['R'].rank(method='first'), q=5, labels=[5,4,3,2,1])
    
    # F 和 M: 值越大越好
    df['F_Score'] = pd.qcut(df['F'].rank(method='first'), q=5, labels=[1,2,3,4,5])
    df['M_Score'] = pd.qcut(df['M'].rank(method='first'), q=5, labels=[1,2,3,4,5])
    
    # 客户分群标签
    def assign_segment(row):
        r, f, m = row['R_Score'], row['F_Score'], row['M_Score']
        
        if r >= 4 and f >= 4 and m >= 4:
            return 'Champions'
        elif r >= 3 and f >= 3 and m >= 3:
            return 'Loyal Customers'
        elif r >= 4 and f >= 1 and m >= 3:
            return 'Potential Loyalists'
        elif r >= 4 and f == 1:
            return 'New Customers'
        elif r >= 3 and f >= 2 and m >= 2:
            return 'Promising'
        elif r <= 2 and f >= 3:
            return 'At Risk'
        elif r <= 2 and f >= 4 and m >= 4:
            return "Can't Lose Them"
        elif r <= 2 and f <= 2:
            return 'Hibernating'
        else:
            return 'Lost'
    
    df['Segment'] = df.apply(assign_segment, axis=1)
    return df
```
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
```python
# R 评分：Recency 越小越好，倒序打分
df['R_Score'] = pd.qcut(df['R'].rank(method='first'), 
                        q=5, labels=[5,4,3,2,1])
```
    </div>
    <div class="explanation">
      <strong>R 评分逻辑</strong><br>
      Recency（最近消费间隔）越小表示客户越活跃。使用 <code>labels=[5,4,3,2,1]</code> 倒序映射，使最近消费的客户获得高分。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# F/M 评分：值越大越好，正序打分
df['F_Score'] = pd.qcut(df['F'].rank(method='first'), 
                        q=5, labels=[1,2,3,4,5])
df['M_Score'] = pd.qcut(df['M'].rank(method='first'), 
                        q=5, labels=[1,2,3,4,5])
```
    </div>
    <div class="explanation">
      <strong>F/M 评分逻辑</strong><br>
      Frequency 和 Monetary 越大越好。使用 <code>labels=[1,2,3,4,5]</code> 正序映射，高消费频次和高金额的客户获得高分。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# RFM 客户分层规则
if r >= 4 and f >= 4 and m >= 4:
    return 'Champions'        # 冠军客户
elif r >= 3 and f >= 3 and m >= 3:
    return 'Loyal Customers'  # 忠诚客户
elif r <= 2 and f >= 4 and m >= 4:
    return "Can't Lose Them"  # 不可失去
```
    </div>
    <div class="explanation">
      <strong>分层规则示例</strong><br>
      Champions（R≥4, F≥4, M≥4）：最近消费、高频高消的顶级客户。<br>
      Can't Lose Them（R≤2, F≥4, M≥4）：曾经高频高消但近期未消费的高价值流失风险客户。
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/05_rfm_distributions.svg" | relative_url }}"
         alt="RFM 分布图"
         loading="lazy" />
    <div class="figure-caption">图 3.1: RFM 指标分布 — 展示 Recency、Frequency、Monetary 三个维度的分布特征</div>
  </div>

  <h3 style="margin-top: 2rem; color: #d97706;">🎯 3D RFM 可视化分析</h3>
  
  <p style="margin: 1rem 0;">3D 散点图将客户投射到 Recency-Frequency-Monetary 三维空间中，直观展示客户价值分布：</p>

  <div class="figure-block" style="margin-top: 1rem;">
    <img src="{{ "/assets/cdt502/figures/rfm_3d_scatter.svg" | relative_url }}"
         alt="RFM 3D 散点图"
         loading="lazy" 
         style="max-height: 500px;"/>
    <div class="figure-caption">图 3.2: RFM 三维散点图 — 在 R-F-M 三维空间中展示客户分布，颜色代表不同细分群体</div>
  </div>

  <h4 style="margin-top: 1.5rem; color: #92400e;">📐 3D 图表解读</h4>
  
  <div class="strategy-grid" style="margin-top: 1rem;">
    <div class="strategy-card">
      <h4>X 轴: Recency (最近消费)</h4>
      <p>左下角（值小）= 最近消费的客户<br>右上角（值大）= 很久未消费的客户</p>
    </div>
    <div class="strategy-card">
      <h4>Y 轴: Frequency (消费频次)</h4>
      <p>从近到远（值从小到大）= 低频到高频客户<br>高频客户集中在 Y 值大的区域</p>
    </div>
    <div class="strategy-card">
      <h4>Z 轴: Monetary (消费金额)</h4>
      <p>从下到上（值从小到大）= 低消费到高消费<br>高价值客户分布在 Z 值大的上层</p>
    </div>
  </div>

  <h4 style="margin-top: 1.5rem; color: #92400e;">🔍 从 3D 视角发现的价值分布</h4>
  
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li><strong>Champions（冠军客户）</strong>：位于左下角-远侧-上层（R小、F大、M大），是右上角最亮的点群，数量少但价值极高</li>
    <li><strong>Loyal Customers（忠诚客户）</strong>：分布在左中区域，形成明显的聚类，R 和 F 都较好</li>
    <li><strong>At Risk（风险客户）</strong>：位于右侧中间层，R 值大（很久没来）但 F/M 还不错，是挽回的重点目标</li>
    <li><strong>Hibernating（休眠客户）</strong>：集中在右下角-近侧-下层，R 大、F 小、M 小，典型的流失客户特征</li>
    <li><strong>New Customers（新客户）</strong>：左下角-近侧区域，R 小、F 小（只买过一次），需要培育</li>
  </ul>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/rfm_3d_scatter_zoomed.svg" | relative_url }}"
         alt="RFM 3D 散点图（放大视角）"
         loading="lazy" 
         style="max-height: 500px;"/>
    <div class="figure-caption">图 3.3: RFM 3D 散点图（放大视角）— 聚焦高价值客户区域，清晰展示 Champions 和 Loyal 客户的聚类</div>
  </div>

  <h4 style="margin-top: 1.5rem; color: #92400e;">💡 3D 可视化的价值</h4>
  
  <div class="strategy-grid" style="margin-top: 1rem;">
    <div class="strategy-card" style="border-left: 4px solid #f59e0b;">
      <h4>发现隐藏模式</h4>
      <p>2D 图表难以同时展示三个维度，3D 散点图揭示了客户群体的空间聚类特征，如发现部分"高频低额"和"低频高额"客户可能同样重要</p>
    </div>
    <div class="strategy-card" style="border-left: 4px solid #f59e0b;">
      <h4>验证分群有效性</h4>
      <p>从 3D 视角可以直观看到 RFM 分群是否合理 — Champions 是否真正聚集？At Risk 客户是否有明显分离？</p>
    </div>
    <div class="strategy-card" style="border-left: 4px solid #f59e0b;">
      <h4>识别异常客户</h4>
      <p>3D 空间中远离任何聚类的"孤立点"可能是异常客户（如测试账号、批发大客户），值得单独分析</p>
    </div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/06_rfm_heatmap.svg" | relative_url }}"
         alt="RFM 热力图"
         loading="lazy" />
    <div class="figure-caption">图 3.4: RFM 热力图 — R 分数与 F 分数交叉分析，颜色深浅表示客户数量</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/07_segment_distribution.svg" | relative_url }}"
         alt="客户分群分布"
         loading="lazy" />
    <div class="figure-caption">图 3.5: 客户分群分布 — 11 个细分群体的占比可视化</div>
  </div>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li>共识别 <strong>11 个</strong> 客户细分群体，覆盖 4,372 位客户</li>
    <li><strong>Champions</strong>（冠军客户）：约 8%，贡献约 25% 的总收入，是核心高价值群体</li>
    <li><strong>Loyal Customers</strong>（忠诚客户）：约 10%，消费频次稳定，是业务稳定器</li>
    <li><strong>At Risk</strong>（风险客户）：约 12%，曾经高价值但近期未消费，需要挽回策略</li>
    <li><strong>Can't Lose Them</strong>（不可失去）：约 6%， historically 高消费但已流失，优先级最高</li>
    <li><strong>New Customers</strong>（新客户）：约 10%，近期首次消费，需要培养忠诚度</li>
    <li>RFM 评分与收入贡献呈强正相关，F 和 M 分数对 CLV 预测相关性最高（r > 0.7）</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ '/cdt502/steps/step-02-data-cleaning/' | relative_url }}"003e← 数据清洗</a>
  <a href="{{ '/cdt502/steps/step-04-customer-clustering/' | relative_url }}" class="next">客户聚类 →</a>
</div>
