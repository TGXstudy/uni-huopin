<template>
	<view class="zj">
		<view class="box"  @tap.stop="xq(item)"  v-for="(item,index) in list" :key="index">
			<view class="title" >
				<image :src="'mine/history.png' | imgUrl" ></image>
				<p>{{item.time}}</p>
			</view>
			<slide-delete class="bottom" :item="item" @deleteItem="deleteItem">
				<view class="left">
					<image :src="item.thumb"  mode=""></image>
				</view>
				<view class="right">
					<view class="one">{{item.product_name}} </view>
					<view class="two" v-if="item.type!=='6'">
						<p class='time'>¥{{item.option_price}}</p>
					</view>
					<view class="two" v-if="item.type=='6'">
						<p class='time'>¥{{item.score}}红包</p>
					</view>
				</view>
			</slide-delete>
		</view>
	</view>
</template>

<script>
	import slideDelete from '@/components/SlideDelete/SlideDelete.vue'
	export default{
		components: {
			slideDelete
		},
		data(){
			return{
				list:[],
			}
		},
		onLoad(){
			this.gey_lb();
		},
		methods:{
			xq(e){
				this.$mRouter.push({
					route: this.$mRoutesConfig.goodsDetails,
					query:{id:e.product_id,type:e.type}
				})
			},
			deleteItem(item){
				this.$api.foot_del({
					id:item.id,
				}).then(res=>{
				if(res.code==200){
					this.$mUtils.toast(res.msg)
					this.$mUtils.timeout(() => {
					this.gey_lb();
					})
					
				}else{
					this.$mUtils.toast(res.msg)
				}
				})
			},
			gey_lb(){
				this.$api.foot({
					page:1,
					pageSize:1000
				}).then(res=>{
					this.list=res.data.data;
					console.log("获取用户信息",res)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.zj{
		width: 100%;
		display: flex;
		flex-direction: column;
		background:rgba(246,246,246,1);
		padding: 10px;
		padding-top: 20px;
		.box{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.bottom{
				width: 100%;
				height: 120px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229,229,229,1);
				padding-bottom: 20px;
				background-color: #fff;
				padding-top: 20px;
				.left{
					width: 40%;
					image{
						width:205upx;
						height:205upx;
						border-radius:10upx;
					}
				}
				.right{
					width: 55%;
					display: flex;
					flex-direction: column;
					padding-left: 20px;
					.one{
						font-size:35upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
					}
					.two{
						display: flex;
						flex-direction: column;
						margin-top: 10px;
						.person{
							font-size:30upx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							span{
								color: #FF5900;
							}
						}
						.time{
							margin-top: 5px;
							font-size:38upx;
							font-family:PingFang SC;
							font-weight:400;
							color:#F3262D;
						}
					}
					.three{
						.left{
							width:60px;
							height:35px;
							background:rgba(246,42,42,1);
							border-radius:5px 0px 0px 19px;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
						}
						.right{
							color: #333333;
							width:80px;
							height:35px;
							background:rgba(253,185,22,1);
							border-radius:0px 22px 5px 0px;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
			.title{
				display: flex;
				align-items: center;
				width: 100%;
				margin-bottom: 10px;
				margin-top: 10px;
				image{
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
				p{
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
		}
	}
</style>
