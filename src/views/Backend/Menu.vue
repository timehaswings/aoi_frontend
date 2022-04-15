<template>
  <div class="backend-menu">
    <el-row v-loading="menuLoading" :gutter="10">
      <el-col :span="8">
        <el-card class="menu-wrapper" shadow="never" :body-style="{ padding: '10px' }">
          <el-tree
            ref="tree"
            node-key="id"
            highlight-current
            :default-expanded-keys="[1, 2, 3]"
            :indent="18"
            :data="treeOptions.data"
            :props="treeOptions.props"
          >
            <template #default="{ node, data }">
              <div class="tree-node">
                <span>
                  <i v-if="data.icon && data.icon.startsWith('el-icon-')" :class="data.icon"></i>
                  <fa-icon v-if="data.icon && data.icon.startsWith('fa')" :icon="data.icon.split(/\s+/)"></fa-icon>
                  <span style="margin-left: 5px">{{ node.label }}</span>
                </span>
                <span class="node-operation">
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
        <el-card class="menu-wrapper" shadow="never" :body-style="{ padding: '10px 20px' }">
          <el-descriptions v-if="menu !== null" :title="menu.name" :column="1" border>
            <template #extra>
              <el-button class="hvr-radial-out" type="primary" size="small" @click="showEditModal(menu)">
                编辑
              </el-button>
              <el-button class="hvr-radial-out" type="primary" size="small" @click="menu = null">关闭</el-button>
            </template>
            <el-descriptions-item label="名称">{{ menu.name }}</el-descriptions-item>
            <el-descriptions-item label="URL">{{ menu.url }}</el-descriptions-item>
            <el-descriptions-item label="组件">{{ menu.component }}</el-descriptions-item>
            <el-descriptions-item label="图标">{{ menu.icon }}</el-descriptions-item>
            <el-descriptions-item label="类型">
              <el-tag size="small">{{ typeMapper[menu.type] }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否为导航">
              <el-tag size="small" type="warning">{{ menu.isNav ? '是' : '否' }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否展示">
              <el-tag size="small" type="success">{{ menu.isShow ? '展示' : '隐藏' }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否启用">
              <el-tag size="small" type="info">{{ activeMapper[menu.isActive] }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="排序">{{ menu.sort }}</el-descriptions-item>
            <el-descriptions-item label="创建人">{{ menu.createName }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ menu.createTime }}</el-descriptions-item>
          </el-descriptions>
          <div v-else style="margin-top: 100px">
            <el-empty description="点击右侧菜单树可查看详情"></el-empty>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <vxe-modal
      v-model="modalOptions.modalVisible"
      :title="modalOptions.title"
      width="720"
      height="320"
      show-zoom
      resize
      transfer
    >
      <template #default>
        <vxe-form
          ref="xForm"
          title-colon
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
                  <vxe-option :value="true" label="是"></vxe-option>
                  <vxe-option :value="false" label="否"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="导航" field="isNav" span="24">
              <template #default="{ data }">
                <vxe-select v-model="data.isNav" placeholder="请选择是否为导航">
                  <vxe-option :value="true" label="是"></vxe-option>
                  <vxe-option :value="false" label="否"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="展示" field="isShow" span="24">
              <template #default="{ data }">
                <vxe-select v-model="data.isShow" placeholder="请选择是否展示">
                  <vxe-option :value="true" label="展示"></vxe-option>
                  <vxe-option :value="false" label="隐藏"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="排序" field="sort" span="24">
              <template #default="{ data }">
                <vxe-input v-model="data.sort" type="number" placeholder="请输入菜单排序"></vxe-input>
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
              <vxe-button
                v-show="modalOptions.operation === 'edit'"
                status="primary"
                content="修改"
                @click="update(data)"
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
    const menuLoading = ref(false);
    const menu = ref(null);
    const tree = ref(null);
    const typeMapper = {
      catalogue: '目录',
      router: '路由',
    };
    const activeMapper = {
      true: '已激活',
      false: '未激活',
    };
    const modalOptions = reactive({
      title: '新增菜单',
      operation: 'add',
      modalVisible: false,
      nodeData: null,
    });
    const defaultData = {
      type: 'router',
      isActive: true,
      isNav: true,
      isShow: true,
      sort: 100,
    };
    const formOptions = reactive({
      loading: false,
      data: { ...defaultData },
      rules: {},
    });
    const showAddModal = data => {
      modalOptions.modalVisible = true;
      modalOptions.title = '新增菜单';
      modalOptions.operation = 'add';
      modalOptions.nodeData = data;
      formOptions.data = { ...defaultData };
    };
    const showEditModal = data => {
      modalOptions.modalVisible = true;
      modalOptions.title = '编辑菜单';
      modalOptions.operation = 'edit';
      modalOptions.nodeData = null;
      formOptions.data = data;
    };
    const query = () => {
      menuLoading.value = true;
      proxy.$api.menu
        .get()
        .then(res => {
          menuLoading.value = false;
          if (res.success) {
            treeOptions.data = res.data;
          } else {
            proxy.$tips.warning('获取菜单失败：' + res.msg);
          }
        })
        .catch(err => {
          menuLoading.value = false;
          proxy.$tips.error('获取菜单失败：' + err.msg);
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
            proxy.$tips.success(res.msg);
          } else {
            proxy.$tips.warning('添加菜单失败：' + res.msg);
          }
        })
        .catch(err => {
          proxy.$notify.error({
            title: '错误',
            message: '获取菜单失败：' + err.msg,
          });
        });
    };
    const update = data => {
      proxy.$api.menu
        .update(data)
        .then(res => {
          if (res.success) {
            query();
            modalOptions.modalVisible = false;
            proxy.$tips.success(res.msg);
          } else {
            proxy.$tips.warning('修改菜单失败：' + res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error('修改菜单失败：' + err.msg);
        });
    };
    const del = id => {
      proxy.$api.menu
        .del({ id })
        .then(res => {
          if (res.success) {
            query();
            proxy.$tips.success(res.msg);
          } else {
            proxy.$tips.warning('删除菜单失败：' + res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error('删除菜单失败：' + err.msg);
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
      menuLoading,
      menu,
      tree,
      handleNodeClick,
      showAddModal,
      showEditModal,
      add,
      update,
      del,
      modalOptions,
      formOptions,
      typeMapper,
      activeMapper,
    };
  },
};
</script>

<style scoped>
.menu-wrapper {
  height: calc(100vh - 134px);
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

.tree-node:hover .node-operation {
  visibility: visible;
}

.node-operation {
  visibility: hidden;
}

.el-tree {
  overflow: auto;
  height: 100%;
}

.el-tree::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

.el-tree::-webkit-scrollbar-track,
.el-tree::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

.el-tree::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

.el-tree::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

.el-tree::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
