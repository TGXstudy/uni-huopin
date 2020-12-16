<template>
	<view class="jf">
		<view class="top">
			<p class="top_one">商城钱包余额（元）</p>
			<p class="top_two">￥{{userinfo.wallet}}</p>
			<button class="dh" @tap="todh()">兑换余额</button>
		</view>
		
		<view class="bottom">
			<view class="title">
				钱包明细
			</view>
			<view class="box" v-for="(item,index) in mx_list" :key="index">
				<view class="left">
					<view class="box_top">{{item.bill_source}}</view>
					<view class="box_bottom">
						{{item.create_time}}
					</view>
				</view>
				
				<view class="right" v-if="item.bill_type=='in'">
					+{{item.bill_amt}}
				</view>
				<view class="right" v-if="item.bill_type=='out'">
					-{{item.bill_amt}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userinfo: {} ,//用户信息
				mx_list:[],//收支明细
			}
		},
		onShow(){
			this.getUserInfo()
			this.mx()
		},
		methods:{
			mx(){
				this.$api.walletRecord({
					page:1,
					per_page:10000
				}).then(res => {
					this.mx_list = res.data.record.lists;
					console.log("获取用户信息", this.mx_list)
				})
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userinfo = res.data;
				
				})
			},
			todh(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.dh_balance,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jf{
		display: flex;
		flex-direction: column;
		width: 100%;
		background:rgba(246,246,246,1);
		.bottom{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-top: 10px;
			padding: 10px;
			padding-top: 20px;
			.title{
				width: 100%;
				font-size:36upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				margin-bottom: 10px;
			}
			.box{
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;
				.left{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 50px;
					.box_top{
						color:rgba(51,51,51,1);
						font-size:34upx;
					}
					.box_bottom{
						color:rgba(153,153,153,1);
						font-size:30upx;
					}
				}
				.right{
					font-size:34upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(250,96,9,1);
				}
			}
		}
		.top{
			width: 100%;
			height: 200px;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			background:linear-gradient(90deg,rgba(255,85,0,1),rgba(255,114,0,1));
			padding-top: 30px;
			.top_one{
				font-size:28upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,247,241,1);
			}
			.top_two{
				font-size:60upx;
				font-family:PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
			}
			p{
				margin-bottom: 20px;
			}
			.dh{
				color:rgba(255,89,0,1);
				width:40%;
				height:45px;
				background:rgba(255,255,255,1);
				border:1px solid rgba(238,238,238,1);
				border-radius:33px;
			}
		}
	}
</style>
