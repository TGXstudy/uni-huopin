<template>
	<view class="sz">
		<view class="sz_a">
			<view class="box" @tap="gr()">
				<view class="left" >
					个人资料
				</view>
				<view class="right">
					<image :src="'mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="box"  @tap="aq()">
				<view class="left">
					安全中心
				</view>
				<view class="right">
					<image :src="'mine/jt.png' | imgUrl"  mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="sz_a">
			<view class="box" @tap="gy()">
				<view class="left">
					关于平台
				</view>
				<view class="right">
					<image :src="'mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="box" @tap="fk()">
				<view class="left">
					意见反馈
				</view>
				<view class="right">
					<image :src="'mine/jt.png' | imgUrl"  mode=""></image>
				</view>
			</view>
		</view>
		<button class="qh" @tap="qh()">切换账号</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			//切换账号
			qh(){
				this.$mRouter.push({
					route: this.$mRoutesConfig.check_acount,
				})
			},
			fk(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.feedback,
				})
			},
			gr(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.info,
				})
			},
			aq(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.safe,
				})
			},
			gy(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.gy,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sz{
		width: 100%;
		background:rgba(246,246,246,1);
		display: flex;
		flex-direction: column;
		.qh{
			width: 100%;
			height: 60px;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			outline: none;
		}
		.sz_a{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-bottom: 20px;
			.box{
				width: 100%;
				height: 60px;
				border-bottom: 1px solid rgba(229,229,229,1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
				.left{
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.right{
					image{
						width: 8px;
						height: 18px;
					}
				}
			}
		}
	}
	
</style>
