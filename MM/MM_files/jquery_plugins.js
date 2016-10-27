//jquery.textarearesizer.compressed.js
(function($){var textarea,staticOffset;var iLastMousePos=0;var iMin=32;var grip;$.fn.TextAreaResizer=function(){return this.each(function(){textarea=$(this).addClass('processed'),staticOffset=null;$(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').bind("mousedown",{el:this},startDrag));var grippie=$('div.grippie',$(this).parent())[0];grippie.style.marginRight=(grippie.offsetWidth-$(this)[0].offsetWidth)+'px'})};function startDrag(e){textarea=$(e.data.el);textarea.blur();iLastMousePos=mousePosition(e).y;staticOffset=textarea.height()-iLastMousePos;textarea.css('opacity',0.25);$(document).mousemove(performDrag).mouseup(endDrag);return false}function performDrag(e){var iThisMousePos=mousePosition(e).y;var iMousePos=staticOffset+iThisMousePos;if(iLastMousePos>=(iThisMousePos)){iMousePos-=5}iLastMousePos=iThisMousePos;iMousePos=Math.max(iMin,iMousePos);textarea.height(iMousePos+'px');if(iMousePos<iMin){endDrag(e)}return false}function endDrag(e){$(document).unbind('mousemove',performDrag).unbind('mouseup',endDrag);textarea.css('opacity',1);textarea.focus();textarea=null;staticOffset=null;iLastMousePos=0}function mousePosition(e){return{x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop}}})(jQuery);

//jquery-powerFloat-min.js
(function(a){a.fn.powerFloat=function(d){return a(this).each(function(){var e=a.extend({},b,d||{});var f=function(h,g){if(c.target&&c.target.css("display")!=="none"){c.targetClear()}c.s=h;c.trigger=g};switch(e.eventType){case"hover":a(this).hover(function(){f(e,a(this));var h=parseInt(e.showDelay,10),g;if(h){if(g){clearTimeout(g)}g=setTimeout(function(){c.targetGet()},h)}else{c.targetGet()}},function(){c.flagDisplay=false;c.targetHold();if(e.hoverHold){setTimeout(function(){c.displayDetect()},200)}else{c.displayDetect()}});if(e.hoverFollow){a(this).mousemove(function(g){c.cacheData.left=g.pageX;c.cacheData.top=g.pageY;c.targetGet();return false})}break;case"click":a(this).click(function(g){if(c.flagDisplay&&g.target===c.trigger.get(0)){c.flagDisplay=false;c.displayDetect()}else{f(e,a(this));c.targetGet();if(!a(document).data("mouseupBind")){a(document).bind("mouseup",function(i){var h=false;a(i.target).parents().each(function(){if(c.target&&a(this).attr("id")==c.target.attr("id")){h=true}});if(e.eventType==="click"&&c.flagDisplay&&i.target!=c.trigger.get(0)&&!h){c.flagDisplay=false;c.displayDetect()}return false}).data("mouseupBind",true)}}});break;case"focus":a(this).focus(function(){var g=a(this);setTimeout(function(){f(e,g);c.targetGet()},200)}).blur(function(){c.flagDisplay=false;setTimeout(function(){c.displayDetect()},190)});break;default:f(e,a(this));c.targetGet();a(document).unbind("mouseup")}})};var c={targetGet:function(){if(!this.trigger){return this}var h=this.trigger.attr(this.s.targetAttr),g=this.s.target;switch(this.s.targetMode){case"common":if(g){var i=typeof(g);if(i==="object"){if(g.size()){c.target=g.eq(0)}}else{if(i==="string"){if(a(g).size()){c.target=a(g).eq(0)}}}}else{if(h&&a("#"+h).size()){c.target=a("#"+h)}}if(c.target){c.targetShow()}else{return this}break;case"ajax":var d=g||h;this.targetProtect=false;if(/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(d)){if(c.cacheData[d]){c.target=a(c.cacheData[d]);c.targetShow()}else{var f=new Image();c.loading();f.onload=function(){var m=f.width,q=f.height;var p=a(window).width(),s=a(window).height();var r=m/q,o=p/s;if(r>o){if(m>p/2){m=p/2;q=m/r}}else{if(q>s/2){q=s/2;m=q*r}}var n='<img class="float_ajax_image" src="'+d+'" width="'+m+'" height = "'+q+'" />';c.cacheData[d]=n;c.target=a(n);c.targetShow()};f.onerror=function(){c.target=a('<div class="float_ajax_error">图片加载失败。</div>');c.targetShow()};f.src=d}}else{if(d){if(c.cacheData[d]){c.target=a('<div class="float_ajax_data">'+c.cacheData[d]+"</div>");c.targetShow()}else{c.loading();a.ajax({url:d,success:function(m){if(typeof(m)==="string"){c.target=a('<div class="float_ajax_data">'+m+"</div>");c.targetShow();c.cacheData[d]=m}},error:function(){c.target=a('<div class="float_ajax_error">数据没有加载成功。</div>');c.targetShow()}})}}}break;case"list":var k='<ul class="float_list_ul">',j;if(a.isArray(g)&&(j=g.length)){a.each(g,function(n,p){var o="",r="",q,m;if(n===0){r=' class="float_list_li_first"'}if(n===j-1){r=' class="float_list_li_last"'}if(typeof(p)==="object"&&(q=p.text.toString())){if(m=(p.href||"javascript:")){o='<a href="'+m+'" class="float_list_a">'+q+"</a>"}else{o=q}}else{if(typeof(p)==="string"&&p){o=p}}if(o){k+="<li"+r+">"+o+"</li>"}})}else{k+='<li class="float_list_null">列表无数据。</li>'}k+="</ul>";c.target=a(k);this.targetProtect=false;c.targetShow();break;case"remind":var l=g||h;this.targetProtect=false;if(typeof(l)==="string"){c.target=a("<span>"+l+"</span>");c.targetShow()}break;default:var e=g||h,i=typeof(e);if(e){if(i==="string"){if(/<.*>/.test(e)){c.target=a("<div>"+e+"</div>");this.targetProtect=false}else{if(a(e).size()){c.target=a(e).eq(0);this.targetProtect=true}else{if(a("#"+e).size()){c.target=a("#"+e).eq(0);this.targetProtect=true}else{c.target=a("<div>"+e+"</div>");this.targetProtect=false}}}c.targetShow()}else{if(i==="object"){if(!a.isArray(e)&&e.size()){c.target=e.eq(0);this.targetProtect=true;c.targetShow()}}}}}return this},container:function(){var d=this.s.container,e=this.s.targetMode||"mode";if(e==="ajax"||e==="remind"){this.s.sharpAngle=true}else{this.s.sharpAngle=false}if(this.s.reverseSharp){this.s.sharpAngle=!this.s.sharpAngle}if(e!=="common"){if(d===null){d="plugin"}if(d==="plugin"){if(!a("#floatBox_"+e).size()){a('<div id="floatBox_'+e+'" class="float_'+e+'_box"></div>').appendTo(a("body")).hide()}d=a("#floatBox_"+e)}if(d&&typeof(d)!=="string"&&d.size()){if(this.targetProtect){c.target.show().css("position","static")}c.target=d.empty().append(c.target)}}return this},setWidth:function(){var d=this.s.width;if(d==="auto"){if(this.target.get(0).style.width){this.target.css("width","auto")}}else{if(d==="inherit"){this.target.width(this.trigger.width())}else{this.target.css("width",d)}}return this},position:function(){var h,x=0,k=0,m=0,y=0,s,o,e,E,u,q,f=this.target.data("height"),C=this.target.data("width"),r=a(window).scrollTop(),B=parseInt(this.s.offsets.x,10)||0,A=parseInt(this.s.offsets.y,10)||0,w=this.cacheData;if(!f){f=this.target.outerHeight();if(this.s.hoverFollow){this.target.data("height",f)}}if(!C){C=this.target.outerWidth();if(this.s.hoverFollow){this.target.data("width",C)}}h=this.trigger.offset();x=this.trigger.outerHeight();k=this.trigger.outerWidth();s=h.left;o=h.top;var l=function(){if(s<0){s=0}else{if(s+x>a(window).width()){s=a(window).width()=x}}},i=function(){if(o<0){o=0}else{if(o+x>a(document).height()){o=a(document).height()-x}}};if(this.s.hoverFollow&&w.left&&w.top){if(this.s.hoverFollow==="x"){s=w.left;l()}else{if(this.s.hoverFollow==="y"){o=w.top;i()}else{s=w.left;o=w.top;l();i()}}}var g=["4-1","1-4","5-7","2-3","2-1","6-8","3-4","4-3","8-6","1-2","7-5","3-2"],v=this.s.position,d=false,j;a.each(g,function(F,G){if(G===v){d=true;return}});if(!d){v="4-1"}var D=function(F){var G="bottom";switch(F){case"1-4":case"5-7":case"2-3":G="top";break;case"2-1":case"6-8":case"3-4":G="right";break;case"1-2":case"8-6":case"4-3":G="left";break;case"4-1":case"7-5":case"3-2":G="bottom";break}return G};var n=function(F){if(F==="5-7"||F==="6-8"||F==="8-6"||F==="7-5"){return true}return false};var t=function(H){var I=0,F=0,G=(c.s.sharpAngle&&c.corner)?true:false;if(H==="right"){F=s+k+C+B;if(G){F+=c.corner.width()}if(F>a(window).width()){return false}}else{if(H==="bottom"){I=o+x+f+A;if(G){I+=c.corner.height()}if(I>r+a(window).height()){return false}}else{if(H==="top"){I=f+A;if(G){I+=c.corner.height()}if(I>o-r){return false}}else{if(H==="left"){F=C+B;if(G){F+=c.corner.width()}if(F>s){return false}}}}}return true};j=D(v);if(this.s.sharpAngle){this.createSharp(j)}if(this.s.edgeAdjust){if(t(j)){(function(){if(n(v)){return}var G={top:{right:"2-3",left:"1-4"},right:{top:"2-1",bottom:"3-4"},bottom:{right:"3-2",left:"4-1"},left:{top:"1-2",bottom:"4-3"}};var H=G[j],F;if(H){for(F in H){if(!t(F)){v=H[F]}}}})()}else{(function(){if(n(v)){var G={"5-7":"7-5","7-5":"5-7","6-8":"8-6","8-6":"6-8"};v=G[v]}else{var H={top:{left:"3-2",right:"4-1"},right:{bottom:"1-2",top:"4-3"},bottom:{left:"2-3",right:"1-4"},left:{bottom:"2-1",top:"3-4"}};var I=H[j],F=[];for(name in I){F.push(name)}if(t(F[0])||!t(F[1])){v=I[F[0]]}else{v=I[F[1]]}}})()}}var z=D(v),p=v.split("-")[0];if(this.s.sharpAngle){this.createSharp(z);m=this.corner.width(),y=this.corner.height()}if(this.s.hoverFollow){if(this.s.hoverFollow==="x"){e=s+B;if(p==="1"||p==="8"||p==="4"){e=s-(C-k)/2+B}else{e=s-(C-k)+B}if(p==="1"||p==="5"||p==="2"){E=o-A-f-y;q=o-y-A-1}else{E=o+x+A+y;q=o+x+A+1}u=h.left-(m-k)/2}else{if(this.s.hoverFollow==="y"){if(p==="1"||p==="5"||p==="2"){E=o-(f-x)/2+A}else{E=o-(f-x)+A}if(p==="1"||p==="8"||p==="4"){e=s-C-B-m;u=s-m-B-1}else{e=s+k-B+m;u=s+k+B+1}q=h.top-(y-x)/2}else{e=s+B;E=o+A}}}else{switch(z){case"top":E=o-A-f-y;if(p=="1"){e=s-B}else{if(p==="5"){e=s-(C-k)/2-B}else{e=s-(C-k)-B}}q=o-y-A-1;u=s-(m-k)/2;break;case"right":e=s+k+B+m;if(p=="2"){E=o+A}else{if(p==="6"){E=o-(f-x)/2+A}else{E=o-(f-x)+A}}u=s+k+B+1;q=o-(y-x)/2;break;case"bottom":E=o+x+A+y;if(p=="4"){e=s+B}else{if(p==="7"){e=s-(C-k)/2+B}else{e=s-(C-k)+B}}q=o+x+A+1;u=s-(m-k)/2;break;case"left":e=s-C-B-m;if(p=="2"){E=o-A}else{if(p==="6"){E=o-(C-k)/2-A}else{E=o-(f-x)-A}}u=e+m;q=o-(C-m)/2;break}}if(y&&m&&this.corner){this.corner.css({left:u,top:q,zIndex:this.s.zIndex+1})}this.target.css({position:"absolute",left:e,top:E,zIndex:this.s.zIndex});return this},createSharp:function(g){var j,k,f="",d="";var i={left:"right",right:"left",bottom:"top",top:"bottom"},e=i[g]||"top";if(this.target){j=this.target.css("background-color");if(parseInt(this.target.css("border-"+e+"-width"))>0){k=this.target.css("border-"+e+"-color")}if(k&&k!=="transparent"){f='style="color:'+k+';"'}else{f='style="display:none;"'}if(j&&j!=="transparent"){d='style="color:'+j+';"'}else{d='style="display:none;"'}}var h='<div id="floatCorner_'+g+'" class="float_corner float_corner_'+g+'"><span class="corner corner_1" '+f+'>◆</span><span class="corner corner_2" '+d+">◆</span></div>";if(!a("#floatCorner_"+g).size()){a("body").append(a(h))}this.corner=a("#floatCorner_"+g);return this},targetHold:function(){if(this.s.hoverHold){var d=parseInt(this.s.hideDelay,10)||200;this.target.hover(function(){c.flagDisplay=true},function(){c.flagDisplay=false;setTimeout(function(){c.displayDetect()},d)})}return this},loading:function(){this.target=a('<div class="float_loading"></div>');this.targetShow();this.target.removeData("width").removeData("height");return this},displayDetect:function(){if(!this.flagDisplay){this.targetHide()}return this},targetShow:function(){c.cornerClear();this.flagDisplay=true;this.container().setWidth().position();this.target.show();if(a.isFunction(this.s.showCall)){this.s.showCall.call(this.trigger,this.target)}return this},targetHide:function(){this.flagDisplay=false;this.targetClear();this.cornerClear();if(a.isFunction(this.s.hideCall)){this.s.hideCall.call(this.trigger)}this.target=null;this.trigger=null;this.s={};this.targetProtect=false;return this},targetClear:function(){if(this.target){if(this.target.data("width")){this.target.removeData("width").removeData("height")}if(this.targetProtect){this.target.children().hide().appendTo(a("body"))}this.target.unbind().hide()}},cornerClear:function(){if(this.corner){this.corner.remove()}},target:null,trigger:null,s:{},cacheData:{},targetProtect:false};a.powerFloat={};a.powerFloat.hide=function(){c.targetHide()};var b={width:"auto",offsets:{x:0,y:0},zIndex:999,eventType:"hover",showDelay:0,hideDelay:0,hoverHold:true,hoverFollow:false,targetMode:"common",target:null,targetAttr:"rel",container:null,reverseSharp:false,position:"4-1",edgeAdjust:true,showCall:a.noop,hideCall:a.noop}})(jQuery);

//jquery.msgbox.min.js
(function($){$.msgbox=function(o){if(typeof(o)=='string'){o={content:o}}
var opts=o||{};opts.width=o.width||360;opts.height=o.height||200,opts.autoClose=o.autoClose||0;opts.title=o.title||'Tips',opts.wrapperClass=o.wrapperClass||'msgbox_wrapper';opts.titleClass=o.titleClass||'msgbox_title';opts.closeClass=o.closeClass||'msgbox_close';opts.titleWrapperClass=o.titleWrapperClass||'msgbox_title_wrapper';opts.mainClass=o.mainClass||'msgbox_main';opts.bgClass=o.bgClass||'msgbox_bg';opts.buttonClass=o.buttonClass||'msgbox_button';opts.inputboxClass=o.inputboxClass||'msgbox_inputbox';opts.type=o.type||'text';opts.content=o.content||'Hello, world!';opts.onClose=o.onClose||function(){};opts.closeImg=o.closeImg||'';opts.bgOpacity=o.bgOpacity||0.6;opts.onAjaxed=o.onAjaxed||function(){};opts.onInputed=o.onInputed||function(){};opts.enableDrag=typeof o.enableDrag!='boolean'?true:o.enableDrag;opts.bgAnimate=typeof o.bgAnimate!='boolean'?true:o.bgAnimate;opts.boxAnimate=typeof o.boxAnimate!='boolean'?true:o.boxAnimate;var returnValue=false;var relTop=0;var relLeft=0;var $background=$("<div>").attr('id','jMsgboxBg').css({'position':'absolute','top':'0','left':'0','z-index':'9999','opacity':'0'}).addClass(opts.bgClass).appendTo('body').dblclick(closeMe).click(function(){flashTitle(0.5,4,80);});if(opts.bgAnimate)
$background.animate({'opacity':opts.bgOpacity});else
$background.css('opacity',opts.bgOpacity);var $wrapper=$("<div>").attr('id','jMsgboxBox').css({'width':opts.width+'px','height':opts.height+'px','position':'absolute','z-index':'10000','display':'none'}).addClass(opts.wrapperClass).appendTo('body');if(opts.boxAnimate)
$wrapper.slideDown("slow");else
$wrapper.css('display','');var $titleWrapper=$('<ul><li>Tips</li><li>Close</li></ul>').addClass(opts.titleWrapperClass).appendTo($wrapper);var $titleLi=$("li:first",$titleWrapper).html(opts.title).addClass(opts.titleClass);var $closeLi=$titleLi.next().addClass(opts.closeClass).mousedown(closeMe)
if(opts.closeImg!='')
$closeLi.html("<img src="+opts.closeImg+" border=0 />");var $main=$(document.createElement("div")).addClass(opts.mainClass).appendTo($wrapper);$main.height(opts.height-$titleWrapper.outerHeight(true)-$main.outerHeight(true)+$main.height());function closeMe(){if(opts.boxAnimate)
$wrapper.slideUp('slow');else $wrapper.remove();if(opts.bgAnimate)
$background.fadeOut();else $background.remove();opts.onClose(returnValue);}
function isVisible(){return $background.is(":visible")&&$wrapper.is(":visible");}
function autoCloseMe(autoClose){if(autoClose>0&&isVisible()){autoCloseStr=autoClose+" seconds close...";$titleLi.html(opts.title+" &nbsp; "+autoCloseStr);autoClose--;if(autoClose==0)
closeMe();setTimeout(function(){autoCloseMe(autoClose)},1000);}}
function resetPosition(){$background.css({'width':document.documentElement.scrollWidth+'px','height':document.documentElement.scrollHeight+'px'});relLeft=($(window).width()-opts.width)/2;relTop=($(window).height()-opts.height)/2;fixBox();}
function flashTitle(opacity,times,interval,flag){if(times>0){flag=!flag;op=flag?opacity:1;$titleWrapper.css('opacity',op);setTimeout(function(){flashTitle(opacity,times-1,interval,flag)},interval);}}
function fixBox(){$wrapper.css({'top':$(window).scrollTop()+relTop+'px','left':$(window).scrollLeft()+relLeft+'px'});}
function msgbox(){switch(opts.type){case'input':$main.html(opts.content);var $inputbox=$("<input type='text' />").appendTo($main).addClass(opts.inputboxClass);var $buttonWrapper=$("<div>").css({'text-align':'center','padding':'15px 0'}).appendTo($main);var $yesButton=$("<input type=button value=' OK '>").appendTo($buttonWrapper).addClass(opts.buttonClass).after(" &nbsp; &nbsp; ").click(function(){opts.onInputed($inputbox.val());closeMe();});var $noButton=$("<input type=button value=' Cancel '>").appendTo($buttonWrapper).addClass(opts.buttonClass).click(closeMe);break;case'alert':$main.html(opts.content);var $buttonWrapper=$("<div>").css({'text-align':'center','padding':'15px 0'}).appendTo($main);var $OKButton=$("<input type=button value=' OK '>").appendTo($buttonWrapper).addClass(opts.buttonClass).click(closeMe);break;case'confirm':$main.html(opts.content);var $buttonWrapper=$("<div>").css({'text-align':'center','padding':'15px 0'}).appendTo($main);var $yesButton=$("<input type=button value=' Yes '>").appendTo($buttonWrapper).addClass(opts.buttonClass).after(" &nbsp; &nbsp; ").click(function(){returnValue=true;closeMe();});var $noButton=$("<input type=button value=' No '>").appendTo($buttonWrapper).addClass(opts.buttonClass).click(function(){returnValue=false;closeMe();});break;case'get':case'ajax':case'url':$main.text("Loading ...").load(opts.content,'',function(data){(opts.onAjaxed)(data);});break;case'iframe':$("<iframe frameborder=0 marginheight=0 marginwidth=0></iframe>").appendTo($main).attr({'width':'100%','height':'100%','scrolling':'auto','src':opts.content});break;default:$main.html(opts.content);}}
resetPosition();$(window).load(resetPosition).resize(resetPosition).scroll(fixBox);msgbox();if(opts.autoClose>0)
autoCloseMe(opts.autoClose);o.outClose=closeMe;if(opts.enableDrag)
$wrapper.Drags({handler:$titleWrapper,onMove:function(){$(window).unbind('scroll')},onDrop:function(){relTop=$wrapper.getCss('top')-$(window).scrollTop();relLeft=$wrapper.getCss('left')-$(window).scrollLeft();$(window).scroll(fixBox);}});return this;}
$.closemsgbox=function(o){o=o||window.document;if(o.constructor=='[object HTMLDocument]')
o={document:o};var opts=o||{};opts.document=o.document||window.document;opts.bgAnimate=typeof o.bgAnimate=='undefined'?true:o.bgAnimate;opts.boxAnimate=typeof o.boxAnimate=='undefined'?true:o.boxAnimate;opts.onClose=o.onClose||function(){};var $wrapper=$(o.getElementById('jMsgboxBox'));var $background=$(o.getElementById('jMsgboxBg'));if(opts.boxAnimate)
$wrapper.slideUp('slow');else $wrapper.remove();if(opts.bgAnimate)
$background.fadeOut();else $background.remove();opts.onClose();}})(jQuery);


//jquery.tips.js
(function($) {
    $.fn.add_tips = function(options) {
        var opts = $.extend({}, $.fn.add_tips.defaults, options);
        var element = this;
        setTips(this, opts);
        this.blur(function() { setTips(this, opts); });
        this.focus(function() { unsetTips(this, opts); });
        opts.form.submit(function() { unsetTips(element, opts); });
    };

    function setTips(target, opts) {
        if (!$(target).val() || $(target).val() == opts.tips) {
            $(target).val(opts.tips);
            if (opts.tipFontColor == "" && opts.fontColor == "") {
                $(target).attr("class", opts.classNameBlur);
            } else {
                $(target).css("color", opts.tipFontColor);
            }
        }
    };

    function unsetTips(target, opts) {
        if ($(target).val() == opts.tips) {
            $(target).val("");
            if (opts.tipFontColor == "" && opts.fontColor == "") {
                $(target).attr("class", opts.classNameFocus);
            } else {
                $(target).css("color", opts.fontColor);
            }
        }
    };

    $.fn.add_tips.defaults = {
        form: $("form[name=update]"),
        tips: "input your tips.",
        classNameFocus: "tipsFocus tipsFontFamily",
        classNameBlur: "tipsBlur tipsFontFamily",
        tipFontColor: "",
        fontColor: ""
    };

})(jQuery);


//jquery.ImageScroller.js
jQuery.fn.imageScroller = function(params){
    var p = params || {
        next:"buttonNext",
        prev:"buttonPrev",
        frame:"viewerFrame",
        width:100,
        child:"a",
        auto:true
    };
    var _btnNext = $("#"+ p.next);
    var _btnPrev = $("#"+ p.prev);
    var _imgFrame = $("#"+ p.frame);
    var _width = p.width;
    var _child = p.child;
    var _auto = p.auto;
    var _itv;

    var turnLeft = function(){
        _btnPrev.unbind("click",turnLeft);
        if(_auto) autoStop();
        _imgFrame.animate( {marginLeft:-_width}, 'fast', '', function(){
            _imgFrame.find(_child+":first").appendTo( _imgFrame );
            _imgFrame.css("marginLeft",0);
            _btnPrev.bind("click",turnLeft);
            if(_auto) autoPlay();
        });
    };

    var turnRight = function(){
        _btnNext.unbind("click",turnRight);
        if(_auto) autoStop();
        _imgFrame.find(_child+":last").clone().show().prependTo( _imgFrame );
        _imgFrame.css("marginLeft",-_width);
        _imgFrame.animate( {marginLeft:0}, 'fast' ,'', function(){
            _imgFrame.find(_child+":last").remove();
            _btnNext.bind("click",turnRight);
            if(_auto) autoPlay();
        });
    };

    _btnNext.css("cursor","hand").click( turnRight );
    _btnPrev.css("cursor","hand").click( turnLeft );

    var autoPlay = function(){
      _itv = window.setInterval(turnLeft, 5000);
    };
    var autoStop = function(){
        window.clearInterval(_itv);
    };
    if(_auto)   autoPlay();
};


//facebox.js
(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading()

    if (data.ajax) fillFaceboxFromAjax(data.ajax)
    else if (data.image) fillFaceboxFromImage(data.image)
    else if (data.div) fillFaceboxFromHref(data.div)
    else if ($.isFunction(data)) data.call($)
    else $.facebox.reveal(data, klass)
  }

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.2,
      overlay      : true,
      overlayAlways: false,
      loadingImage : 'http://images.commercialless.com/facebox/loading.gif',
      closeImage   : 'http://images.commercialless.com/facebox/closelabel.gif',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
        closeImage_type: 'bottom',// bottom, top
        closeImage_top_url : 'http://images.commercialless.com/facebox/closelabel_top.png',
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <table> \
          <tbody> \
            <tr> \
              <td class="tl"/><td class="b"/><td class="tr"/> \
            </tr> \
            <tr> \
              <td class="b"/> \
              <td class="body"> \
                    <div class="f_top">\
                        <a href="#" class="close"><img src="" title="close" class="close_image_top" /></a>\
                    </div>\
                <div class="content"> \
                </div> \
                <div class="f_footer"> \
                  <a href="#" class="close"> \
                    <img src="" title="close" class="close_image" /> \
                  </a> \
                </div> \
              </td> \
              <td class="b"/> \
            </tr> \
            <tr> \
              <td class="bl"/><td class="b"/><td class="br"/> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div>'
    },

    loading: function() {
      init()
      if ($('#facebox .loading').length == 1) return true
      showOverlay()

      $('#facebox .content').empty()
      $('#facebox .body').children().hide().end().
        append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>')

      $('#facebox').css({
        top:    getPageScroll()[1] + (getPageHeight() / 10),
        left:   385.5
      }).show()

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) $.facebox.close()
        return true
      })
      $(document).trigger('loading.facebox')
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox')
      if (klass) $('#facebox .content').addClass(klass)
      $('#facebox .content').append(data)
      $('#facebox .loading').remove()
      $('#facebox .body').children().fadeIn('normal')
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox table').width() / 2))
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox')
        if ($.facebox.settings.overlayAlways) {
            $('#facebox .f_top').hide();
            $('#facebox .f_footer').hide();
        } else if ($.facebox.settings.closeImage_type == "top") {
            $('#facebox .f_top').show();
            $('#facebox .f_footer').hide();
        } else {
            $('#facebox .f_top').hide();
            $('#facebox .f_footer').show();
        }
    },

    close: function() {
      $(document).trigger('close.facebox')
      return false
    }
  })

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    init(settings)

    function clickHandler() {
      $.facebox.loading(true)

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
      if (klass) klass = klass[1]

      fillFaceboxFromHref(this.href, klass)
      return false
    }

    return this.click(clickHandler)
  }

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true
    else $.facebox.settings.inited = true

    $(document).trigger('init.facebox')
    makeCompatible()

    var imageTypes = $.facebox.settings.imageTypes.join('|')
    $.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i')

    if (settings) $.extend($.facebox.settings, settings)
    $('body').append($.facebox.settings.faceboxHtml)

    var preload = [ new Image(), new Image(), new Image() ];
    preload[0].src = $.facebox.settings.closeImage
    preload[1].src = $.facebox.settings.loadingImage
    preload[2].src = $.facebox.settings.closeImage_top_url;
    $('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })

    $('#facebox .close').click($.facebox.close)
    $('#facebox .close_image').attr('src', $.facebox.settings.closeImage)
    $('#facebox .close_image_top').attr('src', $.facebox.settings.closeImage_top_url);
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {     // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight
    if (self.innerHeight) { // all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }
    return windowHeight
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings

    $s.loadingImage = $s.loading_image || $s.loadingImage
    $s.closeImage = $s.close_image || $s.closeImage
    $s.imageTypes = $s.image_types || $s.imageTypes
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0]
      var target = href.replace(url,'')
      $.facebox.reveal($(target).clone().show(), klass)

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass)
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass)
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image()
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass)
    }
    image.src = href
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href, function(data) { $.facebox.reveal(data, klass) })
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null
  }

  function showOverlay() {
    if (skipOverlay()) return

    if ($('facebox_overlay').length == 0)
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')

    if ($.facebox.settings.overlayAlways)
    {
      $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .fadeIn(200)
    } else {
      $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
       .click(function() { $(document).trigger('close.facebox') })
      .fadeIn(200)
    }
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
        $('#facebox_overlay').css({position: 'absolute', width: document.body.scrollWidth, height: document.body.scrollHeight});
    }
    return false
  }

  function hideOverlay() {
    if (skipOverlay()) return

    $('#facebox_overlay').fadeOut(200, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG")
      $("#facebox_overlay").addClass("facebox_hide")
      $("#facebox_overlay").remove()
    })

    return false
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox')
    $('#facebox').fadeOut(function() {
      $('#facebox .content').removeClass().addClass('content')
      hideOverlay()
      $('#facebox .loading').remove()
    })
    $(document).trigger('afterClose.facebox')
  })

})(jQuery);

