<template>
  <base-table
    :columns="state.columns"
    :data="state.data"
    :total="state.total"
    :query-form-items="state.queryFormItems"
    :edit-form-items="state.editFormItems"
    edit-form-title-width="80"
    :query-function="state.query"
    :add-function="state.add"
    :update-function="state.update"
    :del-function="state.del"
  >
    <template #row_is_active="{ row }">
      <el-tag v-if="row.isActive" size="mini" type="success" effect="dark">已激活</el-tag>
      <el-tag v-else size="mini" type="danger" effect="dark">未激活</el-tag>
    </template>
  </base-table>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';

export default {
  components: { BaseTable },
  setup() {
    const { proxy } = getCurrentInstance();
    const activeList = [
      { label: '已激活', value: true },
      { label: '未激活', value: false },
    ];
    const state = reactive({
      queryFormItems: [
        {
          field: 'isActive',
          span: 6,
          title: '激活状态',
          resetValue: null,
          itemRender: {
            name: '$select',
            options: activeList,
            props: { placeholder: '请选择激活状态' },
          },
        },
      ],
      editFormItems: [
        {
          field: 'name',
          span: 24,
          title: '名称',
          itemRender: { name: '$input', props: { placeholder: '请输入名称' } },
        },
        {
          field: 'desc',
          span: 24,
          title: '描述',
          itemRender: {
            name: '$textarea',
            props: { placeholder: '请输入描述', resize: 'vertical', autosize: { minRows: 4, maxRows: 4 } },
          },
        },
        {
          field: 'sort',
          span: 24,
          title: '权重',
          resetValue: 100,
          itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入权重' } },
        },
        {
          field: 'isActive',
          span: 24,
          title: '激活状态',
          resetValue: true,
          itemRender: { name: '$select', options: activeList, props: { placeholder: '请选择激活状态' } },
        },
      ],
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'name', title: '名称' },
        { field: 'desc', title: '描述' },
        { field: 'sort', title: '权重' },
        { field: 'isActive', title: '激活状态', slots: { default: 'row_is_active' } },
        { field: 'createName', title: '创建人' },
      ],
      data: [],
      total: 0,
      query(params) {
        const query = { ...params, sort: '-sort,-id' };
        return proxy.$api.tag
          .get(query)
          .then(res => {
            if (res.success) {
              state.data = res.data.rows;
              state.total = res.data.total;
            } else {
              proxy.$tips.warning('获取标签失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('获取标签失败：' + err.msg);
          });
      },
      add(data) {
        return proxy.$api.tag
          .add(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('添加标签失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('添加标签失败：' + err.msg);
          });
      },
      update(data) {
        return proxy.$api.tag
          .update(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('修改标签失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('修改标签失败：' + err.msg);
          });
      },
      del(data) {
        return proxy.$api.tag
          .del({ id: data.id })
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('删除标签失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('删除标签失败：' + err.msg);
          });
      },
    });
    return {
      state,
    };
  },
};
</script>
