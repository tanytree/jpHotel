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
/**订单详情 */
export const get_order_co_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order/get_order_co_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**订单发货 */
export const add_tracking = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order/add_tracking"), method: "post", data: httpRequest.adornData(params) }
    )
}

/** 删除订单*/
export const del_order_co = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order/del_order_co"), method: "post", data: httpRequest.adornData(params) }
    )
}

/** 查询物流*/
export const get_order_express = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/zdapp/order/get_order_express"), method: "post", data: httpRequest.adornData(params) }
    )
}


/** 退货订单*/

export const get_refund_total_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order_refund/get_refund_total_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/** 订单详情*/
export const get_refund_all_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order_refund/get_refund_all_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**卖家处理 */
export const agree_refund_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order_refund/agree_refund_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**卖家收货 */
export const co_refund_take = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order_refund/co_refund_take"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**卖家发货 */
export const add_refund_tracking = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/order_refund/add_refund_tracking"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**商机客户 */
export const get_sale_customer_List = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/customer/get_sale_customer_List"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**供应商详情 */
export const get_customer_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/customer/get_customer_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**编辑供应商 */
export const addOredit_customer = (params) => {
    let url = "/sale/customer/add_customer";
    if (params.id) {
        url = "/sale/customer/edit_customer";
    }
    return httpRequest({ url: httpRequest.adornUrl(url), method: "post", data: httpRequest.adornData(params) }
    )
}

/**公司查询 */
export const get_company_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/company/get_company_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**建立关联 */
export const add_customer_co = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/customer/add_customer_co"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**行业类型 */

export const get_classify_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/company/get_classify_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**合同详情 */
export const get_contract_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/purchase/contract/get_contract_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**要素详情 */

export const get_contract_file = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/purchase/contract_info/get_contract_info"), method: "post", data: httpRequest.adornData(params) }
    )
}



/**移除客户 */
export const del_customer_users = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/customer/del_customer_users"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**合同管理 */
export const get_contract_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/purchase/contract/get_contract_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**受邀合同 */

export const get_list_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("//purchase/detailed_list/get_list_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**报价列表 */

export const get_offer_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/offer/get_offer_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**收藏报价 */
export const get_collect_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/enquiry/get_collect_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**删除报价 */
export const del_collect_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/sale/enquiry/del_collect_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

