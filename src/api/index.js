import http from "@/http/index"
import config from "@/config/index.config.js"
const api = {}

// 获取可视化装修页面配置详情
api.getBanner = (parmas) => http.post(`/api/base/common/get_banner`, parmas, true)
api.lists = (parmas) => http.post(`/api/base/product/lists`, parmas, false)
//商品 - 01-1、积分商品列表 
api.getScoreList = (parmas) => http.post(`/api/base/product/score_pro`, parmas, true)
//个人中心 - 01、发送短信验证码 
api.sendSms = (parmas) => http.post(`/api/base/member/sendSms`, parmas, false)
//个人中心 - 02、微信授权登录 
api.wxlogin = (parmas) => http.post(`/api/base/member/login`, parmas, false)
//个人中心 - 03、是否绑定了手机号 
api.checkTel = (parmas) => http.post(`/api/base/member/check_bond`, parmas, false)
//个人中心 - 04、绑定手机号 
api.bondTel = (parmas) => http.post(`/api/base/member/bond_phone`, parmas, false)
//个人中心 - 05、获取用户信息   
api.getUserInfo = (parmas) => http.post(`/api/base/member/get_info`, parmas, false)
//个人中心 - 13、判断是否设置支付密码
api.checkPayPwd = (parmas) => http.post(`/api/base/member/check_pay_pwd`, parmas, false)

//商品 - 02、商品详情 https://huopin.batmp.com/api/base/product/info
api.getProDetail = (parmas) => http.post(`/api/base/product/info`, parmas, false)

//订单 - 02、立即下单第一步 https://huopin.batmp.com/api/base/order/one
api.doOrderOne = (parmas) => http.post(`/api/base/order/one`, parmas, false)
//订单 - 03、创建订单
api.createOrder = (parmas) => http.post(`/api/base/order/createOrder`, parmas, false)
//支付 - 1、微信支付
api.wxpay = (parmas) => http.post(`/api/base/pay/wxpay`, parmas, false)
//支付 - 2、余额支付，钱包支付 
api.accoutPay = (parmas) => http.post(`/api/base/pay/balancePay`, parmas, false)

//通用 - 02、获取文档（用户协议）
api.getDocument = (parmas) => http.post(`/api/base/common/get_document`, parmas, false)

//收货地址 - 05、收货地址信息 
api.getAddrInfo = (parmas) => http.post(`/api/base/address/addressInfo`, parmas, false)
//拼团 - 01、两人，五人拼团列表  
api.getGroupList = (parmas) => http.post(`/api/base/group/lists`, parmas, false)
//拼团 - 02、拼团记录 
api.getMyGroupList = (parmas) => http.post(`/api/base/group/groupList`, parmas, false)
//拼团 - 02-7、7人团拼团记录  getSevenGroup 
api.getSevenGroup = (parmas) => http.post(`/api/base/group/sevenGroup`, parmas, false)
//拼团 - 03、拼团详情 
api.getMyGroupDetail = (parmas) => http.post(`/api/base/group/groupOrderInfo`, parmas, false)
//拼团 - 04、退出拼团or继续拼团 
api.groupAct = (parmas) => http.post(`/api/base/group/act`, parmas, false)
//购物车 - 02、购物车 
api.editCart = (parmas) => http.post(`/api/base/member_cart/edit`, parmas, false)
// 购物车 - 03、删除购物车
api.delCart = (parmas) => http.post(`/api/base/member_cart/del`, parmas, false)
//订单 - 01、购物车下单第一步  
api.cartOrderOne = (parmas) => http.post(`/api/base/order/cart`, parmas, false)
//订单 - 13、积分兑换 
api.scoreExchange = (parmas) => http.post(`/api/base/score/scoreExchange`, parmas, false)
//商品 - 03、评论列表 https://huopin.batmp.com/api/base/product/comment_list
api.getCommentList = (parmas) => http.post(`/api/base/product/comment_list`, parmas, false)
//通用 - 05、获取秒杀时段 https://huopin.batmp.com/api/base/common/speed_kill
api.getSkillTime = (parmas) => http.post(`/api/base/common/speed_kill`, parmas, false)
//拼团 - 05、检查拼团状态 
api.checkGroup = (parmas) => http.post(`/api/base/group/check_group`, parmas, false)









