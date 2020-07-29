/*
 * @Date: 2020-07-29 10:27:21
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-29 10:49:37
 * @FilePath: /jiudian/src/utils/filterMixin.js
 */ 
let mixin = {
    data() {
      return {
        msg: 'hello mixin'
      }
    },
    created() {
      console.log('混入的钩子函数');
    },
    methods: {
        F_checkinState(value) {
            let enums = this.$t('commons.checkinState')
            return value && enums[value] ? enums[value] : ''
        },
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
        }


        
    
    }
  }
  export default mixin;