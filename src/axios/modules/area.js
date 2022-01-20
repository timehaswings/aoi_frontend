import request from '../axios';

/**
 * 添加地区
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/area',
    method: 'post',
    data,
  });

/**
 * 查询地区
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/area',
    method: 'get',
    params,
  });

/**
 * 修改地区
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/area',
    method: 'put',
    data,
  });

/**
 * 修改地区
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/area',
    method: 'delete',
    params,
  });
