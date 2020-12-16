<template>
	<view class="my_order">
		<view class="top">
			<view class="title" :class="[ currenStatus == item.status ? 'cur-title':'']" @tap="changeStatus(item)" v-for="(item,index) in statusList"
			 :key="index">
				{{item.ext}}
			</view>
		</view>



		<orderItem v-for="(item,idx) in orderList" :key='idx' :item="item" @update="getOrderList"></orderItem>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>

	</view>

</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	import orderItem from '@/components/mine/orderItem.vue';
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			uniPopup,
			uImg,
			orderItem,
			noMore,
			loadMore
		},
		data() {
			return {
				limitNum: 6,
				uploadFileUrl: '', //替换成你的后端接收文件地址
				name: '', //上传的名字
				page: 1,
				header: { // 如果需要header，请上传
				},
				nomore: true,
				loading: false,
				uImgList: [], //上传图片列表
				xx_value: 2, //打分
				currenStatus: 0, //分类
				orderList: [], //列表
				statusList: [{
						status: 0,
						ext: '全部'
					},
					{
						status: 1,
						ext: '待付款'
					},
					{
						status: 2,
						ext: '待发货'
					},
					{
						status: 3,
						ext: '待收货'
					},
					{
						status: 4,
						ext: '待评价'
					},
					{
						status: 5,
						ext: '已完成'
					},
					// {
					// 	status:6,
					// 	ext: '已取消'
					// },
					// {
					// 	status:7,
					// 	ext: '拼团中'
					// },
				]
			}
		},
		watch: {
			uImgList(newVal) {
				console.log(newVal, "m,,......");

			},
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getOrderList();
		},
		onLoad(options) {
			console.log('1123sxcv', options)
			this.currenStatus = options.status
			//订单列表
			this.getOrderList();
		},
		methods: {
			//获取订单列表
			getOrderList() {
				this.loading = true;
				this.$api.get_dd({
					page: this.page,
					pageSize: 10,
					order_status: this.currenStatus
				}).then(res => {
					console.log(res,'sfg')
					this.loading = false
					if (res.code == 200) {
						if (this.page == 1) {
							this.orderList = res.data.data;
						} else {
							this.orderList = this.orderList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;

					} else {
						console.log("获取拼团商品", res)
					}
					//this.orderList=res.data.data;

				})
			},
			uploadSuccess(result) {
				console.log(this.uImgList, '212121221')
				if (result.statusCode == 200) {
					//上传成功的回调处理
					console.log('上传成功')
				} else {
					console.log('上传失败')
				}
			},
			//上传方法的调用
			upFile() {
				this.$refs.upimg.upload()
			},
			// 打分
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			},
			// 确认收货
			sh_open() {
				this.$refs.sh.open()
			},
			sh_close() {
				this.$refs.sh.close()
			},
			// 评价
			pj_open() {
				this.$refs.pj.open()
			},
			pj_close() {
				this.$refs.pj.close()
			},
			// 退货
			th_open() {
				this.$refs.th.open()
			},
			th_close() {
				this.$refs.th.close()
			},

			dd_xq() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.dd_detail,
				})
			},
			changeStatus(item) {
				this.currenStatus = item.status;
				this.getOrderList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zhtx-single {
		width: 80px !important;
		height: 80px !important;
	}

	.cur-title {
		border-bottom: 5upx solid #FF7200;
	}

	uni-popup {
		width: 100%;
	}

	.th {
		border-radius: 10px;
		width: 606upx;
		margin: 0 auto;
		min-height: 400px;
		background-color: #FFFFFF;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

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

		input {
			width: 100%;
			height: 70px;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
		}

		.title {
			width: 100%;
			display: flex;

			p {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: auto;
			}

			span {
				margin-left: auto;
				display: flex;
				align-self: flex-end;

				image {
					display: flex;
					align-self: flex-end;
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	.pj {
		border-radius: 10px;
		width: 606upx;
		margin: 0 auto;
		height: 300px;
		background-color: #FFFFFF;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

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

		input {
			width: 100%;
			height: 70px;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
		}

		.xx {
			align-self: flex-start;
		}

		.pjxj {
			align-self: flex-start;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		.title {
			width: 100%;
			display: flex;

			p {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: auto;
			}

			span {
				margin-left: auto;
				display: flex;
				align-self: flex-end;

				image {
					display: flex;
					align-self: flex-end;
					width: 20px;
					height: 20px;
				}
			}
		}
	}

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

	.my_order {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.dd_box {
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			background-color: #FFFFFF;
			border-radius: 10px;
			height: 250px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.box_a {
				display: flex;
				justify-content: space-between;
				width: 100%;

				.left {
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					font-size: 28upx;
				}

				.right {
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(250, 92, 9, 1);
					font-size: 30upx;
				}
			}

			.box_b {
				display: flex;

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

			.box_c {
				width: 100%;
				display: flex;
				justify-content: space-between;
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
				}

				.qxdd {
					color: rgba(153, 153, 153, 1);
				}

				.ljfk {
					color: #FFFFFF;
					background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
				}
			}
		}

		.top {
			background-color: #FFFFFF;

			.title {
				color: #333333;
			}

			width: 100%;
			padding: 10px;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
