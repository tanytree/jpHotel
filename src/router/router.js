/*
 * @Date: 2021-03-17 16:20:43
 * @Author: 陶子
 * @LastEditTime: 2021-04-01 11:49:35
 * @FilePath: \jiudian\src\router\router.js
 * @pageName: 这是--（）--页面
 */
/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-11 17:01:24
 * @FilePath: \jiudian\src\router\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/mainView'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 不需要要权限的页面默认挂载
export default new Router({
    // mode: 'history',
    routes: [
        // { path: '', redirect: 'main', meta: { title: '主页' } },

        { path: '/', redirect: '/login', },
        // { path: '/', name: 'main', component: Main },
        {
            path: '/login',
            name: 'login',
            meta: { title: '登录' },
            component: () =>
                import('@/views/login/login')
        },
        {
            path: '/main',
            name: 'main',
            meta: { title: '主页' },
            component: Main,
            children: [
                {
                    path: '/organization',
                    name: 'organization',
                    meta: { title: 'company' },
                    component: () => import('@/views/organization/index')
                },

                // 总办
                {
                    path: '/boss-index',
                    name: 'bossIndex',
                    meta: { title: 'bossIndex' },
                    component: () =>
                        import('@/views/Boss/Index')
                },

                {
                    path: '/department-charge',
                    name: 'DepartmentCharge',
                    component: () =>
                        import('@/views/Boss/DepartmentCharge')
                },
                {
                    path: '/browseReport',
                    name: 'browseReport',
                    component: () =>
                        import('@/views/finance/report/table')
                },
                {
                    path: '/pay-mg',
                    name: 'PayMg',
                    component: () =>
                        import('@/components/payMG')
                },
                {
                    path: '/storeManagement',
                    name: 'storeManagement',
                    meta: { title: '门店管理', pid: "13" },
                    component: () =>
                        import('@/views/Boss/StoreManagement/index')
                },
                //管理部
                {
                    path: '/manager-index',
                    name: 'managerIndex',
                    meta: { title: 'manager' },
                    component: () =>
                        import('@/views/manager/index/main')
                },
                {
                    path: '/guest-center',
                    name: 'guestCenter',
                    meta: { title: 'guestCenter' },
                    component: () =>
                        import('@/views/manager/guestCenter/main')
                },
                {
                    path: '/guest-Room_2',
                    name: 'guestRoom_2',
                    meta: { title: 'guestRoom_2' },
                    component: () =>
                        import('@/views/manager/guestRoom_2/main')
                },
                {
                    path: '/price-system',
                    name: 'priceSystem',
                    meta: { title: 'priceSystem' },
                    component: () =>
                        import('@/views/manager/priceSystem/main')
                },
                //财务部
                {
                    path: '/income',
                    name: 'income',
                    component: () =>
                        import('@/views/finance/main')
                },
                /**管理部 */
                {
                    path: '/market',
                    name: 'market',
                    meta: {
                        title: '管理部首页',

                    },
                    component: () =>
                        import('@/views/market/main')
                },

                {
                    path: '/nightaudit',
                    name: 'nightaudit',
                    meta: { title: '夜审', pid: "13" },
                    component: () =>
                        import('@/views/market/nightaudit')
                },
                {
                    path: '/orders',
                    name: 'orders',
                    meta: { title: '订单管理', pid: "13" },
                    component: () =>
                        import('@/views/market/orders')
                },
                {
                    path: '/orderdetail',
                    name: 'orderdetails',
                    meta: { title: '订单详情', pid: "13" },
                    component: () =>
                        import('@/views/market/orders/detail')
                },
                {
                    path: '/bookingDetail',
                    name: 'bookingDetail',
                    meta: { title: '预订详情', pid: "13" },
                    component: () =>
                        import('@/views/market/orders/bookingDetail')
                },
                {
                    path: '/checktheDetails',
                    name: 'checktheDetails',
                    meta: { title: '入住管理', pid: "13" },
                    component: () =>
                        import('@/components/checktheDetails')
                },
                {
                    path: '/reception',
                    name: 'reception',
                    meta: { title: '前台服务', pid: "13" },
                    component: () =>
                        import('@/views/market/reception')
                },
                {
                    path: '/booking',
                    name: 'booking',
                    meta: { title: '预订管理', pid: "13" },
                    component: () => import('@/views/market/booking'),
                    children: [
                        {
                            path: '/reception',
                            name: 'reception',
                            component: () => import('@/views/market/booking'),
                        },
                        {
                            path: '/c2detail',
                            name: 'c2detail',
                            component: () => import('@/views/market/booking'),
                        },
                    ]
                },
                // c2detail 陶子添加
                {
                    path: '/c2detail',
                    name: 'c2detail',
                    meta: { title: '会议核销详情', },
                    component: () =>
                        import('@/views/market/booking/venue/c2detail')
                },

                {
                    path: '/market-authSet',
                    name: 'marketauthSet',
                    meta: { title: '权限设置' },
                    component: () =>
                        import('@/views/market/authSet')
                },

                /**人事部 */ // 渠道管理
                {
                    path: '/personnelManager',
                    name: 'personnelManager',
                    meta: { title: '首页' },
                    component: () =>
                        import('@/views/market/personnelManager')
                },
                {
                    path: '/employeeList',
                    name: 'employeeList',
                    meta: { title: '人员管理' },
                    component: () =>
                        import('@/components/employee/employeeList')
                },
                {
                    path: '/channelDaili',
                    name: 'channelDaili',
                    meta: { title: '薪酬管理' },
                    component: () =>
                        import('@/views/market/personnelManager/daili/channelDaili')
                },
                {
                    path: '/channelSetting',
                    name: 'channelSetting',
                    meta: { title: '渠道管理' },
                    component: () =>
                        import('@/views/market/personnelManager/setting/channelSetting')
                },

                {
                    path: '/customer',
                    name: 'customer',
                    meta: { title: '客户管理' },
                    component: () =>
                        import('@/views/market/customer'),
                },
                {
                    path: '/customerdetails',
                    name: 'customerdetails',
                    meta: { title: '客户详情' },
                    component: () =>
                        import('@/views/market/customer/children/detail'),
                },
                {
                    path: '/integralDetail',
                    name: 'customerdetails',
                    meta: { title: '积分明细' },
                    component: () =>
                        import('@/views/market/customer/children/integralDetail'),
                },

                {
                    path: '/customeredit',
                    name: 'customeredit',
                    meta: { title: '客户编辑' },
                    component: () =>
                        import('@/views/market/customer/children/detail'),
                },
                {
                    path: '/memberEditorTao',
                    name: 'memberEditorTao',
                    meta: { title: '总办客户编辑' },
                    component: () =>
                        import('@/views/market/customer/children/memberEditorTao'),
                },
                {
                    path: '/newDetail',
                    name: 'newDetail',
                    meta: { title: '新增会员类型' },
                    component: () =>
                        import('@/views/sale/order/member/graces/new'),
                },
                {
                    path: '/customeradd',
                    name: 'customeradd',
                    meta: { title: '添加客户' },
                    component: () =>
                        import('@/views/market/customer/children/detail'),
                },
                {
                    path: '/historydetail',
                    name: 'historydetail',
                    meta: { title: '客史详情' },
                    component: () =>
                        import('@/views/market/customer/children/historydetail'),
                },
                {
                    path: '/hsitorydetailTao',
                    name: 'hsitorydetailTao',
                    meta: { title: '客史修改' },
                    component: () =>
                        import('@/views/market/customer/children/hsitorydetailTao'),
                },
                {
                    path: '/customerhistory',
                    name: 'customerhistory',
                    meta: { title: '客户历史' },
                    component: () =>
                        import('@/views/market/customer/children/history'),
                },
                {
                    path: '/historyTao',
                    name: 'historyTao',
                    meta: { title: '总办客户历史' },
                    component: () =>
                        import('@/views/market/customer/children/historyTao'),
                },
                {
                    path: '/foreignDetail',
                    name: 'foreignDetail',
                    meta: { title: '外宾详情' },
                    component: () =>
                        import('@/views/market/customer/children/foreignDetail'),
                },
                {
                    path: '/companydetail',
                    name: 'companydetail',
                    meta: { title: '单位详情' },
                    component: () =>
                        import('@/views/market/customer/children/companydetail'),
                },
                {
                    path: '/comTaodetail',
                    name: 'comTaodetail',
                    meta: { title: '门店单位详情' },
                    component: () =>
                        import('@/views/market/customer/children/comTaodetail'),
                },

                /**财务部 */
                {
                    path: '/finance',
                    name: 'finance',
                    component: () =>
                        import('@/views/finance/main')
                },

                {
                    path: '/saleContract',
                    name: 'saleContract',
                    meta: { title: '单位管理', pid: "25" },
                    component: () =>
                        import('@/views/sale/contract/index')
                },
                {
                    path: '/account',
                    name: 'account',
                    component: () =>
                        import('@/views/finance/account')
                },
                {
                    path: '/bill',
                    name: 'bill',
                    component: () =>
                        import('@/views/finance/bill')
                },
                {
                    path: '/report',
                    name: 'report',
                    component: () =>
                        import('@/views/finance/report')
                },
                {
                    path: '/invoice',
                    name: 'invoice',
                    component: () =>
                        import('@/views/finance/invoice')
                },
                {
                    path: '/menuAssert',
                    name: 'menuAssert',
                    component: () =>
                        import('@/views/menuAssert/menuAssert')
                },

                //餐饮部
                {
                    path: '/food',
                    name: 'food',
                    meta: { title: 'food' },
                    component: () =>
                        import('@/views/food/main')
                },

                {
                    path: '/dish',
                    name: 'dish',
                    meta: { title: 'dish' },
                    component: () =>
                        import('@/views/food/dish')
                },

                {
                    path: '/dishOrder',
                    name: 'dishOrder',
                    meta: { title: 'dishOrder' },
                    component: () =>
                        import('@/views/food/order')
                },
                {
                    path: '/warehouse',
                    name: 'warehouse',
                    meta: { title: 'warehouse' },
                    component: () =>
                        import('@/views/food/warehouse')
                },
                //shangdianbu
                {
                    path: '/shop',
                    name: 'shop',
                    meta: { title: 'shop' },
                    component: () =>
                        import('@/views/shop/main')
                },
                {
                    path: '/pmsshopselling',
                    name: 'pmsshopselling',
                    meta: { title: 'pmsshopselling' },
                    component: () =>
                        import('@/views/shop/pmsshopselling')
                },
                {
                    path: '/pmshoporder',
                    name: 'pmshoporder',
                    meta: { title: 'dishOrder' },
                    component: () =>
                        import('@/views/shop/order')
                },





                //企划部      /**销售部 */
                {
                    path: '/salemain',
                    name: 'salemain',
                    meta: { title: '企划部首页', pid: "22" },
                    component: () =>
                        import('@/views/sale/main')
                },
                {
                    path: '/saleOrder',
                    name: 'saleOrder',
                    meta: { title: '会员管理', pid: "21" },
                    component: () =>
                        import('@/views/sale/order')
                }

            ]
        },

        {
            path: '/404',
            name: '404',
            component: () =>
                import('@/components/error')
        },
    ]

})
