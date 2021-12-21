import request from '../axios';

/**
 * 添加菜单
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/menu',
    method: 'post',
    data,
  });

/**
 * 查询菜单
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/menu',
    method: 'get',
    params,
  });

/**
 * 修改菜单
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/menu',
    method: 'put',
    data,
  });

/**
 * 修改菜单
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/menu',
    method: 'delete',
    params,
  });