/*! http://mths.be/placeholder v1.8.7 by @mathias */
(function(f,h,c){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=c.fn,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){return this.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind('focus.placeholder',b).bind('blur.placeholder',e).trigger('blur.placeholder').end()};j.input=a;j.textarea=d;c(function(){c(h).delegate('form','submit.placeholder',function(){var k=c('.placeholder',this).each(b);setTimeout(function(){k.each(e)},10)})});c(f).bind('unload.placeholder',function(){c('.placeholder').val('')})}function g(l){var k={},m=/^jQuery\d+$/;c.each(l.attributes,function(o,n){if(n.specified&&!m.test(n.name)){k[n.name]=n.value}});return k}function b(){var k=c(this);if(k.val()===k.attr('placeholder')&&k.hasClass('placeholder')){if(k.data('placeholder-password')){k.hide().next().show().focus().attr('id',k.removeAttr('id').data('placeholder-id'))}else{k.val('').removeClass('placeholder')}}}function e(){var o,n=c(this),k=n,m=this.id;if(n.val()===''){if(n.is(':password')){if(!n.data('placeholder-textinput')){try{o=n.clone().attr({type:'text'})}catch(l){o=c('<input>').attr(c.extend(g(this),{type:'text'}))}o.removeAttr('name').data('placeholder-password',true).data('placeholder-id',m).bind('focus.placeholder',b);n.data('placeholder-textinput',o).data('placeholder-id',m).before(o)}n=n.removeAttr('id').hide().prev().attr('id',m).show()}n.addClass('placeholder').val(n.attr('placeholder'))}else{n.removeClass('placeholder')}}}(this,document,jQuery));

