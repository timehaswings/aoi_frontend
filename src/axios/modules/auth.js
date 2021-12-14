import request from '../axios';

/**
 * 登录
 * @param {*} data
 */
export const login = (data) =>
  request({
    url: '/api/v1/login',
    method: 'post',
    data,
  });
