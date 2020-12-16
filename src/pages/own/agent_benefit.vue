<template>
	<view class="sy">
		<view class="top">
			<image :src="'mine/mbanner.png' | imgUrl" mode=""></image>

			<view class="left">
				<p class='one'>{{agentlist.total_wallet}}</p>
				<p class='two'>总收益(商城钱包)</p>
			</view>
			<view class="right">
				<p class='one'>{{agentlist.total_score}}</p>
				<p class='two'>红包收益</p>
			</view>
		</view>
		<!-- 选项卡切换 -->
		<view class="check">
			<view class="left" @click="tabClick(0)" :class="[ tabCurrentIndex == 0 ? 'active':'']">
				消费收益{{agentlist.fee1}}
			</view>
			<view class="right" @click="tabClick(1)" :class="[ tabCurrentIndex == 1 ? 'active':'']">
				推荐代理收益{{agentlist.fee2}}
			</view>
		</view>

		<!-- 列表 -->
		<view class="bottom" v-if="tabCurrentIndex === 0">
			<view class="box" v-for="(item,index) in xf_list" :key="index">
				<view class="left">
					<image :src="item.avatar"></image>
				</view>
				<view class="middle">
					<p class="middle_top">
						<span class='name'>{{item.nckname}}</span>
						<span class='xf'>消费{{item.total_price}}元</span>
					</p>
					<p class="bottom">
						<span>{{item.pay_time}}</span>
					</p>
				</view>
				<view class="right">
					<p class='right_top'>钱包+{{item.rebate_wallet}}</p>
					<p class='bottom1'>红包+{{item.rebate_score}}</p>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="tabCurrentIndex === 1">
			<view class="box" v-for="(item,index) in tj_list" :key="index">
				<view class="left">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view class="middle">
					<p class="middle_top">
						<span class='name'>{{item.nckname}}</span>
						<span class='xf'>消费{{item.total_price}}元</span>
					</p>
					<p class="bottom">
						<span>{{item.pay_time}}</span>
					</p>
				</view>
				<view class="right">
					<p class='right_top'>钱包+{{item.rebate_wallet}}</p>
					<p class='bottom1'>红包+{{item.rebate_score}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				agentlist: {},
				dailiDetailList: [],
				xf_list: [],
				tj_list: []
			}
		},
		onLoad() {
			this.getAgent()
			this.getAgent2()
			this.getdailiDetail()
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			getAgent() {
				this.$api.dailishouyi({
					type: 1,
					page: 1,
					pageSize: 10
				}).then(res => {
					console.log(res,'1')
					if (res.code == 200) {
						this.agentlist = res.data
						this.xf_list = res.data.list.data
					} else {
						console.log("dailishouyi===", res)
					}
				})
			},
			getAgent2() {
				this.$api.dailishouyi({
					type: 2,
					page: 1,
					pageSize: 10
				}).then(res => {
					console.log(res,'2')
					if (res.code == 200) {
						this.tj_list = res.data.list.data
					} else {
						console.log("dailishouyi===", res)
					}
				})
			},
			getdailiDetail() {
				this.$api.dailishouyi({
					type: 2,
					page: 1,
					pageSize: 10
				}).then(res => {
					if (res.code == 200) {
						this.agentlist = res.data;					
					} else {
						console.log("dailishouyi===", res)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scopd>
	.active {
		background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1)) !important;
		color: rgba(255, 255, 255, 1) !important;
	}

	.sy {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.bottom {
			width: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			.box {
				margin-top: 10px;
				width: 100%;
				height: 70px;
				display: flex;
				align-items: center;
				padding-bottom: 10px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.left {
					image {
						width: 60px;
						height: 60px;
					}
				}

				.middle {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 20px;
					height: 70px;

					.middle_top {
						.name {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
							margin-right: 10px;
						}

						.xf {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(250, 95, 9, 1);
						}
					}

					.bottom {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						padding: 0;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					margin-left: auto;
					height: 70px;
					justify-content: space-around;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(250, 92, 9, 1);
					
				}
			}
		}

		.check {
			width: 90%;
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;

			.left {
				width: 48%;
				height: 50px;
				background: rgba(255, 255, 255, 1);
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			.right {
				width: 48%;
				height: 50px;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(229, 229, 229, 1);
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		.top {
			width: 100%;
			height: 150px;
			position: relative;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.left {
				height: 60px;
				z-index: 99;
				width: 42%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;

				.one {
					font-size: 48upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}

				.two {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 247, 241, 1);
				}
			}

			.right {
				height: 60px;
				z-index: 99;
				width: 42%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;

				.one {
					font-size: 48upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}

				.two {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 247, 241, 1);
				}
			}

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 150px;
			}
		}
	}
</style>
