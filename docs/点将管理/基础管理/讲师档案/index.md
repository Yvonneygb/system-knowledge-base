<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-06" title="讲师档案" desc="讲师档案的双Tab管理、审批机制" />

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
创
建
 
→
 
填
写
个
人
档
案
/
讲
师
档
案
 
→
 
提
交
审
批
 
→
 
审
批
通
过
 
→
 
档
案
生
效


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
↓


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
审
批
拒
绝
 
→
 
修
改
后
重
新
提
交


`
`
`




1
.
 
用
户
在
讲
师
档
案
列
表
页
新
建
讲
师
档
案


2
.
 
进
入
详
情
页
，
在
"
个
人
档
案
"
和
"
讲
师
档
案
"
两
个
T
a
b
页
签
下
分
别
维
护
信
息


3
.
 
个
人
档
案
T
a
b
：
管
理
讲
师
基
本
个
人
信
息
（
姓
名
、
联
系
方
式
、
所
属
组
织
等
）


4
.
 
讲
师
档
案
T
a
b
：
管
理
讲
师
资
质
信
息
（
讲
师
类
型
、
等
级
、
价
格
等
）


5
.
 
填
写
完
成
后
，
提
交
审
批
，
审
批
流
转
至
档
案
审
批
菜
单
处
理


6
.
 
审
批
通
过
后
档
案
状
态
更
新
为
生
效
；
审
批
拒
绝
可
修
改
后
重
新
提
交




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
<KbCard num="1" title="2.1 双Tab页签架构">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>Tab页签</th>
<th>说明</th>
<th>主要字段</th>
</tr>
<tr>
<td>个人档案</td>
<td>讲师个人基本信息</td>
<td>姓名、手机号、邮箱、所属组织、身份证号等</td>
</tr>
<tr>
<td>讲师档案</td>
<td>讲师资质与业务信息</td>
<td>讲师类型、培训讲师等级、活动讲师等级、设计讲师等级、讲师价格等</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="2" title="2.2 内置审批机制">
**具体逻辑**：

- 1、提交审批调用内置审批接口 `mlt/maLecturerApproval/*`
- 2、审批状态通过值集 `MBO.APPROVAL_STATUS` 控制
- 3、提交后档案状态变更为"审批中"，不可编辑
- 4、审批结果返回后自动更新档案状态
</KbCard>

<KbCard num="3" title="2.3 讲师等级体系">
**具体逻辑**：

- 1、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 列表页">

- **路由**: `/general/base/lecturerProfile/list`
- **API**: `mlt/maLecturerArchive/list`（分页查询）
- **查询条件**: 讲师编码、讲师姓名、讲师类型、档案状态等
- **列表字段**: 讲师档案编码、讲师姓名、讲师类型、档案状态、审批状态、讲师等级、创建时间等
- **操作按钮**:
  - 新建：跳转详情页（新增模式）
  - 编辑：跳转详情页（编辑模式），仅草稿/审批拒绝状态可编辑
  - 提交审批：调用审批接口提交
  - 删除：仅草稿状态可删除
  - 查看详情：跳转详情页（查看模式）

</KbCard>

<KbCard title="3.2 详情页">

- **路由**: `/general/base/lecturerProfile/detail/:id/:type`
  - `:id` — 讲师档案ID（lecturerArchivesId）
  - `:type` — 操作类型（new/edit/view）
- **API**:
  - 查询详情: `mlt/maLecturerArchive/detail`
  - 新增保存: `mlt/maLecturerArchive/create`
  - 编辑保存: `mlt/maLecturerArchive/update`
  - 提交审批: `mlt/maLecturerApproval/submit`

**3.2.1 个人档案Tab**

- 维护讲师个人基本信息
- 字段：讲师姓名、性别、手机号、邮箱、身份证号、所属组织、入职日期等
- 保存时校验必填字段

**3.2.2 讲师档案Tab**

- 维护讲师资质与业务信息
- 字段：讲师类型（MBO.LECTURER_TYPE）、培训讲师等级、活动讲师等级、设计讲师等级、讲师价格、资质证书等
- 档案状态（MBO.ARCHIVES_STATUS）：草稿/审批中/生效/失效
- 保存时校验讲师类型和等级的合法性

</KbCard>

<KbCard title="3.3 审批提交逻辑">

1. 校验档案信息完整性（必填字段、等级信息）
2. 生成审批单，关联 `lecturerArchivesCode`
3. 调用 `mlt/maLecturerApproval/submit` 提交
4. 更新档案状态为"审批中"
5. 审批结果回调后更新档案状态：
   - 通过 → 状态变为"生效"
   - 拒绝 → 状态变为"审批拒绝"，允许修改重新提交

</KbCard>

<KbCard title="3.4 值集依赖">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>值集编码</th>
<th>用途</th>
<th>使用位置</th>
</tr>
<tr>
<td>MBO.LECTURER_TYPE</td>
<td>讲师类型</td>
<td>讲师档案Tab-讲师类型字段</td>
</tr>
<tr>
<td>MBO.ARCHIVES_STATUS</td>
<td>档案状态</td>
<td>列表页状态列、详情页状态显示</td>
</tr>
<tr>
<td>MBO.APPROVAL_STATUS</td>
<td>审批状态</td>
<td>列表页审批状态列</td>
</tr>
<tr>
<td>MBO.TRAIN_LECTURER_LEVEL</td>
<td>培训讲师等级</td>
<td>讲师档案Tab-培训讲师等级字段</td>
</tr>
<tr>
<td>MBO.ACTIVITY_LECTURER_LEVEL</td>
<td>活动讲师等级</td>
<td>讲师档案Tab-活动讲师等级字段</td>
</tr>
<tr>
<td>MBO.DESIGN_LECTURER_LEVEL</td>
<td>设计讲师等级</td>
<td>讲师档案Tab-设计讲师等级字段</td>
</tr>
</tbody></table></div>

---

</KbCard>

<KbCard num="1" title="4.1 主表：ma_lecturer_archive（讲师档案表）">

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| lecturer_archives_id | VARCHAR2 | 主键ID | 主键 |
| lecturer_archives_code | VARCHAR2 | 档案编码 | 业务唯一键 |
| lecturer_name | VARCHAR2 | 讲师姓名 | |
| lecturer_type | VARCHAR2 | 讲师类型 | 值集MBO.LECTURER_TYPE |
| archives_status | VARCHAR2 | 档案状态 | 值集MBO.ARCHIVES_STATUS |
| approval_status | VARCHAR2 | 审批状态 | 值集MBO.APPROVAL_STATUS |
| train_lecturer_level | VARCHAR2 | 培训讲师等级 | 值集MBO.TRAIN_LECTURER_LEVEL |
| activity_lecturer_level | VARCHAR2 | 活动讲师等级 | 值集MBO.ACTIVITY_LECTURER_LEVEL |
| design_lecturer_level | VARCHAR2 | 设计讲师等级 | 值集MBO.DESIGN_LECTURER_LEVEL |
| lecturer_price | NUMBER | 讲师价格 | |
| phone | VARCHAR2 | 手机号 | |
| email | VARCHAR2 | 邮箱 | |
| id_card | VARCHAR2 | 身份证号 | |
| organization_id | VARCHAR2 | 所属组织ID | |
| organization_name | VARCHAR2 | 所属组织名称 | |
| created_by | VARCHAR2 | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | VARCHAR2 | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 乐观锁版本号 | |

</KbCard>

<KbCard num="2" title="4.2 审批表：ma_lecturer_approval（讲师审批表）">

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| lecturer_approval_id | VARCHAR2 | 主键ID | 主键 |
| lecturer_archives_code | VARCHAR2 | 关联档案编码 | 外键关联ma_lecturer_archive |
| approval_type | VARCHAR2 | 审批类型 | |
| approval_status | VARCHAR2 | 审批状态 | 值集MBO.APPROVAL_STATUS |
| submit_date | DATE | 提交时间 | |
| approver | VARCHAR2 | 审批人 | |
| approval_date | DATE | 审批时间 | |
| approval_remark | VARCHAR2 | 审批备注 | |
| created_by | VARCHAR2 | 创建人 | |
| creation_date | DATE | 创建时间 | |

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
