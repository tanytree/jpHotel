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
        getDiffDate(date) {
            let start = Date.parse(new Date(date))
            let end = this.getNowTime()
            var days = end - start
            return this.formatDuring(days);
        },

        //时间转化为分秒时
        formatDuring(mss) {
           console.log(mss)
           var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
           var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
           var seconds = (mss % (1000 * 60)) / 1000;
           hours = hours < 10 ? ('0' + hours) : hours;
           minutes = minutes < 10 ? ('0' + minutes) : minutes;
           seconds = seconds < 10 && seconds >= 1 ? ('0' + seconds) : seconds;
           return  hours + ":" + minutes + ":" + seconds;
        },


        //获取时间差距多少分钟
        getDiffMinutes(date){
            let start = Date.parse(new Date(date))
            let end = this.getNowTime()
            var days = end - start
            console.log(days)
            return this.getMinutes(days);
        },
        getMinutes(mss) {
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
