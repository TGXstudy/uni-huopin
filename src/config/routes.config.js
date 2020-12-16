/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	login: {
		name: "登录",
		path: "/pages/login/login",
	},
	bindTel: {
		name: "绑定手机号",
		path: "/pages/login/bindTel",
	},
	protocol: {

		name: "用户协议",
		path: "/pages/login/protocol",
	},
	// 非权限路由
	index: {
		name: "首页",
		path: "/pages/index/index"
	},
	search: {
		name: "搜索",
		path: "/pages/index/search"
	},
	

    // 非权限路由
    index: {
        name: "首页",
        path: "/pages/index/index"
    },
	spellgroup: {
	    name: "拼团商城",
	    path: "/pages/index/spellgroup"
	},
	spell:{
	    name: "拼团商城",
	    path: "/pages/groupdetails/spell"
	},
	goodsDetails:{
	    name: "商城详情",
	    path: "/pages/goodsdetails/goodsDetails"
	},
	goodsGroup:{
	    name: "商城详情",
	    path: "/pages/goodsdetails/goodsGroup"
	},
	goodsSeconds:{
	    name: "商城详情",
	    path: "/pages/goodsdetails/goodsSeconds"
	},
	 confirmOrder:{
	    name: "确认订单",
	    path: "/pages/goodsdetails/confirmOrder"
	},
	pointConfirmOrder:{
	    name: "确认订单",
	    path: "/pages/goodsdetails/pointConfirmOrder"
	},
	submitOrders:{
	    name: "支付页",
	    path: "/pages/goodsdetails/submitOrders"
	},
	groupDetail:{
	    name: "拼团详情",
	    path: "/pages/own/group/groupDetail"
	},
	
