<template>
	<view class="kf">
		<view class="tb">
			<image  :src="'mine/wdkf.png' | imgUrl" mode=""></image>
			<p>官方客服中心</p>
		</view>
		<view class="tw" @tap="toxq(item.id)" v-for="(item,index) in wt_list" :key="index">
			<view class="box">
				<view class="left">
					{{item.title}}
				</view>
				<view class="right">
					<image :src="'mine/jt.png' | imgUrl"  mode=""></image>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left" @tap="tel_phone()">
				<image :src="'mine/wdphone.png' | imgUrl"  ></image>
				<p>{{phone_num}}</p>
			</view>
			<view class="right" @tap="tel_phone()">
				<image :src="'mine/wdxx.png' | imgUrl"   mode=""></image>
				<p>联系客服</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				wt_list:[],
				phone_num:'',//客服电话
			}
		},
		onLoad(){
			this.question();
			this.getVal();
		},
		methods:{
			getVal(){
				this.$api.getVal({
					key:'pt_tel'
				}).then(res=>{
					this.phone_num=res.data.val;
				})
			},
			tel_phone(){
				
				uni.makePhoneCall({
				    phoneNumber: this.phone_num, //仅为示例
				});
			},
			question(){
				this.$api.question().then(res=>{
					console.log(res)
					this.wt_list=res.data;
					
				})
			},
			toxq(e){
				this.$mRouter.push({
					route:this.$mRoutesConfig.customer_detail,
					query:{id:e}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.kf{
		width: 100%;
		display: flex;
		flex-direction: column;
		background:rgba(246,246,246,1);
		position: relative;
		padding-bottom: 70px;
		.bottom{
			height: 60px;
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			display: flex;
			
			align-items: center;
			.left{
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				border-right: 1px solid rgba(229,229,229,1);
				image{
					width: 25px;
					height: 25px;
					margin-right: 10px;
				}
				p{
					font-size:36upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
			.right{
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 25px;
					height: 25px;
					margin-right: 10px;
				}
				p{
					font-size:36upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
		}
		.tb{
			width: 40%;
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 40px;
			image{
				width: 100px;
				height: 100px;
			}
			p{
				margin-top: 10px;
				font-size:33upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(250,93,9,1);
			}
		}
		.tw{
			width: 100%;
			background-color: #fff;
			padding: 10px;
			.box{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50px;
				.left{
					
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
