import request from '../axios';

/**
 * 添加常量配置
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/config',
    method: 'post',
    data,
  });

/**
 * 查询常量配置
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/config',
    method: 'get',
    params,
  });

/**
 * 修改常量配置
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/config',
    method: 'put',
    data,
  });

/**
 * 修改常量配置
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/config',
    method: 'delete',
    params,
  });
