;(function($){$.Plugin=(function(){var info={'id':'PluginJS','jQname':'pluginjs','version':'0.5.0'};var Plugin=function Plugin(options){if(!(this instanceof Plugin)){throw SyntaxError('Missing `new` construct');return this;}if(typeof options==='string'){options={el:options};}options=options||{};this.options=$.extend({},this.defaults,options.defaults);delete options.defaults;$.extend(this,options);this.$el=Plugin.bogusElement();this.setElement(this.el);if(typeof this.initialize==='function'){this.initialize.call(this);}return this;};$.extend(Plugin,{'version':info.version,'events':{'error':function(e,msg){Plugin.console.error(msg);}},'statics':{'id':null,'version':null,'jQname':null},'console':(function(){return console||{log:$.noop,debug:$.noop,error:$.noop}})(),'eventProxy':function(target,context){var e,i,alias,events=['on','off','one','trigger'],map={'on':'bind','off':'unbind'},jQ4=!context.on&&!!context.bind;for(i in events){alias=e=events[i];if(jQ4&&/^(on|off)$/.test(alias)){e=map[e];}if(events.hasOwnProperty(i)&&typeof context[e]==='function'){target[alias]=$.proxy(context[e],context);}}return target;},'bogusElement':function(){return $('<div/>').extend({bogus:true});},'extend':function(properties,statics){var Parent=this,P=Plugin;var Child=function Plugin(options){return P.apply(this,arguments);};$.extend(true,Child,$.extend({},P.statics),statics,{extend:Parent.extend});var Surrogate=function(){this.constructor=Child;};Surrogate.prototype=Parent.prototype;Child.prototype=new Surrogate;if(properties)$.extend(true,Child.prototype,properties,{parent:Parent});if(Child.jQfn!==false){$.fn[Child.jQfn||Child.jQname]=function(options){new Child($.extend(options,{el:this}));return this;};}return Child;}});$.extend(Plugin.prototype,{'setElement':function(element){if(!this.$el.bogus){this.undelegateEvents();this.trigger('reset');}var $el=element instanceof $?element:$(element);if(!$el.length){$el=Plugin.bogusElement().extend({selector:$el.selector});}this.$el=$el;this.el=$el[0];this.$=function(selector){return $el.find(selector);}
this.id=this.el.id||this.$el.attr({id:(Date.now()+1).toString(36)})[0].id;Plugin.eventProxy(this,this.$el);if(Plugin.events){this.delegateEvents(Plugin.events);}if(this.events){this.delegateEvents(this.events);}if(this.$el.bogus){this.trigger('error',['No matching elements were found on the page ('+element+')']);return this;}this.$el.data(this.constructor.jQdata||this.constructor.jQname,this);return this;},'delegateEvents':function(events){if(!(events||this.events))return this;this.undelegateEvents();for(var key in events){var method=events[key];if(typeof method!='function')method=this[events[key]];if(!method)continue;var match=key.match(/^(\S+)\s*(.*)$/);var eventName=match[1],selector=match[2];method=$.proxy(method,this);eventName+='.delegateEvents_'+this.id;if(selector===''){this.$el.on(eventName,method);}else{this.$el.on(eventName,selector,method);}}return this;},'undelegateEvents':function(){this.$el.off('.delegateEvents_'+this.id);return this;},render:function(){return this;}});return Plugin.extend({},info);})();})(jQuery);