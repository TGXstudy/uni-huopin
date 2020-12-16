<template>
	<view class="container">
		<view class="empty">
			<text class="fn-sz-30 fn-cl-333" @tap="clearCart">清空</text>
		</view>
		<view class="carts-list">
			<slide-delete 
			v-for="(item,index) in cartList" :key="item.id" 
			:item="item" class="cart-item" 
			@deleteItem="deleteCart">
				<view class="cart-content">
					<image class="icon-sz-30" 
					@tap="selectCart(item,index)" 
					:src="(item.selected ? 'login/icon_choose_orange.png' :  'login/icon_choose_hollow.png')| imgUrl"></image>
					<image class="product-img" :src="item.thumb" mode=""></image>
					<view class="product-info">
						<text class="fn-bold fn-cl-333 fn-sz-30">{{item.product_name}} </text>
						<text class="fn-cl-999 fn-sz-22">{{item.option_name}}</text>
						<view class="flex-row-between">
							<text class="fn-sz-30 fn-cl-orange"> ￥{{item.option_price}} </text>
							<count :value="item.num" 
							@handleCount="editCount($event,item)"></count>
						</view>
					</view>
				</view>
			</slide-delete>
			<!-- </view> -->
		</view>
		<view class="fixed-sum">
			<view>
				<image class="icon-sz-30" @tap="doSelectAll" :src=" (isAll ?'login/icon_choose_orange.png' : 'login/icon_choose_hollow.png')| imgUrl"></image>
				<text class="fn-cl-999 fn-sz-28">全选</text>
			</view>
			<view class="">
				<text class="fn-cl-333 fn-sz-28">总计</text>
				<text class="fn-cl-orange fn-sz-30"> ¥ {{sumPrice}}</text>
			</view>
			<view class="btn-box" @tap="doCheck">
				<view class="orange-btn">
					结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import count from "@/components/count/count.vue"
	import slideDelete from "@/components/SlideDelete/SlideDelete.vue"
	export default {
		components: {
			count,
			slideDelete
		},
		data() {
			return {
				cartList: [],
				selectCartList: [], //选中待结算的购物车
				selectCartIds: [], //选中待结算的购物车的id
				isAll: false, //是否全选
				sumPrice: '0.00', //总金额
				cartId: 0, //被编辑数量的购物车id
			}
		},
		onLoad() {

		},
		onShow() {
			console.log("获取购物车列表 onshow");
			// 获取购物车列表
			this.getCart();
			
		},
		methods: {
			//点击结算
			doCheck() {
				let ids = []
				this.cartList.forEach(item => {
					if (item.selected) {
						ids.push(item.id)
						
					}
				})
				if (ids.length <= 0) {
					this.$mUtils.toast("请选择商品！")
					return;
				}
				console.log("结算", ids)
				
				this.$mUtils.goPage("confirmOrder", {
					id: JSON.stringify(ids),
					type: 'cart'
				})
			},

			clearCart() {
				let _this = this;
				uni.showModal({
					title: "提示",
					content: "确认清空?",
					success(res) {
						if (res.confirm) {
							_this.delCart('all')
						}
					}
				})
			},
			//选择购物车
			selectCart(item, idx) {
				item.selected = !item.selected;
				console.log("选择购物车")

				this.getSumPrice();
				this.checkAll();
			},
			//删除购物车
			deleteCart(id) {
				console.log("删除购物车", id);
				this.delCart([id])
			},
			//删除购物车接口
			delCart(ids) {
				this.$api.delCart({
					id: ids, //全清=>'all',[1,2,3]=>'删除指定数据‘
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast("删除成功");
						this.$mUtils.timeout(() => {
							this.getCart();
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//编辑数量
			editCount(num, cart) {
				console.log("编辑数量", num, cart)
				let newNum = num - cart.num;
				let data = {
					product_id: cart.product_id,

					option_id: cart.option_id,

					num: newNum
				}
				this.$api.editCart(data).then(res => {
					if (res.code == 200) {
						this.getCart()
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
				// console.log('编辑数量',data);
				// editCart
			},
			//检查是否全选
			checkAll() {
				this.isAll = this.cartList.length > 0 && this.cartList.every(item => item.selected);
			},
			//点击全选
			doSelectAll() {
				this.isAll = !this.isAll
				this.cartList.forEach((cart) => {
					cart.selected = this.isAll
				})

				this.getSumPrice();
				this.checkAll();


			},
			//计算
			getSumPrice() {
				let sum = 0;
				this.cartList.forEach((cart, idx) => {
					if (cart.selected) {
						sum += cart.num * cart.option_price
					}
				})

				this.sumPrice = sum.toFixed(2);
				console.log("总金额", this.sumPrice);
			},
			getCart() {

				this.$api.member_cart().then(res => {
					console.log("购物车", res)
					if (res.code == 200) {
						this.cartList = [];
						res.data.data.forEach((item, i) => {
							this.cartList.push({
								...item,
								selected: false
							})
						})
						this.getSumPrice();
						this.checkAll();
					} else {
						this.$mUtils.toast(res.msg)

					}
				})
			},



		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 120upx;

		.empty {
			height: 100upx;
			background-color: #FFFFFF;
			flex-direction: row-reverse;
			align-items: center;
			padding: 0upx 20upx;
		}

		.carts-list {
			margin-top: 20upx;
			display: flex;
			flex-direction: column;
			padding: 0 30upx;

			.cart-item {
				width: 100%;
				// height: 280upx;
				background-color: #fff;
				margin-bottom: 20upx;
				border-radius: 10upx;
				display: flex;
				align-items: center;

				.cart-content {
					width: 100%;
					height: 100%;
					padding: 40upx 0;
					// background-color: red;
					display: flex;
					align-items: center;
				}

				.product-img {
					width: 200upx;
					height: 200upx;
					margin:0 20upx;
				}

				.product-info {
					width: 100%;
					height: 200upx;
					flex: 1;
					flex-shrink: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
				}
			}

		}

		.fixed-sum {
			width: 100%;
			height: 100upx;
			background-color: #fff;
			position: fixed;
			left: 0;
			right: 0;
			z-index: 999;
			bottom: 0;
			//#ifdef H5
			bottom: var(--window-bottom);
			//#endif
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon-sz-30 {
				margin: 0 30upx;
			}

			.btn-box {
				width: 250upx;
				height: 100%;
				background-color: #FB5509;
			}
		}

	}
</style>
