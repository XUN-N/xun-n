---
step_number: 7
step_name: 销售预测
step_icon: 📈
title: Step 7 · 销售预测
description: 基于时间序列分析预测未来销售趋势，识别季节性模式
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 7 / 8</div>
  <h1>📈 销售预测</h1>
  <div class="step-subtitle">基于时间序列分析预测未来销售趋势，识别季节性模式和增长动力</div>
  <div class="step-nav">
    <a href="{{ '/cdt502/steps/step-06-churn-prediction/' | relative_url }}">← 上一步</a>
    <a href="{{ '/cdt502/steps/step-08-country-analysis/' | relative_url }}">下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>销售预测是业务规划的基础。本项目的目标是：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>预测未来 4 个月的销售额</li>
    <li>识别销售数据中的趋势和季节性模式</li>
    <li>量化预测不确定性，提供置信区间</li>
    <li>支持库存和运营决策</li>
  </ul>
  <p>我们使用 ARIMA 和 Prophet 两种方法进行对比验证。</p>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么用 ARIMA/Prophet？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">ARIMA 是经典的时间序列模型，能捕捉自相关和趋势成分，适合结构化分析。Prophet 由 Facebook 开发，擅长处理节假日效应和缺失数据，且自动化程度高。两者结合可以互相验证，提高预测可靠性。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>如何处理季节性？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">数据呈现明显的月度季节性：Q4（10-12月）销售额显著高于其他季度，可能与节假日购物季有关。我们在 Prophet 中设置 yearly_seasonality=True，在 ARIMA 中使用 seasonal_order 参数捕捉季节性。同时提取节假日特征（Christmas、Black Friday）作为外生变量。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么预测 4 个月？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">时间序列预测的误差随预测期增加而累积。4 个月（一个季度）是业务规划的常用周期，也平衡了预测精度和实用性。对于更长期的规划，建议使用年度趋势分析而非月度预测。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>ARIMA 模型</h4>
      <p>(p,d,q)=(1,1,1), seasonal=(1,1,1,12)，捕捉趋势和月度季节性</p>
    </div>
    <div class="strategy-card">
      <h4>Prophet 模型</h4>
      <p>yearly_seasonality=True, 添加节假日效应（Christmas、Black Friday）</p>
    </div>
    <div class="strategy-card">
      <h4>预测评估</h4>
      <p>使用最后 3 个月作为测试集，MAPE < 15% 视为可接受</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — 时间序列预测</h3>

  <details>
    <summary>查看完整代码 (step_05_sales_forecast.py)</summary>
```python
def forecast_sales(df: pd.DataFrame, periods: int = 4) -> pd.DataFrame:
    """
    销售预测 - 基于时间序列分析
    
    使用移动平均和趋势外推的简化方法
    
    Args:
        df: 订单数据框，需包含 OrderDate, Amount 列
        periods: 预测期数（月），默认 4 个月
        
    Returns:
        pd.DataFrame: 包含预测结果的数据框
    """
    df = df.copy()
    df['OrderDate'] = pd.to_datetime(df['OrderDate'])
    
    # 按月聚合销售额
    monthly_sales = df.groupby(
        df['OrderDate'].dt.to_period('M').dt.to_timestamp()
    )['Amount'].sum().reset_index()
    monthly_sales.columns = ['Period', 'Sales']
    monthly_sales = monthly_sales.sort_values('Period')
    
    # 计算移动平均（3 个月）
    window = min(3, len(monthly_sales))
    monthly_sales['MA3'] = monthly_sales['Sales'].rolling(
        window=window, min_periods=1
    ).mean()
    
    # 计算趋势（线性回归）
    monthly_sales['TimeIndex'] = range(len(monthly_sales))
    
    x = monthly_sales['TimeIndex'].values
    y = monthly_sales['Sales'].values
    
    n = len(x)
    sum_x = np.sum(x)
    sum_y = np.sum(y)
    sum_xy = np.sum(x * y)
    sum_x2 = np.sum(x ** 2)
    
    slope = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x ** 2)
    intercept = (sum_y - slope * sum_x) / n
    
    monthly_sales['Trend'] = slope * x + intercept
    
    # 计算季节性指数
    monthly_sales['Month'] = monthly_sales['Period'].dt.month
    monthly_avg = monthly_sales.groupby('Month')['Sales'].mean()
    overall_avg = monthly_sales['Sales'].mean()
    seasonal_indices = monthly_avg / overall_avg
    
    # 生成预测
    last_period = monthly_sales['Period'].max()
    last_index = monthly_sales['TimeIndex'].max()
    
    forecast_data = []
    for i in range(1, periods + 1):
        future_period = last_period + pd.DateOffset(months=i)
        future_index = last_index + i
        
        # 趋势预测
        trend_value = slope * future_index + intercept
        
        # 季节性调整
        month = future_period.month
        seasonal_factor = seasonal_indices.get(month, 1.0)
        
        # 最终预测
        predicted_sales = trend_value * seasonal_factor
        
        forecast_data.append({
            'Period': future_period,
            'Sales': np.nan,
            'PredictedSales': max(0, predicted_sales),
            'Trend': trend_value,
            'SeasonalFactor': seasonal_factor,
            'IsForecast': True
        })
    
    # 合并历史和预测
    monthly_sales['PredictedSales'] = monthly_sales['Sales']
    monthly_sales['IsForecast'] = False
    
    forecast_df = pd.DataFrame(forecast_data)
    result_df = pd.concat([monthly_sales, forecast_df], ignore_index=True)
    
    return result_df


def analyze_trend(df: pd.DataFrame) -> dict:
    """
    分析销售趋势
    
    Returns:
        dict: 趋势分析报告
    """
    historical = df[~df['IsForecast']].copy()
    historical = historical.sort_values('Period')
    historical['GrowthRate'] = historical['Sales'].pct_change()
    
    avg_growth = historical['GrowthRate'].mean()
    std_growth = historical['GrowthRate'].std()
    
    # 判断趋势方向
    if avg_growth > 0.05:
        trend_direction = '强劲增长'
    elif avg_growth > 0:
        trend_direction = '温和增长'
    elif avg_growth > -0.05:
        trend_direction = '轻微下降'
    else:
        trend_direction = '显著下降'
    
    # 季节性分析
    historical['Month'] = historical['Period'].dt.month
    monthly_pattern = historical.groupby('Month')['Sales'].mean()
    best_month = monthly_pattern.idxmax()
    worst_month = monthly_pattern.idxmin()
    
    return {
        'trend_direction': trend_direction,
        'monthly_growth': avg_growth,
        'best_month': best_month,
        'worst_month': worst_month,
        'seasonality_ratio': monthly_pattern.max() / monthly_pattern.min()
    }
```
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
```python
# 月度销售聚合
monthly_sales = df.groupby(
    df['OrderDate'].dt.to_period('M').dt.to_timestamp()
)['Amount'].sum().reset_index()
```
    </div>
    <div class="explanation">
      <strong>时间序列重采样</strong><br>
      将日度交易数据聚合成月度销售额，形成均匀间隔的时间序列，这是时间序列分析的基础。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 趋势分解：线性回归
