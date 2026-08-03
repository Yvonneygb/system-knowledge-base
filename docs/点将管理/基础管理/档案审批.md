<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-05" title="档案审批" desc="讲师档案审批、价格审批、价格变更审批" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">
#
#
 
一
、
业
务
流
程




`
`
`


讲
师
档
案
提
交
审
批
 
→
 
档
案
审
批
列
表
展
示
待
审
批
单
 
→
 
审
批
人
审
核
（
通
过
/
拒
绝
）
 
→
 
结
果
回
写
讲
师
档
案
状
态


讲
师
价
格
变
更
提
交
 
→
 
价
格
审
批
列
表
展
示
待
审
批
单
 
→
 
审
批
人
审
核
（
通
过
/
拒
绝
）
 
→
 
结
果
回
写
讲
师
价
格


讲
师
价
格
变
更
申
请
 
→
 
价
格
变
更
审
批
列
表
展
示
待
审
批
单
 
→
 
审
批
人
审
核
（
通
过
/
拒
绝
）
 
→
 
结
果
回
写
讲
师
价
格


`
`
`




1
.
 
讲
师
在
"
讲
师
档
案
"
菜
单
提
交
审
批
后
，
审
批
单
流
转
至
此
菜
单


2
.
 
审
批
人
根
据
审
批
类
型
（
档
案
审
批
/
价
格
审
批
/
价
格
变
更
审
批
）
在
对
应
列
表
中
查
看
待
审
批
数
据


3
.
 
审
批
人
执
行
审
批
操
作
（
通
过
/
拒
绝
）
，
填
写
审
批
意
见


4
.
 
审
批
结
果
自
动
回
写
至
讲
师
档
案
，
更
新
档
案
状
态
或
价
格
信
息




-
-
-


</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 三类审批场景">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>审批类型</th>
<th>审批接口</th>
<th>说明</th>
</tr>
<tr>
<td>档案审批</td>
<td>archivesAudit</td>
<td>对讲师档案基本信息的审批</td>
</tr>
<tr>
<td>价格审批</td>
<td>priceAudit</td>
<td>对讲师价格的首次审批</td>
</tr>
<tr>
<td>价格变更审批</td>
<td>priceChangeApproval</td>
<td>对讲师价格变更的审批</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="2" title="2.2 审批状态流转">
**具体逻辑**：

- 1、审批状态由值集 `MBO.APPROVAL_RESULT` 定义
- 2、审批通过后自动回写讲师档案状态/价格
- 3、审批拒绝后讲师档案状态回退，允许修改重新提交
</KbCard>

<KbCard num="3" title="2.3 与讲师档案的关联">
**具体逻辑**：

- 1、通过 `lecturerArchivesCode` 关联讲师档案
- 2、审批结果直接驱动讲师档案的状态变更
- 3、审批单中可查看关联讲师档案的详细信息
- 4、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 列表页">

- **路由**: `/general/base/profileApproval`
- **API**: `mlt/maLecturerApproval/list`（分页查询）
- **查询条件**: 审批类型、审批状态、讲师档案编码、讲师姓名、提交时间等
- **列表字段**: 审批单号、讲师档案编码、讲师姓名、审批类型、审批状态、提交人、提交时间等
- **操作按钮**:
  - 审批：打开审批弹窗，填写审批意见，执行通过/拒绝
  - 查看详情：查看关联讲师档案详细信息

</KbCard>

<KbCard title="3.2 审批操作逻辑">

**3.2.1 档案审批（archivesAudit）**

1. 查看待审批讲师档案的详细信息（个人档案+讲师档案）
2. 审批人审核档案信息的完整性和合理性
3. 执行审批：
   - 通过 → 调用 `mlt/maLecturerApproval/archivesAudit`，传入审批结果=通过
   - 拒绝 → 调用 `mlt/maLecturerApproval/archivesAudit`，传入审批结果=拒绝+审批意见
4. 审批结果回写：
   - 通过 → 讲师档案状态更新为"生效"
   - 拒绝 → 讲师档案状态更新为"审批拒绝"

