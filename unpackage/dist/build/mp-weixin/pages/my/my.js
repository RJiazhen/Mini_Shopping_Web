"use strict";const e=require("../../mixins/tabbar-badge.js"),n=require("../../common/vendor.js"),o={mixins:[e.badgeMix],data:()=>({}),computed:{...n.mapState("m_user",["token"])}};if(!Array){(n.resolveComponent("my-login")+n.resolveComponent("my-userinfo"))()}Math||((()=>"../../components/my-login/my-login.js")+(()=>"../../components/my-userinfo/my-userinfo.js"))();const r=n._export_sfc(o,[["render",function(e,o,r,t,s,m){return n.e({a:!e.token},(e.token,{}))}]]);wx.createPage(r);