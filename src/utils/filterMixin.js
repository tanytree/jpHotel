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
        F_checkinState(value) {
            let enums = this.$t('commons.checkinState')
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
        }



    }
  }
  export default mixin;
