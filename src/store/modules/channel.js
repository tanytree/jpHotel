/*
 * @Date: 2020-03-25 17:23:29
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 17:37:40
 * @FilePath: /cloudAdmin/src/store/modules/channel.js
 */

const state = {
    id: "", //设置id
    status_1: 2,//分销商 1 开启 2 关闭
    "status_2": 2,//代理商 1 开启 2 关闭
    "status_3": 2,//合伙人 1 开启 2 关闭
    "agent_type": 1, //分销商申请条件 1 无条件 2 不能申请，只能手动添加 3 消费次数 4 消费金额
    "agent_tax_type": 0, //扣税比例
    "agent_tax": "", //扣税比例
    "agent_postage_type_1": "2", //1 免运费 2 固定运费 只采购
    "agent_postage_type_2": 2,//1 免运费 2 固定运费 采购加带发货
    "agent_model": "1,2", //1 只采购 2 采购加带发货
    "agent_postage_1": "", //运费 只采购
    "agent_postage_2": "", //运费 采购加带发货
    "agent_time": "", //代理方式设置时间
    "apply_type": "", //分销商申请条件 1 无条件 2 不能申请，只能手动添加 3 消费次数 4 消费金额
    "apply_price": "", //消费达到金额
    "apply_number": "", //消费达到次数
    "apply_auto": 2, //1 需申请 2 自动成为分销商
    "apply_time": "", //分销申请设置时间
    apply_settle_type: "", //结算方式1 支付宝 2 微信 3 余额 4 银行卡
    "apply_settle_time": "", //分销结算设置时间
    "lower_type": "", //分销商下级绑定场景 1 链接下单成功 2 访问链接 3 二维码
    "lower_co": "2", //企业分销商 1 推荐拿奖励 2 购买后加入产品库
    "lower_users": "", //个 人分销商 1 推荐拿奖励
    "lower_reward_type": 1, //奖励方式 1 金额 2 积分
    "lower_reward_status": 1, //计算方式 1 金额
    "lower_price_type": 2, //分账方式 1 订单总价 2 实际支付
    "lower_time": "", //下级分销商关系设置时间
    "partner_tax_type": 2, //合伙人 1 不扣税 2 扣税
    "partner_tax": "", //合伙人 扣税比例
    "partner_type": 1, //合伙人代理方式 1 利润分成 2 固定提成
    "partner_time": "",//合伙人设置时间
    "partner_agent_type": "1,2", //1 访问链接 2 二维码
    "is_partner_agent": 1, //是否开启合伙人发展代理商 1 是 2 否
    "agent_apply_price_one": "", //单次消费达到金额
    "agent_apply_type": "1,2", //代理申请 1 消费金额 2 单词消费达到金额
    "is_agent_apply": "1", //是否可申请代理商 1 是 2 否
    "agent_apply_price": "", //消费达到金额
    "agent_apply_time": "" //代理申请设置时间 
};

const getters = {

};

const mutations = {
    initMutations(state, data) {
        Object.assign(state, data)
    },
};

const actions = {
    initActions(context, data) {
        context.commit('initMutations', data);
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
