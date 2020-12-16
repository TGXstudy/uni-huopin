<template>
	<view class="check">
		<!-- 默认账号 -->
		<view class="top" v-for="(item,index) in account_list" :key="index" @tap="check_zh(item.id)">
			<view class="left">
				<image class="img" :src="item.avatar" mode=""></image>
				<view class="middle">
					<p>{{item.nickname}}</p>
					<image v-if="item.default=='yes'" :src="'mine/默认.png' |imgUrl" mode=""></image>
				</view>
			</view>
			<view class="right" v-if="item.default=='yes'">
				当前账号
			</view>
			<view class="right2" v-if="item.default=='no'" @tap.stop="showAction('delete',item.id)">
				删除
			</view>
		</view>
		

		<!-- 新增账号 -->
		<button class="qr" @click="add()">新增账号</button>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				account_list:[],
				orderId:0,
			}
		},
		onShow(){
			this.getaccount();
		},
		methods:{
			check_zh(e){
				this.$api.check_acount({
					id:e
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$store.commit("SET_CHILDCODE",res.data.child_code);
							this.$mRouter.back();
						})
						
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			showAction(actType, id) {
				this.orderId = id;
				let tipTxts = {
					
					delete: '确认删除?',
				}
				let handler = {
					delete: this.delorder,
				}
				uni.showModal({
					title: '',
					content: tipTxts[actType],
					success(res) {
						if (res.confirm) {
							handler[actType]();
						}
					}
				})
			},
			//删除子账号
			delorder(){
				this.$api.del_acount({
					id:this.orderId
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.getaccount()
						})
						
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//获取账号信息
			getaccount(){
				this.$api.get_acount().then(res => {
					this.account_list=res.data
					console.log(this.account_list)
				})
			},
			
			add(){
				this.$mRouter.push({
					route: this.$mRoutesConfig.add_acount,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check{
		width: 100%;
		display: flex;
		flex-direction: column;
		background:rgba(255,255,255,1);
		padding-bottom: 60px;
		.qr {
			position: fixed;
			bottom: 10px;
			width: 100%;
			
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			outline: none;
			color: #fff;
		}
		.top{
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 80px;
			align-items: center;
			padding: 10px;
			border-bottom: 1px solid rgba(229,229,229,1);
			.left{
				
				.img{
					width: 60px;
					height: 60px;
				}
				.middle{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-left: 10px;
					image{
						width: 40px;
						height: 20px;
					}
					p{
						margin-bottom: 10px;
						font-size:30upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
					}
				}
			}
			.right{
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,89,0,1);
			}
			.right2{
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:400;
				
			}
		}
	}
	
</style>
