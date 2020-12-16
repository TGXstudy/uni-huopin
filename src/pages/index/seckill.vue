<template>
	<view class="seckill">
		<view class="seckillTop">
			<!-- 秒杀轮播 -->
			<view class="seckllBanner">
				<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots"
				 :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in banner_list" :key="index" @tap="goProductDetail(item)">
						<image class="bannerimg" :src="item.image"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="seckill-time">
				<scroll-view  scroll-x="true" class="srcoll-view-x">
				    <view class="scroll-x-item" v-for="(item,idx) in timeList" :key="idx"  >
						<view :class="['time-box',item.speed_id == curTime.speed_id ? 'now-time':'']" @tap="switchTime(item)">
							<text class="fn-sz-48">{{item.clock}}</text>
							<text class="fn-sz-24">{{item.status_string}}</text>
						</view>
				    </view>
				</scroll-view>
				
			
			</view>
		</view>
		<!-- 商品全部分类 -->
		<cate-title :list="classList" @getCate="getCate" ></cate-title>
		
		<!-- 商品详情 -->
		<view class="list-wrapper">
			<view class="content-list">
				<second-skill v-for="(pro,idx) in recdProList" :key="idx" :item="pro"></second-skill>
				<no-more class="width-100-per" :visible="nomore"></no-more>
				<load-more class="width-100-per" :visible="loading"></load-more>
			</view>
		</view>


	</view>
</template>

<script>
	import groupItem from "@/components/index/GroupItem.vue"
	import SecondSkill from "@/components/goodsDetails/SecondSkill.vue"
	import cateTitle from "@/components/index/CateTitle.vue"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			SecondSkill,
			groupItem,
			cateTitle,
			noMore,
			loadMore,
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				//轮播，
				banner_list: [], //banner
				// 疯抢开始时间
				timeList: [	],
				//选中时段
				curTime:{},
				
				classList: [], //获取分类

				//商品列表
				recdProList: [],
				active: '',
				
				page:1,
				pageSize:10,
				nomore: true,
				loading: false,

			}
		},
		onShow() {
			//获取秒杀时段
			this.getSkillTime()
			//获取banner
			this.getBanner();
			//获取商品分类
			this.getClass()
			//获取商品列表
			this.ms_list()
			
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.tj_list()
		},
		methods: {
			//获取秒杀时段
			getSkillTime(){
				this.$api.getSkillTime().then(res=>{
					console.log("获取秒杀时段",res)
					if(res.code == 200){
						this.timeList=res.data;
						this.curTime=this.timeList && this.timeList[0];
						this.ms_list();
					}else{
						
					}
				})
			},
			//切换时段
			switchTime(item){
				this.curTime=item;
				this.page = 1;
				this.ms_list()
			},
			getCate(cate){
				this.pCateId=cate.cate_id;
				this.page=1;
				this.ms_list() 
			},
			//banner 跳转商品详情
			goProductDetail(item){
				console.log("跳转商品详情",item);
				if(item.url){
					this.$mUtils.goPage("goodsDetails",{id:item.url,type:item.type})
				}else{
					this.$mUtils.toast("链接错误")
				}
			},
			//获取首页banner
			getBanner() {
				console.log("获取首页banner", this.banner_list)
				this.$api.getBanner({
					type: 2
				}).then(res => {
					if (res.code == 200) {
						this.banner_list = res.data
					} else {
						this.$mUtils.toast(res.msg)
					}

				})
			},
			//获取到商品分类
			getClass() {
				this.$api.get_cate({
					p_cate_id: 0
				}).then(res => {
					if (res.code == 200) {
						this.classList =[{
							cate_name:"全部",
							cate_id:0
						}].concat(res.data) 
					} else {
						console.log("get_cate获取到分类", res)
					}
				})
			},
			allActive(index) {
				this.active = index;
			},
			//1.获取商品列表
			ms_list() {
				this.loading=true;
				this.nomore=false;
				this.$api.lists({
					type: 2,
					page: this.page,
					pageSize: this.pageSize,
					speed_kill_id:this.curTime.speed_id,
					p_cate_id:this.pCateId
				}).then(res => {
					this.loading=false;
					if (res.code == 200) {
						if (this.page == 1) {
							this.recdProList = res.data.data;
						} else {
							this.recdProList = this.recdProList.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log("lists获取商品列表", res)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.seckill {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
background-color: #fff;
		// 轮播秒杀+时间
		.seckillTop {
			width: 100%;
			height: 660upx;
			flex-direction: column;
			background-color: #FF5500;
			margin-bottom: 20upx;
			.seckllBanner {
				width: 100%;
				justify-content: center;

				.swiper {
					align-items: center;
					width: 90%;
					height: 400upx;
				}
			}

			//秒杀时间
			.seckill-time {
				height: 160upx;
				width: 100%;
				display: flex;
				margin-top: 40upx;
				padding: 0 30upx;
				.srcoll-view-x{
				    width:100%;
				    white-space: nowrap;
					.scroll-x-item{
					    display:inline-block;
						.time-box{
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width: 150upx;
							height: 160upx;
							color:rgba(255,255,255,.5);
						}
						.now-time{
							color: #fff;
						}
					}
				}
				
				
			}
		}

		// 商品全部分类
		.list-wrapper{
			width: 100%;
			background-color: #fff;
			.content-list{
				width: 100%;
				display: flex;
				flex-direction: column;
			}
			
		}

	}
</style>
