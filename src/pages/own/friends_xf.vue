<template>
	<view class="xfxq">
		<view class="top">
			<view class="left">
				<image :src="avatar" mode=""></image>
				<p>{{nickname}}</p>
			</view>
			<view class="right">
				<p>消费总金额:<span class="ts">{{total_pay}}</span></p>
				<p>红包收益:<span>{{score_in}}</span></p>
				<p>钱包收益:<span>{{wallet_in}}</span></p>
			</view>
		</view>
		<view class="cx">
			<view class="left">
				<view class="sj_xz">
					<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="">{{date}}
							<image class="down" :src="'mine/down.png' | imgUrl" mode=""></image>
						</view>
					</picker>
					<picker class="picker" mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
						<view class="">{{date1}}
							<image class="down" :src="'mine/down.png' | imgUrl" mode=""></image>
						</view>
					</picker>
				</view>

			</view>
			<view class="right">
				<view class="right_cx" @tap="cx()">
					查询
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="box" v-for="(item,index) in xf_list" :key="index">
				<view class="left">
					<image :src="avatar" mode=""></image>
				</view>
				<view class="middle">
					<p class="middle_top">
						<span class='name'>{{nickname}}</span>
						<span class='xf'>消费{{item.pay_price}}元</span>
					</p>
					<p class="bottom">
						<span>{{item.create_time}}</span>
					</p>
				</view>
				<view class="right">
					<p class='right_top' v-if="item.tag=='wallet'">钱包+{{item.bill_amt}}</p>
					<p class='bottom' v-if="item.tag=='score'">红包+{{item.bill_amt}}</p>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',//好友id
				score_in:"",//积分收益
				wallet_in:'',//钱包收益
				total_pay:'',//消费总金额
				avatar:'',
				nickname:'',
				xf_list:[],//好友消费列表
				date: '',
				date1: ''
			}
		},
		onLoad(options) {
			// this.id=options.id
			let date = new Date();
			let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			this.date = today;
			this.date1 = today;
			console.log("onload",options);
			this.id=options.id;
			this.score_in=options.score_in;
			this.wallet_in=options.wallet_in;
			this.total_pay=options.total_pay;
			this.get_myfriend();
			this.cx();
		},
		methods: {
			//好友明细查询
			cx(){
				this.$api.myFriend_mx({
					mid:this.id,
					page:1,
					pageSize:10000,
					start_time:this.date,
					end_time:this.date1
				}).then(res=>{
					this.xf_list=res.data.record.data;
				})
				
			},
			get_myfriend(){
				this.$api.myFriend_mx({
					mid:this.id
				}).then(res=>{
				
					this.avatar=res.data.mem.avatar;
					this.nickname=res.data.mem.nickname;
				})
			},
			
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindDateChange1: function(e) {
				this.date1 = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.xfxq {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.bottom {
			width: 750upx;
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

		.cx {
			width: 90%;
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
			height: 80px;

			.left {
				width: 73%;

				.sj_xz {
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 300px;
					height: 40px;
					background: rgba(246, 246, 246, 1);
					border-radius: 33px;

					.picker {}

					.down {
						margin-top: 8px;
						margin-left: 2px;
						width: 8px;
						height: 8px;
					}
				}
			}

			.right {
				width: 20%;

				.right_cx {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					width: 85px;
					height: 35px;
					background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
					border-radius: 20px;
				}
			}
		}

		.top {
			width: 100%;
			height: 120px;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;

			.left {
				display: flex;
				align-items: center;

				image {
					margin-right: 20px;
					width: 80px;
					height: 80px;
				}

				p {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 80px;

				p {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 244, 238, 1);

					.ts {
						font-size: 30upx !important;
					}

					span {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 244, 238, 1);
					}
				}
			}
		}
	}
</style>
