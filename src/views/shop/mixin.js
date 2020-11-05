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
            var result = "" + parseInt(secondTime);
            if(minuteTime > 0) {
                result = "" + parseInt(minuteTime) + ":" + result;
            }
            if(hourTime > 0) {
                result = "" + parseInt(hourTime) + ":" + result;
            }
            return result;            
        },

        //获取时间差距多少分钟
        getDiffMinutes(date){
            let start = Date.parse(new Date(date))
            let end = this.getNowTime()
            var days = end - start
            // console.log(days)
            return this.getMinutes(days);
        },
        getMinutes(mss){
           console.log(mss)
           var minutes = parseInt(mss/ (1000 * 60 ));
           console.log(minutes)
           return minutes
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
