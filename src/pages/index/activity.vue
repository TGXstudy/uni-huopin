<template>
	<view class="activity">
		<image :src="'footer/ycbg.png' | imgUrl" mode=""></image>
		<view class="luck-drawn" :style="{'background-image':'url('+$mUtils.imgUrl('index/bg_lottery.png')+')'}">
			<view class="lottery-box">
				<view class="" v-for="(gift,idx) in gifts" :key="idx">
					<view :class="['lottery-item', canTap ? 'lottery-btn' :'lottery-btn-no'] "  v-if="idx==4" @tap="doLottery">
						<text class="fn-bold">{{gift}}</text>
					</view>
					<view class="lottery-item" v-else>
						<view class="do-mask" v-if="rotateIdx == idx"> </view>
						<text class="top-tag">剩{{gift.has || 0}}</text>
						<image class="gift-img" :src="gift.thumb" mode=""></image>
						<text class="gift-name">{{gift.gift_name}}</text>
					</view>

				</view>

			</view>
		</view>
		<!-- 规则 -->
		<view class="rules">
			活动时间：{{activity.start_time || ''}}——{{activity.end_time || ''}}
		</view>
		<view class="activityRules">
			<view class="title">
				活动规则
			</view>
			<view class="desc">
				{{activity.des || ''}}
			</view>
		</view>

		<uni-popup class="qrr" ref="qr" type="bottom">
			<view class="qr_btn">
				<view class="title_qrr">
					恭喜你抽中奖品
				</view>
				<view class="Img">
					<image :src="gift.thumb" mode=""></image>
					<text>{{gift.gift_name}}</text>
				</view>
				<view class="addaddress" @tap="$mUtils.goPage('address',{type:'choose'})">
					<view class="address">
						收货地址
					</view>
					<view class="name">
						<view class="user">
							{{address.fullname}} {{address.phone}}
						</view>
						<image src="../../staic/imgs/footer/right.png" mode=""></image>
					</view>
					<view class="crtiy">
						{{address.province}}
						{{address.city}}
						{{address.county}}
						{{address.address}}
					</view>
				</view>
				<view class="qr_c">
					<button class="qxc" @click="close">取消</button>
					<button class="qrc" @click="saveAddr">确定</button>
				</view>
			</view>

		</uni-popup>


	</view>
</template>

