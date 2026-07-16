# Test Page 2 - with more elements

<!-- modal test -->
<div id="test-1" class="overlay">
  <div class="box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>{invbillno}-{itemCode}对应的出库单明细不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text">校验出库单行ID是否存在且有效。</div>
    <div class="detail-tip">阻断型错误</div>
    <div class="sql">-- 检查出库单行是否存在
SELECT o.id, o.del_flag, o.bill_no
FROM out_delivery_order_detail o
WHERE o.id = {出库单行ID};</div>
  </div>
</div>
