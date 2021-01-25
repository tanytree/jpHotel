/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-25 13:32:15
 * @FilePath: \jiudian\src\assets\languages\food\ri.js
 */
module.exports = {
    reportType:{
		1:'交替表（シフト別）',
		2:'交替表（担当者別）',
		3:'売上明細表 ',
		4:'入金明細書'
	},
    dialogTitle:{
        1:'修正',
        2:'設定',
        3:'手動クリア',
        4:'自動クリア時間設定',
        5:'一括設定'
    },
    dishTitle:{
        1:'料理修正',
        2:'料理登録',
        3:'一括削除',
        4:'料理詳細'
    },
    orderTitle:{
        1:'詳細',
        2:'会計'
    },
    houseTitle:{
        1:'倉庫追加',
        2:'編集',
        3:'倉庫詳細'
    },
    houseStateDesc:{
        1:'起動確認しますか?',
        2:'使用停止確認しますか?',
        3:'削除確認しますか?'
    },
    storageTitle:{
        1:'商品入庫',
        2:'商品出庫'
    },
	storageLogType:{
		1:'入庫 ',
		2:'出庫 '
	},
	storageLogState:{
		1:'検品待ち',
		2:'（検品）承認 ',
		3:'（検品）却下'
	},
    storageLogTitle:{
        1:'出入庫明細',
        2:'入庫明細',
        3:'出庫明細',
        4:'入庫検品',
        5:'出庫検品'
    },
    //订单状态
    order_status:{
        1:'未収',
        2:'精算済',
        3:'キャンセル'
    },
    // 订单来源
    orderSource:{
        1:'PC',
        2:'タブレット',
        3:'他のディバイス'
    },
    //计费类型
    billingType:{
      1:'直払い',
      2:'法人会社請求',
      3:'部屋付け'
    },
    //支付方式
    payType:{
        1:'キャッシュ',
        2:'クレジットカード',
        // 3:'支付宝',
        // 4:'支票',
        // 5:'会員カード'
    },
    //身份类型
    card_type:{
       1:'身分証明書',
       2:'パスポート'
    },
    //审核和状态
    view_status:{
        1:'検品待ち',
        2:'（検品）承認　',
        3:'（検品）却下 '
    },
    common:{
        yes:'はい',
        no:'いいえ',
        success:'操作成功',
        //点餐
        is_choose_food:'注文受取',
        food_title:'料理名',
        food_price:'単価',
        food_count:'数量',
        action:'設定',
        food_total:'数量 {count}，合計',
        product_total:'合計',
        amount:'金額',
        save:'送信確認',
        all:'全部',
        food_surplus:'注文可能数',
        isadd:'選択',
        remove:'削除',
        confirm_remove_tips:'确定移除吗?',
        confirm_add_tips:'确定添加吗?',
        confirm_reduce_tips:'确定减少吗?',
        order_need_tips:'当前订单至少有一份菜品!',
        is_solt:'品切れ',
        cate:'カテゴリー',
        cate_name:'カテゴリ',
        has:'在庫',
        no_set:'未設定',
        set:'設定',
        select_food:'先にクリアする料理名をクリックして選択ください。',
        //沽清管理
        is_served:'品切れ数',
        cancel_all:'全部取消',
        solt_text:'品切れ',
        tip:'ご確認',
        is_confirm_solt:'該当料理を品切れにしますか？',
        is_confirm_solt_cancel:'品切れを取り消しますか?',
        is_confirm_solt_cancel_all:'全部、取り消し確認しますか?',
        ok:'確認',
        cancel:'取消',
        submit:'送信確認',
        working_day:'営業日',
        food_remain:'在庫数 ',
        price:'価格',
        warning_count:'警戒数',
        edit:'修正',
        food_remain_count:'在庫数',
        search:'検索',
        reset:'リセット',
        hanlde_empty:'手動クリア',
        hanlde_empty_remain:'在庫数を一括クリアすると、それぞれの在庫数を再設定になります。',
        hanlde_empty_warning:'警戒数を一括クリアします。',
        hanlde_auto_empty_warning:'警戒数を自動にクリアします。',
        set_auto_emptying_time:'自動クリア時間設定 ',
        open:'ON',
        close:'OFF',
        closed:'閉じる',
        select_date:'時間を選択してください',
        batch_set:'一括設定',
        select_food_tips:'メーニューを選んでください',

        //菜品管理
        batch_del:'一括削除',
        confirm_del_all:'全部削除しますか?',
        del:'削除',
        confirm_del:'削除に確認しますか?',
        add_food:'メニュー追加',
        order_add_food:'注文追加',
        order_add_title:'注文内容',
        order_add_canel:'戻る',
        status:'状態',
        detail:'詳細',
        material:'原材料',
        food_desc:'内容紹介',
        food_pic:'写真',
        confirm_disable:'使用停止しますか?',
        confirm_open:'停止に確認しますか？',
        is_disable:'停止',
        is_active:'利用中',
        input_food_title:'料理名称を入力してください',
        input_food_cate:'カテゴリーを選択してください',
        input_food_cate_name:'カテゴリー名称を入力してください',
        input_food_price:'料理金額を入力してください',
        input_food_pic:'料理写真を添付してください',

        //菜品分类管理
        slide_all:'展開',
        no_slide_all:'折りたたみ',
        add_first_level:'第一層分類追加',
        add_second_level:'第二層分類追加',
        add_three_level:'第三層分類追加',
        editor:'編集',
        add:'追加',
        up_level:'第一層分類',
        first_level:'第一層分類名前',
        second_level:'第二層分類名前',
        three_level:'第三層分類名前',

        //订单
        order_status:'精算状況',
        no_limit:'全部',
        curstom_name:'顧客名前',
        order_from:'注文経路',
        order_price:'订单总价',
        order_time:'注文時間',
        order_num:'注文番号',
        create_time:'注文時間',
        food_detail:'注文内容',
        curstom_info:'顧客情報',
        guests:'临时客人',
        total_pay:'合計金額',
        consumePrice:'会計金額',
        order_deal:'会計',
        deskNum:'テーブル番号',
        numberPlat:'部屋番号',
        cancel_order:'注文キャンセル',
        cancel_confirm_order_tips:'注文をキャンセルしますか?',
        confirm_submit:'提出確認しますか?',
        print:'印刷',
        soldOut:' こちらのメニューは売り切れです。注文は受けられません。メニュー管理に品数を追加して下さい!',
        payType:'支払方法',
        billingType:'会計分類別',
        billingType1:'直払い',
        billingType2:'部屋付け',
        billingType3:'法人会社請求',
        payPrice:'精算合計',
        member_card:'会員カード',
        select_member_card:'会員カードを選択して下さい',
        read_member_card:'会員カード読み取り',
        remark:'備考',
        order_count:'レシート部数',
        order_print:'レシート印刷',
        pay_order_deal:'確認',
        select_company:'法人/会社入力',
        acount_info:'利用者情報',
        account_name:'名前',
        card_type:'証明書の種類',
        card_no:'身分証明書',
        select_room:'部屋選択',
        select_rooms:'部屋を選択してください',

        //库房管理
        storage_name:'倉庫名',
        input_storage_name:'倉庫の名称を入力してください',
        second_status:'状況を選択して下さい',
        disable:'停止',
        active:'利用中',
        storage_address:'倉庫住所',
        add_storage:'倉庫追加',
        storage_in:'保管倉庫',
        product_name:'商品名',
        input_product_name:'商品の名称を入力してください',
        product_num:'商品コード',
        product_count:'在庫数',
        unit:'商品の単位',
        input_unit:'商品の単位を入力してください',
        unit_desc:'品単位：（個、グラムg、キロkg）',
        storageInTitle:'利用倉庫',
        storageOutTitle:'出库倉库',


        //仓库商品管理
        product_storage_in:'商品入庫',
        product_storage_out:'商品出庫',
        product_storage_in_count:'入庫数',
        product_storage_out_count:'出庫数',
        createrName:'担当者',
        input_createName:'担当者名を入力してください',
        apply_time:'申請日',
        input_apply_time:'登録日を選択して下さい',
        add_pro:'倉庫追加',
        batch_add_product:'商品一括登録',
        add_product:'商品登録',
        select_storage:'倉庫を選択してください',
        select_product:'商品を選択してください',
        product_del_tips:'商品在庫が有る為、削除できません',

        //出入库审核
        review_status:'検品状況',
        store_in_out:'利用倉庫',
        to:'から',
        type:'種類',
        storage_order_no:'申請番号',
        view:'審査',
        view_status:'検品状況',
        pass:'（検品）承認',
        nopass:'（検品）却下',
        view_remark:'意見',
        view_storage_in:'入庫検品',
        view_storage_out:'出庫検品',
        view_time:'審査日',
        applyer_name:'申請者',
        viewer_name:'審査員 ',
        storage_detail:'明細',
        taxStatus:'消費税',
        seviceStatus:'サービス料',   
        costPrice:'コスト',
        costPrice_desc:'コストを入力してください',
        is_tax:'税込',
        no_tax:'税別',
        is_service_fee:'サービス料込',
        no_service_fee:'サービス料別',
    },
    shift:{
        tabs_1:'シフト交替',
        tabs_2:'交替記録',

        tabs_title_1:'交替前の基本情報',
        tabs_time_1:'シフト時間',
        to:'-',
        tabs_num:'シフト',
        acter:'担当者',

        tabs_title_2:'売上情報  ',
        total:'売上合計￥',
        foodFee:'飲食代',
        totalFee:'精算合計￥',
        cash:'現金',
        wechart:'WeChat Pay',
        alipay:'Alipay',
        signRoom:'部屋付け',
        creadCard:'クレジットカード',
        other:'その他',

        tabs_title_3:'現金入金',
        wechart_stitle:'ウェチャットペイ入金',
        alipay_stitle:'アリペイ入金',
        creadCard_stitle:'クレジットカード入金',
        onHas:'準備金',
        offHas:'繰越金',
        leaveHas:'売掛金額',

        onReport:'本シフト帳票',
        onDuty:'交替表（シフト別）',
        onCasher:'交替表（担当者別）',
        listReport:'売上明細表',
        payReport:'入金明細書',
        look:'プレビュー',

        selectOnDutyer:'次シフト担当を選択してください',
        password:'パワワード'






    },
    reset: {
      each: '件', 
    submit:'確認',
    outOfSomething:'該当料理品が品切れになっています、メニュー管理>品切れ設定のページに調整してください。', 
    soldOut:' 在庫がなくなりましたので、該当品の注文を受け取れません。',
    cancel_all:'一括取消',
    yes:'◎',
    no:'✖️',
    remove: '取消',
    is_confirm_solt_cancel:'該当料理の品切れ状態を取消しますか？',
    food_surplus:'在庫',
    batch_set:'一括数量再設定',
    is_active: '通常',
    is_disable:'停止',
    noTax:'税抜き',
    haveTax:'税込',
    noServe: '無し',
    haveServe: '有る',
    costPrice:'コスト価格',
    onePhoto:'料理写真一枚のみ',
    confirm_del_all:'選択された料理品をメニューから削除に確認しますか？',
    confirm_del: '該当料理品をメニューから削除に確認しますか？',
    confirm_disable: '状態を停止に確認しますか？',
    open: '通常',
    confirm_open:'状態を通常戻りに確認しますか？',
    add_first_level:'大分類を追加',
    add_second_level:'中分類追加',
    add_three_level:'小分類追加',
    first_level:'大分類名称',
    second_level:'中分類名称',
    three_level:'小分類名称',
    up_level: '大分類',
    order_price:'小計',
    servePri:'サービス料',
    constPri:'消費税',
    yhPrice:'割引',
    paymoney:'合計',
    create_time:'注文時間',
    








    
      }
}
