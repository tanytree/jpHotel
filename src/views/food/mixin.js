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
        alert(v,msg){
             if(v == 200){
                 this.$message({
                     type: 'success',
                     message:msg
                 });
            }else{
                this.$message({
                  type: 'info',
                  message: msg
                });
            }
        }



    },
    created() {

    }
};

export default mixin;