//童*************************************************************************
//通用  常见问题列表
api.question = (parmas) => http.post(`/api/base/common/question`, parmas, false)
//通用  常见问题详情
api.question_detail = (parmas) => http.post(`/api/base/common/detail`, parmas, false)
//通用   公告列表
api.gg_list = (parmas) => http.post(`/api/base/common/notice`, parmas, true)


//个人中心 - 06、设置支付密码 
api.check_pwd = (parmas) => http.post(`/api/base/member/set_pay_pwd`, parmas, false)
//个人中心 - 07、重置手机号码
api.check_phone = (parmas) => http.post(`/api/base/member/reset_phone`, parmas, false)
//个人中心 - 08、图片上传接口
api.upload_img = (parmas) => http.post(`/api/base/upload/base`, parmas, false)
//个人中心 - 09、意见反馈
api.feedback = (parmas) => http.post(`/api/base/common/service_back`, parmas, false)
//个人中心 - 09、修改用户信息
api.check_info = (parmas) => http.post(`/api/base/member/edit_info`, parmas, false)
//个人中心 - 10、我的足迹
api.foot = (parmas) => http.post(`/api/base/common/footprint`, parmas, false)
//个人中心 - 11、我的足迹-删除
api.foot_del = (parmas) => http.post(`/api/base/common/del_footprint`, parmas, false)
//个人中心 - 12、收货地址列表
api.adress = (parmas) => http.post(`/api/base/address/getList`, parmas, false)
//个人中心 - 13、编辑收货地址
api.bj_address = (parmas) => http.post(`/api/base/address/editAddr`, parmas, false)
//个人中心 - 13、添加收货地址
api.add_address = (parmas) => http.post(`/api/base/address/addAddr`, parmas, false)
//个人中心 - 14、删除收货地址
api.del_address = (parmas) => http.post(`/api/base/address/delAddr`, parmas, false)
//个人中心 - 15、我的收藏列表
api.collect_list = (parmas) => http.post(`/api/base/collect/collect_lists`, parmas, false)
//个人中心 - 16、获取订单
api.get_dd = (parmas) => http.post(`/api/base/order/my_order`, parmas, false)
//个人中心 - 17、取消订单
api.cancel_dd = (parmas) => http.post(`/api/base/order/cancel_order`, parmas, false)

//个人中心 - 18、订单详情
api.dd_detail = (parmas) => http.post(`/api/base/order/orderDetail`, parmas, false)
//个人中心 - 19、订单确认收货
api.sure_sh = (parmas) => http.post(`/api/base/order/confirmOrder`, parmas, false)
//个人中心 - 20、订单申请换货
api.dd_hh = (parmas) => http.post(`/api/base/order/applyExchange`, parmas, false)
//个人中心 - 21、订单申请退货
api.dd_th = (parmas) => http.post(`/api/base/order/applyReturn`, parmas, false)
//个人中心 - 22、订单评论
api.dd_pl = (parmas) => http.post(`/api/base/order/comment`, parmas, false)
//个人中心 - 23、删除订单
api.del_dd = (parmas) => http.post(`/api/base/order/del`, parmas, false)
//个人中心 - 24、订单立即退换货
api.th_now = (parmas) => http.post(`/api/base/order/send`, parmas, false)
//个人中心 - 25、新增子账号
api.add_acount = (parmas) => http.post(`/api/base/member/add_child`, parmas, false)
//个人中心 - 26、获取子账号
api.get_acount = (parmas) => http.post(`/api/base/member/get_child`, parmas, false)
//个人中心 - 27、删除子账号
api.del_acount = (parmas) => http.post(`/api/base/member/del_child`, parmas, false)
//个人中心 - 28、切换子账号
api.check_acount = (parmas) => http.post(`/api/base/member/set_child`, parmas, false)
//个人中心 - 29、积分兑换订单
api.jf_dd = (parmas) => http.post(`/api/base/score/scoreOrder`, parmas, false)
//个人中心 - 30、申请合伙人
api.apply = (parmas) => http.post(`/api/base/region_agent/apply`, parmas, false)
//个人中心 - 31、判断申请合伙人是否通过
api.get_apply = (parmas) => http.post(`/api/base/region_agent/get_apply`, parmas, false)
//个人中心 - 32、我的好友
api.myFriend = (parmas) => http.post(`/api/base/personal/myFriend`, parmas, false)
//个人中心 - 33、我的好友明细
api.myFriend_mx = (parmas) => http.post(`/api/base/personal/walletDetail`, parmas, false)
//个人中心 - 34、积分明细
api.jf_mx = (parmas) => http.post(`/api/base/score/score`, parmas, false)

