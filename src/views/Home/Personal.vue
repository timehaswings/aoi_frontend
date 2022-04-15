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
    <el-row style="margin-top: 25px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">收藏</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
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
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomePersonal',
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.state.auth.user;
    });
    onMounted(() => {
      console.log(user);
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
