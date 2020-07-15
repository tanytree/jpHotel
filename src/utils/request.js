/*
 * @Date: 2020-05-23 13:03:20
 * @LastEditors: Dana
 * @LastEditTime: 2020-05-23 15:37:23
 * @FilePath: /cloudAdmin/src/utils/request.js
 */
import httpRequest from '@/utils/httpRequest'
export const request = (action, params, method = 'post', authLogin = true, contentType = 'form') => {
  return httpRequest({ url: httpRequest.systemUrl(action), method: method || "post", data: httpRequest.adornData(params, authLogin, contentType) }
  )
}
