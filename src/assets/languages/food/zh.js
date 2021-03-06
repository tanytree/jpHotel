/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 15:31:02
 * @FilePath: \jiudian\src\assets\languages\food\zh.js
 */
module.exports = {
    reportType:{
    	1:'交班报表(按班次)',
    	2:'交班报表(按收银员)',
    	3:'消费明细表 ',
    	4:'收款明细表'
    },
    dialogTitle:{
        1:'修改',
        2:'设置',
        3:'手动清空',
        4:'设置自动清空时间',
        5:'批量设置'
    },
    dishTitle:{
        1:'修改菜品',
        2:'新增菜品',
        3:'批量删除',
        4:'菜品详情'
    },
    orderTitle:{
        1:'详情',
        2:'结账'
    },
    houseTitle:{
        1:'新增仓库',
        2:'修改仓库',
        3:'仓库详情'
    },
    houseStateDesc:{
        1:'确定启用吗?',
        2:'确定禁用吗?',
        3:'确定删除吗?'
    },
    storageTitle:{
        1:'商品入库',
        2:'商品出库'
    },
    storageLogType:{
    	1:'入库',
    	2:'出库'
    },
    storageLogState:{
    	1:'待审核',
    	2:'审核通过 ',
    	3:'未通过'
    },
    storageLogTitle:{
        1:'出入明细',
        2:'入库单明细',
        3:'出库单明细',
        4:'入库审核',
        5:'出库审核'
    },
    //订单状态
    order_status:{
        1:'未结',
        2:'已结',
        3:'已取消'
    },
    // 订单来源
    orderSource:{
        1:'PC',
        2:'IPAD',
        3:'其他'
    },
    //计费类型
    billingType:{
      1:'直接结账',
      2:'签单到单位',
      3:'签单到房间'
    },
    //支付方式
    payType:{
        1:'现金',
        2:'信用卡',
        // 3:'支付宝',
        // 4:'支票',
        // 5:'会员卡'
        5:'其他'
    },
    //身份类型
    card_type:{
       1:'身份证',
       2:'护照'
    },
    //审核和状态
    view_status:{
        1:'待审核',
        2:'审核通过',
        3:'未通过'
    },
    common:{
        yes:'是',
        no:'否',
        success:'操作成功',

        //点餐
        is_choose_food:'已选菜品',
        food_title:'菜品名称',
        food_price:'菜品价格',
        food_count:'菜品数量',
        action:'操作',
        food_total:'共 {count} 件菜品，合计:',
        product_total:'合计',
        amount:'金额',
        save:'提交',
        all:'全部',
        food_surplus:'预估剩余',
        isadd:'添加',
        remove:'移除',
        confirm_remove_tips:'确定移除吗?',
        confirm_add_tips:'确定添加吗?',
        confirm_reduce_tips:'确定减少吗?',
        order_need_tips:'当前订单至少有一份菜品!',
        is_solt:'已沽清',
        cate:'菜品分类',
        has:'剩馀',
        cate_name:'菜品分类名称',
        no_set:'未设置',
        set:'设置',
        select_food:'请先选择菜品',
        //沽清管理
        is_served:'已沽清菜品数',
        cancel_all:'全部取消',
        solt_text:'沽清',
        tip:'提示',
        is_confirm_solt:'确认沽清该菜品?',
        is_confirm_solt_cancel:'确认取消沽清该菜品?',
        is_confirm_solt_cancel_all:'确认全部取消吗?',
        ok:'确定',
        cancel:'取消',
        submit:'提交',
        working_day:'营业日',
        food_remain:'菜品剩余',
        price:'价格',
        warning_count:'预警数',
        edit:'修改',
        food_remain_count:'菜品剩余份数',
        search:'查询',
        reset:'重置',
        hanlde_empty:'手动清空',
        hanlde_empty_remain:'手动清空将清空所有菜品剩余份数, 所有菜品可以重新设置剩余份数，如果需要同时清除菜品预警数，请勾选「清除预警数」',
        hanlde_empty_warning:'清除预警数',
        hanlde_auto_empty_warning:'同时自动清除所有菜品预警数（如果需要清除则勾选）',
        set_auto_emptying_time:'设置自动清空时间',
        open:'开启',
        close:'关闭',
        closed:'关闭',
        select_date:'选择时间',
        batch_set:'批量设置',
        select_food_tips:'请选择菜品',

        //菜品管理
        batch_del:'批量删除',
        confirm_del_all:'确认全部删除吗?',
        del:'删除',
        confirm_del:'确认删除吗?',
        add_food:'新增菜品',
        order_add_food:'新增菜品',
        order_add_title:'菜品名称',
        order_add_canel:'关闭',
        status:'状态',
        detail:'详情',
        material:'原料',
        food_desc:'菜品介绍',
        food_pic:'菜品图片',
        confirm_disable:'确认要禁用吗?',
        confirm_open:'确认要开启吗?',
        is_disable:'禁用中',
        is_active:'启用中',
        input_food_title:'请输入菜品名称',
        input_food_cate:'请输入菜品分类',
        input_food_cate_name:'请选择菜品分类名称',
        input_food_price:'请输入菜品价格',
        input_food_pic:'请选择菜品图片',

        //菜品分类管理
        slide_all:'展开全部',
        no_slide_all:'折叠全部',
        add_first_level:'新增一级分类',
        add_second_level:'新增二级分类',
        add_three_level:'新增三级分类',
        editor:'编辑',
        add:'新增',
        up_level:'上级分类',
        first_level:'一级分类名称',
        second_level:'二级分类名称',
        three_level:'三级分类名称',

        //订单
        order_status:'结账状态',
        no_limit:'不限',
        curstom_name:'客人名称',
        order_from:'订单来源',
        order_price:'订单总价',
        order_time:'订单时间',
        order_num:'订单号',
        create_time:'创建时间',
        food_detail:'菜品明细',
        curstom_info:'客人信息',
        guests:'临时客人',
        total_pay:'总消费',
        consumePrice:'应收',
        order_deal:'结账',
        deskNum:'桌号',
        numberPlat:'房间号',
        cancel_order:'取消订单',
        cancel_confirm_order_tips:'确定取消该订单吗?',
        confirm_submit:'确定提交吗?',
        soldOut:' 该菜品已经卖完啦，不能再售卖啦，您可以前往菜品管理给该菜品添加预估份数!',
        print:'打印',
        payType:'支付方式',
        billingType:'计费类型',
        billingType1:'直接结账',
        billingType2:'签单到单位',
        billingType3:'签单到房间',
        payPrice:'结算金额',
        member_card:'会员卡',
        select_member_card:'请选目标会员卡',
        read_member_card:'读会员卡',
        remark:'备注',
        remarkA:'备注',
        order_count:'单据份数',
        order_print:'单据打印',
        pay_order_deal:'立即结账',
        select_company:'选择单位',
        acount_info:'用户信息',
        account_name:'姓名',
        card_type:'证件类型',
        card_no:'证件号',
        select_room:'选择房间',
        select_rooms:'请选择房间',


        //库房管理
        storage_name:'仓库名称',
        input_storage_name:'请输入仓库名称',
        second_status:'请选择状态',
        disable:'禁用',
        active:'启用',
        storage_address:'仓库地址',
        add_storage:'新增仓库',
        storage_in:'所在仓库',
        product_name:'商品名称',
        input_product_name:'请输入商品名称',
        product_num:'商品编号',
        product_count:'仓库量',
        unit:'单位',
        input_unit:'请输入商品单位',
        unit_desc:'单位(个,斤,吨)',
        storageInTitle:'入库仓库',
        storageOutTitle:'出库仓库',

        //仓库商品管理
        product_storage_in:'商品入库',
        product_storage_out:'商品出库',
        product_storage_in_count:'入库数量',
        product_storage_out_count:'出库数量',
        createrName:'经办人',
        input_createName:'请输入经办人姓名',
        apply_time:'申请日期',
        input_apply_time:'请选择申请日期',
        add_pro:'新增商品',
        batch_add_product:'批量添加商品',
        add_product:'添加商品',
        select_storage:'请选择仓库',
        select_product:'请选择商品',
        product_del_tips:'该商品还有库存，暂时不能删除',

        //出入库审核
        review_status:'审核状态',
        store_in_out:'出入仓库',
        to:'至',
        type:'类型',
        storage_order_no:'单号',
        view:'审核',
        view_status:'审核状态',
        pass:'通过',
        nopass:'不通过',
        view_remark:'审核意见',
        view_storage_in:'入库审核',
        view_storage_out:'出库审核',
        view_time:'审核时间',
        applyer_name:'制单人',
        viewer_name:'审批人',
        storage_detail:'明细',
        taxStatus:'是否含消费税',
        seviceStatus:'是否含服务税',
        costPrice:'成本价格',
        costPrice_desc:'成本价格',
        is_tax:'含税',
        no_tax:'不含税',
        is_service_fee:'含服务费',
        no_service_fee:'サービス料別',


    },
    shift:{
        tabs_1:'前台交班',
        tabs_2:'交班纪录',

        tabs_title_1:'预交班基本信息',
        tabs_title_A:'预交班基本信息',
        tabs_time_1:'班次时间',
		to:'至',
        tabs_num:'班次号',
        acter:'交班操作员',

        tabs_title_2:'本班账务汇总信息',
        total:'收入总计',
        foodFee:'餐饮费',
        totalFee:'结算总计',
        cash:'现金',
        wechart:'微信',
        alipay:'支付宝',
        signRoom:'签单到房间',
        creadCard:'信用卡',
        other:'其他',

        tabs_title_3:'本班现金上交',
        wechart_stitle:'本班微信上交',
        alipay_stitle:'本班支付宝上交',
        creadCard_stitle:'信用卡上交',
        onHas:'上班留存备用金',
        offHas:'本班下放备用金',
        leaveHas:'本班走结订单金额',

        onReport:'本班报表',
        onDuty:'交班报表(按班次)',
        onCasher:'交班报表(按收银员)',
        listReport:'消费明细表',
        payReport:'收款明细表',
        look:'预览',

        selectOnDutyer:'请选择接班员工',
        selectOnDutyerA:'请选择接班员工',
        password:'接班员工密码'






  },
  reset: {
    each: '件',
    submit: '提交',
    outOfSomething: '该菜品已经沽清啦，不能再售卖啦，您可以前往菜品管理>沽清管理取消该商品的沽清!',
    soldOut: ' 该菜品已经卖完啦，不能再售卖啦，您可以前往菜品管理给该菜品添加预估份数!',
    cancel_all:'全部取消',
    yes:'是',
    no: '否',
    remove: '移除',
    is_confirm_solt_cancel: '确认取消沽清该菜品?',
    food_surplus: '预估剩余',
    batch_set:'批量设置',
    is_active:'启用中',
    is_disable:'禁用中',
    noTax:'不含税',
    haveTax: '含税',
    noServe: '不含服务费',
    haveServe: '含服务费',
    costPrice: '成本价格',
    onePhoto: '只能上传一张图片',
    confirm_del_all: '确认全部删除吗?',
    confirm_del: '确认删除吗?',
    confirm_disable:'确认要禁用吗?',
    open: '开启',
    add_first_level:'新增一级分类',
    add_second_level:'新增二级分类',
    add_three_level: '新增三级分类',
    first_level:'一级分类名称',
    second_level:'二级分类名称',
    three_level: '三级分类名称',
    up_level: '上级分类',
    order_price:'订单总价',
    servePri:'服务费',
    constPri:'消费税',
    yhPrice:'优惠金额',
    paymoney:'实付金额',
    create_time:'创建时间',
    add: '新增',
    guests:'临时客人',
    total_pay:'总消费',
    total_payA:'总消费',
    consumePrice:'应收',
    payPrice:'结算金额',
    member_card:'会员卡',
    select_member_card:'请选目标会员卡',
    totalFee:'结算总计',
    success:'客房挂帐操作成功',

    }

}
