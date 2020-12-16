<template>
	<view class="goodsDetails">
		<view class="goodsImg">
			<carousel class="width-100-per" :list="proDetail.info && proDetail.info.banners" :isPreview="true"></carousel>
		</view>
		<view class="seckillPrice" :style="{'background-image':  'url('+$mUtils.imgUrl('shouye/bg_kill.png')+')'}" v-if=" type == 2">
			<view class="lf-price">
				秒杀价
				<view class="priceMoney">
					￥{{proDetail.info.kill_price || 0}}
				</view>
			</view>
			<view class="rt-price" v-if="skillStatus == 'ing'">
				距结束仅剩
				<count-down class="endTime" v-if="type == 2" :endTime="killEndTime"></count-down>
			</view>
			<view class="rt-price not-ing" v-else>
				{{skillStatus == 'before' ? '暂未开始' : '已结束'}}
			</view>
		</view>

		<view class="detailsPrice fn-bold" v-if="type != 2 &&  type != 6">

			¥ {{proDetail.info.option_price || 0 }}-{{proDetail.info.max_option_price || 0 }}
			<!-- <text v-if="type == 3 || type == 5 || type == 5" class="fn-cl-999 fn-sz-30 del-line">￥ 11111</text> -->
		</view>
		<view class="detailsPrice" v-if="type == 6">
			<text class="fn-bold">{{proDetail.info.score || 0 }}</text><text class="fn-sz-30"> 红包</text>
		</view>
		<view class="goodsName fn-bold">
			{{proDetail.info.product_name || ''}}
		</view>
		<view class="sold" v-if="type != 2">
			已售{{proDetail.info.total_sale}}
		</view>
		<view class="kill-breif" v-if="type == 2">
			<text class="fn-sz-24 fn-cl-red">{{proDetail.info.option_price || 0}}</text>
			<text class="fn-sz-22 fn-cl-999">已售{{proDetail.info.total_sale || 0}}</text>
		</view>
		<view class="spelledGroup" v-if=" (type == 3 || type == 4 ) && proDetail.group_join_num>0">
			<view class="participate">
				<view class="userGroup">
					{{proDetail.group_join_num}}人在拼团，可直接参与
				</view>

				<view class="toaView" @tap="$mUtils.goPage('spell',{productId: proDetail.info.id})">
					<text>查看更多</text>
					<image :src="'footer/right.png' | imgUrl" mode=""></image>
				</view>

			</view>
			<view class="group-list" v-if=" type == 3 || type == 4">
				<!-- @updateList="getProDetail" -->
				<group-two-item class="width-100-per" v-for="(item,idx) in groupList" :key="idx" :item="item" @goGroup="goGroup"></group-two-item>
			</view>

		</view>
		<view class="spelledGroup" v-if=" type == 5 && sevenTotal >0">
			<view class="participate">
				<view class="userGroup">
					已成团{{sevenTotal}}个拼团
				</view>

				<view class="toaView" @tap="$mUtils.goPage('spell',{type:type})">
					<text>查看更多</text>
					<image :src="'footer/right.png' | imgUrl" mode=""></image>
				</view>

			</view>
			<view class="group-list">
				<group-two-item class="width-100-per" v-for="(item,idx) in groupList" :key="idx" :item="item" :type="'seven'"></group-two-item>
			</view>

		</view>

		<view class="details">
			<view :class="['goodsTemplate', curDetailTab == 'content'?'current-tab' :'']" @tap="getDetailType('content')">
				商品详情
			</view>
			<view :class="['evaluation', curDetailTab == 'comment'?'current-tab' :'']" @tap="getDetailType('comment')">
				用户评价({{proDetail.comment_num || 0}})
			</view>
		</view>
		<view class="detailsImg" v-if="curDetailTab == 'content'">

			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="detailsImg" v-else>
			<text class="fn-cl-999 fn-sz-28 no-data" v-if="commentList.length <= 0"> 暂无评论</text>
			<view class="comment-list" v-else>
				<comment-item class="width-100-per" v-for="(item,idx) in commentList" :key="idx" :item="item"></comment-item>
				<no-more class="width-100-per" :visible="nomore"></no-more>
				<load-more class="width-100-per" :visible="loading"></load-more>
			</view>

		</view>
		<!-- 底部购物车 -->
		<bottom-menu :product="proDetail" :groupId="shareGroupId" @doPurchase="doPurchase"></bottom-menu>
		<!--  -->
		<option-popup ref="options" :proDetail="proDetail" :initCurOption="curOption" :groupId="groupId" :buyType="buyType"></option-popup>

	</view>

	</view>
</template>

