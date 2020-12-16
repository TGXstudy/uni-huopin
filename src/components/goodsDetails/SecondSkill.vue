<template>

	<!-- 商品详情 -->
	<view class="all-skill">
		<view class="goshopGoods" @tap="goDetail(item)">
			<image class="goImg" :src="item.thumb" mode=""></image>

			<view class="product">
				<view class="fn-sz-30 fn-cl-333 two-line-txt fn-bold">
					{{item.product_name}}
				</view>
				<view class="price">
					￥{{item.kill_price}} 
					<view class="presentPrice">
						￥{{item.option_price}}
					</view>
				</view>
				<view class="flex-row-between">
					<text class="fn-cl-orange fn-sz-24">已售:{{item.total_sale}}</text>
					<text class="fn-cl-999 fn-sz-24">	剩余{{item.pstock}}件</text>
				</view>
				<!-- @tap.stop="goSpell(item.id)" -->
				<view class="flex-end">
					<view class="immediately" >
						立即抢购
					</view>
				</view>
				
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		props: {
			isGroup: {
				type: Boolean,
				default: true
			},
			item: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {


			}
		},
		onLoad() {

		},
		methods: {
			//跳转商品详情页
			goDetail(item) {
				console.log("跳转商品详情页")
				let routeName = "goodsDetails"
				this.$mUtils.goPage(routeName, {
					id: item.id,
					type: item.type
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	// 		<!-- 商品详情 -->
	.all-skill {
		width: 100%;
		height: 100%;

		.goshopGoods {
			width: 100%;
			height: 100%;
			padding: 20upx;
			box-sizing: border-box;
			display: flex;
			// justify-content: space-between;

			.goImg {
				width: 286upx;
				height: 286upx;
			}


			.product {
				display: flex;
				flex-direction: column;
				margin-left: 34upx;
				flex: 1;
				flex-shrink: 1;
				justify-content: space-between;

				.price {
					
					font-size: 36upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(255, 70, 70, 1);
					align-items: baseline;
					margin-top: 20upx;

					.presentPrice {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999;
						text-decoration: line-through;
						margin-left: 20upx;
					}
				}

				.letterNum {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(248, 114, 10, 1);
					// margin-top: 10upx;
					// justify-content: space-between;
					padding-top: 40upx;

					.num {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						margin-left: 20upx;
					}
				}
				.flex-end{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					
				}
				.immediately {
					width: 167upx;
					height: 62upx;
					background: #FA3609;
					border-radius: 35upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					justify-content: center;
					align-items: center;
					margin-top: 40upx;
				}
			}
		}

	}
</style>
