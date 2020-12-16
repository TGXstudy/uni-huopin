<template>
	<view class="banner">
		<!-- 轮播+输入框 -->
		<view class="navbanner">
			<view class="search" @tap="$mUtils.goPage('search')">
				<image class="icon" :src="'footer/search.png' | imgUrl"></image>
				<input type="text" class="fn-sz-26" disabled placeholder="搜索商品" />
			</view>
			<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots"
			 :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in banner_list" :key="index" @tap="goProductDetail(item)">
					<image class="bannerimg" :src="item.image"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="indexNav border-radius-10">
			<navigator :url="item.url " class="retailStore" v-for="(item,index) in navlist" :key="index">
				<image :src="item.imgs | imgUrl" ></image>
				<view class="fn-sz-22">
					{{item.name}}
				</view>
			</navigator>
		</view>
		<view class="notice border-radius-10">
			<image :src="'footer/jx.png' | imgUrl" mode="" @tap="$mUtils.goPage('notice',{type:'notice'})"></image>
			<view class="notice-list">
				<notice-scroll class="width-100-per" :list="ggxq_list"></notice-scroll>
			</view>
			
		</view>
		<!-- 拼团 -->
		<view class="groupBooking" :style="{'background-image':'url('+$mUtils.imgUrl('footer/fkkt.png')+')'}">

			<view class="groupTitle">
				<image class="titleImage" :src="'footer/rd.png' | imgUrl" mode=""></image>
				<view class="lookOver fn-sz-24" @tap="$mUtils.goPage('spellgroup')">
					<text>查看更多</text>
					<image :src="'footer/right.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="spellGroup">
				<view v-for="(item,index) in grouplist" :key="index" :class="['twoPeople',groupType == item.type ? 'current-group' : '']"
				 @tap="changeGroupType(item.type)">
					{{item.name}}
				</view>
			</view>
			<view class="list-wrapper">
				<group-item v-for="(pro,idx) in groupProList" :key="idx" :item="pro"></group-item>
			</view>

		</view>
		<!-- 爆款 -->
		<view class="faddishBooking">
			<view class="faddishTitle">
				<image class="title-img" :src="'footer/fanli_fill.png' | imgUrl" mode=""></image>
				<text class="fn-sz-36 fn-bold"> 爆款推荐 </text>
			</view>
			<view class="list-wrapper">
				<group-item  v-for="(pro,idx) in recdProList" :key="idx" :item="pro" :isGroup="pro.type == 3 || pro.type == 4 || pro.type == 5 "></group-item>
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
	import noticeScroll from "@/components/index/NoticeScroll.vue"
	export default {
		components: {
			groupItem,
			noMore,
			loadMore,
			noticeScroll
		},
		data() {
			return {
				nomore: true,
				loading: false,
				page: 1,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				ggxq_list: [], //公告列表
				//表示定义一个循环的图片数组，
				banner_list: [], //banner
				recdProList: [], //推荐商品
				//导航部分
				navlist: [{
						id: 1,
						imgs: "footer/ty.png",
						name: "零售商城",
						url: "/pages/index/store",

					},
					{
						id: 2,
						imgs: "footer/group_fill.png",
						name: "拼团商城",
						url: "/pages/index/spellgroup"
					},
					{
						id: 3,
						imgs: "footer/1.png",
						name: "红包商城",
						url: "/pages/index/shopping"
					},
					{
						id: 4,
						imgs: "footer/ms.png?time=1",
						name: "限时秒杀",
						url: "/pages/index/seckill"
					},
					{
						id: 5,
						imgs: "footer/r.png?time=1",
						name: "活动专区",
						url: "/pages/index/activity"
					},
				],
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
						url: "/pages/group/sevenGroup"
					}
				],
				groupType: 3, // 3两人团，4五人团，5七人团）
				groupProList: [], //拼团商品列表
			}
		},
		onLoad() {
			//获取推荐商品
			this.tj_list();
		},
		onShow() {
			//获取首页banner
			this.getBanner();
			//获取公告
			this.gg_list();
			//获取拼团商品
			this.getGroupList()
			
			console.log('this.$store.getters.hasLogin',this.$store.state.hasLogin)
			if(this.$store.getters.hasLogin){
				//是否绑定了手机号
				this.checkTel()
			}
			
			
		},
		//分享
		onShareAppMessage() {
			// console.log("path:",`/pages/goodsdetails/goodsDetails?id=${this.proId}&type=${this.type}&groupId=${this.shareGroupId}`)
			return {
				title:"伙拼乐购", //	String	是	分享标题	
				path:`/pages/index/index`, //	String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
				// imageUrl	String	否	分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4	
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.tj_list()
		},
		methods: {
			//banner 跳转商品详情
			goProductDetail(item){
				console.log("跳转商品详情",item);
				if(item.url){
					this.$mUtils.goPage("goodsDetails",{id:item.url,type:item.type})
				}else{
					this.$mUtils.toast("链接错误")
				}
			},
			//切换拼团类型
			changeGroupType(type) {
				this.groupType = type;
				//获取拼团商品
				this.getGroupList()
			},

			//获取首页banner
			getBanner() {
				console.log("获取首页banner", this.banner_list)
				this.$api.getBanner({
					type: 1
				}).then(res => {
					if (res.code == 200) {
						this.banner_list = res.data
					} else {
						this.$mUtils.toast(res.msg)
					}

				})
			},
			//获取公告
			gg_list() {
				this.$api.gg_list({
					page: 1,
					pageSize: 9999
				}).then(res => {
					this.ggxq_list = res.data.data

				})
			},
			
			//获取商品推荐
			tj_list() {
				this.loading = true;
				this.$api.lists({
					recommend: 'yes',
					page: this.page,
					pageSize: 10
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
						console.log("获取拼团商品", res)
					}
				})
			},

			//获取拼团商品
			getGroupList() {
				this.$api.lists({
					type: this.groupType, // 商品类型（1普通零售，2秒杀，3两人团，4五人团，5七人团）
					page: 1,
					pageSize: 2
				}).then(res => {
					console.log("获取拼团商品", res)
					if (res.code == 200) {
						this.groupProList = res.data.data;
					} else {
						console.log("获取拼团商品", res)
					}
				})
			},

			//跳转到分类
			goGoods() {
				this.$mRouter.switchTab({
					route: this.$mRoutesConfig.goods
				})
			},

	

			//是否绑定了手机号
			checkTel(){
				this.$api.checkTel().then(res=>{
					console.log("是否绑定了手机号",res)
					if(res.code == 200){
						this.$mRouter.back()
					}else if(res.code == 210){
						this.$mRouter.push({
							route:this.$mRoutesConfig.bindTel
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			}
		}


	}
</script>

<style lang="scss" scoped>
	.banner {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		// 轮播+输入框
		.navbanner {
			width: 100%;
			height: 400rpx;
			// position: relative;
			background: linear-gradient(-90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			justify-content: center;
			border-radius: 0rpx 0rpx 100rpx 150rpx;

			.search {
				width: 95%;
				height: 80rpx;
				border-radius: 33px;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				padding-left: 30upx;
				align-items: center;
				font-size: 14px;

				.icon {
					width: 15px;
					height: 15px;
					margin-right: 5px;
				}
			}

			.swiper {
				width: 90%;
				height: 350rpx;
				position: absolute;
				border-radius: 33px;
				top: 150rpx;
				margin: auto;
				// background-color: #007AFF;
				box-shadow: 1px 1px 10px 1px #eee;
			}
		}

		// 二级导航商品导航
		.indexNav {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: 70px 10px 0px;
			height: 180upx;
			background: rgba(255, 255, 255, 1);
			font-size: 14px;

			.retailStore {
				flex-direction: column;
				margin-left: 10px;

				image {
					width: 100upx;
					height: 100upx;
				}
				.more-width{
					width: 112upx;
				}
			}
		}

		// 最新公告
		.notice {
			// justify-content: center;
			align-items: center;
			margin: 20upx 10px 0px;
			height: 100upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;

			image {
				width: 140upx;
				height: 28upx;
				margin: 0upx 10upx;
			}
			.notice-list{
				flex:1;
				height: 100%;
				flex-shrink: 1;
				// background-color: red;
			}
			.introduce {

				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				margin-left: 20upx;
			}

		}

		// 今日必拼拼团
		.groupBooking {
			width: 100%;
			margin-top: 40upx;
			display: flex;
			flex-direction: column;
			background-size: cover;

			.groupTitle {
				height: 70upx;
				margin: 20upx 10px 0px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.titleImage {
					width: 176upx;
					height: 35upx;
				}

				.lookOver {
					align-items: center;
					margin-right: 20upx;
					display: flex;
					align-items: center;

					image {
						width: 12upx;
						height: 22upx;
						margin-left: 10upx;
					}
				}
			}

			//两人拼团
			.spellGroup {
				margin: 20upx 0;
				display: flex;
				justify-content: space-around;

				.twoPeople {
					display: flex;
					// justify-content: space-around;
					width: 210upx;
					height: 70upx;
					font-size: 30upx;
					// background: rgba(253, 116, 43, 1);
					background-color: rgba(255, 255, 255, .4);
					border-radius: 35upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF5900;
					justify-content: center;
					align-items: center;
					margin-left: 20upx;
					font-weight: 400;
				}

				.current-group {
					background-color: #FF5900;
					color: #fff;
				}

			}

			//产品详情
			.commodity {
				display: flex;
				margin-top: 30upx;
				height: 577upx;

			}

		}

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