<script>

	export default {
		data() {
			return {
				activity: {},
				gifts: [], //奖品列表
				fillList: [],
				rotateIdx: -1,
				gift: {}, //中奖奖品
				address: {} ,//收货地址
				canTap:true
			};
		},
		onLoad() {
			// 获取活动详情和奖品 
			this.getActivity()
			//收货地址
			this.getAddrList()

		},
		onShow() {
			let addressId = this.$store.getters.getAddressId;
			console.log("onShow", addressId)
			if (addressId) {
				//收货地址信息  
				this.getAddrInfo(addressId)
			}
		},
		methods: {
			saveAddr(){
				this.getfill();
			},
			close(){
				this.$refs.qr.close()
			},
			//收货地址
			getAddrList() {
				this.$api.adress().then(res => {
					console.log("默认地址", res)
					if (res.code == 200) {
						this.address = res.data.lists && res.data.lists[0]
					} else {

					}
				})
			},
			//收货地址信息
			getAddrInfo(id) {
				this.$api.getAddrInfo({
					address_id: id
				}).then(res => {
					if (res.code == 200) {
						this.address = res.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			doLottery() {
				
				// console.log("点击抽奖 TODO")
				let lotteryIdxs = [0, 1, 2, 5, 8, 7, 6, 3];
				let i = 0;
				if( !this.canTap) return;
				this.canTap=false
				this.$api.go().then(res => {
					console.log("点击抽奖",res)
					if (res.code == 200) {
						
						var timeid = setInterval(() => {
							this.rotateIdx = lotteryIdxs[i]
							i++;
							if (i > 7) i = 0;
						}, 50)
						let index = 0;
						this.gift = res.data
						for (let i = 0; i < this.gifts.length; i++) {
							if (this.gifts[i].id == this.gift.gift_id) {
								index = i;
							}
						}
						
						this.$mUtils.timeout(() => {
							clearInterval(timeid)
							this.rotateIdx=index;
						})
						
						// console.log("this.rotateIdx",this.rotateIdx)
						this.$mUtils.timeout(() => {
							this.$refs.qr.open()
							this.canTap = true;
						},1500)
						
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			// 获取活动详情和奖品
			getActivity() {
				this.$api.getActivity().then(res => {
					console.log("获取活动详情和奖品", res)
					if (res.code == 200) {
						let gifts = [...res.data.gifts]
						this.gifts = res.data.gifts.splice(0, 4).concat([
							"立即抽奖"
						], gifts.splice(4, 9))
						console.log("gifts--------", this.gifts)

						this.activity = res.data.activity
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			// 完善抽奖地址
			getfill() {
				this.$api.fill_address({
					address_id:this.address.id,
					r_id: this.gift.r_id
				}).then(res => {
					console.log("完善抽奖地址", res)
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(()=>{
							this.$refs.qr.close();
						})
					} else {
						this.$mUtils.toast(res.msg)
						console.log("完善抽奖地址", res)
					}
				})
			},

		}
	};
</script>

<style lang="scss" scoped>
	.activity {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f9d8ac;

		image {
			height: 600upx;
		}

		.luck-drawn {
			width: 640upx;
			height: 640upx;
			background-size: cover;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 0 auto;

			.lottery-box {
				width: 500upx;
				height: 500upx;
				display: flex;
				justify-content: space-around;
				align-items: space-around;
				flex-wrap: wrap;

				.lottery-item {
					width: 150upx;
					height: 150upx;
					border-radius: 10upx;
					position: relative;

					.do-mask {
						width: 150upx;
						height: 150upx;
						background-color: rgba(0, 0, 0, .5);
						position: absolute;
						top: 0;
						left: 0;
					}

					.top-tag {
						position: absolute;
						top: 0;
						left: 0;
						background-color: #FA5E09;
						border-radius: 0 0 20upx 0;
						font-size: 18upx;
						color: #fff;
						padding-right: 20upx;
					}

					.gift-img {
						width: 150upx;
						height: 150upx;
						border-radius: 10upx;
					}

					.gift-name {
						position: absolute;
						bottom: 0;
						right: 0;
						left: 0;
						background-color: #FD742B;
						font-size: 22upx;
						color: #333;
						text-align: center;
						border-radius: 0 0 10upx 10upx;
					}
				}

				.lottery-btn {
					background-color: #FFFF00;
					font-size: 28upx;
					color: #F62A2A;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.lottery-btn-no{
					background-color: #f6f6f6;
					color: #999;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}


		// 规则
		.rules {

			height: 100upx;
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			justify-content: center;
			align-items: center;

		}

		.activityRules {
			width: 80%;
			min-height: 400upx;
			display: flex;
			flex-direction: column;
			background-color: #fd6541;
			border-radius: 20upx;
			margin: 20upx auto;
			padding-bottom: 50upx;

			.title {
				display: flex;
				justify-content: center;
				margin: 0upx auto;
				width: 300upx;
				height: 80upx;
				line-height: 80upx;
				background-color: #ffc320;
				border-radius: 0upx 0upx 50upx 50upx;
				color: rgba(252, 100, 26, 1);
				margin-bottom: 20upx;
				font-size: 36upx;
				font-weight: bold;

			}

			.desc {
				width: 100%;
				padding: 0 30upx;
				font-size: 28upx;
				color: #fff;
				line-height: 40upx;
			}
		}

		.qrr {
			width: 100% !important;
			background: rgba(0, 0, 0, 1) !important;
			
			// height: 50%;
			.qr_btn {
				width: 80%;
				// height: 705upx;
				padding: 10px;
				display: flex;
				flex-direction: column;
				background-color: #fd6541;
				border-radius: 20upx;
				// position: fixed;
				position: fixed;
				bottom: 300upx;
				right: 60upx;
				// margin: auto;
				border: 10upx solid #FFC320;


				.title_qrr {
					justify-content: center;
					height: 60upx;
					font-size: 48upx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #fff;
					line-height: 70upx;
					margin-bottom: 40upx;
				}

				.Img {
					flex-direction: column;
					height: 300upx;
					margin: auto;
					text-align: center;

					image {
						width: 220upx;
						height: 220upx;
						// margin: auto;
					}

					text {}

				}

				.addaddress {
					width: 100%;
					min-height: 160upx;
					background: rgba(255, 255, 255, 1);
					border-radius: 10upx;
					flex-direction: column;
					margin: 30upx auto 0upx;

					.address {
						width: 140upx;
						// height: 60upx;
						font-size: 28upx;
						background-color: #FFC320;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						justify-content: flex-start;
						border-radius: 10upx 0 20upx 0;
					}

					.name {
						display: flex;
						justify-content: space-between;
						padding: 20upx;

						.user {
							// width:199upx;
							// height: 23upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333;
						}

						image {
							width: 30upx;
							height: 30upx;
						}
					}

					.crtiy {
						padding-top: 20upx;
						color: #666;
						font-size: 24upx;
						padding:0  20upx;
					}
				}

				.qr_c {
					display: flex;
					justify-content: space-between;
					margin-top: 30upx;

					.qxc {
						width: 48%;
						height: 80upx;
						text-align: center;
						background-color: #FFC320;
						font-size: 30upx;
						border-radius: 40upx;
						color: #FFFFFF;
						padding: 0upx 30upx;
					}

					.qrc {
						width: 48%;
						height: 80upx;
						text-align: center;
						background-color: #FFFFFF;
						color: rgba(255, 89, 0, 1);
						font-size: 30upx;
						border-radius: 40upx;

					}
				}
			}
		}


	}
</style>
