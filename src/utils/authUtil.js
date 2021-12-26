import store from '../store';

export async function login(proxy, userData) {
  // 登录
  await proxy.$api.auth
    .login(userData)
    .then(res => {})
    .catch(() => {});
  // 获取菜单信息
  // 获取常量配置
}
