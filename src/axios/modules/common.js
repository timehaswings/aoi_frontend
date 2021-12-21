import request from '../axios';

/**
 * 删除视频文件
 * @param {*} params
 */
export const delVideo = params =>
  request({
    url: '/api/v1/upload/video',
    method: 'delete',
    params,
  });
