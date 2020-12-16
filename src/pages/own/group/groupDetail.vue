<template>
	<view class="container">
		<view class="top-wrapper">
			<!-- 拼团商品-->
			<view class="content-box product-wrapper">
				<image class="product-img" :src="detailData.thumb" mode=""></image>
				<view class="product-txt">
					<text class="fn-cl-333 fn-sz-30"> {{detailData.product_name}} </text>
					<text class="group-tag fn-cl-fff fn-sz-26"> {{detailData.type | getGroupType}}人团</text>
					<view class="">
						<text class="fn-sz-26 fn-cl-orange">￥{{detailData.total_price}}</text>
						<text class="fn-sz-24 fn-cl-999">×{{detailData.num}}</text>
					</view>
				</view>
			</view>
			<!-- 拼团商品-->
			<view class="flex-column">
				<!-- 拼团情况 -->
				<view class="content-box flex-column">
					<!-- 拼团中 -->
					<view class="flex-column" v-if="detailData.status == 1">
						<view class="count-down">
							<text class="fn-sz-24 fn-cl-333">剩余时间:</text>
							<view class="margin-left-20">
								<text class="block">{{leftTime.day}}</text>
								<text class="colon">:</text>
								<text class="block">{{leftTime.hour}}</text>
								<text class="colon">:</text>
								<text class="block">{{leftTime.min}}</text>
								<text class="colon">:</text>
								<text class="block">{{leftTime.secd}}</text>
							</view>

						</view>
						<view class="fn-sz-24 fn-cl-333 line-height-50"> 拼团中，还差<text class="fn-cl-orange">{{detailData.need}}人</text>拼团成功
						</view>
					</view>
					<!-- 拼团中 -->
					<!-- 拼团成功 -->
					<view class="flex-column" v-else-if="detailData.status == 2 || detailData.status == 4">
						<text class="fn-sz-36 fn-cl-orange fn-bold line-height-100">恭喜你，{{detailData.type | getGroupType}}人团已拼团成功</text>
						<text class="fn-sz-24 fn-cl-333 line-height-50" v-if="groupType == 5">{{ is_me_success ? "等待商家发货" : "未竞中，所支付的货款原路返回，补贴到商城钱包" }}</text>
						<text class="fn-sz-24 fn-cl-333 line-height-50" v-else>等待商家发货</text>
					</view>
					<!-- 拼团成功 -->
					<!-- 拼团失败 -->
					<view class="flex-column" v-else-if="detailData.status == 3 || detailData.status == 5">
						<text class="fn-sz-36 fn-cl-orange fn-bold line-height-100">很遗憾，你的{{detailData.type | getGroupType}}人拼团失效了</text>
						<!-- <text class="fn-sz-24 fn-cl-333 line-height-50">{{detailData.is_manager > 0 && detailData.type == 27 ? "您的商品依然会按时发货，请及时查收！" : "所支付的货款原路返回"}}</text> -->
						<text class="fn-sz-24 fn-cl-333 line-height-50">{{is_manager > 0 && detailData.type == 27 ? "您的商品依然会按时发货，请及时查收！" : "所支付的货款原路返回"}}</text>
					</view>
					<!-- 拼团失败 -->

					<view class="persons-box">

						<button class="flex-column person" v-for="(mem,idx) in members" :key="idx">
							<view class="flex-column">
								<image class='crown-tag' v-if="groupType == 2 && idx == 0" :src="'mine/pt_xq3.png' | imgUrl" mode=""></image>
								<image class='crown-tag' v-else-if="groupType == 5 &&detailData.g_mid == mem.mid && idx == 0" :src="'mine/pt_xq3.png' | imgUrl"
								 mode=""></image>

								<image class='crown-tag' v-else-if="groupType == 7 && idx == 0" :src="'mine/pt_xq3.png' | imgUrl" mode=""></image>
								<view class='crown-tag' v-else></view> <!-- 样式占位-->
								<image :class="['avatar',(groupType == 5 && mem.child_code == bidMem.child_code) ? ' bid-avatar' : '']" :src="mem.avatar"
								 mode=""></image>
								<image class='bid-tag' v-if="groupType == 5  && (detailData.status == 2 || detailData.status == 4) && mem.child_code == bidMem.child_code"
								 :src="'mine/pt_jz.png' | imgUrl" mode=""></image>
								<image class='bid-tag' v-else-if="idx == 0 && groupType == 7" src="../../../static/imgs/mine/icon_leader.png"
								 mode=""></image>
								<!-- TODO <view class='bid-tag' v-else-if=" groupType == 7 && detailData.g_mid == mem.mid">团长</view> -->
								<view class='bid-tag' v-else></view> <!-- 样式占位-->
							</view>
							<text class="fn-sz-28 fn-cl-333">{{mem.nickname}}</text>
						</button>
						<button class="flex-column person" v-for="(mem,idx) in (groupType - 0 -  members.length)" open-type="share" v-if="detailData.status == 1">
							<view class="flex-column">
								<view class='crown-tag'></view>
								<image class='avatar' :src="'mine/icon_add_group.png' | imgUrl" mode=""></image>
								<view class='bid-tag'></view>
							</view>
							<text class="fn-sz-28 fn-cl-999">待邀请</text>
						</button>

					</view>
					<view class="btn-box" v-if="detailData.status == 1">
						<button class="orange-btn" open-type="share">
							邀请好友
						</button>
					</view>
					<view class="btn-box" v-else-if="groupType == 2 && (detailData.status == 5 || detailData.status == 4)">
						<view class="orange-btn" @tap="goGoodsDetails">
							再开一团
						</view>
					</view>
				</view>
				<!-- 拼团情况 -->
				<!-- 身份-->
				<view class="content-box flex-column identity-box">
					<view class="flex-row-between width-100-per">
						<!-- <text class=" fn-sz-28 fn-cl-333 line-height-50" v-if="groupType != 7">我的身份：{{detailData.g_mid == detailData.mid ? '团长' :'参团者'}}
						</text> 						<text class=" fn-sz-28 fn-cl-333 line-height-50" v-else>我的身份：{{ detailData.mid  == detailData.mem[0].mid ? '团长' :'参团者'}}-->
						<text class=" fn-sz-28 fn-cl-333 line-height-50">我的身份：{{detailData.mid && detailData.is_manager ? '团长' :'参团者'}}
						</text>
						</text>
						<text v-if="(detailData.status == 2 ||detailData.status == 4) &&  groupType == 5  " class=" fn-sz-28 fn-cl-orange line-height-50">竞中者：{{ bidMem && bidMem.nickname || ''}}</text>
					</view>
					<text class=" fn-sz-24 fn-cl-999 line-height-50">发起时间：{{detailData.create_time_format}}</text>
					<text class=" fn-sz-24 fn-cl-999 line-height-50">成团时间：{{ detailData.success_time ? detailData.success_time_format : detailData.end_time_format}}</text>
				</view>
				<!-- 身份-->
			</view>
		</view>
		<!-- 规则 -->
		<view class="rule-wrapper">
			<text class="fn-sz-30 fn-bold title ">{{ruleTitle}}</text>
			<view class="fn-sz-26">
				<rich-text :nodes="ruleContent"></rich-text>
			</view>
		</view>
		<!-- 规则 -->

		<!-- 七人团操作 -->
		<view class="fixed-btns" v-if="groupType == 7 && detailData.status == 1">
			<view class="btn-box width-100-per" @tap="doAct('exit',true)">
				<view class="exit-btn">
					退出拼团
				</view>
			</view>
		</view>
		<view class="fixed-btns" v-if="detailData.is_manager == 1 && groupType == 7 && detailData.status == 2">
			<view class="btn-box">
				<view class="hollow-btn" @tap="doAct('go')">
					寄存货
				</view>
			</view>
			<view class="btn-box">
				<view class="orange-btn" @tap="doAct('exit')">
					提货
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				detailData: {}, //
				members: [], // 团员列表
				listId: 0, //用于获取拼团详情
				timeId: null, //倒计时定时器
				timeer: null, //获取竞中者 刷新定时器
				leftTime: {
					day: 0,
					hour: 0,
					min: 0,
					secd: 0
				},
				groupType: 2, //2 二人 5 五人  7 七人
				ruleContent: "",
				ruleTitle: "",
				bidMem: {}, //五人团 竞中者
				myChildCode: "",
				is_me_success: false,
				is_manager: 0
			}
		},
		onLoad(options) {
			this.listId = options.listId || 0
			// 拼团详情 
			this.myChildCode = this.$store.state.childCode;
			this.getMyGroupDetail();

		},
		filters: {
			getGroupType(val) {
				return val == 22 ? 2 : val == 25 ? 5 : 7;
			}
		},
		onUnload() {
			console.log("onUnload------------")
			clearInterval(this.timeId);
			clearInterval(this.timeer);
		},
		onShareAppMessage(e) {
			console.log("分享", e)
			if (e.from == 'button') {
				let info = this.detailData;
				let type = info.type == 22 ? 3 : info.type == 25 ? 4 : 5
				let path = `/pages/goodsdetails/goodsDetails?id=${info.product_id}&type=${type}&groupId=${info.group_id}`
				console.log(path)
				return {
					title: info.product_name, //	String	是	分享标题	
					path: path, //	String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
					imageUrl: info.thumb,
				}
			}
		},
		methods: {
			//退出拼团or继续拼团 groupAct exit  
			doAct(act,isTips=false) {
				let child_code = this.$store.state.childCode;
				let _this=this;
				// <!-- 如果是团长和副团长的位置，及赠送单，选择退出，提示“如果退出拼团，商家默认发货，请谨慎选择”；
				// 如果是新人选择退出，提示“如果退出拼团，购物款原路返回，请注意查收” -->
				let tipContent="如果退出拼团，购物款原路返回，请注意查收"
				if (act == 'exit' && isTips) {

					this.members.forEach((mem, i) => {
						if (i < 3 && mem.child_code == child_code) {
							tipContent = "如果退出拼团，商家默认发货，请谨慎选择"
						}
					})
					
					uni.showModal({
						title: "提示",
						content: tipContent,
						success(res) {
							if(res.confirm){
								_this.doActAPI(act,child_code)
							}
						}
					})
				}else{
					this.doActAPI(act,child_code)
				}

				

				
			},
			//
			doActAPI(act,child_code){
				let data = {
					order_id: this.listId, //order_id
					group_id: this.detailData.group_id, //group_id
					child_code, //child_code
					type: act
				}
				// console.log("退出拼团or继续拼团", data)
				this.$api.groupAct(data).then(res => {
					console.log("退出拼团or继续拼团", res)
					this.$mUtils.toast(res.msg);
					if (res.code == 200) {
						this.$mUtils.timeout(() => {
							this.$mRouter.back();
						})
					}
				
				})
			},
			//点击再开一团
			goGoodsDetails() {
				let type = this.detailData.type == 22 ? 3 : this.detailData.type == 25 ? 4 : 5
				let query = {
					id: this.detailData.product_id,
					type,
				}
				console.log("点击再开一团", query)
				this.$mUtils.goPage("goodsDetails", query);
			},
			//拼团倒计时
			initCountDown(endTime) {
				console.log("endTime-----", endTime)
				this.timeId = setInterval(() => {
					var nowTime = new Date();

					var lefttime = endTime * 1000 - nowTime.getTime(); //距离结束时间的毫秒数

					if (lefttime < 0) {
						clearInterval(this.timeId)

						// if (this.groupType == 5) {
						// 	console.log("五人团 等待结果111111");
						// 	this.timeer = setInterval(()=>{
						// 		this.getMyGroupDetail();
						// 	},2000)
						// }


						this.timeer = setInterval(() => {
							this.getMyGroupDetail();
						}, 2000)

						return;
					}
					var leftd = Math.floor(((lefttime - 0) / (1000 * 60 * 60 * 24))), //计算天数
						lefth = Math.floor(((lefttime - 0) / (1000 * 60 * 60))), //计算小时数
						leftm = Math.floor(((lefttime - 0) / (1000 * 60)) % 60), //计算分钟数
						lefts = Math.floor(((lefttime - 0) / 1000) % 60); //计算秒数
					// console.log('开始倒计时---------------lefts', lefts,lefttime)

					this.leftTime = {
						day: leftd < 10 ? '0' + leftd : leftd,
						hour: lefth < 10 ? '0' + lefth : lefth,
						min: leftm < 10 ? '0' + leftm : leftm,
						secd: lefts < 10 ? '0' + lefts : lefts
					}
				}, 1000)
			},
			// 拼团详情 
			getMyGroupDetail() {
				this.$api.getMyGroupDetail({
					id: this.listId,
				}).then(res => {
					console.log("拼团详情", res);
					if (res.code == 200) {

						//this.is_me_success = this.$store.state.childCode == res.data.child_code;
						this.detailData = res.data;
						this.members = res.data.mem;
						this.groupType = this.detailData.type == 22 ? 2 : this.detailData.type == 25 ? 5 : 7;
						if (this.groupType == 5) {
							//五人团 竞中者 
							this.members.forEach((mem, i) => {
								if (mem.order_status != 6 && mem.order_status != 7) {
									this.bidMem = mem; //五人团 竞中者
									clearInterval(this.timeer)
								}
							})
							console.log("五人团 等待结果22222222");
							clearInterval(this.timeer)
							this.is_me_success = this.bidMem.child_code == this.$store.state.childCode;
						} else if (this.groupType == 7) {
							//团长 副团长
							this.members.forEach((mem, i) => {
								if (i < 3 && mem.child_code == this.$store.getters.getChildCode) {
									this.is_manager = 1;
								}
							})
							clearInterval(this.timeer)
						} else if (this.groupType == 2) {
							clearInterval(this.timeer)

						}
						if (this.detailData.status == 1) {
							//拼团倒计时
							this.initCountDown(this.detailData.end_time)
						}
						//获取拼团规则 10两人拼团规则，11五人拼团规则，12，7人拼团规则
						this.getDocument(this.groupType)
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//获取拼团规则 10两人拼团规则，11五人拼团规则，12，7人拼团规则
			getDocument(groupType) {
				this.$api.getDocument({
					type: groupType == 2 ? 10 : groupType == 5 ? 11 : 12
				}).then(res => {

					if (res.code == 200) {
						this.ruleContent = this.$mUtils.rplaceRichImg(res.data.content);
						this.ruleTitle = res.data.title;
					} else {
						console.log("获取拼团规则", res);
					}

				})
			}
		},

	}
</script>

<style scoped lang="scss">
	.container {
		background-color: #fff;
		padding-bottom: 140upx;

		.top-wrapper {
			background: linear-gradient(180deg, rgba(255, 85, 0, 1), rgba(255, 255, 255, 1));
			width: 100%;
			padding: 30upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.content-box {
				width: 100%;
				// min-height: 200upx;
				background-color: #fff;
				border-radius: 10upx;
				margin-bottom: 20upx;

			}

			.flex-column {
				display: flex;
				flex-direction: column;
				align-items: center;
			}


			.product-wrapper {
				width: 100%;
				height: 300upx;
				padding: 0 30upx;
				display: flex;
				align-items: center;

				.product-img {
					width: 220upx;
					height: 220upx;
					margin-right: 50upx;
					background-color: #f6f6f6;
					border-radius: 10upx;
				}

				.product-txt {
					flex: 1;
					flex-shrink: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 220upx;

					.group-tag {
						width: 120upx;
						height: 50upx;
						line-height: 50upx;
						text-align: center;
						background-color: #FF5900;
						border-radius: 40upx;
					}
				}
			}

			.persons-box {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				flex-wrap: wrap;
				margin-top: 40upx;
			}

			.btn-box {
				width: 550upx;
				height: 80upx;
				margin-bottom: 50upx;

			}

			.person {
				margin-right: 25upx;
				margin-bottom: 40upx;
				// height: 200upx;
				min-height: 180upx;
				justify-content: space-between;
			}

			button.person {
				line-height: 1;
			}

			.avatar {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				background-color: #f6f6f6;
			}

			.bid-avatar {
				border: 2upx solid #FF5900;
			}

			.crown-tag {
				width: 40upx;
				height: 30upx;
			}

			.bid-tag {
				width: 60upx;
				height: 25upx;
				margin-top: -15upx;
			}

			.line-height-100 {
				line-height: 100upx;
			}

			.line-height-50 {
				line-height: 50upx;
			}

			.count-down {
				display: flex;
				height: 100upx;
				width: 100%;
				align-items: center;
			}

			.block {
				display: inline-block;
				width: 50upx;
				height: 50upx;
				background-color: #FF5900;
				border-radius: 10upx;
				font-size: 30upx;
				color: #fff;
				font-weight: bold;
				line-height: 50upx;
				text-align: center;
			}

			.margin-left-20 {
				margin-left: 20upx;
			}

			.colon {
				display: inline-block;
				width: 25upx;
				height: 50upx;
				color: #FF5900;
				font-size: 28upx;
				font-weight: bold;
				line-height: 50upx;
				text-align: center;
			}

			.identity-box {
				align-items: flex-start;
				padding: 50upx 30upx;
			}
		}


		.rule-wrapper {
			padding: 0 30upx 100upx 30upx;
			color: #AC8671;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				line-height: 150upx;
				color: #484240;
			}
		}

		.fixed-btns {
			width: 100%;
			height: 120upx;
			background-color: #fff;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30upx;
			box-sizing: border-box;

			.btn-box {
				width: 48%;
				height: 80upx;

				.exit-btn {
					width: 100%;
					height: 80upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30upx;
					color: #333;
				}
			}

			.btn-box.width-100-per {
				width: 100%;
			}
		}
	}
</style>
