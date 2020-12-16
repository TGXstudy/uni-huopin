<template>
	<view class="notice">
		<view class="box" @tap="to_detail(item.id)" v-for="(item,index) in nwesList" :key="item.id">
			<text class="fn-sz-36 fn-cl-333 fn-bold one-line-txt">
				{{item.title || "系统消息"}}
			</text>
			<view v-if="item.content"  class="fn-sz-26 fn-cl-aaa two-line-txt">

				{{item.content}}
			</view>
			<text class="fn-sz-22 fn-cl-999">{{item.create_time || item.time}}</text>
		</view>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>
	</view>
</template>

<script>
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default{
		components: {
			noMore,
			loadMore,
		},
		data(){
			return{
				type:'',
				nwesList:[],
				page:1,
				pageSize:10,
				nomore: true,
				loading: false,
			}
		},
		onLoad(options){
			this.type = options.type || '';
			if(this.type == 'notice'){
				//获取公告
				this.getNotice();
				uni.setNavigationBarTitle({
					title:"系统公告"
				})
			}else{
				this.myNews();
				uni.setNavigationBarTitle({
					title:"系统消息"
				})
			}
			
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.tj_list()
		},
		methods:{
			//获取公告
			getNotice(){
				this.loading = true;
				this.$api.gg_list({
					page:this.page,
					pageSize: this.pageSize
				}).then(res => {
					this.loading=false;
					if(res.code == 200){
						if(this.page == 1){
							this.nwesList = res.data.data
						}else{
							this.nwesList = this.nwesList.concat(res.data.data) 
						}
						this.nomore = res.data.last_page <= this.page;
					}else{
						this.$mUtils.toast(res.msg)
					}
					
							
				})
			},
			
			to_detail(id){
				if(this.type == 'notice'){
					this.$mUtils.goPage('notice_detail',{id})
				}
				
			},
			myNews(){
				this.$api.getMsgLists({
					page:1,
					per_page:10
				}).then(res =>{
					console.log(res)
					if(res.code == 200){
						this.nwesList = res.data.lists
					}else{
						console.log("===getMsgLists",res);
					}
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.notice{
		width: 100%;
		display: flex;
		flex-direction: column;
		background:rgba(246,246,246,1);
		padding-top: 20px;
		.box{
			width: 95%;
			margin: 0 auto;
			height: 265upx;
			background-color: #fff;
			border-radius:10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: 20upx;
			h3{
				font-size:38upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
			.nr{
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				height: 60px;
				overflow: hidden;
			}
			span{
				font-size:26upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
	}
</style>
