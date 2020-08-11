<template>
	<div class="register-index">
		<div class="body-r">
			<div class="room-title">{{this.$t('login.roomTitle')}}</div>
			<div class="room-name">{{this.$t('login.roomName')}}</div>
		</div>
		<div class="register-body" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" v-if="loginType=='login'">
			<div v-if="!forget" class="title">{{this.$t('login.title')}}</div>
			<el-page-header v-if="forget" @back="() => {this.forget=false;this.forgetStep=1}" title="返回登录"></el-page-header>
			<div class="body-info">
				<div class="body-l" v-if="!forget">
					<el-form :model="loginForm" size="small" validate-on-rule-change :rules="dataRule" ref="loginForm">
						<el-form-item prop="storesNum">
							<el-select v-model="loginForm.storesNum" :placeholder="$t('login.storesNumSelectTip')">
								<el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="account">
							<el-input prefix-icon="el-icon-s-custom" :placeholder="$t('commons.pleaseEnter') + ' ID'" v-model="loginForm.account" maxlength="18"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" prefix-icon="el-icon-lock" :placeholder="$t('commons.pleaseEnter') + $t('commons.passwordDesc')" v-model.trim="loginForm.password" @keyup.enter.native="clickLoginBtn()"></el-input>
						</el-form-item>
						<el-form-item class="login-btns">
							<div class="btn">
								<el-button type="primary" class="submit" @click="clickLoginBtn()" style="width: 100px;">{{this.$t('login.loginBtn')}}</el-button>
								<el-select v-model="language" @change="onLanguageChange" style="width: 100px;">
									<el-option label="中文" value="zh"></el-option>
									<el-option label="日本语" value="ri"></el-option>
								</el-select>
							</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="line"></div>
				<div class="body-l body-r">
					<div class="ma">
						<img src="@/assets/images/login/registerQr.png" alt />
					</div>
					<!--          <div class="detail">扫码二维码，下载指点社区</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getLanguage,
		setLanguage
	} from '@/utils/auth'
	import {
		mapState,
		mapActions
	} from 'vuex'
	import routermsg from '../../store/modules/routermsg'

	export default {
		computed: {
			...mapState({
				msgKey: state => state.config.msgKey,
				routermsg: state => state.routermsg.routermsg,
				plat_source: state => state.config.plat_source
			})
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (!value) {
					callback(new Error(this.parent.$t('commons.pleaseEnter') + this.parent.$t('commons.passwordDesc')))
				} else if (value.toString().length < 6 || value.toString().length > 18) {
					callback(new Error('密码长度为6 - 18个字符'))
				} else {
					callback()
				}
			}
			return {
				language: 'zh', //语言类型  zh中文  ri日文
				loading: false,
				storeList: [],
				isCheck: false,
				forgetStep: 1, // 忘记密码步骤
				forget: false, // 忘记密码
				loginType: 'login', // 登录-注册
				loginForm: {
					storesNum: '',
					account: '',
					password: ''
				},
				dataRule: {
					storesNum: {
						required: true,
						// message: this.$t('login.storesNumSelectTip'),
						message: this.$t('Please enter'),
						trigger: 'change'
					},
					account: {
						required: true,
						// message: this.$t('commons.pleaseEnter') + ' ID',
						message: 'Please enter the' + ' ID',
						trigger: 'change'
					},
					password: [{
						required: true,
						// message: this.$t('commons.pleaseEnter') + this.$t('commons.passwordDesc'),
						message: 'Please enter the' + ' password',
						trigger: 'change'
					}]
				}
			}
		},
		mounted() {
			this.$F.doRequest(this, '/pms/freeuser/stores_list', {
				filterHeader: true
			}, (data) => {
				this.storeList = data;
			})
			this.language = getLanguage() || 'zh';
            this.$i18n.locale = this.language;
		},
		methods: {
			...mapActions({
				saveuser: 'user/saveuser',
				routeractions: 'routermsg/routeractions',
			}),

			onLanguageChange() {
				setLanguage(this.language);
                this.$i18n.locale = this.language;
                sessionStorage.locale = this.language;
			},

			userIsLogin(data) {
				data.data.storesInfo = this.storeList.filter((item) => {
					return item.storesNum == this.loginForm.storesNum
				})[0];
				this.saveuser(data)
				var array = {
					"id": "menuAssert",
					"menuTitle": "维护菜单（开发用）",
					"menuAliasTitle": "维护菜单",
					"japanese": "维护菜单",
					"parentMenuId": null,
					"icon": "icon06",
					"path": "",
					"menuLevel": 1,
					"menuType": 1,
					"status": 1,
					"menuorder": 1,
					"childList": [{
						"id": "menuAssert2",
						"createTime": "2020-07-05 15:01:00",
						"updateTime": "2020-07-05 15:01:00",
						"menuTitle": "首页",
						"menuAliasTitle": null,
						"japanese": "ホームページ",
						"parentMenuId": "menuAssert",
						"icon": "boss/nav01.png",
						"path": "menuAssert",
					}]
				}
				this.onLanguageChange(); //保存选中语言
				data.data.menuList.push(array);
				this.routeractions(data.data.menuList);
				let url = 'main'
				this.$forceUpdate()
				this.$router.push({
					path: '/main'
				})
			},

			userIsLogin(data) {
				data.data.storesInfo = this.storeList.filter((item) => {
					return item.storesNum == this.loginForm.storesNum
				})[0];
				this.saveuser(data)
				// debugger
				// const routeArray = this.$F.handleTree(data.data.user.userAuth, this.routermsg)

				var array = {
					"id": "menuAssert",
					"menuTitle": "维护菜单（开发用）",
					"menuAliasTitle": "维护菜单",
					"japanese": "维护菜单",
					"parentMenuId": null,
					"icon": "icon06",
					"path": "",
					"menuLevel": 1,
					"menuType": 1,
					"status": 1,
					"menuorder": 1,
					"childList": [{
						"id": "menuAssert2",
						"createTime": "2020-07-05 15:01:00",
						"updateTime": "2020-07-05 15:01:00",
						"menuTitle": "首页",
						"menuAliasTitle": null,
						"japanese": "ホームページ",
						"parentMenuId": "menuAssert",
						"icon": "boss/nav01.png",
						"path": "menuAssert",
					}]
				}
				data.data.menuList.push(array);
				this.routeractions(data.data.menuList);
				let url = 'main'
				// if (data.data && data.data.belongTo.length > 0) {
				//   this.companyInit(data.data.belongTo[0]);
				//   url = "main";
				// }
				this.$forceUpdate()
				this.$router.push({
					path: '/main'
				})
				// this.$router.push({
				//   name: url
				// });
			},

			loginAction() {
				this.$router.push({
					name: 'main'
				})
			},

			clickLoginBtn(params = {
				loginType: 5
			}) {
				this.$refs['loginForm'].validate(valid => {
					if (valid) {
						this.$F.merge(params, this.loginForm)
						this.$F.doRequest(this, '/pms/freeuser/login', params, (res) => {
							sessionStorage.account = this.loginForm.account
							sessionStorage.password = this.loginForm.password
							this.userIsLogin({
								data: res
							})
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-btns .btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.body-r {
		color: #FFFFFF;
		font-size: 30px;
		line-height: 200%;
		letter-spacing: 3px;
		.room-name {
			font-size: 25px;
		}
	}
	.register-index {
		background: url(../../assets/images/login/background.png) no-repeat;
		width: 100%;
		height: 100%;
		position: relative;
		background-size: cover;
		background-position: center;
		display: flex;
		justify-content: center;
		align-items: center;
		justify-content: space-around;

		>.register-body {
			background-color: #ffffff;
			width: 650px;
			padding: 50px;
			text-align: center;
			min-height: 360px;
			border-radius: 6px;

			>.title {
				font-size: 18px;
				font-weight: bold;
				padding-bottom: 10px;
			}

			>.body-info {
				display: flex;
				height: 225px;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.register-body .body-info .body-l {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	.body-l {
		.el-form {
			padding: 20px 0;
		}

		// .el-form-item {
		// margin-bottom: 10px;
		// }
	}

	.register-body .body-info .line {
		height: 120px;
		width: 1px;
		background-color: #d1d1d1;
		margin-left: 40px;
		margin-bottom: 20px;
	}

	.contentR {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.img {
			width: 160px;

			height: 160px;
		}
	}

	.register-body .body-info .body-l .tag {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}

	.register-body .body-info .body-l .tag button {
		border: none;
		background-color: inherit;
	}

	.register-body .body-info .body-r {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
	}

	.register-body .body-info .body-l .ma {
		background-color: #fff;
		height: 120px;
		width: 120px;
		margin-bottom: 10px;
		display: flex;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.register-body .body-info .body-l .detail {
		font-size: 15px;
		padding-top: 10px;
	}

	.body-info .el-form .el-select {
		width: 100%;
	}
</style>
