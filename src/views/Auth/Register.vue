<template>
  <div class="login center">
    <div class="login-wrapper">
      <div class="form-title center">用户注册</div>
      <el-form ref="registerForm" :model="formData" :rules="formRules" hide-required-asterisk size="small" label-width="80px">
        <el-form-item label="账 户" prop="username">
          <el-input v-model="formData.username" placeholder="请输入邮箱/手机" status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" show-password status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" placeholder="请再次输入密码" show-password status-icon size="small">
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchaValue">
          <el-col :span="12"> <el-image class="captcha-img" @click="getCaptcha" :src="captchaSrc" fit="contain"></el-image> </el-col>
          <el-col :span="12"> <el-input v-model="formData.captchaValue" placeholder="输入验证码" size="small" style="margin-left: 15px" /> </el-col>
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
import { Base64 } from 'js-base64';

export default {
  name: 'HomeRegister',
  components: {
    Lock,
    User,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const registerForm = ref(null);
    const loading = ref(false);
    const captchaSrc = ref('data:image/png;base64, ');
    const formData = ref({
      username: '',
      password: '',
      confirmPassword: '',
      captchaValue: '',
      captchaKey: '',
    });
    const formRules = ref({
      username: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: 'blur',
        },
        {
          min: 5,
          max: 40,
          message: '邮箱长度应在5~40之间',
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
      confirmPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: 'blur',
        },
      ],
      captchaValue: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        },
      ],
    });
    const goLogin = () => {
      router.push('/login');
    };
    const doRegister = () => {
      if (formData.value.confirmPassword !== formData.value.password) {
        proxy.$notify.warning({
          title: '出错',
          message: '两次输入的密码不一致',
        });
        return;
      }
      registerForm.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          proxy.$api.auth
            .register(formData.value)
            .then((res) => {
              loading.value = false;
              if (res.success) {
                proxy.$notify.success({
                  title: '成功',
                  message: '用户注册成功',
                });
                store.commit('SET_TOKEN', res.data.token);
                store.commit('SET_USER', res.data.user);
                router.push('/');
              } else {
                proxy.$notify.warning({
                  title: '失败',
                  message: '注册失败：' + res.msg,
                });
              }
            })
            .catch((err) => {
              loading.value = false;
              proxy.$notify.error({
                title: '错误',
                message: '注册失败：' + err.msg,
              });
            });
        } else {
          return false;
        }
      });
    };
    const getCaptcha = () => {
      loading.value = true;
      proxy.$api.auth
        .captcha()
        .then((res) => {
          const u8s = new Uint8Array(res.captchaImage);
          const fu8 = Base64.fromUint8Array(u8s);
          captchaSrc.value = 'data:image/png;base64, ' + Base64.decode(fu8);
          formData.value.captchaKey = res.captchaKey;
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
          proxy.$notify.warning({
            title: '错误',
            message: '获取验证码出错：' + err.msg,
          });
        });
    };
    onMounted(() => {
      getCaptcha();
    });
    return {
      registerForm,
      formData,
      loading,
      captchaSrc,
      formRules,
      goLogin,
      doRegister,
      getCaptcha,
    };
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-image: url('@/assets/img/haijing.jpg');
  background-repeat: no-repeat;
  overflow: hidden;
}

.captcha-img {
  width: 100px;
  height: 32px;
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
