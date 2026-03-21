---
step_number: 0
step_name: 代码样式示例
step_icon: 💻
title: 代码呈现效果示例
description: 展示优化后的代码块样式和交互功能
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">代码样式示例</div>
  <h1>💻 优化后的代码呈现</h1>
  <div class="step-subtitle">全新的代码高亮、行号显示和一键复制功能</div>
</div>

<!-- Section: Features -->
<div class="step-section">
  <h2>✨ 新特性</h2>
  
  <div class="strategy-grid">
    <div class="strategy-card">
      <h4>🎨 精美主题</h4>
      <p>GitHub Dark 配色方案，语法高亮更清晰</p>
    </div>
    <div class="strategy-card">
      <h4>📋 行号显示</h4>
      <p>每行代码都有对应行号，方便引用和讨论</p>
    </div>
    <div class="strategy-card">
      <h4>📄 文件名显示</h4>
      <p>代码块顶部显示文件名，一目了然</p>
    </div>
    <div class="strategy-card">
      <h4>📋 一键复制</h4>
      <p>点击 Copy 按钮即可复制完整代码</p>
    </div>
  </div>
</div>

<!-- Section: Python Example -->
<div class="step-section">
  <h2>🐍 Python 代码示例</h2>
  
  <p>以下代码展示了数据加载和清洗的核心逻辑：</p>

{% highlight python %}
import pandas as pd
from pathlib import Path

def load_and_clean_data(input_path: Path) -> pd.DataFrame:
    """
    加载并清洗在线零售数据
    
    Args:
        input_path: Excel 文件路径
        
    Returns:
        清洗后的 DataFrame
    """
    # 加载原始数据
    df = pd.read_excel(input_path)
    
    # 解析日期
    df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])
    
    # 删除缺失 CustomerID 的记录
    df = df.dropna(subset=['CustomerID'])
    
    # 删除单价为负的退货记录（单独处理）
    returns = df[df['Quantity'] < 0].copy()
    df = df[df['Quantity'] > 0]
    
    # 计算总价
    df['TotalPrice'] = df['Quantity'] * df['UnitPrice']
    
    return df, returns

# 执行加载
df_clean, df_returns = load_and_clean_data(
    Path('data/online_retail.xlsx')
)
print(f"清洗后记录数: {len(df_clean):,}")
{% endhighlight %}

  <p>代码说明：</p>
  <ul>
    <li>使用类型提示提高代码可读性</li>
    <li>将退货记录单独分离，便于后续分析</li>
    <li>自动解析日期格式，无需手动指定</li>
  </ul>
</div>

<!-- Section: SQL Example -->
<div class="step-section">
  <h2>🗄️ SQL 查询示例</h2>
  
  <p>RFM 分析的核心 SQL 查询：</p>

{% highlight sql %}
-- RFM 分析查询
WITH customer_stats AS (
    SELECT
        CustomerID,
        DATEDIFF(day, MAX(InvoiceDate), '2011-12-09') as Recency,
        COUNT(DISTINCT InvoiceNo) as Frequency,
        SUM(TotalPrice) as Monetary
    FROM transactions
    WHERE InvoiceDate >= '2010-12-01'
    GROUP BY CustomerID
),
rfm_scores AS (
    SELECT
        CustomerID,
        Recency,
        Frequency,
        Monetary,
        NTILE(5) OVER (ORDER BY Recency DESC) as R_Score,
        NTILE(5) OVER (ORDER BY Frequency) as F_Score,
        NTILE(5) OVER (ORDER BY Monetary) as M_Score
    FROM customer_stats
)
SELECT *
FROM rfm_scores
ORDER BY Monetary DESC
LIMIT 100;
{% endhighlight %}
</div>

<!-- Section: Collapsible Code -->
<div class="step-section">
  <h2>📂 可折叠代码块</h2>
  
  <p>长代码可以折叠，点击展开查看完整内容：</p>

  <details class="code-details">
    <summary>📄 查看完整数据清洗代码 (cleaning.py)</summary>

{% highlight python %}
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Tuple, Optional