//个人中心 - 35、小程序分享二维码
api.fxm = (parmas) => http.post(`/api/base/common/qrcodes`, parmas, false)
//个人中心 - 36、商城钱包-钱包明细
api.walletRecord = (parmas) => http.post(`/api/base/deposit/walletRecord`, parmas, false)
//个人中心 - 37、商城钱包-兑换商城余额
api.walletToBalance = (parmas) => http.post(`/api/base/deposit/walletToBalance`, parmas, false)
//个人中心 - 38、余额收支记录
api.balanceRecord = (parmas) => http.post(`/api/base/deposit/balanceRecord`, parmas, false)
//个人中心 - 39、余额提现记录
api.depositRecord = (parmas) => http.post(`/api/base/deposit/depositRecord`, parmas, false)
//个人中心 - 40、提现
api.deposit = (parmas) => http.post(`/api/base/deposit/deposit`, parmas, false)
//个人中心 - 41、充值
api.UnifiedRecharge = (parmas) => http.post(`/api/base/deposit/UnifiedRecharge`, parmas, false)
//个人中心 - 42 客服电话
api.getVal = (parmas) => http.post(`/api/base/common/getVal`, parmas, false)




//陈*************************************************************************
//获取商品列表
api.lists = (parmas) => http.post(`/api/base/product/lists`, parmas, true)

//获取分类
api.get_cate = (parmas) => http.post(`/api/base/common/get_cate`, parmas, false)

//获取商品详情
api.info = (parmas) => http.post(`/api/base/product/info`, parmas, false)

//获取商品收藏
api.collect = (parmas) => http.post(`/api/base/collect/collect`, parmas, false)

//积分商城
api.scoreExchange = (parmas) => http.post(`/api/base/score/scoreExchange`, parmas, false)
//活动抽奖 - 01、获取活动详情和奖品
api.getActivity = (parmas) => http.post(`/api/base/activity/get_activity`, parmas, false)
//获取抽奖的商品
api.go = (parmas) => http.post(`/api/base/activity/go`, parmas, true)

//完善抽奖地址详情
api.fill_address = (parmas) => http.post(`/api/base/activity/fill_address`, parmas, false)

///购物车列表
api.member_cart = (parmas) => http.post(`/api/base/member_cart/index`, parmas, false)

//购物车/api/base/member_cart/edit
api.edit = (parmas) => http.post(`/api/base/member_cart/edit`, parmas, false)

//我的消息列表
api.getMsgLists = (parmas) => http.post(`/api/base/system/getMsgLists`, parmas, false)

//我的代理收益
api.dailishouyi = (parmas) => http.post(`/api/base/personal/dailishouyi`, parmas, false)

//我的代理收益明细
api.dailiDetail = (parmas) => http.post(`/api/base/personal/dailiDetail`, parmas, false)

export default api