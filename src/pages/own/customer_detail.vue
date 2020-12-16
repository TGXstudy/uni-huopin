<template>
	<view class="kf" v-html="content">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: '' //详细内容
			}
		},
		onLoad(options) {
			this.id = options.id
			this.question()
		},
		methods: {
			question() {
				this.$api.question_detail({
					id: this.id
				}).then(res => {
					this.content =  this.$mUtils.rplaceRichImg(res.data.content) 
					console.log(res)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.kf {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 10px;
		image {
			max-width: 600upx;
		}
	}
</style>
