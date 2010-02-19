AUI.add("aui-io-plugin",function(S){var O=S.Lang,P=O.isBoolean,Q=O.isString,T=function(A){return(A instanceof S.Node);},U=S.WidgetStdMod,C="Node",M="Widget",d="",D="failure",G="failureMessage",W="host",H="icon",I="io",E="IOPlugin",V="loading",F="loadingMask",c="node",Z="parseContent",K="queue",N="section",b="showLoading",Y="success",R="type",B="where",X=S.ClassNameManager.getClassName,J=X(H,V);function a(A){a.superclass.constructor.apply(this,arguments);}S.mix(a,{NAME:E,NS:I,ATTRS:{node:{value:null,setter:function(f){var A=this;if(!f){var e=A.get(W);var L=A.get(R);if(L==C){f=e;}else{if(L==M){var g=A.get(N);if(!e.getStdModNode(g)){e.setStdModContent(g,d);}f=e.getStdModNode(g);}}}return S.one(f);},validator:T},failureMessage:{value:"Failed to retrieve content",validator:Q},loadingMask:{value:{}},parseContent:{value:true,validator:P},showLoading:{value:true,validator:P},section:{value:U.BODY,validator:function(A){return(!A||A==U.BODY||A==U.HEADER||A==U.FOOTER);}},type:{readOnly:true,valueFn:function(){var A=this;var L=C;if(A.get(W) instanceof S.Widget){L=M;}return L;},validator:Q},where:{value:U.REPLACE,validator:function(A){return(!A||A==U.AFTER||A==U.BEFORE||A==U.REPLACE);}}}});S.extend(a,S.IORequest,{initializer:function(){var A=this;A.bindUI();},bindUI:function(){var A=this;A.on("activeChange",A._onActiveChange);A.on(Y,A._successHandler);A.on(D,A._failureHandler);if((A.get(R)==M)&&A.get(b)){var L=A.get(W);L.after("heightChange",A._syncLoadingMaskUI,A);L.after("widthChange",A._syncLoadingMaskUI,A);}},_afterInit:function(){var A=this;A._bindPlugins();a.superclass._afterInit.apply(this,arguments);},_bindPlugins:function(){var L=this;var f=L.get(c);if(f&&L.get(Z)){f.plug(S.Plugin.ParseContent);if(L.get(R)==M){var e=L.get(W);var A=f.ParseContent.get(K);if(A){e.on("close",function(g){if(A.isRunning()){g.halt();}});e.after("close",function(g){A.stop();});}}}},hideLoading:function(){var A=this;var L=A.get(c);if(L.loadingmask){L.loadingmask.hide();}},setContent:function(e){var A=this;var L=A.get(c);if(A.overlayMaskBoundingBox){A.overlayMaskBoundingBox.remove();}A._getContentSetterByType().apply(A,[e]);},showLoading:function(){var A=this;var L=A.get(c);if(L.loadingmask){if(A.overlayMaskBoundingBox){L.append(A.overlayMaskBoundingBox);}}else{L.plug(S.LoadingMask,A.get(F));A.overlayMaskBoundingBox=L.loadingmask.overlayMask.get("boundingBox");}L.loadingmask.show();},_getContentSetterByType:function(){var A=this;var L={Node:function(g){var e=this;var f=e.get(c);f.setContent.apply(f,[g]);},Widget:function(g){var e=this;var f=e.get(W);f.setStdModContent.apply(f,[e.get(N),g,e.get(B)]);}};return L[this.get(R)];},_syncLoadingMaskUI:function(){var A=this;A.get(c).loadingmask.refreshMask();},_successHandler:function(L,f,e){var A=this;A.setContent(e.responseText);},_failureHandler:function(L,f,e){var A=this;A.setContent(A.get(G));},_onActiveChange:function(e){var A=this;var L=A.get(b);if(e.newVal){if(L){A.showLoading();}}else{if(L){A.hideLoading();}}}});S.namespace("Plugin").IO=a;},"@VERSION@",{requires:["aui-component-overlay","aui-parse-content","aui-io-request","aui-loading-mask"],skinnable:false});