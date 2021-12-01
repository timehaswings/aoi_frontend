<template>
  <div class="base-table">
    <vxe-grid
      ref="xGrid"
      resizable
      round
      auto-resize
      header-align="center"
      align="center"
      :size="size"
      border
      highlight-hover-row
      :height="height"
      :form-config="formConfig"
      :toolbar-config="tableToolbar"
      v-bind="gridOptions"
    >
      <template #empty>
        <span style="color: red">
          <p>没有更多数据了！</p>
        </span>
      </template>
      <template #operation="{ row }">
        <vxe-button type="text" status="primary" @click="showEditModal(row)" icon="vxe-icon--edit-outline">编辑</vxe-button>
        <vxe-button type="text" status="danger" @click="onDel(row)" icon="el-icon-document-delete">删除</vxe-button>
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
    <vxe-modal v-model="modalVisible" :title="modalTitle" width="480" height="270" esc-closable show-zoom resize>
      <vxe-form :data="editForm" :items="editFormItems">
        <template #modal_operation="{ data }">
          <vxe-button size="small" status="primary">保 存</vxe-button>
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
      type: Number,
      default: 500,
    },
    size: {
      type: String,
      default: 'size',
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
    editFormData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    editFormItems: {
      type: Array,
      default: () => {
        return [{ field: '', span: 24, slots: { default: 'modal_operation' } }];
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [{ title: '测试', field: 'test' }];
      },
    },
    data: {
      type: Array,
      default: () => {
        return [{ test: 'assd' }];
      },
    },
    tableToolbar: {
      type: Object,
      default: () => {
        return {
          zoom: true,
          custom: true,
        };
      },
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
    const pageSize = ref(15);
    const total = ref(0);
    const loading = ref(false);
    const modalVisible = ref(false);
    const modalTitle = ref('新增');
    const editForm = ref({});
    const onQuery = async () => {
      if (props.queryFunction) {
        loading.value = true;
        await props.queryFunction({});
        loading.value = false;
      }
    };
    const onAdd = async () => {
      if (props.queryFunction && props.addFunction) {
        loading.value = true;
        await props.addFunction({});
        await props.queryFunction(formConfig.data);
        loading.value = false;
      }
    };
    const onUpdate = async () => {
      if (props.queryFunction && props.updateFunction) {
        loading.value = true;
        await props.updateFunction({});
        await props.queryFunction(formConfig.data);
        loading.value = false;
      }
    };
    const onDel = async (row) => {
      if (props.queryFunction && props.delFunction) {
        const result = await VXETable.modal.confirm('您确定要删除吗？');
        if ('confirm' == result) {
          loading.value = true;
          await props.delFunction(row);
          await props.queryFunction({});
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
      for (let key in editForm) {
        editForm[key] = row[key] || editForm[key];
      }
      modalTitle.value = '编辑';
      modalVisible.value = true;
    };
    const showAddModal = () => {
      editForm = { ...props.editFormData };
      modalTitle.value = '新增';
      modalVisible.value = true;
    };
    const formConfig = computed(() => {
      const formData = {};
      props.queryFormItems.forEach((item) => {
        formData[item.field] = item.resetValue;
      });
      return {
        span: 24,
        titleColon: true,
        className: 'table-query-form',
        data: formData,
        items: props.queryFormItems,
      };
    });
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
      formConfig,
      editForm,
      modalVisible,
      modalTitle,
      currentPage,
      pageSize,
      total,
      loading,
      onQuery,
      onUpdate,
      onAdd,
      onDel,
      onPageChange,
      showEditModal,
      showAddModal,
    };
  },
};
</script>

<style lang="scss">
.base-table {
  margin: 5px 10px;

  .vxe-form,
  .vxe-toolbar,
  .vxe-table--body-wrapper,
  .vxe-pager,
  .vxe-table--header {
    background-color: v-bind(backgroundColor);
  }
}
</style>
