/*
 * @Date: 2020-07-10 10:31:01
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-10 16:05:26
 * @FilePath: /jiudian/src/utils/api/boss.js
 */ 
import httpRequest from '@/utils/httpRequest'

/**获取门店用户列表 */
export const stores_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/pms/freeuser/stores_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**添加登录用户 */
export const freeuserlogin = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/pms/freeuser/login"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**编辑门店用户 */
export const edit_stores_user = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/pms/workuser/edit_stores_user"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**删除门店用户 */
export const delete_stores_user = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/pms/workuser/delete_stores_user"), method: "post", data: httpRequest.adornData(params) }
    )
}



