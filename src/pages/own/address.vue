<template>
	<view class="address">
		<view class="top" v-for="(item,index) in sh_list" :key="index" @tap="chooseAddr(item)">
			<view class="top_a">
				<view class="a_nav">
					<span class="mr" v-if="xz===item.id">默认</span>
					<span class="name">{{item.fullname}}</span>
					<span class="phone">{{item.phone}}</span>
				</view>
				<p>{{item.province}} {{item.city}} {{item.county}} {{item.address}}</p>
			</view>
			<view class="top_b">
				<view class="left">
					<label class="radio" @click="redio(item)">
						<radio value="r1" :checked="xz===item.id" />设为默认地址</label>
				</view>
				<view class="right">
					<view class="box1" @tap.stop="check(item)">
						<image :src="'mine/post.png' | imgUrl"></image>
						<p>编辑</p>
					</view>
					<view class="box2" @tap.stop="del(item.id)">
						<image :src="'mine/delete.png' | imgUrl"></image>
						<p>删除</p>
					</view>
				</view>
			</view>
		</view>

		<view class="add" @tap="toadd()">
			新建收货地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sh_list: [], //其他收货地址
				mr_list: [], //默认地址
				xz: 1,
				type: '', //choose 订单选择收货地址
			}
		},
		onLoad(options) {
			this.type = options.type || '';
		},
		onShow() {
			this.get_address()
		},
		methods: {
			//编辑收货地址
			check(item) {
				console.log(item)
				this.$mRouter.push({
					route: this.$mRoutesConfig.bj_address,
					query: item
				})
			},
			chooseAddr(item) {
				if (this.type == 'choose') {
					this.$store.commit("SET_ADDRESS", item.id);
					console.log("订单选择收货地址11111", this.$store.getters.getAddressId)
					this.$mRouter.back()
				}
			},

			del(e) {
				this.$api.del_address({
					id: e
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(res => {
							this.get_address()
						})
					} else {
						this.$mUtils.toast(res.msg)
					}


				})
			},
			get_address() {
				let that = this;
				this.$api.adress().then(res => {
					console.log(res)
					if (res.code == 200) {
						this.sh_list = res.data.lists;
						this.xz = res.data.lists[0].id
					} else {
						console.log("获取用户信息", res)
					}



				})
			},
			toadd() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.add_address,
				})
			},
			redio(e) {
				this.xz = e.id;
				let a = e;
				a.status = "yes";
				this.$api.bj_address({ ...a
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(() => {
							this.get_address()
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.radio {
		margin-right: 20px;
	}

	.address {
		width: 100%;
		background: rgba(246, 246, 246, 1);
		display: flex;
		flex-direction: column;
		padding-top: 0;
		position: relative;
		padding-bottom: 60px;

		.add {
			width: 100%;
			background: rgba(255, 255, 255, 1);
			height: 60px;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(250, 96, 9, 1);
		}


		.bottom {
			width: 100%;
			background-color: #fff;
			height: 150px;
			display: flex;
			flex-direction: column;
			padding: 10px;

			.top_a {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				height: 90px;

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}

				.a_nav {
					display: flex;
					align-items: center;

					.mr {
						width: 45px;
						height: 25px;
						color: #fff;
						border-radius: 15px;
						background: rgba(250, 54, 9, 1);
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.name {
						margin-left: 10px;
						font-size: 38upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.phone {
						margin-left: 10px;
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.top_b {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.left {}

			.right {
				display: flex;

				image {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				.box1 {
					margin-right: 10px;
				}
			}
		}

		.top {
			width: 100%;
			background-color: #fff;
			height: 150px;
			display: flex;
			flex-direction: column;
			padding: 10px;
			margin-bottom: 10px;

			.top_a {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				height: 90px;

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}

				.a_nav {
					display: flex;
					align-items: center;

					.mr {
						width: 45px;
						height: 25px;
						color: #fff;
						border-radius: 15px;
						background: rgba(250, 54, 9, 1);
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.name {
						margin-left: 10px;
						font-size: 38upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.phone {
						margin-left: 10px;
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.top_b {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.left {}

			.right {
				display: flex;

				image {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				.box1 {
					margin-right: 10px;
				}
			}
		}
	}
</style>
