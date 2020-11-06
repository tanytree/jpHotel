<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors:魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
    <div class="boss-index" id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('sale', item.path, true)">
                <!--            &lt;!&ndash; 会员类型管理&ndash;&gt;-->
                <MemberTypeManager v-if="item.path == 'MemberTypeManager'" :memberTypeList="memberTypeList"/>
                <!--            &lt;!&ndash; 会员变更规则&ndash;&gt;-->
<!--                <ChangeRules v-if="item.path == 'member-change'" :memberTypeList="memberTypeList"/>-->
                <!--            &lt;!&ndash; 会员价格&ndash;&gt;-->
<!--                <Memberprice v-if="item.path == 'member-price'" :memberTypeList="memberTypeList"/>-->
                <!--            &lt;!&ndash; 会员查询&ndash;&gt;-->
                <!--                <Vipquery v-if="item.path == 'member-query'" :memberTypeList="memberTypeList"/>-->
                <MemberInfo v-if="item.path == 'member-query'" type="header"/>
                <!--            &lt;!&ndash; 积分设置&ndash;&gt;-->
                <Intergtal v-if="item.path == 'member-integral-set'" :memberTypeList="memberTypeList"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import MemberTypeManager from './member/Personer'
import ChangeRules from './member/changeRules'
import Memberprice from './member/memberPrice'
// import Vipquery from './member/vipquery'
import Member from '@/views/market/customer/member'
import Intergtal from './member/integtal'
import MemberInfo from '@/views/market/customer/vip/info'

export default {
    components: { MemberTypeManager, ChangeRules, Memberprice, Member, Intergtal, MemberInfo },
    data () {
        return {
            menuList: [],
            memberTypeList: [],
            activeName: ''
        }
    },

    created() {
        if (sessionStorage.subMenul) {
            this.menuList = JSON.parse(sessionStorage.subMenul).childList || [];
            this.$forceUpdate()
        }
        debugger
        let activeName = this.$F.filterThirdMenu(null, null, false, true).path;
        this.activeName = this.$store.state.taozi.memberName || activeName;
    },
    mounted () {
        this.getMemberTypeList()
    },

    methods: {
        //二级tab切片
        handleClick (tab, event) {
            this.getMemberTypeList()
        },

        getMemberTypeList () {
            this.$F.commons.fetchMemberTypeList({}, (res) => {
                this.memberTypeList = res.list
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
