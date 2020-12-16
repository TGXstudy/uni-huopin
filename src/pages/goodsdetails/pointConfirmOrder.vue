<template>
	<view class="confirmOrder">
		<!-- 积分兑换 确认订单-->
		<!-- 收货地址信息 getAddrInfo  -->
		<view class="address" @tap="$mUtils.goPage('address',{type:'choose'})">
			<view class="address-box">
				<view class="landmark">
					<image :src="'footer/dw.png' | imgUrl"   mode=""></image>
				</view>
				<view class="userName" v-if="address && address.id">
					<view class="phone">
						{{address.fullname}} {{address.phone}}
					</view>
					<view class="contact">
						{{address.province}} {{address.city}} {{address.county}} {{address.address}}
					</view>
				</view>
				<view class="fn-cl-333 fn-sz-30" v-else>
					请选择收货地址 
				</view>
			</view>

			<image class="icon-narrow" :src="'footer/right.png' | imgUrl"  mode=""></image>
		</view>


		<view class="product-box">
			<image class="detail-img" :src="product.thumb " mode=""></image>
			<view class="detail-txt">
				<text class="fn-cl-333 fn-sz-30">{{product.product_name}}</text>
				<view class="flex-col-base">
					<text class="fn-sz-30 fn-cl-red">{{product.score}}</text>
					<text class="fn-sz-24 fn-cl-999">红包</text>
				</view>
				<view class="flex-row-between">
					<text class="fn-sz-30 fn-cl-999">数量</text>
					<count :min="1" :value="exchangAmount" :max="maxAmount" @handleCount="changeNum"></count>
				</view>
			</view>
		</view>
		<!-- 备注  -->
		<view class="remark-box">
			<text class="fn-sz-30 fn-cl-333">备注信息</text>
			<input type="text" v-model.trim="remark" class="fn-sz-30 fn-cl-333" placeholder="请填写备注信息">
		</view>

		<!-- 商品积分 -->
		<view class="totalPrice">
			<view class="flex-row-between price-item">
				<text class="fn-sz-30 fn-cl-333">商品总价</text>
				<view class="flex-col-base">
					<text class="fn-sz-30 fn-cl-red">{{totalScore}}</text>
					<text class="fn-sz-24 fn-cl-999">红包</text>
				</view>
			</view> 
			<view class="flex-row-between price-item">
				<text class="fn-sz-30 fn-cl-333">当前红包</text>
				<view class="flex-col-base">
					<text class="fn-sz-30 fn-cl-red">{{curScore}}</text>
					<text class="fn-sz-24 fn-cl-999">红包</text>
				</view>
			</view>

		</view>
		<!-- 立即兑换 -->
		<view class="exchange">
			<view class="total">
				总计
				<view class="flex-col-base">
					<text class="fn-sz-30 fn-cl-red">{{totalScore}}</text>
					<text class="fn-sz-24 fn-cl-999">红包</text>
				</view>
			</view>
			<text class="media" @tap="doSumbit">
				提交订单
			</text>
		</view>
	</view>
</template>

