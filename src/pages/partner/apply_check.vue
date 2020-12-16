<template>
	<view class="check">
		<view class="nav">
			<image :src="'mine/shqr.png' | imgUrl" mode=""></image>
			<p class="one">您的申请已提交</p>
			<p class="two">等待平台审核。</p>
		</view>

		<p class="ck_hhr" @tap="ck_qy()">查看合伙人权益</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			
		},
		methods: {
			ck_qy() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.apply_rule,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.check {
		padding: 10px;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		position: relative;

		.ck_hhr {
			position: absolute;
			bottom: 80px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: rgba(255, 89, 0, 1);
			margin-top: 30px;
			font-size: 35upx;
		}

		.nav {
			padding-top: 50px;
			width: 80%;
			margin: 0 auto;
			height: 300px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			image {
				width: 100px;
				height: 100px;
			}

			.one {
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.two {
				font-size: 35upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>
