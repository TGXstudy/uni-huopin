<template>
	<view class="pt">
		<view class="title">
			<text v-for="(item,index) in list" :key="index" :class="[ type == item.type ? 'cur-title':'']" @tap="getType(item.type)">{{item.name}}</text>
		</view>

		<view class="bottom">
			<view class="group-item" v-for="(group,idx) in groupList" :key="idx" v-if="group.status !=0" @tap="goDetail(group)">
				<image class="left" :src="group.thumb" mode=""></image>
				<view class="right">
					<view class="one">{{group.product_name}} </view>
					<view class="two" v-if="group.status == 1">
						<view class="person">还差<text class="fn-cl-orange">{{group.need}}人</text>拼成</view>
						<!-- <p class='time'>剩余05:34:43</p> -->
						<count-down :endTime="group.end_time"></count-down>
					</view>
					<view class="group-box">
						<text class="group-type">
							{{group.type == 22 ? 2 : group.type == 25 ? 5 : 7}}人团
						</text>
						<!-- 1拼团中，2拼团成功，3拼团失败,0未付款，4已完成,5拼团失败处理完成 -->
						
						<button v-if="group.status == 1" class="grop-op" open-type="share" :data-shareinfo="group" @tap.stop="">
							分享拼团
						</button>
						<text class="grop-op" v-else-if="group.status == 2">
							拼团处理中
						</text>
						<text class="grop-op" v-else-if="group.status == 4">
							拼团成功
						</text>
						<text class="grop-op" v-else-if="group.status == 3 || group.status == 5">
							拼团失败
						</text>
						<text class="grop-op" v-else>
							拼团{{group.status}}
						</text>
					</view>
				</view>
			</view>
			<no-more class="width-100-per" :visible="nomore"></no-more>
			<load-more class="width-100-per" :visible="loading"></load-more>
		</view>
	</view>
</template>

<script>
	import countDown from "@/components/goodsDetails/CountDown.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			countDown,
			noMore,
			loadMore
		},
		data() {
			return {
				page: 1,
				type: 0, //0全部，22两人团，25五人团，27七人团
				nomore: true,
				loading: false,
				list: [{
						name: '全部',
						type: '0'
					},
					{
						name: '2人团',
						type: '22'
					},
					{
						name: '5人团',
						type: '25'
					},
					{
						name: '7人团',
						type: '27'
					},
				],
				groupList: []
			}
		},
		onLoad() {
			
		},
		onShow() {
			// 拼团记录
			this.getMyGroupList()
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getMyGroupList()
		},
		onShareAppMessage(e) {
			console.log("分享", e)
			if (e.from == 'button') {
				let info = e.target.dataset.shareinfo;
				let type = info.type == 22 ? 3 : info.type == 25 ? 4 : 5
				let path = `/pages/goodsdetails/goodsDetails?id=${info.product_id}&type=${type}&groupId=${info.group_id}`
				console.log(path)
				return {
					title: info.product_name, //	String	是	分享标题	
					path: path, //	String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
					imageUrl: info.thumb,
				}
			}

		},
		methods: {
			//跳转拼团详情 
			goDetail(good) {
				// let type = group.type == 22 ? 3 : group.type == 25 ? 4 : 5
				let listId = good.id;
				console.log(this.$store.state.userinfo.id, 'fsd');
				//判断拼团计算完成才能进入详情 By joeyjiang
				if (good.status == 2 && good.mid != good.omid) {
					this.$mUtils.toast("拼团处理中，请稍后");
					return false;
				}
				console.log("跳转详情 TODO", listId)
				this.$mUtils.goPage("groupDetail",{listId})
			},
			//切换 拼团类型
			getType(type) {
				this.type = type;
				this.page = 1;
				this.getMyGroupList()
			},
			// 拼团记录
			getMyGroupList() {
				this.loading = true;
				this.$api.getMyGroupList({
					page: this.page,
					pageSize: 10,
					type: this.type
				}).then(res => {
					this.loading = false
					console.log("拼团记录", res)
					if (res.code == 200) {

						if (this.page == 1) {
							this.groupList = res.data.data
						} else {
							this.groupList = this.groupList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {

					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pt {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: #fff;

		.title {
			width: 95%;
			margin: 0 auto;
			display: flex;
			height: 50upx;
			justify-content: space-around;

			text {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.cur-title {
				border-bottom: 5upx solid #FF7200;
			}

		}

		.bottom {
			display: flex;
			flex-direction: column;
			margin-top: 10px;

			.group-item {
				width: 100%;
				height: 286upx;
				display: flex;
				margin-bottom: 40upx;
				justify-content: space-between;

				.left {
					width: 286upx;
					height: 286upx;
					margin-right: 20upx;
					background-color: #f6f6f6;
					border-radius: 10upx;
				}

				.right {
					flex: 1;
					flex-shrink: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.one {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333;
					}

					.two {
						display: flex;
						flex-direction: column;

						.person {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);

						}

						.time {
							margin-top: 5px;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
						}
					}

					//   
					.group-box {
						.group-type {
							display: block;
							height: 55upx;
							padding: 12upx 25upx;
							font-size: 24upx;
							background-color: #F62A2A;
							color: #fff;
							border-radius: 0upx 0upx 0upx 20upx;
							box-sizing: border-box;
						}

						.grop-op {
							display: block;
							height: 55upx;
							padding: 0 25upx;
							font-size: 24upx;
							background-color: #FDB916;
							color: #333;
							border-radius: 10upx 20upx 0upx 10upx;
							margin-left: -10upx;
							line-height: 55upx;
							box-sizing: border-box;
						}

						button.grop-op {
							padding: 0 25upx;
						}
					}

				}
			}
		}
	}
</style>
