(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{152:function(t,e,n){var content=n(155);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(37).default)("2e7fdbb2",content,!0,{sourceMap:!1})},154:function(t,e,n){"use strict";var o=n(152);n.n(o).a},155:function(t,e,n){(t.exports=n(36)(!1)).push([t.i,".page-enter-active[data-v-15b98f7e],.page-leave-active[data-v-15b98f7e]{transition:opacity .5s}.page-enter[data-v-15b98f7e],.page-leave-active[data-v-15b98f7e]{opacity:0}.InfoPanel[data-v-15b98f7e]{position:absolute;bottom:24px;left:24px;max-width:640px;z-index:1}.InfoPanel.bg-white[data-v-15b98f7e]{color:rgba(0,0,0,.87)}.InfoPanel.bg-white .info-category[data-v-15b98f7e]{color:rgba(0,0,0,.54)}.InfoPanel.bg-white .back-button a[data-v-15b98f7e]{color:rgba(0,0,0,.87);border-color:rgba(0,0,0,.87)}.InfoPanel.bg-black[data-v-15b98f7e]{color:#fff}.InfoPanel.bg-black .info-category[data-v-15b98f7e]{color:hsla(0,0%,100%,.7)}.InfoPanel.bg-black .back-button a[data-v-15b98f7e]{color:#fff;border-color:#fff}.info-title[data-v-15b98f7e]{font-size:48px;letter-spacing:-2px}.info-category[data-v-15b98f7e]{font-size:12px;margin-bottom:16px}.info-date[data-v-15b98f7e],.info-desc[data-v-15b98f7e]{font-size:12px;margin-bottom:6px}.info-date[data-v-15b98f7e]{display:block}.back-button[data-v-15b98f7e]{z-index:1}.back-button a[data-v-15b98f7e]{font-size:14px;display:inline-block;padding:4px 16px;text-decoration:none;border:1px solid #fff;border-radius:16px}@media screen and (min-width:768px){.InfoPanel[data-v-15b98f7e]{bottom:24px;left:48px}.info-title[data-v-15b98f7e]{font-size:64px}.info-category[data-v-15b98f7e],.info-date[data-v-15b98f7e],.info-desc[data-v-15b98f7e]{font-size:14px}.info-date[data-v-15b98f7e]{display:block;margin-bottom:6px}}",""])},156:function(t,e,n){"use strict";var o={props:{article:{type:Object,default:function(){return{bg:"",title:"",desc:"",date:"",category:""}}}},mounted:function(){}},r=(n(154),n(18)),component=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"InfoPanel",class:"bg-"+t.article.bg},[n("h1",{staticClass:"info-title"},[t._v(t._s(t.article.title))]),t._v(" "),n("p",{staticClass:"info-desc"},[t._v(t._s(t.article.desc))]),t._v(" "),n("time",{staticClass:"info-date",attrs:{datetime:t.article.date}},[t._v("posted: "+t._s(t.article.date))]),t._v(" "),n("div",{staticClass:"info-category"},[t._v("#"+t._s(t.article.category))]),t._v(" "),n("div",{staticClass:"back-button"},[n("nuxt-link",{attrs:{to:"/"}},[t._v("← HOME")])],1)])},[],!1,null,"15b98f7e",null);e.a=component.exports},174:function(t,e,n){"use strict";var o=n(159),r=n(160),c=n(173),l=n(164),f=n(172),d=n(177),h=n(158),v=n(168),m=n(161);function w(t){v.a.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=h.fc,this.normalScale=new m.a(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}w.prototype=Object.create(v.a.prototype),w.prototype.constructor=w,w.prototype.isMeshNormalMaterial=!0,w.prototype.copy=function(source){return v.a.prototype.copy.call(this,source),this.bumpMap=source.bumpMap,this.bumpScale=source.bumpScale,this.normalMap=source.normalMap,this.normalMapType=source.normalMapType,this.normalScale.copy(source.normalScale),this.displacementMap=source.displacementMap,this.displacementScale=source.displacementScale,this.displacementBias=source.displacementBias,this.wireframe=source.wireframe,this.wireframeLinewidth=source.wireframeLinewidth,this.skinning=source.skinning,this.morphTargets=source.morphTargets,this.morphNormals=source.morphNormals,this};var x=n(169);n.d(e,"a",function(){return y});var y=function(){function t(){Object(o.a)(this,t),this.w=window.innerWidth,this.h=window.innerHeight,this.renderer=new c.a({canvas:document.querySelector("#threejs-canvas"),alpha:!0}),this.renderer.setSize(this.w,this.h),this.renderer.setPixelRatio(window.devicePixelRatio),this.camera=new l.a(60,this.w/this.h,1,10),this.camera.position.z=3,this.scene=new f.a;var e=new d.b(1,1,1),n=new w;this.mesh=new x.a(e,n),this.scene.add(this.mesh)}return Object(r.a)(t,[{key:"render",value:function(){var t=this;requestAnimationFrame(function(){t.render()});var e=performance.now()/1e3;this.mesh.rotation.y=e*(Math.PI/6),this.mesh.rotation.z=e*(Math.PI/6),this.renderer.render(this.scene,this.camera)}}]),t}()},182:function(t,e,n){var content=n(206);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(37).default)("3c61f6a4",content,!0,{sourceMap:!1})},205:function(t,e,n){"use strict";var o=n(182);n.n(o).a},206:function(t,e,n){(t.exports=n(36)(!1)).push([t.i,".page-enter-active[data-v-e333fbf0],.page-leave-active[data-v-e333fbf0]{transition:opacity .5s}.page-enter[data-v-e333fbf0],.page-leave-active[data-v-e333fbf0]{opacity:0}.canvas[data-v-e333fbf0]{position:absolute;top:0;left:0;width:100vw;height:100vh}",""])},290:function(t,e,n){"use strict";n.r(e);n(55);var o,r=n(7),c=n(156),l=n(174),f={components:{InfoPanel:c.a},data:function(){return{Canvas:l.a}},asyncData:(o=Object(r.a)(regeneratorRuntime.mark(function t(e){var o,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.params,t.next=3,n.e(24).then(n.t.bind(null,153,3));case 3:return r=t.sent,t.abrupt("return",{article:r[o.id]});case 5:case"end":return t.stop()}},t)})),function(t){return o.apply(this,arguments)}),mounted:function(){var t=new this.Canvas;window.console.log(t)}},d=(n(205),n(18)),component=Object(d.a)(f,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"threejs-child"},[e("InfoPanel",{attrs:{article:this.article}}),this._v(" "),e("canvas",{staticClass:"canvas",attrs:{id:"threejs-canvas"}})],1)},[],!1,null,"e333fbf0",null);e.default=component.exports}}]);