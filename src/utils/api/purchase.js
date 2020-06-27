/*
 * @Date: 2020-03-24 17:31:20
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 17:35:38
 * @FilePath: /cloudAdmin/src/utils/api/purchase.js
 */
import httpRequest from '@/utils/httpRequest'

/***************采购部 ***************/


/**
 * 
 * 订单列表
 */
export const get_plan_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/purchase/plan/get_plan_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**删除计划 */
export const del_plan_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/purchase/plan/del_plan_info"), method: "post", data: httpRequest.adornData(params) }
    )
} 
