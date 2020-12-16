<template>
	<view class="container">
		<view class="search-bar">
			<view class="search-box" >
				<image class="icon-sz-30" :src="'footer/search.png' | imgUrl"></image>
				<input type="text" class="fn-sz-26 search-input" v-model.trim="keywords"  placeholder="搜索商品" @confirm="doSearch"  />
			</view>
			<view class="search-btn" @tap="doSearch">
				<view class="orange-btn">搜索</view>
			</view>
		</view>
		<view class="list-wrapper">
			<group-item  v-for="(pro,idx) in proList" :key="idx" :item="pro" :isGroup="pro.type == 3 || pro.type == 4 ||pro.type == 5"></group-item>
			<no-more class="width-100-per" :visible="nomore"></no-more>
			<load-more class="width-100-per" :visible="loading"></load-more>
		</view>



	</view>
</template>

<script>
	import groupItem from "@/components/index/GroupItem.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			groupItem,
			noMore,
			loadMore
		},
		data() {
			return {
				nomore: true,
				loading: false,
				page: 1,
				pageSize: 10,
				keywords:"",
				type:'',
				proList:[]
			}
		},
		onLoad(options) {
			this.type = options.type || ''
		},
		onShow() {


		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getList()
		},
		methods: {
			//点击搜索
			doSearch(){
				console.log("点击搜索",this.keywords);
				if(!this.keywords){
					this.$mUtils.toast("请输入关键字");
					return;
				}
				this.getList()
				
			},

			
			//获取拼团商品
			getList() {				
				this.loading = true;
				this.$api.lists({
					keywords:this.keywords,
					type: this.type, // 商品类型（1普通零售，2秒杀，3两人团，4五人团，5七人团）
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					this.loading = false;
					console.log("获取拼团商品", res)
					if (res.code == 200) {
						if (this.page == 1) {
							this.proList = res.data.data;
						} else {
							this.proList = this.proList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("获取拼团商品", res)
					}
				})
			},
			//是否绑定了手机号
			checkTel() {
				this.$api.checkTel().then(res => {
					console.log("是否绑定了手机号", res)
					if (res.code == 200) {
						this.$mRouter.back()
					} else if (res.code == 210) {
						this.$mRouter.redirectTo({
							route: this.$mRoutesConfig.bindTel
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		
		background-color: #fff;
		.search-bar{
			padding: 0 30upx;
			display: flex;
			width: 100%;
			height: 100upx;
			align-items: center;
			.search-box{
				flex: 1;
				flex-shrink: 1;
				height: 60upx;
				padding: 0 30upx;
				box-sizing: border-box;
				background-color: #F3F3F3;
				border-radius: 40upx;
				display: flex;
				align-items: center;
				.search-input{
					margin-left: 20upx;
					display: block;
					width: 100%;
					height: 100%;
				}
			}
				
			.search-btn{
				margin-left: 20upx;
				width: 140upx;
				height: 60upx;
			}
		}
		.list-wrapper {
			padding: 0 20upx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			background-color: #f6f6f6;
			min-height:  calc(100vh - 100upx);
		}
	}
</style>
