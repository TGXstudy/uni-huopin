<template>
	<view class="fiveGroup">
		<view class="theRules">
			<navigator url="../theRules/fivetheRules">
				拼团规则
			</navigator>
		</view>

		<view class="goshopGoods" v-for="(item,index) in detailslist" :key="index">
			<image :src="item.imgs" mode=""></image>
			<view class="product">
				<navigator :url="item.url" class="goodsName">
					{{item.name}}
				</navigator>
				<view class="price">
					￥{{item.price}}
					<view class="presentPrice">
						￥{{item.presentPrice}}
					</view>
				</view>
				<view class="letterNum">
					{{item.sold}}
					<view class="surplusNum">
						{{item.remaining}}
					</view>
				</view>
				<view class="group">
					<view class="twoGroup">
						5人团
					</view>
					<view class="goGroup">
						去拼团
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品详情
				detailslist: [{
						name: "韵诗双萃精华黄金双瓶 抗初老熬夜修护",
						price: 299.90,
						presentPrice: 19.9,
						sold: "已售234件",
						remaining: "剩余234件",
						imgs: "../../static/imgs/footer/sb.png",
						url: "/pages/goodsdetails/goodsGroup"
					}, {
						name: "韵诗双萃精华黄金双瓶 抗初老熬夜修护",
						price: 299.90,
						presentPrice: 19.9,
						sold: "已抢234件",
						remaining: "剩余234件",
						imgs: "../../static/imgs/footer/sb.png",
						url: "/pages/goodsdetails/goodsGroup"
					},
					{
						name: "韵诗双萃精华黄金双瓶 抗初老熬夜修护",
						price: 299.90,
						presentPrice: 19.9,
						sold: "已售234件",
						remaining: "剩余234件",
						imgs: "../../static/imgs/footer/sb.png",
						url: "/pages/goodsdetails/goodsGroup"
					},
					{
						name: "韵诗双萃精华黄金双瓶 抗初老熬夜修护",
						price: 299.90,
						presentPrice: 19.9,
						sold: "已售234件",
						remaining: "剩余234件",
						imgs: "../../static/imgs/footer/sb.png",
						url: "/pages/goodsdetails/goodsGroup"
					},
					{
						name: "韵诗双萃精华黄金双瓶 抗初老熬夜修护",
						price: 299.90,
						presentPrice: 19.9,
						sold: "已售234件",
						remaining: "剩余234件",
						imgs: "../../static/imgs/footer/sb.png",
						url: "/pages/goodsdetails/goodsGroup"
					},
					{
						name: "韵诗双萃精华黄金双瓶 抗初老熬夜修护",
						price: 299.90,
						presentPrice: 19.9,
						sold: "已售234件",
						remaining: "剩余234件",
						imgs: "../../static/imgs/footer/sb.png",
						url: "/pages/goodsdetails/goodsGroup"
					},

				]

			}
		}
	
	}
</script>

<style lang="scss" scoped>
	.fiveGroup {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.theRules {
			width: 100%;
			height: 80upx;
			flex-direction: row-reverse;
			margin-top: 20upx;
			padding-right: 40upx;
			color: rgba(255, 89, 0, 1);
		}

	// 拼团商品详情
	.goshopGoods {
		// width: 95%;
		height: 400upx;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		margin: 20upx auto;
	
		image {
			width: 50%;
			height: 350upx;
			margin-right: 40upx;
		}
	
		.product {
			display: flex;
			flex-direction: column;
	
			.goodsName {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-top: 10upx;
			}
	
			.price {
				font-size: 32upx;
				font-family: DIN;
				font-weight: 500;
				color: rgba(255, 70, 70, 1);
				align-items: baseline;
	
				.presentPrice {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					text-decoration: line-through;
					margin-top: 20upx;
				}
			}
	
			.letterNum {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(248, 114, 10, 1);
				margin-top: 10upx;
				justify-content: space-between;
	
				.surplusNum {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
	
				}
			}
	
			.group {
				margin-top: 40upx;
	
				.twoGroup {
					width: 200upx;
					height: 70upx;
					// text-align: center;
					justify-content: center;
					line-height: 70upx;
					background-color: red;
					border-radius: 0upx 0upx 0upx 20upx;
	
				}
	
				.goGroup {
					width: 200upx;
					height: 70upx;
					justify-content: center;
					line-height: 70upx;
					background-color: #FDB916;
					border-radius: 0upx 20upx 0upx 0upx;
	
				}
			}
		}
	}
		
	}
</style>
