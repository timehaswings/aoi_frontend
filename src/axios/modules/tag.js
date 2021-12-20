import request from '../axios';

/**
 * 添加标签
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/tags',
    method: 'post',
    data,
  });

/**
 * 查询标签
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/tags',
    method: 'get',
    params,
  });

/**
 * 修改标签
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/tags',
    method: 'put',
    data,
  });

/**
 * 修改标签
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/tags',
    method: 'delete',
    params,
  });
