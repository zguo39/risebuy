<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res2) {
						uni.showModal({
							title: '更新提示',
							content: '发现新版本，是否重启应用?',
							cancelColor: '#eeeeee',
							confirmColor: '#FF0000',
							success(res2) {
								if (res2.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '提示',
					content: '检查到有新版本，但下载失败，请检查网络设置',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
		},
		onShow: function() {
			// this.getUserInfo()
		},
		onHide: function() {
			
		},
		data() {
			return {
				userProfile: "",
				nickName: "点击登录",
				headphoto: "",
				token: null
			}
		},
		methods: {
			getUserInfo() {
				uni.getUserProfile({
					desc: 'Wexin',
					success: res => {
						this.userProfile = JSON.parse(res.rawData)
						this.nickName = this.userProfile.nickName
						this.headphoto = this.userProfile.avatarUrl
						console.log(this.nickName);
						let name = this.nickName
						uni.login({
							provider: 'weixin',
							success: async (loginRes) => {
								// console.log(loginRes);
								let result = await this.$httpRequest({
									url: '/user/wxLogin',
									data: {
										code: loginRes.code,
										name,
									}
								})
								this.token = result.token
								uni.setStorageSync('token', result.token)
								uni.setStorageSync('priority', result.priority)
								uni.setStorageSync('nickName', this.nickName)
								uni.setStorageSync('url', this.headphoto)

							}
						});
					}
				})
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-page-body,
	html,
	body {
		height: 100%;
		background-color: #F6F6F6;
	}
</style>
