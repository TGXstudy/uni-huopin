<script>
	export default {
		onLaunch: function(options) {
			console.log('onLauch', options, process.env)

			if (process.env.VUE_APP_MODE == "dev") {
				console.log("onLaunch参数", options.query.code);
				//对获取到的参数query进行下一步操作
				this.$store.commit("SET_INVCODE",options.query.code);
			}
			if (options.query.scene) { //小程序码是否带有参数
				//params转 obj  字符串参数  a=123&b=456 转 {a:"123",b:"456"}
				var query = this.getRequestParameters(decodeURIComponent(options.query.scene))
				console.log("onLaunch参数", query.code);
				//对获取到的参数query进行下一步操作
				this.$store.commit("SET_INVCODE",query.code)
			}
			

		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			/*
			 * params转 obj  字符串参数  
			 * 例子： a=1&b=2 => {a:1,b:2}
			 */
			getRequestParameters(params = "") {
				let theRequest = new Object();
				if (params != undefined) {
					let strs = params.split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/common.css';
	@import './common/css/base.css';

	* {
		box-sizing: border-box;
	}

	image {
		width: 100%;
		height: 100%;
	}

	page {
		position: relative;
		color: #333333;
	}

	page,
	view {
		display: flex;
		box-sizing: border-box;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #f5f5f5;
	}
</style>
