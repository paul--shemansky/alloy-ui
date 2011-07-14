AUI.add("aui-diagram-builder-base",function(ab){var R=ab.Lang,d=R.isArray,ao=R.isBoolean,K=R.isNumber,z=R.isObject,ar=R.isString,H=function(A){return(A instanceof ab.ArrayList);},P=function(A){return(A instanceof ab.Node);},C=function(A){return(A instanceof ab.AvailableField);},aC=ab.Array,T="add",k="addNode",aB="auto",L="availableField",O="availableFields",ay="availableFieldsDragConfig",al="base",s="boundingBox",av="builder",X="cancel",ap="clearfix",a="container",Z="content",u="contentBox",e="contentContainer",N="contentNode",D="createDocumentFragment",y="diagram",E="diagram-builder-base",Y="disk",o="draggable",ax="drop",ai="dropConfig",V="dropContainer",an="field",t="fields",n="fieldsContainer",am="height",p="helper",U="icon",v="iconClass",ah="id",ad="label",af="list",r="node",x="nodeSettings",aa="propertyList",aw="rendered",aj="save",q="settings",M="tab",b="tabs",f="tabview",F="tabView",J="toolbar",j="toolbarContainer",w=ab.getClassName,aA=" ",h=".",G="$",aD=w(y,av,al,ax,a),ak=w(y,av,al,Z,a),B=w(y,av,al,an),g=w(y,av,al,t,a),ae=w(y,av,al,an,o),c=w(y,av,al,an,U),S=w(y,av,al,an,ad),m=w(y,av,al,b,a),W=w(y,av,al,b,a,Z),ag=w(y,av,al,M,T),I=w(y,av,al,M,q),at=w(y,av,al,J,a),ac=w(p,ap),l=w(U),au=w(f,Z),az=w(f,af);var i=ab.Component.create({NAME:L,ATTRS:{draggable:{value:true,validator:ao},label:{validator:ar},iconClass:{validator:ar},id:{value:ab.guid(),setter:"_setId",validator:ar},node:{valueFn:function(aE){var A=this;if(!P(aE)){aE=ab.Node.create(ab.Lang.sub(A.FIELD_ITEM_TEMPLATE,{iconClass:A.get(v)}));aE.setData(L,A);}return aE;},validator:P,writeOnce:true},type:{value:r,validator:ar}},EXTENDS:ab.Base,prototype:{FIELD_ITEM_TEMPLATE:'<li class="'+B+'">'+'<span class="'+[l,c].join(aA)+' {iconClass}"></span>'+'<span class="'+S+'"></span>'+"</li>",initializer:function(){var A=this;var aE=A.get(r);A.after({draggableChange:A._afterDraggableChange,idChange:A._afterIdChange,labelChange:A._afterLabelChange});A.labelNode=aE.one(h+S);A._uiSetDraggable(A.get(o));A._uiSetId(A.get(ah));A._uiSetLabel(A.get(ad));},_afterDraggableChange:function(aE){var A=this;A._uiSetDraggable(aE.newVal);},_afterIdChange:function(aE){var A=this;A._uiSetId(aE.newVal);},_afterLabelChange:function(aE){var A=this;A._uiSetLabel(aE.newVal);},_setId:function(A){return ab.AvailableField.buildNodeId(A);},_uiSetDraggable:function(aE){var A=this;A.get(r).toggleClass(ae,aE);},_uiSetLabel:function(aE){var A=this;A.labelNode.setContent(aE);},_uiSetId:function(aE){var A=this;A.get(r).set(ah,aE);}}});i.buildNodeId=function(A){return O+G+an+G+A;};ab.AvailableField=i;var Q=function(){};Q.ATTRS={fields:{value:[],setter:"_setFields",validator:function(A){return d(A)||H(A);}}};ab.mix(Q.prototype,{createFields:function(aF){var aE=this;var A=[];aC.each(aF,function(aG){A.push(aE.createField(aG));});return new ab.ArrayList(A);},addField:function(aE){var A=this;A._updateFields(A.get(t).add(A.createField(aE)));},removeField:function(aE){var A=this;A._updateFields(A.get(t).remove(aE));},_updateFields:function(aE){var A=this;A.set(t,aE);},_setFields:function(aE){var A=this;if(H(aE)){return aE;}else{return A.createFields(aE);}},createField:function(A){return A;}});ab.FieldSupport=Q;var aq=ab.Component.create({NAME:E,ATTRS:{availableFields:{setter:"_setAvailableFields",validator:d},contentContainer:{valueFn:function(){return ab.Node.create(this.CONTENT_CONTAINER_TEMPLATE);}},dropContainer:{valueFn:function(){return ab.Node.create(this.DROP_CONTAINER_TEMPLATE);}},dropConfig:{value:null,setter:"_setDropConfig",validator:z},availableFieldsDragConfig:{value:null,setter:"_setAvailableFieldsDragConfig",validator:z},fieldsContainer:{valueFn:function(){return ab.Node.create(this.FIELDS_CONTAINER_TEMPLATE);}},propertyList:{setter:"_setPropertyList",validator:z,value:null},strings:{value:{addNode:"Add node",cancel:"Cancel",nodeSettings:"Node settings",propertyName:"Property Name",save:"Save",value:"Value"}},tabView:{setter:"_setTabView",validator:z,value:null,writeOnce:true},toolbar:{setter:"_setToolbar",validator:z,value:null},toolbarContainer:{valueFn:function(){return ab.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);}}},HTML_PARSER:{contentContainer:h+ak,dropContainer:h+aD,fieldsContainer:h+g,toolbarContainer:h+at},UI_ATTRS:[O,t],AUGMENTS:[ab.FieldSupport],prototype:{CONTENT_CONTAINER_TEMPLATE:'<div class="'+ak+'"></div>',DROP_CONTAINER_TEMPLATE:'<div class="'+aD+'"></div>',TOOLBAR_CONTAINER_TEMPLATE:'<div class="'+at+'"></div>',FIELDS_CONTAINER_TEMPLATE:'<ul class="'+g+'"></ul>',fieldsNode:null,propertyList:null,settingsNode:null,tabView:null,toolbar:null,initializer:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn}});A.after({render:A._afterRender});A.after(A._afterUiSetHeight,A,"_uiSetHeight");A.contentContainer=A.get(e);A.dropContainer=A.get(V);A.fieldsContainer=A.get(n);A.toolbarContainer=A.get(j);},isAvailableFieldsDrag:function(aF){var A=this;var aE=A.availableFieldsDrag;return(aF===aE.dd);},plotFields:function(A){},renderUI:function(){var A=this;A._renderTabs();A._renderContentContainer();A._uiSetAvailableFields(A.get(O));},syncUI:function(){var A=this;var aE=A.get(u);A._setupDrop();A._setupAvailableFieldsDrag();aE.addClass(ac);},_afterActiveTabChange:function(aF){var A=this;var aE=aF.newVal.get(N);if(A.get(aw)&&(aE===A.settingsNode)){A._renderSettings();}},_afterRender:function(aE){var A=this;A.plotFields();},_afterUiSetHeight:function(aE){var A=this;A.dropContainer.setStyle(am,K(aE)?aE+A.DEF_UNIT:aE);},_defCancelFn:function(aE){var A=this;A.tabView.selectTab(0);},_handleCancelEvent:function(){var A=this;A.fire(X);},_handleSaveEvent:function(){var A=this;A.fire(aj);},_renderContentContainer:function(){var A=this;var aE=A.get(u);var aF=A.contentContainer;aF.appendChild(A.dropContainer);aE.appendChild(aF);},_renderPropertyList:function(){var A=this;if(!A.propertyList){A.propertyList=new ab.PropertyList(A.get(aa)).render(A.settingsNode);A.propertyList.get(s).unselectable();}},_renderSettings:function(){var A=this;A._renderPropertyList();A._renderToolbar();
},_renderTabs:function(){var A=this;if(!A.tabView){var aE=new ab.TabView(A.get(F));A.tabView=aE;A.fieldsNode=aE.getTab(0).get(N);A.settingsNode=aE.getTab(1).get(N);}},_renderToolbar:function(){var A=this;if(!A.toolbar){A.toolbar=new ab.Toolbar(A.get(J)).render(A.settingsNode);}},_setupDrop:function(){var A=this;A.drop=new ab.DD.Drop(A.get(ai));},_setupAvailableFieldsDrag:function(){var A=this;A.availableFieldsDrag=new ab.DD.Delegate(A.get(ay));},_setAvailableFields:function(aF){var aE=this;var A=[];aC.each(aF,function(aH,aG){A.push(C(aH)?aH:new ab.AvailableField(aH));});return A;},_setDropConfig:function(aE){var A=this;return ab.merge({bubbleTargets:A,node:A.dropContainer},aE||{});},_setAvailableFieldsDragConfig:function(aE){var A=this;return ab.merge({bubbleTargets:A,container:A.get(s),dragConfig:{plugins:[{cfg:{moveOnEnd:false},fn:ab.Plugin.DDProxy}]},nodes:h+ae},aE||{});},_setPropertyList:function(aE){var A=this;return ab.merge({bubbleTargets:A,width:250,scroll:{height:400,width:aB}},aE);},_setTabView:function(aH){var aE=this;var aG=aE.get(s);var aI=aG.one(h+az);var aF={after:{activeTabChange:ab.bind(aE._afterActiveTabChange,aE)},boundingBox:aG.one(h+m),contentBox:aG.one(h+W),bubbleTargets:aE,contentNode:aG.one(h+au),cssClass:m,listNode:aI,render:aE.get(u)};if(!aI){var A=aE.getStrings();aF.items=[{cssClass:ag,label:A[k]},{cssClass:I,label:A[x]}];}return ab.merge(aF,aH);},_setToolbar:function(aF){var aE=this;var A=aE.getStrings();return ab.merge({activeState:false,bubbleTargets:aE,children:[{handler:ab.bind(aE._handleSaveEvent,aE),label:A[aj],icon:Y},{handler:ab.bind(aE._handleCancelEvent,aE),label:A[X]}]},aF);},_uiSetAvailableFields:function(aG){var A=this;var aF=A.fieldsNode;if(aF){var aE=ab.getDoc().invoke(D);aC.each(aG,function(aH){aE.appendChild(aH.get(r));});aF.setContent(A.fieldsContainer.setContent(aE));}},_uiSetFields:function(aE){var A=this;if(A.get(aw)){A.plotFields();}}}});ab.DiagramBuilderBase=aq;},"@VERSION@",{requires:["aui-tabs","aui-property-list","collection","dd"],skinnable:true});AUI.add("aui-diagram-builder-impl",function(h){var K=h.Lang,u=K.isArray,E=K.isObject,e=K.isString,o=h.Array,y=function(A){return(A instanceof h.DiagramBuilderBase);},p=function(A){return(A instanceof h.DiagramNode);},n=function(A,N){var M=u(N)?N:N.getXY();var O=u(A)?A:A.getXY();return o.map(O,function(Q,P){return Math.max(0,Q-M[P]);});},B="availableField",I="boundingBox",L="builder",g="data",t="dblclick",a="description",C="diagram",d="diagram-builder",v="diagram-node",c="dragNode",b="editing",x="fields",s="fieldsDragConfig",z="name",J="node",f="parentNode",i="records",D="recordset",G="rendered",j="type",k="xy",r=".",q="",w=h.getClassName,l=w(C,J,b),F=w(C,J);var m=h.Component.create({NAME:d,ATTRS:{fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:E}},EXTENDS:h.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{editNode:null,initializer:function(){var A=this;A.on({cancel:A._onCancel,"drag:end":A._onDragEnd,"drop:hit":A._onDropHit,save:A._onSave});A.dropContainer.delegate(t,h.bind(A._onNodeEdit,A),r+F);},syncUI:function(){var A=this;h.DiagramBuilder.superclass.syncUI.apply(this,arguments);A._setupFieldsDrag();},createField:function(M){var A=this;if(!p(M)){M=new (A.getFieldClass(M.type||J))(M);}M.set(L,A);return M;},getFieldClass:function(N){var A=this;var M=h.DiagramBuilder.types[N];if(M){return M;}else{h.log("The field type: ["+N+"] couldn't be found.");return null;}},isFieldsDrag:function(N){var A=this;var M=A.fieldsDrag;return(N===M.dd);},plotFields:function(){var M=this;var A=M.get(x);A.each(function(N){M.plotField(N);});},plotField:function(M){var A=this;if(!M.get(G)){M.render(A.dropContainer);}},startEditingNode:function(M){var A=this;if(M){A.stopEditingNode();A.tabView.selectTab(h.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(D,M.getProperties());M.get(I).addClass(l);A.editNode=M;}},stopEditingNode:function(N){var A=this;var M=N||A.editNode;if(M){A.tabView.selectTab(h.DiagramBuilder.FIELDS_TAB);M.get(I).removeClass(l);A.editNode=null;}},_onCancel:function(M){var A=this;A.stopEditingNode();},_onDragEnd:function(N){var A=this;var M=N.target;if(A.isFieldsDrag(M)){var O=h.Widget.getByNode(M.get(c));O.set(k,O.getLeftTop());}},_onDropHit:function(N){var A=this;var M=N.drag;if(A.isAvailableFieldsDrag(M)){var O=M.get(J).getData(B);A.addField({xy:n(M.lastXY,A.dropContainer),type:O.get(j)});}},_onNodeEdit:function(M){var A=this;var N=h.Widget.getByNode(M.currentTarget);if(N){A.startEditingNode(N);}},_onSave:function(N){var A=this;var M=A.editNode;var O=A.propertyList.get(D);if(M){o.each(O.get(i),function(P){var Q=P.get(g);M.set(Q.attributeName,Q.value);});A.stopEditingNode(M);}},_setFieldsDragConfig:function(N){var A=this;var M=A.dropContainer;return h.merge({bubbleTargets:A,container:M,dragConfig:{plugins:[{cfg:{constrain:M},fn:h.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:h.Plugin.DDWinScroll}]},nodes:r+F},N||{});},_setupFieldsDrag:function(){var A=this;A.fieldsDrag=new h.DD.Delegate(A.get(s));}}});h.DiagramBuilder=m;h.DiagramBuilder.types={};var H=h.Component.create({NAME:v,ATTRS:{builder:{validator:y},description:{value:q,validator:e},height:{value:100},name:{valueFn:function(){var A=this;return A.get(j)+(++h.Env._uidx);},validator:e},strings:{value:{description:"Description",name:"Name",type:"Type"}},type:{value:J,validator:e},width:{value:200}},EXTENDS:h.Overlay,prototype:{getLeftTop:function(){var A=this;return n(A.get(I),A._getContainer());},getProperties:function(){var A=this;var M=A.getPropertyModel();o.each(M,function(N){N.value=A.get(N.attributeName);});return M;},getPropertyModel:function(){var M=this;var A=M.getStrings();return[{attributeName:a,editor:new h.TextAreaCellEditor(),name:A[a]},{attributeName:z,editor:new h.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[z]},{attributeName:j,editor:false,name:A[j]}];},_getContainer:function(){var A=this;return(A.get(L).dropContainer||A.get(I).get(f));},_uiSetXY:function(N){var A=this;var M=A._getContainer().getXY();
this._posNode.setXY([N[0]+M[0],N[1]+M[1]]);}}});H.buildNodeId=function(A){return v+_DOLLAR+FIELD+_DOLLAR+A;};h.DiagramNode=H;h.DiagramBuilder.types["node"]=h.DiagramNode;},"@VERSION@",{requires:["aui-diagram-builder-base","overlay"],skinnable:true});AUI.add("aui-diagram-builder",function(a){},"@VERSION@",{use:["aui-diagram-builder-base","aui-diagram-builder-impl"],skinnable:true});