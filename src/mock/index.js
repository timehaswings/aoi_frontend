import Mock from 'mockjs';

const start = () => {
  const mockFiles = import.meta.globEager('./modules/*.js'); /** 动态加载模块 */

  // 设置拦截ajax请求的相应时间
  Mock.setup({
    timeout: '600-1000',
  });

  Mock.XHR.prototype.withCredentials = true;

  Object.keys(mockFiles).forEach(key => {
    mockFiles[key].default.forEach(item => {
      Mock.mock(RegExp(item.url + '.*'), item.type, item.response);
    });
  });
};

export default {
  start,
};
