!function(){var e=function(e){var t=null,n=[],i=!1;this.add=function(s){i?s.apply(e,t):n.push(s)},this.resolve=function(){if(!i){t=arguments,i=!0;for(var s=n.shift();s;)s.apply(e,arguments),s=n.shift();n=null}}};Object.extend=function(e,t){for(var n in t)t[n]&&t[n].constructor&&t[n].constructor===Object?(e[n]=e[n]||{},arguments.callee(e[n],t[n])):e[n]=t[n];return e};var t={"en-US":{error:{"no-backbone":"Backbone is not available: http://backbonejs.org/","no-jquery":"jQuery is not available: http://jquery.com/","no-jquery-three":"jQuery Three is required: http://github.com/makesites/jquery-three","no-backbone-app":"This function requires Backbone APP: http://github.com/makesites/backbone-app"}}};construct=function(e,t){e.libs&&Object.extend(construct.config,e.libs),t&&(construct.callback=t),require.config(construct.config),require(construct.config.deps,construct.init)},construct.init=function(){construct.promise.resolve();var e=new APP;window.app=e,Backbone.history.start(),construct.callback&&construct.callback(e)},construct.register=function(e){e&&e.update&&construct.loop.push(e.update)},construct.configure=function(e){construct.promise.add(e)},construct.lang=function(e){Object.extend(t,e)},construct.loop=[],construct.update=function(){},construct.log=function(e,n){if(e&&n){var i=navigator.language?navigator.language:navigator.userLanguage,s=t[i][e][n]||t["en-US"][e][n]||e+": "+n;console.log(s)}},construct.promise=new e,construct.config={paths:{jquery:["//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"],json3:["//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"],underscore:["//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"],handlebars:["//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"],"three-js":["//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"],"backbone.app":["//rawgithub.com/makesites/backbone-app/master/build/backbone.app"],"jquery.three":["//rawgithub.com/makesites/jquery-three/master/build/jquery.three"]},shim:{jquery:{deps:["json3"]},underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},"backbone.app":{deps:["backbone","underscore","jquery"]},"jquery.three":{deps:["jquery","three-js"]}},deps:["backbone.app","jquery.three","handlebars"]},construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={});var e=APP.Model||Backbone.Model,t=APP.Collection||Backbone.Collection;APP.Models.User=e.extend({defaults:{admin:!0}}),APP.Models.Asset=e.extend({defaults:{x:0,y:0,editable:!0}}),APP.Models.Mesh=e.extend({defaults:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]}}),APP.Collections.Users=t.extend({}),APP.Collections.Assets=t.extend({}),APP.Collections.Objects=Backbone.Model.extend({set:function(e){for(var t in e)this._setupObject(e[t]);return Backbone.Model.prototype.set.apply(this,arguments)},_setupObject:function(e){var t=this;e.state.rendered?this.trigger("find",e):e.on("render",function(){t.trigger("find",e)})}}),APP.Models.Layers=Backbone.Model.extend({set:function(e){for(var t in e){var n=e[t];n.on("find",_.bind(this.bubble,this))}return Backbone.Model.prototype.set.apply(this,arguments)},bubble:function(e){this.trigger("find",e)}})}),construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={}),APP.Model||Backbone.Model,APP.Collection||Backbone.Collection;var e=APP.View||Backbone.View;APP.Layout||Backbone.Layout,APP.Layers={},APP.Meshes={},APP.Sprites={},APP.Actors={},APP.Views.Main3D=APP.View.extend({el:".main",options:{renderTarget:"shadow-root"},initialize:function(e){return this.objects=new APP.Collections.Objects,this.layers=new APP.Models.Layers,this.$3d=$(this.el).three({watch:!0},_.bind(this._start,this)),$("body").on("update",this.el,_.bind(this._update,this)),this.objects.on("find",_.bind(this._find,this)),this.layers.on("find",_.bind(this._find,this)),APP.View.prototype.initialize.call(this,e)},start:function(){},update:function(){},_start:function(e){this.$3d=e,this.start(e)},_update:function(e){for(var t in this.objects.attributes)this.objects.get(t).trigger("update");for(var n in this.layers.attributes)this.layers.get(n).trigger("update");this.update(e)},_find:function(e){var t=$(e.el).find("[data-id]").length>0?$(e.el).find("[data-id]").attr("data-id"):$(e.el).attr("data-id");if(!_.isUndefined(t)){var n=this.$3d.get(t);e.object=n,e.trigger("start")}}}),APP.Mesh=e.extend({options:{speed:!1,bind:"sync"},state:{rendered:!1},initialize:function(t){return t=t||{},t.models?void 0:(this.data=this.data||t.data||this.model||new APP.Models.Mesh,this.on("update",_.bind(this._update,this)),this.on("start",_.bind(this._start,this)),e.prototype.initialize.apply(this,arguments))},start:function(){},_start:function(){var e=this.data.get("position"),t=APP.Models.Mesh.prototype.defaults.position;e!==t&&this.object.position.set(e[0],e[1],e[2]);var n=this.data.get("rotation"),i=APP.Models.Mesh.prototype.defaults.rotation;n!==i&&this.object.rotation.set(n[0],n[1],n[2]);var s=this.data.get("scale"),o=APP.Models.Mesh.prototype.defaults.scale;s!==o&&this.object.scale.set(s[0],s[1],s[2]),this.start()},_postRender:function(){return this.state.rendered=!0,this.trigger("render"),e.prototype._postRender.call(this)},_update:function(e){if(_.isUndefined(this.object))return this.trigger("render");if(this.options.speed&&this.object){var t=this.options.speed,n=this.object.position;t.x&&(n.x+=t.x),t.y&&(n.y+=t.y),t.z&&(n.z+=t.z),this.object.position.set(n.x,n.y,n.z)}this.update(e)},update:function(){},_validate:function(){return!0}}),APP.Meshes.Static=APP.Mesh.extend({}),APP.Meshes.Dynamic=APP.Meshes.Static.extend({}),APP.Meshes.Avatar=APP.Meshes.Dynamic.extend({}),APP.Meshes.NPC=APP.Meshes.Avatar.extend({}),APP.Meshes.Player=APP.Meshes.Avatar.extend({}),APP.Sprite=e.extend({}),APP.Sprites.Static=APP.Sprite.extend({}),APP.Sprites.Animated=APP.Sprite.extend({}),APP.Views.Asset=e.extend({}),APP.Layer=Backbone.Collection.extend({initialize:function(e,t){this.el=this.el||t.el||null,this.objects=[];for(var n=0;n<e.length;n++){e.get(n)||{};var i=new this.model({parentEl:this.el,renderTarget:this.el,append:!0});this._setupObject(i),this.objects.push(i)}return this.on("update",_.bind(this._update,this)),APP.Collection.prototype.initialize.call(this,null,t)},update:function(){},_update:function(e){for(var t in this.objects)this.objects[t].trigger("update");this.update(e)},_setupObject:function(e){var t=this;e.state.rendered&&this.trigger("find",e),e.on("render",function(){t.trigger("find",e)})}})}),construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={});var e=APP.Router||Backbone.Router;APP.Routers.Default=APP.Routers.Default||e.extend({initialize:function(t){return _.bindAll(this,"index"),this.data=new Backbone.Model,console.log("init","APP.Routers.Default"),e.prototype.initialize.call(this,t)},routes:{"":"index"},index:function(){console.log("Construct.js is running..."),_.isUndefined(APP.Main)||(this.main=new APP.Main({data:this.data}))}})})}();