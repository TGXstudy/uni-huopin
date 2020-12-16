<template>
	<view class="container">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:""
			}
		},
		onLoad(options){
			//1用户协议，7关于平台，8代理规则（合伙人权益），9积分规则，10两人拼团规则，11五人拼团规则，12，7人拼团规则,14合伙人权益
			
			//获取文档（用户协议）
			this.getDocument(options.type || 1);
		},
		methods:{
			//获取文档（用户协议）
			getDocument(type){
				this.$api.getDocument({type}).then(res=>{
					console.log("获取文档（用户协议）",res)
					if(res.code == 200){
						this.content=this.$mUtils.rplaceRichImg(res.data.content) 
						uni.setNavigationBarTitle({
							title:res.data.title
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100;
		padding: 0 20upx;
		box-sizing: border-box;
		font-size: 26upx;
	}
</style>
