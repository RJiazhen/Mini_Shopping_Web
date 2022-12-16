"use strict";const e=require("../common/vendor.js"),s={namespaced:!0,state:()=>({address:JSON.parse(e.index.getStorageSync("address")||"{}"),token:e.index.getStorageSync("token")||"",userInfo:JSON.parse(e.index.getStorageSync("userInfo")||"{}"),redirectInfo:null}),mutations:{updateAddress(e,s){e.address=s,this.commit("m_user/saveAddressToStorage")},saveAddressToStorage(s){e.index.setStorageSync("address",JSON.stringify(s.address))},updateUserInfo(e,s){e.userInfo=s,this.commit("m_user/saveUserInfoToStorage")},saveUserInfoToStorage(s){e.index.setStorageSync("userInfo",JSON.stringify(s.userInfo))},updateToken(e,s){e.token=s,this.commit("m_user/saveTokenToStorage")},saveTokenToStorage(s){e.index.setStorageSync("token",s.token)},updataRedirectInfo(e,s){e.redirectInfo=s}},getters:{addStr(e){if(!e.address.provinceName)return"";return e.address.provinceName+e.address.cityName+e.address.countyName+e.address.detailInfo}}};exports.moduleUser=s;