class DataCleaner:
    """
    数据清洗类，处理在线零售数据
    
    Attributes:
        df_raw: 原始数据
        df_clean: 清洗后的数据
        cleaning_log: 清洗操作日志
    """
    
    def __init__(self, input_path: Path):
        self.df_raw = pd.read_excel(input_path)
        self.df_clean = None
        self.cleaning_log = []
        
    def parse_dates(self) -> 'DataCleaner':
        """解析日期列"""
        self.df_raw['InvoiceDate'] = pd.to_datetime(
            self.df_raw['InvoiceDate'],
            errors='coerce'
        )
        self.cleaning_log.append("Parsed InvoiceDate to datetime")
        return self
        
    def remove_missing_customers(self) -> 'DataCleaner':
        """删除缺失 CustomerID 的记录"""
        before = len(self.df_raw)
        self.df_raw = self.df_raw.dropna(subset=['CustomerID'])
        after = len(self.df_raw)
        self.cleaning_log.append(
            f"Removed {before - after} rows with missing CustomerID"
        )
        return self
        
    def separate_returns(self) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        分离退货记录
        
        Returns:
            (正常交易, 退货记录)
        """
        returns = self.df_raw[
            self.df_raw['Quantity'] < 0
        ].copy()
        
        normal = self.df_raw[
            self.df_raw['Quantity'] > 0
        ].copy()
        
        self.cleaning_log.append(
            f"Separated {len(returns)} return transactions"
        )
        
        return normal, returns
        
    def calculate_totals(self, df: pd.DataFrame) -> pd.DataFrame:
        """计算总价"""
        df['TotalPrice'] = df['Quantity'] * df['UnitPrice']
        return df
        
    def clean(self) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        执行完整清洗流程
        
        Returns:
            (清洗后的数据, 退货记录)
        """
        self.parse_dates()
        self.remove_missing_customers()
        
        normal, returns = self.separate_returns()
        
        normal = self.calculate_totals(normal)
        returns = self.calculate_totals(returns)
        
        self.df_clean = normal
        
        return normal, returns

# 使用示例
cleaner = DataCleaner(Path('data/online_retail.xlsx'))
df_clean, df_returns = cleaner.clean()

print("清洗完成！")
print(f"正常交易: {len(df_clean):,} 条")
print(f"退货记录: {len(df_returns):,} 条")
for log in cleaner.cleaning_log:
    print(f"  ✓ {log}")
{% endhighlight %}

  </details>
</div>

<!-- Section: Code with Explanation -->
<div class="step-section">
  <h2>📝 代码与解释并排</h2>
  
  <p>左侧代码，右侧解释，更好的学习体验：</p>

  <div class="code-explain-grid">
    <div>
{% highlight python %}
# 计算 RFM 指标
rfm = df.groupby('CustomerID').agg({
    'InvoiceDate': lambda x: (snapshot_date - x.max()).days,
    'InvoiceNo': 'nunique',
    'TotalPrice': 'sum'
}).reset_index()

rfm.columns = ['CustomerID', 'Recency', 'Frequency', 'Monetary']
{% endhighlight %}
    </div>
    <div class="explanation">
      <strong>RFM 指标计算</strong><br><br>
      <strong>Recency (R):</strong> 最近购买距今天数，数值越小越好<br><br>
      <strong>Frequency (F):</strong> 购买频次，统计不同订单数<br><br>
      <strong>Monetary (M):</strong> 总消费金额，计算价格总和
    </div>
  </div>

  <div class="code-explain-grid">
    <div>
{% highlight python %}
# 客户分层
rfm['Segment'] = rfm.apply(
    lambda x: 
    'Champions' if x['R_Score'] >= 4 and x['F_Score'] >= 4
    else 'Loyal' if x['F_Score'] >= 4
    else 'At Risk' if x['R_Score'] <= 2
    else 'Others',
    axis=1
)
{% endhighlight %}
    </div>
    <div class="explanation">
      <strong>客户分层规则</strong><br><br>
      <strong>Champions:</strong> R≥4, F≥4 — 最有价值客户<br><br>
      <strong>Loyal:</strong> F≥4 — 高频购买客户<br><br>
      <strong>At Risk:</strong> R≤2 — 有流失风险客户<br><br>
      <strong>Others:</strong> 其他普通客户
    </div>
  </div>
</div>

<!-- Section: Terminal Output -->
<div class="step-section">
  <h2>💻 终端输出样式</h2>
  
  <div class="code-terminal">
    <div class="code-terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="title">bash — 80x24</span>
    </div>
    <div class="code-terminal-body">
      <pre><code>$ python analysis.py --step rfm
Loading data... ✓
Cleaning data... ✓ (392,732 rows)
Calculating RFM metrics... ✓
Segmenting customers... ✓

RFM Analysis Results:
===================
Champions:    555 customers (12.8%)
Loyal:        817 customers (18.8%)
At Risk:      622 customers (14.3%)
Others:     2,345 customers (54.0%)

Visualization saved to: output/rfm_3d_scatter.html</code></pre>
    </div>
  </div>
</div>

<!-- Section: Inline Code -->
<div class="step-section">
  <h2>⌨️ 行内代码</h2>
  
  <p>行内代码也有优化，更清晰易读：</p>
  
  <ul>
    <li>使用 <code>pd.read_excel()</code> 加载 Excel 文件</li>
    <li><code>CustomerID</code> 是客户唯一标识符</li>
    <li><code>df.groupby()</code> 用于分组统计</li>
    <li>设置 <code>index_col='CustomerID'</code> 提高查询效率</li>
  </ul>
</div>