<script>
	import count from "@/components/count/count.vue"
	export default {
		components: {
			count
		},
		data() {
			return {
				address: {}, //收货地址
				detail: {}, //详情
				product: {}, //商品列表
				childCode: '', //创建订单所需子账号
				exchangAmount: 1, //兑换数量
				totalScore: 0, //
				curScore: 0, //当前积分
				score: 0, //商品 单价积分
				maxAmount: 99999, //最多可兑换得数量
				remark:"", //备注
			}
		},
		onLoad(options) {
			this.product = options;
			this.childCode = this.$store.state.childCode;
			this.score = this.product.score;
		

		},
		onShow() {
			let addressId = this.$store.getters.getAddressId;
			console.log("onShow", addressId)

			if (addressId) {
				//收货地址信息  
				this.getAddrInfo(addressId)
			} else {
				//获取默认地址
				this.getDefaultAddr()
			}

			//获取当前积分
			this.getCurScore();
			this.totalScore = this.score * this.exchangAmount;
		},
		methods: {
			//
			changeNum(param1, param2) {
				console.log("------------", param1, param2)
				this.exchangAmount = param1 - 0;
				this.totalScore = this.score * this.exchangAmount;
			},
			//获取当前积分
			getCurScore() {
				this.$api.getUserInfo().then(res => {

					if (res.code == 200) {
						this.curScore = res.data.score;
						//this.maxAmount = Math.floor(this.curScore / this.score)
					} else {
						console.log("获取当前积分", res)
					}
				})
			},
			//获取默认地址
			getDefaultAddr() {
				this.$api.adress().then(res => {
					if (res.code == 200) {
						this.address = res.data.lists && res.data.lists[0]
					} else {
						console.log("获取默认地址", res)
					}
				})
			},
			//点击提交订单
			doSumbit() {
				console.log("点击提交订单", this.address)
				if (!this.address) {
					this.$mUtils.toast("请选择收货地址");
					return;
				}
				if(this.totalScore > this.curScore){
					this.$mUtils.toast("当前积分不足");
					return;
				}
				// 积分兑换 
				let data={
					id: this.product.product_id,// 商品id
					address_id: this.address.id,// 收货地址id
					child_code:this.childCode,// 
					num	: this.exchangAmount,// 
					remark:this.remark
				}
				// return;
				this.$api.scoreExchange(data).then(res=>{
					console.log("积分兑换", res)
					
					if (res.code == 200) {
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(() => {
							this.$mRouter.redirectTo({
								route: this.$mRoutesConfig.score_jl
							})
						})
						
					} else {
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(() => {
							this.$mRouter.back()
						})
					}
				});
				
			},
			//收货地址信息
			getAddrInfo(id) {
				this.$api.getAddrInfo({
					address_id: id
				}).then(res => {
					if (res.code == 200) {
						this.address = res.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//立即下单第一步
			doOrderOne(options) {
				this.$api.doOrderOne(options).then(res => {
					console.log("立即下单第一步", res)
					if (res.code == 200) {
						this.products = res.data.goods
						this.detail = res.data
						this.address = res.data.address;
					} else {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.back();
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirmOrder {
		width: 100%;
		min-height: 100vh;
		background-color: #F6F6F6;
		display: flex;
		flex-direction: column;
		padding: 30upx 20upx;
		padding-bottom: 120upx;

		.address {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #FFFFFF;
			min-height: 180upx;
			width: 100%;
			padding: 0 20upx;
			box-sizing: border-box;

			.address-box {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;

			}

			.landmark {
				margin-right: 20upx;

				image {
					width: 64upx;
					height: 64upx;
				}
			}

			.userName {
				display: flex;
				flex-direction: column;
				margin-left: 20upx;

				.phone {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.contact {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}
			}

			.icon-narrow {
				width: 12upx;
				height: 22upx;

			}
		}

		// 		<!-- 商品详情 -->
		.product-box {
			display: flex;
			margin: 20upx auto;

			background-color: #fff;
			width: 100%;
			height: 300upx;
			align-items: center;
			padding: 0 20upx;
			box-sizing: border-box;

			.detail-img {
				width: 200upx;
				height: 200upx;
				margin-right: 30upx;
				background-color: #f6f6f6;
				border-radius: 10upx;
			}

			.detail-txt {
				flex: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 200upx;
			}


		}
		.remark-box{
			width: 100%;
			height: 140upx;
			background-color: #fff;
			margin: 20upx auto;
			padding: 0 30upx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
		}
		.totalPrice {
			display: flex;
			flex-direction: column;
			padding: 0 30upx;
			box-sizing: border-box;
			width: 100%;
			background-color: #FFFFFF;

			.price-item {
				width: 100%;
				height: 100upx;
				// border-bottom: 2upx solid #E5E5E5;
			}
		}

		.exchange {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 100upx;
			background-color: #fff;

			.total {
				display: flex;
				margin-left: 30upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);

				.allNum {
					margin: 0upx 10upx;
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(255, 70, 70, 1);
				}

			}

			.media {
				width: 50%;
				height: 100%;
				display: block;
				text-align: center;
				line-height: 100upx;
				background-color: #FA5E09;
				color: #fff;
				font-size: 30upx;


			}
		}

	}
</style>
