<template>
	<view class="modifyAddress">
		<view class="address" v-for="(item,index) in 3" :key="index">
			<view class="landmark">
				<checkbox-group class="uni-list">
					<label class="label-3">
						<checkbox class="checkbox-3"></checkbox>
					</label>
				</checkbox-group>
			</view>
			<view class="userName">
				<view class="phone">
					<image :src="'footer/mr.png' | imgUrl"  mode=""></image>
					<view class="">
						李立三 188888888
					</view>

				</view>
				<view class="contact">
					重庆市 沙坪坝区 船业街道33号付23
				</view>
			</view>
			<view class="Img">
				<image :src="'footer/right.png' | imgUrl"  mode=""></image>
			</view>
		</view>
		<button class="newAddress">
			新建收货地址
		</button>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.modifyAddress {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin: 30upx 20upx;

		.address {
			display: flex;
			margin-top: 30upx;
			align-items: center;
			background-color: #FFFFFF;
			height: 180upx;
			width: 100%;

			.landmark {
				margin-left: 20upx;

				image {
					width: 80upx;
					height: 80upx;
				}
			}

			.userName {
				display: flex;
				flex-direction: column;
				margin-left: 20upx;

				.phone {
					display: flex;
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

					image {
						width: 60upx;
						height: 40upx;
					}
				}

				.contact {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					margin-top: 10upx;
				}
			}

			.Img {
				margin-left: 60upx;

				image {

					width: 20upx;
					height: 20upx;
				}
			}
		}

		.newAddress {
			width: 100%;
			height: 100upx;
			margin-top: 60upx;
			justify-content: center;
			align-items: center;
			border: 1px solid #CCCCCC;
		}
	}
</style>
