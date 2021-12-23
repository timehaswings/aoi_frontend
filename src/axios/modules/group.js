import request from '../axios';

/**
 * 添加用户组别
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/group',
    method: 'post',
    data,
  });

/**
 * 查询用户组别
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/group',
    method: 'get',
    params,
  });

/**
 * 修改用户组别
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/group',
    method: 'put',
    data,
  });

/**
 * 修改用户组别
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/group',
    method: 'delete',
    params,
  });
