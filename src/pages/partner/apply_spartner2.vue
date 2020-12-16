<template>
	<view class="hhr">
		<!-- 姓名 -->
		<view class="name">
			<view class="left">
				姓名
			</view>
			<view class="right">
				<input v-model="username" placeholder="请输入姓名" type="text" value="" />
			</view>
		</view>
		<!-- 电话 -->
		<view class="phone">
			<view class="left">
				电话
			</view>
			<view class="right">
				<input v-model="phone" placeholder="请输入电话" type="text" value="" />
			</view>
		</view>
		<!-- 区域 -->
		<view class="phone">
			<view class="left">
				<p>所在区域</p>
				
		
			</view>
			<view class="right">
				<pick-regions class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<span class='djj' v-if="!regionName">点击选择区域</span>
					<span>{{regionName}} </span>
					<image :src="'mine/jt.png' | imgUrl"></image>
				</pick-regions>
			</view>
		</view>
		<!-- 合伙人等级 -->
		<view class="hhr_dj">
			<view class="left">
				合伙人等级
			</view>
			<view class="right">
				<p>市级合伙人</p>
			</view>
		</view>

		<!-- 备注 -->
		<view class="bz">
			<view class="left">
				备注(选填）
			</view>
			<view class="right">
				<input v-model="bz" placeholder="请在这里填写备注" type="text" value="" />
			</view>
		</view>

		<button class="qr" @click="sh()">确定</button>
		<p class="ck_hhr" @tap="ck_qy()">查看合伙人权益</p>


	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import pickRegions from '@/components/pick-regions/pick-regions2.vue'
	export default {
		components: {
			uniPopup,
			pickRegions
		},
		data() {
			return {
				username: '', //姓名
				phone: '', //电话
				bz: '', //备注
				address:'',//地址
				current: 0,
				title: 'picker',
				index: 0,
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		
		methods: {
			ck_qy() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.apply_rule,
				})
			},
			sh(){
				this.$api.apply({
					name: this.username,
					phone: this.phone,
					address: this.address,
					code: this.code,
					level: 2,
					pay_type:'4',
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.push({
								route:this.$mRoutesConfig.apply_check2,
							})
						})
						
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			handleGetRegion(region) {
				this.region = region;
				console.log(this.region)	
				let a = this.region[0].name;
				let b = this.region[1].name;
				this.address=a+b;
				this.code= this.region[1].code + '00'; //市code
				
					
					
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hhr {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		padding: 10px;
		padding-top: 20px;
		display: flex;
		flex-direction: column;

		.qrr {
			width: 100% !important;

			.qr_btn {
				width: 420px;
				height: 400px;
				background: rgba(255, 255, 255, 1);
				padding: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.qr_a {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.one {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}

					.two {
						font-size: 40upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(246, 42, 42, 1);
					}
				}
				.qr_c{
					width: 100%;
					display: flex;
					justify-content: space-between;
					justify-content: center;
					align-items: center;		
					.qxc{
						border: 1px solid rgba(220, 220, 220, 1);
					}
							
					.qrc{
						border: none;
						color: #fff;
						background: -o-linear-gradient(left, #ff5500, #ff7200);
						background: linear-gradient(90deg, #ff5500, #ff7200);
							
					}
							
					button {
						border-radius: 37px;
						width: 48%;
						height: 45px;
							
					}
				}
				.qr_b {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 100%;
					height: 300px;
					.title {}

					.zf_box {
						width: 100%;
						display: flex;
						justify-content: space-between;
						
						.left {
							display: flex;
							align-items: center;
							image {
								margin-right: 10px;
								width: 50px;
								height: 50px;
							}
						}

						.right {}
					}
				}


			}
		}




		.ck_hhr {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: rgba(255, 89, 0, 1);
			margin-top: 30px;

		}

		.qr {
			margin-top: 30px;
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

		.name {
			margin-bottom: 20px;
			width: 100%;
			height: 40px;
			padding-bottom: 20px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {}

			.right {
				input {
					text-align: right;
				}
			}
		}

		.bz {
			margin-bottom: 20px;
			width: 100%;
			height: 180px;
			padding-bottom: 20px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			.left {
				width: 100%;
				display: flex;
				justify-content: flex-start;
			}

			.right {
				width: 100%;

				input {
					width: 100%;
					height: 120px;
					background: rgba(246, 246, 246, 1);
					border-radius: 10px;
				}
			}
		}

		.phone {
			margin-bottom: 20px;
			width: 100%;
			height: 40px;
			padding-bottom: 20px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.djj{
				color: #AAAAAA;
				margin-right: 5px;
			}
			
			.left{
				p{
					margin-right: 10px;
				}
			}
			.right {
				input{
					text-align: right;
				}
				image{
					width: 11px;
					height: 18px;
				}
			}
		}

		.hhr_dj {
			margin-bottom: 20px;
			width: 100%;
			height: 40px;
			padding-bottom: 20px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.uni-list {
				display: flex;
				align-self: flex-end;
			}

			.jt {
				margin-left: 5px;
				display: flex;
				align-self: flex-end;
				width: 8px;
				height: 18px;
			}
		}



	}
</style>
