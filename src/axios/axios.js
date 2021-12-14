import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 180000,
  withCredentials: true,
  responseType: 'json',
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    const token = 'abcd';
    // 2. 带上token
    if (token) {
      config.headers.Authorization = 'Token ' + token;
    }
    return config;
  },
  (error) => {
    // 请求错误时
    // 1. 判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      error.msg = 'timeout请求超时';
    } else {
      error.msg = '无法访问互联网';
    }
    // 2. 需要重定向到错误页面
    const errorInfo = error.response;
    if (errorInfo) {
      error = errorInfo.data;
      const errorStatus = errorInfo.status; // 500 ...
      // router.push({
      //     path: `/500/${errorStatus}`
      // })
    }
    return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    let data;
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data == undefined && response.request && response.request.responseText) {
      data = JSON.parse(response.request.responseText);
    } else {
      data = response.data;
    }
    if (Object.prototype.toString.call(data) == '[object Blob]') {
      // 如果为下载请求响应，则返回整个响应，方便通过响应头等获取更多请求结果处理所需要的信息
      return response;
    } else {
      return data;
    }
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.msg = `请求错误: ${err.response.data.msg}`;
          break;
        case 401:
          err.msg = '未授权，请登录';
          break;
        case 403:
          err.msg = `禁止访问`;
          break;
        case 404:
          err.msg = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.msg = '请求超时';
          break;
        case 500:
          err.msg = `服务器内部错误 ${err.response.data.msg ? err.response.data.msg : ''}`;
          break;
        case 501:
          err.msg = '服务未实现';
          break;
        case 502:
          err.msg = '网关错误';
          break;
        case 503:
          err.msg = '服务不可用';
          break;
        case 504:
          err.msg = '网关超时';
          break;
        case 505:
          err.msg = 'HTTP版本不受支持';
          break;
        default:
      }
    }
    return Promise.reject(err); // 返回接口返回的错误信息
  }
);

const request = (options) => {
  return new Promise((resolve, reject) => {
    // 请求处理
    options.url = toRestUrl(options.url, options.params ? options.params : options.data);
    service(options)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        // 判断是否时Token过期导致// “TokenExpired”为后台自定义Token过期错误消息
        // “认证令牌无效。”为框架本身定义的，Token被删除后返回的错误消息
        if (
          error &&
          error.response &&
          error.response.status == 401 &&
          (error.response.data.detail == 'TokenExpired' || error.response.data.detail == '认证令牌无效。')
        ) {
          logout();
          return;
        }
        if (error && error.response && error.response.status == 401 && error.response.data.msg == 'RefreshTokenExpired') {
          logout();
          return;
        }
        if (error && error.response && error.response.status == 400 && error.response.data.msg == 'RefreshTokenNotExists') {
          logout();
          return;
        }
        reject(error);
      });
  });
};

/**
 * 退出登录
 */
const logout = () => {};

/**
 * url转restful（替换url中的参数）
 * @param {*} url
 * @param {*} params
 */
const toRestUrl = (url, params) => {
  let paramArr = url.match(/\{.*?\}/gi);
  if (paramArr && paramArr.length) {
    if (Object.prototype.toString.call(params) === '[object FormData]') {
      // formData数据
      paramArr.forEach((el) => {
        let key = el.substring(1, el.length - 1); // 去掉左右 { } 边界符
        url = url.replace(el, params.get(key));
      });
    } else {
      paramArr.forEach((el) => {
        let key = el.substring(1, el.length - 1);
        url = url.replace(el, params[key]);
      });
    }
  }
  return url;
};

export default request;
