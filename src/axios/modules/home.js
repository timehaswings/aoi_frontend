import request from '../axios';

/**
 * 获取配置
 * @param {*} params
 */
export const getConfig = params =>
  request({
    url: '/api/v1/home/config',
    method: 'get',
    params,
  });

/**
 * 获取不受限的菜单
 * @param {*} params
 */
export const getPublicMenu = params =>
  request({
    url: '/api/v1/home/public/menu',
    method: 'get',
    params,
  });

/**
 * 获取不受限的菜单
 * @param {*} params
 */
export const getPrivateMenu = params =>
  request({
    url: '/api/v1/home/private/menu',
    method: 'get',
    params,
  });
