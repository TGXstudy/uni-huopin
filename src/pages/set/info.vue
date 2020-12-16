<template>
	<view class="grzl">
		<view class="one">
			<view class="tx">
				<view class="left">
					更换头像
				</view>
				<view class="right">
					<view class="container">

						<upload-img :maxImgNum="1" :imgNum="0" @getImage="getImages">
							<image :src="compressPath" mode="widthFix"></image>
						</upload-img>

					</view>
				</view>
			</view>

			<view class="name">
				<view class="left">
					用户名
				</view>
				<view class="right">
					<input placeholder="请输入昵称" v-model="username" type="text" value="" />
				</view>
			</view>
		</view>

		<view class="two">
			<view class="tx">
				<view class="left">
					推荐人(不可修改推荐人)
				</view>
				<view class="right">
					<input  v-bind:disabled="disabled" placeholder="请输入推荐人推荐码" v-model="tjr_bm" type="text" value="" />
				</view>
			</view>

			<view class="name">
				<view class="left">
					推荐码
				</view>
				<view class="right">
					{{invitation_code}}
				</view>
			</view>
			<view class="name">
				<view class="left">
					账号ID
				</view>
				<view class="right">
					{{zh_id}}
				</view>
			</view>
		</view>
		<button class="qr" @click="qr()">确定保存</button>
	</view>
</template>

<script>
	import uploadImg from "@/components/UploadImg.vue"
	export default {
		components: {
			uploadImg
		},
		data() {
			return {
				disabled:false,//输入框禁用
				compressPath: '',
				username: '',
				tjr_bm: '',
				zh_id:'',//账号id
				invitation_code:'',//推荐码
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		// watch: {
		// 	compressPath(val) {
		// 		console.log(val, "监听方法");
		// 	},
		// },
		methods: {
			//
			getImages(data) {

				this.compressPath = data[0][0].preview_url
				console.log("-----------", data)
			},

			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					console.log(res)
					this.username=res.data.nickname;
					this.tjr_bm=res.data.p_invitation_code;
					this.compressPath = res.data.avatar;
					this.zh_id=res.data.wx_nickname;
					this.invitation_code=res.data.invitation_code;
					this.$mUtils.timeout(res=>{
						if(this.tjr_bm){
							this.disabled=true
						}else{
							this.disabled=false
						}
					})
				})
			},
			//64编码
			getBase64(file) {
				return new Promise(function(resolve, reject) {
					let reader = new FileReader();
					let imgResult = "";
					reader.readAsDataURL(file);
					reader.onload = function() {
						imgResult = reader.result;
					};
					reader.onerror = function(error) {
						reject(error);
					};
					reader.onloadend = function() {
						resolve(imgResult);
					};
				});
			},
			selectPhoto() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log("头像", res.tempFiles[0])
						that.$mUtils.qiniu(res.tempFiles[0])
					}
				});
			},
			qr() {
				this.$api.check_info({
					avatar: this.compressPath,
					nickname: this.username,
					invitation_code: this.tjr_bm
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mRouter.back()
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grzl {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.qr {
			margin: 0 auto;
			margin-top: 30px;
			width: 95%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			outline: none;
			color: #fff;
		}

		.one {
			background-color: #fff;
			width: 100%;
			display: flex;
			flex-direction: column;

			.tx {
				width: 100%;
				padding: 10px;
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.left {}

				.right {
					image {
						width: 60px;
						height: 60px;

					}
				}
			}

			.name {
				width: 100%;
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {}

				.right {
					input {
						text-align: right;
					}
				}
			}
		}

		.two {
			margin-top: 20px;
			background-color: #fff;
			width: 100%;
			display: flex;
			flex-direction: column;

			.tx {
				width: 100%;
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.left {}

				.right {
					input {
						text-align: right;
					}
				}
			}

			.name {
				width: 100%;
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {}

				.right {
					input {
						text-align: right;
					}
				}
			}
		}

	}
</style>
