<template>
	<view class="container flex-between">

		<scroll-view scroll-y="true" class="left-cate-box">
			<!-- <view class="spellGroup">
				<view v-for="(item,index) in cateList" :key="index" :class="['twoPeople',groupType == item.type ? 'current-group' : '']"
				 @tap="changeGroupType(item.type)">
					{{item.name}}
				</view>
			</view> -->
			<view class="left-cate-item" :class="curPIdx == idx ?'current-cate' : '' " 
			v-for="(item,idx) in cateList" :key="idx"
			 @tap="getParentCate(idx,item)">
				<text class="left-cate-name one-line-txt ">{{item.cate_name}}</text>
			</view>

		</scroll-view>

		<view class="right-cate-box">
			<view v-if="!(cateList[curPIdx] && cateList[curPIdx].child) || cateList[curPIdx].child.length<=0" class=" width-100-percent fn-cl-999 fn-sz-28  justify-content-center ">
				暂无分类
			</view>
			<view v-else class="right-cate-item flex-column " 
			v-for="(item,idx) in cateList[curPIdx].child" :key="idx" @tap="goCateGoods(item)">
				<image class="icon-cate" :src="item.thumb" mode=""></image>
				<text class="fn-sz-24 fn-cl-333 two-line-txt">{{item.cate_name}}</text>
			</view>
			<view class="list-wrapper">
				<group-item v-for="(pro,idx) in groupProList" :key="idx" 
				:item="pro"></group-item>
			</view>
		</view>
	</view>

</template>

<script>
	import groupItem from "@/components/index/GroupItem.vue"
	export default {
		// onLoad() {
		// 	// 获取全部分类
		// 	this.getCates();

		// },
		data() {
			return {
				cateList: [], //分类列表
				curPIdx: 3, //被选中的父级分类idx
				//拼团
				grouplist: [{
						type: "3",
						cate_name: "2人拼团",
						url: "/pages/group/towGroup"
					},
					{
						type: "4",
						cate_name: "5人拼团",
						url: "/pages/group/fiveGroup"
					},
					{
						type: "5",
						cate_name: "7人拼团",
						url: "/pages/group/sevenGroup"
					}
				],
				groupType: 3, // 3两人团，4五人团，5七人团）
				groupProList: [], //拼团商品列表
				p_cate_id: '',
			}
		},
		onShow() {
			this.getGroupList()
			// 获取全部分类
			this.getCates();
		},
		methods: {
			goCateGoods(item) {

				this.$mUtils.goPage('cateGoods', {
					cateId: item.cate_id,
					title: this.title,
					pCateId: this.pCateId,

				})
			},
			// 获取全部分类
			getCates() {
				this.$api.get_cate({
					p_cate_id: 0
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.cateList = this.grouplist.concat(res.data);

					} else {
						console.log("获取全部分类111", res);
					}
				})
				// this.cateList=this.grouplist+this.groupProList
			},
			// get_class(){
			// 	this.$api.lists({
			// 		mid
			// 	}).then(res=>{
			// 		if(res.code == 200){
			// 			this.classList = res.data
			// 		}else{
			// 			console.log("lists11111111111111",res)
			// 		}
			// 	})
			// }
			// 获取分类列表 
			getCategory(grade) {
				this.parentCateId = grade == 'parent' ? 0 : this.parentCateId
			},
			//单击一级分类
			getParentCate(idx, item) {
				this.curPIdx = idx;
				this.pCateId = item.cate_id;
				this.title = item.cate_name;
				console.log(idx, item)
				if (item.type == '3') {
					this.$mUtils.goPage('spellgroup',{
						type:3
					})
				}
				if (item.type == '4') {
					this.$mUtils.goPage('spellgroup',{
						type:4
					})
				}
				if (item.type == '5') {
					this.$mUtils.goPage('spellgroup',{
						type:5
					})
				}
			},
			// //点击拼团类型
			changeGroupType(type) {
				this.groupType = type;
				//获取拼团商品
				this.getGroupList()

			},
			//获取拼团商品
			getGroupList() {
				this.$api.lists({
					type: this.groupType, // 商品类型（1普通零售，2秒杀，3两人团，4五人团，5七人团）
					page: 1,
					pageSize: 2
				}).then(res => {
					console.log("获取拼团商品", res)
					if (res.code == 200) {
						this.groupProList = res.data.data;
					} else {
						console.log("获取拼团商品", res)
					}
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: calc(100vh - var(--window-top));
		box-sizing: border-box;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;

		.left-cate-box {
			width: 180upx;
			height: calc(100vh - var(--window-top));
			background-color: #F6F6F6;

			.current-cate {
				background-color: #fff;
			}

			.left-cate-item {
				font-size: 26upx;
				color: #333;
				height: 90upx;
				width: 100%;
				align-items: center;



				.left-cate-name {
					flex: 1;
					justify-content: center;
					padding: 0 10upx;
					box-sizing: border-box;
					align-items: center;
				}
			}

			//两人拼团
			.spellGroup {
				margin: 20upx 0;
				display: flex;
				flex-direction: column;
				font-size: 26upx;


				.twoPeople {
					height: 90upx;
					width: 100%;
					align-items: center;
					justify-content: center;
				}

				.current-group {
					background-color: #fff;
					color: #333;
				}

			}

		}

		.right-cate-box {
			flex: 1;
			flex-wrap: wrap;
			flex-direction: row;

			padding: 24upx 30upx;
			box-sizing: border-box;

			.right-cate-item {
				width: 140upx;
				margin-right: 40upx;
				margin-bottom: 30upx;
                display: flex;
				flex-direction: column;
				.icon-cate {
					width: 140upx;
					height: 140upx;
					border-radius: 8upx;
				}

				text {
					text-align: center;
					padding-top:20upx;
					font-size: 24upx;
				}
			}

			&>.right-cate-item:nth-child(3n) {
				margin-right: 0;
			}
		}

		.list-wrapper {
			padding: 0 20upx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
</style>
