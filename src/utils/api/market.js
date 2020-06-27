import httpRequest from '@/utils/httpRequest'

/***************营销部 ***************/


/**
 * 
 * 获取组织架构
 */
export const getOrgList = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/orgList"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**动态管理 */
export const get_dynamic_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/dynamic/get_dynamic_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**商品列表 */
export const get_goods_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/get_goods_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**商品详情接口 */
export const get_goods_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/get_goods_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**上下架 */
export const edit_goods_status = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/edit_goods_status"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**删除商品 */
export const del_goods_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/del_goods_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**获取产品类型列表 */
export const get_category_list_all = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/get_category_list_all"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**添加商品 */

export const add_goods_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/add_goods_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**编辑商品 */

export const edit_goods_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/edit_goods_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**评价列表 */

export const get_evaluation_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/evaluation/get_evaluation_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**获取所有分类列表 */
export const get_category_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/get_category_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**添加分类 */

export const add_category_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/add_category_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**编辑分类 */
export const edit_category_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/edit_category_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**删除分类 */
export const del_category_co = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/goods/del_category_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**广告管理 */
/**投放列表 */
export const get_advert_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/advert/get_advert_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**投放详情 */
export const get_advert_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/advert/get_advert_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**取消已投放接口 */

export const cancel_advert_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/advert/cancel_advert_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/** 村列表接口*/
export const get_group_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/advert/get_group_list"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**村广告位 */
export const get_group_position = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/advert/get_group_position"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**加入投放车接口 */
export const add_advert = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/advert/add_advert"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**入住村列表 */
export const get_co_group_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/group/get_co_group_list"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**取消入驻村接口 / 删除入驻接口 */
export const del_co_group = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/group/del_co_group"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**获取优惠券 */
export const get_coupon_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/coupon/get_coupon_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**获取优惠券 */
export const get_coupon_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/coupon/get_coupon_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**新增 编辑优惠券 */
export const addOredit_coupon = (params) => {
    let url = "market/coupon/add_coupon"
    if (params.id) {
        url = "market/coupon/edit_coupon"
    }
    return httpRequest({ url: httpRequest.adornUrl(url), method: "post", data: httpRequest.adornData(params) }
    )
}
/**删除优惠券 */
export const del_coupon = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/coupon/del_coupon"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**满减列表接口 */
export const get_reduction_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/coupon/get_reduction_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**编辑满减接口 */
export const edit_reduction_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/coupon/edit_reduction_info"), method: "post", data: httpRequest.adornData(params) }
    )
}
/**赠品列表 */
export const get_gift_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/gift/get_gift_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**赠品详情接口 */
export const get_gift_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/gift/get_gift_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**添加/编辑赠品接口 */
export const add_gift = (params) => {
    let url = "/market/gift/add_gift"
    if (params.id) {
        url = "/market/gift/edit_gift"
    }
    return httpRequest({ url: httpRequest.adornUrl(url), method: "post", data: httpRequest.adornData(params) }
    )
}
/**启用禁用赠品接口 */
export const edit_gift_status = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/gift/edit_gift_status"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**删除赠品接口 */
export const del_gift = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/gift/del_gift"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**满包邮设置 */


export const get_co_set = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/company/get_co_set"), method: "post", data: httpRequest.adornData(params) }
    )
}
export const edit_set_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/finance/company/edit_set_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**等级列表接口 */
export const get_users_level_List = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent_set/get_users_level_List"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**编辑等级接口 */
export const edit_level_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent_set/edit_level_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**等级删除 */

export const del_users_level = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent_set/del_users_level"), method: "post", data: httpRequest.adornData(params) }
    )
}

export const get_agent_set_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent_set/get_agent_set_info"), method: "post", data: httpRequest.adornData(params) }
    )
}




/**限时活动 */
export const get_ac_goods_list = (params) => {

    return httpRequest({ url: httpRequest.adornUrl("/market/act_goods/get_goods_list"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**限时活动商品详情 */
export const get_ac_goods_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/act_goods/get_goods_info"), method: "post", data: httpRequest.adornData(params) }
    )
}


/**限时活动 */
export const edit_ac_goods_info = (params) => {
    let url = "/market/act_goods/add_goods_info"

    if (params.goods_id) {
        url = "/market/act_goods/edit_goods_info"
    }
    return httpRequest({ url: httpRequest.adornUrl(url), method: "post", data: httpRequest.adornData(params) }
    )
}
/**渠道人员列表接口 1 会员 2 分销商 3 代理商 4 合伙人*/
export const get_agent_list = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent/get_agent_list"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**编辑设置接口*/
export const edit_agent_set_info = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent_set/edit_agent_set_info"), method: "post", data: httpRequest.adornData(params) }
    )
}

/**审核 */
export const edit_apply_agree = (params) => {
    return httpRequest({ url: httpRequest.adornUrl("/market/agent/edit_apply_agree"), method: "post", data: httpRequest.adornData(params) }
    )
}



















