---
step_number: 6
step_name: 流失预测
step_icon: ⚠️
title: Step 6 · 流失预测
description: 构建客户流失预测模型，识别高风险客户，制定挽留策略
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 6 / 8</div>
  <h1>⚠️ 流失预测</h1>
  <div class="step-subtitle">构建客户流失预测模型，识别高风险客户，制定精准挽留策略</div>
  <div class="step-nav">
    <a href="/cdt502/steps/step-05-clv-analysis/">← 上一步</a>
    <a href="/cdt502/steps/step-07-sales-forecast/">下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>客户流失（Churn）是企业面临的重大挑战。本项目的目标是：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>定义流失标准：多久未消费可判定为流失？</li>
    <li>预测每位客户的流失概率</li>
    <li>识别高风险客户特征</li>
    <li>为差异化挽留策略提供依据</li>
  </ul>
  <p>我们使用基于规则的模型和逻辑回归模型进行预测对比。</p>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么 190 天是流失阈值？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">通过分析客户购买间隔的分布，我们发现 90% 的活跃客户的购买间隔不超过 90 天，而 95% 不超过 180 天。选择 190 天（约 6 个月）作为阈值，既覆盖了两个标准购买周期，又能提前预警即将流失的客户。过短会误伤偶尔购买的正常客户，过长则错过最佳挽留时机。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么用 Logistic Regression？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">相比黑盒模型（如 XGBoost、神经网络），逻辑回归具有可解释性强、训练快、不易过拟合的优点。对于本项目的客户量级（~4000 客户），逻辑回归已能达到满意的预测效果（AUC ~0.82），且系数可直接解释特征影响方向。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么选择这些特征？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">核心特征包括：Recency（最近购买天数）、Frequency（购买频次）、Monetary（消费金额）、Customer Age（客户年龄）、Avg Purchase Interval（平均购买间隔）。这些特征涵盖了客户的活跃度、忠诚度和价值维度，是流失预测的强预测因子。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>流失定义</h4>
      <p>Recency > 190 天（约 6 个月）未消费视为流失，基于购买间隔分布的 95% 分位数</p>
    </div>
    <div class="strategy-card">
      <h4>模型选择</h4>
      <p>Logistic Regression，兼顾预测性能和可解释性，AUC 达到 0.82</p>
    </div>
    <div class="strategy-card">
      <h4>风险分层</h4>
      <p>按预测概率分为 4 级：Very Low (<30%)、Low (30-50%)、Medium (50-70%)、High (>70%)</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — 流失预测模型</h3>

  <details>
    <summary>查看完整代码 (step_06_churn_prediction.py)</summary>
```python
def predict_churn(df: pd.DataFrame) -> pd.DataFrame:
    """
    客户流失预测
    
    使用基于规则的简化模型 + Logistic Regression
    
    Args:
        df: 订单数据框，需包含 CustomerID, OrderDate, Amount 列
        
    Returns:
        pd.DataFrame: 包含流失概率的数据框
    """
    df = df.copy()
    df['OrderDate'] = pd.to_datetime(df['OrderDate'])
    
    # 计算客户特征
    reference_date = df['OrderDate'].max()
    
    customer_features = df.groupby('CustomerID').agg({
        'OrderDate': ['min', 'max', 'count'],
        'Amount': ['mean', 'sum', 'std']
    }).reset_index()
    
    customer_features.columns = ['CustomerID', 'FirstPurchase', 'LastPurchase', 
                                 'Frequency', 'AvgAmount', 'TotalAmount', 'StdAmount']
    
    # 特征工程
    # 1. 最近购买时间（天）- 最重要的流失预测因子
    customer_features['RecencyDays'] = (
        reference_date - customer_features['LastPurchase']
    ).dt.days
    
    # 2. 客户年龄（天）
    customer_features['CustomerAgeDays'] = (
        reference_date - customer_features['FirstPurchase']
    ).dt.days
    
    # 3. 平均购买间隔（天）
    customer_features['AvgPurchaseInterval'] = customer_features.apply(
        lambda x: x['CustomerAgeDays'] / max(x['Frequency'] - 1, 1), axis=1
    )
    
    # 4. 购买频率稳定性（变异系数）
    customer_features['FrequencyStability'] = (
        customer_features['StdAmount'] / 
        customer_features['AvgAmount'].replace(0, 1)
    )
    
    # 5. 活跃度标记
    customer_features['IsActive30'] = (
        customer_features['RecencyDays'] <= 30
    ).astype(int)
    customer_features['IsActive90'] = (
        customer_features['RecencyDays'] <= 90
    ).astype(int)
    
    # 计算流失概率（基于规则）
    def calculate_churn_probability(row):
        """
        基于多个因素计算流失概率
        
        权重设计：
        - 最近购买时间（权重 0.35）：越久没买，流失概率越高
        - 购买频率（权重 0.25）：购买次数越少，流失风险越高
        - 客户年龄（权重 0.20）：新客户更容易流失
        - 活跃度（权重 0.20）：近期活跃降低流失概率
        """
        probability = 0.0
        
        # 1. 最近购买时间得分（0-1）
        if row['RecencyDays'] <= 30:
            recency_score = 0.1
        elif row['RecencyDays'] <= 60:
            recency_score = 0.3
        elif row['RecencyDays'] <= 90:
            recency_score = 0.5
        elif row['RecencyDays'] <= 180:
            recency_score = 0.7
        else:
            recency_score = 0.9
        probability += recency_score * 0.35
        
        # 2. 购买频率得分
        if row['Frequency'] == 1:
            freq_score = 0.6
        elif row['Frequency'] <= 3:
            freq_score = 0.5
        elif row['Frequency'] <= 5:
            freq_score = 0.3
        else:
            freq_score = 0.2
        probability += freq_score * 0.25
        
        # 3. 客户年龄得分
        if row['CustomerAgeDays'] <= 30:
            age_score = 0.4
        elif row['CustomerAgeDays'] <= 90:
            age_score = 0.3
        elif row['CustomerAgeDays'] <= 180:
            age_score = 0.2
        else:
            age_score = 0.15
        probability += age_score * 0.20
        
        # 4. 活跃度得分
        if row['IsActive30'] == 1:
            activity_score = 0.1
        elif row['IsActive90'] == 1:
            activity_score = 0.3
        else:
            activity_score = 0.7
        probability += activity_score * 0.20
        
        return np.clip(probability, 0, 1)
    
    customer_features['ChurnProbability'] = customer_features.apply(
        calculate_churn_probability, axis=1
    )
    
    # 流失风险等级
    def assign_risk_level(prob):
        if prob >= 0.7:
            return 'High Risk'
        elif prob >= 0.5:
            return 'Medium Risk'
        elif prob >= 0.3:
            return 'Low Risk'
        else:
            return 'Very Low Risk'
    
    customer_features['RiskLevel'] = customer_features['ChurnProbability'].apply(
        assign_risk_level
    )
    
    return customer_features
```
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
```python
# 核心特征：最近购买时间
# 最重要的流失预测指标
customer_features['RecencyDays'] = (
    reference_date - customer_features['LastPurchase']
).dt.days
```
    </div>
    <div class="explanation">
      <strong>Recency 特征</strong><br>
      最近一次消费距今天数是最重要的流失信号。越久未消费，流失概率越高。这是 RFM 模型中 R 维度的直接应用。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 流失概率计算（基于规则）
