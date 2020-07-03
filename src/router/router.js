/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-30 21:33:13
 * @FilePath: /cloudAdmin/src/router/router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
Vue.use(Router)
    // 不需要要权限的页面默认挂载
export default new Router({
    mode: 'hash',

    routes: [
        // { path: '', redirect: 'main', meta: { title: '主页' } },

        { path: '/', redirect: '/login', },
        // { path: '/', name: 'main', component: Main },
        { path: '/login', name: 'login', meta: { title: '登录' }, component: () =>
                import ('@/views/login/login') },
        {
            path: '/main',
            name: 'main',
            meta: { title: '主页' },
            component: Main,
            children: [
                // 总办
                {
                    path: '/boss-index',
                    name: 'bossIndex',
                    meta: { title: 'bossIndex' },
                    component: () =>
                        import ('@/views/Boss/Index')
                },
                {
                    path: '/index-design',
                    name: 'indexDesign',
                    meta: { title: 'indexDesign' },
                    component: () =>
                        import ('@/views/Boss/IndexDesign')
                },
                {
                    path: '/department-charge',
                    name: 'DepartmentCharge',
                    component: () =>
                        import ('@/views/Boss/DepartmentCharge')
                },
                {
                    path: '/person-mg',
                    name: 'PersonMg',
                    component: () =>
                        import ('@/views/Boss/PersonMg')
                },
                {
                    path: '/pay-mg',
                    name: 'PayMg',
                    component: () =>
                        import ('@/views/Boss/PayMg')
                },
                //管理部
                {
                    path: '/manager-index',
                    name: 'managerIndex',
                    meta: { title: 'manager' },
                    component: () =>
                        import ('@/views/manager/index')
                },
                //售后部 当前课程/活动项目
                {
                    path: '/currentCourse',
                    name: 'currentCourse',
                    meta: { title: 'currentCourse' },
                    component: () =>
                        import ('@/views/afterSales/currentCourse')
                },
                {
                    path: '/activityProject',
                    name: 'activityProject',
                    meta: { title: 'activityProject' },
                    component: () =>
                        import ('@/views/afterSales/activityProject')
                },
                //财务部
                {
                    path: '/income',
                    name: 'income',
                    component: () =>
                        import ('@/views/finance/main')
                },
                {
                    path: '/companyInfo',
                    name: 'companyInfo',
                    meta: { title: 'company' },
                    component: () =>
                        import ('@/views/company/info')
                },
                {
                    path: '/company',
                    name: 'company',
                    meta: { title: 'company' },
                    component: () =>
                        import ('@/views/company')
                },
                {
                    path: '/created',
                    name: 'created',
                    meta: { title: 'company' },
                    component: () =>
                        import ('@/views/company/created')
                },
                {
                    path: '/companyList',
                    name: 'companyList',
                    meta: { title: 'company' },
                    component: () =>
                        import ('@/views/company/list')
                },
                /**前台部 */
                {
                    name: 'product',
                    path: '/product',
                    meta: { title: '产品管理', pid: "11" },
                    component: () =>
                        import ('@/views/market/productManagement')
                },
                {
                    path: '/promotion',
                    name: 'promotion',
                    meta: { title: '促销管理', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/promotion')
                },
                {
                    path: '/market',
                    name: 'market',
                    meta: { title: '营销部首页' },
                    component: () =>
                        import ('@/views/market/main')
                },
                {
                    path: '/market-authSet',
                    name: 'marketauthSet',
                    meta: { title: '权限设置' },
                    component: () =>
                        import ('@/views/market/authSet')
                },
                {
                    path: '/userIntegral',
                    name: 'userIntegral',
                    meta: { title: '积分管理', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/member/userIntegral')
                },
                {
                    path: '/userActivity',
                    name: 'userActivity',
                    meta: { title: '活动管理', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/member/userActivity')
                },
                {
                    path: '/winningList',
                    name: 'winningList',
                    meta: { title: '中奖名单', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/member/winningList')
                },

                {
                    path: '/scholarship',
                    name: 'scholarship',
                    meta: { title: '奖学金管理', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/shop/scholarship')
                },
                {
                    path: '/cert',
                    name: 'cert',
                    meta: { title: '证书管理', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/shop/cert')
                },
                {
                    path: '/activesEvents',
                    name: 'activesEvents',
                    meta: { title: '活动项目', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/shop/activesEvents')
                },
                {
                    path: '/customerMarketing',
                    name: 'customerMarketing',
                    meta: { title: '会员营销', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/member/customer')
                },
                {
                    path: '/slideshow',
                    name: 'slideshow',
                    meta: { title: '限时抢购', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/slideshow/slideshow')
                },
                {
                    path: '/featurePublish',
                    name: 'featurePublish',
                    meta: { title: '限时抢购发布', pid: "12" },
                    component: () =>
                        import ('@/views/market/promotion/slideshow/publish')
                },
                {
                    path: '/advert',
                    name: 'advert',
                    meta: { title: '广告管理', pid: "13" },
                    component: () =>
                        import ('@/views/market/advert')
                },
                {
                    path: '/advertList',
                    name: 'advertList',
                    meta: { title: '广告商管理', pid: "13" },
                    component: () =>
                        import ('@/views/market/advert/advertList')
                },
                {
                    path: '/advertSet',
                    name: 'advertSet',
                    meta: { title: '投放广告', pid: "13" },
                    component: () =>
                        import ('@/views/market/advert/advertSet')
                },
                {
                    path: '/groupManage',
                    name: 'groupManage',
                    meta: { title: '村入驻管理', pid: "13" },
                    component: () =>
                        import ('@/views/market/advert/groupManage')
                },
                // 渠道管理
                {
                    path: '/channel',
                    name: 'channel',
                    meta: { title: '渠道管理' },
                    component: () =>
                        import ('@/views/market/channel')
                },
                {
                    path: '/channelFenxiao',
                    name: 'channelFenxiao',
                    meta: { title: '渠道管理' },
                    component: () =>
                        import ('@/views/market/channel/fenxiao/channelFenxiao')
                },
                {
                    path: '/channelDaili',
                    name: 'channelDaili',
                    meta: { title: '渠道管理' },
                    component: () =>
                        import ('@/views/market/channel/daili/channelDaili')
                },
                {
                    path: '/channelSetting',
                    name: 'channelSetting',
                    meta: { title: '渠道管理' },
                    component: () =>
                        import ('@/views/market/channel/setting/channelSetting')
                },
                {
                    path: '/channelHehuo',
                    name: 'channelHehuo',
                    meta: { title: '渠道管理' },
                    component: () =>
                        import ('@/views/market/channel/hehuo/channelHehuo')
                },
                {
                    path: '/price',
                    name: 'price',
                    meta: { title: '价格管理' },
                    component: () =>
                        import ('@/views/market/price')
                },
                {
                    path: '/dataState',
                    name: 'dataState',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/dataState')
                },
                {
                    path: '/dianpu',
                    name: 'dianpu',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/dataState/tab6Se1')
                },
                {
                    path: '/guanggao',
                    name: 'guanggao',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/dataState/tab6Se2')
                },
                {
                    path: '/qudao',
                    name: 'qudao',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/dataState/tab6Se3')
                },
                {
                    path: '/address',
                    name: 'address',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/address')
                },
                {
                    path: '/receiveAd',
                    name: 'receiveAd',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/address/receiveAd')
                },
                {
                    path: '/returnAd',
                    name: 'returnAd',
                    meta: { title: '数据统计' },
                    component: () =>
                        import ('@/views/market/address/returnAd')
                },

                /**销售部 */
                {
                    path: '/salemain',
                    name: 'salemain',
                    meta: { title: '销售部首页', pid: "22" },
                    component: () =>
                        import ('@/views/sale/main')
                },
                {
                    path: '/saleOrder',
                    name: 'saleOrder',
                    meta: { title: '促销管理', pid: "21" },
                    component: () =>
                        import ('@/views/sale/order')
                },
                {
                    path: '/saleContract',
                    name: 'saleContract',
                    meta: { title: '合同管理', pid: "25" },
                    component: () =>
                        import ('@/views/sale/contract/index')
                },
                {
                    path: '/contracted',
                    name: 'contracted',
                    component: () =>
                        import ('@/views/sale/contract/finish')
                },
                {
                    path: '/contractback',
                    name: 'contractback',
                    component: () =>
                        import ('@/views/sale/contract/back')
                },
                {
                    path: '/agreementOrder',
                    name: 'agreementOrder',
                    component: () =>
                        import ('@/views/sale/order/Agreement')
                },
                {
                    path: '/aftersaleOrder',
                    name: 'aftersaleOrder',
                    component: () =>
                        import ('@/views/sale/order/Aftersale')
                },
                {
                    path: '/orderInfo',
                    name: 'orderInfo',
                    meta: { title: '订单详情' },
                    component: () =>
                        import ('@/views/sale/order/orderInfo')
                },
                {
                    path: '/Personer',
                    name: 'Personer',
                    meta: { title: '用户订单' },
                    component: () =>
                        import ('@/views/sale/order/Personer')
                },
                //销售审批
                {
                    path: '/approvalPreSale',
                    name: 'approvalPreSale',
                    component: () =>
                        import ('@/views/sale/approval/preSale')
                },
                {
                    path: '/approvalContract',
                    name: 'approvalContract',
                    component: () =>
                        import ('@/views/sale/approval/contract')
                },
                //我的报价
                {
                    path: '/offerStart',
                    name: 'offerStart',
                    component: () =>
                        import ('@/views/sale/offer/start')
                },
                {
                    path: '/offerWait',
                    name: 'offerWait',
                    component: () =>
                        import ('@/views/sale/offer/wait')
                },
                {
                    path: '/offerCollect',
                    name: 'offerCollect',
                    component: () =>
                        import ('@/views/sale/offer/collect')
                },
                {
                    path: '/offerOnline',
                    name: 'offerOnline',
                    component: () =>
                        import ('@/views/sale/offer/online')
                },
                {
                    path: '/publicPool',
                    name: 'publicPool',
                    component: () =>
                        import ('@/views/sale/publicPool')
                },
                {
                    path: '/agentOrder',
                    name: 'agentOrder',
                    component: () =>
                        import ('@/views/sale/order/Agent')
                },
                {
                    path: '/channelOrder',
                    name: 'channelOrder',
                    component: () =>
                        import ('@/views/sale/order/Channel')
                },
                {
                    path: '/saleCustomer',
                    name: 'saleCustomer',
                    component: () =>
                        import ('@/views/sale/SaleCustomer')
                },
                {
                    path: '/saleBussness',
                    name: 'SaleBussness',
                    component: () =>
                        import ('@/views/sale/SaleBussness')
                },
                {
                    path: '/contractdetail',
                    name: 'contractdetail',
                    meta: { title: '合同详情' },
                    component: () =>
                        import ('@/views/sale/contract/detail')
                },
                {
                    path: '/contractinfo',
                    name: 'contractinfo',
                    meta: { title: '合同要素' },
                    component: () =>
                        import ('@/views/sale/contract/fileinfo')
                },



                /**财务部 */
                {
                    path: '/finance',
                    name: 'finance',
                    component: () =>
                        import ('@/views/finance/main')
                },


                {
                    path: '/account',
                    name: 'account',
                    component: () =>
                        import ('@/views/finance/account')
                },
                {
                    path: '/accountzj',
                    name: 'accountzj',
                    component: () =>
                        import ('@/views/finance/account/accountzj')
                },
                {
                    path: '/accountbill',
                    name: 'accountbill',
                    component: () =>
                        import ('@/views/finance/account/bill')
                },
                {
                    path: '/accounttx',
                    name: 'accounttx',
                    component: () =>
                        import ('@/views/finance/account/accounttx')
                },
                {
                    path: '/accountjf',
                    name: 'accountjf',
                    component: () =>
                        import ('@/views/finance/account/accountjf')
                },
                {
                    path: '/billjf',
                    name: 'billjf',
                    meta: { title: '村积分账单' },
                    component: () =>
                        import ('@/views/finance/account/billjf')
                },
                {
                    path: '/withDraw',
                    name: 'withDraw',
                    component: () =>
                        import ('@/views/finance/withDraw')
                },
                /**采购部 */
                {
                    path: '/purchaseMain',
                    name: 'purchaseMain',
                    meta: { title: '采购首页' },
                    component: () =>
                        import ('@/views/purchase/main')
                },
                {
                    path: '/purchasePlan',
                    name: 'purchasePlan',
                    meta: { title: '采购计划' },
                    component: () =>
                        import ('@/views/purchase/plan')
                },
                {
                    path: '/planDetail',
                    name: 'planDetail',
                    meta: { title: '计划详情' },
                    component: () =>
                        import ('@/views/purchase/plan/planDetail')
                },
                {
                    path: '/planDetailEdit',
                    name: 'planDetailEdit',
                    meta: { title: '添加商品' },
                    component: () =>
                        import ('@/views/purchase/plan/planDetailEdit')
                },
                {
                    path: '/purchaseList',
                    name: 'purchaseList',
                    meta: { title: '采购清单' },
                    component: () =>
                        import ('@/views/purchase/list')
                },
                {
                    path: '/contract',
                    name: 'contract',
                    meta: { title: '合同管理' },
                    component: () =>
                        import ('@/views/purchase/contract/index')
                },
                {
                    path: '/onlineEnquiry',
                    name: 'onlineEnquiry',
                    meta: { title: '在线询盘' },
                    component: () =>
                        import ('@/views/purchase/online/enquiry')
                },
                {
                    path: '/enquiryDetail',
                    name: 'enquiryDetail',
                    meta: { title: '新增询盘' },
                    component: () =>
                        import ('@/views/purchase/online/enquiryDetail')
                },

                {
                    path: '/contractFinish',
                    name: 'contractFinish',
                    component: () =>
                        import ('@/views/purchase/contract/finish')
                },
                {
                    path: '/contractWaiting',
                    name: 'contractWaiting',
                    component: () =>
                        import ('@/views/purchase/contract/waiting')
                },
                {
                    path: '/orderContract',
                    name: 'orderContract',
                    component: () =>
                        import ('@/views/purchase/order/contract')
                },
                {
                    path: '/orderEnterprise',
                    name: 'orderEnterprise',
                    component: () =>
                        import ('@/views/purchase/order/enterprise')
                },
                {
                    path: '/orderAgent',
                    name: 'orderAgent',
                    component: () =>
                        import ('@/views/purchase/order/agent')
                },
                {
                    path: '/supplier',
                    name: 'supplier',
                    component: () =>
                        import ('@/views/purchase/supplier/index')
                },
                {
                    path: '/onlineProcurement',
                    name: 'onlineProcurement',
                    component: () =>
                        import ('@/views/purchase/online/procurement')
                },
                /**IT部 */
                {
                    path: '/interface',
                    name: 'interface',
                    meta: { title: '第三方接口' },
                    component: () =>
                        import ('@/views/internet/interface/index')
                },
                {
                    path: '/bindOfficial',
                    name: 'bindOfficial',
                    meta: { title: '第三方绑定' },
                    component: () =>
                        import ('@/views/internet/interface/wechat/bindOfficial')
                }

            ]
        },
        { path: '/404', name: '404', component: () =>
                import ('@/components/error') },




    ]

})