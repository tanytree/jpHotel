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
        numFormate(num){
            // console.log(num);
            if (num){
                return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
                        return $1 + ",";
                    });
                });
            }else{
                return 0
            }
            // var intPartFormat = (Math.round(a * 100) / 100).toFixed(0).toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ",";});
            // return intPartFormat
        },
        //计算税
        getTaxInfo(tax,list,outFlag){
            //taxStatus1不含税 taxStatus2含税
            //seviceStatus 1不含税 seviceStatus含税
            console.log(tax)
            //outFlag 默认false 表示是否外带
            if(list && list.length > 0 && tax){
                let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率  type:false
                let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
                let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0
                let total = 0 //所有商品的价格
                let service = 0 //服务费
                let taxFee = 0 //消费税
                let sum = 0 //合计
                let taxInFee = 0

                list.forEach(element => {




                // for(let i in list){
                    console.log(element)
                    total += element.totalPrice
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
                    }else{
                        //税内消费税
                        if(outFlag){
                            // let per = (1 - 1/(1.00 + outConsumeTax) )
                            // taxInFee += element.totalPrice * per
                            if(element.seviceStatus == 1){
                                taxInFee += this.getTaxIn(outConsumeTax,element.totalPrice)
                            }
                        }else{
                            // let per = (1 - 1/(1.00 + consumeTax) )
                            // taxInFee += element.totalPrice * per
                            if(element.seviceStatus == 1){
                               taxInFee += this.getTaxIn(consumeTax,element.totalPrice)
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

                    if(element.seviceStatus == 2){
                        let tax = outFlag ? outConsumeTax : consumeTax
                        //不包含消费税
                        if(element.taxStatus == 1){
                            let s = element.totalPrice * servicePrice
                            taxInFee += this.getTaxInOff(tax,element.totalPrice,s)
                        }else{
                            //包含消费税
                            let f = 1.00 + consumeTax
                            let s = (element.totalPrice / f) * servicePrice
                            taxInFee += this.getTaxInOff(tax,element.totalPrice,s)
                        }
                    }



                // }

                });
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
                parms.taxInFee = taxInFee
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
