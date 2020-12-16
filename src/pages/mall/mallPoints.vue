<template>
	<view class="goodsDetails">
		<view class="goodsImg">
			<image :src="'footer/banner.png' | imgUrl"  mode=""></image>
		</view>
		<view class="detailsPrice">
			¥ 399.90-499.90
		</view>
		<view class="goodsName">
			巴拉巴拉婴儿衣服新生儿连体衣宝宝夏装爬爬服哈衣周岁衣服纯棉
		</view>
		<view class="sold">
			已售234
		</view>
		<view class="details">
			<view class="goodsTemplate">
				商品详情
			</view>
			<view class="evaluation">
				用户评价(9)
			</view>
		</view>
		<view class="detailsImg">
			<image  :src="'footer/banner.png' | imgUrl" mode=""></image>
		</view>
		<!-- 底部购物车 -->
		<navigator url="../goodsOrder/goodsChange" class="allContact">

			<view class="buy">
				立即兑换
			</view>
		</navigator>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.goodsDetails {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.goodsImg {
			image {
				width: 100%;
				height: 500upx;
			}
		}

		.detailsPrice {
			height: 72upx;
			font-size: 60upx;
			font-family: DIN;
			font-weight: 500;
			color: rgba(246, 42, 42, 1);
			margin: 40upx 20upx 0upx;

		}

		.goodsName {
			height: 150upx;
			font-size: 44upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			margin: 40upx 20upx 0upx;
		}

		.sold {
			height: 40upx;
			font-size: 44upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin: 0upx 20upx;
		}

		.details {
			display: flex;
			justify-content: space-around;
			margin-top: 60upx;

			.goodsTemplate {
				font-size: 48upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);

			}

			.evaluation {
				font-size: 48upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);

			}
		}

		.detailsImg {
			margin-top: 40upx;

			image {
				height: 670px;
			}
		}

		.allContact {
			width: 100%;
			display: flex;
			margin: 40upx 0upx;

			.buy {

				width: 95%;
				margin: 20upx 20upx 0upx;
				height: 80upx;
				background: rgba(253, 116, 43, 1);
				border-radius: 35upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				justify-content: center;
				align-items: center;
			}


		}

	}
</style>
