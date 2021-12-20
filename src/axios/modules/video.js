import request from '../axios';

/**
 * 添加视频
 * @param {*} data
 */
export const add = data =>
  request({
    url: '/api/v1/video',
    method: 'post',
    data,
  });

/**
 * 查询视频
 * @param {*} params
 */
export const get = params =>
  request({
    url: '/api/v1/video',
    method: 'get',
    params,
  });

/**
 * 修改视频
 * @param {*} data
 */
export const update = data =>
  request({
    url: '/api/v1/video',
    method: 'put',
    data,
  });

/**
 * 修改视频
 * @param {*} params
 */
export const del = params =>
  request({
    url: '/api/v1/video',
    method: 'delete',
    params,
  });
