<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-01" title="产品说明书" desc="产品说明书的创建、编辑、工作流管理" />

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




1
.
 
用
户
新
建
产
品
说
明
书
，
填
写
说
明
书
基
本
信
息
并
上
传
附
件
文
件


2
.
 
关
联
产
品
型
号
（
E
S
_
S
P
E
C
_
M
O
D
E
L
）
和
产
品
分
类
（
E
S
_
S
P
E
C
C
L
A
S
_
R
E
F
）


3
.
 
保
存
草
稿
或
直
接
提
交
审
批


4
.
 
审
批
流
程
流
转
（
工
作
流
：
S
U
B
_
P
R
O
D
U
C
T
_
S
P
E
C
I
F
I
C
A
T
I
O
N
_
M
A
I
N
）


5
.
 
审
批
通
过
后
说
明
书
生
效
，
可
供
查
阅




`
`
`


新
建
说
明
书
 
→
 
关
联
型
号
/
分
类
 
→
 
保
存
/
提
交
审
批
 
→
 
审
批
流
转
 
→
 
生
效


`
`
`


</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 后端接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs</td>
<td>POST</td>
<td>新建说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs</td>
<td>GET</td>
<td>查询说明书列表</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>GET</td>
<td>查询说明书详情</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>PUT</td>
<td>更新说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>DELETE</td>
<td>删除说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}/submit</td>
<td>POST</td>
<td>提交审批</td>
</tr>
</tbody></table></div>

- Controller: `EsSpecController`

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-ae`
- 页面路径：`arrow-ae/productInfo/esSpecProp`
- 路由：
  - `/es-spec-prop/list` — 说明书列表页
  - `/es-spec-prop/detail/:specid` — 说明书详情页

</KbCard>

<KbCard title="3.3 工作流">

- 工作流编码：`SUB_PRODUCT_SPECIFICATION_MAIN`
- 工作流名称：产品说明书
- 触发时机：用户点击"提交审批"按钮

</KbCard>

<KbCard title="3.4 核心业务规则">

1. 新建时必填说明书名称、说明书编码
2. 关联型号和分类支持多选
3. 草稿状态可编辑，审批中不可修改
4. 审批拒绝后可重新编辑提交

</KbCard>

<KbCard num="1" title="4.1 ES_SPEC（说明书表）">

| 字段 | 说明 |
|------|------|
| spec_id | 说明书ID（主键） |
| spec_name | 说明书名称 |
| spec_code | 说明书编码 |
| organization_id | 组织ID |
| status | 状态（草稿/审批中/生效/失效） |
| created_by | 创建人 |
| creation_date | 创建时间 |
| last_updated_by | 最后更新人 |
| last_update_date | 最后更新时间 |

</KbCard>

<KbCard num="2" title="4.2 ES_SPEC_MODEL（说明书关联型号表）">

| 字段 | 说明 |
|------|------|
| spec_model_id | 关联ID（主键） |
| spec_id | 说明书ID |
| model_id | 产品型号ID |
| model_code | 产品型号编码 |

</KbCard>

<KbCard num="3" title="4.3 ES_SPECCLAS_REF（说明书与分类关联表）">

| 字段 | 说明 |
|------|------|
| specclas_ref_id | 关联ID（主键） |
| spec_id | 说明书ID |
| classification_id | 产品分类ID |
| classification_code | 产品分类编码 |

</KbCard>

<KbCard num="4" title="4.4 ES_DOCS（说明书文件表）">

| 字段 | 说明 |
|------|------|
| doc_id | 文件ID（主键） |
| spec_id | 说明书ID |
| file_name | 文件名 |
| file_path | 文件存储路径 |
| file_type | 文件类型 |
| file_size | 文件大小 |
| upload_date | 上传时间 |
| upload_by | 上传人 |

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

| 日期 | 内容 |
|------|------|
| 2026-08-03 | 初始创建 |
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
