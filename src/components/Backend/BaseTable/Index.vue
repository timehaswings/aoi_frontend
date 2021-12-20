<template>
  <div class="base-table">
    <vxe-grid
      ref="xGrid"
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
        <el-empty description="没有更多数据了"></el-empty>
      </template>
      <template #query_operation>
        <vxe-button v-if="queryFormItems.length" status="primary" icon="vxe-icon--search" @click="onQuery">
          {{ $t('table.query') }}
        </vxe-button>
        <vxe-button status="warning" icon="el-icon-refresh-left" @click="resetQuery">
          {{ $t('table.reset') }}
        </vxe-button>
        <vxe-button status="success" icon="vxe-icon--plus" @click="showAddModal">{{ $t('table.add') }}</vxe-button>
      </template>
      <template #operation="{ row }">
        <vxe-button type="text" status="info" icon="el-icon-edit" @click="showEditModal(row)">
          {{ $t('table.edit') }}
        </vxe-button>
        <vxe-button type="text" status="danger" icon="el-icon-delete" @click="onDel(row)">
          {{ $t('table.del') }}
        </vxe-button>
      </template>
      <template v-for="(index, name) in $slots" :key="index" #[name]="{ row }">
        <slot v-if="!['modal_form'].includes(name)" :name="name" :row="row" />
      </template>
      <template #pager>
        <vxe-pager
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          :total="total"
          @page-change="onPageChange"
        ></vxe-pager>
      </template>
    </vxe-grid>
    <vxe-modal v-model="modalVisible" :title="modalTitle" :width="modalWidth" esc-closable show-zoom resize>
      <slot name="modal_form" :data="editFormData" :modalVisible="modalVisible">
        <vxe-form
          :title-width="editFormTitleWidth"
          :rules="editFormRules"
          title-align="right"
          title-colon
          :data="editFormData"
          :items="editFormConfig"
        >
          <template #modal_operation="{ data }">
            <vxe-button size="small" status="primary" @click="onSave(data)">{{ $t('table.save') }}</vxe-button>
            <vxe-button size="small" @click="modalVisible = false">{{ $t('table.close') }}</vxe-button>
          </template>
        </vxe-form>
      </slot>
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
      // default: window.innerHeight - 100,
      default: 10 * 42 + 176,
    },
    modalWidth: {
      type: Number,
      default: null,
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
    editFormRules: {
      type: Object,
      default: () => {
        return {};
      },
    },
    editFormTitleWidth: {
      type: [Number, String],
      default: 60,
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
    props.queryFormItems.forEach(item => {
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
    const editFormConfig = ref([
      ...props.editFormItems,
      { field: '', align: 'right', span: 24, slots: { default: 'modal_operation' } },
    ]);
    const onQuery = async () => {
      if (props.queryFunction) {
        loading.value = true;
        const params = { ...formConfig.value.data, pageSize: pageSize.value, pageNo: currentPage.value };
        await props.queryFunction(params);
        loading.value = false;
      }
    };
    const onAdd = async data => {
      if (props.queryFunction && props.addFunction) {
        loading.value = true;
        await props.addFunction({ ...data });
        const params = { ...formConfig.value.data, pageSize: pageSize.value, pageNo: currentPage.value };
        await props.queryFunction(params);
        modalVisible.value = false;
        loading.value = false;
      }
    };
    const onUpdate = async data => {
      if (props.queryFunction && props.updateFunction) {
        loading.value = true;
        await props.updateFunction({ ...data });
        const params = { ...formConfig.value.data, pageSize: pageSize.value, pageNo: currentPage.value };
        await props.queryFunction(params);
        modalVisible.value = false;
        loading.value = false;
      }
    };
    const onDel = async row => {
      if (props.queryFunction && props.delFunction) {
        const result = await VXETable.modal.confirm('您确定要删除吗？');
        if ('confirm' == result) {
          loading.value = true;
          await props.delFunction({ ...row });
          const params = { ...formConfig.value.data, pageSize: pageSize.value, pageNo: currentPage.value };
          await props.queryFunction(params);
          loading.value = false;
        }
      }
    };
    const resetQuery = () => {
      props.queryFormItems.forEach(item => {
        formData[item.field] = item.resetValue;
      });
      formConfig.value.data = formData;
      onQuery();
    };
    const onPageChange = ({ currentPage, pageSize }) => {
      pageSize.value = pageSize;
      currentPage.value = currentPage;
      onQuery();
    };
    const showEditModal = row => {
      const tmp = {};
      props.editFormItems.forEach(item => {
        tmp[item.field] = row[item.field];
      });
      editFormData.value = { ...row, ...tmp };
      modalTitle.value = '编辑';
      modalVisible.value = true;
    };
    const showAddModal = () => {
      props.editFormItems.forEach(item => {
        editFormData.value[item.field] = item.resetValue;
      });
      modalTitle.value = '新增';
      modalVisible.value = true;
    };
    const onSave = data => {
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
          width: 160,
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
      resetQuery,
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
