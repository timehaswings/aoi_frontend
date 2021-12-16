import request from '../axios';

/**
 * 添加评论
 * @param {*} data
 */
export const add = (data) =>
  request({
    url: '/api/v1/comment',
    method: 'post',
    data,
  });

/**
 * 查询评论
 * @param {*} params
 */
export const get = (params) =>
  request({
    url: '/api/v1/comment',
    method: 'get',
    params,
  });

/**
 * 修改评论
 * @param {*} data
 */
export const update = (data) =>
  request({
    url: '/api/v1/comment',
    method: 'put',
    data,
  });

/**
 * 修改评论
 * @param {*} params
 */
export const del = (params) =>
  request({
    url: '/api/v1/comment',
    method: 'delete',
    params,
  });
