<template>
	<view class="cate-wrapper">
		<scroll-view   scroll-x="true" class="srcoll-view-x">
		    <view class="scroll-x-item" v-for="(cate,idx) in list" :key="idx" @tap="tapCate(cate)" >
				<view class="cate-box">
					<text :class="['fn-sz-28', curCate.cate_id == cate.cate_id ? 'fn-cl-333' : 'fn-cl-999' ]">
						{{cate.cate_name}}
					</text>
					<view :class="['border-line',curCate.cate_id == cate.cate_id ? 'border-orange' : '' ] "></view>
				</view>
		    </view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array
			},
			initCateId:{
				type:[String,Number]
			}
			
		},
		watch:{
			initCateId(newVal){
				this.curCate.cate_id = newVal
			},
			
		},
		data(){
			return {
				curCate:{
					cate_id: this.initCateId || 0
				}
			}
		},
		methods:{
			tapCate(cate){
				this.curCate = cate;
				this.$emit("getCate",cate)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.cate-wrapper{
		width: 100%;
		padding: 0 30upx;
		background-color: #fff;
	}
	.srcoll-view-x{
	    width:100%;
	    white-space: nowrap;
		height: 80upx;
		display: flex;
		align-items: center;
	}
	
	.scroll-x-item{
	    display:inline-block;
		height: 70upx;
		.cate-box{
			display: flex;
			flex-direction: column;
			margin-right: 20upx;
			height: 70upx;
			justify-content: space-around;
			.border-line{
				width: 50upx;
				height: 5upx;
				background-color: transparent;
				border-radius: 5upx;
				margin: 0 auto;
			}
			.border-orange{
				background-color: #FA5E09;
			}
		}
		
		// .cate-box{
		// 	display: flex;
		// 	height: 100upx;
		// 	flex-direction: column;
		// 	justify-content: center;
		// 	margin-right: 20upx;
			
		// }
		
	}
</style>
