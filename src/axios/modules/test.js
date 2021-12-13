import request from "../axios"

/**
 * 测试接口
 * @param {*} data 
 */
export const test = params => request({
  url: "/api/v1/test",
  method: "get",
  params
})


