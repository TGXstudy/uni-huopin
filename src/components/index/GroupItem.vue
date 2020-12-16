<template>

	<view class="productDetails fn-sz-30" @tap="goDetail(item)">
		<view>
			<image :src="item.thumb" mode=""></image>
		</view>
		<view class="productName two-line-txt">
			{{item.product_name}}
		</view>

		<view class="priceList" v-if="isGroup">
			<view 
			class="originalPrice fn-sz-30 fn-cl-red ">
				¥{{item.pt_price}}
				<view 
				class="del-line  fn-cl-aaa fn-sz-20">
					￥{{item.option_price}}
				</view>
			</view>
			<view class="fn-cl-aaa fn-sz-20">
				已拼{{item.total_sale}}件
			</view>
		</view>
		<view class="sale-box" v-else>
			<text class="fn-sz-30 fn-cl-red fn-bold" 
			v-if="item.type == 6">{{item.score}}红包</text>
			<text class="fn-sz-30 fn-cl-red fn-bold" 
			v-else>￥{{item.option_price}}</text>
			<text class="fn-cl-aaa fn-sz-20">
				已售{{item.total_sale}}件
			</text>
		</view>

		<view class="group" v-if="isGroup">
			<text class="twoGroup fn-sz-24">
				{{item.type == 3 ? 2 : item.type == 4 ? 5 : 7}}人团
			</text>
			<text class="goGroup fn-sz-24" @tap.stop="goSpell(item.id)">
				去拼团
			</text>
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
		methods: {
			// 去拼团
			goSpell(id) {
				//this.$mUtils.goPage("spell",{id})
			},
			//跳转商品详情页
			goDetail(item) {
				console.log("跳转商品详情页")
				let routeName = "goodsDetails"
				// switch(item.type){ 
				// 	case '1':
				// 		routeName='goodsDetails';
				// 		break;
				// 	case '2':
				// 		routeName='goodsSeconds';
				// 		break;
				// 	case '3':
				// 	case '4':
				// 	case '5':
				// 		routeName='goodsGroup';
				// 		break;
				// }
				this.$mUtils.goPage(routeName, {
					id: item.id,
					type: item.type
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.productDetails {
		flex-direction: column;
		width: 338upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		margin-bottom: 20upx;
	
		image {
			width: 338upx;
			height: 300upx;
		}

		.productName {
			margin: 20upx auto;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			height: 80upx;
			width: 100%;
			padding: 0 20upx;

		}

		.sale-box {
			min-height: 100upx;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			padding: 0 20upx;
			box-sizing: border-box;
		}

		.priceList {
			display: flex;
			justify-content: space-between;
			margin-top: 20upx;
			align-items: center;
			margin-bottom: 10px;
			padding: 0 20upx;

			.originalPrice {
				display: flex;
				flex-direction: column;
				font-family: DIN;

			}



		}

		.group {
			padding: 0 20upx;
			width: 195upx;
			height: 55upx;
			margin-bottom: 20upx;

			.twoGroup {
				width: 50%;
				line-height: 55upx;
				background-color: #F62A2A;
				border-radius: 0upx 0upx 0upx 20upx;
				text-align: center;
			}

			.goGroup {
				width: 50%;
				line-height: 55upx;
				background-color: #FDB916;
				border-radius: 0upx 20upx 0upx 0upx;
				text-align: center;
			}
		}

	}
</style>
