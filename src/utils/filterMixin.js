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
                return  0
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
                let taxInFee = 0
                let sum = 0 //合计
                for(var i = 0;i<list.length;i++){
                    // console.log(list[i])
                    let element = list[i]
                    total += element.totalPrice ? element.totalPrice : 0
                    // if(list[i].taxStatus == 1){
                    //     taxFee += outFlag ? list[i].totalPrice * outConsumeTax :  list[i].totalPrice * consumeTax
                    // }
                    // if(list[i].seviceStatus == 1){
                    //     service += list[i].totalPrice * servicePrice
                    // }

                    if(element.hotelGoods.taxStatus == 2 && element.seviceStatus == 1){
                        if(outFlag){
                            taxInFee +=  this.getTaxIn_2(outFlag,servicePrice,outConsumeTax,element.totalPrice)
                        }else{
                            taxInFee += this.getTaxIn_2(outFlag,servicePrice,consumeTax,element.totalPrice)
                            service +=  this.getTaxService(servicePrice,consumeTax,element.totalPrice)
                        }
                    }

                //     if(list[i].hotelGoods.taxStatus == 1){
                //         if(list[i].seviceStatus == 1){
                //            //不包含服务税
                //             if(outFlag){
                //                 //  1,1,fasle,out
                //               taxFee +=  list[i].totalPrice  * outConsumeTax
                //             }else{
                //               //  1,1,fasle,in
                //               taxFee += ( list[i].totalPrice + list[i].totalPrice * servicePrice ) * consumeTax
                //             }
                //         }else{
                //             //1,2,ture,out
                //             if(outFlag){
                //                let f = 1.00 + servicePrice
                //                taxFee += ( list[i].totalPrice/f ) * outConsumeTax
                //             }else{
                //                 //1,2,false,in
                //                taxFee += list[i].totalPrice * consumeTax
                //             }
                //         }
                //     }else{
                //         //税内消费税
                //         if(outFlag){
                //             // let per = (1 - 1/(1.00 + outConsumeTax) )
                //             // taxInFee += element.totalPrice * per
                //             if(list[i].seviceStatus == 2){
                //                 taxInFee += this.getTaxIn(outConsumeTax,list[i].totalPrice)
                //             }
                //         }else{
                //             // let per = (1 - 1/(1.00 + consumeTax) )
                //             // taxInFee += element.totalPrice * per
                //             if(list[i].seviceStatus == 2){
                //                 taxInFee += this.getTaxIn(consumeTax,list[i].totalPrice)
                //             }
                //         }




                //     }




                //     if(outFlag == false){
                //         //不包含服务税
                //         if(list[i].seviceStatus == 1){
                //             //不包含消费税
                //             if(list[i].taxStatus == 1){
                //                 service += list[i].totalPrice * servicePrice
                //             }else{
                //                 //包含消费税
                //                 let f = 1.00 + consumeTax
                //                 service += (list[i].totalPrice / f) * servicePrice
                //             }
                //         }
                //     }

                //     if(list[i].seviceStatus == 2){
                //         let tax = outFlag ? outConsumeTax : consumeTax
                //         //不包含消费税
                //         if(list[i].taxStatus == 1){
                //             let s = list[i].totalPrice * servicePrice
                //             taxInFee += this.getTaxInOff(tax,list[i].totalPrice,s)
                //         }else{
                //             //包含消费税
                //             let f = 1.00 + consumeTax
                //             let s = (list[i].totalPrice / f) * servicePrice
                //             taxInFee += this.getTaxInOff(tax,list[i].totalPrice,s)
                //         }
                //     }
                }
                // console.log(total)
                let parms = {
                    total: total ? parseFloat(total).toFixed(0) : 0,
                    service: service ? parseFloat(service).toFixed(0) :0,
                    // taxFee:taxFee ? parseFloat(taxFee).toFixed(0) : 0
                }
                for(let s in parms){
                    sum +=  parseFloat(parms[s])
                }
                parms.taxInFee = taxInFee
                parms.sum = sum
                parms.taxFee = 0
                parms.servicePrice = tax.servicePrice+'%'
                parms.tax =  outFlag ? tax.outConsumeTax+'%' : tax.consumeTax+'%'
                parms.type = outFlag ? 'out' : 'in'
                console.log(parms)
                return parms
            }else{
                let parms = {}
                parms.service = 0
                parms.taxInFee = 0
                parms.servicePrice  =  0
                parms.sum =  0
                parms.tax  = 0
                parms.taxFee = 0
                parms.total  = 0
                parms.type  =  'in'
                return parms
            }

        },

		getTaxIn(tax,price){
			let per = (1 - 1/(1.00 + tax) )
			let taxInFee = price * per
            let t = Math.round(taxInFee *1)/1
			return  t
		},

        getTaxInOff(tax,price,service){
        	let per =(price+service) * (1 - 1/(1.00 + tax) )
        	let taxInFee = parseFloat(per).toFixed(0)
            let t = Math.round(taxInFee *1)/1
            // console.log(tax)
            // console.log(price)
            // console.log(service)
            // console.log(taxInFee)
        	return  t
        },
        //税内消费税(in)
        // [100 /（1+10%）]*20%=91*20%=18
        //先计算服务费
        getTaxIn_2(outFlag,serviceTax,tax,price){
            let s = outFlag ? 0 : this.getTaxService(serviceTax,tax,price)
            // console.log(s) //在计算税内消费税费 // （100+18）*（1-1/（1+10%）
            let per = (price+s) * (1 - 1/(1.00 + tax) )
            // console.log(this.mathNum(per))
            return this.mathNum(per)
        },

        //税内消费税(out)
        // 100*（1-1/（1+10%））=9
        // 公式：商品单价*（1-1/（1+out消费税率））
        getTaxOut_2(tax,price){
            let per = (1 - 1/(1.00 + tax) )
            let taxInFee = price * per
            let t = this.mathNum(taxInFee)
            return  t
        },

        //获取服务费(in)
        // [100 /（1+10%）]*20%=91*20%=18
        //计算服务费
        getTaxService(serviceTax,tax,price){
            let s = this.mathNum(price/(1.00 + tax)) * serviceTax
            return this.mathNum(s)
        },
        //四舍五入
        mathNum(v){
          if(v || typeof(v) == 'number' ){
             return  Math.round(v)
          }
        },


    }
  }
  export default mixin;