//童********************************************************************	
	own: {
		name: "个人中心",
		path: "/pages/own/own",
	},
	check_acount: {
		name: "切换账号",
		path: "/pages/own/check_acount",
	},
	add_acount: {
		name: "新增账号",
		path: "/pages/own/add_acount",
	},
	my_collect: {
		name: "我的收藏",
		path: "/pages/own/my_collect",
	},
	my_order: {
		name: "我的订单",
		path: "/pages/own/my_order",
	},
	dd_detail: {
		name: "订单详情",
		path: "/pages/own/dd_detail",
	},
	score: {
		name: "我的积分",
		path: "/pages/own/score",
	},
	score_jl: {
		name: "积分商场兑换记录",
		path: "/pages/own/score_jl",
	},
	wallet: {
		name: "我的钱包",
		path: "/pages/own/wallet",
	},
	balance: {
		name: "商城余额",
		path: "/pages/own/balance",
	},
	recharge: {
		name: "充值",
		path: "/pages/own/recharge",
	},
	deposit: {
		name: "提现",
		path: "/pages/own/deposit",
	},
	notice: {
		name: "系统公告",
		path: "/pages/own/notice",
	},
	notice_detail: {
		name: "公告详情",
		path: "/pages/own/notice_detail",
	},
	address: {
		name: "收货地址",
		path: "/pages/own/address",
	},
	add_address: {
		name: "新增收货地址",
		path: "/pages/own/add_address",
	},
	bj_address: {
		name: "编辑收货地址",
		path: "/pages/own/bj_address",
	},
	dh_balance: {
		name: "余额兑换",
		path: "/pages/own/dh_balance",
	},
	customer: {
		name: "客服中心",
		path: "/pages/own/customer",
	},
	customer_detail: {
		name: "常见问题详情",
		path: "/pages/own/customer_detail",
	},
	code: {
		name: "分享码",
		path: "/pages/own/code",
	},
	agent_benefit: {
		name: "代理收益",
		path: "/pages/own/agent_benefit",
	},
	partaker: {
		name: "拼团记录",
		path: "/pages/own/partaker",
	},
	friends: {
		name: "我的好友",
		path: "/pages/own/friends",
	},
	friends_xf: {
		name: "好友消费明细",
		path: "/pages/own/friends_xf",
	},
	history: {
		name: "浏览记录",
		path: "/pages/own/history",
	},
	two: {
		name: "2人拼团",
		path: "/pages/own/group/two",
	},
	two_success: {
		name: "2人拼团成功",
		path: "/pages/own/group/two_success",
	},
	two_fail: {
		name: "2人拼团失败",
		path: "/pages/own/group/two_fail",
	},
	five: {
		name: "5人拼团",
		path: "/pages/own/group/five",
	},
	five_success: {
		name: "5人拼团成功",
		path: "/pages/own/group/five_success",
	},
	five_success2: {
		name: "5人拼团成功2",
		path: "/pages/own/group/five_success2",
	},
	five_fail: {
		name: "5人拼团失败",
		path: "/pages/own/group/five_fail",
	},
	seven: {
		name: "7人拼团",
		path: "/pages/own/group/seven",
	},
	seven_success: {
		name: "7人拼团成功",
		path: "/pages/own/group/seven_success",
	},
	seven_fail: {
		name: "7人拼团失败",
		path: "/pages/own/group/seven_fail",
	},
	seven_fail2: {
		name: "7人拼团失败2",
		path: "/pages/own/group/seven_fail2",
	},


	// 合伙人申请
	apply_partner: {
		name: "申请合伙人",
		path: "/pages/partner/apply_partner",
	},
	apply_partner2: {
		name: "申请合伙人",
		path: "/pages/partner/apply_partner2",
	},
	apply_rule: {
		name: "合伙人权益",
		path: "/pages/partner/apply_rule",
	},
	apply_check: {
		name: "合伙人审核",
		path: "/pages/partner/apply_check",
	},
	apply_check2: {
		name: "合伙人审核",
		path: "/pages/partner/apply_check2",
	},
	apply_no: {
		name: "审核拒绝",
		path: "/pages/partner/apply_no",
	},
	apply_agree: {
		name: "审核同意",
		path: "/pages/partner/apply_agree",
	},
	apply_spartner: {
		name: "申请市级合伙人",
		path: "/pages/partner/apply_spartner",
	},
	apply_spartner2: {
		name: "申请市级合伙人",
		path: "/pages/partner/apply_spartner2",
	},
	apply_spartner_agree: {
		name: "市级合伙人审核通过",
		path: "/pages/partner/apply_spartner_agree",
	},

	//设置
	set: {
		name: "设置",
		path: "/pages/set/set",
	},
	gy: {
		name: "关于平台",
		path: "/pages/set/gy",
	},
	feedback: {
		name: "意见反馈",
		path: "/pages/set/feedback",
	},
	info: {
		name: "个人资料",
		path: "/pages/set/info",
	},
	check_pwd: {
		name: "修改登录密码",
		path: "/pages/set/check_pwd",
	},
	check_phone: {
		name: "修改手机号",
		path: "/pages/set/check_phone",
	},
	check_paypwd: {
		name: "修改支付密码",
		path: "/pages/set/check_paypwd",
	},





	safe:{
		name: "安全中心",
		path: "/pages/set/safe",
	},


	//陈*********************************
	//获取分类
	store: {
		name: "商品分类",
		path: "/pages/index/store",
	},
	goodsDetails: {
		name: "商品分类",
		path: "/pages/goodsdetails/goodsDetails",
	},
	cart:{
		name: "购物车",
		path: "/pages/cart/cart",
	},
	shopping:{
		name: "积分商城",
		path: "/pages/index/shopping",
	},
	mallRules:{
		name: "积分规则",
		path: "/pages/mall/mallRules",
	},
	goods:{
		name: "积分规则",
		path: "/pages/goods/goods",
	},
	allgroup:{
		name: "拼团",
		path: "/pages/groupdetails/allgroup",
	},
	seventheRules:{
		name: "拼团规则",
		path: "/pages/theRules/seventheRules",
	},
	cateGoods:{
		name: "商品分类",
		path: "/pages/goods/cateGoods",
	},
}






