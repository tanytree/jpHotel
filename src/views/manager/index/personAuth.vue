<template>
	<div>
		<div class="second-body">
			<div class="title">
				<span>管理部</span>
			</div>
			<div class="row-body">
				<div class="row-line">
					<div class="row-item">
						<img class="row-img" src="../../../assets/images/caigou/kuai01.png" alt="">
						<span class="default-text">章欣</span>
						<span class="active-facus">总经理</span>
					</div>
					<div class="row-item">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">
								操作<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="a">查看资料</el-dropdown-item>
								<el-dropdown-item command="b">权限设置</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			handleCommand() {},
		}
	}
</script>

<style>
</style>
