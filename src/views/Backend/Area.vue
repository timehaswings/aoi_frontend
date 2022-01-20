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
          field: 'sort',
          span: 24,
          title: '权重',
          resetValue: 100,
          itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入权重' } },
        },
      ],
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'name', title: '名称' },
        { field: 'sort', title: '权重' },
      ],
      data: [],
      total: 0,
      query(params) {
        const query = { ...params, sort: '-sort,-id' };
        return proxy.$api.area
          .get(query)
          .then(res => {
            if (res.success) {
              state.data = res.data.rows;
              state.total = res.data.total;
            } else {
              proxy.$tips.warning('获取地区失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('获取地区失败：' + err.msg);
          });
      },
      add(data) {
        return proxy.$api.area
          .add(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('添加地区失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('添加地区失败：' + err.msg);
          });
      },
      update(data) {
        return proxy.$api.area
          .update(data)
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('修改地区失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('修改地区失败：' + err.msg);
          });
      },
      del(data) {
        return proxy.$api.area
          .del({ id: data.id })
          .then(res => {
            if (res.success) {
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('删除地区失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('删除地区失败：' + err.msg);
          });
      },
    });
    return {
      state,
    };
  },
};
</script>
