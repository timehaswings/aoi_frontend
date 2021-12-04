<template>
  <base-table
    :columns="state.columns"
    :data="state.data"
    :total="state.total"
    :query-form-items="state.queryFormItems"
    :edit-form-items="state.editFormItems"
    :query-function="state.query"
    :add-function="state.add"
    :update-function="state.update"
    :del-function="state.del"
  >
    <template #row_sex="{ row }">
      <span v-if="row.sex === 0">男的</span>
      <span v-if="row.sex === 1">女的</span>
    </template>
  </base-table>
</template>

<script>
import { reactive } from 'vue';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';

export default {
  components: { BaseTable },
  setup() {
    const state = reactive({
      queryFormItems: [{ field: 'name', span: 6, title: '名称', itemRender: { name: '$input', props: { placeholder: '请输入名称' } } }],
      editFormItems: [
        { field: 'name', span: 24, title: '名称1', itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        { field: 'age', span: 24, title: '年龄1', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
      ],
      columns: [
        { field: 'name', title: '名称' },
        { field: 'age', title: '年龄' },
        { field: 'sex', title: '性别', slots: { default: 'row_sex' } },
      ],
      data: [
        { name: '张三', age: 18, sex: 0 },
        { name: '李四', age: 28, sex: 1 },
      ],
      total: 10,
      query(params) {
        console.log('===query===');
        console.log(params);
      },
      add(data) {
        console.log('===add===');
        console.log(data);
      },
      update(data) {
        console.log('===update===');
        console.log(data);
      },
      del(data) {
        console.log('===del===');
        console.log(data);
      },
    });
    return {
      state,
    };
  },
};
</script>
