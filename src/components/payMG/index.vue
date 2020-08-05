<template>
	<div class="boss-index">
		<el-tabs class="pageTab" v-model="activeName">
            <!--薪酬管理-->
			<el-tab-pane label="薪酬管理" name="pay-manager">
                <Manager></Manager>
			</el-tab-pane>
			<!-- 薪酬设置 -->
			<el-tab-pane label="薪酬设置" name="pay-set">
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
