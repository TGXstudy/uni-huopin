import $mRoutesConfig from '@/config/routes.config.js'
import $mRouter from './router.js'
import store from '@/store'
import Vue from 'vue'
import config from "@/config/index.config.js"



export default {
	imgUrl(url) {
		return config.imgUrl + url;
	},

	goPage(routeName, query = {}) {
		$mRouter.push({
			route: $mRoutesConfig[routeName],
			query
		})
	},
	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},

	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},


	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},

	isChecked(list, string) {
		let a = list.filter(item => {
			if (item == string) return item
		})
		console.log(a)
		return a
	},


	// 随机生成n位随机数
	getRandStr(n) {
		let str = ''
		for (let i = 0; i < n; i++) {
			str += Math.floor(Math.random() * 10).toString()
		}
		return str
	},
	// 获取当前时间
	getCurTime() {
		let date = new Date(),
			y = date.getFullYear().toString().substr(2),
			m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
			d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
			h = date.getHours() % 12 < 10 ? '0' + date.getHours() % 12 : (date.getHours() % 12).toString(),
			i = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString(),
			s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds().toString();
		return (y + m + d + h + i + s)
	},
	// 提示组件
	toast(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	//延时器
	timeout(callback, duration = 1000) {
		let tid = setTimeout(function() {
			callback();
			clearTimeout(tid)
		}, duration)
	},
	// upx转px
	px(num) {
		return 2 * uni.upx2px(num) + 'px';
	},
	addImgUrl(props) {
		if (props.indexOf('http://') === -1 && props.indexOf('https://') === -1) {
			let url = process.env.VUE_APP_PLATFORM == "h5" ? "" : "https://shopbase.wsyjcs.cn";
			return url + props;
		} else {
			return props
		}
	},
	// 处理图片,去掉后缀加密
	handleImg(val) {
		// let str = val.split('?')[0];
		return val;
	},

	formatMsgDate(value1, value2) {
		var now = new Date(value1 * 1000);
		var date = new Date(value2.replace(/-/g, "/"));
		//计算时间间隔，单位为分钟
		var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
		if (inter == 0) {
			return "刚刚";
		}
		//多少分钟前
		else if (inter < 60) {
			return inter.toString() + "分钟前";
		}
		//多少小时前
		else if (inter < 60 * 24) {
			return parseInt(inter / 60).toString() + "小时前";
		} else if (now.getFullYear() == date.getFullYear()) {
			return (date.getMonth() + 1).toString() + "-" +
				date.getDate().toString() + " " +
				date.getHours() + ":" +
				date.getMinutes();
		} else {
			return date.getFullYear().toString().substring(2, 3) + "-" +
				(date.getMonth() + 1).toString() + "-" +
				date.getDate().toString() + " " +
				date.getHours() + ":" +
				date.getMinutes();
		}
	},

	rateInfo(value) {
		switch (value) {
			case 1:
				return '非常差'
			case 2:
				return '差'
			case 3:
				return '一般'
			case 4:
				return '好'
			case 5:
				return '非常好'
		}
	},

	rplaceRichImg(content) {
		let str = content.replace(/<img[^>]*>/gi, function(match, capture) {
			console.log(match, match.indexOf('style'), 'replace')
			if (match.indexOf('style') != -1) {
				// return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
				return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="width:100%;height:auto;"') // 替换style
			} else {
				return match.replace(/<img/ig, '<img style="width:100%;height:auto;"')
				// return match.replace(/<img/ig, '<img style="max-width:100%;height:auto;"')
			}

		})
		return str
	},

	stopScroll() {
		// #ifdef MP-WEIXIN
		// #endif
		// #ifdef APP-PLUS || H5
		document.body.style.overflow = 'hidden';
		document.body.style.height = "100%";
		document.addEventListener("touchmove", function(event) {
			event.preventDefault();
		}, false) //禁止页面滑动
		// #endif
	},

	startScroll() {
		// #ifdef MP-WEIXIN
		// #endif
		// #ifdef APP-PLUS || H5
		document.body.removeAttribute('style')
		document.removeEventListener("touchmove", function(event) {
			event.preventDefault();
		}, false)
		// #endif
	},
	checkIsWx() {
		var u = navigator.userAgent.toLowerCase()
		if (u.match(/MicroMessenger/i)) {
			return true
		}
		return false
	},

	async compressImage(src, platform) {
		const imageInfo = await this.getImageInfo(src);
		const orientation = imageInfo.orientation;
		if (!orientation) {
			return src
		}
		console.log(imageInfo, orientation, platform)
		let rotate = 0;
		let quality = 80;
		if (platform === 'ios') {
			rotate = 90;
			quality = 25;
		} else {
			switch (orientation) {
				case 'up': //exif:1 不旋转
					rotate = 180;
					break;
				case 'down': //exif:3 旋转180度
					rotate = 180;
					break;
				case 'right': //exif:6 旋转90度
					rotate = 90;
					break;
				case 'left': //exif:8 旋转270度
					rotate = 270;
					break;
				default:
					rotate = 0;
					break;
			}
		}
		return new Promise(function(resolve, reject) {
			uni.compressImage({
				src: src,
				quality: quality,
				rotate: rotate,
				success: res => {
					let tempPath = res.tempFilePath;
					resolve(tempPath)
				},
				fail: (e) => {
					reject(e)
				}
			})

		})
	},
	getImageInfo(path) {
		return new Promise(function(resolve, reject) {
			// #ifdef APP-PLUS
			plus.io.getImageInfo({
				src: path,
				success: function(image) {
					resolve(image)
				},
				fail: function(err) {
					console.log("getImageInfoErr: " + JSON.stringify(err));
					reject(err)
				}
			});
			// #endif
			// #ifdef H5 || MP-WEIXIN	
			uni.getImageInfo({
				src: path,
				success: function(image) {
					resolve(image)
				},
				fail: function(err) {
					console.log("getImageInfoErr: " + JSON.stringify(err));
					reject(err)
				}
			});
			// #endif
		})
	}
}
