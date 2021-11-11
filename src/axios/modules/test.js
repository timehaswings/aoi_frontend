import axios from "../axios"

/**
 * 测试接口
 * @param {*} data 
 */
export const test = params => {
  return axios.request({
    url: "/api/v1/test",
    method: "get",
    params
  })
}
