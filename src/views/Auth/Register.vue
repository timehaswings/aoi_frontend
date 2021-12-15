<template>
  <div class="login center">
    <div class="login-wrapper">
      <div class="form-title center">用户注册</div>
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="账 户">
          <el-input v-model="formData.account" placeholder="请输入邮箱/手机" status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" placeholder="请输入密码" show-password status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formData.confirmPassword" placeholder="请再次输入密码" show-password status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" @click="doRegister" size="small">注 册</el-button>
          <el-button :loading="loading" @click="goLogin" size="small">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Lock, User } from '@element-plus/icons';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HomeLogin',
  components: {
    Lock,
    User,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const loading = ref(false);
    const goLogin = () => {
      router.push('/login');
    };
    const doRegister = () => {
      console.log('---');
    };
    const formData = ref({
      account: '',
      password: '',
      confirmPassword: '',
    });
    onMounted(() => {
      // proxy.$api.auth.login({ account: 'admin', password: '123456' }).then((res) => {
      //   console.log(res.data);
      // });
    });
    return {
      formData,
      loading,
      goLogin,
      doRegister,
    };
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-image: url('~/assets/img/haijing.jpg');
  background-repeat: no-repeat;
  overflow: hidden;
}

.login-wrapper {
  background: rgba(198, 226, 255, 0.8);
  padding: 25px 30px 5px 25px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.form-title {
  margin-bottom: 15px;
  color: #606266;
  font-weight: bold;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep().el-form-item__label {
  color: #606266;
}
</style>
