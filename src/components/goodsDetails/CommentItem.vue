<template>
	<view class="item-box">
		<view class="flex-row-between">
			<view class="person-box">
				<image class="avatar-img" :src="item.avatar" mode=""></image>
				<view class="name-box">
					<text class="fn-sz-28 fn-cl-333">{{item.nickname}}</text>
					<text class="fn-sz-22 fn-cl-999">{{item.create_time}}</text>
				</view>
			</view>
			<view class="width-100-per star-box">
				<text class="fn-sz-24 fn-cl-333">{{item.comment_star}}</text>
				<image src="../../static/imgs/index/icon_star.png" v-for="(star,i) in item.comment_star-0" :key="i" class="icon-sz-30" mode=""></image>
				
			</view>
		</view>
		<view class="">
			<text class="fn-sz-28 fn-cl-333">{{item.comment_content}}</text>
		</view>
		<view class="reply-box" v-if="item.callback">
			<text class="fn-cl-999 fn-sz-30"> 商家回复： </text>
			<text class="fn-cl-333 fn-sz-30"> {{item.callback}} </text>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 20upx;
		.avatar-img{
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin-right: 20upx;
		}
		.person-box{
			display: flex;
			width: 100%;
			margin: 20upx auto;
			.name-box{
					display: flex;
					flex-direction: column;
			}
		}
		
		.star-box{
			display: flex;
			justify-content: flex-end;
		}
		.reply-box{
			padding: 30upx 50upx;
			background-color: #f6f6f6;
			border-radius: 10upx;
			margin: 20upx auto;
			width: 100%;
		}
		
	}
</style>
