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
    <template #row_is_active="{ row }">
      <span v-if="row.isActive === 0">已激活</span>
      <span v-if="row.isActive === 1">未激活</span>
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
      queryFormItems: [
        {
          field: 'isActive',
          span: 6,
          title: '激活状态',
          resetValue: 1,
          itemRender: {
            name: '$select',
            options: [
              { label: '已激活', value: 1 },
              { label: '未激活', value: 0 },
            ],
            props: { placeholder: '请选择激活状态' },
          },
        },
      ],
      editFormItems: [
        { field: 'name', span: 24, title: '名称', itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        {
          field: 'desc',
          span: 24,
          title: '描述',
          itemRender: { name: '$textarea', props: { placeholder: '请输入内容', resize: 'vertical', autosize: { minRows: 4, maxRows: 4 } } },
        },
      ],
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'name', title: '名称' },
        { field: 'desc', title: '描述' },
        { field: 'isActive', title: '激活状态', slots: { default: 'row_is_active' } },
      ],
      data: [
        { id: 1, name: '音乐', desc: '音乐盛宴', isActive: 1 },
        { id: 2, name: '电源', desc: '电源盛宴', isActive: 1 },
        { id: 3, name: '综艺', desc: '综艺盛宴', isActive: 1 },
        { id: 4, name: '体育', desc: '体育盛宴', isActive: 1 },
        { id: 5, name: '动漫', desc: '动漫盛宴', isActive: 1 },
        { id: 6, name: '游戏', desc: '游戏盛宴', isActive: 0 },
        { id: 7, name: '动漫', desc: '动漫盛宴', isActive: 1 },
        { id: 8, name: '游戏', desc: '游戏盛宴', isActive: 0 },
        { id: 9, name: '动漫', desc: '动漫盛宴', isActive: 1 },
        { id: 10, name: '游戏', desc: '游戏盛宴', isActive: 0 },
      ],
      total: 15,
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
