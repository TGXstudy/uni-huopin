<template>
	<view class="container">
		<view class="top-wrapper">
			<view class="breif-box">
				<image class="avatar-img" :src="userinfo.avatar" mode=""></image>
				<view class="breif-txt">
					<text class="fn-sz-36 fn-cl-fff fn-bold">{{userinfo.nickname}}</text>
					<image class="level-img" v-if="userinfo.level==1" :src="'mine/dj1.png' | imgUrl"></image>
					<image class="level-img" v-else-if="userinfo.level==2" :src="'mine/dj2.png' | imgUrl"></image>
					<image class="level-img" v-else-if="userinfo.level==3" :src="'mine/dj3.png' | imgUrl"></image>
					<view class="level-img" v-else></view>
					<text class="fn-sz-22 fn-cl-fff">ID {{userinfo.id}}</text>
					<text class="fn-sz-22 fn-cl-fff">推荐码 {{userinfo.invitation_code}}</text>
				</view>
				<text class="fn-sz-28 fn-cl-fff" @tap="check">切换账号 ></text>
			</view>
			<view class="census-box">
				<view class="census-item" @tap="tojf">
					<text class="fn-sz-36 fn-cl-fff">{{userinfo.score}}</text>
					<text class="fn-sz-24 fn-cl-fff">红包</text>
				</view>
				<view class="census-item" @tap="toqb">
					<text class="fn-sz-36 fn-cl-fff">{{userinfo.wallet}}</text>
					<text class="fn-sz-24 fn-cl-fff">钱包</text>
				</view>
				<view class="census-item" @tap="toye">
					<text class="fn-sz-36 fn-cl-fff">{{userinfo.balance}}</text>
					<text class="fn-sz-24 fn-cl-fff">余额</text>
				</view>
			</view>
			<view class="order-box">
				<view class="flex-row-between line-height-100">
					<text class="fn-sz-30 fn-cl-333 fn-bold">我的订单 </text>
					<view class="flex-1" @tap="todd(0)">
						<text class="fn-sz-26 fn-cl-999">查看我的订单</text>
						<image class="icon-sz-narrow" :src="'mine/jt.png' | imgUrl" mode=""></image>
					</view>
				</view>
				<view class="status-box">
					<view class="status-item" @tap="todd(1)">
						<image class="status-icon" :src="'mine/dfk.png' | imgUrl" mode=""></image>
						<text class="fn-sz-24 fn-cl-aaa">待付款</text>
					</view>

					<view class="status-item" @tap="todd(2)">
						<image class="status-icon" :src="'mine/dfh.png' | imgUrl" mode=""></image>
						<text class="fn-sz-24 fn-cl-aaa">待发货</text>
					</view>
					<view class="status-item" @tap="todd(3)">
						<image class="status-icon" :src="'mine/dsh.png' | imgUrl" mode=""></image>
						<text class="fn-sz-24 fn-cl-aaa">待收货</text>
					</view>
					<view class="status-item" @tap="todd(4)">
						<image class="status-icon" :src="'mine/dpj.png' | imgUrl" mode=""></image>
						<text class="fn-sz-24 fn-cl-aaa">待评价</text>
					</view>
					<view class="status-item" @tap="todd(5)">
						<image class="status-icon" :src="'mine/sh.png' | imgUrl" mode=""></image>
						<text class="fn-sz-24 fn-cl-aaa">售后</text>
					</view>
				</view>
			</view>
		</view>
		<view class="menus-wrapper">
			<view class="menu-item " @tap="tosc()">
				<image class="menu-icon" :src="'mine/sc.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的收藏</text>
			</view>
			<view class="menu-item " @tap="todz()">
				<image class="menu-icon" :src="'mine/dz.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">收货地址</text>
			</view>
			<view class="menu-item" @tap="togg()">
				<image class="menu-icon" :src="'mine/xx.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的消息</text>
			</view>
			<view class="menu-item " @tap="tofx()">
				<image class="menu-icon" :src="'mine/fx.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">分享码</text>
			</view>
			<view class="menu-item " @tap="hy()">
				<image class="menu-icon" :src="'mine/hy.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的好友</text>
			</view>
			<view class="menu-item" @tap="tokf()">
				<image class="menu-icon" :src="'mine/kf.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">客服中心</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('history')">
				<image class="menu-icon" :src="'mine/zj.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的足迹</text>
			</view>
			<view class="menu-item " @tap="tohhr()">
				<image class="menu-icon" :src="'mine/hhr.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">申请合伙人</text>
			</view>
			<view class="menu-item" @tap="pt()">
				<image class="menu-icon" :src="'mine/pt.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">拼团记录</text>
			</view>
			<view class="menu-item " @tap="dl_sy()">
				<image class="menu-icon" :src="'mine/sy.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">代理收益</text>
			</view>
			<view class="menu-item " @tap="sz()">
				<image class="menu-icon" :src="'mine/sz.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">设置</text>
			</view>
			<view class="menu-item"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {} //用户信息
			}
		},
		onShow() {

			this.getUserInfo()
		},
		methods: {
			//切换账号
			check() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.check_acount,
				})
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userinfo = res.data;
					console.log("获取用户信息", res)
				})
			},
			tozj() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.history,

				})
			},
			hy() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.friends,
				})
			},
			pt() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.partaker,
				})
			},
			dl_sy() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.agent_benefit,
				})
			},
			tofx() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.code,
				})
			},
			tokf() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.customer,
				})
			},
			todz() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.address,
				})
			},
			toye() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.balance,
				})
			},
			tojf() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.score,
				})
			},
			toqb() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.wallet,
				})
			},
			sz() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.set,
				})
			},
			tohhr() {

				this.$api.get_apply().then(res => {
					if (res.data.status == '0' && res.data.level == '1') {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_check,
						})
					} else if (res.data.status == '2' && res.data.level == '1') {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_no,
						})
					} else if (res.data.status == '1' && res.data.level == '1') {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_agree,
						})
					} else if (res.data.status == '0' && res.data.level == '2') {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_check,
						})
					} else if (res.data.status == '2' && res.data.level == '2') {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_no,
						})
					} else if (res.data.status == '1' && res.data.level == '2') {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_spartner_agree,
						})
					} else {
						this.$mRouter.push({
							route: this.$mRoutesConfig.apply_partner,
						})
					}
				})

			},
			tosc() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.my_collect,
				})
			},
			todd(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.my_order,
					query: {
						status: e
					}
				})
			},
			togg() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.notice,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;

		.top-wrapper {
			width: 100%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			// height: 800upx;
			background-color: #FA6009;
			// background-image: url(../../static/imgs/mine/banner.png);
			// background-repeat: no-repeat;
			// background-size: cover; // height: 500upx;

			.breif-box {
				width: 100%;

				padding: 30upx;
				box-sizing: border-box;

				display: flex;

				.avatar-img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					background-color: #f6f6f6;
					margin-right: 20upx;
				}

				.breif-txt {
					flex: 1;
					display: flex;
					flex-direction: column;

					.level-img {
						width: 125upx;
						height: 32upx;
					}
				}
			}

			.census-box {
				width: 100%;
				padding: 0 50upx;
				margin: 40upx auto;
				display: flex;
				justify-content: space-around;

				.census-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			}

			.order-box {
				width: 93%;
				height: 270upx;
				background-color: #fff;
				margin: 0 auto;
				border-radius: 10upx;
				display: flex;
				flex-direction: column;
				padding: 0 50upx;
				margin-bottom: 20upx;

				.line-height-100 {
					line-height: 100upx;
				}

				.flex-1 {
					flex: 1;
					flex-shrink: 1;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}

				.icon-sz-narrow {
					width: 12upx;
					height: 22upx;
				}

				.status-box {
					display: flex;
					justify-content: space-around;
					align-items: center;
					flex: 1;
					flex-shrink: 1;

					.status-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.status-icon {
							width: 50upx;
							height: 50upx;
							margin-bottom: 20upx;
						}
					}
				}
			}
		}

		.menus-wrapper {
			margin-top: 20upx;
			background-color: #fff;
			padding: 30upx 0;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.menu-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 250upx;
				margin-bottom: 40upx;

				.menu-icon {
					width: 70upx;
					height: 70upx;
					margin-bottom: 20upx;
				}

			}

		}
	}
</style>
