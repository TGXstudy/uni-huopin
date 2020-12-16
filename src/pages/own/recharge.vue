<template>
	<view class="cz">
		<view class="nav">
			<p>充值金额(元）</p>
			<view class="sr">
				<span>￥</span>
				<input v-model="num" type="text" placeholder="请输入充值金额" value="" />
			</view>
			<image :src="'mine/wxpay.png' | imgUrl" mode=""></image>
		</view>
		<button class="qr" @click="qr()">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '', //充值数量
				cz_xx: {} //充值信息
			}
		},
		methods: {
			qr() {
				let that = this;
				this.$api.UnifiedRecharge({
					price: this.num
				}).then(res => {
					uni.requestPayment({
						provider: "wxpay",
						timeStamp: res.data.timeStamp, //    String    微信小程序必填    时间戳从1970年1月1日至今的秒数，即当前的时间。    微信小程序
						nonceStr: res.data.nonceStr, //    String    微信小程序必填    随机字符串，长度为32个字符以下。    微信小程序
						package: res.data.package, //    String    微信小程序必填    统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。    微信小程序
						signType: res.data.signType, //    String    微信小程序必填    签名算法，暂支持 MD5。    微信小程序
						paySign: res.data.paySign, //
						success(res) {
							console.log("微信小程序支付", res)
							if (res.errMsg === "requestPayment:ok") {
								that.$mUtils.toast("支付成功")
								that.$mRouter.back();
							} else {}
						},
						fail(res) {
							that.$mUtils.toast("支付失败")
							console.log("微信小程序支付 failfailfail", res);
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cz {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.qr {
			margin-top: 30px;
			width: 95%;
			margin: 0 auto;
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

		.nav {
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			height: 250px;
			background-color: #fff;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			p {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.sr {
				padding-bottom: 10px;
				width: 100%;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				input {
					margin-left: 10px;
				}

				span {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}

			image {
				width: 100%;
				height: 70px;
			}
		}

	}
</style>
