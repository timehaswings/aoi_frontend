import { ElNotification } from 'element-plus';

const config = {
  showClose: true,
};

const tips = {
  success(msg) {
    ElNotification.success({
      title: '成功',
      message: msg,
      ...config,
    });
  },
  warning(msg) {
    ElNotification.warning({
      title: '提示',
      message: msg,
      ...config,
    });
  },
  error(msg) {
    ElNotification.error({
      title: '错误',
      message: msg,
      ...config,
    });
  },
};

export default app => {
  app.config.globalProperties.$tips = tips;
};
