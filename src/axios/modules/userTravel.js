import request from '../axios';

/**
 * 添加用户轨迹
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/user/travel',
    method: 'post',
    data,
  });

/**
 * 查询用户轨迹
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/user/travel',
    method: 'get',
    params,
  });

/**
 * 修改用户轨迹
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/user/travel',
    method: 'put',
    data,
  });

/**
 * 修改用户轨迹
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/user/travel',
    method: 'delete',
    params,
  });