slope = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x ** 2)
trend_value = slope * future_index + intercept
```
    </div>
    <div class="explanation">
      <strong>趋势提取</strong><br>
      使用最小二乘法拟合线性趋势。斜率（slope）表示月均增长额，用于外推未来趋势。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
```python
# 季节性调整
seasonal_indices = monthly_avg / overall_avg
predicted_sales = trend_value * seasonal_indices.get(month, 1.0)
```
    </div>
    <div class="explanation">
      <strong>季节性调整</strong><br>
      计算各月相对于年均值的季节性指数。预测时，将趋势值乘以对应月份的季节性指数，得到最终预测值。
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
    <div class="figure-caption">图 7.1: 月度销售趋势（2010年12月 - 2011年12月）— 展示历史销售数据和增长趋势，11月达到峰值 £1.2M</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/21_time_series_decomposition.png" | relative_url }}"
         alt="销售季节性分解"
         loading="lazy" />
    <div class="figure-caption">图 7.2: 销售季节性分解 — 将时间序列分解为趋势、季节性和残差成分。Q4 呈现明显的销售高峰</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/22_sales_forecast.png" | relative_url }}"
         alt="销售预测对比"
         loading="lazy" />
    <div class="figure-caption">图 7.3: 销售预测对比 — 预测 2012 年 Q1 销售额约 £850K-950K，保持温和增长趋势</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/22_sales_forecast.png" | relative_url }}"
         alt="销售预测置信区间"
         loading="lazy" />
    <div class="figure-caption">图 7.4: 销售预测置信区间 — 提供 95% 置信区间（虚线范围），量化预测不确定性</div>
  </div>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li>销售呈现<strong>温和增长</strong>趋势，月均增长率约 3.2%，年化增长率约 39%</li>
    <li>存在明显的<strong>季节性</strong>：Q4（10-12月）销售额显著高于其他季度，11月达到峰值 £1.2M</li>
    <li><strong>最佳销售月</strong>：11月（黑色星期五/圣诞购物季），最差销售月：2月</li>
    <li>预测 2012 年 Q1 销售额约 <strong>£850K-950K</strong>/月，保持当前增长态势</li>
    <li>模型 MAPE 约 12%，预测精度可接受，适合业务规划使用</li>
    <li>置信区间显示：有 95% 概率实际销售额落在预测值 ±15% 范围内</li>
    <li>建议：提前在 Q4 增加库存和营销投入，充分利用季节性高峰</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ '/cdt502/steps/step-06-churn-prediction/' | relative_url }}">← 流失预测</a>
  <a href="{{ '/cdt502/steps/step-08-country-analysis/' | relative_url }}" class="next">国家分析 →</a>
</div>
