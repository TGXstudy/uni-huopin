<template>
	<view class="shopping">
		<!-- 头部图片 -->
		<view class="store-img">
			<image :src="topImg" mode=""></image>
		</view>
		<view class="integral">
			<view @tap="$mUtils.goPage('score')" class="Img">
				<image :src="'footer/1.png' | imgUrl" mode=""></image>
				<view class="allIntegral">
					{{userinfo.score}}
				</view>
			</view>
			<view class="integralRules">
				<view @tap="$mUtils.goPage('protocol',{type:9})">红包规则</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="faddishBooking">
			
			<view class="list-wrapper">
				<group-item :isGroup="false" v-for="(pro,idx) in storeList" :key="idx" :item="pro"></group-item>
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
			groupItem,
			noMore,
			loadMore
		},
		data() {
			return {
				topImg:{}, //头部图片
				userinfo: {}, //用户信息
				storeList: [],
				page: 1,
				pageSize: 10,
				nomore: true,
				loading: false
			}
		},
		onLoad() {
			this.getStroeList()
			this.getUserInfo()
			
			this.getBanner()
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getStroeList()
		},
		methods: {
			//头部图片
			getBanner(){
				this.$api.getBanner({type:3}).then(res=>{
					if(res.code == 200){
						console.log("头部图片",res)
						this.topImg = res.data && res.data[0] && res.data[0].image
					}
				})
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userinfo = res.data;

				})
			},
			//获取商品推荐列表
			getStroeList() {
				this.loading = true;
				this.nomore = false;
				this.$api.getScoreList({
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					this.loading = false;
					if (res.code == 200) {
						if (this.page == 1) {
							this.storeList = res.data.data;
						} else {
							this.storeList = this.storeList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("storeList获取商品列表", res)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.shopping {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		// 头部
		.store-img {
			height: 500upx;
			justify-content: center;
			margin-top: 40upx;

			image {
				width: 95%;
				height: 500upx;
			}

		}

		.integral {
			height: 100upx;
			display: flex;
			justify-content: space-between;
			margin: 30upx 20upx 0upx;

			.Img {
				display: flex;

				image {
					width: 80upx;
					height: 80upx;
				}

				.allIntegral {
					padding-top: 10upx;
				}
			}
		}

		// 商品详情


		// 商品详情
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
