<template>
	<view class="jf">
		<view class="top">
			<p class="top_one">商城余额（元）</p>
			<p class="top_two">￥{{userinfo.balance}}</p>
			<view class="btn">
				<button class="dh" @tap="tocz()">充值</button>
				<button class="dh2" @tap="totx()">提现</button>
			</view>
			
		</view>
		
		<view class="check"> 
			<view class="one" @click="tabClick(0)">
				收支明细
			</view>
			<view class="two" @click="tabClick(1)">
				提现记录
			</view>
		</view>
		
		<view class="bottom" v-if="tabCurrentIndex === 0">
			<view class="box" v-for="(item,index) in sz_list" :key="index">
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
		
		<view class="bottom" v-if="tabCurrentIndex === 1">
			<view class="box"  v-for="(item,index) in tx_list" :key="index">
				<view class="left">
					<view class="box_top">{{item.wit_status}}</view>
					<view class="box_bottom">
						{{item.create_time}}
					</view>
				</view>
				<view class="right">
					-{{item.wit_money}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			tabCurrentIndex: 0,
			userinfo: {} ,//用户信息
			sz_list:[],//收支记录
			tx_list:[]//提现记录
			}
		},
		onShow(){
			this.getUserInfo()
			this.balanceRecord();
			this.txjl();
		},
		methods:{
			//提现记录
			txjl(){
				this.$api.depositRecord().then(res => {
					console.log(res,'提现')
				this.tx_list = res.data.lists;
				})
			},
			//余额收支记录
			balanceRecord(){
				this.$api.balanceRecord().then(res => {
				this.sz_list = res.data.record.lists;
				})
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userinfo = res.data;
					
				})
			},
			tabClick(index) {
			
				this.tabCurrentIndex = index;
			},
			tocz(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.recharge,
				})
			},
			totx(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.deposit,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.jf{
		display: flex;
		flex-direction: column;
		width: 100%;
		background:#fff;
		.check{
			margin-top: 20px;
			width: 60%;
			margin: 0 auto;
			height: 60px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.one{
				font-size:36upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
			.two{
				font-size:36upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				// color:rgba(153,153,153,1);
			}
		}
		.bottom{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
	
			padding: 10px;
			padding-top: 10px;
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
			.btn{
				width: 90%;
				display: flex;
				justify-content: space-between;
				.dh{
					color:rgba(255,89,0,1);
					width:45%;
					height:45px;
					background:rgba(255,255,255,1);
					border:1px solid rgba(238,238,238,1);
					border-radius:33px;
				}
				.dh2{
					color:#fff;
					width:45%;
					height:45px;
				
					border:1px solid #fff;
					border-radius:33px;
				}
				
			}
			
		}
	}
</style>
