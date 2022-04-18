<template>
  <div class="personal">
    <el-row>
      <el-col :span="12">
        <div class="avatar-wrapper">
          <el-avatar :size="120" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </div>
      </el-col>
      <el-col :span="12">
        <el-descriptions title="个人信息" :column="1">
          <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
          <el-descriptions-item label="手机">+86 ***</el-descriptions-item>
          <el-descriptions-item label="加入时间">
            {{ user.dateJoined }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px">
      <el-col :span="24">
        <el-button type="primary" style="width: 80%" round>成为会员</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">观看历史</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">收藏</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 25px">
      <el-col v-for="i in 10" :key="i" :span="4" style="margin: 5px 0">
        <el-card
          shadow="hover"
          :body-style="{
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'flex-direction': 'column',
          }"
        >
          <div>
            <el-avatar>
              <el-icon :size="24"><promotion /></el-icon>
            </el-avatar>
          </div>
          <div style="margin-top: 10px">删除</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">意见反馈</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { Promotion } from '@element-plus/icons';

export default {
  name: 'HomePersonal',
  components: { Promotion },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const viewHistory = ref([]);
    const favorList = ref([]);
    const user = computed(() => {
      return store.state.auth.user;
    });
    const getViewHistory = () => {
      const params = {
        userId: user.value.id,
        operation: 'come',
        pageSize: 10,
        pageNo: 1,
      };
      proxy.$api.userTravel
        .history(params)
        .then(res => {
          if (res.success) {
            viewHistory.value = res.data.rows;
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
    };
    const getFavorList = () => {
      const params = {
        userId: user.value.id,
        operation: 'favor',
        pageSize: 10,
        pageNo: 1,
      };
      proxy.$api.userTravel
        .history(params)
        .then(res => {
          if (res.success) {
            favorList.value = res.data.rows;
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
    };
    onMounted(() => {
      getViewHistory();
      getFavorList();
    });
    return {
      user,
    };
  },
};
</script>

<style scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
