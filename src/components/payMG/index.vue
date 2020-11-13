<template>
	<div class="boss-index">
		<el-tabs class="pageTab" v-model="activeName">
            <!--薪酬管理-->
			<el-tab-pane :label="$t('boss.add_paymentManage')" name="pay-manager">
                <Manager></Manager>
			</el-tab-pane>
			<!-- 薪酬设置 -->
			<el-tab-pane :label="$t('boss.add_paymentSet')" name="pay-set">
				<Set></Set>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import Set from './set'
  import Manager from './manager'
	export default {
      components: { Set, Manager },
      data () {
        return {
          activeName: 'pay-manager'
        };
      }
	};
</script>
