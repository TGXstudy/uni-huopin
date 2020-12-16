<template>
	<view class="spellGroup">
		<group-two-item v-for="(item,idx) in groupList" :key="idx" :item="item" @goGroup="goGroup" :type="type"></group-two-item>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>
		<option-popup ref="options" :proDetail="proDetail" :initCurOption="initCurOption" :groupId="groupId" :buyType="'group'"></option-popup>
	</view>
</template>

<script>
	import groupTwoItem from "@/components/goodsDetails/GroupTwoItem.vue"
	import optionPopup from "@/components/goodsDetails/OptionPopup.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			groupTwoItem,
			optionPopup,
			noMore,
			loadMore
		},
		data() {
			return {
				groupList: [],
				productId: 0,
				proDetail: {},
				initCurOption: {},
				groupId:'',
				type:'',
				page:1,
				pageSize:12,
				nomore: true,
				loading: false,
			}
		},
		onLoad(options) {
			
			if( options.productId){ //两人，五人拼团
				this.productId = options.productId || 0;
				// 两人，五人拼团列表
				this.getGroupList();
				//获取商品详情
				this.getProDetail()
			}else if(options.type && options.type == 5) {
				//获取七人团列表
				this.getSevenList()
				this.type = 'seven';
			}
			
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			if(this.type == 'seven'){
				this.getSevenList()
			}else{
				this.getGroupList();
			}
		},
		methods: {
			//获取七人团列表
			getSevenList() {
				this.loading = true;
				this.$api.getSevenGroup({
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log("获取七人团列表", res)
					this.loading = false
					if (res.code == 200) {
						
						if (this.page == 1) {
							this.groupList = res.data.data;
						} else {
							this.groupList = this.groupList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("获取七人团列表", res)
					}
				})
				// 7人团拼团记录  getSevenGroup 
			},
			
			//去拼团
			goGroup(groupId) {
				console.log("去拼团", groupId)
				this.buyType = 'group';
				this.groupId = groupId;
				console.log("购买方式", this.buyType, this.type)
				this.$refs.options.open()
			},
			getProDetail() {
				this.$api.getProDetail({
					id: this.productId
				}).then(res => {
					console.log("获取商品详情", res)
					if (res.code == 200) {
						this.$nextTick(()=>{
							this.proDetail = res.data
							let proOptions = this.proDetail.options;
							this.initCurOption = proOptions && proOptions[0]; //当前选择的规格 
						})
						
					} else {
						this.$mUtils.toast("商品不存在！")
						this.$mUtils.timeout(() => {
							this.$mRouter.back();
						})
					}
				})
			},

			// 两人，五人拼团列表
			getGroupList() {
				this.loading = true;
				this.$api.getGroupList({
					product_id: this.productId
				}).then((res) => {
					console.log("两人，五人拼团列表", res)
					this.loading = false
					if (res.code == 200) {
						
						if (this.page == 1) {
							this.groupList = res.data.data;
						} else {
							this.groupList = this.groupList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
						
					} else {
						console.log("两人，五人拼团列表", res)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.spellGroup {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin: 30upx 20upx 0upx;

		.group {
			display: flex;
			justify-content: space-between;
			margin: 30upx 0upx 0upx;

			.useraAatars {
				display: flex;

				.portrait {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					border: 1px solid #CCCCCC;
					// margin: 0upx 20upx;
				}

				.name {
					width: 200upx;
					font-size: 32upx;
					align-items: center;
					margin-left: 10upx;
				}
			}

			.clouds {
				display: flex;

				.sent {
					flex-direction: column;
					font-size: 32upx;
					// margin-right: 20upx;
					width: 240upx;

					.time {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}

				.goGroup {
					width: 180upx;
					height: 60upx;
					background: rgba(253, 116, 43, 1);
					border-radius: 35upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

</style>
