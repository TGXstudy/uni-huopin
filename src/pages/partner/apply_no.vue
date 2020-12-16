<template>
	<view class="check">
		<view class="nav">
			<image :src="'mine/refuse.png' | imgUrl"  mode=""></image>
			<p class="one">您的申请已被拒绝</p>
			<p class="two">拒绝原因：{{content}}</p>
		</view>
		<button class="cx_sq" @tap="cx_sq()">重新申请</button>

		<p class="ck_hhr" @tap="ck_qy()">查看合伙人权益</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',//拒绝原因
			}
		},
		onLoad(){
			this.isagree();
		},
		methods: {
			isagree(){
				this.$api.get_apply().then(res=>{
					this.content=res.data.refuse;
				})
			},
			cx_sq(){
				
				this.$api.get_apply().then(res=>{
					if(res.data.status=='2'&&res.data.level=='1'){
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_partner2
						})
					}
					if(res.data.status=='2'&&res.data.level=='2'){
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_spartner2
						})
					}
				})
				
				
			},
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

		.cx_sq {
			width: 80%;
			margin: 0 auto;
			margin-top: 30px;
			height: 50px;
			font-size: 38upx;
			line-height: 50px;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			color: #fff;
		}

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
