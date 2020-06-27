/*
 * @Date: 2020-03-20 17:11:43
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-16 16:00:02
 * @FilePath: /cloudAdmin/src/utils/api/finance.js
 */
import httpRequest from '@/utils/httpRequest'

/***************财务部 ***************/


/**
 * 
 * 订单列表
 */
export const get_finance_count = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("finance/count/get_finance_count"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**保证金余额 */
export const get_security_sum = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/security/get_security_sum"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**资金金余额 */
export const get_balance = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/company/get_balance"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**余额账单 */
export const get_consume_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/company/get_consume_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**删除记录 */
export const del_consume_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/company/del_consume_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**充值 */
export const get_recharge_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/recharge/get_recharge_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

export const pay_weixinpc = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/pay/pay_weixinpc"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**提现 */
export const withdraw = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/withdraw/withdraw"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**提现列表 */
export const get_withdraw_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/users_withdraw/get_withdraw_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**提现详情 */
export const get_withdraw_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/users_withdraw/get_withdraw_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**提现审核 */
export const withdrawapply = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/users_withdraw/withdraw"), method: "post", data: httpRequest.adornData(params) }
    )
}

 
