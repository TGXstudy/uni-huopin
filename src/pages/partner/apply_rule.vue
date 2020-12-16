<template>
	<view class="hh_qy" v-html="content">
		合伙权益
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:''//��ϸ����
			}
		},
		methods:{
			
		},
		onLoad(){
			
				this.$api.getDocument({
					type:'8'
				}).then(res=>{
					this.content=res.data.content
					console.log(res)
				})
			
		}
	}
</script>

<style lang="scss" scoped>
	.hh_qy{
		display: flex;
		width: 100%;
		padding: 10px;
		background-color: #fff;
		image{
			width: 100%;
		}
	}
</style>
