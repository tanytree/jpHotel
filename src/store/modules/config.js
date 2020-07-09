/*
 * @Date: 2020-03-10 15:44:19
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-30 11:10:19
 * @FilePath: /cloudAdmin/src/store/modules/config.js
 */
const state = {
    msgKey: "a5b4c18cc837456092804e400b5019c9",//短信发送秘钥
    plat_source: "1006",//1001android 1002ios 1003pad 1004h5 1006webchat 1006PC端 1007内部平台
    logisticList: [
        { name: "中通快递", value: "ZTO" },
        { name: "申通快递", value: "STO" },
        { name: "圆通速递", value: "YTO" },
        // { name: "顺丰速运", value: "SF" },
        // { name: "百世快递", value: "HTKY" },
        // { name: "韵达速递", value: "YD" },
        // { name: "邮政快递包裹", value: "YZPY" },
        // { name: "EMS", value: "EMS" },
        // { name: "天天快递", value: "HHTT" },
        // { name: "京东快递", value: "JD" },
        // { name: "优速快递", value: "UC" },
        // { name: "德邦快递", value: "DBL" },
        // { name: "宅急送", value: "ZJS" }
    ],
    routermsg: [],
    enterprisesTypes: [
        {
            "id": "1364b20566d947138b6bd1f776cb542f", "name": "有限责任公司", "tissueNum": 1, "tissueLevel": 1,
            "pTissueNum": 0, "tissueOrder": null,
            "childList": [
                {
                    "id": "62638ff40fdf4ad5a933eb50195b6b40", "name": "合资公司", "tissueNum": 9, "tissueLevel": 2, "pTissueNum": 1, "tissueOrder": 2,
                    "childList": [
                        {
                            "id": "85bec3de49a3495fa4d50595b769cdce", "name": "中外资合资公司（有境外股东占股）", "tissueNum": 23, "tissueLevel": 3, "pTissueNum": 9, "tissueOrder": 6, "remark": "\"E+N+M+O+P>=2", "childList": null
                        },
                        {
                            "id": "d133d62f84f8438ab4b913069d54a8cc", "name": "内资公司（无境外股东占股)", "tissueNum": 22, "tissueLevel": 3, "pTissueNum": 9, "tissueOrder": 5, "remark": "E个自然人+N个企业+M个政府+L个国有企业+O个事业单位；E+N+M+O>=2", "childList": null
                        }]
                }, {
                    "id": "da47757efa034e9bb11a1180f994fc00", "name": "一人公司", "tissueNum": 8, "tissueLevel": 2, "pTissueNum": 1,
                    "tissueOrder": 1, "childList": [
                        {
                            "id": "6d850b4fb8094eaa9559f0e5546d0580", "name": "自然人独资公司", "tissueNum": 18, "tissueLevel": 3, "pTissueNum": 8, "tissueOrder": 1, "remark": "自然人", "childList": null
                        },
                        {
                            "id": "be5fa164ab6743e9867bac1988e98790", "name": "国有独资公司", "tissueNum": 20, "tissueLevel": 3, "pTissueNum": 8, "tissueOrder": 3, "remark": "政府或国有企业或事业单位", "childList": null
                        },
                        {
                            "id": "cde6423615a64625afd3350c024f8051", "name": "外商（个人）独资公司", "tissueNum": 21, "tissueLevel": 3, "pTissueNum": 8, "tissueOrder": 4, "remark": "外国自然人或企业", "childList": null
                        }, {
                            "id": "e6902dfaf0fc4fc7849ad371340baeca", "name": "企业法人独资公司", "tissueNum": 19, "tissueLevel": 3, "pTissueNum": 8, "tissueOrder": 2, "remark": "企业", "childList": null
                        }]
                }]
        }, {
            "id": "1de55533e8324506965ca717b39c78bb", "name": "中外合资企业", "tissueNum": 6, "tissueLevel": 1, "pTissueNum": 0, "tissueOrder": 6,
        },
        {
            "id": "40302e161e674a21987a355dbf90a4b6",
            "name": "政府/事业机构", "tissueNum": 3, "tissueLevel": 1, "pTissueNum": 0, "tissueOrder": 3,
            "childList": [
                {
                    "id": "1d7503fca47b4d5a949c953285d2e869", "name": "政府机关", "tissueNum": 12, "tissueLevel": 2, "pTissueNum": 3, "tissueOrder": 5,
                }, {
                    "id": "d415ff5e61874b88ba8205c49e2420d1", "name": "事业机构", "tissueNum": 13, "tissueLevel": 2, "pTissueNum": 3, "tissueOrder": 6,
                }]
        },
        {
            "id": "4b3652ba699146f0a96588a760a3eb72",
            "name": "个体企业", "tissueNum": 4, "tissueLevel": 1, "pTissueNum": 0, "tissueOrder": 4,
            "childList": [
                {
                    "id": "9b2adb95b5654efa844c52b1ca38358e", "name": "事业型企业", "tissueNum": 15, "tissueLevel": 2, "pTissueNum": 4, "tissueOrder": 8,
                },
                {
                    "id": "a1b9b78e3d0e4b20aafb5d93a4351d98", "name": "个体私营企业", "tissueNum": 14, "tissueLevel": 2, "pTissueNum": 4, "tissueOrder": 7,
                }]
        }, {
            "id": "ab9a4719f2294797959b04dfff8d9c41", "name": "合伙企业", "tissueNum": 5, "tissueLevel": 1, "pTissueNum": 0, "tissueOrder": 5,
            "childList": [
                {
                    "id": "acbcd25d2b0c40f99a7fee835082493d", "name": "有限合伙", "tissueNum": 17, "tissueLevel": 2, "pTissueNum": 5, "tissueOrder": 10,
                },
                {
                    "id": "bd6df84eef794dcea110e61b962eb3fa", "name": "普通合伙", "tissueNum": 16, "tissueLevel": 2, "pTissueNum": 5, "tissueOrder": 9,
                }]
        },
        {
            "id": "bd05e72cb829498abe4a2b62831aeb3b", "name": "国外驻地机构", "tissueNum": 7, "tissueLevel": 1, "pTissueNum": 0, "tissueOrder": 7,
        },
        {
            "id": "ed2af2e515874150acda4934c624f959", "name": "股份有限公司", "tissueNum": 2, "tissueLevel": 1, "pTissueNum": 0, "tissueOrder": 2,
            "childList": [
                {
                    "id": "42023c0ac7444c49b163ad98cd5f3bf2", "name": "非上市", "tissueNum": 10, "tissueLevel": 2, "pTissueNum": 2, "tissueOrder": 3,
                }, {
                    "id": "c3d8ef013a1c49159e0e5c24a05c2bd6", "name": "上市公司", "tissueNum": 11, "tissueLevel": 2, "pTissueNum": 2, "tissueOrder": 4,
                }]
        }],
    /**企业规模 */
    enterprisesScales: [
        { "name": "10-20", "eName": null, "dictNum": 2, "childList": null },
        { "name": "20-50", "eName": null, "dictNum": 3, "childList": null },
        { "name": "50-100", "eName": null, "dictNum": 4, "childList": null },
        { "name": "100-500", "eName": null, "dictNum": 5, "childList": null },
        { "name": "500人以上", "eName": null, "dictNum": 4, "childList": null }
    ],
    industryList: [
        {
            "id": "1de55533e8324506965ca717b39c78bb",
            "name": "其他", "industryNum": 6, "industryLevel": 1, "pIndustryNum": 0, "industryOrder": 6,
        },
        {
            "id": "40302e161e674a21987a355dbf90a4b6",
            "name": "农业、畜牧业、种植业", "industryNum": 1, "industryLevel": 1, "pIndustryNum": 0, "industryOrder": 1,
            "childList": [
                {
                    "id": "42023c0ac7444c49b163ad98cd5f3bf2", "name": "牧羊场", "industryNum": 10, "industryLevel": 2, "pIndustryNum": 1, "industryOrder": 4,
                }, {
                    "id": "62638ff40fdf4ad5a933eb50195b6b40", "name": "养猪场", "industryNum": 9, "industryLevel": 2, "pIndustryNum": 1, "industryOrder": 3,
                },
                {
                    "id": "bd05e72cb829498abe4a2b62831aeb3b", "name": "茶场", "industryNum": 7, "industryLevel": 2, "pIndustryNum": 1, "industryOrder": 1,
                }, {
                    "id": "da47757efa034e9bb11a1180f994fc00", "name": "养牛场", "industryNum": 8, "industryLevel": 2, "pIndustryNum": 1, "industryOrder": 2,
                }]
        },
        {
            "id": "40302e161e674a21987a355dbf90axw3", "name": "现代服务业", "industryNum": 3, "industryLevel": 1, "pIndustryNum": 0, "industryOrder": 3,
            "childList": [
                {
                    "id": "1d7503fca47b4d5a949c953285d2e869", "name": "金融", "industryNum": 12, "industryLevel": 2, "pIndustryNum": 3, "industryOrder": 2,
                }, {
                    "id": "9b2adb95b5654efa844c52b1ca38358e", "name": "电子商务", "industryNum": 15, "industryLevel": 2, "pIndustryNum": 3, "industryOrder": 5,
                },
                {
                    "id": "a1b9b78e3d0e4b20aafb5d93a4351d98", "name": "信息", "industryNum": 14, "industryLevel": 2, "pIndustryNum": 3, "industryOrder": 4,

                }, {
                    "id": "c3d8ef013a1c49159e0e5c24a05c2bd6", "name": "科技", "industryNum": 11, "industryLevel": 2, "pIndustryNum": 3, "industryOrder": 1,
                }, {
                    "id": "d415ff5e61874b88ba8205c49e2420d1", "name": "保险", "industryNum": 13, "industryLevel": 2, "pIndustryNum": 3, "industryOrder": 3,
                }]
        }, {
            "id": "4b3652ba699146f0a96588a760a3eb72", "name": "餐饮", "industryNum": 4, "industryLevel": 1, "pIndustryNum": 0, "industryOrder": 4,
        },
        {
            "id": "ab9a4719f2294797959b04dfff8d9c41", "name": "制造", "industryNum": 5, "industryLevel": 1, "pIndustryNum": 0, "industryOrder": 5,
            "childList": [
                {
                    "id": "6d850b4fb8094eaa9559f0e5546d0580", "name": "装备制造", "industryNum": 18, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 3,
                },
                {
                    "id": "acbcd25d2b0c40f99a7fee835082493d", "name": "食品加工", "industryNum": 17, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 2,
                }, {
                    "id": "bd6df84eef794dcea110e61b962eb3fa", "name": "工业制造", "industryNum": 16, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 1,
                },
                {
                    "id": "be5fa164ab6743e9867bac1988e98790", "name": "工业原材料", "industryNum": 20, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 5,
                }, {
                    "id": "cde6423615a64625afd3350c024f8051", "name": "农业原材料", "industryNum": 21, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 6,
                },
                {
                    "id": "d133d62f84f8438ab4b913069d54a8cc", "name": "其他", "industryNum": 22, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 7,
                }, {
                    "id": "e6902dfaf0fc4fc7849ad371340baeca", "name": "电子电器（气）自动化", "industryNum": 19, "industryLevel": 2, "pIndustryNum": 5, "industryOrder": 4,
                }]
        },
        {
            "id": "ed2af2e515874150acda4934c624f959", "name": "商业", "industryNum": 2, "industryLevel": 1, "pIndustryNum": 0, "industryOrder": 2,
        }
    ],
    cardTypeArry: [
        { "name": "身份证", "eName": null, "dictNum": 7, },
        { "name": "护照", "eName": null, "dictNum": 8, },
        { "name": "军官证", "eName": null, "dictNum": 9, },
        { "name": "学生证", "eName": null, "dictNum": 10, },
        { "name": "残疾证", "eName": null, "dictNum": 11, }
    ],
    /**角色列表 */
    roleList: [
        {
            "name": "股东", "eName": "one_sharehodlers", "dictNum": 13, "remark": null,
            "childList": [
                {
                    "name": "职务", "eName": "sharehodlers_position", "dictNum": 19, "remark": null,
                    "childList": [
                        { "name": "优先股股东", "eName": "sharehodlers_position_priority", "dictNum": 22, "remark": null, "childList": null },
                        { "name": "普通股股东", "eName": "sharehodlers_position_ordinary", "dictNum": 23, "remark": null, "childList": null }
                    ]
                },
                {
                    "name": "状态", "eName": "sharehodlers_status", "dictNum": 20, "remark": null,
                    "childList": [
                        { "name": "正常", "eName": "sharehodlers_status_normal", "dictNum": 24, "remark": null, "childList": null },
                        { "name": "冻结", "eName": "sharehodlers_status_freeze", "dictNum": 25, "remark": null, "childList": null },
                        { "name": "离任", "eName": "sharehodlers_status_outgoing", "dictNum": 26, "remark": null, "childList": null }
                    ]
                },
                {
                    "name": "股东类型", "eName": "sharehodlers_type", "dictNum": 21, "remark": null,
                    "childList": [
                        { "name": "企业", "eName": "sharehodlers_type_enterprise", "dictNum": 27, "remark": null, "childList": null },
                        { "name": "自然人", "eName": "sharehodlers_position_natural", "dictNum": 28, "remark": null, "childList": null }
                    ]
                }]
        }, {
            "name": "董事", "eName": "one_director", "dictNum": 14, "remark": null,
            "childList": [{
                "name": "职务", "eName": "director_position", "dictNum": 29, "remark": null,
                "childList": [
                    { "name": "执行董事", "eName": "director_position_executive", "dictNum": 31, "remark": null, "childList": null },
                    { "name": "董事长", "eName": "director_position_chairman", "dictNum": 32, "remark": null, "childList": null },
                    { "name": "独立董事", "eName": "director_position_independent", "dictNum": 33, "remark": null, "childList": null },
                    { "name": "普通董事", "eName": "director_position_ordinary", "dictNum": 34, "remark": null, "childList": null }
                ]
            },
            {
                "name": "状态", "eName": "director_status", "dictNum": 30, "remark": null,
                "childList": [{ "name": "正常", "eName": "director_status_normal", "dictNum": 35, "remark": null, "childList": null },
                { "name": "冻结", "eName": "director_status_freeze", "dictNum": 36, "remark": null, "childList": null },
                { "name": "离任", "eName": "director_status_outgoing", "dictNum": 37, "remark": null, "childList": null }]
            }]
        },
        {
            "name": "经理", "eName": "one_manager", "dictNum": 15, "remark": null, "childList": [
                {
                    "name": "职务", "eName": "manager_position", "dictNum": 38, "remark": null, "childList": [
                        { "name": "总经理", "eName": "manager_position_general", "dictNum": 39, "remark": null, "childList": null },
                        { "name": "副经理", "eName": "manager_position_deputy", "dictNum": 40, "remark": null, "childList": null }
                    ]
                }]
        },
        {
            "name": "财务负责人", "eName": "one_financial", "dictNum": 16, "remark": null,
            "childList": [
                {
                    "name": "职务", "eName": "financial_position", "dictNum": 41, "remark": null, "childList":
                        [
                            { "name": "财务总监", "eName": "financial_position_director", "dictNum": 42, "remark": null, "childList": null },
                            { "name": "财务负责人", "eName": "financial_position_head", "dictNum": 43, "remark": null, "childList": null }
                        ]
                }
            ]
        },
        {
            "name": "监事", "eName": "one_supervisors", "dictNum": 17, "remark": null, "childList": [
                {
                    "name": "职务", "eName": "supervisors_position", "dictNum": 44, "remark": null, "childList":
                        [
                            { "name": "监事会主席", "eName": "supervisors_position_director", "dictNum": 45, "remark": null, "childList": null },
                            { "name": "普通监事", "eName": "supervisors_position_head", "dictNum": 46, "remark": null, "childList": null }
                        ]
                }
            ]
        },
        {
            "name": "员工", "eName": "one_employ", "dictNum": 18, "remark": null, "childList": [
                {
                    "name": "职务", "eName": "supervisors_position", "dictNum": 47, "remark": null, "childList": [
                        { "name": "普通员工", "eName": "supervisors_position_director", "dictNum": 48, "remark": null, "childList": null },
                        { "name": "主管", "eName": "supervisors_position_head", "dictNum": 49, "remark": null, "childList": null },
                        { "name": "副主管", "eName": "supervisors_position_head", "dictNum": 50, "remark": null, "childList": null }
                    ]
                }]
        }
    ]


};

const getters = {

};

const mutations = {
    routermutations(state, arr) {
        state.routermsg = arr
    },
};

const actions = {

    routeractions(context, arr) {
        context.commit('routermutations', arr);
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
