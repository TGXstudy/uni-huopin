<template>
	<view class="my_collect">
		<view class="nav">
			<slide-delete class="bottom"  @tap.stop="xq(item)" v-for="(item,index) in sc_list" :key="index" :item="item" @deleteItem="deleteItem">
				<view class="left">
					<image :src="item.thumb" mode=""></image>
				</view>
				<view class="right">
					<view class="one">{{item.product_name}} </view>
					<view class="two">
						<p class='time'>¥ {{item.option_price}}</p>
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
		onLoad(){
		
			this.getlist()
		},
		data(){
			return{
				sc_list:[]
			}
		},
		methods:{
			xq(e){
				this.$mRouter.push({
					route: this.$mRoutesConfig.goodsDetails,
					query:{id:e.product_id,type:e.type}
				})
			},
			deleteItem(item){
				this.$api.collect({
					id:item.id,
					product_id:item.product_id
				}).then(res=>{
				if(res.code==200){
					this.$mUtils.toast(res.msg)
					this.$mUtils.timeout(() => {
					this.getlist();
					})
					
				}else{
					this.$mUtils.toast(res.msg)
				}
				})
			},
			getlist(){
				this.$api.collect_list().then(res=>{
					
					this.sc_list=res.data.data;
					console.log(this.sc_list)
					console.log("获取用户信息",res)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my_collect{
		width: 100%;
		flex-direction: column;
		background:rgba(246,246,246,1);
		.nav{
			width: 95%;
			margin: 0 auto;
			margin-top: 20px;
			background-color: #fff;
			border-radius:10px;
			padding: 20px;
			display: flex;
			flex-direction: column;
			.bottom{
				width: 100%;
				margin-top: 10px;
				height: 120px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229,229,229,1);
				padding-bottom: 20px;
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
		}
	}
</style>
