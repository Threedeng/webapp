// JavaScript Document
;(function(){
    var defaultFun = {apiurl:'',callback:function(){}},
        defaults = {
        boxId:'a_popup_img',
        boxClass:'a_popup_img a_popup_img_autowh',
        typeClass:['a_popup_album','a_popup_movephoto','a_popup_stories'],
        shadowId:'a_popup_img_shadow',
        index:0,
        albumType:'',
        picId:'',   
        apiImg:'',
        imgData:'',
        // userApiurl:'',
        userData:{icon:'',username:'',age:'', gender:'',location:'',usr_id: '',self_usr_id:'',self_username:''},
        popType:'',
        animate:true,
        interfaces:{
            deletePhone:defaultFun,
            editRotate:defaultFun,
            editSave:defaultFun,
            changeOrder:defaultFun,
            movePhone:defaultFun,
            saveAbout:defaultFun,
            report:defaultFun,
            likePhoto:defaultFun,
            delComment:defaultFun,
            postComment:defaultFun,
            photoInfo:defaultFun,
            likeExtraPhoto:defaultFun,
        }
    };

    function fPopupimg(opt,localObj){
        this.init(opt,localObj);
    }

    fPopupimg.prototype = {
        init : function (opt,localObj) {

            var This = this,time,_popType,t_index;
            this.opts = opt;
            _popType = this.opts.popType;
            _index = this.opts.index;

            $("#"+opt.boxId).html() && this.close();
            if(!_popType) return;

            this.g_localObj = localObj;
            this.g_index = opt.index || 0;
            this.g_picId = opt.picId;
            this.g_albumType = opt.albumType;
            this.g_popType = _popType;
            this.g_ajaxScript = true;
            this.g_ajaxImgBool = this.g_ajaxUserbool = this.g_ajaxPhoneInfoBool= false;
            this.g_getPhoneInfoAjax = null;
            this.g_photoCommentsPage = 1;
            this.g_animate = opt.animate ? ' ' : ' a_popup_animate_no ';
            this.g_addclass = opt.addclass ? ' ' + opt.addclass : '';

            this.g_apiImg = opt.apiImg;
            // this.g_userApis = opt.userApiurl;
            this.g_imgData = opt.imgData;
            this.g_userData = opt.userData;
            this.g_extra = (opt.albumType === '' || opt.albumType === 0) ? 0 : 1;

            this.appendTpl();
            this.g_dom = $("#"+opt.boxId);
            this.g_domSha = $("#"+opt.shadowId);

            this.g_interfaces = opt.interfaces;

            if(_popType == "self" || _popType == 'view'){
                this.g_photoInfoApiurl = this.g_interfaces.photoInfo.apiurl;
                this.ajaxImg();
            }

            if(_popType == "self_edit"){
                this.rot = 0;
                this.g_ajaxScript = this.g_editClickbool = false;
                this.g_imgData = opt.imgData[0];
                var cssHref='https://images.tmatch.com/jquery-plugins/jcrop/css/jquery.Jcrop.min.css';
                if(!$("#a_popupimg_jcropcss").attr("href")){
                    var appcss = '<link id="a_popupimg_jcropcss" rel="stylesheet" type="text/css" href="https://images.tmatch.com/jquery-plugins/jcrop/css/jquery.Jcrop.min.css" />';
                    $("head").append(appcss);
                }
                $.getScript("https://images.tmatch.com/jquery-plugins/jcrop/js/jquery.Jcrop.min.js",function(){
                    This.g_ajaxScript = This.g_ajaxImgBool = true ;
                });
            }
            if(_popType == "move_photo"){
                this.g_imgData = opt.imgData[0];
                this.g_ajaxImgBool = true;
            }

            if(_popType == "stories"){
                this.ajaxImg();
                this.g_ajaxImgBool = true;
            }
            function repeatSetJson(){
                if(This.g_ajaxImgBool && This.g_ajaxScript){
                    clearInterval(This.repeatSetJson);
                    This.picIdSearch();
                    This.setJson();
                    (_popType == "view" || _popType == "self") && This.ajaxPhoneInfo();
                    This.loadimg();
                    This.bindEvt();
                    This.setdata();
                    This.ifPosition();
                }
            }
            this.repeatSetJson = setInterval(repeatSetJson,10);
        },
        ajaxImg:function(){
            var This = this,dom = this.g_dom,_popType=this.g_popType;
            if(this.g_apiImg){
                function getjson(url){
                    $.getJSON(url, function(json) {
                        This.g_imgData = json.photo;   //photo data
                        This.g_userData = $.extend(defaults.userData,json.user);  //user data
                        This.userInit();

                        This.g_ajaxImgBool = true;
                        if(json.errcode == 121){
                            This.g_ajaxImgBool = false;
                            This.prompt(json.errmsg)
                        }
                    });
                };
                this.g_popType == "self" && getjson(this.g_apiImg);
                this.g_popType == "view" && getjson(this.g_apiImg);
                if(this.g_popType == "stories"){
                    This.g_imgData = {
                        img:[
                            'https://s.tmatch.com/de/picssb51/6/446/90253446-2474100.jpg',
                            'https://s.tmatch.com/de/picssb51/6/446/90253446-2474101.jpg',
                            'https://s.tmatch.com/de/picssb51/8/868/90401868-2509684.jpg',
                            'https://s.tmatch.com/de/picssb51/8/868/90401868-2509683.jpg',
                            'https://s.tmatch.com/de/picssb51/8/868/90401868-2509682.jpg'
                        ]
                    };
                    This.g_ajaxImgBool = true;
                }
            }
            else{
                if(_popType == "self" || _popType == 'view'){
                    this.userInit();
                }
                this.g_ajaxImgBool = true;
                return;
            }
        },
        userInit:function(){
            var dom = this.g_dom;
            this.g_ajaxUserbool = true;
            this.setUserdata();
            this.bindUserevt();
            dom.find("#photos_report").attr({"href":'/report_abuse?checked_value=4&about_id=' + this.g_userData.usr_id})
            setTimeout(function(){
                dom.find('#a_col_right_view').show();
            },100);
        },
        ajaxPhoneInfo:function(load_more){
            var This=this,dom=this.g_dom,_popType=this.g_popType;
            if (!load_more) {
                This.g_photoCommentsPage = 1;
                dom.find("#comments_list").scrollTop(0);
                if(_popType == 'view'){
                    this.setImgid();
                    dom.find("#photo_submit_comments textarea").val('');
                    dom.find('#comments_list ul').empty();
                    dom.find('#comment_show_error').html('');
                    dom.find("#phone_comment_wrapper").hide();
                    dom.find("#popup_comment_loading").show();
                }
                if(_popType == 'self'){
                    this.setImgid();
                    dom.find('#comments_list ul').empty();
                    dom.find("#photo_likes_box").hide();
                    dom.find("#popup_comment_loading").show();
                }
            }
            function setPhoneInfoRouter(){
                _popType == 'view' ? This.setViewPhoneInfo() : This.setSelfPhoneInfo()
            }

            this.g_getPhoneInfoAjax && this.g_getPhoneInfoAjax.abort();
            This.g_getPhoneInfoAjax = $.ajax({
                url:This.g_photoInfoApiurl,
                data:{prof_id:This.g_userData.usr_id,pic_id:This.g_imgId,only_extra_picture:This.g_extra,from:(This.g_photoCommentsPage-1)*10},
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    This.g_ajaxPhoneInfoBool = true;
                    This.g_phoneInfoData = data;
                    setPhoneInfoRouter();
                }
            })

            if (This.g_popType == 'view' && (This.g_albumType == 9 || This.g_albumType == 10 || (This.g_albumType.length > 0 && This.g_albumType == 0))) {
                This.shareLuxury();
                if (this.g_ajaxImgBool && _popType == 'view' && this.g_imgData[this.g_index].first_caption) {
                    $("#meet_other_bikers").show();
                    $("#meet_other_bikers").find("a").attr({"href":'/search_by_same_bike?first_caption=' + this.g_imgData[this.g_index].first_caption});
                    $("#meet_other_bikers").css("bottom", "59px");
                    $("#comments_list").css("max-height", "186px");
                }
            }
        },
        setSelfPhoneInfo:function(){
            var This=this,dom=this.g_dom,htmlLi='',domLickBox=dom.find('#photo_likes_box');
            parseInt(this.g_phoneInfoData.like_cnt) && domLickBox.show()
            domLickBox.find('#photo_likes').html(this.g_phoneInfoData.like_cnt);
            domLickBox.find('#photo_likes').attr({'href':"/who_like_my_photo"});

            dom.find("#popup_comment_loading").hide();

            if(!This.g_phoneInfoData.comments.length <= 0){
                for(var i = 0; i < This.g_phoneInfoData.comments.length; i++){
                    htmlLi += This.viewCommentone(i);
                }
                dom.find('#comments_list ul').html(htmlLi);
            }
        },
        setViewPhoneInfo:function(){
            var This=this,dom=this.g_dom,htmlLi='';
            var domSubmit = dom.find('#photo_submit_comments');

            dom.find("#popup_comment_loading").hide();
            dom.find("#phone_comment_wrapper").show();

            var _lick_cnt = This.g_phoneInfoData.like_cnt,
                domLikeClick = dom.find('#photo_like');
                domLikeClick.css({"display":"block"});

            if(This.g_phoneInfoData.liked == 1){
                domLikeClick.find("span").text("Liked");
                domLikeClick.addClass('a_btn_orange');
            }else{
                domLikeClick.find("span").text("Like");
                domLikeClick.removeClass('a_btn_orange');
            }

            if(!This.g_phoneInfoData.comments.length <= 0){
                for(var i = 0; i < This.g_phoneInfoData.comments.length; i++){
                    htmlLi += This.viewCommentone(i);
                }
                dom.find('#comments_list ul').append(htmlLi);
                dom.find('#comments_list ul').find("li").hasClass('comments_list_this') ? domSubmit.hide() : domSubmit.show();
            }
            else {
                domSubmit.show()
            }
        },
        viewCommentone:function(index){
            var list,name,text,id,is_hidden,thisClass=htmlLi='';
            if(typeof index == 'number'){
                data = this.g_phoneInfoData.comments[index];
                name = data.username;
                text = data.comment;
                id   = data.comment_id;
                data.can_del == 1 && (thisClass = 'comments_list_this');
                is_hidden = data.is_hidden;
            }
            else{
                thisClass = 'comments_list_this';
            }
            name = name || this.g_userData.self_username;
            if (is_hidden) {
                htmlLi='<li class="'+thisClass+'">'+'<span style="font-weight:bold;color:gray">'+name+': </span><span>'+text+'</span>'+'<div class="comments_op"><a class="mod_comment_del" data-id="'+id+'">Delete</a></div>'+'</li>';
            } else {
                htmlLi='<li class="'+thisClass+'">'+'<a target="_blank" class="commentuersname" href="https://www.millionairematch.com/user?'+name+'">'+name+'</a>'+': <span>'+text+'</span>'+'<div class="comments_op"><a class="mod_comment_del" data-id="'+id+'">Delete</a></div>'+'</li>';
            }
            return htmlLi;
        },
        
        bindUserevt:function(){
            var This=this,dom=this.g_dom,commentSubmit=true;
            var domComments=dom.find("#photo_submit_comments");
            var domComlist=dom.find("#comments_list");

            dom.find("#photo_like").bind("click",function(){
                var tthis = $(this);
                if($(this).hasClass("a_btn_orange")){
                    return false;
                }
                $.ajax({
                    url: (This.g_extra ? This.g_interfaces.likeExtraPhoto.apiurl : This.g_interfaces.likePhoto.apiurl),
                    data: {pic_id:This.g_imgId,about_id:This.g_userData.usr_id,extra:This.g_extra,extra_pic_id:This.g_imgId,},
                    type: 'post',
                    success:function(res){
                        if(res == 1){
                            tthis.find("span").text("Liked");
                            tthis.addClass('a_btn_orange');
                            $('.like_user_photo_' + This.g_imgId).hide();
                            $('.unlike_user_photo_img_' + This.g_imgId).show();
                        }
                    }
                });
                return false;
            });

            domComments.find("#pop_comment_submit").bind("click",function(){
                if(!commentSubmit || !This.g_ajaxPhoneInfoBool) return false;
                commentSubmit = false;
                var domError = dom.find("#comment_show_error"),errorText;
                var content = $(this).parent().find("textarea").val().replace(/^(\s)*/,'');
                if(content <= 0){
                    errorText= '<span>Please enter a message</span>';
                    domError.html(errorText);
                    commentSubmit = true;
                }
                else{
                    domError.html('');
                    var tplLi = $(This.viewCommentone());
                    $.ajax({
                        url: This.g_interfaces.postComment.apiurl,
                        data: {save:1,text:content,pic_id:This.g_imgId,only_extra_picture:This.g_extra},
                        type: 'post',
                        dataType: "json",
                        success:function(res){
                            if(res.results == 1){
                                tplLi.find("span").html(content);
                                tplLi.find("a.mod_comment_del").attr({'data-id':res.comment_id});
                                domComlist.find("ul").prepend(tplLi);
                                domComments.hide();
                                commentSubmit = true;

                                This.g_interfaces.postComment.callback();
                            }else{
                                errorText= '<span>"Message"</span> is required.';
                                domError.html(errorText);
                                commentSubmit = true;
                            }
                        }
                    });
                }
                return false;
            });

            domComlist.bind("click",function(e){
                var e = e || window.event;
                var domA = $(e.target).closest("a");
                if(domA.hasClass('commentuersname')){

                }
                if(domA.hasClass('mod_comment_del')){
                    $.popup('Are you sure you want to remove the comment?',{
                        button: [
                            {
                                val: 'Yes',
                                callback: function() {
                                    $.ajax({
                                        url: This.g_interfaces.delComment.apiurl,
                                        data: {prof_id:This.g_userData.usr_id,comment_id:domA.data('id'),only_extra_picture:This.g_extra},
                                        type: 'post',
                                        dataType: "json",
                                        success:function(res){
                                            if(res.results == 1){
                                                dom.find("#photo_submit_comments textarea").val('');
                                                domA.parents("li").remove();
                                                dom.find("#photo_submit_comments").show();
                                                This.g_interfaces.delComment.callback();
                                                $.popup().close();
                                            }
                                        }
                                    });
                                }
                            },{
                                val: 'Cancel'
                            }
                        ]
                    });
                }
            });
            domComlist.bind("scroll",function(e){
                var distanceScrollCount = 0;
                var distanceScroll = 0;
                var divHight = domComlist.height();

                distanceScrollCount = domComlist[0].scrollHeight;
                distanceScroll = domComlist[0].scrollTop;
                if(distanceScroll + divHight >= distanceScrollCount && This.g_photoCommentsPage * 10 < This.g_phoneInfoData.comment_cnt) {
                    This.g_photoCommentsPage += 1;
                    This.ajaxPhoneInfo(1);
                    
                }
            });
        },
        shareLuxury: function() {
            var dom = this.g_dom;
            dom.find('#share_to').show();
            $.ajax({
                    url: '/modules/share_picture_on_social_',
                    data: { new_style:1, album_type:this.g_albumType, pic_description:this.g_imgData[this.g_index].about, picture:this.g_userData.usr_id + '/' + this.g_imgData[this.g_index].picture_id},
                    type: 'post',
                    success:function(res){
                        dom.find('#share_to').html(res);
                    }
                });
        },
        setJson:function(){
            switch(this.g_popType){
                case 'self':
                    if(this.opts.splice){
                        this.splice(this.g_imgData,this.opts.splice[0],this.opts.splice[1]);
                        this.g_index >= this.g_imgData.length && (this.g_index=0)
                    }
                    this.g_imgData.length > 0 && this.setImgid();
                break;

                case 'view':
                    // this.g_imgData = this.json.pictures;©696
                    this.setImgid();
                break;

                case 'self_edit':
                    this.g_imgData && (this.g_imgId = this.g_imgData.picture_id);
                break;

                case 'move_photo': 
                    this.g_imgId = this.g_imgData.picture_id;
                break;

                case 'stories': 
                    // this.g_imgData = this.imgData;
                break;
                default : return false;
            }
            if(this.g_imgData.length <= 0){
                this.g_imgData =[{
                    active:'',
                    about:'',
                    icon:'',
                    picture_id:'',
                    picture:'',
                }];
                this.prompt("No picture");
            }
        },
        setImgid:function(){
            this.g_imgId = this.g_imgData[this.g_index].picture_id;
        },
        prompt:function(val){
            this.g_dom.find("#photos_num,#a_header,#a_col_right_view,#a_arrow_left,#a_arrow_right").addClass('important_hide');
            this.g_dom.find("#load_img").html(val).addClass('prompt');
        },
        picIdSearch:function(){
            var picid = this.g_picId;
            if(picid){
                var imglength = this.g_imgData.length;
                for(var i=0; i<imglength; i++){
                    if(this.g_imgData[i].picture_id == picid){
                        this.g_index = i; return;
                    }
                }
            }
        },
        setDesc:function(){
            var This = this;
            var dom = this.g_dom;
            if (dom.find("#photo_save_comment").hasClass('a_button_primary') && this.g_popType == "self") {
                var domEdit = dom.find("#about_edit");
                dom.find("#photo_save_comment").bind("click",function(){
                    dom.find("#photo_save_comment").removeClass('a_button_primary').unbind();
                    var type,update=1,only_type,obj={};
                    $.ajax({
                        url: This.g_interfaces.saveAbout.apiurl,
                        type: 'POST',
                        dataType: "json",
                        data: { about: domEdit.find("textarea").val(), item_id: This.g_imgId, private:This.g_extra },
                        success:function(res){
                            if(res.results == 1){
                                var _val = domEdit.find("textarea").val().trim();
                                This.g_localObj.imgData[This.g_index].about = _val;
                                This.g_imgData[This.g_index].about = _val;
                                dom.find("#photo_cancel_about").hide();
                                This.g_interfaces.saveAbout.callback();
                                dom.find("#about_success").show();
                                This.g_imgData[This.g_index].about_active = 0;
                            }else{
                                alert('error '+res.errcode)
                            }
                        },
                        error:function(){
                            alert('Oops!There was a problem connecting to the network. Please try again!')
                        }
                    });
                });
            }
        },

        bindEvt:function(){
            var This = this;
            var dom = this.g_dom;

            $(window).bind('resize',This.ifPosition);

            if (this.g_popType == "self") {
                var domEdit = dom.find("#about_edit");

                dom.find("li#deletephotobox").bind("click",function(e){
                    var e = e || window.event;
                    var domA = $(e.target).closest("a");
                    if(domA.hasClass('photo_delete')){
                        $.popup('Are you sure you want to delete this photo?', {
                            button:[
                                {
                                    val: "Yes",
                                    callback:function(){
                                        $.ajax({
                                            type: "POST",
                                            dataType: "json",
                                            url: This.g_interfaces.deletePhone.apiurl + '?item_id='+This.g_imgId + (This.g_extra == 0 ? '':'&extra=1'),
                                            success: function(msg){
                                                if(msg.results==1){
                                                    This.g_interfaces.deletePhone.callback();
                                                    if(window.location.href.match(/p=\w+/)) {
                                                        window.location =  window.location.href.replace(/p=\w+/,'p=album');
                                                    } else {
                                                        window.location =  window.location.href.replace(/#\w+/,'') + "&p=album";
                                                    }
                                                }
                                            }
                                        });
                                    }
                                },
                                {
                                    val: "No"
                                }
                            ]
                        });
                        $('#a_popup_shadow').hide();
                    }
                });

                dom.find("#private").bind("click",function(){
                    var imgsrc = This.g_imgData[This.g_index];
                    var newArray=[imgsrc];
                    This.close();
                    // console.log(This.opts)
                    $.popupimg({
                        entrance:{
                            opts:This
                        },
                        imgData:newArray,
                        albumType:This.g_albumType,
                        popType:"move_photo",
                        interfaces:{
                            movePhone:This.g_interfaces.movePhone
                        },
                    });
                });

                dom.find('#photo_edit').bind("click",function(){
                    var imgsrc =This.g_imgData[This.g_index];
                    var newArray=[imgsrc];
                    if(This.g_albumType == 9){
                        window.location.href = '/extra_pictures?edit=1&album_type=9';
                        return false;
                    }
                    This.close();
                    $.popupimg({
                        entrance:{
                            opts:This
                        },
                        albumType:This.g_albumType,
                        index:This.g_index,
                        imgData:newArray,
                        animate:false,
                        popType:"self_edit",
                        interfaces:{
                            edit:This.g_interfaces.edit,
                        }
                    });
                })

                dom.find('#a_arrow_left,#a_arrow_right,#photo_append').bind("click",function(){
                    This.newImg.onload = null;
                    $(this).attr("id") == "a_arrow_left" ? This.g_index-- : This.g_index++
                    This.slide();
                    This.ajaxPhoneInfo();

                    // This.ajax();
                    // This.setJson();
                    // This.setdata();

                    return false;
                });

                dom.find("#mark_as_main_photo").bind("click",function(){
                    $.ajax({
                        url: This.g_interfaces.changeOrder.apiurl+'?to=0&from='+This.g_index,
                        type: 'post',
                        dataType: "json",
                        success:function(res){
                            if(res.results == 1){
                                // var TI = This.g_imgData[This.g_index];
                                //     This.g_imgData.splice(This.g_index,1);
                                //     This.g_imgData.splice(0,0,TI);
                                //     This.g_index = 0;
                                //     This.slide();
                                This.g_interfaces.changeOrder.callback();
                                window.location.reload();
                            }
                        }
                    });
                    return false;
                })
                dom.find("#photo_cancel_about").bind("click",function(){
                    This.setdata();
                    dom.find("#photo_save_comment").removeClass('a_button_primary');
                    return false;
                });
                domEdit.find("textarea").bind("keyup",function(){
                    var v = $(this).val();
                    if (!dom.find("#photo_save_comment").hasClass('a_button_primary')) {
                        dom.find("#photo_save_comment").addClass('a_button_primary');
                        This.setdata();
                        $(this).val(v);
                    } else if ( This.g_imgData[This.g_index].about == v ) {
                        dom.find("#photo_save_comment").removeClass('a_button_primary');
                    }
                    return false;
                });
            }

            if (this.g_popType == "view") {
                dom.find('#a_arrow_left,#a_arrow_right,#photo_append').bind("click",function(){
                    This.g_ajaxPhoneInfoBool = false;
                    This.newImg.onload = null;
                    $(this).attr("id") == "a_arrow_left" ? This.g_index-- : This.g_index++;
                    This.slide();
                    This.ajaxPhoneInfo();

                    if (!This.g_imgData[This.g_index].first_caption) {
                        $("#meet_other_bikers").hide();
                    } else {
                        $("#meet_other_bikers").show();
                        $("#meet_other_bikers").find("a").attr({"href":'/search_by_same_bike?first_caption=' + This.g_imgData[This.g_index].first_caption});
                    }

                    return false;
                });
            }

            if (this.g_popType == "move_photo") {
                var _entrance = This.opts.entrance.opts;
                dom.find("#photo_confirm_move").bind("click",function(){
                    $.ajax({
                        url: This.g_interfaces.movePhone.apiurl+'?album_type=11&action='+$('#photo_confirm_move').data('action')+'&item_id='+This.g_imgId,
                        type: 'post',
                        dataType: "json",
                        success:function(res){
                            if (res.results == 1) {
                                // $.popupimg({
                                //     imgData:_entrance.g_imgData,
                                //     userData:_entrance.g_userData,
                                //     index:_entrance.g_index,
                                //     albumType:_entrance.g_albumType,
                                //     popType:_entrance.g_popType,
                                //     animate:false,
                                //     splice:[_entrance.g_index,1],
                                //     interfaces:_entrance.g_interfaces
                                // });

                                This.g_interfaces.movePhone.callback();
                                window.location.reload();
                            }
                        }
                    });
                })
                dom.find("#photo_confirm_no").bind("click",function(){
                    $.popupimg({
                        imgData:_entrance.g_imgData,
                        userData:_entrance.g_userData,
                        index:_entrance.g_index,
                        albumType:_entrance.g_albumType,
                        popType:_entrance.g_popType,
                        animate:false,
                        interfaces:_entrance.g_interfaces
                    });
                })
            }

            if (this.g_popType == "self_edit") {
                This.editCominit();
                this.edit_subClick_bool = true;
                dom.find("#photo_edit_rotate").bind("click",function(e){
                    var _entrance = This.opts.entrance.opts;
                    if(!This.g_editClickbool) return false;
                    else This.g_editClickbool = false;
                    This.newImg.onload = null;
                    var e = e || window.event,
                        imgSrc="",
                        domImg = dom.find("#photo_append #photo_center"),
                        current = $(e.target).closest("a");
                        if(current.hasClass('a_rotate_left')){
                            This.rot += 90;
                            This.rot > 360 && (This.rot = 90);
                        }
                        if(current.hasClass('a_rotate_right')){
                            This.rot -= 90;
                            This.rot < 0 && (This.rot = 270);
                        }
                        imgSrc='show_rotated_pic_?usr_id='+_entrance.g_userData.usr_id+'&pic_id='+ This.g_imgId+'&angle='+This.rot;
                        This.rot == 0 && (imgSrc = This.g_imgData.picture);
                        This.edit_subClick_bool = false;
                        This.comjcrop.destroy();
                        dom.find("#load_img").show();
                        domImg.attr({"style":""}).hide();
                        This.editRotloadimg(imgSrc);
                });
                dom.find("#edit_submit").bind("click",function(){
                    if(!This.edit_subClick_bool) return false;
                    var shaft = This.comjcrop.tellSelect();
                    var imgwh = This.comjcrop.getBounds();
                    var _entrance = This.opts.entrance.opts;
                    var _albumType = _entrance.g_albumType;
                    var userData = _entrance.g_userData;
                    $.ajax({
                        url: _entrance.g_interfaces.editSave.apiurl+'?m_width=660&m_height=470&changed=1&picno=' + This.g_index + '&angle=' + This.rot + '&x1=' + shaft.x + '&y1=' + shaft.y + '&height=' + shaft.h + '&width=' + shaft.w + '&only_extra_picture=' + This.g_extra + '&pic_id=' +This.g_imgId,
                        type: 'post',
                        dataType: "json",
                        success:function(res){
                            if(res.results == 1){
                                // This.close();
                                _entrance.g_interfaces.editSave.callback();
                                window.location.href = '/user_details?w=preview&p=album' + (_albumType ? ('&show_album_type='+ _albumType) : '') +'&prof_id='+userData.usr_id;
                            }
                        }
                    });
                })
            }

            if (this.g_popType == "stories") {
                dom.find('#pop_stories_prev,#pop_mouse_left').bind("click",function(e){
                    This.newImg.onload = null;
                    var domImg = dom.find("#photo_append #photo_center");
                    dom.find("#load_img").show();
                    domImg.attr({"style":""}).hide();
                    This.g_index--;
                    This.slide();
                });
                dom.find('#pop_stories_next,#pop_mouse_right').bind("click",function(e){
                    This.newImg.onload = null;
                    var domImg = dom.find("#photo_append #photo_center");
                    dom.find("#load_img").show();
                    domImg.attr({"style":""}).hide();
                    This.g_index++;
                    This.slide();
                });
            }

        },

        splice:function(array,ent,over){
            array.splice(ent,over);
        },
        
        editRotloadimg:function(src){
            var This = this,
                domImg = this.g_dom.find("#photo_append #photo_center"),
                newImg = new Image();
            newImg.onload = function(){
                This.g_editClickbool=true;
                domImg.attr({"src":this.src});
                This.g_dom.find("#load_img").hide();
                This.editCominit();
                This.edit_subClick_bool = true;
            };
            newImg.src = src ;
        },
        editCominit:function(){
            var This = this,fTime;
            function repeatEditCominit(){
                if(!This.newImg.id) return false;
                else clearInterval(This.repeatEditCominit);
                var domPhoto= $("#"+defaults.boxId).find('#photo_center');
                    var x=0,y=0,x2=330,y2=330,
                    minsize = [144,144],
                    domWidth = domPhoto.width(),
                    domHeight = domPhoto.height(),
                    obj = {};
                // auto center
                domWidth > domHeight ? (obj.w = true) : (obj.w = false); // 
                if(obj.w){  
                    if(domWidth >= x2){
                        x=(domWidth-x2)/2,y=(domHeight-y2)/2;
                        x2 += x;
                        if(domHeight <= y2){
                            y = 0, x = (domWidth-domHeight)/2, x2 = domHeight;
                        }
                    }
                    else{
                        x2=y2=domHeight, y=0, x=(domWidth-domHeight)/2, x2=x2+x;
                    }
                }
                else{
                    if(domHeight >= y2){
                        x=(domWidth - x2)/2, y=(domHeight - y2)/2, y2 += y;
                        if(domWidth <= y2){
                            x = 0, y = (domHeight - domWidth)/2, y2 = domHeight;
                        }
                    }
                    else{
                        x2=y2=domHeight, x=0, y=(domHeight-domWidth)/2, y2=y2+y;
                    }
                };
                $("#"+defaults.boxId).find('#photo_center').Jcrop({
                      bgFade:     true,
                      bgOpacity: .3,
                      minSize : minsize,
                      setSelect: [x,y,x2,y2],
                      keySupport: false
                    },function(){
                      This.comjcrop = this;
                      This.comjcrop.setOptions({ aspectRatio: 1 });
                });
            }
            this.repeatEditCominit = setInterval(repeatEditCominit,100);
        },
        setUserdata:function(){
            var dom = this.g_dom;
            var _userData = this.g_userData;
            var domRight = dom.find("#a_col_right_view");
            var info=domRight.find("#photo_maininfo");

            var _icon = _userData.icon,
                _username = _userData.username,
                _age = _userData.age,
                _gender = _userData.gender,
                _location = _userData.location,
                _usr_id = _userData.usr_id,
                _certified_logo_bar = _userData.certified_logo_bar;

            info.find("label").html('<img src="'+_icon+'" alt="" />');

            info.find("#photo_user_name").text( _username );
            info.find('#photo_user_img,#photo_user_name').css('cursor','pointer').unbind().click(function(){
                window.location = '/user_details?prof_id=' + _usr_id;
            });

            info.find("#photo_gender").html(_gender+', '+_age+', '+"<strong>"+_location+'</strong> ');
            if (_certified_logo_bar) {
                info.find("#verify_logo").html(unescape(_certified_logo_bar));
            }
        },
        setdata:function(){
            var This = this;
            var dom = this.g_dom;
            if(this.g_popType == "self" || this.g_popType == "view"){
                var index = this.g_index+1,
                    iSize = this.g_imgData.length,
                    instructions = this.g_imgData[this.g_index].about;
                iSize <= 1 && dom.find('#a_arrow_left,#a_arrow_right').hide();
                dom.find("#userphoto_des").html(instructions);
                dom.find('#photos_num').html( index+" / " + iSize );
                this.g_extra || dom.find('#photolikes_user').show();
            }
            if(this.g_popType == "self"){
                var domUl=dom.find("#photonum ul#photo_list_index"),html = '',vClass='';
                if(!this.g_extra){
                    dom.find("#private").text('Move to private album');
                    this.g_index == 0 ? dom.find("#mark_as_main_photo").hide() : dom.find("#mark_as_main_photo").show();
                }else{
                    dom.find("#private").text('Move to public album');
                    dom.find("#photo_list_index").remove();
                    // dom.find("#mark_as_main_photo").remove();
                    // dom.find('.a_col_right_view .photo_likes').remove();
                    // domUl.remove();
                }

                this.g_imgData.length <= 0 && dom.find("#mark_as_main_photo").hide();

                dom.find('#photonum #linksty01').eq(0).html( "#" + index );

                dom.find("#about_edit").show();
                dom.find("#photo_cancel_about").show();
                dom.find("#about_edit").find("textarea").val(instructions);
                if (this.g_imgData[this.g_index].about_active == 0) {
                    dom.find("#about_success").show();
                } else {
                    dom.find("#about_success").hide();
                }

                this.setDesc();
                domUl.html('')
                // #photo_list_index
                for(var i=2; i<iSize+1; i++){
                    i == index ? (vClass = 'current') : vClass='';
                    html+= '<li><a class='+'"'+vClass+'"'+'>'+'#'+i+'</a></li>';
                }
                domUl.append(html);

                domUl.find('a').each(function(i){
                    this.d_index = i + 1;
                    domUl.find('a').eq(i).bind("click",function(){
                        var tthis = this;
                        if (This.g_index == this.d_index) {
                            return false;
                        }
                        $.ajax({
                            url: This.g_interfaces.changeOrder.apiurl + '?to='+ this.d_index +'&from='+This.g_index,
                            type: 'post',
                            dataType: "json",
                            success:function(res){
                                if(res.results == 1){
                                    // var tI = This.g_imgData[tthis.d_index],TI = This.g_imgData[This.g_index];
                                    // This.g_imgData[This.g_index] = tI;
                                    // This.g_imgData[tthis.d_index] = TI;
                                    // This.g_index = tthis.d_index;
                                    // This.slide();
                                    This.g_interfaces.changeOrder.callback();
                                    window.location.reload();
                                }
                            }
                        });
                        return false;
                    })
                })
            }
            // if(this.g_popType == "move_photo"){
            //  var domText = dom.find(".photomove_explain_text"),
            //  text = ['Are you sure you want to move this photo to private album?',"Are you sure you want to move this photo to public album?"]
            //  this.g_albumType == 0 && domText.text(text[0]);
            //  this.g_albumType == 1 && domText.text(text[1]);
            // }
            if(this.g_popType == "stories"){
                var slideNumber = dom.find("#show_now_pic_num");
                slideNumber.text((This.g_index+1)+" / " +This.g_imgData.length);
                if(this.g_imgData.length<=1){
                    dom.find('#pop_stories_btn,#pop_mouse_left,#pop_mouse_right').remove()
                }
            }
        },
        loadimg:function(){
            var This = this,src,dom = this.g_dom,_popType = this.g_popType;
            if(_popType == "self" || _popType == "view")
            src = this.g_imgData[this.g_index].picture
            if(_popType == "self_edit" || _popType == "move_photo") 
            src = this.g_imgData.picture;
            This.g_popType == "stories" && (src = this.g_imgData[this.g_index]);
            // console.log(src)
            This.newImg = new Image();
            This.newImg.onload = function(){
                var Thisimg = this,time=0,timefuntion;
                Thisimg.id = "photo_center";
                if(This.g_popType == "move_photo"){
                    dom.find("#load_img").hide();
                    dom.find("#photo_append").html(This.newImg);
                    This.ifPosition();
                }else{
                    This.g_editClickbool=true;
                    dom.find("#load_img").hide();
                    dom.find("#photo_append").html(This.newImg);
                }
                if(This.g_popType == "stories"){
                    var imgw= dom.find("#photo_center").width();
                    var imgh= dom.find("#photo_center").height();
                    dom.find("#load_img").css({"width":imgw+"px","height":imgh+"px"});
                    This.ifPosition();
                }
                
            }
            This.newImg.src = src ;

        },
        slide:function(){
            this.g_dom.find("#a_mainpic_box span").html("");
            this.g_dom.find("#load_img").show();
            this.g_index < 0 && (this.g_index = this.g_imgData.length-1);
            this.g_index >= this.g_imgData.length && (this.g_index = 0);
            this.setdata();
            this.loadimg();
        },
        close:function(){
            clearInterval(this.repeatSetJson);
            clearInterval(this.repeatEditCominit);
            $(window).unbind('resize',this.ifPosition);
            $("#"+defaults.boxId+","+"#"+defaults.shadowId).remove();
        },
        ifPosition:function(aAttribute){
            var dWidth = $(window).width(),
                dHeight = $(window).height(),
                popupBox = $("#"+defaults.boxId),
                popupWidth = popupBox.outerWidth(),
                popupHeight = popupBox.outerHeight(),
                dLeft = (dWidth - popupBox.width())/2,
                dTop = (dHeight - popupBox.height())/2;
            if(dHeight <= popupHeight || aAttribute == "absolute"){
                dTop = $(document).scrollTop() + dHeight * 0.1;
                popupBox.css({"position":"absolute","top":dTop+"px","left":dLeft+'px'});
                return false;
            }
            popupBox.css({"left":dLeft,"top":dTop,"position":"fixed"});
        },
        ifBrowser:function(){
            if(navigator.userAgent.indexOf("Safari") != -1){
                return 'Safari';
            }
        },
        appendTpl:function(){
            var strVar = "",This=this;
            switch (this.g_popType) {
                case 'self' : 
                strVar +=
                '<a class="popupimg_evt_close a_close_popupimg"></a>' +
                '<div class="a_col_left">' +
                    '<div id="a_header" class="a_header">' +
                        '<div class="float_left">' +
                            '<div id="photonum" class="photonum">' +
                                '<a id="linksty01" class="linksty01"></a><ul id="photo_list_index"></ul>' +
                            '</div>' +
                            '<a id="mark_as_main_photo" class="linksty01 hide" >Set it as main photo</a>' +
                            '<a id="private" class="linksty01" ></a>' +
                        '</div>' +
                        '<div class="float_right">' +
                            '<ul>' +
                                '<li><a id="photo_edit" class="linksty01">Edit</a></li>' +
                                '<li id="deletephotobox" class="deletephotobox">' +
                                    '<a id="photo_delete" class="linksty01 photo_delete" >Delete</a>' +
                                '</li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<div class="a_mainpic">' +
                        '<a id="a_arrow_left" class="a_arrow_left"></a>' +
                        '<div id="a_mainpic_box" class="a_mainpic_box">' +
                            '<span id="photo_append"></span><samp id="load_img" class="load_img"></samp>' +
                        '</div>' +
                        '<a id="a_arrow_right" class="a_arrow_right"></a><span id="photos_num" class="photos_num"> </span>' +
                    '</div>' +
                '</div>' +
                '<div class="a_col_right">' +
                    '<div id="a_col_right_view" class="a_col_right_view">' +
                        '<div id="photo_likes_box" class="photo_likes hide"><span>Likes</span><a target="_blank" id="photo_likes" ></a></div>' +
                        '<div id="about_edit" class="about_edit hide">' +
                            '<div class="photoBoxMessage pt20 clearfix">' +
                            '<textarea id="photo_textarea" maxlength="140" class="textarea1" placeholder="Photo description. Distinguish yourself in group photo"></textarea>' +
                            '</div>' +
                            '<div class="p_right">' +
                                '<a id="photo_cancel_about" class="popup_btn_cancel"><span>Cancel</span></a>' +
                                '<a id="photo_save_comment" class="a_button popu_btn_right"><span>Save</span></a>' +
                            '</div>' +
                        '</div>' +
                        '<div id="about_success" style="margin-top: 10px;color: blue;display: none;"> Your photo description has been submitted for approval.</div>' +
                        '<div id="popup_comment_loading" class="popup_comment_loading"></div>' +
                        '<div id="comments_list" class="comments_list"><ul></ul></div>' +
                    '</div>' +
                '</div>';
                break;

                case "move_photo":
                    var text,action=!this.g_extra ? 'to_extra':'to_pub',explainText = { movePrivate : 'Are you sure you want to move this photo to private album?',
                                             movePublic : "Are you sure you want to move this photo to public album?"}
                    !this.g_extra ? text = explainText.movePrivate : text = explainText.movePublic;
                strVar +=
                '<a class="popupimg_evt_close a_close_popupimg"></a>' +
                '<div class="a_popup_photomovebox">' +
                    '<div id="a_mainpic_box" class="a_mainpic_box">' +
                        '<div class="photomove_explain_text" >'+text+'</div>' +
                        '<div class="photomove_button">' +
                            '<input id="photo_confirm_no" type="button" value="No" >' +
                            '<input id="photo_confirm_move" type="button" data-action="' + action + '" value="Yes, I want">' +
                        '</div><br>' +
                        '<span id="photo_append"></span><samp id="load_img" class="load_img"></samp>' +
                    '</div>' +
                '</div>';
                break;

                case "self_edit" :
                strVar +=
                '<a class="popupimg_evt_close a_close_popupimg"></a>' +
                '<div class="a_col_left">' +
                    '<div class="a_mainpic">' +
                        '<div id="a_mainpic_box" class="a_mainpic_box a_mainpic_box_edit">' +
                            '<span id="photo_append"></span><samp id="load_img" class="load_img"></samp>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="a_col_right">' +
                    '<dl class="edit_instructions">' +
                        '<dt>Edit instructions</dt>' +
                        '<dd>' +
                            '<p>1. Position the thumbnail square over your face</p>' +
                            '<p>2. Adjust the thumbnail square</p>' +
                            '<p>3. Save your changes</p>' +
                        '</dd>' +
                    '</dl>' +
                    '<div id="photo_edit_rotate" class="edit_rotate"><a class="a_rotate_left" class="a_rotate_left" ><i></i><span>Rotate left</span></a> <a class="a_rotate_right" class="a_rotate_right" ><i></i><span>Rotate right</span></a> </div>' +
                    '<div class="edit_btn">' +
                        '<button id="edit_submit" class="a_button a_button_primary">Save changes</button>' +
                    '</div>' +
                    '<div class="edit_tips"><b>Tips:</b><span>Just for your photo clipping thumbnails, not for photo cropping.</span></div>' +
                '</div>';
                break;

                case "view" :
                strVar +=
                '<a class="popupimg_evt_close a_close_popupimg"></a>' +
                '<div class="a_col_left">' +
                    '<div id="a_header" class="a_header">' +
                        '<p id="userphoto_des" class="userphoto_des"></p>' +
                    '</div>' +
                    '<div class="a_mainpic">' +
                        '<a id="a_arrow_left" class="a_arrow_left" ></a>' +
                        '<div id="a_mainpic_box" class="a_mainpic_box">' +
                            '<span id="photo_append"></span><samp id="load_img" class="load_img"></samp>' +
                        '</div>' +
                        '<a id="a_arrow_right" class="a_arrow_right"></a>' +
                        '<span id="photos_num" class="photos_num"></span>' +
                        '<span class="photos_report"><a id="photos_report" >Report photo</a></span>' +
                    '</div>' +
                '</div>' +
                '<div class="a_col_right">' +
                    '<div id="a_col_right_view" class="a_col_right_view">' +
                        '<div id="photo_maininfo" class="photo_maininfo">' +
                            '<label id="photo_user_img"></label>' +
                                '<div class="photo_maininfo_right">' +
                                '<p><b id="photo_user_name" class="photo_user_name"></b></p>' +
                                '<p id="photo_gender"></p>' +
                                '<p id="verify_logo"></p>' +
                            '</div>' +
                        '</div>' +
                        '<div id="popup_comment_loading" class="popup_comment_loading"></div>' +
                        '<div id="phone_comment_wrapper" class="phone_comment_wrapper hide">' +
                            '<div id="photolikes_user" class="photolikes_user">' +
                                '<div class="photolikes_user_left">' +
                                    '<a id="photo_like" class="btn_gray" ><img width="19" height="19" src="https://images.tmatch.com/popup-img/like.png"><span>Like</span></a>' +
                                '</div>' +
                            '</div>' +
                            '<div id="photo_submit_comments" class="photo_postmessage">' +
                                '<textarea placeholder="Send a comment about this photo..." maxlength="300"></textarea>' +
                                '<a id="pop_comment_submit" class="a_button a_button_primary popu_btn_right">Post a comment</a>' +
                            '</div>' +
                            '<div id="comment_show_error" class="comment_show_error"></div>' +
                            '<div id="comments_list" class="comments_list"><ul></ul></div>' +
                        '</div>' +
                    '</div>' +
                    '<div id="meet_other_bikers" style="position:absolute; bottom:60px; display:none;"><a>Meet other bikers with the same bike.</a></div>'+
                    '<div id="share_to"></div>'+
                '</div>';
                break;

                case 'stories':
                strVar +=
                '<div class="pop_content">' +
                    '<a class="popupimg_evt_close a_close_popupimg" href="javascript: void(0);"></a>' +
                        '<div id="pop_stories_btn" class="phptoalbum-next-btn" >' +
                        '<a id="pop_stories_prev" class="pop_stories_prev">&lt;&lt; prev</a>' +
                        '(<span id="show_now_pic_num"></span>)' +
                        '<a id="pop_stories_next" class="pop_stories_next">next &gt;&gt;</a>' +
                    '</div>' +
                    '<div class="pop_loading">' +
                        '<samp id="load_img" class="load_img"></samp><span id="photo_append"></span>' +
                        '<div id="pop_mouse_left" class="pop_mouse_left"></div><div id="pop_mouse_right" class="pop_mouse_right"></div>' +
                    '</div>' +
                    '<div class="pop_picture_decription" id="picture_decription" align="center"></div>' +
                '</div>';
                break;
                default :
                    strVar += '<div class="a_popup_type_error">The type error</div>';
            }
            var html=htmlWrapper='',type=this.g_popType, popup_type_class="";
            var htmlShadow = "<div id="+this.opts.shadowId+" class='a_popup_shadow'></div>";

            if(type == 'view' || type == 'self' || type == 'self_edit')
            popup_type_class = ' ' + defaults.typeClass[0];
            type == 'move_photo' && (popup_type_class = ' ' + defaults.typeClass[1]);
            type == 'stories' && (popup_type_class = ' ' + defaults.typeClass[2]);

            htmlWrapper = '<div id='+'"'+defaults.boxId+'"'+' class='+'"'+(defaults.boxClass + popup_type_class + ' a_popup_img_'+this.g_popType + ' a_popup_animate' + this.g_animate + this.g_addclass )+'"'+'oncontextmenu="return false">';
            html = htmlWrapper+strVar+"</div>"+htmlShadow;

            $("body").append(html);
            
            if(This.ifBrowser() == 'Safari'){
                $('#'+defaults.boxId).removeClass('a_popup_img_autowh');
            }

            $("#"+defaults.boxId).find('.popupimg_evt_close').bind("click",function(){
                This.close();
                return false;
            });
            $("#"+this.opts.shadowId).bind("click",function(){
                This.close();
            })
            This.ifPosition();
            return html;
        }
    }

    $.extend({
        popupimg:function(opt){
            var optMerge =$.extend(true, {}, defaults, opt);
            var newPopup = new fPopupimg(optMerge,opt);
            return newPopup;
        }
    });
})();
