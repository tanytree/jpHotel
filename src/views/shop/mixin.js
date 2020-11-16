

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
            var days = end - start
            return this.formatDuring(days);
        },

        //秒转化为分秒时
        formatDuring(value) {
            var secondTime = parseInt(value/1000);// 秒
            var minuteTime = 0;// 分
            var hourTime = 0;// 小时
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
                }
            }
            var result = parseInt(secondTime) < 10  ? "0" + parseInt(secondTime) : ""+parseInt(secondTime);
            if(minuteTime > 0) {
                result = parseInt(minuteTime) < 10  ? "0" + parseInt(minuteTime) : "" + parseInt(minuteTime) + ":" + result;
            }
            if(hourTime > 0) {
                result = "" + parseInt(hourTime) + ":" + result;
            }
            return result;
        },

        //获取时间差距多少分钟
        getDiffMinutes(date,systime){
            let start = Date.parse(new Date(date))
            let end = this.getNowTime()
            if(systime){
                end =  Date.parse(new Date(systime))
            }
            var days = (end - start)/1000
            // console.log(systime)
            // console.log(start)
            // console.log(end)
            // console.log(days)
            return this.getMinutes(days);
        },
        getMinutes(v){
           var minutes = parseInt(v/ 60);
           return minutes
        },
        getFinalFee(data,systime){
            console.log(data)
                //data.priceModel == 2 按时间 data.priceModel == 1 按次
                if(data.priceModel == 2){
                    let startPrice = data.startPrice
                    // console.log(startPrice)
                    // console.log('项目开始时间'+data.createTime)
                    let allMinutes = this.getDiffMinutes(data.createTime,systime)
                    // console.log('项目当前时间'+systime)
                    // let allMinutes =
                    // console.log(allMinutes)
                    // console.log(res.poorSeconds/60)

                    // console.log('起步价'+startPrice)//起步价
                    // console.log('服务项目所在的全部分钟数'+allMinutes)//服务项目所在的全部分钟数
                    // console.log('服务的使用时间是否大于起步价开始计算时间'+ allMinutes > data.priceStartMinute)//服务的使用时间是否大于起步价开始计算时间
                    //全部分钟数》起步价设置的分钟数
                    if( allMinutes > data.priceStartMinute){
                        // 设置价格为起步价
                        let a = parseFloat(allMinutes - data.priceStartMinute)//获取减去起步时间的分钟数
                        // console.log('获取减去起步时间的分钟数'+a)
                        // console.log('从多少分钟开始收费'+data.priceTime)
                        let b = parseFloat(a/data.priceTime)
                        let c = parseFloat((b+'').split('.')[0])+1//除去起步时间后的次数
                        // console.log("除去起步时间后的次数"+c)
                        let d = parseFloat(c * data.minutePrice )//  除去起步时间后的总费用
                        // console.log("除去起步时间后的总费用"+d)
                        let ap = 0    //判断是否设置封顶费的总费用
                        if(data.capsPriceFlag == 2){
                            // 2 表示设置了封顶费
                            if(d > data.capsPrice){
                                //费用大于封顶费 则为最终费用
                                ap = data.capsPrice
                            }else{
                                ap = d
                            }
                        }else{
                             ap = d
                        }
                        // console.log(ap)
                        let fee = parseFloat(startPrice) + parseFloat(ap)
                        return fee
                    }else{
                        return startPrice
                    }
                }
        },


        // 1:'前台点餐',
        // 2:'IPAD点餐',
        // 3:'H5点餐'

        getSource(v){
            // console.log(v)
            let arr = {
                1:'售卖点',
                2:'IPAD',
                3:'其他'
            }
            return arr[v]
        },

        numFormate(a){
            // console.log(a);
              if (!a){
               return ' '
                }
              var intPartFormat = (Math.round(a * 100) / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ",";});
              return intPartFormat
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
