---
step_number: 4
step_name: 客户聚类
step_icon: 🎯
title: Step 4 · 客户聚类
description: 使用 K-Means 算法进行无监督客户分群，发现数据中隐藏的客户模式
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">Step 4 / 8</div>
  <h1>🎯 客户聚类</h1>
  <div class="step-subtitle">使用 K-Means 算法进行无监督分群，发现数据中隐藏的客户模式和行为特征</div>
  <div class="step-nav">
    <a href="{{ '/cdt502/steps/step-03-rfm-analysis/' | relative_url }}">← 上一步</a>
    <a href="{{ '/cdt502/steps/step-05-clv-analysis/' | relative_url }}">下一步 →</a>
  </div>
</div>

<!-- Section: Background -->
<div class="step-section">
  <h2>🎯 背景与目标</h2>
  <p>RFM 分层基于业务规则，而聚类分析则是让数据"自己说话"。使用 K-Means 无监督算法：</p>
  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 2;">
    <li>发现数据中隐藏的客户群体结构</li>
    <li>验证 RFM 分层的合理性</li>
    <li>识别规则可能遗漏的细分模式</li>
    <li>为精准营销提供更精细的客群划分</li>
  </ul>
  <p>输入特征是标准化的 R、F、M 三维数据。</p>
</div>

<!-- Section: Strategy -->
<div class="step-section">
  <h2>🧠 策略与决策</h2>

  <p><span class="decision-tag">⚡ 决策</span> <strong>为什么选择 K=5？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">使用肘部法则（Elbow Method）和轮廓系数（Silhouette Score）综合评估。K=5 时，肘部曲线出现明显拐点，同时轮廓系数保持在 0.6 以上，说明聚类效果良好且群体数量可解释。K>5 后边际收益递减，而 K<5 则损失重要细分信息。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么必须标准化？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">R、F、M 三个维度的量纲和数值范围差异巨大（R: 1-365天，M: 0-10000+英镑）。如果不标准化，Monetary 的数值会主导距离计算，使聚类结果偏向按消费金额划分。使用 Z-score 标准化（均值为0，标准差为1）确保三个维度同等重要。</p>

  <p style="margin-top: 1.5rem;"><span class="decision-tag">⚡ 决策</span> <strong>为什么用 PCA 可视化？</strong></p>
  <p style="margin-left: 1rem; margin-top: 0.5rem;">三维数据难以在二维平面展示。PCA（主成分分析）将三维投影到二维，保留最大方差方向的信息。虽然会损失一些信息，但能直观展示聚类边界和群体分布。</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card">
      <h4>K-Means 参数</h4>
      <p>n_clusters=5, random_state=42 保证可重复性, n_init=10 避免局部最优</p>
    </div>
    <div class="strategy-card">
      <h4>标准化方法</h4>
      <p>使用 StandardScaler 进行 Z-score 标准化：(x - μ) / σ</p>
    </div>
    <div class="strategy-card">
      <h4>降维可视化</h4>
      <p>PCA 降至 2D，保留约 85% 的原始方差信息</p>
    </div>
  </div>
</div>

<!-- Section: Code -->
<div class="step-section">
  <h2>💻 执行细节</h2>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem;">核心代码 — K-Means 聚类分析</h3>

  <details>
    <summary>查看完整代码 (cluster.py / analysis_core.py)</summary>
{% highlight python %}
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import numpy as np

def customer_clustering(rfm_df, n_clusters=5):
    """
    使用 K-Means 对客户进行聚类分析
    
    Args:
        rfm_df: 包含 R, F, M 列的 DataFrame
        n_clusters: 聚类数量，默认 5
        
    Returns:
        DataFrame: 包含聚类标签的结果
        model: 训练好的 KMeans 模型
        scaler: 标准化器
    """
    # 提取 RFM 特征
    features = rfm_df[['R', 'F', 'M']].copy()
    
    # 标准化（关键步骤！）
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    
    # K-Means 聚类
    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42,      # 保证可重复性
        n_init=10,            # 多次初始化避免局部最优
        max_iter=300          # 最大迭代次数
    )
    cluster_labels = kmeans.fit_predict(features_scaled)
    
    # 将聚类结果添加到原数据
    rfm_df['Cluster'] = cluster_labels
    
    # 计算聚类中心（转回原始尺度）
    centers_original = scaler.inverse_transform(kmeans.cluster_centers_)
    
    return rfm_df, kmeans, scaler, centers_original


def find_optimal_k(features_scaled, k_range=range(2, 10)):
    """
    使用肘部法则寻找最优 K 值
    """
    inertias = []
    silhouette_scores = []
    
    for k in k_range:
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        kmeans.fit(features_scaled)
        inertias.append(kmeans.inertia_)
        
        # 轮廓系数
        from sklearn.metrics import silhouette_score
        if k > 1:
            silhouette_scores.append(silhouette_score(features_scaled, kmeans.labels_))
    
    return inertias, silhouette_scores


