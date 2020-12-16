import Vue from 'vue'
import Vuex from 'vuex'
import $mConfig from '@/config/index.config.js'
import $mRoutesConfig from '@/config/routes.config.js'
import $mRouter from '@/common/router.js'

Vue.use(Vuex)


const TOKEN = uni.getStorageSync("token") || "";
const CHILDCODE = uni.getStorageSync('childCode') || ''
const USERINFO = uni.getStorageSync("userinfo") || {}
const hasLogin= uni.getStorageSync("hasLogin") || false;
const INVCODE = uni.getStorageSync("invcode") || ''; //推荐码
const store = new Vuex.Store({
	state: {
		token: TOKEN,
		addressId:0,
		hasLogin:hasLogin,
		childCode:CHILDCODE,
		userinfo:USERINFO,
		invcode:INVCODE
	},
	getters: {
		getToken: state => {
			return state.token;
		},
		getAddressId(state){
			return state.addressId;
		},
		hasLogin(state){
			return state.hasLogin;
		},
		getChildCode(state){
			return state.childCode
		},
		getUserinfo(state){
			return state.userinfo
		},
		getInvcode(state){
			return state.invcode
		}
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
			uni.setStorageSync('token', token)
		},
		SET_ADDRESS(state, addressId) {
			state.addressId = addressId;
		},
		SET_HASLOGIN(state, hasLogin) {
			state.hasLogin = hasLogin;
			uni.setStorageSync("hasLogin",hasLogin)
		},
		SET_CHILDCODE(state, childCode) {
			state.childCode = childCode;
			uni.setStorageSync('childCode', childCode)
		},
		SET_USERINFO(state, userinfo) {
			state.userinfo = userinfo;
			uni.setStorageSync('userinfo', userinfo)
		},
		SET_INVCODE(state, invcode) {
			state.invcode = invcode;
			uni.setStorageSync('invcode', invcode)
		},
	},
	actions: {

		// setAddress({commit},address){//收货地址页设置默认地址
		//           return new Promise((resolve, reject)=>{
		//               resolve(commit('SET_ADDRESS',address))
		//           })
		//       },
	}
})

export default store
