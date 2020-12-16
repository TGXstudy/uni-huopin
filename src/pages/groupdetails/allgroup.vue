<template>
	<view class="sevenGroup">
		<view class="theRules">
			<view @tap="$mUtils.goPage('protocol',{type:docType})">
				拼团规则
			</view>
		</view>
		<view class="list-wrapper">
			<view class="goshopGoods" v-for="(item,index) in groupProList" :key="item.id" @tap="goDetail(item)">
				<image class="product-img" :src="item.thumb" mode=""></image>
				<view class="product">
					<view class="goodsName two-line-txt fn-bold">
						{{item.product_name}}
					</view>
					<view class="price">
						￥{{item.pt_price}}
						<view class="presentPrice">
							￥{{item.option_price}}
						</view>
					</view>
					<view class="letterNum">
						剩余:{{item.pstock}}件
					</view>
					<view class="group">
						<text class="twoGroup fn-sz-24">
							{{item.type == 3 ? 2 : item.type == 4 ? 5 : 7}}人团
						</text>
						<!-- @tap.stop="goSpell(item.id)" -->
						<text class="goGroup fn-sz-24" >
							去拼团
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
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			noMore,
			loadMore
		},
		data() {
			return {
				//商品详情
				groupType: '', // 3两人团，4五人团，5七人团）//拼团商品列表
				groupProList: [], //拼团商品列表
				docType: '', //文档类型
				page: 1,
				pageSize: 10,
				nomore: true,
				loading: false
			}

		},
		onLoad(options) {
			console.log('00000', options)
			this.groupType = options.type;
			//1用户协议，7关于平台，8代理规则（合伙人权益），9积分规则，10两人拼团规则，11五人拼团规则，12，7人拼团规则,14合伙人权益
			this.docType = this.groupType == 3 ? 10 : this.groupType == 4 ? 11 : 12
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
				this.loading = true;
				this.nomore = false;
				this.$api.lists({
					type: this.groupType, // 商品类型（1普通零售，2秒杀，3两人团，4五人团，5七人团）
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log("获取拼团商品", res)
					this.loading = false;
					if (res.code == 200) {
						if (this.page == 1) {
							this.groupProList = res.data.data;
						} else {
							this.groupProList = this.groupProList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("获取拼团商品", res)
					}
				})
			},
			// 去拼团
			goSpell(id) {
				this.$mUtils.goPage("spell", {
					id
				})
			},
			//跳转商品详情页
			goDetail(item) {
				console.log("跳转商品详情页")
				let routeName = "goodsDetails"
				this.$mUtils.goPage(routeName, {
					id: item.id,
					type: item.type
				})
			}

		}

	}
</script>

<style lang="scss" scoped>
	.sevenGroup {
		width: 100%;
		display: flex;
		flex-direction: column;

		.theRules {
			width: 100%;
			height: 80upx;
			flex-direction: row-reverse;
			margin-top: 20upx;
			padding-right: 40upx;
			color: rgba(255, 89, 0, 1);
			font-size: 26upx;
		}


		.list-wrapper {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.goshopGoods {
				width: 100%;
				height: 320upx;
				display: flex;
				align-items: center;

				.product-img {
					width: 286upx;
					height: 286upx;
					margin-right: 35upx;
				}

				.product {
					flex: 1;
					flex-shrink: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 286upx;

					.goodsName {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.price {
						font-size: 36upx;
						font-weight: bold;
						font-family: DIN;
						font-weight: 500;
						color: rgba(255, 70, 70, 1);
						align-items: baseline;

						.presentPrice {
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							text-decoration: line-through;
							margin-top: 20upx;
							font-weight: normal;
						}
					}

					.letterNum {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						margin-top: 10upx;
						justify-content: space-between;

						.surplusNum {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);

						}
					}

					.group {
						// padding: 0 20upx;
						width: 195upx;
						height: 55upx;
						margin-top: 40upx;

						.twoGroup {
							width: 50%;
							line-height: 55upx;
							background-color: #F62A2A;
							border-radius: 0upx 0upx 0upx 20upx;
							text-align: center;

						}

						.goGroup {
							width: 50%;
							line-height: 55upx;
							background-color: #FDB916;
							border-radius: 0upx 20upx 0upx 0upx;
							text-align: center;

						}
					}
				}
			}


		}
	}
</style>
