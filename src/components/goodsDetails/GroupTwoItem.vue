<template>
	<view class="group-item">
		<view class="person">
			<image class="person-avatar" :src="item.avatar" mode=""></image>
			<text class="fn-sz-28">{{item.nickname}}</text>
		</view>
		<view class="group-op" v-if=" type  == 'seven'">
			<view class="group-info">
				<text class="fn-sz-22 fn-cl-333">成团时间：{{item.success_time}}</text>
				<text class="fn-sz-22 fn-cl-999">建团时间：{{item.create_time}}</text>
			</view>
		</view>
		<view class="group-op" v-else>
			<view class="group-info">
				<view class="fn-sz-26">
					还差 <text class="fn-cl-orange">{{item.need}}人</text>成团
				</view>
				<view>
					<text class="fn-sz-22 fn-cl-999">剩余</text>
					<count-down :endTime="item.end_time" @updateList="updateList"></count-down>
				</view>

			</view>
			<button class="group-btn" @tap="goGroup">去拼团</button>
		</view>
	</view>

</template>

<script>
	import countDown from "@/components/goodsDetails/CountDown.vue"
	export default {
		components: {
			countDown
		},
		props: {
			item: {
				type: Object,
				default: function() {
					return {
						avatar: "https://wx.qlogo.cn/mmopen/vi_32/10Qw6ibibdicsHibtJ5HgmPibia44jr6ebbgQm3mB9UoLhYMWxngn9PIiaHVmRIiaic9eyosNibCDnqyEHrzBzzTsljic444A/132",
						end_time: "1597233494",
						id: 21,
						need: 1,
						nickname: "王火火"
					}
				}

			},
			type: {
				type: String, //seven 为七人团
			}
		},
		methods: {
			goGroup() {
				this.$emit("goGroup", this.item.id)
			},
			updateList() {
				this.$emit("updateList")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.group-item {
		display: flex;
		justify-content: space-between;
		height: 120upx;
		width: 100%;
	}

	.person {
		display: flex;
		align-items: center;
		flex: 1;
		flex-shrink: 1;

		.person-avatar {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			background-color: #f6f6f;
			margin-right: 25upx;
		}
	}

	.group-op {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.group-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.group-btn {
		background-color: #F6830A;
		width: 140upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		font-size: 24upx;
		color: #fff;
		border-radius: 24upx;
		margin-left: 20upx;
	}
</style>
