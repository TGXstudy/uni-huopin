<template>
	<view class="dz">
		<view class="top">
			<view class="name">
				<p>收件人姓名</p>
				<input v-model="fullname" type="text" placeholder="请输入收件人姓名" value="" />
			</view>
			<view class="name">
				<p>联系电话</p>
				<input  v-model="phone" type="text" placeholder="请输入收件人手机号" value="" />
			</view>
			<view class="ld">
				<p>所在区域</p>
				<h3>{{regionName || addressname}} </h3>
				
				<pick-regions class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<image :src="'mine/jt.png' | imgUrl"   mode=""></image>
				</pick-regions>
			</view>
			<view class="dzz">
				<p>详细地址</p>
				<input v-model="xx_dz" type="text" placeholder="这里填写详细地址" value="" />
			</view>
		</view>

		<view class="mr_dz">
			<view class="left">
				设置为默认地址
			</view>
			<view class="right">
				<switch :checked="status" @change="switch1Change" />
			</view>
		</view>

		<view class="add" @tap="bc()">
			保存
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				fullname:'',//用户名
				phone:'',//手机
				xx_dz:'',//详细地址,
				status:'',
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
				province:'',
				city:'',
				county:'',
				province_code:'',
				city_code:'',
				county_code:'',
				addressname:"",
				id:""
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		onLoad(options){
			this.id=options.id;
			this.fullname=options.fullname;
			this.phone=options.phone;
			this.province=options.province;
			this.city=options.city;
			this.county=options.county;
			this.xx_dz=options.address;
			this.province_code=options.province_code;
			this.city_code=options.city_code;
			this.county_code=options.county_code;
			this.county=options.county;
			this.status=options.status;
			this.addressname=this.province+this.city+this.county
			console.log(options)
			
			if(this.status=='yes'){
				this.status=true
			}else{
				this.status=false
			}
		},
		methods: {
			bc() {
				if(this.status==true){
					this.status='yes'
				}
				if(this.status==false){
					this.status='no'
				}
				console.log(this.status)
				
				this.$api.bj_address({
					id:this.id,
					fullname:this.fullname,
					phone:this.phone,
					province:this.province,
					city:this.city,
					county:this.county,
					address:this.xx_dz,
					province_code:this.province_code,
					city_code:this.city_code,
					county_code:this.county_code,
					status:this.status
				}).then(res=>{
					if(res.code==200){
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(()=>{
							this.$mRouter.back()
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})

			},
			switch1Change: function(e) {
				
				if(e.detail.value===true){
					this.status='yes';
					return
				}
				if(e.detail.value===false){
					this.status='no';
					return
				}
			
				
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
				console.log('regionregionregion', region)
				this.province=region[0].name;
				this.city=region[1].name;
				this.county=region[2].name;
				this.province_code=region[0].code+'0000';
				this.city_code=region[1].code+'00';
				this.county_code=region[2].code;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dz {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.add {
			width: 100%;
			background: rgba(250, 54, 9, 1);
			height: 60px;
			position: absolute;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 33upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fff;
		}

		.mr_dz {

			width: 100%;
			background-color: #fff;
			margin-top: 20px;
			height: 50px;
			padding: 10px;
			display: flex;
			justify-content: space-between;

			.left {}

			.right {}
		}


		.top {
			background-color: #fff;
			padding: 10px;
			display: flex;
			flex-direction: column;

			.ld {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50px;
				padding-bottom: 10px;

				.nrr {
					picker {
						width: 100%;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					p {}

					image {
						width: 8px;
						height: 18px;
					}
				}

			}

			.name {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				padding-bottom: 10px;
				margin-bottom: 10px;

				p {
					margin-right: 10px;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}

			.dzz {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;

				margin-bottom: 10px;

				p {
					margin-right: 10px;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}
</style>