//jquery regexpCommon
(function($) {
  $.regexpCommon = function(regexpDesc) {
    return $.regexpCommon.regexpPattern[regexpDesc].call();
  };

  $.regexpCommon.regexpPattern = {
    // numbers
    numberInteger : function() {
      return /^[-+]?[1-9]\d*\.?[0]*$/;
    },
    numberFloat : function() {
      return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
    },
    // email
    email : function() {
      return /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    },
    ssn : function() {
      return /^\d{3}-\d{2}-\d{4}$/;
    },
    url : function() {
      return /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
    },
    phoneNumberUS : function() {
      return /^[01]?[- .]?(\([2-9]\d{2}\)|[2-9]\d{2})[- .]?\d{3}[- .]?\d{4}$/;
    },
    zipCodeUS : function() {
      return /^(\d{5}-\d{4}|\d{5}|\d{9})$|^([a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d)$/;
    },
    currencyUS : function() {
      return /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/;
    }, 
    htmlHexCode : function() {
      return /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    },
    dottedQuadIP : function() {
      return /^(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4] \d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4] \d|25[0-5])$/;
    },
    macAddress : function() {
      return /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
    }
  };
}) (jQuery);

//jQuery MD5 hash algorithm function
(function($){
    
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    
    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    
    var F = function(x, y, z) {
        return (x & y) | ((~ x) & z);
    }
    
    var G = function(x, y, z) {
        return (x & z) | (y & (~ z));
    }
    
    var H = function(x, y, z) {
        return (x ^ y ^ z);
    }
    
    var I = function(x, y, z) {
        return (y ^ (x | (~ z)));
    }
    
    var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var convertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    
    var wordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };
    
    var uTF8Encode = function(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };
    
    $.extend({
        md5: function(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
                b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
                b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
                a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
                d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
                c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
                c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
                a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
                d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
                c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
                a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
                a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
                b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
                d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        }
    });
})(jQuery);
