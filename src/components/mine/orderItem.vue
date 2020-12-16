<template>
	<view class="my_order">
		<view class="dd_box">
			<view class="box_a">
				<view class="left">
					订单编号：{{item.order_no}}
				</view>
				<view class="right">
					{{item|statuss}}
				</view>
			</view>
			<view class="boxx" v-for="(item2,index2) in item.child" :key="index2">
				<view class="box_b">
					<view class="left">
						<image :src="item2.thumb" mode=""></image>
					</view>
					<view class="right">
						<h3>{{item2.product_name}}</h3>
						<p>
							<span class="jr">￥{{item2.price}}</span>
							<span>×{{item2.num}}</span>
						</p>
					</view>
				</view>
				<view class="box_c">
					<view class="btn" @tap="dd_xq(item.id)">
						查看订单
					</view>
					<view class="btn" @click="hh_open(item.id)" v-if="item.order_status == 4">
						申请换货
					</view>
					<view class="btn" @click="th_open" v-if="item.order_status == 4 && item.type=='1'">
						申请退货
					</view>
					<view class="btn qxdd" @tap="showAction('cancel',item.id)" v-if="item.order_status == 1||item.order_status==2">
						取消订单
					</view>
					<view class="btn qxdd" @tap="showAction('delete',item.id)" v-if="item.order_status == 5">
						删除订单
					</view>
					<view class="btn ljfk" @click="pj_open(item.id,item.product_id,item.option_id)" v-if="item.order_status == 4">
						立即评价
					</view>
					<view class="btn ljfk" @click="sh_open(item.id)" v-if="item.order_status == 3 || item.order_status == 10&&item.exchange_status==4">
						确认收货
					</view>
					<view class="btn ljfk" v-if="item.order_status == 1" @click="lj_fk(item.id,item.total_price)">
						立即付款
					</view>
					<view class="btn ljfk" @click="ljhh_open(item.id)" v-if="item.exchange_status == 1">
						立即换货
					</view>
					<view class="btn ljfk" @click="ljth_open(item.id)" v-if="item.return_status == 1 ">
						立即退货
					</view>
				</view>
			</view>
		</view>
		<!-- 立即换货弹窗 -->
		<uni-popup ref="ljhh" class="ljhh" :width="'90%'">
			<view class="kd_xx">
				<view class="title">
					<p>快递信息</p>
					<span>
						<image @click="ljhh_close" :src="'mine/close.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<view class="srk1">
					<p>快递公司</p>
					<input v-model="kd_gs" type="text" value="" placeholder="请输入快递公司" />
				</view>
				<view class="srk1">
					<p>快递单号</p>
					<input v-model="kd_dh" type="text" value="" placeholder="请输入快递单号" />
				</view>
				<view class="qr_btn">
					<button class="qx" @click="ljhh_close">取消</button>
					<button class="qr" @click="ljhh_sure(item.id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 立即退货弹窗 -->
		<uni-popup ref="ljth" class="ljth" :width="'90%'">
			<view class="kd_xx">
				<view class="title">
					<p>退货快递信息</p>
					<span>
						<image @click="ljth_close" :src="'mine/close.png' | imgUrl"></image>
					</span>
				</view>
				<view class="srk1">
					<p>快递公司</p>
					<input v-model="kd_gs" type="text" value="" placeholder="请输入快递公司" />
				</view>
				<view class="srk1">
					<p>快递单号</p>
					<input v-model="kd_dh" type="text" value="" placeholder="请输入快递单号" />
				</view>
				<view class="qr_btn">
					<button class="qx" @click="ljth_close">取消</button>
					<button class="qr" @click="ljth_sure(item.id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 确认收货弹窗 -->
		<uni-popup ref="sh" :width="'90%'">
			<view class="tc_qr">
				<view class="title">
					是否确认收货
				</view>

				<view class="qr_btn">
					<button class="qx" @click="sh_close">取消</button>
					<button class="qr" @click="sh_qr(item.id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 评价弹窗 -->
		<uni-popup ref="pj" :width="'90%'"  >
			<view class="pj">
				<view class="title">
					<p>评价</p>
					<span>
						<image @click="pj_close" :src="'mine/close.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<view class="pjxj">
					评价星级
				</view>
				<view class="xx">
					<uni-rate :value="5" :max="5" :size="25" :margin="20" v-model="value" @change="onChange" />
				</view>
				<input v-model="pj_nr" type="text" value="" placeholder="请输入评价内容..." />
				<view class="qr_btn">
					<button class="qx" @click="pj_close">取消</button>
					<button class="qr" @click="pj_sure(item)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 申请退货弹窗 -->
		<uni-popup ref="th" :width="'90%'">
			<view class="th">
				<view class="title">
					<p>申请退货</p>
					<span>
						<image @click="th_close" :src="'mine/close.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<input type="text" v-model="th_nr" value="" placeholder="请输入评价内容..." />
				<view class="tp_sc">

					<upload-img :maxImgNum="4" :imgNum="imgNum2" @getImage="getImages2">
						<image v-for="(item,index) in uImgList_th" :key='index' :src="item" mode="widthFix"></image>
						<image :src="compressPath_hh | imgUrl" mode="widthFix"></image>

					</upload-img>

				</view>
				<view class="qr_btn">
					<button class="qx" @click="th_close">取消</button>
					<button class="qr" @click="th_sure(item.id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 申请换货弹窗 -->
		<uni-popup ref="hh" :width="'90%'" >
			<view class="th">
				<view class="title">
					<p>申请换货</p>
					<span>
						<image @click="hh_close" :src="'mine/close.png' | imgUrl"></image>
					</span>
				</view>
				<input type="text" v-model="hh_nr" value="" placeholder="请输入内容..." />
				<view class="tp_sc">
					<upload-img :maxImgNum="4" :imgNum="imgNum" @getImage="getImages">
						<image v-for="(item,index) in uImgList_hh" :key='index' :src="item" mode="widthFix"></image>
						<image :src="compressPath_hh  | imgUrl" mode="widthFix"></image>

					</upload-img>

				</view>
				<view class="qr_btn">
					<button class="qx" @click="hh_close">取消</button>
					<button class="qr" @click="hh_sure(item.id)">确认</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uploadImg from "@/components/UploadImg.vue"
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uploadImg
		},
		props: {
			item: {
				type: Object
			}
		},

		data() {
			return {
				hh_nr: '', //换货内容
				kd_gs: '', //快递公司
				kd_dh: '', //快递单号
				th_nr: '', //退货内容
				pj_nr: '', //评价内容
				compressPath_hh: 'mine/tjtp.png', //上传图片
				uImgList_hh: [], //上传图片列表换货
				uImgList_th: [], //上传图片列表退货
				xx_value:0, //打分
				currenStatus: 0, //分类
				orderId: 0,
				statusList: [
					'待支付', '待发货', '待收货', '待评价', '已完成', '已取消', '拼团中', '已退款', '退货', '换货'
				],
				imgNum:0,
				imgNum2:0
			}
		},
		watch: {
			uImgList(newVal) {
				//console.log(newVal, "m,,......");

			},
		},
		filters: {
			statuss(value) {
				if (value.order_status === 1) {
					return '待支付'
				}
				if (value.order_status === 2) {
					return '待发货'
				}
				if (value.order_status === 3) {
					return '待收货'
				}
				if (value.order_status === 4) {
					return '待评价'
				}
				if (value.order_status === 5) {
					return '已完成'
				}
				if (value.order_status === 6) {
					return '已取消'
				}
				if (value.order_status === 7) {
					return '拼团中'
				}
				if (value.order_status === 8) {
					return '已退款'
				}
				
				if (value.order_status === 9 && value.return_status === 0 ) {
					return '待审核(退货)'
				}
				if (value.order_status === 9 && value.return_status === 1 ) {
					return ' 审核通过(退货)'
				}
				if (value.order_status === 9 && value.return_status === 2 ) {
					return '审核拒绝(退货)'
				}
				if (value.order_status === 9 && value.return_status === 3 ) {
					return '待退款(退货)'
				}
				if (value.order_status === 9 && value.return_status === 4 ) {
					return '已退款(退货)'
				}				
				if (value.order_status === 10 && value.exchange_status===0) {
					return '待审核(换货)'
				}
				if (value.order_status === 10 && value.exchange_status===1) {
					return '审核通过(换货)'
				}
				if (value.order_status === 10 && value.exchange_status===2) {
					return '拒绝(换货)'
				}
				if (value.order_status === 10 && value.exchange_status===3) {
					return '待换货(换货)'
				}
				if (value.order_status === 10 && value.exchange_status===4) {
					return '待收货(换货)'
				}
			}
		},

		methods: {
			//立即付款
			lj_fk(a, b) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.submitOrders,
					query: {
						orderId: a,
						totalPrice: b
					}
				})
			},
			showAction(actType, id) {
				this.orderId = id;
				let tipTxts = {
					cancel: '确认取消?',
					delete: '确认删除?',
				}
				let handler = {
					cancel: this.cancelOrder,
					delete: this.delorder,
				}
				uni.showModal({
					title: '',
					content: tipTxts[actType],
					success(res) {
						if (res.confirm) {
							handler[actType]();
						}
					}
				})
			},
			getImages(data) {
				
				data.forEach((item)=>{
					let imgs = item[0].preview_url;
					this.uImgList_hh.push(imgs)
				})
				this.$nextTick(()=>{
					this.imgNum=this.uImgList_hh.length
				})
			
			},
			getImages2(data) {
				
				data.forEach((item)=>{
					let imgs = item[0].preview_url;
					this.uImgList_th.push(imgs)
				})
				this.$nextTick(()=>{
					this.imgNum2=this.uImgList_th.length
				})

			},
			//删除订单
			delorder() {
				this.$api.del_dd({
					id: this.orderId
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})

			},
			//取消订单
			cancelOrder() {
				this.$api.cancel_dd({
					id: this.orderId
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$emit("update")
					} else {
						this.$mUtils.toast(res.msg)
					}
				})

			},

			// 打分
			onChange(e) {
				this.xx_value = Math.round(e.value);
				console.log(this.xx_value)
			},
			// 确认收货
			sh_open(e) {
				this.$refs.sh.open()

			},
			sh_qr(e) {
				this.$api.sure_sh({
					id: e
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.sh.close()
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.sh.close()
					}
				})

			},
			sh_close(e) {

				this.$refs.sh.close()
			},
			// 评价
			//确定评价
			pj_sure(item) {
				console.log(item)
				let child=item.child[0]
				this.$api.dd_pl({
					id:item.id,
					product_id: child.product_id,
					option_id: child.option_id,
					order_detail_id:child.id,
					comment_star: this.xx_value,
					comment_content: this.pj_nr
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.pj.close()
							this.$emit("update")
						})

					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.pj.close()
					}

				})
			},
			pj_open() {
				this.$refs.pj.open()
			},
			pj_close(e) {

				this.$refs.pj.close()
			},
			// 立即退货
			ljth_open(e) {
				console.log(e)
				this.$refs.ljth.open()
			},
			ljth_close() {
				this.$refs.ljth.close()
			},
			//立即退货确认
			ljth_sure(e) {

				this.$api.th_now({
					id: e,
					express_name: this.kd_gs,
					express_code: this.kd_dh,
					send_type: 2
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.ljth.close()
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.ljth.close()
					}

				})
			},


			// 立即换货
			ljhh_open(e) {
				console.log(e)
				this.$refs.ljhh.open()
			},
			ljhh_close() {
				this.$refs.ljhh.close()
			},
			//立即换货确认
			ljhh_sure(e) {

				this.$api.th_now({
					id: e,
					express_name: this.kd_gs,
					express_code: this.kd_dh,
					send_type: 3
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.ljhh.close()
							this.$emit("update")
						})

					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.ljhh.close()
					}

				})
			},
			// 换货
			hh_open(e) {
				
				this.$refs.hh.open()
			},
			hh_close() {
					this.uImgList_hh="";
				this.$refs.hh.close()
			},
			//换货确认
			hh_sure(e) {

				this.$api.dd_hh({
					id: e,
					exchange_reason: this.hh_nr,
					exchange_image: this.uImgList_hh
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$refs.hh.close()
						this.$emit("update")
					} else {
						this.$mUtils.toast(res.msg)
					
					}

				})
			},
			// 退货
			//退货确认
			th_sure(e) {
				this.$api.dd_th({
					id: e,
					return_reason: this.th_nr,
					return_image: this.uImgList_th
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$refs.th.close()
						this.$emit("update")
					} else {
						this.$mUtils.toast(res.msg)

					}

				})
			},
			th_open() {
				this.$refs.th.open()
			},
			th_close() {
				this.uImgList_th="";
				this.$refs.th.close()
			},

			dd_xq(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.dd_detail,
					query: {
						id: e
					}
				})
			},
			changeStatus(item) {
				this.currenStatus = item.status;

			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.tp_sc {
		image {
			width: 60px !important;
			height: 60px !important;
		}
	}

	.zhtx-single {
		width: 80px !important;
		height: 80px !important;
	}
	.kd_xx {
		border-radius: 10px;
		width: 100%;
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
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}


		.srk1 {
			width: 95%;
			margin: 0 auto;
			height: 88upx;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
			display: flex;
			align-items: center;

			p {
				margin-left: 10px;
				margin-right: 10px;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			input {}
		}

		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

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
		
		margin: 0 auto;
		height: 300px;
		background-color: #FFFFFF;
	
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.qr_btn {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			padding: 20px;
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
			width: 95%;
			height: 70px;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
			margin-top: 10px;
		}

		.xx {
			align-self: flex-start;
			margin-left: 10px;
		}

		.pjxj {
			align-self: flex-start;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			padding: 20px;
		}

		.title {
			width: 100%;
			display: flex;
				padding: 20px;
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
			height: 200px;
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

			.boxx {
				display: flex;
				flex-direction: column;

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

				.box_b {
					display: flex;
					margin-bottom: 20px;
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
