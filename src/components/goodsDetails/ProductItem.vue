<template>
	<view class="product-detail">
		<image class="detail-img" :src="item.thumb " mode=""></image>
		<view class="detail-txt">
			<text class="fn-cl-333 fn-sz-30">{{item.product_name}}</text>
			<text class="fn-cl-999 fn-sz-24">规格：{{item.option_name}}</text>
			<view class="flex-row-between">
				<text class="fn-sz-30 fn-cl-red" v-if=" item.type == 3 || item.type == 4 ||item.type == 5">¥ {{item.pt_price}}</text>
				<text class="fn-sz-30 fn-cl-red" v-else-if=" item.type == 2">¥ {{item.kill_price}}</text>
				<text class="fn-sz-30 fn-cl-red" v-else>¥ {{item.option_price}}</text>	
				<text class="fn-sz-28 fn-cl-333">×{{item.num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: function() {
					return {
						attr: `{
							option_id: 2,
							option_name: "\u62fc\ u56e2\ u89c4\ u683c1 ",
							option_price: "						10.00 ",
							pt_price: "						8.00 ",
							kill_price: "			0.00 ",
							type: "	3 ",
							pic: "default\ / 20200804\ / 7 c220641765cb991841c7ea0dc7eda4d.jpeg ",
						}`,
						bill: [],
						cost_price: 10,
						express_price: 10,
						kill_price: "0.00",
						num: 1,
						option_id: 2,
						option_name: "拼团规格1",
						option_price: "10.00",
						pic: "default/20200804/7c220641765cb991841c7ea0dc7eda4d.jpeg",
						postage: "10.00",
						product_id: 2,
						product_name: "二人拼团商品",
						pt_price: "8.00",
						stock: 999,
						taxes_price: 0,
						thumb: "default/20200804/7c220641765cb991841c7ea0dc7eda4d.jpeg",
						total_price: 8,
						type: "3"
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-detail {
		background-color: #fff;
		width: 100%;
		height: 300upx;
		display: flex;
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
</style>
