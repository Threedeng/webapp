// JavaScript Document
;(function(){
	var defaults={
		width:null,
		popupClass:null,
		boxId:"#a_popup_wrapper",
		shadowId:"#a_popup_shadow",
		closeId:"#a_delete",
		evt:"click",
		mButtonVal:["Yes","No"],
 	    button: []
	}
	function fPopup(element, Arguments, settings){
		this.init(element, Arguments,settings);
	}
	fPopup.prototype={
		init:function(element, Arguments, options){
			var This=this;
			this.opts=options;
			this.element=element;
			this.Arguments=Arguments;
			this.bindhide=null;
			this.cHtml=this.Arguments[0];
			if(typeof this.cHtml=="object"){
				this.cHtml.ajax ? this.ajaxUrl=this.cHtml.ajax : this.cHtml=$(this.Arguments[0]).clone().show();
			}
			if(Arguments.length<=0){
				return false;
			}
		    this.bindEvent();
		},
		bindEvent:function(){
			var This=this;
			this.winOnkeydown();
			$("body").delegate(this.opts.boxId,'click',function(event) {
			   event.stopPropagation();
			});
			if(this.element.length>0){
				$("body").undelegate(this.opts.evt,this.element.selector);
				$("body").delegate(this.element.selector,this.opts.evt,function(event){
					if(This.ajaxUrl){
						This.ajax();
						return false
					}
					This.show();
					return false;	
				});
			}
			$("body").undelegate("click",this.opts.closeId);
			$("body").delegate(this.opts.closeId,"click",function(event){
				This.popHide();
				return false;
			});
		},
		appendBtn:function(){
			var btnHtml=popClose=buttonClass=defClass="";
			$(this.opts.boxId+" .a_popup_login_box").hide();
			var mButtonVal=this.opts.mButtonVal;
			var aButton=this.opts.button;
			if((typeof aButton)=="object"){
				for(var i=0; i<aButton.length; i++){
					if(aButton[i].val){
						mButtonVal[i]=aButton[i].val;
					}
					if(i==0) defClass="a_popup_button_class"+i+" a_button_primary";
					if(i==1) defClass="a_popup_button_class"+i+" button_white";
					if(i>1)  defClass="a_popup_button_class"+i;
					if(aButton[i].buttonClass){
						defClass="a_popup_button_class"+i+" "+aButton[i].buttonClass;
					}
					if(aButton[i].callback==undefined){
						popClose='onclick="$.popup().close()"';
					}
					btnHtml+='<button '+popClose+' id="a_popup_button_id'+i+'" class="a_button '+defClass+'" value="'+mButtonVal[i]+'">'+mButtonVal[i]+'</button>';
					defClass=buttonClass=popClose="";
				}
			}
			if(btnHtml!=""){
				btnHtml='<div class="a_popup_line_btns" id="a_popup_line_btns">'+btnHtml+'</div>';
			}
			var contentBox=$(this.opts.boxId+" .a_popup_content_box");
			var patt1=/<.*\/.*>/g;
			if(typeof this.cHtml=="string" && !patt1.test(this.cHtml)){
			  	this.cHtml='<div class="a_popup_h2">'+this.cHtml+'</div>'
			}
			contentBox.append(this.cHtml);
			contentBox.append(btnHtml);
			this.bindCallback();
		},
		custom:function(){
			var This=this;
			var autoClose=this.element.attr("autoClose") || this.opts.autoClose;
			var noPadding=this.element.attr("noPadding");
			var buttonClose=this.element.attr("buttonClose");
			if(buttonClose || this.opts.buttonClose){
				$(this.opts.boxId+" #a_delete").hide();
			}
			if(noPadding || this.opts.noPadding){
				$(this.opts.boxId).css({"padding":"0"})
			}
			if(autoClose!=false){
				setTimeout(function(){
					this.bindhide=function(){
						This.popHide();
					}
					$("html").bind("click",this.bindhide);
				},10)
			}
			if(this.opts.width){
			   $(this.opts.boxId).css({"width":this.opts.width})
			};
		},
		popHide:function(){
			this.unbindCallback()
			$(this.opts.boxId+","+this.opts.shadowId).remove();
		},
		show:function(){
			this.appendHtml();
			this.appendBtn();
			this.custom();
			this.opts.position && this.ifPosition('absolute');
			this.opts.position || this.ifPosition();
			this.buttonCss();
		},
		ajax:function(){
			var This=this;
			this.appendHtml();
			$.ajax({
			   type: "get",
			   url: This.ajaxUrl,
			   success: function(msg){
			   	$(This.opts.boxId+" .a_popup_content_box").html(msg)
			   }
			});
			this.custom();
			this.ifPosition("absolute");
		},
		unbindCallback:function(){
			$('html').unbind("click",this.bindhide);
			for(var i=0; i<$(this.opts.boxId+" #a_popup_line_btns button").length; i++){
				var clickId="#a_popup_button_id"+i;
				$("body").undelegate(clickId,"click");
			};
		},
		bindCallback:function(){
			var Arg2=this.opts;
			if(Arg2==undefined) return false;
			if((typeof Arg2.button)=="object"){
				for(var i=0; i<Arg2.button.length; i++){
					if(Arg2.button[i].display=="none") continue;
					if(Arg2.button[i].callback){
						(function(){
							var vCallback=Arg2.button[i].callback;
							var clickId="#a_popup_button_id"+i;
							$("body").delegate(clickId,"click",function(){
							    vCallback();
							})
						})();
					}
				}
			}
		},
		winOnkeydown:function(){
			var This=this;
			$(document).bind("keydown",function(e){ 
				var e=window.event||e;
			    if(e.keyCode==27){
			    	This.popHide();
			    }; 
			});
		},
		buttonCss:function(){
			var w=0;
			for(var i=0; i<$(this.opts.boxId+" #a_popup_line_btns button").length; i++){
				var btnWidth=$(this.opts.boxId+" #a_popup_line_btns button").eq(i).outerWidth();
				if(w<btnWidth){
					w=btnWidth;
				}
			}
			$(this.opts.boxId+" #a_popup_line_btns button").css({"width":w+"px","padding":"0","text-align":"center"});
		},
		appendHtml:function(){
			var skinClass="a_popup_";

			if(this.element.attr("class")){
				skinClass+=this.element.attr("class").replace(".","").replace(" ","_");
			}
			if(this.opts.popupClass){
				skinClass+=" "+this.opts.popupClass;
			}
			var strVar = "<div id=\"a_popup_wrapper\" class=\"a_popup_wrapper "+skinClass+" \"><a id=\"a_delete\" class=\"a_delete\" href=\"\"><\/a><div class=\"a_popup_content_box zoomIn\"><\/div><\/div><div id=\"a_popup_shadow\" class=\"a_popup_shadow \"><\/div>";
			    $("body").append(strVar);
		},
		ifPosition:function(pAttribute){
			var dWidth=$(window).width();
			var dHeight=$(window).height();
			var popupBox=$(this.opts.boxId);
			var popupWidth=popupBox.outerWidth();
			var popupHeight=popupBox.outerHeight();
			if(dHeight<=popupHeight || pAttribute=="absolute"){
				var dTop= $(document).scrollTop()+dHeight*0.1;
				popupBox.css({"margin":"0","position":"absolute","top":dTop+"px","left":"50%","marginLeft":-parseInt(popupBox.outerWidth())/2+"px"});
				return false;
			}
			popupBox.css({"margin":"0","left":"50%","top":"50%","position":"fixed","marginTop":-parseInt(popupBox.outerHeight())/2+"px","marginLeft":-parseInt(popupBox.outerWidth())/2+"px"});
		}, 
		buttonClose:function(bool){
			this.element.attr({"closebutton":bool})
		},
		autoClose:function(bool){
			this.element.attr({"autoClose":bool})
		},
		noPadding:function(bool){
			this.element.attr({"noPadding":bool})
		},
		buttonClose:function(bool){
			this.element.attr({"buttonClose":bool})
		}
	}
	$.fn.popup = function(options) {
		var settings = $.extend(true, {}, defaults, arguments[1]);
	    var fpopup = new fPopup(this, arguments, settings);
		return fpopup;
	}
	$.extend({
	    popup:function(val,opt){
	    	if(val){
				$(defaults.boxId).html() && $.popup().close();
				var newPopup=$().popup(val,opt);
	    		val.ajax ? newPopup.ajax() : newPopup.show();
	    	}
	    	return {
		   //  	show:function(val){
					// var p=$().popup(val);
		   //  			p.show();
		   //  	},
		   		update:function(){
					$().popup().ifPosition();
				},
		    	close:function(){
			    	$().popup().popHide();
		    	},
		    	loadingShow:function(){
		    		var loadHtml='<div id="a_popup_loading" class="a_popup_loading"></div>';
		    		var popBox=$(defaults.boxId);
			    	$().popup().unbindCallback();
			    	$("null").popup().custom();
		    		popBox.append(loadHtml);
		    	},
		    	loadingHide:function(){
	    			var popBox=$(defaults.boxId);
		    		popBox.find("#a_popup_loading").hide();
	    			$(defaults.boxId+" .a_popup_content_box").css({"height":"auto"});
		    		$().popup().ifPosition("absolute");
		    	},
		    	content:function(data){
			    	$().popup().unbindCallback();
			    	$("null").popup().custom();
	       			$(defaults.boxId+" .a_popup_content_box div").first().remove();
	       			$(defaults.boxId+" .a_popup_content_box").html(data);
		    		$().popup().ifPosition();
		    	}
		    }
	    }
	});
})()