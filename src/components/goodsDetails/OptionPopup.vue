<template>
	<!-- 规格弹窗 -->
	<view class="container width-100-per">
		<uni-popup class="goshopGoods width-100-per" ref="qr" type="bottom">
			<!-- 商品详情 -->
			<view class="slot-box">
				<view class="content-box">
					<view class="popup-detail">
						<!-- <image :src="'login/icon_choose_hollow.png' | imgUrl" mode=""></image> -->
						<image class="detail-img" :src="curOption.thumb " mode=""></image>
						<view class="detail-txt">
							<text class="fn-cl-333 fn-sz-30">{{proDetail.info.product_name}}</text>
							<text class="fn-cl-red fn-sz-36" v-if="proDetail.info.type == 2">￥{{curOption.kill_price || 0 }}</text>
							<text class="fn-cl-red fn-sz-36" v-else>￥{{ buyType == "group" ? curOption.pt_price || 0 : curOption.option_price || 0}}</text>
							<text class="fn-cl-999 fn-sz-30">请确定 {{curOption.option_name ? curOption.option_name:'规格'}} {{buyAmount ? buyAmount : '数量'}}
							</text>
						</view>
					</view>
					<text class="fn-cl-999 fn-sz-30">规格</text>

					<view class="choosenum">
						<view :class="['choose', item.option_id == curOption.option_id ?'cur-choose' :'']" v-for="(item,index) in proDetail.options"
						 :key="index" @tap="getCurOption(item)">
							{{item.option_name}}
						</view>
					</view>

					<!-- 购买数量 -->
					<view class="num">
						<text class="fn-cl-999 fn-sz-30">数量</text>
						<view class="counter">
							<count :value="buyAmount" :min="1" :max=" (buyType == 'group' && proDetail.info.type == 5) ? 1 : (curOption.stock || 10)" @handleCount="changeOptNum"></count>
						</view>
					</view>
				</view>
				<view class="confirm-btn" @tap="doConfirm">确定</view>
			</view>

		</uni-popup>
	
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import count from "@/components/count/count.vue"
	export default {
		components: {
			uniPopup,count
		},
		props: {
			proDetail: {
				type: Object
			},
			initCurOption: {
				type: Object
			},
			buyType: {
				type: String
			},
			groupId: {
				type: [String, Number]
			}
		},
		data() {
			return {
				curOption: this.initCurOption,
				buyAmount: 1,
			}
		},

		methods: {
			open() {
				this.curOption = this.initCurOption;
				this.buyAmount= 1;
				console.log("proDetail-----------", this.proDetail, this.initCurOption);
				this.$refs.qr.open()
			},
			//修改规格数量
			changeOptNum(param1, param2) {
				console.log("changeOptNum", param1, param2);
				this.buyAmount = param1;
			},
			//选择 商品规格
			getCurOption(item) {
				console.log("选择 商品规格", item)
				this.curOption = item;
			},
			// 点击规格弹窗 确定按钮
			doConfirm() {
				if (!this.curOption.option_id) {
					this.$mUtils.toast("请选择规格");
					return;
				}
				console.log(this.curOption, this.buyAmount, this.buyType)
				//商品类型（1普通零售，2秒杀，3两人团，4五人团，5七人团）
				//订单类型（1：商城订单,22：二人拼团,25：五人拼团,27：七人拼团,3：秒杀订单,4：红包订单）
				let type = 1,proType=this.proDetail.info.type;
				console.log("proDetail",this.proDetail)
				if (this.buyType == 'now') {
					switch (proType) {
						case '1':
							type = 1;
							break;
						case '2':
							type = 3;
							break;
					}
					//购买 跳转 确定订单
					this.goConfirmOrder(type)
				} else if (this.buyType == 'group') {
					switch (proType) {
						case '3':
							type = 22;
							break;
						case '4':
							type = 25;
							break;
						case '5':
							type = 27;
							break;
					}
					//购买 跳转 确定订单
					this.goConfirmOrder(type)
				} else if (this.buyType == 'cart') {
					//加入购物车
					this.addCart();
				}
				this.$refs.qr.close()




			},
			
			//加入购物车  TODO  购物车 editCart
			
			addCart(){
				this.$api.editCart({
					product_id:this.proDetail.info.id,
					option_id:this.curOption.option_id, //	商品规格id
					num	:this.buyAmount ,//数量 （正整数：增加 负整数：减少）
				}).then(res=>{
					console.log("加入购物车",res)
					if(res.code == 200){
						this.$mUtils.toast("加入购物车成功");
						this.$refs.qr.close();
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			
			
			//购买 跳转 确定订单
			goConfirmOrder(type) {
				let query = {
					type,
					option_id: this.curOption.option_id,
					product_id: this.proDetail.info.id,
					num: this.buyAmount,
					groupId: this.groupId
				}
				console.log('点击规格弹窗 确定按钮', query)
				// return;
				this.$mUtils.goPage('confirmOrder', query)
			},

		}
	}
</script>

<style lang="scss" scoped>
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
</style>
