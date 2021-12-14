<template>
  <div class="login center">
    <div class="login-wrapper">
      <div class="form-title center">用户登录</div>
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="账 户">
          <el-input v-model="form.account" placeholder="请输入账户" status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input v-model="form.password" placeholder="请输入密码" show-password status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" @click="doLogin" size="small">登 录</el-button>
          <el-button :loading="loading" @click="goRegister" size="small">去注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Lock, User } from '@element-plus/icons';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'HomeLogin',
  components: {
    Lock,
    User,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const goRegister = () => {
      router.push('/register');
    };
    const doLogin = () => {
      console.log('---');
    };
    const form = ref({
      account: '',
      password: '',
    });
    onMounted(() => {
      // proxy.$api.auth.login({ account: 'admin', password: '123456' }).then((res) => {
      //   console.log(res.data);
      // });
      store.commit('SET_NOTIFY', '你好，周杰伦');
      console.log(store.state.common.notifyMsg);
    });
    return {
      form,
      goRegister,
      doLogin,
      loading,
    };
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-image: url('~/assets/img/xinkong.jpg');
  background-repeat: no-repeat;
  overflow: hidden;
}

.login-wrapper {
  background: rgba(198, 226, 255, 0.4);
  padding: 25px 30px 5px 25px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 15px;
  color: #fff;
  font-weight: bold;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep().el-form-item__label {
  color: #fff;
}
</style>
