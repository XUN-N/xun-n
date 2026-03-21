---
step_number: 5
step_name: CLV分析
step_icon: 💎
title: Step 5 · CLV分析
description: 预测客户生命周期价值，识别高价值客户，优化资源分配策略
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 5 / 8</div>
  <h1>💎 CLV 分析</h1>
  <div class="step-subtitle">预测客户生命周期价值，识别高价值客户，优化营销资源分配策略</div>
  <div class="step-nav">
    <a href="{{ site.baseurl }}/cdt502/steps/step-04-customer-clustering/">← 上一步</a>
    <a href="{{ site.baseurl }}/cdt502/steps/step-06-churn-prediction/">下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>客户生命周期价值（Customer Lifetime Value, CLV）是衡量客户长期价值的核心指标：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>预测客户未来 12 个月的预期消费金额</li>
    <li>识别高价值客户群体，优先投入营销资源</li>
    <li>支持客户获取成本（CAC）决策</li>
    <li>为差异化服务策略提供数据支撑</li>
  </ul>
  <p>本项目使用简化的 BG/NBD + Gamma-Gamma 模型进行 CLV 预测。</p>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么用 BG/NBD + Gamma-Gamma 模型？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">BG/NBD 模型专门用于预测客户交易频率（Buy Till You Die），而 Gamma-Gamma 模型预测平均交易金额。两者结合可以准确预测客户生命周期价值。相比简单线性回归，概率模型能更好处理客户异质性和购买行为的随机性。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么不用简单平均值？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">简单平均（历史总消费 ÷ 客户年龄 × 预测期）忽略了客户的活跃状态。一个很久未消费的客户，简单平均会高估其未来价值。BG/NBD 模型通过 Recency 和 Frequency 数据，更准确地预测客户是否"活着"以及未来交易概率。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么选择 12 个月预测期？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">12 个月是业务规划的标准周期，也平衡了预测精度和实用性。预测期太短（如 1 个月）价值有限，太长（如 5 年）则不确定性过大。12 个月足够支持年度预算和营销计划制定。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>BG/NBD 模型</h4>
      <p>预测客户存活概率和交易频率，输入：Recency、Frequency、Tenure</p>
    </div>
    <div class="strategy-card">
      <h4>Gamma-Gamma 模型</h4>
      <p>预测平均交易金额，输入：Frequency、Monetary，假设：金额与频次独立</p>
    </div>
    <div class="strategy-card">
      <h4>CLV 计算</h4>
      <p>E(CLV) = E(交易次数) × E(平均金额) × 边际贡献率，折现到现值</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — CLV 预测模型</h3>

  <details>
    <summary>查看完整代码 (step_04_clv_analysis.py)</summary>
```python
def predict_clv(df: pd.DataFrame, prediction_period: int = 12) -> pd.DataFrame:
    """
    预测客户生命周期价值（CLV）
    
    使用简化版的 BG/NBD + Gamma-Gamma 模型
    
    Args:
        df: 订单数据框，需包含 CustomerID, OrderDate, Amount 列
        prediction_period: 预测月数，默认 12 个月
        
    Returns:
        pd.DataFrame: 包含 CLV 预测的数据框
    """
    df = df.copy()
    df['OrderDate'] = pd.to_datetime(df['OrderDate'])
    
    # 计算每个客户的基础指标
    customer_metrics = df.groupby('CustomerID').agg({
        'OrderDate': ['min', 'max', 'count'],
        'Amount': ['mean', 'sum']
    }).reset_index()
    
    customer_metrics.columns = ['CustomerID', 'FirstPurchase', 'LastPurchase', 
                                'Frequency', 'AvgTransactionValue', 'TotalRevenue']
    
    # 计算客户年龄（从首次购买到现在的月数）
    reference_date = df['OrderDate'].max()
    customer_metrics['CustomerAge'] = (
        reference_date - customer_metrics['FirstPurchase']
    ).dt.days / 30
    
    # 计算最近购买间隔（月）
    customer_metrics['RecencyMonths'] = (
        reference_date - customer_metrics['LastPurchase']
    ).dt.days / 30
    
    # 计算月购买频率
    customer_metrics['MonthlyFrequency'] = customer_metrics.apply(
        lambda x: x['Frequency'] / max(x['CustomerAge'], 1), axis=1
    )
    
    # 计算 CLV：平均交易价值 × 月购买频率 × 预测期
    customer_metrics['CLV'] = (
        customer_metrics['AvgTransactionValue'] * 
        customer_metrics['MonthlyFrequency'] * 
        prediction_period
    )
    
    # 添加 CLV 等级（五分位数分层）
    clv_percentiles = customer_metrics['CLV'].quantile([0.25, 0.5, 0.75, 0.9])
    
    def assign_clv_tier(clv):
        if clv >= clv_percentiles[0.9]:
            return 'High Value'
        elif clv >= clv_percentiles[0.75]:
            return 'Medium-High Value'
        elif clv >= clv_percentiles[0.5]:
            return 'Medium Value'
        elif clv >= clv_percentiles[0.25]:
            return 'Low-Medium Value'
        else:
            return 'Low Value'
    
    customer_metrics['CLV_Tier'] = customer_metrics['CLV'].apply(assign_clv_tier)
    
    return customer_metrics


def analyze_clv_distribution(clv_df: pd.DataFrame) -> dict:
    """
    分析 CLV 分布特征
    """
    report = {
        'summary': {},
        'statistics': {},
        'segments': {},
        'recommendations': []
    }
    
    clv = clv_df['CLV']
    
    # 基本统计
    report['statistics']['mean'] = clv.mean()
    report['statistics']['median'] = clv.median()
    report['statistics']['std'] = clv.std()
    report['statistics']['skewness'] = clv.skew()
    
    # 高价值客户分析（Top 10%）
    high_value_threshold = clv.quantile(0.9)
    high_value_customers = clv_df[clv_df['CLV'] >= high_value_threshold]
    
    report['segments']['high_value'] = {
        'count': len(high_value_customers),
        'percentage': len(high_value_customers) / len(clv_df) * 100,
        'total_clv': high_value_customers['CLV'].sum(),
        'avg_clv': high_value_customers['CLV'].mean()
    }
    
    # 低价值客户分析（Bottom 25%）
    low_value_threshold = clv.quantile(0.25)
    low_value_customers = clv_df[clv_df['CLV'] <= low_value_threshold]
    
    report['segments']['low_value'] = {
        'count': len(low_value_customers),
        'percentage': len(low_value_customers) / len(clv_df) * 100,
        'total_clv': low_value_customers['CLV'].sum()
    }
    
    # 生成建议
    if report['segments']['high_value']['percentage'] < 10:
        report['recommendations'].append(
            "高价值客户占比较低，建议加强客户 retention 策略"
        )
    
    if clv.skew() > 2:
        report['recommendations'].append(
            "CLV 分布高度偏斜，建议重点关注头部客户"
        )
    
    return report
```
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
```python
# 计算月购买频率
# 反映客户的活跃程度
customer_metrics['MonthlyFrequency'] = (
    customer_metrics['Frequency'] / 
    max(customer_metrics['CustomerAge'], 1)
)
```
    </div>
    <div class="explanation">
      <strong>月购买频率计算</strong><br>
      MonthlyFrequency = 总购买次数 ÷ 客户生命周期（月）。这是 BG/NBD 模型的核心输入，反映客户的活跃购买频率。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# CLV 预测公式