<script>
	import optionPopup from "@/components/goodsDetails/OptionPopup.vue"
	import bottomMenu from "@/components/goodsDetails/BottomMenu.vue"
	import count from "@/components/count/count.vue"
	import carousel from "@/components/Carousel.vue"
	import groupTwoItem from "@/components/goodsDetails/GroupTwoItem.vue"
	import commentItem from "@/components/goodsDetails/CommentItem.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	import countDown from "@/components/goodsDetails/CountDown.vue"

	export default {
		components: {
			optionPopup,
			bottomMenu,
			count,
			carousel,
			groupTwoItem,
			commentItem,
			noMore,
			loadMore,
			countDown

		},
		data() {
			return {
				proId: '',
				type: '', //type（1普通零售，2秒杀，3两人团，4五人团，5七人团）
				proDetail: {}, //商品详情
				// banner: {},
				content: '',
				buyType: 'now', //购买方式  now 立即购买 group 拼团 cart 加入购物车
				proOptions: [], //规格
				curOption: {}, //当前选择的规格 
				buyAmount: 1, //购买数量
				groupList: [],
				groupId: '',

				shareGroupId: "",

				curDetailTab: 'content', //  comment
				sevenTotal: '', //已成团{{sevenTotal}}个拼团

				commentList: [], // 评论列表
				page: 1, //评论列表 分页
				pageSize: 10,
				nomore: true,
				loading: false,
				killEndTime: '',
				skillStatus:'' , //秒杀商品状态 before ing end
				 
			}
		},
		onReachBottom() {
			if (this.nomore && this.curDetailTab != 'comment') return;
			console.log("上拉加载更多....")
			this.page++;
			this.getCommentList()
		},
		onLoad(options) {
			//type（1普通零售，2秒杀，3两人团，4五人团，5七人团）
			console.log(options)
			this.proId = options.id || 0;
			this.type = options.type || 1


			this.shareGroupId = options.groupId || ''


		},
		onShareAppMessage() {
			// console.log("path:",`/pages/goodsdetails/goodsDetails?id=${this.proId}&type=${this.type}&groupId=${this.shareGroupId}`)
			return {
				title:this.proDetail.info.product_name, //	String	是	分享标题	
				path:`/pages/goodsdetails/goodsDetails?id=${this.proId}&type=${this.type}&groupId=${this.shareGroupId}`, //	String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
				// imageUrl	String	否	分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4	
			}
		},
		onShow: function() {
			//获取商品详情
			this.getProDetail()
			if (this.type == 5) { //七人团
				//获取七人团列表
				this.getSevenList()

			}
		},
		methods: {
			//获取七人团列表
			getSevenList() {
				this.$api.getSevenGroup({
					page: 1,
					pageSize: 2
				}).then(res => {
					console.log("获取七人团列表", res)
					if (res.code == 200) {
						this.groupList = res.data.data;
						this.sevenTotal = res.data.total;
					} else {
						console.log("获取七人团列表", res)
					}
				})
				// 7人团拼团记录  getSevenGroup 
			},
			//去拼团
			goGroup(groupId) {
				console.log("去拼团", groupId)
				this.buyType = 'group';
				this.groupId = groupId;
				console.log("购买方式", this.buyType, this.type)
				this.$refs.options.open()
			},

			//获取商品详情
			getProDetail() {
				this.$api.getProDetail({
					id: this.proId
				}).then(res => {
					console.log("获取商品详情", res)
					if (res.code == 200) {
						this.proDetail = res.data
						this.content = this.$mUtils.rplaceRichImg(this.proDetail.info.content)
						this.groupList = this.proDetail.group_list;
						// this.banner = this.proDetail.info.banners[0]
						this.proOptions = this.proDetail.options;
						this.curOption = this.proOptions && this.proOptions[0]; //当前选择的规格 

						if (this.type == 2) { //秒杀商品
							let nowTime = new Date().getTime()/1000;
							this.skillStatus = 'before'
							if(res.data.info.start_time > nowTime){
								console.log("没开始");
								this.skillStatus = 'before'
							}else if(res.data.info.end_time > nowTime){
								console.log("进行中")
								this.skillStatus = 'ing'
								this.killEndTime =res.data.info.end_time
								// console.log("”秒杀商品", res.data.info.end_time, res.data.info.start_time, new Date(2020,8,18).getTime())
								
							}else{
								console.log("结束")
								this.skillStatus = 'end'
							}
						
						
							
						}
					} else {
						this.$mUtils.toast("商品不存在！")
						this.$mUtils.timeout(() => {
							this.$mRouter.back();
						})
					}

				})
			},

			//点击底部菜单 购买
			doPurchase(type) {
				this.buyType = type;
				this.groupId = this.shareGroupId || '';
				console.log("购买方式----------", this.buyType)
				if (this.buyType == 'point') {
					console.log("积分兑换")
					this.$mUtils.goPage("pointConfirmOrder", {
						product_id: this.proId,
						score: this.proDetail.info.score,
						product_name: this.proDetail.info.product_name,
						thumb: this.proDetail.info.thumb
					})
				}else if(this.type == 2 && this.skillStatus != 'ing'){
					this.$mUtils.toast(this.skillStatus == 'before' ? '秒杀暂未开始' : '秒杀已结束')
				} else {
					//检查拼团状态 
					if(this.groupId){
						this.$api.checkGroup({
							group_id:this.groupId
						}).then(res=>{
							if(res.code == 200){
								this.$refs.options.open()
							}else{
								this.$mUtils.toast(res.msg)
							}
						})
					}else{
						this.$refs.options.open()
					}
					
				}

			},
			//切换商品详情和评论
			getDetailType(type) {
				this.curDetailTab = type;
				if (this.curDetailTab == 'comment') {
					this.getCommentList()
				}
			},
			getCommentList() {
				this.loading = true;
				this.$api.getCommentList({
					id: this.proId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log("", res);
					this.loading = false
					if (res.code == 200) {
						if (this.page == 1) {
							this.commentList = res.data.data;
						} else {
							this.commentList = this.commentList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("评论", res);
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.goodsDetails {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding-bottom: 120upx;

		.goodsImg {
			height: 600upx;

			image {
				width: 100%;
				height: 600upx;
			}
		}


		.seckillPrice {
			display: flex;
			justify-content: space-between;
			padding: 30upx;
			width: 100%;
			height: 125upx;
			background-size: contain;
			margin-top: -25upx;
			z-index: 9;

			.lf-price {
				flex-direction: column;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;

				.priceMoney {
					font-size: 44upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}

			.rt-price {
				flex-direction: column;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;

				.endTime {
					/deep/view {
						font-size: 44upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
			.not-ing{
				line-height: 125upx;
				font-size: 44upx;
			}
		}

		.breif-box {
			width: 1000%;
			padding: 30upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}

		.detailsPrice {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			height: 100upx;
			display: flex;
			align-items: center;
			font-size: 48upx;
			font-family: DIN;
			color: rgba(246, 42, 42, 1);

		}

		.goodsName {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			font-size: 36upx;
			font-family: PingFang SC;
			color: rgba(51, 51, 51, 1);
			margin: 20upx 0;
		}

		.sold {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			height: 90upx;
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			display: flex;
			align-items: center;
		}

		.kill-breif {
			display: flex;
			justify-content: space-between;
			height: 60upx;
			width: 100%;
			padding: 0 20upx;
			box-sizing: border-box;
			align-items: center;

		}

		//正在拼团
		.spelledGroup {
			display: flex;
			flex-direction: column;
			width: 100%;

			.participate {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0 20upx;
				box-sizing: border-box;

				.userGroup {
					width: 60%;
					height: 60upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(250, 95, 9, 1);
					line-height: 60upx;
				}

				.toaView {
					width: 40%;
					height: 60upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999;
					line-height: 60upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					image {
						width: 12upx;
						height: 22upx;
						margin-left: 20upx;
					}
				}
			}

			.userName {
				display: flex;
				justify-content: space-between;
				margin-top: 30upx;
				width: 100%;

				.useraAatars {
					display: flex;
					width: 40%;

					.portrait {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						border: 1px solid #CCCCCC;
						margin: 0upx 20upx;
					}

					.name {
						font-size: 32upx;
						align-items: center
					}
				}

				.clouds {
					width: 60%;
					display: flex;
					flex-direction: column;
					font-size: 34upx;

					.buildGroup {
						color: rgba(153, 153, 153, 1);
						font-size: 28upx;
					}
				}
			}

			.group-list {
				width: 100%;
				padding: 0 20upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
			}

		}

		.details {
			display: flex;
			justify-content: space-around;
			height: 100upx;
			align-items: center;

			.goodsTemplate {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				height: 80upx;
				line-height: 80upx;

			}

			.current-tab {
				border-bottom: 6upx solid #F6830A;
			}

			.evaluation {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				height: 80upx;
				line-height: 80upx;
			}
		}

		.detailsImg {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;

			.no-data {
				display: block;
				width: 100%;
				line-height: 100upx;
				text-align: center;
			}

		}

		.comment-list {
			width: 100%;
			display: flex;
			flex-direction: column;
		}

		.goshopGoods {

			/deep/.uni-popup__wrapper-box {
				background-color: #fff;
				width: 100%;
				min-height: 700upx;
			}

			.slot-box {
				padding: 30upx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
			}

			.content-box {
				width: 100%;
				display: flex;
				flex-direction: column;
			}

			.popup-detail {

				width: 100%;
				margin-bottom: 20upx;

				.detail-img {
					width: 230upx;
					height: 230upx;
					margin-right: 30upx;
					background-color: #f6f6f6;
					border-radius: 10upx;
				}

				.detail-txt {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
				}
			}

			.choosenum {
				margin-top: 20upx;
				display: flex;
				flex-wrap: wrap;

				.choose {
					margin: 0 25upx 20upx 0;
					padding: 18upx 35upx;
					background-color: #F6F6F6;
					font-size: 26upx;
					color: #333;
					border-radius: 40upx;
				}

				.cur-choose {
					background-color: #FA5E09;
					color: #fff;
				}
			}

			.num {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.confirm-btn {
				width: 100%;
				background-color: #FA5E09;
				color: #fff;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}

	}
</style>
