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
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <div class="tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text">查看</el-button>
                  <el-button type="text">添加</el-button>
                  <el-button type="text">删除</el-button>
                </span>
              </div>
            </template>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="menu-wrapper" shadow="never" :body-style="{ padding: '10px' }">
          <el-descriptions :title="menu.name" :column="1" direction="vertical">
            <template #extra>
              <el-button type="primary" size="small">编辑</el-button>
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
    const menu = ref({});
    const tree = ref(null);
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
    };
  },
};
</script>

<style scoped>
.backend-menu {
}

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
}
</style>
