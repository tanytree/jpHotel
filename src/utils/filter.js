/*
 * @Date: 2020-04-24 20:06:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 14:09:44
 * @FilePath: /jiudian/src/utils/filter.js
 */ 
/****************** 全局过滤器 ******************/

// import moment from 'moment'
// import accounting from 'accounting'
const filters = {
	// 金额格式化
	F_formatMoney: function(value) {
		return accounting.formatMoney(value, "", 2, ",", ".")
	},

	// 格式化时间 pattern取值: YYYY-MM-DD / YYYY-MM-DD HH / YYYY-MM-DD HH:mm / YYYY-MM-DD HH:mm:ss
	F_formatDate: function(date, pattern) { // 年月日
		if (date) {
			if (pattern) {
				return moment(date).format(pattern)
			} else {
				return moment(date).format('YYYY-MM-DD')
			}
		} else {
			return ''
		}
	},

	// 手机号脱敏
	F_phone: function(value) {
		if (!value) {
			return ''
		} else {
			value = value.toString()
			return `${value.slice(0, 3)}****${value.slice(-4)}`
		}
	},

	// 身份证号脱敏
	F_idCard: function(value) {
		if (!value) {
			return ''
		} else {
			value = value.toString()
			return `${value.slice(0, 6)}****${value.slice(-2)}`
		}
	},

	// 银行卡号脱敏
	F_bankNo: function(value) {
		if (!value) {
			return ''
		} else {
			value = value.toString()
			return `****${value.slice(-4)}`
		}
	},
	
	
	//格式化距离
	F_distance: function(value) {
		if (value ==null || value=='') {
			return ''
		}else if(value <= 1){
			return '<1m'
		}else if(value >= 1000){
			return (value/1000).toFixed(2)+'km'
		}else if(value < 1000 && value > 1){
			return value+'m'
		}else{
			return ''
		}
	},

	F_visaType(value) {
		let enums = {
			'1': '普通签证',
			'2': '外交签证',
			'3': '公务签证'
		}
		return value && enums[value] ? enums[value] : '其它'
	},
	F_sex(value) {
		let enums = {
			'1': '男',
			'2': '女',
			'3': '保密',
		}
		return value && enums[value] ? enums[value] : '其它'
	},
	F_state(value) {
		let enums = {
			'1': '启用',
			'2': '禁用'
		}
		return value && enums[value] ? enums[value] : '其它'
	},
	F_idcardType(value) {
		let enums = {
			'1': '身份证',
			'2': '护照',
			'3': '驾驶证'
		}
		return value && enums[value] ? enums[value] : '其它'
	},
	F_userStatus(value) {
		let enums = {
			'1': '正式工',
			'2': '实习期',
			'3': '试用期'
		}
		return value && enums[value] ? enums[value] : '其它'
	},
	F_cardState(value) {
		let enums = {
			'1': '正常',
			'2': '已挂失',
			'3': '待启用'
		}
		return value && enums[value] ? enums[value] : '其它'
	},
	F_isBlacklist(value) {
		let enums = {
			'1': '否',
			'2': '是',
		}
		return value && enums[value] ? enums[value] : '否'
	}, 

}

export default {
	install: function(Vue, Option) {
		for (let key in filters) {
			Vue.filter(key, filters[key])
		}
	}
}
