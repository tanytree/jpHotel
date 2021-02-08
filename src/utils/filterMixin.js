/*
 * @Date: 2020-07-29 10:27:21
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-10 17:02:15
 * @FilePath: /jiudian/src/utils/filterMixin.js
 */
let mixin = {
    data() {
      return {
        msg: 'hello mixin'
      }
    },
    created() {

    },
    methods: {
        //过滤星期
        F_weekday(value) {
            let enums = this.$t('commons.weeks')
            let weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
            let string = value;
            weeks.forEach((week,index) => {
                if (value.indexOf(week) != -1) {
                   string = enums[index];
                }
            })
            return string;
        },
        F_checkinState(value) {
            let enums = this.$t('commons.checkinState')
            return value && enums[value] ? enums[value] : ''
        },
        F_payType(value) {
            let enums = this.$t('commons.payType')
            return value && enums[value] ? enums[value] : ''
        },
        F_reserveState(value){
            let enums = this.$t('commons.reserveState')
            return value && enums[value] ? enums[value] : ''
        },
        F_operCheckinType(value){
            let enums = this.$t('commons.operCheckinType')
            return value && enums[value] ? enums[value] : ''
        },
        //客源类型
        F_guestType(value) {
            let enums = this.$t('commons.guestType')
            return value && enums[value] ? enums[value] : ''
        },
        F_orderSource(value) {
            let enums = this.$t('commons.orderSource')
            return value && enums[value] ? enums[value] : ''
        },
        F_billType(value) {
            let enums = this.$t('commons.billType')
            return value && enums[value] ? enums[value] : ''
        },
        F_roomStatus(value) {
            let enums = this.$t('commons.F_roomStatus')
            return value && enums[value] ? enums[value] : ''
        },
        F_getWay(value) {
            let enums = this.$t('frontOffice.getWay')
            return value && enums[value] ? enums[value] : ''
        },
        F_checkinType(value) {
            let enums = this.$t('commons.checkinType')
            return value && enums[value] ? enums[value] : ''
        },
        F_priceType(value) {
            let enums = this.$t('frontOffice.priceType')
            return value && enums[value] ? enums[value] : ''
        },
        F_markCard(value) {
            let enums = this.$t('commons.markCard')
            return value && enums[value] ? enums[value] : ''
        },

        F_visaType(value) {
            let enums = this.$t('commons.F_visaType')
            return value && enums[value] ? enums[value] : ''
        },
        F_sex(value) {
            let enums = this.$t('commons.F_sex')
            return value && enums[value] ? enums[value] : ''
        },
        F_customerTypes(value) {
            let enums = this.$t('commons.customerTypes')
            return value && enums[value] ? enums[value] : ''
        },
        F_state(value) {
            let enums = this.$t('commons.F_state')
            return value && enums[value] ? enums[value] : ''
        },
        F_idcardType(value) {
            let enums = this.$t('commons.idCardType')
            return value && enums[value] ? enums[value] : ''
        },
        F_userStatus(value) {
            let enums = this.$t('commons.userStatus')
            return value && enums[value] ? enums[value] : ''
        },
        F_cardState(value) {
            let enums = this.$t('commons.memberCardState')
            return value && enums[value] ? enums[value] : ''
        },
        F_isBlacklist(value) {
            let enums = this.$t('commons.comShare2or1Flag')
            return value && enums[value] ? enums[value] : ''
        },
        F_is1or2(value) {
            let enums = this.$t('commons.comShareFlag')
            return value && enums[value] ? enums[value] : '';
        },
        F_toward(value) {
            let enums = this.$t('commons.towards')
            return value && enums[value] ? enums[value] : ''
        },
        numFormate(num){
            if (num){
                return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
                        return $1 + ",";
                    });
                });
            }else{
                return num
            }
        },
        getPriceStr(v){

            if(v){
                if(v<0){
                    return Math.abs(v);
                }else{
                    return v
                }
            }


        },
        //迷你吧计算税
        getTaxInfo(tax,list,outFlag){
            //taxStatus1不含税 taxStatus2含税
            //seviceStatus 1不含税 seviceStatus含税
            // console.log(tax)
            //outFlag 默认false 表示是否外带
            // console.log(list)
            if(list && list.length > 0 && tax){
                let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率  type:false
                let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
                let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0
                let total = 0 //所有商品的价格
                let service = 0 //服务费
                let taxFee = 0 //消费税
                let sum = 0 //合计
                for(let i in list){
                    // console.log(list[i].totalPrice)
                    total += list[i].totalPrice ? list[i].totalPrice : 0
                    // if(list[i].taxStatus == 1){
                    //     taxFee += outFlag ? list[i].totalPrice * outConsumeTax :  list[i].totalPrice * consumeTax
                    // }
                    // if(list[i].seviceStatus == 1){
                    //     service += list[i].totalPrice * servicePrice
                    // }

                    if(list[i].taxStatus == 1){
                        if(list[i].seviceStatus == 1){
                           //不包含服务税
                            if(outFlag){
                                //  1,1,fasle,out
                              taxFee +=  list[i].totalPrice  * outConsumeTax
                            }else{
                              //  1,1,fasle,in
                              taxFee += ( list[i].totalPrice + list[i].totalPrice * servicePrice ) * consumeTax
                            }
                        }else{
                            //1,2,ture,out
                            if(outFlag){
                               let f = 1.00 + servicePrice
                               taxFee += ( list[i].totalPrice/f ) * outConsumeTax
                            }else{
                                //1,2,false,in
                               taxFee += list[i].totalPrice * consumeTax
                            }
                        }
                    }
                    if(outFlag == false){
                        //不包含服务税
                        if(list[i].seviceStatus == 1){
                            //不包含消费税
                            if(list[i].taxStatus == 1){
                                service += list[i].totalPrice * servicePrice
                            }else{
                                //包含消费税
                                let f = 1.00 + consumeTax
                                service += (list[i].totalPrice / f) * servicePrice
                            }
                        }
                    }
                }
                console.log(total)
                let parms = {
                    total: total ? parseFloat(total).toFixed(0) : 0,
                    service: service ? parseFloat(service).toFixed(0) :0,
                    taxFee:taxFee ? parseFloat(taxFee).toFixed(0) : 0
                }
                for(let s in parms){
                    sum +=  parseFloat(parms[s])
                }
                parms.sum = sum
                parms.servicePrice = tax.servicePrice+'%'
                parms.tax =  outFlag ? tax.outConsumeTax+'%' : tax.consumeTax+'%'
                parms.type = outFlag ? 'out' : 'in'
                console.log(parms)
                return parms
            }else{
                let parms = {}
                parms.service = 0
                parms.servicePrice  =  0
                parms.sum =  0
                parms.tax  = 0
                parms.taxFee = 0
                parms.total  = 0
                parms.type  =  'in'
                return parms
            }

        },


    }
  }
  export default mixin;