**3.2.2 价格审批（priceAudit）**

1. 查看待审批讲师的价格信息
2. 审批人审核价格的合理性
3. 执行审批：
   - 通过 → 调用 `mlt/maLecturerApproval/priceAudit`，传入审批结果=通过
   - 拒绝 → 调用 `mlt/maLecturerApproval/priceAudit`，传入审批结果=拒绝+审批意见
4. 审批结果回写：
   - 通过 → 讲师价格生效
   - 拒绝 → 价格维持原值

**3.2.3 价格变更审批（priceChangeApproval）**

1. 查看待审批讲师的价格变更信息（原价格、新价格、变更原因）
2. 审批人审核价格变更的合理性
3. 执行审批：
   - 通过 → 调用 `mlt/maLecturerApproval/priceChangeApproval`，传入审批结果=通过
   - 拒绝 → 调用 `mlt/maLecturerApproval/priceChangeApproval`，传入审批结果=拒绝+审批意见
4. 审批结果回写：
   - 通过 → 讲师价格更新为新价格
   - 拒绝 → 价格维持原值不变

</KbCard>

<KbCard title="3.3 值集依赖">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>值集编码</th>
<th>用途</th>
<th>使用位置</th>
</tr>
<tr>
<td>MBO.APPROVAL_TYPE</td>
<td>审批类型</td>
<td>列表页查询条件-审批类型字段</td>
</tr>
<tr>
<td>MBO.APPROVAL_RESULT</td>
<td>审批结果</td>
<td>审批弹窗-审批结果选项</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.4 API清单">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>API路径</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>mlt/maLecturerApproval/list</td>
<td>GET</td>
<td>查询审批列表</td>
</tr>
<tr>
<td>mlt/maLecturerApproval/detail</td>
<td>GET</td>
<td>查询审批详情</td>
</tr>
<tr>
<td>mlt/maLecturerApproval/archivesAudit</td>
<td>POST</td>
<td>档案审批</td>
</tr>
<tr>
<td>mlt/maLecturerApproval/priceAudit</td>
<td>POST</td>
<td>价格审批</td>
</tr>
<tr>
<td>mlt/maLecturerApproval/priceChangeApproval</td>
<td>POST</td>
<td>价格变更审批</td>
</tr>
</tbody></table></div>

---

</KbCard>

<KbCard num="1" title="4.1 主表：ma_lecturer_approval（讲师审批表）">

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| lecturer_approval_id | VARCHAR2 | 主键ID | 主键 |
| lecturer_approval_code | VARCHAR2 | 审批单号 | 业务唯一键 |
| lecturer_archives_code | VARCHAR2 | 关联档案编码 | 外键关联ma_lecturer_archive |
| approval_type | VARCHAR2 | 审批类型 | 值集MBO.APPROVAL_TYPE（档案审批/价格审批/价格变更审批） |
| approval_status | VARCHAR2 | 审批状态 | |
| approval_result | VARCHAR2 | 审批结果 | 值集MBO.APPROVAL_RESULT（通过/拒绝） |
| submit_by | VARCHAR2 | 提交人 | |
| submit_date | DATE | 提交时间 | |
| approver | VARCHAR2 | 审批人 | |
| approval_date | DATE | 审批时间 | |
| approval_remark | VARCHAR2 | 审批意见 | |
| original_price | NUMBER | 原价格 | 价格变更审批时记录原价格 |
| new_price | NUMBER | 新价格 | 价格变更审批时记录新价格 |
| price_change_reason | VARCHAR2 | 价格变更原因 | 价格变更审批时填写 |
| created_by | VARCHAR2 | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | VARCHAR2 | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 乐观锁版本号 | |

---

</KbCard>

</div>
</div>
</div>

<div id="permission" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="权限控制">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="faq" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="常见问题">
<div class="faq-qa-wrap">
</div>
</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|----------|--------|
| 2026-08-03 | v1.0 | 初始创建 | AI |
</KbCard>
</div>
</div>
</div>

<div id="history" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="历史排查记录">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>
