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
