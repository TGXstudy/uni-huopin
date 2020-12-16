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
		<!-- 合伙人等级 -->
		<view class="hhr_dj">
			<view class="left">
				合伙人等级
			</view>
			<view class="right">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
					<image class="jt" :src="'mine/jt.png' | imgUrl"></image>
				</view>

			</view>
		</view>
		<!-- 区域 -->
		<view class="phone" v-if="index==0">
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
		
		<view class="phone" v-if="index==1">
			<view class="left">
				<p>所在区域</p>
				<h3>{{regionName}} </h3>
		
			</view>
			<view class="right">
				<pickRegions2 class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion2">
					<image :src="'mine/jt.png' | imgUrl"></image>
				</pickRegions2>
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

		<button class="qr" @click="open">确认</button>
		<p class="ck_hhr" @tap="ck_qy()">查看合伙人权益</p>

		<!-- 确认 -->
		<!-- <uni-popup class="qrr" ref="qr" type="bottom">
			<view class="qr_btn">
				<view class="qr_a">
					<p class="one">社区合伙人费用</p>
					<p class="two">￥29.90</p>
				</view>
				<view class="qr_b">
					<view class="title">
						请选择支付方式
					</view>
					<view class="zf_box">
						<view class="left">
							<image class="jt" :src="'mine/sy.png' | imgUrl" mode=""></image>
							<p>微信支付</p>
						</view>
						<view class="right">
							<label @click="redio(0)" class="radio">
								<radio :checked="xz===0" value="r2" /></label>
						</view>
					</view>
					<view class="zf_box">
						<view class="left">
							<image class="jt" :src="'mine/sy.png' | imgUrl" mode=""></image>
							<p>余额支付</p>
						</view>
						<view class="right">
							<label @click="redio(1)" class="radio">
								<radio :checked="xz===1" value="r2" /></label>
						</view>
					</view>
					<view class="zf_box">
						<view class="left">
							<image class="jt" :src="'mine/sy.png' | imgUrl" mode=""></image>
							<p>钱包支付</p>
						</view>
						<view class="right">
							<label @click="redio(2)" class="radio">
								<radio :checked="xz===2" value="r2" /></label>
						</view>
					</view>
				</view>
				<view class="qr_c">
					<button class="qxc" @click="close">取消</button>
					<button class="qrc" @click="qr_close">确定</button>
				</view>
			</view>

		</uni-popup> -->

		<!-- 输入密码 -->
		<!-- <uni-popup class="qrmm" ref="qrmm">
			<input placeholder="请输入密码" v-model="qrmm" type="number" password value="" />
			<button class="qrmm" @tap="qrmm_last">确认输入</button>
		</uni-popup> -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import pickRegions2 from '@/components/pick-regions/pick-regions2.vue'
	export default {
		components: {
			uniPopup,
			pickRegions,
			pickRegions2
		},
		data() {
			return {
				username: '', //姓名
				phone: '', //电话
				qrmm: '', //确认密码
				bz: '', //备注
				address: "", //地址
				code: "", //代理区域
				code1: "",
				code2: "",
				code3: "",
				level: 1, //级别
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
				xz: 1,
				items: [{
						value: 'wx',
						name: '微信支付',
						image: '../../static/imgs/mine/sy.png',
					},
					{
						value: 'ye',
						name: '余额支付',
						image: '../../static/imgs/mine/sy.png',
					},
					{
						value: 'qb',
						name: '钱包支付',
						image: '../../static/imgs/mine/sy.png',
					},
				],
				current: 0,
				title: 'picker',
				array: ['社区合伙人', '市区合伙人'],
				index: 0,

			}
		},
		onLoad(){
			
			
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		
		methods: {
			redio(e) {

				this.xz = e;
			},
			open() {
				
				if (this.index === 0) {
					this.level = 1;
					let a = this.region[0].name;
					let b = this.region[1].name;
					let c = this.region[2].name;
					this.address = a + b + c;
					console.log(this.level, this.address)
					let a1 = this.region[0].code + '0000'; //省code
					let b1 = this.region[1].code + '00'; //市code
					let c1 = this.region[2].code; //区code			
					this.code=c1;
				}else{
					this.level = 2;
					let a = this.region[0].name;
					let b = this.region[1].name;
				
					this.address = a + b ;
					console.log(this.level, this.address)
					let a1 = this.region[0].code + '0000'; //省code
					let b1 = this.region[1].code+'00'; //市code
					this.code=b1;
				}
			
				this.$mUtils.timeout(res=>{
					this.qrmm_last()
				})
			},
			qrmm_last() {
			
				this.$api.apply({
					name: this.username,
					phone: this.phone,
					address: this.address,
					code: this.code,
					level: this.level,
					more: this.bz,
					pay_type: this.xz + 1,
					pay_pwd: this.qrmm
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
			qr_close() {
				if (this.level === 1) {
					this.code = this.code2;
				}
				if (this.level === 2) {
					this.code = this.code3;
				}

				this.$refs.qrmm.open()


				
			},
			close() {

				this.$refs.qr.close()
			},
			ck_qy() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.apply_rule,
				})
			},
			//合伙人选择
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			handleGetRegion(region) {
				this.region = region
				console.log('regionregionregion', region)
			},
			handleGetRegion2(region) {
				this.region = region
				console.log('regionregionregion', region)
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

		.qrmm {
			width: 100%;
			padding: 10px;

			input {
				width: 150px;
				margin: 0 auto;
				height: 50px;
			}
		}

		.qrr {
			width: 100% !important;

			.qr_btn {

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

				.qr_c {
					width: 100%;
					display: flex;
					justify-content: space-between;
					justify-content: center;
					align-items: center;

					.qxc {
						border: 1px solid rgba(220, 220, 220, 1);
					}

					.qrc {
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
			.left {
				h3 {
					margin-left: 10px;
				}
			}

			.right {
				display: flex;
				justify-content: center;
				align-items: center;

				input {
					text-align: right;
				}

				image {

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
