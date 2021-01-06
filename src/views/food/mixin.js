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
            }
            // var intPartFormat = (Math.round(a * 100) / 100).toFixed(0).toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ",";});
            // return intPartFormat
        },
        //计算税
        getTaxInfo(tax,list,outFlag){
            //outFlag 默认false 表示是否外带
            if(list && list.length > 0 && tax){
                let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率  type:false
                let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
                let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0
                let total = 0 //税前税后总的税钱
                let service = 0 //服务费
                let taxFee = 0 //消费税
                let sum = 0 //合计
                for(let i in list){
                    total += list[i].totalPrice
                    if(list[i].taxStatus == 1){
                        taxFee += outFlag ? list[i].totalPrice * outConsumeTax :  list[i].totalPrice * consumeTax
                    }
                    if(list[i].seviceStatus == 1){
                        service += list[i].totalPrice * servicePrice
                    }
                }
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
