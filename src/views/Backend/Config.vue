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
  ></base-table>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';

export default {
  components: { BaseTable },
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      queryFormItems: [
        {
          field: 'name',
          span: 6,
          title: '名称',
          resetValue: null,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入名称' },
          },
        },
        {
          field: 'codename',
          span: 6,
          title: '变量键',
          resetValue: null,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入变量键' },
          },
        },
      ],
      editFormItems: [
        {
          field: 'module',
          span: 24,
          title: '功能模块',
          itemRender: { name: '$input', props: { placeholder: '请输入功能模块' } },
        },
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
          itemRender: { name: '$input', props: { placeholder: '请输入描述' } },
        },
        {
          field: 'codename',
          span: 24,
          title: '变量键',
          itemRender: { name: '$input', props: { placeholder: '请输入变量键' } },
        },
        {
          field: 'value',
          span: 24,
          title: '变量值',
          itemRender: { name: '$input', props: { placeholder: '请输入变量值' } },
        },
      ],
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'module', title: '功能模块' },
        { field: 'name', title: '名称' },
        { field: 'desc', title: '描述' },
        { field: 'codename', title: '变量键' },
        { field: 'value', title: '变量值' },
      ],
      data: [],
      total: 0,
      query(params) {
        const query = { ...params };
        return proxy.$api.config
          .get(query)
          .then(res => {
            if (res.success) {
              state.data = res.data.rows;
              state.total = res.data.total;
            } else {
              proxy.$tips.warning(res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error(err.msg);
          });
      },
      add(data) {
        return proxy.$api.config
          .add(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning(res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error(err.msg);
          });
      },
      update(data) {
        return proxy.$api.config
          .update(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning(res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error(err.msg);
          });
      },
      del(data) {
        return proxy.$api.config
          .del({ id: data.id })
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning(res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error(err.msg);
          });
      },
    });
    return {
      state,
    };
  },
};
</script>
