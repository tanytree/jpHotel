

import { getSysTime } from "../../utils/api/shop.js";
const mixin= {
    data() {
        return {
            optionsList:[]
        };
    },

    methods: {
        getNewCateList(list){
           if(list && list.length > 0 ){
               let arr = []
               for(let i in list){
                   arr.push({
                       value:list[i].id,
                       label:list[i].name,
                       children:this.getNewCateList(list[i].childList)
                   })
               }
               return arr
            }
        },

        //获取逗号分隔的字符串
        getArr(list){
            if(list.length > 0){
                let arr = []
                for(let i in list){
                    arr = [...arr,list[i].id]
                }
                return arr.join(",");
            }
        },
        //数组去重
        noRepeat(arr) {
            var newArr = [];
            for(var i=0,l = arr.length; i < l; i++) {
                for(var j=i+1;j<l;j++) {
                    if(JSON.stringify(arr[i]) == JSON.stringify(arr[j])) j = ++i;
                }
                newArr.push(arr[i]);
            }
            // console.log(newArr);
            return newArr;
        },

        //获取当前时间
        getNowTime(){
            return  Date.parse(new Date());
        },

        //获取时间差距的时间戳->时分秒
        getDiffDate(date,over){



            let start = Date.parse(new Date(date))
            let end = this.getNowTime();
            if(over){
                end = Date.parse(new Date(over))
            }

            // console.log(date)
            // console.log(over)


            let days = end - start
            // console.log(days)
            return this.formatDuring(days);
        },

        //秒转化为分秒时
        formatDuring(value) {
            var secondTime = parseInt(value/1000);// 秒
            // console.log(secondTime)
            var minuteTime = 0;// 分
            var hourTime = 0;// 小时
            var s = 0
            if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
                //获取分钟，除以60取整数，得到整数分钟
                minuteTime = parseInt(secondTime / 60);
                //获取秒数，秒数取佘，得到整数秒数
                secondTime = parseInt(secondTime % 60);
                //如果分钟大于60，将分钟转换成小时
                if(minuteTime > 60) {
                    //获取小时，获取分钟除以60，得到整数小时
                    hourTime = parseInt(minuteTime / 60);
                    //获取小时后取佘的分，获取分钟除以60取佘的分
                    minuteTime = parseInt(minuteTime % 60);
                    // s = parseInt(minuteTime % 60);
                }
            }
            var result = parseInt(secondTime) < 10  ? "0" + parseInt(secondTime) : ""+parseInt(secondTime);
            if(s > 0) {
                result = parseInt(s) < 10  ? "0" + parseInt(s) : "" + parseInt(s) + ":" + result;
            }
            if(minuteTime > 0) {
                result = parseInt(minuteTime) < 10  ? "0" + parseInt(minuteTime) : "" + parseInt(minuteTime) + ":" + result;
            }
            if(hourTime > 0) {
                result = "" + parseInt(hourTime) + ":" + result;
            }
            // console.log(result)
            return result;
        },

        //获取时间差距多少分钟
        getDiffMinutes(date,systime){
            let start = Date.parse(new Date(date))
            let end = this.getNowTime()
            if(systime){
                end =  Date.parse(new Date(systime))
            }
            // console.log(systime)
            // console.log('date-------'+date)
            // console.log('systime----'+systime)
            // console.log(start)
            // console.log(end)

            var days = (end - start)/1000

            // console.log(days)
            return this.getMinutes(days);
        },
        getMinutes(v){
           var minutes = parseInt(v/ 60);
           return minutes
        },



        getFinalFee(data,systime,createTime,tax,outFlag){
            // console.log('=========================')
            // console.log(data)
            // console.log(createTime)
            // console.log(systime)
            // console.log(tax)
            // console.log(outFlag)
            // console.log('=========================')


            if(!systime || !createTime){
                return  0
            }

            //data.priceModel == 2 按时间 data.priceModel == 1 按次
            if(data.priceModel == 2){
                let startPrice = data.startPrice //起步价
                let allMinutes = this.getDiffMinutes(createTime,systime) //项目总时间
                console.log('项目开始时间'+createTime)
                console.log('项目当前时间'+systime)
                console.log('项目总时间'+allMinutes)
                console.log('起步价开始时间：'+ data.priceStartMinute)
                let  halfTime = data.priceTime / 2
                // console.log('获取半次收费规则的时间'+halfTime)
                let halfPice = data.minutePrice / 2
                // console.log('获取半次收费规则的金额'+halfPice)
                let sum = 0
                let totSum = 0
                if(allMinutes < data.priceStartMinute ){
                    sum = 0
                }else if( allMinutes >  data.priceStartMinute &&  allMinutes < halfTime){
                    sum = startPrice
                }else{
                    let count = allMinutes / halfTime
                    let c = parseFloat((count+'').split('.')[0])+1
                    // console.log(parseFloat((count+'').split('.')[0])+1)
                    // console.log(c)
                    sum =  c *  halfPice
                }
                if(data.capsPriceFlag == 2){
                    // 2 表示设置了封顶费
                    if(sum > data.capsPrice){
                        //费用大于封顶费 则为最终费用
                        totSum =  data.capsPrice
                    }else{
                        totSum =  sum
                    }
                }else{
                     totSum =  sum
                }
                // console.log(totSum)
                return totSum

            }
        },



        // 1:'前台点餐',
        // 2:'IPAD点餐',
        // 3:'H5点餐'

        getSource(v){
            // console.log(v)
            let arr = {
                1:'PC',
                2:'IPAD',
                3:'其他'
            }
            return arr[v]
        },

        numFormate(num){
            if (num){
                return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
                        return $1 + ",";
                    });
                });
            }else{
                return 0
            }
            // // console.log(a);
            //   if (!a){
            //    return ' '
            //     }
            //   var intPartFormat = (Math.round(a * 100) / 100).toFixed(0).toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ",";});
            //   return intPartFormat
        },
        //已结账
        getOrderHasPayTaxInfo(tax,info,outFlag){
            let list = info.orderSubList
            list.forEach(elements => {
                elements.taxStatus = elements.goods.taxStatus
                elements.seviceStatus = elements.goods.seviceStatus
            });
            console.log(list)
            if(list && list.length > 0 && tax){
               let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率  type:false
               let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
               let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0
               let total = 0 //税前税后总的税钱
               let service = 0 //服务费
               let taxFee = 0 //消费税
               let sum = 0 //合计
                list.forEach(element => {
                    if(element.goods.categoryType == 2 && element.goods.priceModel == 2){
                       // let data = element
                       let createTime = info.createTime
                       let TP = this.getFinalFee(element.goods,element.updateTime,element.createTime,tax,outFlag)
                       element.totalPrice = TP
                       // console.log(list[i].totalPrice)
                    }
                   // console.log(list[i].goods.priceModel)
                    total += element.totalPrice
                    // if(list[i].taxStatus == 1){
                    //    taxFee += outFlag ? list[i].totalPrice * outConsumeTax :  list[i].totalPrice * consumeTax
                    // }
                    // if(list[i].seviceStatus == 1){
                    //    service += list[i].totalPrice * servicePrice
                    // }

                    if(element.taxStatus == 1){
                        if(element.seviceStatus == 1){
                           //不包含服务税
                            if(outFlag){
                                //  1,1,fasle,out
                              taxFee +=  element.totalPrice  * outConsumeTax
                            }else{
                              //  1,1,fasle,in
                              taxFee += ( element.totalPrice + element.totalPrice * servicePrice ) * consumeTax
                            }
                        }else{
                            //1,2,ture,out
                            if(outFlag){
                               let f = 1.00 + servicePrice
                               taxFee += ( element.totalPrice/f ) * outConsumeTax
                            }else{
                                //1,2,false,in
                               taxFee += element.totalPrice * consumeTax
                            }
                        }
                    }
                    if(outFlag == false){
                        //不包含服务税
                        if(element.seviceStatus == 1){
                            //不包含消费税
                            if(element.taxStatus == 1){
                                service += element.totalPrice * servicePrice
                            }else{
                                //包含消费税
                                let f = 1.00 + consumeTax
                                service += (element.totalPrice / f) * servicePrice
                            }
                        }
                    }
               })
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
                parms.type  = outFlag ? 'out' : 'in'
                return parms
            }


        },
        //未结账
        getTaxInfo(tax,list,outFlag,endTime,info){
            //outFlag 默认false 表示是否外带
            if(list && list.length > 0 && tax){
                let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率  type:false
                let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
                let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0
                let total = 0 //税前税后总的税钱
                let service = 0 //服务费
                let taxFee = 0 //消费税

                let taxInFee = 0

                let sum = 0 //合计
                list.forEach(element => {
                // for(let i in list){
                    if(element.goods.categoryType == 2 && element.goods.priceModel == 2){
                            let data = element
                            let createTime = info.createTime
                            // console.log('按时间计费')
                            // console.log('------------------------------------------')

                            // console.log(data)
                            // console.log(createTime)
                            // console.log(endTime)
                            // console.log(tax)
                            // console.log(outFlag)
                            let TP = this.getFinalFee(data.goods,endTime,createTime,tax,outFlag)
                            data.totalPrice = TP
                            console.log(element.totalPrice)
                            // console.log(TP)
                            // console.log('------------------------------------------')
                            // console.log('按时间计费')
                    }
                    // console.log(list[i].goods.categoryType)
                    // console.log(list[i].goods.priceModel)
                    total += element.totalPrice
                    //不包含消费税
                    // console.log(list[i].taxStatus)
                    // console.log(list[i].seviceStatus)
                    // console.log(list[i])
                    if(element.taxStatus == 1){
                        if(element.seviceStatus == 1){
                           //不包含服务税
                            if(outFlag){
                                //  1,1,fasle,out
                                taxFee += element.totalPrice  * outConsumeTax
                            }else{
                                //  1,1,fasle,in
                                taxFee += ( element.totalPrice + element.totalPrice * servicePrice ) * consumeTax
                            }
                        }else{
                            //  1,2,ture,out
                            if(outFlag){
                               let f = 1.00 + servicePrice
                               taxFee += ( element.totalPrice/f ) * outConsumeTax
                            }else{
                                //1,2,false,in
                               taxFee += element.totalPrice * consumeTax
                            }
                        }
                    }else{
                        //税内消费税
                        if(outFlag){


                            // let per = (1 - 1/(1.00 + outConsumeTax) )
                            // taxInFee += element.totalPrice * per
                            taxInFee += this.getTaxIn(outConsumeTax,element.totalPrice)


                        }else{
                            // let per = (1 - 1/(1.00 + consumeTax) )
                            // taxInFee += element.totalPrice * per
                            taxInFee += this.getTaxIn(consumeTax,element.totalPrice)
                        }




                    }

                    if(outFlag == false){
                        //不包含服务税
                        if(element.seviceStatus == 1){
                            //不包含消费税
                            if(element.taxStatus == 1){
                                service += element.totalPrice * servicePrice
                            }else{
                                //包含消费税
                                let f = 1.00 + consumeTax
                                service += (element.totalPrice / f) * servicePrice
                            }
                        }
                    }
                })
                let parms = {
                    total: total ? parseFloat(total).toFixed(0) : 0,
                    service: service ? parseFloat(service).toFixed(0) :0,
                    taxFee:taxFee ? parseFloat(taxFee).toFixed(0) : 0
                }
                for(let s in parms){
                    sum +=  parseFloat(parms[s])
                }
                parms.sum = sum
                parms.taxInFee = taxInFee
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
                parms.taxInFee = taxInFee
                parms.type  = outFlag ? 'out' : 'in'
                return parms
            }

        },

        getTaxIn(tax,price){
        	let per = (1 - 1/(1.00 + tax) )
        	let taxInFee = price * per
            let t = Math.round(taxInFee *1)/1
        	return  t
        },
        alert(v,msg){
             if(v == 200){
                 this.$message({
                     type: 'success',
                     message:msg
                 });
            }else{
                this.$message({
                  type: 'error',
                  message: msg
                });
            }
        }
    },
    created() {

    }
};

export default mixin;