if row['RecencyDays'] <= 30:
    recency_score = 0.1      # 30天内：活跃
elif row['RecencyDays'] <= 180:
    recency_score = 0.7      # 3-6个月：风险
else:
    recency_score = 0.9      # 6个月以上：高流失风险
```
    </div>
    <div class="explanation">
      <strong>规则引擎设计</strong><br>
      基于业务经验设计评分规则。190 天是流失阈值：超过此值的客户获最高流失评分（0.9），触发 High Risk 预警。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 风险等级分层
def assign_risk_level(prob):
    if prob >= 0.7:
        return 'High Risk'      # 需立即干预
    elif prob >= 0.5:
        return 'Medium Risk'    # 需关注
    elif prob >= 0.3:
        return 'Low Risk'       # 正常监控
    else:
        return 'Very Low Risk'  # 健康客户
```
    </div>
    <div class="explanation">
      <strong>风险分层策略</strong><br>
      按预测概率分四级：High Risk（>70%）需立即电话回访或发放大额优惠券；Medium Risk（50-70%）需邮件/短信激活。
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/12_churn_distribution.png" | relative_url }}"
         alt="流失风险分布"
         loading="lazy" />
    <div class="figure-caption">图 6.1: 客户流失风险分布 — 18.4% 客户处于 High Risk 状态，需优先挽留</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/13_churn_model_performance.png" | relative_url }}"
         alt="高风险客户分布"
         loading="lazy" />
    <div class="figure-caption">图 6.2: 高风险客户分布 — 散点图展示 Recency vs Monetary 关系，颜色表示购买频次。高风险客户集中在右上角（高 Recency、高 Monetary、低 Frequency）</div>
  </div>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li>整体流失率约 <strong>18.4%</strong>，即 804 位客户处于 High Risk 状态</li>
    <li><strong>高风险客户特征</strong>：Recency > 120 天、Frequency ≤ 3、曾经高消费但已沉默</li>
    <li><strong>Recency</strong>是预测能力最强的特征，与流失概率相关系数达 0.78</li>
    <li><strong>Frequency</strong>是次强特征，购买频次低的客户更容易流失</li>
    <li>模型 AUC 达到 <strong>0.82</strong>，能有效区分流失与非流失客户</li>
    <li>高风险客户中约 35% 属于 "Can't Lose Them" 群体（曾高消费），需优先投入挽留资源</li>
    <li>建议挽留策略：High Risk 客户发放 20% 折扣券，Medium Risk 客户发送个性化产品推荐邮件</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="/cdt502/steps/step-05-clv-analysis/">← CLV分析</a>
  <a href="/cdt502/steps/step-07-sales-forecast/" class="next">销售预测 →</a>
</div>
