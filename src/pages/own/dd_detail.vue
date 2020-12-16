<template>
	<view class="dd_detail">
		<view class="top">

			<p v-if="fh.order_status===1">待付款</p>
			<p v-if="fh.order_status===2">待发货</p>
			<p v-if="fh.order_status===3">待收货</p>
			<p v-if="fh.order_status===5">已完成</p>
			<p v-if="fh.return_status===3">待退款</p>
			<p v-if="fh.return_status===8">已退款</p>
			<p v-if="fh.order_status===10 && fh.exchange_status===3">待换货</p>
			<p v-if="fh.order_status===4">待评价</p>
			<p v-if="fh.order_status===10 &&fh.exchange_status===0">待审核(换货)</p>
			<p v-if="fh.order_status===10 && fh.exchange_status===4">待收货(换货)</p>
			<p v-if="fh.order_status===10 && fh.exchange_status===2">审核拒绝(换货)</p>
			<p v-if="fh.order_status===10 && fh.exchange_status===1">审核通过(换货)</p>
			<p v-if="fh.order_status===9 && fh.return_status===0">待审核(退货)</p>
			<p v-if="fh.order_status===9 && fh.return_status===2">审核拒绝(退货)</p>
			<p v-if="fh.order_status===9 && fh.return_status===1">审核通过(退货)</p>
			<p v-if="fh.order_status===6">已取消</p>


			<image :src="'mine/xq_banner.png' | imgUrl"></image>
		</view>
		<!-- 信息 -->
		<view class="detail_b">
			<image class="dw" :src="'mine/dw.png' | imgUrl"></image>
			<view class="nav">
				<view class="one">
					<h3>{{address.fullname}}</h3>
					<p>{{address.phone}}</p>
				</view>
				<view class="two">
					<span>{{address.province}}</span>
					<span>{{address.city}}</span>
					<span>{{address.county}} {{address.address}}</span>
				</view>
			</view>
			<image class="jt" :src="'mine/jt.png' | imgUrl" mode=""></image>
		</view>
		<!-- 商品信息 -->
		<view class="box_b" v-for="(item,index) in sp_list" :key="index">
			<view class="topa">
				<view class="left">
					<image :src="item.thumb" mode=""></image>
				</view>
				<view class="right">
					<h3>{{item.product_name}}</h3>
					<p>
						<span class="jr">￥{{item.price}}</span>
						<span>×{{item.num}}</span>
					</p>
				</view>
			</view>

			<!-- 评价内容 -->
			<view class="detail_f" v-if="fh.order_status==5">
				<view class="one">
					评价内容
				</view>
				<p>{{item.comment_content}}</p>
			</view>
		</view>

		<!-- 价格 -->
		<view class="detail_c">
			<view class="one">
				价格明细
			</view>
			<view class="two">
				<view class="left">
					商品金额
				</view>
				<view class="right">
					¥ {{fh.product_price}}
				</view>
			</view>
			<view class="three">
				<view class="left">
					运费
				</view>
				<view class="right">
					¥ {{fh.express_price}}
				</view>
			</view>
			<view class="four">
				<view class="left">
					订单金额
				</view>
				<view class="right">
					¥ {{fh.total_price}}
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="detail_d">
			<view class="one">
				订单信息
			</view>
			<view class="two">
				<view class="left">
					订单编号
				</view>
				<view class="right">
					{{fh.order_no}}
				</view>
			</view>
			<view class="two">
				<view class="left">
					订单变更时间
				</view>
				<view class="right">
					{{fh.update_time}}
				</view>
			</view>
		</view>
		<!-- 快递信息 -->
		<view class="detail_d" v-if="fh.order_status==3||fh.order_status==4||fh.order_status==5">
			<view class="one">
				快递信息
			</view>
			<view class="two">
				<view class="left">
					快递公司
				</view>
				<view class="right">
					{{fh.send_express.express_name || fh.exchange_express.express_name || fh.refund_express.express_name}}
				</view>
			</view>
			<view class="two">
				<view class="left">
					快递单号
				</view>
				<view class="right">
					{{fh.send_express.express_code || fh.exchange_express.express_code || fh.refund_express.express_code}}
				</view>
			</view>
		</view>
		<!-- 换货信息-待换货 -->
		<view class="detail_e" v-if="fh.order_status==10">
			<view class="one">
				换货原因
			</view>
			<view class="two">
				<p>{{fh.return_reason.exchange_reason}}</p>
				<view class="img">
					<image :src="item" v-for="(item,index) in fh.return_reason.exchange_image"></image>
				</view>
			</view>

			<!-- 换货审核 -->
			<view class="qt" v-if="fh.order_status==10 && fh.exchange_status==4">
				<view class="four">
					换货物流
				</view>
				<view class="five">
					<view class="left">
						快递公司
					</view>
					<view class="right">
						{{fh.exchange_express.express_name}}
					</view>
				</view>
				<view class="six">
					<view class="left">
						快递单号
					</view>
					<view class="right">
						{{fh.exchange_express.express_code}}
					</view>
				</view>
				<view class="four">
					换货已寄出注意查收
				</view>
			</view>

			<view class="jj" v-if="fh.order_status==10 && fh.exchange_status==2">
				<view class="one">
					拒绝原因
				</view>
				<p>{{fh.refuse_reason}}</p>
			</view>

			<view class="three" v-if="fh.order_status==10 && fh.exchange_status==1">
				换货申请已通过
			</view>

		</view>

		<!-- 退货信息 -->
		<view class="detail_e" v-if="fh.order_status==9">
			<view class="one">
				退货原因
			</view>
			<view class="two">
				<p>{{fh.return_reason.return_reason}}</p>
				<view class="img">
					<image :src="item" v-for="(item,index) in fh.return_reason.return_image"></image>
				</view>
			</view>
			<!-- 审核拒绝 -->
			<view class="jj" v-if=" fh.order_status==9 && fh.return_status==2">
				<view class="one">
					拒绝原因
				</view>
				<p>{{fh.refuse_reason}}</p>
			</view>
			<!-- 退货审核 -->
			<view class="qt" v-if=" fh.order_status==9 && fh.return_status==1">
				<view class="three">
					退货申请已通过
				</view>

			</view>
			<view class="qt" v-if=" fh.order_status==9 && fh.return_status==4">
				<view class="three">
					货款已原路返回
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				order_status: '', //订单状态
				address: {}, //收货地址信息
				sp_list: [], //商品列表
				fh: {}
			}
		},
		
		onLoad(options) {
			this.id = options.id;
			console.log(this.id);
			this.dd_detail()
		},
		methods: {
			dd_detail() {
				this.$api.dd_detail({
					id: this.id
				}).then(res => {
					this.order_status = res.data.order_status;
					this.address = res.data.address;
					this.sp_list = res.data.child;
					this.fh = res.data;
					console.log(res, 'ssss')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dd_detail {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(246, 246, 246, 1);

		.box_b {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			.topa{
				display: flex;
				background-color: #fff;
				padding: 10px;
				.left {
					image {
						width: 205upx;
						height: 205upx;
					}
				}
				.right {
					display: flex;
					flex-direction: column;
					h3 {
						padding: 10px;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
					p {
						padding: 10px;
						width: 98%;
						display: flex;
						justify-content: space-between;
						.jr {
							font-size: 30upx !important;
							color: rgba(246, 42, 42, 1) !important;
						}
						span {
							color: rgba(153, 153, 153, 1);
							font-size: 28upx;
						}
					}
				}
			}
		}
		.detail_f {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			p {
				margin-top: 10px;
				margin-bottom: 10px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		.detail_e {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			margin-bottom: 10px;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;


			.hh_dsh {
				color: #999999;
			}

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.two {
				display: flex;
				flex-direction: column;

				p {
					color: #999999;
					margin-bottom: 10px;
				}

				.img {
					display: flex;
					flex-wrap: wrap;
					margin-right: 10px;

					image {
						width: 205upx;
						height: 205upx;
					}
				}
			}

			.jj {
				display: flex;
				flex-direction: column;
				height: 50px;
				justify-content: space-around;
				margin-top: 10px;

				.one {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				p {
					margin-top: 10px;
					margin-bottom: 10px;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}

			.qt {
				display: flex;
				flex-direction: column;
				height: 150px;
				justify-content: space-around;

				.three {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					color: #333333;
				}

				.four {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}

				.five {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.left {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.right {
						font-size: 30upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}

				.six {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.left {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.right {
						font-size: 30upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

		}

		.detail_d {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			height: 150px;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			.two {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}


		}

		.detail_c {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			height: 200px;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			.two {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}

			.three {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}

			.four {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(243, 38, 45, 1);
				}
			}
		}

		.detail_b {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			height: 100px;
			padding: 10px;
			border-radius: 10px;
			justify-content: space-around;
			align-items: center;

			.dw {
				width: 40px;
				height: 40px;
			}

			.jt {
				width: 12px;
				height: 22px;
			}

			.nav {
				display: flex;
				flex-direction: column;

				.one {
					display: flex;
					align-items: center;

					h3 {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					p {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}

				.two {
					span {
						margin: 5px;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}
				}
			}

		}

		.top {
			width: 100%;
			height: 160upx;
			display: flex;
			flex-direction: column;
			position: relative;

			p {
				padding-left: 50upx;
				position: absolute;
				top: 50upx;
				left: 0;
				z-index: 99;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 160upx;
			}
		}



	}
</style>
