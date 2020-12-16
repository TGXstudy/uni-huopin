<template>
	<view class="dh">
		<view class="top">
			<view class="top_a">
				<p>兑换数量</p>
				<input type="text" v-model="num" placeholder="请输入要转换的商城钱包" value="" />
			</view>
			<view class="top_b">
				<view class="one">
					<view class="left">
						<p>可兑换商城钱包:</p>
						<p class="sl">{{wallet}}</p>
					</view>
					<view class="right">
						<p @tap="qbdh()">全部兑换</p>
					</view>
				</view>
				<view class="two">
					可获得商城余额
				</view>
				<view class="three">
					{{hd_ye}}
				</view>
			</view>
			<view class="top_c">
				商城钱包兑换商场余额需要扣去{{sxf}}%手续费；
			</view>

		</view>
		<button class="qr" @click="qr()">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '', //数量
				wallet_to_balance: "", //兑换比例
				hd_ye: '', //转换后可获得余额
				wallet: "", //钱包
				userinfo: {}, //用户信息
				sxf:'',//手续费
			}
		},
		onLoad() {
			this.getUserInfo()

		},
		updated() {
			this.hd_ye = parseFloat( (this.num * this.wallet_to_balance / 100).toFixed(2));
		},
		methods: {
			//全部兑换
			qbdh() {
				this.num = this.wallet;
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					console.log(res)
					this.wallet = res.data.wallet;
					this.wallet_to_balance = res.data.wallet_to_balance;
					this.sxf=100-(res.data.wallet_to_balance);
				})
			},
			qr() {
				let a=parseFloat(this.num)
				this.$api.walletToBalance({
					exchange_num:a
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.back()	
						})
					} else {
						this.$mUtils.toast(res.msg)					
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dh {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.qr {
			margin-top: 30px;
			width: 95%;
			margin: 0 auto;
			margin-top: 20px;
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

		.top {
			width: 95%;
			background-color: #fff;
			margin: 0 auto;
			height: 320px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			margin-top: 10px;

			.top_a {
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				justify-content: space-around;
				padding-bottom: 10px;
				height: 80px;
				font-size: 31upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.top_b {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 120px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.one {
					display: flex;
					justify-content: space-between;

					.left {

						.sl {
							margin-left: 10px;
							color: rgba(250, 94, 9, 1);
						}


					}

					.right {
						p {
							font-size: 30upx;
							color: rgba(250, 94, 9, 1);
						}
					}
				}

				.two {
					font-size: 33upx;
				}

				.three {}
			}

			.top_c {
				color: rgba(153, 153, 153, 1);
				opacity: 0.99;
			}
		}
	}
</style>
