/*
 * @Date: 2020-04-24 20:06:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-14 15:52:32
 * @FilePath: /jiudian/src/utils/filter.js
 */
/****************** 全局过滤器 ******************/

import commonsZh from '@/assets/languages/commons/commonsZh'
import commonsRi from '@/assets/languages/commons/commonsRi'
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
    //
	F_visaType(value) {
        let enums = sessionStorage.locale == 'ri' ? commonsRi.F_visaType : commonsZh.F_visaType;
		return value && enums[value] ? enums[value] : '其它'
	},
	F_sex(value) {
        let enums = sessionStorage.locale == 'ri' ? commonsRi.F_sex : commonsZh.F_sex;
		return value && enums[value] ? enums[value] : '其它'
	},
	F_state(value) {
		let enums = sessionStorage.locale == 'ri' ? commonsRi.F_state : commonsZh.F_state;
		return value && enums[value] ? enums[value] : '其它'
	},
	F_idcardType(value) {
        let enums = sessionStorage.locale == 'ri' ? commonsRi.idCardType : commonsZh.idCardType;
		return value && enums[value] ? enums[value] : '其它'
	},
	F_userStatus(value) {
        let enums = sessionStorage.locale == 'ri' ? commonsRi.userStatus : commonsZh.userStatus;
		return value && enums[value] ? enums[value] : '其它'
	},
	F_cardState(value) {
        let enums = sessionStorage.locale == 'ri' ? commonsRi.memberCardState : commonsZh.memberCardState;
		return value && enums[value] ? enums[value] : ''
	},
	F_isBlacklist(value) {
		let enums = {
			'1': '否',
			'2': '是',
		}
		return value && enums[value] ? enums[value] : '否'
	},
	F_is1or2(value) {
		let enums = sessionStorage.locale == 'ri' ? commonsRi.comShareFlag : commonsZh.comShareFlag
		return value && enums[value] ? enums[value] : '';
	},
	F_toward(value) {
        let enums = sessionStorage.locale == 'ri' ? commonsRi.towards : commonsZh.towards;
		return value && enums[value] ? enums[value] : ''
	}

}

export default {
	install: function(Vue, Option) {
		for (let key in filters) {
			Vue.filter(key, filters[key])
		}
	}
}
