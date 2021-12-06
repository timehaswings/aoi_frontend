<template>
  <div class="base-table">
    <vxe-grid
      ref="xGrid"
      round
      resizable
      auto-resize
      header-align="center"
      align="center"
      size="small"
      border
      highlight-hover-row
      :loading="loading"
      :height="height"
      :form-config="formConfig"
      :print-config="{}"
      :export-config="{}"
      :toolbar-config="toolbarConfig"
      v-bind="gridOptions"
    >
      <template #empty>
        <span style="color: red">
          <p>没有更多数据了！</p>
        </span>
      </template>
      <template #query_operation>
        <vxe-button v-if="queryFormItems.length" status="primary" icon="vxe-icon--search" @click="onQuery">查询</vxe-button>
        <vxe-button status="success" icon="vxe-icon--plus" @click="showAddModal">新增</vxe-button>
      </template>
      <template #operation="{ row }">
        <vxe-button type="text" status="info" @click="showEditModal(row)" icon="vxe-icon--edit-outline">编辑</vxe-button>
        <vxe-button type="text" status="danger" @click="onDel(row)" icon="vxe-icon--close">删除</vxe-button>
      </template>
      <template v-for="(index, name) in $slots" :key="index" #[name]="{ row }">
        <slot :name="name" :row="row" />
      </template>
      <template #pager>
        <vxe-pager
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          @page-change="onPageChange"
        >
        </vxe-pager>
      </template>
    </vxe-grid>
    <vxe-modal v-model="modalVisible" :title="modalTitle" esc-closable show-zoom resize>
      <vxe-form :data="editFormData" :items="editFormConfig">
        <template #modal_operation="{ data }">
          <vxe-button size="small" status="primary" @click="onSave(data)">保 存</vxe-button>
          <vxe-button size="small" @click="modalVisible = false">关 闭</vxe-button>
        </template>
      </vxe-form>
    </vxe-modal>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { VXETable } from 'vxe-table';

export default {
  name: 'BaseTable',
  props: {
    height: {
      // default: window.innerHeight - 100,
      default: 10 * 42 + 176,
    },
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    queryFormItems: {
      type: Array,
      default: () => {
        return [];
      },
    },
    editFormItems: {
      type: Array,
      default: () => {
        return [];
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    tableToolbar: {
      type: Object,
      default: null,
    },
    queryFunction: {
      type: Function,
      default: null,
    },
    addFunction: {
      type: Function,
      default: null,
    },
    updateFunction: {
      type: Function,
      default: null,
    },
    delFunction: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const xGrid = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const loading = ref(false);
    const modalVisible = ref(false);
    const modalTitle = ref('新增');
    const editFormData = ref({});
    const formData = {};
    props.queryFormItems.forEach((item) => {
      formData[item.field] = item.resetValue;
    });
    const formItems = [...props.queryFormItems, { field: '', span: 6, slots: { default: 'query_operation' } }];
    const formConfig = ref({
      span: 24,
      titleColon: true,
      className: 'table-query-form',
      data: formData,
      items: formItems,
    });
    const editFormConfig = ref([...props.editFormItems, { field: '', align: 'right', span: 24, slots: { default: 'modal_operation' } }]);
    const onQuery = async () => {
      if (props.queryFunction) {
        loading.value = true;
        await props.queryFunction(formConfig.value.data);
        loading.value = false;
      }
    };
    const onAdd = async (data) => {
      if (props.queryFunction && props.addFunction) {
        loading.value = true;
        await props.addFunction({ ...data });
        await props.queryFunction(formConfig.value.data);
        loading.value = false;
      }
    };
    const onUpdate = async (data) => {
      if (props.queryFunction && props.updateFunction) {
        loading.value = true;
        await props.updateFunction({ ...data });
        await props.queryFunction(formConfig.value.data);
        loading.value = false;
      }
    };
    const onDel = async (row) => {
      if (props.queryFunction && props.delFunction) {
        const result = await VXETable.modal.confirm('您确定要删除吗？');
        if ('confirm' == result) {
          loading.value = true;
          await props.delFunction({ ...row });
          await props.queryFunction(formConfig.value.data);
          loading.value = false;
        }
      }
    };
    const onPageChange = ({ currentPage, pageSize }) => {
      pageSize.value = pageSize;
      currentPage.value = currentPage;
      onQuery();
    };
    const showEditModal = (row) => {
      props.editFormItems.forEach((item) => {
        editFormData.value[item.field] = row[item.field] || item.resetValue;
      });
      modalTitle.value = '编辑';
      modalVisible.value = true;
    };
    const showAddModal = () => {
      props.editFormItems.forEach((item) => {
        editFormData.value[item.field] = item.resetValue;
      });
      modalTitle.value = '新增';
      modalVisible.value = true;
    };
    const onSave = (data) => {
      if ('新增' === modalTitle.value) {
        onAdd(data);
      } else if ('编辑' === modalTitle.value) {
        onUpdate(data);
      }
    };
    onMounted(() => {
      onQuery();
    });
    return {
      xGrid,
      gridOptions: computed(() => {
        const operation = {
          title: '操作',
          minWidth: 150,
          slots: { default: 'operation' },
        };
        return { columns: [...props.columns, operation], data: props.data };
      }),
      toolbarConfig: computed(() => {
        const defaultConfig = {
          zoom: true,
          custom: true,
          refresh: {
            query: onQuery,
          },
          print: true,
          export: true,
        };
        return props.tableToolbar || defaultConfig;
      }),
      formConfig,
      editFormConfig,
      editFormData,
      modalVisible,
      modalTitle,
      currentPage,
      pageSize,
      loading,
      onQuery,
      onUpdate,
      onAdd,
      onDel,
      onPageChange,
      showEditModal,
      showAddModal,
      onSave,
    };
  },
};
</script>

<style lang="scss">
.base-table {
  margin: 5px;

  .vxe-form,
  .vxe-toolbar,
  .vxe-pager,
  .vxe-table--header {
    background-color: transparent;
  }

  .vxe-table--body-wrapper {
    background-color: v-bind(backgroundColor);
  }
}
</style>
