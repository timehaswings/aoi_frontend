import request from '../axios';

/**
 * 登录
 * @param {*} data
 */
export const login = (data) =>
  request({
    url: '/api/v1/token/auth',
    method: 'post',
    data,
  });

/**
 * 刷新令牌
 * @param {*} data
 */
export const refresh = (data) =>
  request({
    url: '/api/v1/token/refresh',
    method: 'post',
    data,
  });

/**
 * 验证令牌
 * @param {*} data
 */
export const verify = (data) =>
  request({
    url: '/api/v1/token/verify',
    method: 'post',
    data,
  });

/**
 * 获取验证码
 * @param {*} data
 */
export const captcha = (data) =>
  request({
    url: '/api/v1/captcha',
    method: 'post',
    data,
  });

/**
 * 用户注册
 * @param {*} data
 */
export const register = (data) =>
  request({
    url: '/api/v1/register',
    method: 'post',
    data,
  });
