---
step_number: 0
step_name: 方法论
step_icon: 🧠
title: 分析方法论
description: 策略、决策与技术选型全解析
layout: cdt502-step
---

<style>.step-header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important; }</style>

<div class="step-header">
  <div class="step-label">CDT502 · 分析方法论</div>
  <h1>🧠 我们为什么这样做？</h1>
  <div class="step-subtitle">策略层 → 决策层 → 执行层 — 每一步分析背后的完整思考过程</div>
  <div class="step-nav">
    <a href="{{ site.baseurl }}/cdt502/steps/overview/">← 概览</a>
    <a href="{{ site.baseurl }}/cdt502/steps/step-01-data-loading/">开始阅读 →</a>
  </div>
</div>

<!-- Section: Framework -->
<div class="step-section">
  <h2>📐 分析框架：三层结构</h2>
  <p>我们的分析遵循「策略 → 决策 → 执行」三层结构：</p>

  <div class="strategy-grid" style="margin-top: 1.5rem;">
    <div class="strategy-card" style="border-top: 3px solid #8b5cf6;">
      <h4>🎯 策略层</h4>
      <p>我们要解决什么业务问题？选择什么分析维度？这个阶段不涉及技术实现，只回答"为什么分析"。</p>
    </div>
    <div class="strategy-card" style="border-top: 3px solid #3b82f6;">
      <h4>⚖️ 决策层</h4>
      <p>面对多种可行方法，为什么选择 A 而非 B？关键参数如何确定？这个阶段记录所有技术选型的依据和权衡。</p>
    </div>
    <div class="strategy-card" style="border-top: 3px solid #10b981;">
      <h4>⚙️ 执行层</h4>
      <p>代码如何实现？数据如何流转？结果如何验证？这个阶段是纯粹的工程实现细节。</p>
    </div>
  </div>

  <p style="margin-top: 1.5rem; padding: 1rem; background: rgba(139,92,246,0.05); border-left: 3px solid #8b5cf6; border-radius: 0 8px 8px 0;">
    <strong>本博客的核心价值</strong>：现有数据分析教程大多只展示「执行层」（代码和结果），而忽略「决策层」。我们在每个步骤都明确标注 <span class="decision-tag">⚡ 决策</span>，说明为什么这样做。
  </p>
</div>

<!-- Section: Key Decisions -->
<div class="step-section">
  <h2>⚡ 关键决策总览</h2>

  <p>以下是整个分析过程中最重要的技术决策，按分析阶段分组：</p>

  <h3 style="font-size: 1rem; margin: 1.5rem 0 1rem; color: #3b82f6;">数据清洗阶段</h3>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 如何判定取消/退货订单？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: <code>InvoiceNo</code> 以 <code>C</code> 开头 → 这是业界标准做法，Online Retail 数据集文档明确说明。</p>
  </div>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 为什么单独存储退货数据？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: 退货数据有独立分析价值（比如识别高退货率商品），不能简单丢弃。保留为独立 DataFrame 供后续使用。</p>
  </div>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 价格阈值设为 0 的依据？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: 价格 ≤ 0 的记录可能是测试数据、赠品或错误录入。保留阈值为 0 是保守策略，后续分析再决定是否过滤。</p>
  </div>

  <h3 style="font-size: 1rem; margin: 2rem 0 1rem; color: #3b82f6;">RFM 分析阶段</h3>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: RFM 评分用几分制？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: 5 分制（1-5），用 <code>pd.qcut()</code> 按分位数分桶。中位数作为阈值而非均值 — 因为消费数据通常右偏（少数高消费用户拉高均值），中位数更稳健。</p>
  </div>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: Reference Date 设为数据集最后一天+1 的原因？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: Recency = (参考日期 - 最后一次购买日期)。设为数据集最后日期 + 1 天保证所有 Recency ≥ 1，避免 0 值造成误解。</p>
  </div>

  <h3 style="font-size: 1rem; margin: 2rem 0 1rem; color: #3b82f6;">客户聚类阶段</h3>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 为什么选 K-Means 而非层次聚类？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: K-Means 计算效率高（O(n) vs O(n²)），对大数据集友好；结果易解释（质心 = 典型客户画像）；与业务场景契合（需要指定 K 个客户群运营策略）。</p>
  </div>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 如何确定 K=4？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: Elbow Method（肘部法则）+ Silhouette Score 综合判断。K 过大导致过度细分（运营成本高），K 过小则群体特征模糊。K=4 在业务可解释性和统计显著性之间取得平衡。</p>
  </div>

  <h3 style="font-size: 1rem; margin: 2rem 0 1rem; color: #3b82f6;">流失预测阶段</h3>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 为什么用 190 天作为流失阈值？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: 论文（CDT502）实验表明：190 天对应约 18.4% 的流失率，与行业经验相符。不是拍脑袋，是数据分析结果。</p>
  </div>

  <div style="margin-bottom: 1rem;">
    <p><strong>Q: 为什么用 Logistic Regression 而非 XGBoost？</strong></p>
    <p style="color: #64748b; margin-top: 0.25rem;">A: 流失预测是二分类问题，Logistic Regression 可解释性强（系数 = 特征重要性方向），业务团队能理解；XGBoost 精度可能更高，但黑盒模型难以指导运营决策。</p>
  </div>
</div>

<!-- Section: Evaluation Metrics -->
<div class="step-section">
  <h2>📏 评估指标选择</h2>

  <table style="width:100%; border-collapse: collapse; font-size: 0.875rem;">
    <thead>
      <tr style="background: #f1f5f9;">
        <th style="padding: 0.75rem 1rem; text-align: left; border: 1px solid #e2e8f0;">分析阶段</th>
        <th style="padding: 0.75rem 1rem; text-align: left; border: 1px solid #e2e8f0;">指标</th>
        <th style="padding: 0.75rem 1rem; text-align: left; border: 1px solid #e2e8f0;">选择理由</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">RFM</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">R/F/M 各五分位</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">分位数避免极端值影响，五分位足够细又不至于复杂</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">聚类</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">Silhouette Score</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">衡量聚类紧密度和分离度，取值 [-1, 1]，直观可比较</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">CLV</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">总消费金额 × 毛利率假设</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">简化模型，不依赖复杂的生存分析；毛利率假设基于行业经验（~40%）</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">Churn</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">AUC-ROC + 混淆矩阵</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">AUC 不受阈值选择影响；混淆矩阵供业务团队理解 Precision/Recall 权衡</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">Forecast</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">MAE + MAPE</td>
        <td style="padding: 0.6rem 1rem; border: 1px solid #e2e8f0;">MAE 直观（与原数据同单位）；MAPE 衡量相对误差，便于跨品类比较</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Bottom nav -->
<div class="bottom-step-nav">
  <a href="{{ site.baseurl }}/cdt502/steps/overview/">← 概览</a>
  <a href="{{ site.baseurl }}/cdt502/steps/step-01-data-loading/" class="next">开始阅读 Step 1 →</a>
</div>
