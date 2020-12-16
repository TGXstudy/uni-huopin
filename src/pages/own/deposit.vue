<template>
	<view class="cz">
		<view class="nav">
			<p>提现金额(元）</p>
			<view class="sr">
				<span>￥</span>
				<input type="digit" v-model="num" placeholder="请输入提现金额" value="" />
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
				num: '', //提现数量
			}
		},
		methods: {
			qr() {
				this.$api.deposit({
					wit_money: this.num
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.back()
						}, 2000)
					} else {
						this.$mUtils.toast(res.msg)
					}
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
