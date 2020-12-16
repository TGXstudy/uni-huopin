<template>
	<view class="hy">
		<view class="top">
			<view class="left">
				<p class='one'>{{friends_info.total_num}}</p>
				<p class='two'>好友总人数(人)</p>
			</view>
			<view class="middle">
				<p class='one'>{{friends_info.my_wallet_in}}</p>
				<p  class='two'>钱包收益</p>
			</view>
			<view class="right">
				<p class='one'>{{friends_info.my_score_in}}</p>
				<p  class='two'>红包收益</p>
			</view>
		</view>
		<view class="tab">
			<view class="left" @click="tabClick(0)">
				<p class='one'>{{friends_info.p1_num}}</p>
				<p class='two'>直推好友(人)</p>
			</view>
			<view class="middle" @click="tabClick(1)">
				<p class='one'>{{friends_info.p2_num}}</p>
				<p  class='two'>间推好友(人)</p>
			</view>
			<view class="right" @click="tabClick(2)">
				<p class='one'></p>
				<p  class='two'>好友升级奖励</p>
			</view>
		</view>
		
		<!-- 切换 -->
		<view class="bottom11" v-if="tabCurrentIndex===0" >
			<view class="box" v-for="(item,index) in friends_list" :key="index" @tap="hy_mx(item)" >
				<view class="left">
					<image  :src="item.avatar" mode=""></image>
					<span class='name'>{{item.nickname}}</span>
				</view>
				<view class="middle">
					<p class="middle_top">
						
						<span class='xf'>消费{{item.total_pay}}元</span>
					</p>
					
				</view>
				<view class="right">
					<p class='right_top'>钱包+{{item.wallet_in}}</p>
					<p class='bottom'>红包+{{item.score_in}}</p>
				</view>
			</view>
		</view>
		<view class="bottom11" v-if="tabCurrentIndex===1">
			<view class="box" v-for="(item,index) in friends_list" :key="index"  @tap="hy_mx(item)" >
				<view class="left">
					<image  :src="item.avatar" mode=""></image>
					<span class='name'>{{item.nickname}}</span>
				</view>
				<view class="middle">
					<p class="middle_top">
						<span class='xf'>消费{{item.total_pay}}元</span>
					</p>
					
				</view>
				<view class="right">
					<p class='right_top'>钱包+{{item.wallet_in}}</p>
					<p class='bottom'>红包+{{item.score_in}}</p>
				</view>
			</view>
		</view>
		<view class="bottom11" v-if="tabCurrentIndex===2">
			<view class="box"  v-for="(item,index) in friends_list" :key="index" >
				<view class="left">
					<image   :src="item.avatar" mode=""></image>
					<span class='name'>{{item.nickname}}</span>
				</view>
				<view class="middle">
					<p class="middle_top">
						<!-- <span class='xf'>直推</span> -->
						<span class='xf'>{{item.source}}</span>
					</p>
					
				</view>
				<view class="right">
					<p class='right_top'>{{item.tag == "wallet" ? "钱包" : "红包"}}+{{item.bill_amt}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabCurrentIndex:0,
				friends_list:[],//好友列表
				friends_info:{},//好友详情
			}
		},
		onLoad(){
		this.get_myfriend()
		this.tabCurrentIndex=0;
		},
		methods:{
			get_myfriend(){
				this.$api.myFriend({
					type:this.tabCurrentIndex+1,
					page:1,
					pageSize:10000
				}).then(res=>{
					console.log(res)
					this.friends_info=res.data;
					this.friends_list=res.data.record.data;
				})
			},
			hy_mx(item){
				//console.log("qqq",item)

				this.$mRouter.push({
					route: this.$mRoutesConfig.friends_xf,
					query:{id:item.id,score_in:item.score_in,wallet_in:item.wallet_in,total_pay:item.total_pay}
				})
			},
			tabClick(index) {
				console.log(index)
				this.tabCurrentIndex = index;
				this.get_myfriend()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hy{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.bottom11{
			width: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			.box {
				margin-top: 10px;
				width: 100%;
				height: 70px;
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding-bottom: 10px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
		
				.left {
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						margin-right: 10px;
						width: 60px;
						height: 60px;
					}
				}
		
				.middle {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 10px;
					height: 70px;
		
					.middle_top {
						display: flex;
						flex-direction: column;
						align-items: center;
						.name {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
							margin-right: 10px;
						}
		
						.xf {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
					}
		
					.bottom {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						padding: 0;
					}
				}
		
				.right {
					display: flex;
					flex-direction: column;
					margin-left: auto;
					height: 70px;
					justify-content: space-around;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(250, 92, 9, 1);
				}
			}
		}
		.tab{
			width: 90%;
			margin: 0 auto;
			margin-top: -10px;
			height: 100px;
			background:rgba(255,255,255,1);
			box-shadow:2px 12px 16px 0px rgba(245,245,245,0.4);
			border-radius:10px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.left{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:30upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.middle{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				padding-left: 20px;
				padding-right: 20px;
				border-left: 1px solid rgba(229,229,229,1);
				border-right: 1px solid rgba(229,229,229,1);
				.one{
					font-size:30upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:30upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
		}
		.top{
			width: 100%;
			height: 120px;
			background:linear-gradient(90deg,rgba(255,85,0,1),rgba(255,114,0,1));
			display: flex;
			justify-content: space-around;
			align-items: center;
			.left{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:42upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,247,241,1);
				}
			}
			.middle{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:38upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,247,241,1);
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:38upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,247,241,1);
				}
			}
		}
	}
</style>
