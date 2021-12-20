import request from '../axios';

/**
 * 添加类别
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/category',
    method: 'post',
    data,
  });

/**
 * 查询类别
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/category',
    method: 'get',
    params,
  });

/**
 * 修改类别
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/category',
    method: 'put',
    data,
  });

/**
 * 修改类别
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/category',
    method: 'delete',
    params,
  });
