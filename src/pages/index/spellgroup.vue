<template>
	<view class="store">
		<!-- 头部图片 -->
		<view class="store-img">
			<image :src="'footer/pt.png' | imgUrl" mode=""></image>
		</view>
		<!-- 拼团 -->
		<view class="spellGroup">
			<view  v-for="(item,index) in grouplist" :class="['group-btn ','bgcolor'+index]" :key="index" @tap="goAllgroup(item)" :style="{'background-image':'url('+$mUtils.imgUrl('/index/bg_group'+(index+1)+'.png')+')'}">
				{{item.name}}
				<image v-if="index == 2" class="icon-sz-30" src="../../static/imgs/index/icon_hot.png" mode=""></image>
			</view>
		</view>
		<!-- 爆款推荐 -->
		<view class="faddishBooking">
			<view class="faddishTitle">
				<image class="title-img" :src="'footer/fanli_fill.png' | imgUrl" mode=""></image>
				<text class="fn-sz-36 fn-bold"> 爆款拼团 </text>
			</view>
			<view class="list-wrapper">
				<group-item :isGroup="true" v-for="(pro,idx) in groupProList" :key="idx" :item="pro"></group-item>
				<no-more class="width-100-per" :visible="nomore"></no-more>
				<load-more class="width-100-per" :visible="loading"></load-more>
			</view>
		
		</view>

	</view>
</template>

<script>
	import groupItem from "@/components/index/GroupItem.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			groupItem,	noMore,
			loadMore,
		},
		data() {

			return {
				//拼团
				grouplist: [{
						type: "3",
						name: "2人拼团",
						url: "/pages/group/towGroup"
					},
					{
						type: "4",
						name: "5人拼团",
						url: "/pages/group/fiveGroup"
					},
					{
						type: "5",
						name: "7人拼团",
						
					}
				],
				groupProList: [],
				page:1,
				pageSize:10,
				nomore:true,
				loading:false

			}
		},
		onLoad() {
			//获取拼团商品
			this.getGroupList()
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getGroupList()
		},
		methods: {
			//获取拼团商品
			getGroupList() {
				this.loading=true;
				this.nomore=false;
				this.$api.lists({
					type: [3,4,5], // 商品类型（1普通零售，2秒杀，3两人团，4五人团，5七人团）
					page: this.page,
					pageSize: this.pageSize,
					recommend:'yes'
				}).then(res => {
					console.log("获取拼团商品", res)
					this.loading=false;
					if (res.code == 200) {
						if (this.page == 1) {
							this.groupProList = res.data.data;
						} else {
							this.groupProList = this.groupProList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
						// this.groupProList = res.data.data;
					} else {
						console.log("获取拼团商品", res)
					}
				})
			},
			//点击跳转对应到相应的拼团页面
			goAllgroup(e) {
				if (e.type == '3') {
					this.$mUtils.goPage('allgroup', {
						type: 3
					})
				} else if (e.type == '4') {
					this.$mUtils.goPage('allgroup', {
						type: 4
					})
				} else {
					this.$mUtils.goPage('allgroup', {
						type: 5
					})
				}
				console.log(e, 'dfgh')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.store {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		// 头部
		.store-img {
			width: 100%;
			height: 362upx;

			image {
				width: 100%;
				height: 362upx;
			}
		}

		// 拼团
		.spellGroup {
			margin: 40upx 20upx 0upx;
			display: flex;
			justify-content: space-around;
			.group-btn{
				width: 210upx;
				height: 100upx;
				font-size: 30upx;
				color: #fff;
				background-size: cover;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.bgcolor0{
				background-color: #ff5a38;	
			}
			.bgcolor1{
				background-color: #f6c200;	
			}
			.bgcolor2{
				background-color: #5971fe;	
			}
			
			


		}

		// 商品详情
		// 今日必拼拼团
		.faddishBooking {
			width: 100%;
			// height: 1200upx;
			margin-top: 40upx;
			display: flex;
			flex-direction: column;
		
			.faddishTitle {
				display: flex;
				height: 100upx;
				align-items: center;
				padding: 0 20upx;
				box-sizing: border-box;
		
				.title-img {
					width: 30upx;
					height: 37upx;
					margin-right: 20upx;
				}
		
				view {
					width: 300upx;
					height: 60upx;
					font-size: 60upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 78upx;
					margin-left: 10upx;
				}
			}
		
			//产品详情
			.commodity1 {
				display: flex;
				justify-content: space-around;
				margin-top: 30upx;
				height: 577upx;
		
				.productDetails1 {
					flex-direction: column;
					width: 338upx;
					margin: 0upx 20upx;
					background: rgba(255, 255, 255, 1);
					border-radius: 10upx;
		
					image {
						width: 338upx;
						height: 300upx;
					}
		
		
					.productName1 {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
		
					}
		
					.priceList1 {
						display: flex;
						justify-content: space-between;
						margin-top: 20upx;
		
						.originalPrice1 {
							display: flex;
							flex-direction: column;
							font-size: 34upx;
							font-family: DIN;
							font-weight: 500;
							color: rgba(246, 42, 42, 1);
		
							.currentPrice1 {
								font-size: 24upx;
								text-decoration: line-through;
								color: rgba(153, 153, 153, 1);
							}
						}
		
						.sales1 {
							color: rgba(153, 153, 153, 1);
							font-size: 24upx;
						}
		
					}
				}
			}
		
		
		}
		
		.list-wrapper {
			padding: 0 20upx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}

	}
</style>
