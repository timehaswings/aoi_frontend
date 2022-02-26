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

/**
 * 获取视频
 * @param {*} params
 */
export const getVideo = params =>
  request({
    url: '/api/v1/home/video',
    method: 'get',
    params,
  });

/**
 * 获取分类
 * @param {*} params
 */
export const getCategory = params =>
  request({
    url: '/api/v1/home/category',
    method: 'get',
    params,
  });

/**
 * 获取标签
 * @param {*} params
 */
export const getTag = params =>
  request({
    url: '/api/v1/home/tag',
    method: 'get',
    params,
  });

/**
 * 获取地区
 * @param {*} params
 */
export const getArea = params =>
  request({
    url: '/api/v1/home/area',
    method: 'get',
    params,
  });

/**
 * 获取首页轮播数据
 * @param {*} params
 */
export const getIndexCarousel = params =>
  request({
    url: '/api/v1/home/index/carousel',
    method: 'get',
    params,
  });

/**
 * 获取首页分类数据
 * @param {*} params
 */
export const getIndexCategory = params =>
  request({
    url: '/api/v1/home/index/category',
    method: 'get',
    params,
  });

/**
 * 获取视频推荐
 * @param {*} params
 */
export const getRecommendVideo = params =>
  request({
    url: '/api/v1/home/video/recommend',
    method: 'get',
    params,
  });
