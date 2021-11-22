<template>
  <div class="home-login center">
    <div class="login-wrapper">
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
          <el-button size="small">登 录</el-button>
          <el-button size="small">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Lock, User } from '@element-plus/icons';

export default {
  name: 'HomeLogin',
  components: {
    Lock,
    User,
  },
  data() {
    return {
      form: {
        account: '',
        password: '',
      },
    };
  },
};
</script>

<style scoped>
.home-login {
  height: 100%;
  background-size: 100%;
  background-image: url('~@/assets/img/xinkong.jpg');
  background-repeat: no-repeat;
  overflow: hidden;
}

.login-wrapper {
  background: rgba(198, 226, 255, 0.4);
  position: absolute;
  padding: 25px 30px 5px 25px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
