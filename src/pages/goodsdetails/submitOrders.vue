<template>
	<view class="submitOrders">
		<!-- 支付金额 -->
		<view class="pay">
			支付金额
			<view class="payNum">
				¥ {{totalPrice}}
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="methodPayment">
			<text class="fn-sz-30 fn-bold">
				请选择支付方式
			</text>
			<view class="allPay">
				<view class="flex-row-between pay-item" @tap="payway = 'wxpay'">
					<view class="way-item">
						<image class="icon-sz-75" :src="'login/icon_wxpay.png' | imgUrl"   mode=""></image>
						<text class="fn-sz-28 fn-cl-333"> 微信支付 </text>
					</view>
					<image class="icon-sz-30"  :src=" (payway == 'wxpay' ?'login/icon_choose_orange.png' : 'login/icon_choose_hollow.png') | imgUrl"
					 mode=""></image>
				</view>
				<view class="flex-row-between pay-item" @tap="payway ='balance'">
					<view class="way-item">
						
						<image class="icon-sz-75" :src="'login/icon_balance.png' | imgUrl" mode=""></image>
						<text class="fn-sz-28 fn-cl-333"> 余额支付 </text>
					</view>
					<image class="icon-sz-30" :src=" (payway == 'balance' ?'login/icon_choose_orange.png' : 'login/icon_choose_hollow.png') | imgUrl"
					 mode=""></image>
				</view>
				<view class="flex-row-between pay-item" @tap="payway = 'wallet'">
					<view class="way-item">
						<image class="icon-sz-75" :src="'login/icon_wallet.png' | imgUrl"  mode=""></image>
						<text class="fn-sz-28 fn-cl-333"> 钱包支付 </text>
					</view>
					<image class="icon-sz-30" :src=" (payway == 'wallet' ?'login/icon_choose_orange.png' : 'login/icon_choose_hollow.png') | imgUrl" 
					 mode=""></image>
				</view>

			</view>
		</view>
		<!-- 去支付 -->
		<button class="goPay" @tap="doPay">
			去支付
		</button>

		<pwd-input ref="pwdPopup" @confirmPay="confirmPay"></pwd-input>

	</view>
</template>

<script>
	import pwdInput from "@/components/PwdInput.vue"
	export default {
		components: {
			pwdInput
		},
		data() {
			return {
				orderId: '', //订单id
				totalPrice: 0,
				payway: '', //余额balance,钱包wallet wxpay
				hasPwd: false, //是否设置支付密码
			}
		},
		onLoad(options) {
			this.orderId = options.orderId || ''
			this.totalPrice = options.totalPrice || 0
			console.log("onLoad", this.orderId)
			
		},
		onShow() {
			//判断是否设置支付密码
			this.checkPayPwd();
		},
		methods: {

			doPay() {
				if (!this.payway) {
					this.$mUtils.toast("请选择支付方式");
					return;
				}
				let handlePay = {
					wxpay: this.wxpay,
					balance: this.inputPayPwd, //输入支付密码 
					wallet: this.inputPayPwd
				}
				handlePay[this.payway]();
			},

			/*  */
			wxpay() {
				console.log("微信支付")
				this.$api.wxpay({
					order_id:this.orderId
				}).then(res=>{
					console.log("微信支付",res)
					if(res.code == 200){
						this.doWxPay(res.data)
					}else{
						this.$mUtils.toast(res.msg);
					}
				})
			},
			
			doWxPay(wxPayData){
				let _this=this;
				uni.requestPayment({
				    provider: "wxpay",
				    timeStamp: wxPayData.timeStamp, //    String    微信小程序必填    时间戳从1970年1月1日至今的秒数，即当前的时间。    微信小程序
				    nonceStr: wxPayData.nonceStr, //    String    微信小程序必填    随机字符串，长度为32个字符以下。    微信小程序
				    package: wxPayData.package, //    String    微信小程序必填    统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。    微信小程序
				    signType: wxPayData.signType, //    String    微信小程序必填    签名算法，暂支持 MD5。    微信小程序
				    paySign: wxPayData.paySign, //
				    success(res) {
				        console.log("微信小程序支付", res)
				        if (res.errMsg === "requestPayment:ok") {
				            _this.$mUtils.toast("支付成功")
							_this.$mUtils.timeout(()=>{
								_this.$mRouter.redirectTo({
									route: _this.$mRoutesConfig.my_order
								})
							})
				        }else{
				
				        }
				    },
				    fail(res) {
				        _this.$mUtils.toast("支付失败")
				        console.log("微信小程序支付 failfailfail", res);
				    }
				})
			},
			//输入支付密码
			inputPayPwd() {
				if (this.hasPwd) {
					this.$refs.pwdPopup.open()
				} else {
					this.$mUtils.toast("请设置支付密码")
					this.$mUtils.timeout(() => {
						this.$mUtils.goPage("check_paypwd")
					})
				}
			},
			//支付密码确认
			confirmPay(pwd){
				console.log("支付密码确认",pwd)
				this.$refs.pwdPopup.close()
				//余额支付，钱包支付 accoutPay 
				this.accoutPay(pwd)
			},
			// 余额支付，钱包支付 
			accoutPay(pwd){
				this.$api.accoutPay({
					order_id:this.orderId,
					pay_pwd:pwd, //
					type:this.payway, //支付类型：余额balance,钱包wallet
				}).then(res=>{
					console.log('余额支付 钱包支付',res)
					if(res.code == 200){
						this.$mUtils.toast(res.msg)
						
						this.$mUtils.timeout(()=>{
							this.$mRouter.redirectTo({
								route: this.$mRoutesConfig.my_order
							})
						})
						
					}else{
						this.$mUtils.toast(res.msg)
					}
					
				})
			} ,
			
			
			// balancePay() {
			// 	console.log("余额支付")

			// },
			// walletPay() {
			// 	console.log("钱包支付")
			// },
			//判断是否设置支付密码
			checkPayPwd() {
				this.$api.checkPayPwd().then(res => {
					console.log("判断是否设置支付密码", res)
					if (res.code == 200) {
						this.hasPwd = true;
					} else if (res.code == 210) {
						this.hasPwd = false;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	.submitOrders {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin: 40upx 20upx 0upx;

		// 1.
		.pay {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 260upx;
			background-color: #FFFFFF;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999;

			// padding: 40upx 0upx;
			.payNum {
				font-size: 48upx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333;
				padding: 30upx 0upx;
			}
		}

		// 2
		.methodPayment {
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			margin-top: 40upx;
			padding: 30upx 30upx 60upx 30upx;
			box-sizing: border-box;


			.allPay {
				display: flex;
				flex-direction: column;
				width: 100%;

				.pay-item {
					width: 100%;
					height: 120upx;

					.way-item {
						flex: 1;
						flex-shrink: 1;
						display: flex;
						align-items: center;

						.icon-sz-75 {
							margin-right: 30upx;
						}
					}
				}
			}
		}

		//3
		.goPay {
			border-radius: 0;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			text-align: center;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			font-size: 30upx;
			color: #fff;
		}
	}
</style>
