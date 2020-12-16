<template>
	<view class="confirmOrder">
		<!-- 收货地址信息 getAddrInfo  -->
		<view class="address" @tap="$mUtils.goPage('address',{type:'choose'})" >
			<view class="address-box" >
				<view class="landmark">
					<image  :src="'footer/dw.png' | imgUrl"  mode=""></image>
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
			
			<image class="icon-narrow" :src="'footer/right.png' | imgUrl"   mode=""></image>
		</view>
		
		<view class="product-box">
			<product-item v-for="(pro,i) in products" :key="i" :item="pro"></product-item>
		</view>

		
		<!-- 商品积分 -->
		<view class="totalPrice">
			<view class="flex-row-between price-item">
				<text class="fn-sz-30 fn-cl-333">商品总价</text>
				<text class="fn-sz-30 fn-cl-333">¥ {{detail.product_price  || 0}}</text>
			</view>
			<view class="flex-row-between price-item">
				<text class="fn-sz-30 fn-cl-333">运费</text>
				<text class="fn-sz-30 fn-cl-333">¥ {{detail.express_price || 0}}</text>
			</view>
			<view class="flex-row-between price-item">
				<text class="fn-sz-30 fn-cl-333">应付金额</text>
				<text class="fn-sz-30 fn-cl-333">¥ {{detail.total_price  || 0}}</text>
			</view>
			
			<!-- express_price: 10
			goods: Array(1)
			product_price: 8
			taxes_price: 0
			total_price: 18
			type: "22"
			unique_key -->
		</view>
		<!-- 立即兑换 -->
		<view class="exchange">
			<view class="total">
				总计
				<view class="allNum">
					¥ {{detail.total_price || 0}}
				</view>
			</view>
			<text class="media" @tap="doSumbit">
				提交订单
			</text>
		

		</view>
	</view>
</template>

<script>
	import productItem from "@/components/goodsDetails/ProductItem.vue"
	export default {
		components:{ productItem },
		data() {
			return {
				address:{}, //收货地址
				detail:{},//详情
				products:[],//商品列表
				childCode:'', //创建订单所需子账号
				groupId:'', //Number	拼团订单的时候传入（2人和5人）
			}
		},
		onLoad(options) {
			this.childCode=this.$store.state.childCode
			if(options.type && options.type == 'cart'){
				//购物车下单第一步
				let id= options.id && JSON.parse(options.id)
				this.cartOrderOne(id)
			}else{
				//立即下单第一步
				this.doOrderOne(options)
				this.groupId=options.groupId || '';
				
				
			}
			
			
		},
		onShow() {
			let addressId = this.$store.getters.getAddressId;
			console.log("onShow",addressId)
			if(addressId){
				//收货地址信息  
				this.getAddrInfo(addressId)
			}
		},
		methods:{
			//购物车下单第一步
			cartOrderOne(id){
				console.log("购物车下单第一步",id)
				this.$api.cartOrderOne({
					type:1,
					id
				}).then(res=>{
					console.log("购物车下单第一步",res);
					if(res.code == 200){
						this.products = res.data.goods
						this.detail = res.data
						this.address=res.data.address;
					}else{
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(()=>{
							this.$mRouter.back();
						})
					}
				})
			},
			//点击提交订单
			doSumbit(){
				console.log("点击提交订单",this.address)
				if( !this.address ){
					this.$mUtils.toast("请选择收货地址");
					return;
				}
				let createData={
					unique_key:this.detail.unique_key, //第一步唯一标识
					address_id:this.address.id,
					child_code:this.childCode,
					// group_id:this.groupId, //Number	拼团订单的时候传入（2人和5人）
				}
				this.groupId ?  createData.group_id = this.groupId :'';
				console.log("点击提交订单",createData)
				// return;
				//创建订单 
				this.$api.createOrder(createData).then(res=>{
					console.log("创建订单",res)
					
					if(res.code == 200){
						this.$mRouter.redirectTo({
							route:this.$mRoutesConfig.submitOrders,
							query:{
								orderId:res.data.order_id,
								totalPrice:this.detail.total_price
							}
						})
					}else{
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(()=>{
							this.$mRouter.back()
						})
					}
					
				})
			},
			//收货地址信息
			getAddrInfo(id){
				this.$api.getAddrInfo({
					address_id:id
				}).then(res=>{
					if(res.code == 200){
						this.address=res.data;
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//立即下单第一步
			doOrderOne(options){
				this.$api.doOrderOne(options).then(res=>{
					console.log("立即下单第一步",res)
					if(res.code == 200){
						this.products = res.data.goods
						this.detail = res.data
						this.address=res.data.address;
					}else{
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(()=>{
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
			.address-box{
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

			.icon-narrow{
				width: 12upx;
				height: 22upx;
			
			}
		}

		// 		<!-- 商品详情 -->
		.product-box{
			width: 100%;
			display: flex;
			flex-direction: column;
			margin: 20upx auto;
		}
		.totalPrice {
			display: flex;
			flex-direction: column;
			padding: 0 30upx;
			box-sizing: border-box;
			width: 100%;
			background-color: #FFFFFF;
			.price-item{
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
			background-color:#fff;

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
