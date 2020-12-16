<template>
	<view class="gy" v-html="content">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
					content:''//详细内容
			}
		},
		onLoad(){
			this.$api.getDocument({
				type:'7'
			}).then(res=>{
				this.content=res.data.content
				console.log(res)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.gy{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 10px;
	}
</style>
