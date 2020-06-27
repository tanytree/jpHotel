/*
 * @Date: 2020-03-23 13:03:20
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-15 15:37:23
 * @FilePath: /cloudAdmin/src/utils/api/login.js
 */
import httpRequest from '@/utils/httpRequest'

/***************登录修改 ***************/



/**登录 */
export const login = (action, params, method = 'post', authLogin = true, contentType = 'form') => {
    return httpRequest({ url: httpRequest.systemUrl(action), method: method || "post", data: httpRequest.adornData(params, authLogin, contentType) }
    )
}




/**获取验证码 */
export const send_verify = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/system/send_verify"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**验证码校验 */
export const verify_check = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/freeuser/verify_check"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**重置密码 */
export const reset_password = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/freeuser/reset_password_phone"), method: "post", data: httpRequest.adornData(params) }
    )
}


/** 企业列表*/

export const enterprise_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/enterprise/enterprise_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**企业认证/编辑 */
export const user_enterprise = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/workuser/user_enterprise"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**字典信息 */
export const public_dict_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/system/public_dict_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**企业类型 */
export const tissue_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/system/tissue_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**行业列表 */
export const industry_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/system/industry_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**行业列表2 */
export const trade_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/system/trade_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
export const user_trade_list = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/trade/user_trade_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**角色认领 */
export const enterprise_role_claim = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/enterprise/enterprise_role_claim"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**法人认领 */
export const legal_certification = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/certification/legal_certification"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**获取公司信息 */
export const get_user_enterprise = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/workuser/get_user_enterprise"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**添加分配角色 */
export const enterprise_edit_role = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("/home/cloud/enterprise/enterprise_edit_role"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**添加员工 */
export const employees_edit = (params) => {
    return httpRequest({ url: httpRequest.systemUrl("home/cloud/employees/employees_edit"), method: "post", data: httpRequest.adornData(params) }
    )
}









