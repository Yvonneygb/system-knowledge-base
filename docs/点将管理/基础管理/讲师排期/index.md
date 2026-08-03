<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-07" title="讲师排期" desc="讲师排期的增删管理、冲突校验" />

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
排
期
查
询
 
→
 
查
看
讲
师
可
用
时
间
段
 
→
 
添
加
排
期
（
占
用
讲
师
时
间
）
 
→
 
供
点
将
时
选
择
讲
师


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
↓


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
取
消
排
期
（
释
放
讲
师
时
间
）


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
排
期
页
面
查
询
讲
师
的
时
间
排
期
情
况


2
.
 
为
讲
师
添
加
排
期
，
占
用
讲
师
特
定
时
间
段


3
.
 
排
期
信
息
供
点
将
业
务
查
询
讲
师
可
用
时
间
时
使
用


4
.
 
如
需
释
放
讲
师
时
间
，
可
取
消
排
期




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
<KbCard num="1" title="2.1 排期管理">
**具体逻辑**：

- 1、讲师排期用于管理讲师的时间可用性
- 2、添加排期后，对应时间段讲师被标记为"已排期"
- 3、取消排期后，对应时间段讲师恢复为"可用"
- 4、排期信息是点将业务中查询讲师可用时间的基础数据
</KbCard>

<KbCard num="2" title="2.2 与点将业务的关联">
**具体逻辑**：

- 1、点将业务选择讲师时，需查询讲师排期判断可用性
- 2、已排期时间段不可重复排期（防冲突）
- 3、排期状态影响讲师在点将列表中的可用标识
</KbCard>

<KbCard num="3" title="2.3 无工作流">
**具体逻辑**：

- 1、讲师排期不涉及审批工作流
- 2、添加排期和取消排期均为即时生效操作
- 3、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 列表页">

- **路由**: `/general/base/lecturerSchedule`
- **API**: `mlt/maLecturerSchedule/scheduleList`（分页查询）
- **查询条件**: 讲师姓名、排期日期范围、排期状态等
- **列表字段**: 讲师姓名、排期日期、开始时间、结束时间、排期状态、关联点将单号、创建时间等
- **操作按钮**:
  - 添加排期：打开排期弹窗，选择讲师和时间段
  - 取消排期：确认后取消排期，释放讲师时间
  - 查看详情：查看排期详细信息

</KbCard>

<KbCard title="3.2 添加排期逻辑（addSchedule）">

1. 点击"添加排期"按钮，打开排期弹窗
2. 选择讲师（支持搜索，关联讲师档案）
3. 填写排期信息：
   - 排期日期
   - 开始时间
   - 结束时间
   - 排期备注
4. 校验逻辑：
   - 排期时间段不可与该讲师已有排期冲突
   - 开始时间必须早于结束时间
   - 排期日期不可为过去日期
5. 校验通过后调用 `mlt/maLecturerSchedule/addSchedule` 保存
6. 保存成功后刷新列表

</KbCard>

<KbCard title="3.3 取消排期逻辑（cancelSchedule）">

1. 选择需要取消的排期记录
2. 点击"取消排期"按钮
3. 弹出确认提示
4. 确认后调用 `mlt/maLecturerSchedule/cancelSchedule`
5. 取消成功后：
   - 排期状态更新为"已取消"
   - 讲师对应时间段释放为可用
6. 刷新列表

</KbCard>

<KbCard title="3.4 排期冲突校验">

- 添加排期时，系统自动校验该讲师在目标时间段内是否已有排期
- 冲突规则：新排期时间段与已有排期时间段存在交集即为冲突
- 冲突时提示用户"该讲师在指定时间段已有排期，请重新选择"

</KbCard>

<KbCard title="3.5 API清单">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>API路径</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>mlt/maLecturerSchedule/scheduleList</td>
<td>GET</td>
<td>查询排期列表</td>
</tr>
<tr>
<td>mlt/maLecturerSchedule/addSchedule</td>
<td>POST</td>
<td>添加排期</td>
</tr>
<tr>
<td>mlt/maLecturerSchedule/cancelSchedule</td>
<td>POST</td>
<td>取消排期</td>
</tr>
</tbody></table></div>

---

</KbCard>

<KbCard num="1" title="4.1 主表：ma_lecturer_schedule（讲师排期表）">

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| lecturer_schedule_id | VARCHAR2 | 主键ID | 主键 |
| lecturer_schedule_code | VARCHAR2 | 排期编码 | 业务唯一键 |
| lecturer_archives_code | VARCHAR2 | 关联讲师档案编码 | 外键关联ma_lecturer_archive |
| lecturer_name | VARCHAR2 | 讲师姓名 | 冗余存储便于查询 |
| schedule_date | DATE | 排期日期 | |
| start_time | VARCHAR2 | 开始时间 | 格式HH:mm |
| end_time | VARCHAR2 | 结束时间 | 格式HH:mm |
| schedule_status | VARCHAR2 | 排期状态 | 有效/已取消 |
| related_order_code | VARCHAR2 | 关联点将单号 | 点将业务创建时回写 |
| schedule_remark | VARCHAR2 | 排期备注 | |
| created_by | VARCHAR2 | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | VARCHAR2 | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 乐观锁版本号 | |

</KbCard>

<KbCard num="2" title="4.2 关键索引">

| 索引名 | 字段 | 说明 |
|--------|------|------|
| idx_schedule_lecturer | lecturer_archives_code, schedule_date | 按讲师+日期查询排期，用于冲突校验 |
| idx_schedule_status | schedule_status | 按状态过滤有效排期 |

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
