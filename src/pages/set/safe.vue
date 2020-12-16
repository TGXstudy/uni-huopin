<template>
	<view class="sz">
		<view class="sz_a">
			<view class="box" @tap="check_pay()">
				<view class="left" >
					修改支付密码
				</view>
				<view class="right">
					<image :src="'mine/jt.png' | imgUrl"  ></image>
				</view>
			</view>
			
		</view>
		<view class="zhbd">
			账号绑定
		</view>
		<view class="sz_a">
			<view class="box" @tap="check_phone()">
				<view class="left">
					手机号
				</view>
				<view class="right">
					<p>{{phone}}</p>
					<image  :src="'mine/jt.png' | imgUrl"  ></image>
				</view>
			</view>
			<view class="box" >
				<view class="left">
					微信号
				</view>
				<view class="right">
					<p>{{wx_name}}</p>				
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone:"",//绑定手机号
				wx_name:''//微信号
				
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods:{
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					
					this.phone = res.data.phone;
					this.wx_name = res.data.wx_nickname;
				})
			},
			check_pay(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.check_paypwd,
				})
			},
			check_phone(){
				this.$mRouter.push({
					route:this.$mRoutesConfig.check_phone,
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.sz{
		width: 100%;
		background:rgba(246,246,246,1);
		display: flex;
		flex-direction: column;
		.zhbd{
			margin-left: 5px;
			margin-bottom: 5px;
		}
		.qh{
			width: 100%;
			height: 60px;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			outline: none;
		}
		.sz_a{
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-bottom: 20px;
			.box{
				width: 100%;
				height: 60px;
				border-bottom: 1px solid rgba(229,229,229,1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
				.left{
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.right{
					p{
						margin-right: 10px;
					}
					image{
						width: 8px;
						height: 18px;
					}
				}
			}
		}
	}
	
</style>
