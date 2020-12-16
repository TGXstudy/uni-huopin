<template>
	<view class="jl">
		<view class="box" v-for="(item,index) in jl_list" :key="index">
			<view class="top">
				<view class="left">
					变更时间：{{item.update_time}}
				</view>
				<view class="right">
					{{item.order_status | filter_status}}
				</view>
			</view>
			<view class="middle">
				<p v-if="item.express.express_name">物流公司：{{item.express.express_name}}</p>
				<p v-if="item.express.express_code">物流单号：{{item.express.express_code}}</p>
			</view>
			<view class="bottom" v-for="(item2,index2) in item.child" :key="index2">
				<view class="left">
					<image :src="item2.thumb" mode=""></image>
				</view>
				<view class="right">
					<view class="one">{{item2.product_name}}</view>
					<view class="two">
						<p class='time'>¥{{item2.total_price}}红包</p>
						<p>x{{item2.num}}</p>
					</view>
				</view>
			</view>
			<view class="box_c">
				<view class="btn ljfk" @tap="showAction('cancel',item.id)" v-if="item.order_status == 3">
					确认收货
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	
	export default {
		components: {
		
			
		},
		data() {
			return {
				jl_list: []
			}
		},
		onLoad() {
			this.jl()
		},
		methods: {
			
			showAction(actType, id) {
				this.orderId = id;
				let tipTxts = {
					cancel: '确认收货?',
					
				}
				let handler = {
					cancel: this.sh_qr,
					
				}
				uni.showModal({
					title: '',
					content: tipTxts[actType],
					success(res) {
						if (res.confirm) {
							handler[actType](id);
						}
					}
				})
			},
			sh_qr(e) {
				this.$api.sure_sh({
					id: e
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
						
							this.jl()
						})
					} else {
						this.$mUtils.toast(res.msg)
						
					}
				})
			
			},
			jl() {
				this.$api.jf_dd({
					page: 1,
					pageSize: 1000
				}).then(res => {
					console.log(res)
					this.jl_list = res.data.data;
				})
			}
		},
		filters: {
			filter_status(value) {
				
				if (value == 2) {
					return '待发货'
				}
				if (value == 3) {
					return '待收货'
				}
				if (value == 4) {
					return '已完成'
				}
				if(value == 5){
					return '已完成'
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jl {
		background: rgba(246, 246, 246, 1);
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px;
		.tc_qr {
			border-radius: 10px;
			width: 606upx;
			margin: 0 auto;
			height: 150px;
			background-color: #FFFFFF;
			padding: 20px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
		
			.title {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		
			.qr_btn {
				width: 100%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
		
				.qx {
					border: 1px solid rgba(220, 220, 220, 1);
				}
		
				.qr {
					border: none;
					color: #fff;
					background: -o-linear-gradient(left, #ff5500, #ff7200);
					background: linear-gradient(90deg, #ff5500, #ff7200);
		
				}
		
				button {
					border-radius: 37px;
					width: 48%;
					height: 45px;
		
				}
			}
		}
		.box {
			width: 100%;
			height: 435upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;

			.middle {
				display: flex;
				flex-direction: column;
				height: 40px;
				justify-content: space-around;

				p {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}

			.top {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}

				.right {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(250, 92, 9, 1);

				}
			}

			.box_c {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.btn {
					width: 23%;
					height: 60upx;
					border: 1px solid rgba(229, 229, 229, 1);
					border-radius: 31px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin-left: 5px;
				}

				.qxdd {
					color: rgba(153, 153, 153, 1);
				}

				.ljfk {
					color: #FFFFFF;
					background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
				}
			}

			.bottom {
				width: 100%;
				margin-top: 10px;
				height: 120px;
				display: flex;
				justify-content: space-between;

				.left {
					width: 40%;

					image {
						width:205upx;
						height:205upx;
						border-radius:10upx;
					}
				}

				.right {
					width: 55%;
					display: flex;
					flex-direction: column;
					padding-left: 20px;

					.one {
						font-size: 35upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.two {
						display: flex;
						flex-direction: column;
						margin-top: 10px;

						.person {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);

							span {
								color: #FF5900;
							}
						}

						.time {
							margin-top: 5px;
							font-size: 38upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #F3262D;
						}
					}

					.three {
						.left {
							width: 60px;
							height: 35px;
							background: rgba(246, 42, 42, 1);
							border-radius: 5px 0px 0px 19px;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
						}

						.right {
							color: #333333;
							width: 80px;
							height: 35px;
							background: rgba(253, 185, 22, 1);
							border-radius: 0px 22px 5px 0px;
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
