<template>
	<view class="grzl">
		<view class="one">
			<view class="tx">
				<view class="left">
					设置头像
				</view>
				<view class="right">
					<view class="container">

						<upload-img :maxImgNum="1" :imgNum="0" @getImage="getImages">
							<image class="upload_img"  :src="compressPath" mode="widthFix"><p v-if="!compressPath">+</p></image>
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
			
			<view class="mr_dz">
				<view class="left">
					设置为默认账号
				</view>
				<view class="right">
					<switch checked="status" @change="switch1Change" />
				</view>
			</view>
		</view>


		<button class="qr" @click="qr()">确定</button>
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
				compressPath: '',
				username: '',
				status:'yes',
			}
		},
		onLoad() {
			
		},
	
		methods: {
			switch1Change: function(e) {
				
				if(e.detail.value===true){
					this.status='yes';
					
				}else if(e.detail.value===false){
					this.status='no';
				}
				
			},
			//
			getImages(data) {

				this.compressPath = data[0][0].preview_url
				console.log("-----------", data)
			},

			
			
		
			qr() {
				
				this.$api.add_acount({
					avatar: this.compressPath,
					nickname: this.username,
					default: this.status
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
	.upload_img{
		width:102upx !important;
		height:102upx !important;
	}
	.grzl {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		.container{
			font-size: 20px;
			upload-img{
				display: flex;
			justify-content: center;
			align-items: center;
			}
			
		}
		.mr_dz {
		
			width: 100%;
			background-color: #fff;
			margin-top: 20px;
			height: 50px;
			padding: 10px;
			display: flex;
			justify-content: space-between;
		
			
		}
		
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
