// 文件上传
const WUpload = (url, uploadName, token, data = {}, source) => {
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '上传中...',
			mask: true
		})
		// data['token'] = token
		var tempFilePaths = source.tempFiles[0].path
		// let is_test = ''
		// data['is_test'] = 1
		uni.uploadFile({
			url: url, //仅为示例，非真实的接口地址
			filePath: tempFilePaths,
			// name值需要根据项目自己配置
			name: uploadName || 'file',
			header: {
				'content-type': 'multipart/form-data',
				"Authorization": token
			},
			formData: data,
			success: function(res) {
				uni.hideLoading()
				// 如果返回json格式，转换成字符串
				if (IsJsonString(res.data)) {
					res.data = JSON.parse(res.data)
				}
				resolve(res.data)
			},
			fail: function(err) {
				uni.hideLoading()
				uni.showToast({
					title: '上传失败，请稍后重试！',
					icon: 'none',
					duration: 2000
				})
			},
			complete: function() {}
		})
	})
}
// 判断是否未json
const IsJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
export {
	WUpload
}
