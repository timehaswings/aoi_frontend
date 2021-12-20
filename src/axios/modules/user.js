import request from '../axios';

/**
 * 添加用户
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/user',
    method: 'post',
    data,
  });

/**
 * 查询用户
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/user',
    method: 'get',
    params,
  });

/**
 * 修改用户
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/user',
    method: 'put',
    data,
  });

/**
 * 修改用户
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/user',
    method: 'delete',
    params,
  });
