/*
 * @Date: 2020-03-10 14:17:13
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 16:06:09
 * @FilePath: /cloudAdmin/src/utils/api/sale.js
 */
import httpRequest from '@/utils/httpRequest'

/***************销售部 ***************/


/**
 *
 * 订单列表
 */
export const get_order_co_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order/get_order_co_list"), method: "post", data: httpRequest.adornData(params) }
    )
}


export const getSysTime = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/pms/system/system_time"), method: "post", data: httpRequest.adornData(params) }
    )
}
