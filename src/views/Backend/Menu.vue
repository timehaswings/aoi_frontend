<template>
  <div class="backend-menu">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="menu-wrapper" shadow="never" :body-style="{ padding: '10px' }">
          <el-tree
            ref="tree"
            node-key="id"
            highlight-current
            :indent="18"
            :data="treeOptions.data"
            :props="treeOptions.props"
          >
            <template #default="{ node, data }">
              <div class="tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" @click.stop="handleNodeClick(data)">查看</el-button>
                  <el-button type="text" @click.stop="showAddModal(data)">添加</el-button>
                  <el-button type="text" @click.stop="del(data.id)">删除</el-button>
                </span>
              </div>
            </template>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="menu-wrapper" shadow="never" :body-style="{ padding: '10px' }">
          <el-descriptions v-if="menu !== null" :title="menu.name" :column="1" direction="vertical">
            <template #extra>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="primary" size="small" @click="menu = null">关闭</el-button>
            </template>
            <el-descriptions-item label="ID">{{ menu.id }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ menu.url }}</el-descriptions-item>
            <el-descriptions-item label="组件">{{ menu.component }}</el-descriptions-item>
            <el-descriptions-item label="图标">{{ menu.icon }}</el-descriptions-item>
            <el-descriptions-item label="类型">
              <el-tag size="small">{{ menu.type }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否启用">
              <el-tag size="small">{{ menu.isActive }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="排序">{{ menu.sort }}</el-descriptions-item>
            <el-descriptions-item label="创建人">{{ menu.createName }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ menu.createTime }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <vxe-modal
      v-model="modalOptions.modalVisible"
      :title="modalOptions.title"
      width="720"
      height="360"
      show-zoom
      resize
      transfer
    >
      <template #default>
        <vxe-form
          title-colon
          ref="xForm"
          title-align="right"
          title-width="80"
          :data="formOptions.data"
          :rules="formOptions.rules"
          :loading="formOptions.loading"
        >
          <vxe-form-gather span="12">
            <vxe-form-item title="名称" span="24">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入菜单名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="URL" field="url" span="24">
              <template #default="{ data }">
                <vxe-input v-model="data.url" placeholder="请输入菜单地址" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="图标" field="icon" span="24">
              <template #default="{ data }">
                <vxe-input v-model="data.icon" placeholder="请输入菜单图标" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="组件" field="component" span="24">
              <template #default="{ data }">
                <vxe-input v-model="data.component" placeholder="请输入前端组件" clearable></vxe-input>
              </template>
            </vxe-form-item>
          </vxe-form-gather>
          <vxe-form-gather span="12">
            <vxe-form-item title="类型" field="type" span="24">
              <template #default="{ data }">
                <vxe-select v-model="data.type" placeholder="请选择类型">
                  <vxe-option value="catalogue" label="目录"></vxe-option>
                  <vxe-option value="router" label="路由"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="激活" field="isActive" span="24">
              <template #default="{ data }">
                <vxe-select v-model="data.isActive" placeholder="请选择是否激活">
                  <vxe-option :value="1" label="是"></vxe-option>
                  <vxe-option :value="0" label="否"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="排序" field="sort" span="24">
              <template #default="{ data }">
                <vxe-input type="number" v-model="data.sort" placeholder="请输入菜单排序"></vxe-input>
              </template>
            </vxe-form-item>
          </vxe-form-gather>
          <vxe-form-item align="right" span="24">
            <template #default="{ data }">
              <vxe-button
                v-show="modalOptions.operation === 'add'"
                status="primary"
                content="添加"
                @click="add(data)"
              ></vxe-button>
              <vxe-button content="关闭" @click="modalOptions.modalVisible = false"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

export default {
  name: 'BackendMenu',
  setup() {
    const { proxy } = getCurrentInstance();
    const treeOptions = reactive({
      data: [],
      props: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
    });
    const menu = ref(null);
    const tree = ref(null);
    const modalOptions = reactive({
      title: '新增菜单',
      operation: 'add',
      modalVisible: false,
      nodeData: null,
    });
    const formOptions = reactive({
      loading: false,
      data: {
        type: 'router',
        isActive: 1,
        sort: 100,
      },
      rules: {},
    });
    const showAddModal = data => {
      modalOptions.modalVisible = true;
      modalOptions.title = '新增菜单';
      modalOptions.operation = 'add';
      modalOptions.nodeData = data;
    };
    const query = () => {
      proxy.$api.menu
        .get()
        .then(res => {
          if (res.success) {
            treeOptions.data = res.data;
          } else {
            proxy.$notify.warning({
              title: '失败',
              message: '获取标签失败：' + res.msg,
            });
          }
        })
        .catch(err => {
          proxy.$notify.error({
            title: '错误',
            message: '获取标签失败：' + err.msg,
          });
        });
    };
    const add = data => {
      data.parentId = modalOptions.nodeData.id;
      proxy.$api.menu
        .add(data)
        .then(res => {
          if (res.success) {
            query();
            modalOptions.modalVisible = false;
            proxy.$notify.warning({
              title: '成功',
              message: '添加菜单成功',
            });
          } else {
            proxy.$notify.warning({
              title: '失败',
              message: '获取标签失败：' + res.msg,
            });
          }
        })
        .catch(err => {
          proxy.$notify.error({
            title: '错误',
            message: '获取标签失败：' + err.msg,
          });
        });
    };
    const del = id => {
      proxy.$api.menu
        .del({ id })
        .then(res => {
          if (res.success) {
            query();
            proxy.$notify.success({
              title: '成功',
              message: '删除菜单成功',
            });
          } else {
            proxy.$notify.warning({
              title: '失败',
              message: '获取标签失败：' + res.msg,
            });
          }
        })
        .catch(err => {
          proxy.$notify.error({
            title: '错误',
            message: '获取标签失败：' + err.msg,
          });
        });
    };
    const handleNodeClick = (data, node) => {
      menu.value = data;
    };
    onMounted(() => {
      query();
    });
    return {
      treeOptions,
      menu,
      tree,
      handleNodeClick,
      showAddModal,
      add,
      del,
      modalOptions,
      formOptions,
    };
  },
};
</script>

<style scoped>
.menu-wrapper {
  height: 100vh;
}

.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  height: 36px;
  line-height: 36px;
}
</style>
