/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-25 17:25:52
 * @FilePath: \jiudian\src\assets\languages\manager\ri.js
 */

// 管理部 || 日语
module.exports = {
  typeNameList: {
    1: '前台部',
    2: '餐饮部',
    3: '商店部'
  },
  priceType:{
    1:'订金',
    2:'押金',
    3:'收款',
    4:'退款',
    5:'加收全天房费 ',
    6:'加收半天房费 ',
    7:'损物赔偿 ',
    8:'迷你吧 ',
    9:'完全冲调 ',
    10:'部分冲调 ',
    11:'免单 ',
    12:'房费 ',
    13:'挂账 ',
    14:'附餐结账',
    15:'温泉税 ',
    16:'住宿税 ',
    17:'附餐早 ',
    18:'附餐晚  ',
    19:'项目预订金 ',
    100:'其他 '
  },
  payType:{
      0:'其他',
      1:'现金',
      2:'信用卡',
      3:'支付宝',
      4:'微信',
      5:'会员卡'
  },
  shiftOver: '交班交替表',
  //   管理部 > 首页(homePage > hp)
  hp_toRoom: '部屋状態',
  hp_floorBuilding: '建物・階設定',
  hp_floor: '階',
  hp_storiedBuilding: '建物の棟',
  hp_storiedBuildingA: '建物',

  hp_room: '部屋タイプ',
  hp_unknown: '未知',
  hp_layer: 'フロア',
  hp_dealNotArrive: 'no-show処理',
  hp_selectExplain: 'チェック入れるとno-showに対する処理しなければ、「日時更新」をできなくなります。',
  hp_dealNotLeave: '出発予定に関する未処理',
  hp_dealGoOrder: '未清算',
  hp_roomState: '「日時更新」後に部屋状態を自動的に「要清掃」表示',
  hp_autoSuccession: '「日時更新」後にシフト交替に設定する',
  hp_auditWay: '「日時更新」方式',
  hp_auditManual: '手動',
  hp_auditAuto: '自動',
  hp_allwAuditTime: '「日時更新」時間帯設定',
  hp_auditAutoTime: '自動「日時更新」時間',
  hp_auditInstructions: 'システムは設定時間より５分以内時自動的に「日時更新」を行います。',
  hp_today: '本日',
  hp_yesterday: '昨日',
  hp_weekGo: '前1週間',
  hp_compensationType: '資産種別',
  hp_addType: '種別追加',
  hp_bulletTitle: '予約経路リストから削除に確認しますか？',
  hp_bulletTitleA: '該当物品をリストから削除に確認しますか？',
  hp_bulletTitleB: '該当部屋タイプを削除に確認しますか？',
  hp_compensationGoods: '物品登録',
  hp_goodsName: 'カテゴリ名称',
  hp_goodsType: '資産種別',
  hp_compensationPrice: '賠償単価',
  hp_typeName: 'カテゴリ名称',
  hp_costPrice: '物品コスト',
  hp_inputActiveName: 'カテゴリ名称を入力してください',
  hp_inputActivePrice: '賠償単価を入力してください。',
  hp_editor: '編集',
  hp_patternsSuccession: '交替使用会計モード',
  hp_deskDepartment: '客室',
  hp_foodDepartment: '料飲',
  hp_storeDepartment: '付帯',
  hp_setSuccession: 'シフト交替 master',
  hp_cashModel: '現金モード',
  hp_paidModel: '実際発生モード',
  hp_accountsModel: '売掛モード',
  hp_locker: '小口現金',
  hp_modelSpecification: '使用モード説明',
  hp_flightManagement: 'シフト管理',
  hp_shift: 'シフト',
  hp_shiftName: 'シフト名称',
  hp_startTime: '開始時間',
  hp_endTime: '終了時間',
  hp_hotelImg: 'ホテル写真',
  hp_img: '写真',
  hp_hotelInformation: 'ホテル情報',
  hp_hotelName: 'ホテル名称',
  hp_hotelAddress: '住所',
  hp_deskPhone: 'フロント電話',
  hp_checkInTime: 'C/I時間',
  hp_checkOutTime: 'C/O時間',
  hp_hotelIntroduction: 'ホテル紹介',
  hp_inputIntroduction: '紹介内容を入力してください',
  hp_inputHotelName: 'ホテル名称を入力してください',
  hp_inputHotelAddress: 'ホテル住所を入力してください',
  hp_inputPhone: '電話番号を入力してください',
  hp_selectStayTime: '到着時間を入力してください',
  hp_selectLeavingTime: '出発時間を入力してください',
  hp_inputHotelDetuction: 'ホテル紹介を入力してください',
  hp_selectRoomImg: '部屋写真を選択してください',
  hp_printingParams: '印刷パラメータ',
  hp_printDocumentSelection: '帳票印刷選択',
  hp_printFormat: '印刷様式（サイズ）',
  hp_documentName: '印刷内容',
  hp_copies: '印刷部数',
  hp_documentNote: '印刷備考欄内容',
  hp_mustInput: '時間入力必須',

  //   管理部 > 客房中心 (houseKeeping > hk)
  hk_guestRoom: '客室',
  hk_roomName: '部屋タイプ名称',
  hk_roomNameA: '会場タイプ',
  hk_roomNameA: '会場タイプ',
  hk_roomNameB: '部屋タイプ',

  hk_doorPrice: '宿泊料',
  hk_doorPriceB: '料金',
  hk_doorPriceA: '利用料金',
  hk_beds: 'ベット数',
  hk_availabilityPeople: '定員人数',
  hk_drawingRoomType: '会場',
  hk_seating: '座席数',
  hk_basicInformation: '基本情報',
  hk_preferentialPrice: '特別価格',
  hk_preferentialUse: 'オンライン予約ディスカウント',
  hk_availableNum: '定員',
  hk_bedWidth: 'ベットサイズ',
  hk_longitudinalWidth: '縦',
  hk_horizontalWidth: '横',
  hk_roomArea: '部屋面積',
  hk_roomAreaLon: '部屋の縦長さ',
  hk_roomAreaHor: '部屋の横長さ',
  hk_bedType: 'ベットタイプ',
  hk_otherInfomation: 'その他の情報',
  hk_roomImg: '部屋タイプ写真',
  hk_deleteSuccess: '削除確認',
  hk_total: '合計',
  hk_building: '建物',
  hk_totalRoom: '合計部屋数',
  hk_space: '室',
  hk_sureDelete: '該当建物を削除に確認しますか？',
  hk_sureDeleteA: '該当階を削除に確認しますか？',
  hk_forward: '前へ移動',
  hk_moveBack: '後へ移動',
  hk_newBuilding: '建物追加',
  hk_newFloor: '建物・階設定',
  hk_newFloorA: '階を追加',
  hk_roomNum: '部屋数',
  hk_floorNote: 'フロア備考',
  hk_buildingName: '建物名称',
  hk_inputBuildName: '建物名称を入力してください',
  hk_buildingNote: '建物備考',
  hk_floorName: 'フロア名称',
  hk_modifyBuilding: '建物編集',
  hk_modifyFloor: 'フロア編集',
  hk_success: '成功',
  hk_newSuccess: '追加確認',
  hk_roomNumber: '部屋番号',
  hk_newRoom: '部屋追加',
  hk_batchEnable: '一括使用',
  hk_batchDisabled: '一括停止',
  hk_batchNoise: '一括騒音設定',
  hk_batchTemperature: '一括熱い部屋設定',
  hk_ext: '内線番号',
  hk_toward: 'view',
  hk_towardA: '向き',
  hk_toward_shan: '山',
  hk_toward_hai: '海',
  hk_toward_hu: '湖',
  hk_toward_malu: '马路',
  hk_byRoad: '道路沿い',
  hk_yes: '利用中',
  hk_no: '停止',
  hk_noA: '停止中',
  hk_shi: '◎',
  hk_fou: '✖',
  hk_ifWindow: '日当たり',
  hk_guide: '南向き',
  hk_designRule: '設計',
  hk_consistent: '一致',
  hk_guestRooms: '客室',
  hk_chamber: '会場No.',
  hk_pleaseSelect: '選択してください',
  hk_roomStructure: '部屋構図',
  hk_roomIMg: '部屋写真',
  hk_smokeRoom: '角部屋',
  hk_ifNoiseRoom: '騒音',
  hk_ifTemperatureRoom: '熱い部屋',
  hk_batchModify: '項目別一括設定',
  hk_hardWare: '錠ﾒｰｶｰ',
  hk_lock: '錠No.',
  hk_interfaceType: 'ｲﾝﾀｰﾌｪｰｽ',
  hk_roomLockInfo: '内容',
  hk_cardNum: 'ｶｰﾄﾞｷｰ数量',
  hk_theOpen: '引く型ドア',
  hk_lockType: '錠型番',
  hk_roomWhterNum: '部屋の通し番号',
  hk_roomSerialNum: 'ｼﾘｱﾙﾅﾝﾊﾞ',
  hk_doorInfo: '部屋錠の情報',
  hk_params: 'パラメータ',
  hk_name: '名称',
  hk_setValue: '設定値',
  hk_doorParams: '鍵設定パラメータ',
  hk_roomInfo: '部屋配置情報',

  //   管理部 > 客房二级库 (guestRoomSecondaryLibrary > grsl)
  grsl_goodsMode: '種別',
  grsl_goodsModeA: 'カテゴリー',
  grsl_matter: '商品',
  grsl_service: 'サービス',
  grsl_goodsName: '商品名',
  grsl_goodsNameA: '商品/サービス名',
  grsl_goodsNameB: '名称',
  grsl_goodsNameC: '商品＆サービス',
  grsl_goodsState: '状態',
  grsl_goodsType: '商品類別',
  grsl_goodsTypeA: 'カテゴリー',
  grsl_goodsTax: '消費税',
  grsl_goodsTaxN: '税抜き',
  grsl_goodsTaxY: '税込',
  grsl_goodsService: 'サービス料',
  grsl_goodsServiceN: '無し',
  grsl_goodsServiceY: '有る',
  grsl_billingMode: '料金表',
  grsl_billingPer: 'grsl_billingPer',
  grsl_billingTime: '時間',
  grsl_startFee: '使用',
  grsl_startMinute: '分後から、料金が発生します。',
  grsl_chargeTime: '有料時間',
  grsl_chargeMinute: '分',
  grsl_import: 'アップロード',
  grsl_addGoods: '商品追加',
  grsl_defaultTetailPrice: '小売価格',
  grsl_defaultTetailPriceA: '料金表',
  grsl_costPrice: '原価',
  grsl_warningQuantity: '在庫切れの警告数量',
  grsl_hasFailure: '失効',
  grsl_sureDelete: '削除確認',
  grsl_sureDeleteA: '該当プランを削除に確認しますか？',
  grsl_sureDeleteB: '該当商品/サービスを削除に確認しますか？',
  grsl_sureDeleteC: '該当付帯を削除に確認しますか？',
  grsl_sureHk: '該当商品/サービス扱いを停止（or利用）にしますか？？',
  grsl_surePoint: '停止（または使用）するべき販売所ですか？',
  grsl_goodsManagerment: '商品管理',
  grsl_resetGoods: '商品変更',
  grsl_belongType: 'カテゴリー',
  grsl_goodsDescription: '商品/サービス詳細',
  grsl_defaultNoPrice: '一回利用料',
  grsl_costNoPrice: '原価',
  grsl_defaultEmployeePrice: 'スタッフ価格',
  grsl_defaultBuyNum: '数量',
  grsl_saveAndAddA: '保存＆追加継続',
  grsl_saveAndAdd: '保存して続き追加',
  grsl_downloadSuccessful: 'ダウンロード確認',
  grsl_importSuccess: '一括入力確認',
  grsl_managementSalePoint: '付帯登録',
  grsl_goodsShelves: '陳列商品',
  grsl_employeePriceJapen: '社員割引',
  grsl_inventory: '在庫数量',
  grsl_shelves: '棚落ち',
  grsl_sureShelves: '該当商品/サービスを棚落ちに確認しますか？',
  grsl_salePointManagement: '付帯管理',
  grsl_salePointName: '付帯名称変更',
  grsl_allowedToRoom: '〇 部屋付（売掛）',
  grsl_allowerToUnit: '〇法人売掛',
  grsl_allowDelete: '削除可能',
  grsl_toEnble: '起用',
  grsl_allowedCheckUnit: '〇 法人売掛',
  grsl_allowedCheckRoom: '〇部屋付',
  grsl_resetGoodsInfo: '商品情報を編集',
  grsl_employeePrice: 'スタッフ用価格',
  grsl_retailPrice: '小売価格',
  grsl_retailPriceA: '料金表',
  grsl_resetSalePoint: '販売場所変更',
  grsl_addNewPoint: '販売場所追加',
  grsl_foldAll: '折りたたみ',
  grsl_addFirstGroup: '大分類を追加',
  grsl_addSecondGroup: '中分類追加',
  grsl_addThridGroup: '小分類追加',
  grsl_firstGroupName: '大分類名称',
  grsl_secondGroupName: '中分類名称',
  grsl_thridGroupName: '小分類名称',
  grsl_resetType: '編集',
  grsl_confirm: '確認',
  grsl_cancle: '取消',
  grsl_deleteContent: '該当カテゴリーを削除に確認しますか？',
  grsl_inventoryStatistical: '商品在庫集計',
  grsl_inventoryState: '在庫状況',
  grsl_inventoryNo: '在庫なし',
  grsl_inventoryYes: '在庫あり',
  grsl_inventoryNum: '在庫がある',
  grsl_resetInventory: '在庫変更',
  grsl_warehousingAudit: '入庫検品',
  grsl_commodityWarehousing: '商品入庫',
  grsl_wareType: '入庫類別',
  grsl_selectWareType: '入庫類別を選択してください',
  grsl_areaOne: '場所１',
  grsl_areaTwo: '場所２',
  grsl_inventoryQuantity: '在庫数量',
  grsl_bulkAdd: '一括商品追加',
  grsl_rukuNum: '入庫数',
  grsl_sureToMove: '削除確認しますか？',
  grsl_move: '削除',
  grsl_agent: '担当者',
  grsl_applyDate: '申請日',
  grsl_treasuryNote: '入庫備考',
  grsl_goodsKind: '商品種別',
  grsl_lonly: '件',
  grsl_procurementWarehousing: '仕入入庫',
  grsl_putIn: '手動入庫',
  grsl_putOther: 'その他の入庫',
  grsl_makingPeople: '担当者',
  grsl_selectTime: '期間設定',
  grsl_storageContent: '入庫内容',
  grsl_orderNo: '入庫書類No.',
  grsl_theDetail: '明細',
  grsl_audit: '審査',
  grsl_entryDetail: '入庫明細表',
  grsl_entryOrderNum: '入庫申請番号',
  grsl_reviewState: '検品状況',
  grsl_reviewTime: '検品時間',
  grsl_reviewPeople: '審査員',
  grsl_reviewSuccest: '検品コメント',
  grsl_waiteReview: '検品待ち',
  grsl_reviewPass: '（検品）承認',
  grsl_reviewFail: '（検品）却下',
  grsl_resetEntryGoods: '商品入庫変更',
  grsl_waiteReviewOrder: '検品待ち入庫リスト',
  grsl_orderPass: '（検品）承認リスト',
  grsl_orderFail: '（検品）却下リスト',

  //   管理部 > 价格体系 (priceSystem > ps)
  ps_member: '会員',
  ps_unit: '法人',
  ps_bulkPrice: '一括料金調整',
  ps_memberType: '会員種類',
  ps_channel: 'チャンネル',
  ps_offline: 'オフライン',
  ps_startDate: '開始日',
  ps_endDate: '終了日',
  ps_selectWeek: '曜日設定',
  ps_discount: '割引率',
  ps_upword: '切り捨て',
  ps_down: '切り上げ',
  ps_fourAndFive: '四捨五入',
  ps_keep: '現状保持',
  ps_changPriceWay: '割引規則',
  ps_fixedPrice: '定価',
  ps_japanYen: '円',
  ps_dueTo: '割引後料金',
  ps_resetRoomPrice: '素泊り料金修正',
  ps_nowSelect: '現在指定',
  ps_nowDate: '本日の日付',
  ps_memberPrice: '会員価格',
  ps_discountFor: 'ディスカウント',
  ps_newMemberPrice: '会員価格',
  ps_memberContent: '新しい会員価格がないなら、会員価格にします',
  ps_roomPrice: '宿泊料',
  ps_ruleName: '=レート名称',
  ps_modifyCalendar: '価格カレンダー',
  ps_addSuccess: '追加確認',
  ps_allDayRoom: '素泊り料金',
  ps_clockRoom: '日帰り料金',
  ps_getMoneyRule: '料金レート設定',
  ps_priceModel: '料金設定ルール',
  ps_ruleDetail: 'ルール詳細',
  ps_fixedTime: '固定時間チェックアウト設定',
  ps_everyTime: '２４時間チェックアウト設定',
  ps_inLive: 'C/I',
  ps_minterGet: '分間チェックインしたら初乗り料金がかかります。チェックインしてから',
  ps_getAll: '分後には全日レンタルでかかります。',
  ps_nextDay: '翌日',
  ps_moreThen: '超過',
  ps_letterMin: '分間を超えると、課金する，に基づき,',
  ps_addHalf: '日帰り料金',
  ps_addHour: '1時間ごとに加算されます',
  ps_addSky: '最多料金制使用',
  ps_billingType: '会計分類別',
  ps_startPrice: '初期請求',
  ps_thenTime: '超過料金',
  ps_minGetMoney: '分間を超えると、課金する，に基づき',
  ps_startAt: '初期料金',
  ps_everyHourAdd: '１時間毎に',
  ps_skyPrice: '最多料金',
  ps_specifiedTime: 'チェックイン時間帯を設定',
  ps_letterGetAllMoney: '分で部屋を借りると全額となる。',
  ps_minLetterChange: '分間を超えると、終日素泊り料金を課金する',
  ps_thenTimeRule: '超過料金設定ルール',
  ps_fullPrice: '定価',
  ps_advanceRoomPay: '前受金',
  ps_accountingRules: '会計レート',
  ps_setUp: '設定',
  ps_resetSuccess: '設定確認',
  //财务部 （finance）
  finance_startTime: '開始時刻',
  finance_endTime: '終了時間',
  finance_income: '収入',
  finance_spending: '支出',
  finance_nowChoose: '選択項目',
  finance_abstract: '摘要',
  finance_account: '口座',
  finance_nowSpend: '金額',
  finance_payTime: '支払う時間',
  finance_uploadImg: '写真添付',
  finance_clearContent: "クリア",
  finance_typeName: "項目名称",
  finance_incomeType: "収支項目",
  finance_date: "日付",
  finance_direction: "プラス/マイナス",
  finance_chooseInTime: "入金時間を選択してください",
  finance_creatTime: "注文時間",
  finance_source: "注文ルート",
  finance_autoPro: "自動生成",
  finance_handPro: "手動生成",
  finance_openProject: "業務項目",
  finance_price: "金額(円)",
  finance_accoutRemark: "記帳備考",
  finance_auditRemark: "備考",
  finance_credentials: "証拠",
  finance_proCredentials: "証明書を生成する",
  finance_profits: "利益",
  finance_only: "確認分だけ統計",
  finance_resetAccount: "仕分け日記帳修正",
  finance_theAmount: "発生金額",
  finance_pass: "承認",
  finance_notPass: "却下",
  finance_projectNum: "科目コード",
  finance_projectName: "科目名称",
  finance_during: "期間",
  finance_borrower: "借方",
  finance_lender: "貸方",
  finance_balance: "請求残金",
  finance_project: "科目・項目",
  finance_change: "時短切替",
  finance_beginning: "期首残高",
  finance_current: "当期分",
  finance_nowYear: "本年度累計",
  finance_end: "期末残高",
  finance_theAudit: "再審査",
  finance_batchDelete: "一括削除",
  finance_proofWords: "証拠書類",
  finance_debitBalance: "借方残高",
  finance_creditBalance: "貸方残高",
  finance_sterilisation: "相殺",
  finance_kind: "種別",
  finance_coding: "編集コード",
  finance_balanceDirection: "残高仕訳（勘定科目の貸方、借方）",
  finance_borrrow: "借",
  finance_credit: "貸",
  finance_normal: "正常",
  finance_deleted: "削除",
  finance_addLower: "科目追加",
  finance_printTitle: "タイトル印刷",
  finance_chooseDefault: "デフォルト設定しますか？",
  finance_setDefault: "デフォルト設定",
  finance_accoutCode: "アカウント コード",
  finance_accoutName: "口座名称",
  finance_accountNum: "口座番号",
  finance_projectKind: "科目類別",
  finance_superiorSubject: "上級科目",
  finance_accountantCourse: "会計項目",
  finance_chooseSubject: "科目を選択してください",
  finance_invoiceType: "インボイスタイプ",
  finance_noLimit: "all",
  finance_vatInvoice: "付加価値税専用領収書",
  finance_ordinaryInvoice: "付加価値税普通伝票",
  finance_electronicInvoice: "付加価値税電子計算書",
  finance_customerName: "顧客名前",
  finance_phone: "自宅電話番号",
  finance_invoiceHeader: "領収書宛て書き",
  finance_c: "請求金額",
  finance_tax: "消費税、入湯税、宿泊税",
  finance_invoiceNum: "送り状番号",
  finance_invoiceTime: "請求時間",
  finance_operationOf: "担当者",
  hp_loginDetail_state: '状態',
  hk_enable: '使用',
  hk_enableA: '利用',
  hk_disable: '停止',
  hk_addRoomType: '部屋タイプ情報変更',
  hk_livePrice: '素泊り料金',
  hk_set: '設定',
  hk_breakfast: '朝食',
  hk_dinner: '夕食',
  hk_placeEnterContent: '備考を入力してくだあい',
  hk_placeEnterContentA: '階を入力してください',
  hk_placeEnterContentB: '階の名称を入力してください',
  hk_placeEnterContentD: 'その他追加事項を入力してください',
  hk_placeEnterContentC: '備考を入力してくだあい',
  grsl_physicalGoods: '商品',
  grsl_serviceGoods: 'サービス',
  hk_newAddRoomType: '部屋タイプ情報変更',
  hk_newAddRoomTypeA: 'タイプ追加',
  hk_have: '有る',
  hk_donot: '無し',
  hk_priceCalendar: '価格カレンダー',
  hk_setLivePrice: '素泊り料金を設定してください',
  hk_priceSet: '料金設定',
  hk_onlyLivePrice: 'ここの料金は素泊りの1室1人料金です。',
  hk_peopleLive: '人',
  add_maxNum: '最大値≦100',
  add_serverPrice: 'サービス料',
  add_inputNum: '数字を入力してください',
  add_moreThanNot: '入力最大値≦100',
  add_inputNumShould: '入力最小値≧0',
  add_editorSuccess: '編集確認',
  hk_goodsType: 'カテゴリー',
  hk_goodsTypeA: '種別',
  hk_an: '料金計算単位：',
  hk_startAt: '停止（または使用）するべき販売所ですか？',
  hk_getPriceRule: '計算単位料金',
  hk_deposit: '押金',
  hk_addGetContent: '説明：60分未満の場合に、30分以内は0.5；30分以上は１計算単位として請求します。',
  add_taxIn: '消費税率',
  add_taxOut: '消費税軽減税率',
  hk_oatName: '経路名称',
  hk_inputOat: 'OTA名称を入力してください',
  hk_resetSuccess: '変更確認',
  grsl_newMemberType: '会員種別追加',
  grsl_editorOneClass: '第１段カテゴリー編集',
  grsl_editorTwoClass: '第2段カテゴリー編集',
  grsl_sureEnable: '起用確認しますか',
  grsl_sureDisable: '使用禁止確認しますか？',
  grsl_ifSureDelete: '削除確認しますか？',
  grsl_ifSureDeleteA: '該当プラン・食事を削除に確認しますか？',
  grsl_superior: '上一段',
  add_lsat15: '15日前',
  add_next15: '15日後',
  add_peoAsit: '人数/席',
  add_resetPrice: '調整後',
  add_newDoorPri: '新宿泊料金',
  add_nowTime: '只今の時間',
  add_chooseTime: '時間を選択して下さい',
  add_peoplePrice: '金額/人',
  add_onlyLive: '素泊まり',
  add_liveAzao: '1泊朝食付き',
  add_liveAwan: '1泊夕食付き',
  add_zaoAwan: '1泊2食付き',
  grsl_selectZao: '朝食を選択してください',
  grsl_inputbedNum: '定員を入力してください',
  grsl_inputMorethanOne: '１より大きい数字を入力してください',
  add_packageName: '名称',
  add_inputPackageName: 'メニュー名を入力してください',
  add_packageType: '種別',
  add_inputPackageType: 'メニューカテゴリーを入力してください',
  add_packagePri: '食事付き料金',
  add_unitPrice: '単価',
  add_inputPackagePrice: 'メニュー単価を入力してください',
  add_nowStyle: '当前交班模式',
  add_cashHold: '本班现金留存',
  add_creditCardUp: 'クレジット入金',
  add_changeDetail: '交替詳細',
  add_pettyCash: 'レジ金',
  add_nowCashGet: '本シフト現金入金',
  add_nowPettyDown: '繰越レジ金',
  add_lastHold: '受継ぐレジ金',
  add_nowCardGet: 'クレジット入金',
  add_nowBillUp: '売掛入金',
  add_nowBillPrice: '売掛入金',
  add_allDepartment: 'ALLセクション',
  add_start: '起用',
  grsl_doorPri: '調整前1泊2食付1名料金',
  grsl_newLivePri: '新宿泊料金（素泊まり）',
  grsl_newLivePriA: '新宿泊料金',
  grsl_newPrice: '新宿泊料金（１泊2食）',
  grsl_oneLive: '1人素泊まり',
  hk_chooseChannel: '予約経路を選択してください',
  grsl_inputNewPri: '新宿泊料金を入力してください',
  add_last15A:'15日前',
  add_next15A: '15日後',
  add_tyepApri: '部屋タイプ/部屋料金',
  add_dealNight: 'チェック入れると処理確認しなければ、「日時更新」をできなくなります。',
  add_setDutity: 'チェック入れると部屋状態を「要清掃」を設定する',
  grsl_resetSoon: '調整後1泊2食付1名料金',
  add_onePrice: '1人素泊まり',





}
