import request from '../axios';

/**
 * 获取菜单
 * @param {*} params
 */
export const getMenu = params =>
  request({
    url: '/api/v1/home/menu',
    method: 'get',
    params,
  });
