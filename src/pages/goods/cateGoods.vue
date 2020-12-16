<template>
	<view class="store">
		<!-- <view class="title" @tap="$mUtils.goPage('search',{type:1})">
			<image  :src="'footer/search.png' | imgUrl" mode=""></image>
			<input type="text" disabled value="" placeholder="请搜索需要商品" />
		</view> -->
		<!-- 商品全部分类 -->
		<cate-title :list="classList" @getCate="getCate" :initCateId="cateId" ></cate-title>
		<!-- <view class="classify">
			<view class="storeClass"
			@click="allActive(index)"
			v-for="(item,index) in classList" :key="item.cate_id"
			:class="active === index?'active' : ''">
				{{item.cate_name}}
			</view>
		</view> -->
		<view class="faddishBooking">
			<view class="list-wrapper">
				<group-item :isGroup="false" v-for="(pro,idx) in recdProList" :key="idx" :item="pro"></group-item>
				<no-more class="width-100-per" :visible="nomore"></no-more>
				<load-more class="width-100-per" :visible="loading"></load-more>
			</view>

		</view>
	</view>
</template>

<script>
	import groupItem from "@/components/index/GroupItem.vue"
	import cateTitle from "@/components/index/CateTitle.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			groupItem,cateTitle,noMore,
			loadMore,
		},
		data() {
			return {
				//商品全部分类
				recdProList: [], //获取商品列表
				classList:[],//获取分类
				active:'',
				//拼团
				pCateId:'',
				page:1,
				nomore: true,
				loading: false,
				cateId:''
			}
		},
		onLoad(options) {
			console.log("------",options);
			this.pCateId = options.pCateId || ''
				this.cateId= options.cateId || ''
			
			
			uni.setNavigationBarTitle({
				title:options.title
			})
			
			// //获取推荐商品
			this.tj_list();
			
			// // 获取二级分类
			this.getClass()
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.tj_list()
		},
		methods: {
			getCate(cate){
				this.cateId=cate.cate_id;
				this.page=1;
				this.tj_list()
			},
			//1.获取商品列表
			tj_list() {
				this.loading = true;
				this.nomore=false;
				this.$api.lists({
					page: this.page,
					pageSize: 10,
					p_cate_id:this.pCateId,
					cate_id:this.cateId
				}).then(res => {
					this.loading = false
					if (res.code == 200) {
						if (this.page == 1) {
							this.recdProList = res.data.data;
						} else {
							this.recdProList = this.recdProList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("lists获取商品列表", res)
					}
				})
			},
			//获取到商品分类
			getClass(){
				this.$api.get_cate({
					p_cate_id:this.pCateId
				}).then(res=>{
					if(res.code == 200){
						this.classList = res.data;
					}else{
						console.log("get_cate获取到分类",res)
					}
				})
			},
			allActive(index){
					this.active = index
			},
			//跳转到商品详情页面
			goGoodsdetails(item) {
				this.$mUtils.goPage('goodsDetails', {
					cateId: item.cate_id,
					title: item.cate_name
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.store {
		width: 100%;
		// height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			width: 95%;
			height: 80upx;
			border-radius: 66upx;
			background-color: #FFFFFF;
			margin:20upx auto;
			font-size: 24upx;
			justify-content: flex-start;
			align-items: center;

			image {
				width: 30upx;
				height: 30upx;
				margin: 0upx 30upx;
			}
		}

		// 商品全部分类
		.classify {
			display: flex;
			margin: 20upx 20upx 0upx;

			.storeClass {
				display: flex;
				width: 210upx;
				height: 70upx;
				background: #CCCCCC;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				justify-content: center;
				align-items: center;
				margin-left: 10upx;
			}
			.active{
				background-color: #FFFFFF;
				color: #CCCCCC;
			}
		}

		// 商品详情
		.faddishBooking {
			width: 100%;
			// height: 1200upx;
			display: flex;
			flex-direction: column;
			background-color: #fff;

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
