<template>
  <base-table
    ref="baseTable"
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
    <template #table_operation="{ row }">
      <vxe-button type="text" status="info" icon="el-icon-edit" @click="$refs.baseTable.showEditModal(row)">
        {{ $t('table.edit') }}
      </vxe-button>
      <vxe-button type="text" status="danger" icon="el-icon-delete" @click="$refs.baseTable.onDel(row)">
        {{ $t('table.del') }}
      </vxe-button>
    </template>
  </base-table>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';

export default {
  components: { BaseTable },
  setup() {
    const { proxy } = getCurrentInstance();
    const activeList = [
      { label: '已激活', value: true },
      { label: '未激活', value: false },
    ];
    const baseTable = ref(null);
    const state = reactive({
      queryFormItems: [
        {
          field: 'username',
          span: 4,
          title: '用户名',
          resetValue: null,
          itemRender: {
            name: '$input',
            props: { placeholder: '输入名称' },
          },
        },
        {
          field: 'isActive',
          span: 4,
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
          field: 'username',
          span: 24,
          title: '用户名',
          itemRender: { name: '$input', props: { placeholder: '请输入用户名' } },
        },
        {
          field: 'email',
          span: 24,
          title: '邮箱',
          itemRender: { name: '$input', props: { placeholder: '请输入邮箱' } },
        },
        {
          field: 'password',
          span: 24,
          title: '密码',
          editVisible: false,
          addVisible: true,
          itemRender: { name: '$input', props: { type: 'password', placeholder: '请输入密码' } },
        },
        {
          field: 'isActive',
          span: 24,
          title: '状态',
          editVisible: true,
          addVisible: false,
          resetValue: true,
          itemRender: { name: '$select', options: activeList, props: { placeholder: '请选择状态' } },
        },
      ],
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'username', title: '用户名' },
        { field: 'email', title: '邮箱' },
        { field: 'isActive', title: '激活状态', slots: { default: 'row_is_active' } },
        { field: 'lastLogin', title: '最近登录' },
        { field: 'dateJoined', title: '创建日期' },
      ],
      data: [],
      total: 0,
      query(params) {
        const query = { ...params, sort: '-id' };
        return proxy.$api.user
          .get(query)
          .then(res => {
            if (res.success) {
              state.data = res.data.rows;
              state.total = res.data.total;
            } else {
              proxy.$tips.warning('获取用户失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('获取用户失败：' + err.msg);
          });
      },
      add(data) {
        return proxy.$api.user
          .add(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('添加用户失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('添加用户失败：' + err.msg);
          });
      },
      update(data) {
        return proxy.$api.user
          .update(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('修改用户失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('修改用户失败：' + err.msg);
          });
      },
      del(data) {
        return proxy.$api.user
          .del({ id: data.id })
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('删除用户失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('删除用户失败：' + err.msg);
          });
      },
    });
    return {
      baseTable,
      state,
    };
  },
};
</script>