def visualize_clusters_pca(rfm_df, centers=None):
    """
    使用 PCA 降维可视化聚类结果
    """
    # PCA 降至 2D
    pca = PCA(n_components=2)
    features_pca = pca.fit_transform(rfm_df[['R', 'F', 'M']])
    
    # 创建可视化
    fig, ax = plt.subplots(figsize=(10, 8))
    
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
    for cluster in range(5):
        mask = rfm_df['Cluster'] == cluster
        ax.scatter(features_pca[mask, 0], features_pca[mask, 1],
                   c=colors[cluster], label=f'Cluster {cluster}',
                   alpha=0.6, s=50)
    
    # 绘制聚类中心
    if centers is not None:
        centers_pca = pca.transform(centers)
        ax.scatter(centers_pca[:, 0], centers_pca[:, 1],
                   c='black', marker='x', s=200, linewidths=3,
                   label='Centroids')
    
    ax.set_xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')
    ax.set_ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')
    ax.set_title('Customer Clusters (PCA Visualization)')
    ax.legend()
    
    return fig
{% endhighlight %}
  </details>

  <div class="code-explain-grid" style="margin-top: 1.5rem;">
    <div class="code-block">
{% highlight python %}
# 标准化是关键步骤
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# K-Means 聚类
kmeans = KMeans(
    n_clusters=5,
    random_state=42,
    n_init=10
)
cluster_labels = kmeans.fit_predict(features_scaled)
{% endhighlight %}
    </div>
    <div class="explanation">
      <strong>标准化 + K-Means</strong><br>
      StandardScaler 将每个维度转换为 Z-score：(x-μ)/σ。这确保 R、F、M 三个不同量纲的特征在距离计算中具有同等权重，避免 Monetary 数值主导聚类结果。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
{% highlight python %}
# 肘部法则寻找最优 K
inertias = []
for k in range(2, 10):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(features_scaled)
    inertias.append(kmeans.inertia_)

# 绘制肘部曲线
plt.plot(range(2, 10), inertias, 'bo-')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('Inertia (SSE)')
{% endhighlight %}
    </div>
    <div class="explanation">
      <strong>肘部法则</strong><br>
      Inertia（SSE）衡量聚类内部的紧密度。随着 K 增加，Inertia 下降。"肘部"是下降速度明显变缓的点，代表边际收益递减的临界点。本项目 K=5 处出现明显肘部。
    </div>
  </div>

  <div class="code-explain-grid">
    <div class="code-block">
{% highlight python %}
# PCA 降维可视化
pca = PCA(n_components=2)
features_pca = pca.fit_transform(rfm_df[['R', 'F', 'M']])

print(f"PC1 explains {pca.explained_variance_ratio_[0]:.1%} variance")
print(f"PC2 explains {pca.explained_variance_ratio_[1]:.1%} variance")
{% endhighlight %}
    </div>
    <div class="explanation">
      <strong>PCA 降维</strong><br>
      主成分分析将 3D RFM 空间投影到 2D 平面。PC1 和 PC2 通常能保留 85%+ 的原始信息。这使得我们可以在二维图表上直观展示聚类边界和分布。
    </div>
  </div>
</div>

<!-- Section: Visualization -->
<div class="step-section">
  <h2>📊 结果可视化</h2>

  <div class="figure-block">
    <img src="{{ "/assets/cdt502/figures/16_kmeans_clusters.svg" | relative_url }}"
         alt="K-Means 聚类结果"
         loading="lazy" />
    <div class="figure-caption">图 4.1: K-Means 聚类结果 — 展示 5 个聚类的分布</div>
  </div>

  <div class="figure-block" style="margin-top: 2rem;">
    <img src="{{ "/assets/cdt502/figures/rfm_3d_scatter.png" | relative_url }}"
         alt="RFM 三维聚类分布"
         loading="lazy" />
    <div class="figure-caption">图 4.2: RFM 三维散点图（按聚类着色）— 颜色表示不同聚类，展示各群体的空间分布特征</div>
  </div>
</div>

<!-- Section: Cluster Profiles -->
<div class="step-section">
  <h2>📋 聚类画像分析</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
    <thead>
      <tr style="background: #f8fafc;">
        <th style="padding: 12px; border: 1px solid #e2e8f0;">聚类</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">占比</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">Recency</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">Frequency</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">Monetary</th>
        <th style="padding: 12px; border: 1px solid #e2e8f0;">特征描述</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Cluster 0</strong></td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">18%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">高</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">高</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">高价值活跃客户（对应 RFM 的 Champions）</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Cluster 1</strong></td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">25%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">中</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">中</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">中</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">普通价值客户（主要群体）</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Cluster 2</strong></td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">15%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">高</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">流失/休眠客户</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Cluster 3</strong></td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">12%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">高</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">高价值新客户（需要培养频次）</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Cluster 4</strong></td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">30%</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">中</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低</td>
        <td style="padding: 12px; border: 1px solid #e2e8f0;">低价值边缘客户</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Section: Findings -->
<div class="step-section">
  <h2>🔍 关键发现</h2>
  <ul class="findings-list">
    <li>K-Means 聚类与 RFM 分层高度一致，验证了业务规则的合理性</li>
    <li><strong>5 个聚类</strong>清晰区分了高价值、中价值、低价值和流失风险客户</li>
    <li><strong>Cluster 0</strong>（高价值活跃客户）：虽然仅占 18%，但贡献了约 40% 的总收入</li>
    <li><strong>Cluster 2</strong>（流失客户）：15% 的客户几乎不再产生价值，需要激活或放弃</li>
    <li><strong>Cluster 3</strong>（高价值新客）：12% 的客户消费金额高但频次低，是增长潜力股</li>
    <li>轮廓系数为 <strong>0.62</strong>，表明聚类效果良好，群体间分离度适中</li>
    <li>聚类结果可用于构建预测模型特征，提升 CLV 和流失预测精度</li>
  </ul>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ '/cdt502/steps/step-03-rfm-analysis/' | relative_url }}">← RFM分析</a>
  <a href="{{ '/cdt502/steps/step-05-clv-analysis/' | relative_url }}" class="next">CLV分析 →</a>
</div>
