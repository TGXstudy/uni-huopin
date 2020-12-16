<template>
	<!-- 绑定手机号 -->
	<view class="container">
		<view class="input-wrapper">
			<view class="item-box">
				<input class="input fn-sz-26" type="number" placeholder="请输入手机号"  maxlength="11" v-model.trim="phone"/>
			</view>
			<view class="item-box">
				<input class="input fn-sz-26" type="number" placeholder="请输入验证码" maxlength="6" v-model.trim="code"/>
				<verify-code :mob="phone" :type="'bond'"></verify-code>
			</view>
			<!-- <view class="item-box" v-if="invitation">
				<input class="input fn-sz-26" disabled type="number" placeholder="请输入推荐人手机号或推荐码"  v-model.trim="invitation" />
			</view> -->
			<view class="item-box">
				<input class="input fn-sz-26" type="text" placeholder="请输入推荐人手机号或推荐码"  v-model.trim="invitation" />
			</view>
			<button class="login-btn fn-sz-30 fn-cl-fff" @tap="doBind">登录</button>
		</view>
		<view class="" @tap="doAgree">
			<image class="icon-sz-30" :src="(isAgree ? 'login/icon_check_orange.png' : 'login/icon_check_gray.png') | imgUrl" mode=""></image>
			<text class="fn-sz-24 fn-cl-999"> 我已阅读并同意 </text> 
			<text class="fn-sz-24 fn-cl-orange" @tap.stop="$mUtils.goPage('protocol',{type:1})"> 《用户协议》 </text>
		</view>
		
	</view>
</template>

<script>
	import verifyCode from "@/components/verifyCode.vue"
	export default{
		components:{verifyCode},
		data(){
			return {
				phone:'',
				code:'',
				invitation:'',
				isAgree: false
			}
		},
		onShow() {
			console.log("保存的推荐码",this.$store.getters.getInvcode)
			let invcode = this.$store.getters.getInvcode || ''
			this.invitation=invcode
		},
		//微信授权登录 wxlogin
		methods:{
			//
			doAgree(){
				this.isAgree = !this.isAgree
			},
			//点击登录
			doBind(){
				if(!this.isAgree){
					this.$mUtils.toast("请先阅读并同意《用户协议》");
					return;
				}
				if(!this.phone){
					this.$mUtils.toast("请输入手机号");
					return;
				}
				if(!this.code){
					this.$mUtils.toast("请输入验证码");
					return;
				}
				
				//绑定手机号
				this.bondTel()
			},
			//绑定手机号
			bondTel(){
				this.$api.bondTel({
					phone:this.phone,
					code:this.code,
					invitation_code:this.invitation
				}).then(res=>{
					if(res.code == 200){
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(()=>{
							this.$mRouter.back();
						})
					}else{
						this.$mUtils.toast(res.msg);
					}
				})
			}
		}
	}
	
</script>
<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
	}
	.input-wrapper{
		width: 560upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.item-box{
			width: 100%;
			height: 80upx;
			background-color: #F6F6F6;
			border-radius: 40upx;
			margin-bottom: 20upx;
			display: flex;
			padding: 0 30upx;
			box-sizing: border-box;
			align-items: center;
			.input{
				flex: 1;
				display: block;
				height: 100%;
				flex-shrink: 1;
			}
			
			
		}
		
		
		.login-btn{
			margin-top: 40upx;
			//#ifdef MP-WEIXIN
			background-color: $theme-orange;
			//#endif
			//#ifdef H5
			background-color: var(--theme-orange);
			//#endif
			width: 560upx;
			height: 80upx;
			line-height: 80upx;
			border-radius: 40upx;
			
		}
	}
</style>