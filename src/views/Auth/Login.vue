<template>
  <div class="login center">
    <div class="login-wrapper">
      <div class="form-title center">用户登录</div>
      <el-form ref="loginForm" :rules="formRules" hide-required-asterisk :model="formData" label-width="50px" @submit.prevent>
        <el-form-item label="账 户" prop="username">
          <el-input v-model="formData.username" @keyup.enter="doLogin" placeholder="请输入账户" status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="formData.password" @keyup.enter="doLogin" placeholder="请输入密码" show-password status-icon size="small">
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
import { ref, reactive, getCurrentInstance } from 'vue';
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
    const loginForm = ref(null);
    const formData = reactive({
      username: '',
      password: '',
    });
    const formRules = reactive({
      username: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 42,
          message: '邮箱长度应在6~42之间',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 32,
          message: '邮箱长度应在6~32之间',
          trigger: 'blur',
        },
      ],
    });
    const goRegister = () => {
      router.push('/register');
    };
    const doLogin = () => {
      loginForm.value.validate((valid) => {
        console.log(valid);
        if (valid) {
          loading.value = true;
          proxy.$api.auth
            .login(formData)
            .then((res) => {
              loading.value = false;
              store.commit('SET_TOKEN', res.token);
              store.commit('SET_USER', res.user);
              router.push('/');
            })
            .catch(() => {
              loading.value = false;
            });
        } else {
          return false;
        }
      });
    };
    return {
      loginForm,
      formData,
      formRules,
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
