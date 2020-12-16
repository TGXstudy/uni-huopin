<template>
	<view class="notice_detail">
		<text class=" fn-sz-36 fn-cl-333 fn-bold title ">
			{{title}}
		</text>
		<view class=" width-100-per">
			<rich-text class="width-100-per" :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:'',
				title:''
			}
		},
		onLoad(options){
			this.id=options.id || '';
			this.getNoticeDetail()
		},
		methods:{
			//question_detail
			getNoticeDetail(){
				this.$api.question_detail({
					id:this.id
				}).then(res=>{
					console.log("公告详情",res)
					if(res.code == 200){
						
						this.content=this.$mUtils.rplaceRichImg(res.data.content)
						console.log(this.content)
						this.title=res.data.title;
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice_detail{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 20upx;
		box-sizing: border-box;
		.title{
			margin: 20upx 0;
		}
	}
</style>
