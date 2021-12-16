import request from '../axios';

/**
 * 添加站点
 * @param {*} data
 */
export const add = (data) =>
  request({
    url: '/api/v1/site',
    method: 'post',
    data,
  });

/**
 * 查询站点
 * @param {*} params
 */
export const get = (params) =>
  request({
    url: '/api/v1/site',
    method: 'get',
    params,
  });

/**
 * 修改站点
 * @param {*} data
 */
export const update = (data) =>
  request({
    url: '/api/v1/site',
    method: 'put',
    data,
  });

/**
 * 修改站点
 * @param {*} params
 */
export const del = (params) =>
  request({
    url: '/api/v1/site',
    method: 'delete',
    params,
  });