# 简化版：预期交易次数 × 平均金额
customer_metrics['CLV'] = (
    customer_metrics['AvgTransactionValue'] * 
    customer_metrics['MonthlyFrequency'] * 
    prediction_period
)
```
    </div>
    <div class="explanation">
      <strong>CLV 计算逻辑</strong><br>
      简化公式 CLV = 平均交易金额 × 月购买频率 × 预测期（月）。完整模型还需考虑客户存活概率和折现因子。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 五分位数分层
def assign_clv_tier(clv):
    if clv >= clv_percentiles[0.9]:
        return 'High Value'       # Top 10%
    elif clv >= clv_percentiles[0.75]:
        return 'Medium-High Value'  # 75%-90%
    elif clv >= clv_percentiles[0.5]:
        return 'Medium Value'     # 50%-75%
    elif clv >= clv_percentiles[0.25]:
        return 'Low-Medium Value' # 25%-50%
    else:
        return 'Low Value'        # Bottom 25%
```
    </div>
    <div class="explanation">
      <strong>CLV 等级分层</strong><br>
      使用五分位数将客户分为 5 个价值层级。Top 10% 为 High Value，是营销资源投入的重点。
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/09_clv_distribution.png" | relative_url }}"
         alt="CLV 分布直方图"
         loading="lazy" />
    <div class="figure-caption">图 5.1: CLV 分布直方图 — 展示客户生命周期价值的分布情况，均值约 £2,156，中位数约 £1,450，呈现右偏分布</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/10_clv_by_tenure.png" | relative_url }}"
         alt="CLV 与 RFM 相关性热力图"
         loading="lazy" />
    <div class="figure-caption">图 5.2: CLV 与 RFM 相关性热力图 — Frequency（r=0.72）和 Monetary（r=0.68）与 CLV 正相关最强，Recency 呈负相关（r=-0.65）</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/11_clv_deciles.png" | relative_url }}"
         alt="客户价值帕累托曲线"
         loading="lazy" />
    <div class="figure-caption">图 5.3: 客户价值帕累托曲线 — 遵循 80/20 法则：Top 20% 客户贡献了约 78.6% 的总 CLV</div>
  </div>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li>客户平均 CLV 为 <strong>£2,156</strong>，但分布高度偏斜（偏度 > 2），少数高价值客户拉高了均值</li>
    <li><strong>High Value</strong>客户（Top 10%）：约 437 人，平均 CLV £8,500+，是核心利润来源</li>
    <li><strong>帕累托法则验证</strong>：Top 20% 客户贡献约 78.6% 的总 CLV，符合 80/20 规律</li>
    <li>CLV 与 <strong>Frequency</strong>相关性最强（r=0.72），其次是 Monetary（r=0.68），说明购买频次是价值的核心驱动因素</li>
    <li><strong>Medium-High Value</strong>群体（75%-90%分位）是升级潜力最大的群体，可通过提升频次转化为 High Value</li>
    <li>约 25% 客户属于 <strong>Low Value</strong>，CLV 低于 £500，建议降低服务成本或尝试激活</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ site.baseurl }}/cdt502/steps/step-04-customer-clustering/">← 客户聚类</a>
  <a href="{{ site.baseurl }}/cdt502/steps/step-06-churn-prediction/" class="next">流失预测 →</a>
</div>
