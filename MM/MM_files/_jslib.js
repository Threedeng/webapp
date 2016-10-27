<!--

function send_email(p,new_win){
    if (new_win=='new'){
        window.open('send_email?'+p);
    }else{
        window.location.href='send_email?'+p;
    }
}

var win;
var xmlHttp;
var chats = new Array();

timedouturl = "index";

String.prototype.trim = function()
{
return this.replace(/(^\s*)|(\s*$)/g, "");
}
function RTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);
    if (whitespace.indexOf(s.charAt(s.length-1)) != -1)
    {
        var i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
        {
            i--;
        }
        s = s.substring(0, i+1);
    }
    return s;
}

function SetNewMails(unread) {
    if (unread > 0) {
        var html = '<div class="box_newsnum">' + unread + '</div>';
        jQuery('#newmailnumber').html(html);
    }
}
jQuery(document).ready(function() {
    if(jQuery('#newmailnumber').size() > 0) {
        try {
            jQuery.ajax({
                type: "GET",
                url: url_map_f('_get_webmail_new_mails_'),
                cache: true,
                dataType: "text",
                data: "usr_id=" + cur_usr_id,
                success: function(unread) {
                    SetNewMails(unread);
                }
            });
        } catch(e) {
        }
    }
});

function clickOnce(){
    clickOnceForm(document.update.submitbut);
}

function clickOnceForm(f){
    f.value = 'Please wait...';
    f.disabled=true;
}

function update_blog_submit() {
    clickOnce();
    document.update.action='blog_post';
    document.update.target='';
    document.update.submit();
}

function changeSbGifToPleaseWait(){
    document.getElementById("pleaseWait").innerHTML = "<input type='button' value=\"Please wait...\" disabled>";
}

function checkPopup(){
    if (!(win && win.open && !win.closed)) {
        var text = "Please enable popups on our site!";
        var html = "<P align=justify class=main_text_l><b>" + text + "</b></p>";
        //if (document.all && document.all.warning)
           // document.all.warning.innerHTML = html;
        //else if (document.getElementById('warning'))
          //  document.getElementById('warning').innerHTML = html;
    }
}

function PopUpEx2(sendLink, name, width, height, scrollbars, top, left) {
    mm= "width=" + width + ",height=" + height + ",scrollbars=" + scrollbars + ",resizable=" + scrollbars;
    if (top) {
        mm += ", top=" + top;
    }
    if (left) {
        mm += ", left=" + left;
    }
    win = window.open(sendLink, name, mm);
    if (win && win.open && !win.closed)
        win.focus();
    return win;
}

function PopUpEx(sendLink, name, width, height, scrollbars) {
    mm= "width=" + width + ",height=" + height + ",scrollbars=" + scrollbars + ",resizable=" + scrollbars;
    win = window.open(sendLink, name, mm);
    if (win && win.open && !win.closed)
        win.focus();
    return win;
}

function PopUp(sendLink, name, width, height, scrollbars) {
    PopUpEx(sendLink, name, width, height, scrollbars);
}

function PopUp2(sendLink, name, width, height, scrollbars, top, left) {
    PopUpEx2(sendLink, name, width, height, scrollbars, top, left);
}

function newwindow(a,windowname, width, height, scrollbars, process_link){
    var mm= "width=" + width + ",height=" + height + ",scrollbars=" + scrollbars + ",resizable=" + scrollbars;
    var url = a.href;
    var win = window.open(a.href, windowname, mm);
    if (win && win.open && !win.closed){
        win.focus();
    }
    if(process_link == null){
        process_link = false;
    }
   return process_link;
}

function modelesswin(url,mwidth,mheight,winname){
    if (document.all&&window.print){ 
        eval('window.showModelessDialog(url,winname,"help:0;resizable:1;dialogWidth:'+mwidth+'px;dialogHeight:'+mheight+'px")');
    }else{
        eval('window.open(url,winname,"width='+mwidth+'px,height='+mheight+'px,resizable=1,scrollbars=1")');
    }   
}

function fixForm(c)
{
  var i;
  var n = c.name;
  var l = c.form.elements.length;
  if (!c.checked) return;
  if (c.value == '0') {
    for (i = 0 ; i < l ; i++){
      var e = c.form.elements[i];
      if(e.name == n && e.value != c.value) e.checked=false;
    }
  } else {
    for (i = 0 ; i < l ; i++){
      var e = c.form.elements[i];
      if(e.name == n && e.value == '0') e.checked=false;
    }

  }
  return;
}

function popUpPayment() {
    window.open('/pay');
}

function im_guest_notice(fname){
    window.open('im_guest_notic.htm?fname='+fname);
}

function goldMemberOnly(message1,message2,message3)
{
   var mes;
   if ((message1==null) && (message2==null) && (message3==null)){
      mes = "This service is for gold members only. By becoming a gold member, you can access all services without restriction.";
   } else {
      if (message3!=""){
        mes=message3;
      }else{
        mes=message1;
        mes+= message2;
      }
   }
   modelesswin('goldMemberOnlyMessage_?message='+mes,440,486,'paymessage');
}

function subscribe_today(message1,message2,message3)
{
   var mes;
   if ((message1==null) && (message2==null) && (message3==null)){
      mes = "This service is for gold members only. By becoming a gold member, you can access all services without restriction.";
   } else {
      if (message3!=""){
        mes=message3;
      }else{
        mes=message1;
        mes+= message2;
      }
   }
   modelesswin('_subscribe_today?message='+mes,420,486,'paymessage');
}

function RevealProfile(nextPage) {
    var newHref = "set_hidden_?hide=0";
    if(nextPage!=null)
      newHref+="&next="+nextPage;
    window.location.href = newHref;
}

function profileIncomplete(){
     alert("Please complete your registration to use our services!");
     //window.location.href = "my_profile";
}

/* if needed, tries to increase the number of rows of a textarea */
function growTAVert (textarea) {
    if (typeof textarea == 'undefined')
        return;

    $(textarea).height('0px');
    var setheight = $(textarea).get(0).scrollHeight;
    if($(textarea).attr("_height") != setheight) {
        $(textarea).height(setheight+"px").attr("_height",setheight);
    } else {
        $(textarea).height($(textarea).attr("_height")+"px");
    }
}

function mc (id) {
    var obj = eval("document.forms.accounts.changed_" + id);
    obj.value = 1;
}

function checklogin()
{
    var ret = true;
    jQuery.ajax({
        type: "GET",
        url: url_map_f('_check_authen'),
        async: false,
        cache: false,
        success: function( msg ){
            ret = jQuery.trim(msg) == '1';
        }
    });

    return ret;
}

function syncForm(){
    var result = checklogin();
    if (!result) {
        alert("Sorry, your session has expired. \nCopy your message into notepad, sign in again and paste your message from notepad!");
    }

    return result;
}

function setSelectValue(sel,val) {
    if (typeof(sel) != 'undefined') {
        var i;
        for (i = 0; i < sel.length; i++) {
            if (sel.options[i].value == val) {
                sel.selectedIndex = i;
            }
        }
    }
}

function FullSize(url,ix,iy) {
    if(ix>0) {
        PopUp(url,"fsphoto",ix+6,iy+6,"no");
    }
}


function getFormFieldValue(field) {
    switch (field.type) {

        case "button" :
        case "file" :
        case "hidden" :
        case "password" :
        case "reset" :
        case "submit" :
        case "text" :
        case "textarea" :
            return field.value;

        case "select-one" :
            var i = field.selectedIndex;
            if (i == -1)
                return "";
            else
                return (field.options[i].value == "") ? field.options[i].text : field.options[i].value;

        case "select-multiple" :
            var result = new Array();
            for (var i = 0; i < field.options.length; i++)
                if (field.options[i].selected)
                    result[result.length] = (field.options[i].value == "") ? field.options[i].text : field.options[i].value;
            return result;

        case "radio" :
        case "checkbox" :
            if (field.checked)
                return field.value;
            else
                return "";

        default :
            if (field[0].type == "radio") {
                for (i = 0; i < field.length; i++)
                    if (field[i].checked)
                        return field[i].value;

                return "";
            } else if (field[0].type == "checkbox") {
                var result = new Array();
                for (i = 0; i < field.length; i++)
                    if (field[i].checked)
                        result[result.length] = field[i].value;

                return result;
            } else {
                // unknown field type
            }
            break;
    }
   
    return "";
}

function fixPiclist(obj, usr_id, picno) {
    var form = obj.form;
    var npics = $("input[name=npics__" + usr_id +"]").val();
    var makemain = $("input[name=makemain__" + usr_id +"]");
    var picno_main = npics > 1 ? ($("input:radio[name=makemain__" + usr_id +"]:checked").val()) : 0;
    if (picno_main == undefined) picno_main = -1;
    // clear the other rank

    var rank_input_names = new Array('rank', 'rank4', 'rankh', 'rankh103', 'rankh104')
    var r;
    if ((r = obj.name.match(/^(.*)__\d+$/)) && obj.checked == true && obj.name.substr(0, 10) != 'makemain__') {
        for (var i in rank_input_names) {
            $('input[name=' + rank_input_names[i] + '__' + usr_id +']').attr('checked', false);
        }
        $('input[name=' + r[1] + '__' + usr_id +']').attr('checked', true);
        
    }
    
    // undelete the main photo if setting a rank
    if ((obj.name.substr(0, 6) == 'rank__' ||
         obj.name.substr(0, 7) == 'rank4__' || obj.name.substr(0, 7) == 'rankh__') && obj.checked == true)
    {
        // if there is no main photo, then use first pic for main photo
        if (picno_main == -1) {
            picno_main = 0;
            if (npics > 1) {
                makemain.eq(0).attr('checked', 'checked');
            }
        }
        $("input[name=delp__" + usr_id + '_' + picno_main + "]").attr('checked', false);
        $("input[name=move2extra__" + usr_id + '_' + picno_main + "]").attr('checked', false);
        $("input[name=move2tatoo__" + usr_id + '_' + picno_main + "]").attr('checked', false);

    }

    // "undelete" the main photo
    if (obj.name.substr(0, 10) == 'makemain__' && picno == picno_main) {
        $("input[name=delp__" + usr_id + '_' + picno + "]").attr('checked', false);
        $("input[name=move2extra__" + usr_id + '_' + picno + "]").attr('checked', false);
        $("input[name=move2tatoo__" + usr_id + '_' + picno_main + "]").attr('checked', false);
    }

    if ((obj.name.substr(0, 6) == 'delp__' && obj.checked == true) || (obj.name.substr(0, 12) == 'move2extra__') || (obj.name.substr(0, 12) == 'move2tatoo__')) {
        if (obj.name.substr(0, 12) == 'move2extra__' || obj.name.substr(0, 12) == 'move2tatoo__')
        {
            $("input[name=delp__" + usr_id + '_' + picno + "]").attr('checked', false);
            if (obj.name.substr(0, 12) == 'move2extra__') {
                $("input[name=move2tatoo__" + usr_id + '_' + picno + "]").attr('checked', false);
            } else {
                $("input[name=move2extra__" + usr_id + '_' + picno + "]").attr('checked', false);
            }
        } else {
            $("input[name=move2extra__" + usr_id + '_' + picno + "]").attr('checked', false);
            $("input[name=move2tatoo__" + usr_id + '_' + picno + "]").attr('checked', false);
        }

        if (picno == 0 && npics == 1) {
            // set rank to 0
            for (var i in rank_input_names) {
                $('input[name=' + rank_input_names[i] + '__' + usr_id +']').attr('checked', false);
            }
        } else {
            // if pic to be deleted is the main photo,
            // then use the first not deleted pic for main photo
            if (picno == picno_main) {
                for (var i = 0; i < npics; i++) {
                     if (!($("input[name=delp__" + usr_id + '_' + i + "]").attr('checked')) && !$("input[name=move2extra__" + usr_id + '_' + picno + "]").attr('checked') && !$("input[name=move2tatoo__" + usr_id + '_' + picno + "]").attr('checked' )) {
                         makemain.eq(i).attr('checked', 'checked');
                         break;
                     }
                }
            } 

            // if all pics will be deleted, set rank to 0
            if (i == npics) {
                for (var i in rank_input_names) {
                    $('input[name=' + rank_input_names[i] + '__' + usr_id +']').attr('checked', false);
                }
                makemain.eq(picno_main).attr('checked', false);
            }
        }
    }
}

function RotateImg(obj, usr_id, picno, nocensor, cropping, message_id) {
    var angle = 0;
    var uid = usr_id + '_' + picno;
    if (message_id)
    {
        uid = uid + '_' + message_id;
    }
    angle = parseInt(document.getElementById("rangle__"+uid).value) + parseInt(obj.name);
    var rotation = 0;
    if(Math.abs(angle) >= 360)
        if(angle > 0) angle -= 360;  
        else angle += 360;  
    document.getElementById("rangle__"+uid).value = angle;
    //only for IE v.5.5 and above 
    if(navigator.appName=="Microsoft Internet Explorer"){
        if(angle < 0) angle += 360;
        switch (angle){
            case  90 : rotation = 3; break;
            case 180 : rotation = 2; break;
            case 270 : rotation = 1; break;
        }
        document.getElementById("photo__"+uid).style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + rotation + ")";
        if ($("#preview-pic"))
        {
            $("#preview-pic").css("filter", "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + rotation + ")");
        }
    } else {
        var url = "show_rotated_img_?usr_id=" + usr_id + "&picno=" + picno + "&angle=" + angle;
        if (nocensor) url += '&nocensor=1';
        if (cropping) url += '&cropping=1';
        document.getElementById("photo__" + uid).src = url;
        if ($("#preview-pic"))
        {
            var w =$("#preview-pic").css('width');
            var h = $("#preview-pic").css('height');
            $("#preview-pic").attr("src", url).css({'height': w, 'width': h});
        }
    }
    if (document.getElementsByName('pic_id')[picno])
    {
        document.getElementsByName('pic_id')[picno].checked = true;
    }
}

function RotateImgWithoutDB(obj, usr_id, picno, item_id, rotate_and_save, is_extra_picture, change_active) {
    var angle = 0;
    is_extra_picture = is_extra_picture || 0;
    var uid = usr_id + '_' + picno + '_' + item_id;
    if (rotate_and_save) {
        angle = parseInt(obj.name);
    } else {
        rotate_and_save = 0;
        angle = parseInt(document.getElementById("rangle__" + uid).value) + parseInt(obj.name);
    }
    var rotation = 0;
    if(Math.abs(angle) >= 360)
        if(angle > 0) angle -= 360;  
        else angle += 360;  
    document.getElementById("rangle__"+uid).value = angle;
    //only for IE v.5.5 and above 
    if(rotate_and_save == 0){
        if(angle < 0) angle += 360;
        angle = 360 - angle;
        rotation = angle / 90;
        $("#photo__"+uid).css({
            'filter' : "progid:DXImageTransform.Microsoft.BasicImage(rotation="+rotation+")",
            '-moz-transform': 'rotate(' + angle + 'deg)',
            '-o-transform': 'rotate(' + angle + 'deg)',
            '-webkit-transform': 'rotate(' + angle + 'deg)',
            'transform': 'rotate(' + angle + 'deg)'
        });
    } else {
        var url = "show_rotated_img_without_db_?usr_id=" + usr_id + "&picno=" + picno + "&item_id=" + item_id + "&angle=" + angle + '&is_extra_picture=' + is_extra_picture + '&change_active=' + change_active;
        if ($("#photo__" + uid).length) {
            var new_url = url + '&rotate_and_save=' + rotate_and_save + "&rn=" + Math.random();
            $("#photo__" + uid).attr('src', new_url);
            var original_img = $('#show_photo_' + picno + ' .original-photo');
            if (original_img.length) {
                original_img.attr('changed', 1);
            }
        }

        if ($("#preview-pic").length)
        {
            var preview_url = url;
            var w =$("#preview-pic").css('width');
            var h = $("#preview-pic").css('height');
            if (rotate_and_save) {
                preview_url = preview_url + '&rotate_and_save=0';
            }
            $("#preview-pic").attr("src", preview_url).css({'height': w, 'width': h});
        }
    }
}

function clickSearchOnce(){
    var html="<center><br><input type='submit' value='Please wait...' disabled></center>";
    if (document.getElementById('showsearch')) {
        document.getElementById('showsearch').innerHTML = html;
    } else if (document.all && document.all.showsearch) {
        document.all.showsearch.innerHTML = html;
    }
    return true;
}

function clickContinueOnce() {
    var html="<input type='submit' value='Please wait...' disabled>";
    if (document.check.showcontinue){
            document.check.showcontinue.innerHTML = html;
    }else if (document.getElementById('showcontinue')){
            document.getElementById('showcontinue').innerHTML = html;
    }
    return true;
}

function setRadioValue(f, name, value){
  var i;
  var l = f.elements.length;
  for (i = 0 ; i < l ; i++){
      var e = f.elements[i];
      if(e.name == name){
            e.checked = (e.value == value? true: false);
      } 
  }
}

function show_hide_dist(r) {
    try{
        var r_value = r.value;
        if (r.name != 'is_distance'){
            if (r.name.indexOf('_cou')!= -1 || r.name.indexOf('state')!= -1){ // is country
                r_value = 0;
            }else{
                r_value = 1;
            }
            setRadioValue(r.form, 'is_distance', r_value);   
        }
    } catch (e) {}
}

function checkMessages(theBox,theArray) {
        if ( theBox.checked ) {
            for (i = 0; i < theArray.elements.length; i++) {
                try{
                    theArray.elements[i].checked = true ;
                }catch(e){}
            }
            theBox.form.checkall.checked = true;
        } else {
            for (i = 0; i < theArray.elements.length; i++) {
                try{
                    theArray.elements[i].checked = false ;
                }catch(e){}
            }
            theBox.form.checkall.checked = false;
        }
}

function uncheckAll(theBox) {
    try {
        if (!theBox.checked) {
            $("input[name='checkall']").each(function(){
                this.checked="";
            });
        }
    } catch(e) {}
}

function checkForm(frm){
    var sel = false;
    if(frm.del.length){
        for(var i=0;i<frm.del.length;i++){ 
            if(frm.del[i].checked){
                sel = true;
                break;
            }
        }
    }
    else{
        sel = frm.del.checked;
    }
    if(!sel){
        $("#error_div").show();
        $("#error_profile_not_select").show();
        document.location ='#top';
        return false;
    }
    return true;
}

function registerAlert() {
    alert('Please register to use the feature');
}

function createHiddenFormElement(inputForm, elementName, elementValue){
    var newElement = document.createElement("INPUT");
    newElement.type = "HIDDEN";
    newElement.name = elementName;
    newElement.value = elementValue;
    return inputForm.appendChild(newElement);
}

// utility function to retrieve an expiration date in proper

// format; pass three integer parameters for the number of days, hours,

// and minutes from now you want the cookie to expire (or negative

// values for a past date); all three parameters are required,

// so use zeros where appropriate

function getExpDate(days, hours, minutes) {

    var expDate = new Date( );

    if (typeof days == "number" && typeof hours == "number" && 

        typeof hours == "number") {

        expDate.setDate(expDate.getDate( ) + parseInt(days));

        expDate.setHours(expDate.getHours( ) + parseInt(hours));

        expDate.setMinutes(expDate.getMinutes( ) + parseInt(minutes));

        return expDate.toGMTString( );

    }

}

// utility function called by getCookie( )

function getCookieVal(offset) {

    var endstr = document.cookie.indexOf (";", offset);

    if (endstr == -1) {

        endstr = document.cookie.length;

    }

    return unescape(document.cookie.substring(offset, endstr));

}

// primary function to retrieve cookie by name

function getCookie(name) {

    var arg = name + "=";

    var alen = arg.length;

    var clen = document.cookie.length;

    var i = 0;

    while (i < clen) {

        var j = i + alen;

        if (document.cookie.substring(i, j) == arg) {

            return getCookieVal(j);

        }

        i = document.cookie.indexOf(" ", i) + 1;

        if (i == 0) break; 

    }

    return "";

}

// store cookie value with optional details as needed

function setCookie(name, value, expires, path, domain, secure) {

    document.cookie = name + "=" + escape (value) +

        ((expires) ? "; expires=" + expires : "") +

        ((path) ? "; path=" + path : "") +

        ((domain) ? "; domain=" + domain : "") +

        ((secure) ? "; secure" : "");

}

// remove the cookie by setting ancient expiration date

function deleteCookie(name,path,domain) {

    if (getCookie(name)) {

        document.cookie = name + "=" +

            ((path) ? "; path=" + path : "") +

            ((domain) ? "; domain=" + domain : "") +

            "; expires=Thu, 01-Jan-70 00:00:01 GMT";

    }

}
// add to bookmark
function addBookmark(title, url)
{
    try
    {
        window.external.addFavorite(url, title);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e)
        {
            $.popup('<div style="font-weight: bold; margin: 15px">Press CTRL+D to bookmark the website after you click Done. Or simply click the star icon located on the address bar.</div>');
        }
    }
}

function getXMLHttpRequest()
{
    var http_request;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        return http_request;

}

function popupMsg(id){
       document.getElementById(id).style.display='';
}

function HideandUNhideObj(i){
        nav=document.getElementById('div'+i).style;
        con=document.getElementById('ul'+i);
        if(nav.display=="none"){
                // set mouseout function here
                nav.display = 'block';
                con.onmouseout = function(evt) {
                    if (checkMouseLeave(this, evt)) {
                        i = parseInt(this.id.substr(2));
                        nav=document.getElementById('div'+i).style;
                        nav.display = 'none';
                    }
                }
        } else {
                nav.display='none';
                con.onmouseout = function (evt) {
                    if (checkMouseLeave(this, evt)) {
                        i = parseInt(this.id.substr(2));
                        nav=document.getElementById('div'+i).style;
                        nav.display= 'none';
                    }
                }
        }
}

function checkMouseLeave (element, evt) {

  evt = (evt) ? evt : ((window.event) ? window.event : "");
  window.status = evt;
  if (evt.relatedTarget) {
    return !containsDOM(element, evt.relatedTarget);
  } else {
        if (element.contains(evt.toElement)) {
                return(false);
        } else {
                return(true);
        }
  }
}

function containsDOM (container, containee) {
  var isParent = false;
  do {
    if ((isParent = container == containee))
      break;
    containee = containee.parentNode;
  }
  while (containee != null);
  return isParent;
}

// for image show/hide

function getElementPosX(element) {
    var left = 0;
    if (element.offsetParent) {
        while (element.offsetParent) {
            left += element.offsetLeft;
            element = element.offsetParent;
        }
    } else if (element.x) {
        left += element.x;
    }
    return left;
}

function getElementPosY(element) {
    var top = 0;
    if (element.offsetParent) {
        while (element.offsetParent) {
            top += element.offsetTop;
            element = element.offsetParent;
        }
    } else if (element.y) {
        top += element.y;
    }
    return top;
}


function layoutImageBox(owner, box, offset, right_align, init_top) {
    try {
        if (typeof(offset) != 'undefined'){
            if (right_align) {
                box.style.left = getElementPosX(owner) - $(box).width() - offset + 'px';
            } else {
                box.style.left = getElementPosX(owner) + offset + 'px';
            }
        } else {
            if (right_align) {
                box.style.left = getElementPosX(owner) - $(box).width() + 'px';
            } else {
                box.style.left = getElementPosX(owner) + 'px';
            }
        }
        var scrolltop = 0;
        if (init_top) {
            scrolltop = init_top;
        }
        box.style.top = getElementPosY(owner) - scrolltop + 'px';
        box.style.visibility = 'visible';
    } catch (e) {
//        alert(e);
    }
}

function showFullImage(owner, url, linkto, offset) {
    try{
        imageBox = document.getElementById('image_box');
        imageBoxUrl = document.getElementById('image_box_url');
        var img = new Image();
        img.onload = function() {
            imageBox.src = img.src;
            w = img.width;
            h = img.height;
            max = 300.0;
            if (img.width > max) {
                scale = max / img.width;
                w *= scale;
                h *= scale;
            } else if (img.height > max) {
                scale = max / img.height;
                w *= scale;
                h *= scale;
            }
            imageBox.width = w;
            imageBox.height = h;
            img = null;
            layoutImageBox(owner, imageBox, offset);
        }
        img.src = url;
        imageBoxUrl.href = linkto;
    } catch (e) {
//        alert(e);
    }
}

function show_full_img(owner, url, linkto, offset, right_align, init_top ) {
    var re = /(woman|man|couple|unknow).*\.png/;
    if (re.test(url)) {
        return;
    }
    try{
        var imageBox;
        if ( document.getElementById("image_box") ) {
            imageBox = $('#image_box');
        } else {
            imageBox = $('<div id="image_box" style="position:absolute; visibility:hidden; left:0px; top:0px;" onmouseout="this.style.visibility = \'hidden\'"></div>');
        }
        imageBox.css('z-index' , '9999' );        
        imageBox.appendTo( $(document.body) ); 

        var img = new Image();
        img.onload = function() {
            w = img.width;
            h = img.height;
            max = 300.0;
            if (img.width > max) {
                scale = max / img.width;
                w *= scale;
                h *= scale;
            } else if (img.height > max) {
                scale = max / img.height;
                w *= scale;
                h *= scale;
            }
            imageBox.css({width: w, height: h, cursor: "pointer"});
            $(img).css({width: w, height: h});
            $(img).bind("click", function(){
               eval(linkto);
            });
            imageBox.empty();
            imageBox.append(img);
            img = null;
            layoutImageBox(owner, imageBox[0], offset, right_align, init_top);
        }
        $(img).attr("src", url);
    } catch (e) {
    //    alert(e);
    }
}

function hidden_full_img() {
    $('#image_box').css("visibility","hidden");
}

function text_change(object, resultFieldID, maxLength) {
    var ilen = maxLength - object.value.length;
    $('#' + resultFieldID).val(ilen > 0 ? ilen : 0);
    setMaxLength(object, maxLength);
}

function setMaxLength(object,length) {

    var tempString=object.value;

    if(tempString.length>length) {
        tempString=tempString.substr(0,length);
        object.value=tempString;    
    }
}

function check_Character(ta,len,text,length) {
    var ilen = ta.value.length;
    if (ilen < length) {
        document.getElementById(len).innerHTML = length - ilen;
    } else {
        document.getElementById(len).innerHTML = 0;
    }
    setCharacterText(ta,length);
}

function setCharacterText(object,length) {
    var tempString=object.value;
    if (tempString.length > length) {
        tempString=tempString.substr(0,length);
        object.value=tempString;
    }
}


function check_username_email(mark) {
    var username = $("#username").val().trim();
    if (!username) username = $("#username").html().trim();
    var email = document.update.email.value.trim();
    var email_repeat = document.update.email_repeat.value.trim();

    var emailname = email.substring(0, email.indexOf('@'));
    var pattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var pattern_aol = /\@aol\.com$/i;
    var u_name_pattern = /^\w+$/;
    var msg = '<span style="font-size:10px; color: red;">Your username and email address name can not be the same.</span>';
    var msg_by_email = '<span style="font-size:10px; color: red;">Your email name should not be the same as your username.</span>';

    if (email.length > 0 && !(pattern.test(email))) {
        $('#show_invalid_email').html('<span style="font-size:10px;">Your email address is invaild. please choose a vaild one.</span>');
    } else {
        $('#show_invalid_email').html('');
    }
    
    if (email.length > 0 && (pattern_aol.test(email))) {
        $('#show_aol_email_warning').html('For a better experience on our site, we recommend you register with another email provider instead of AOL. Emails sent to AOL addresses might not arrive on time.');
    } else {
        $('#show_aol_email_warning').html('');
    }

    if (email.length > 0 && email_repeat.length > 0 && email != email_repeat) {
        $('#show_diff_email').html('<span style="font-size:10px;">Your email address didn\'t match. Try again</span>');
    } else {
        $('#show_diff_email').html('');
    }

    if (username.length > 0) {
        if (username.toLowerCase() == emailname.toLowerCase()) {
            $('#showalert').html(msg);
            $('#showalert_by_email').html(msg_by_email);
            if(Math.floor(Math.random() * 2)){
                document.update.username.focus();
            }else{
                document.update.email.focus();
            }
        } else if (!u_name_pattern.test(username) ) {
            msg = '<span style="font-size:10px; color: red;"><b>Username can only contain a-z, A-Z, 0-9, and _.<b></span>';
            $('#showalert').html(msg);
        } else if (/^\d+$/.test(username)) {
            msg = '<span style="font-size:10px; color: red;"><b>Your username must include a letter or the underscore symbol _</b></span>';
            $('#showalert').html(msg);
        } else if (username.length < 6 || username.length > 16) {
            $('#showalert').html('<span style="font-size: 10px; color: red;" ><b>Username should be 6-16 characters. No spaces or special characters.</b></span>');
        } else if (mark == 1) {
            $.ajax({
                type: 'post',
                url: url_map_f('_check_username'),
                data: "username=" + username + "&ajaxRequestUncache=" + parseInt(Math.random() * 1000000),
                dataType: "xml",
                success: function(data) {
                    $("#username").val($(data).find("checkusername").find("username").text().trim());
                    $('#showalert').html('<span style="font-size: 10px;">' + $(data).find("checkusername").find("description").text().trim() + '</span>');
                }
            });
        } else {
            $('#showalert').html('');
            $('#showalert_by_email').html('');
        }
    } else {
        $('#showalert').empty();
    }
}

function check_fname() {
    var fname = document.update.fname.value;
    if (fname.match(/^[a-zA-Z]*$/)) {
        $('#show_fname_alert').html('');
        $('#show_fname_alert').hide();
    } else {
        $('#show_fname_alert').html('<span style="font-size:10px; color: red;">First name may only contain letters.</span>');
        $('#show_fname_alert').show();
    }
}

function show_hide(obj_name) {
    var obj = document.getElementById('s_h_'+obj_name);
    var div_link_obj = $("#div_s_h_t_" + obj_name);
    var link_text_obj = $("#s_h_t_" + obj_name);
    var showhide = document.getElementsByName(obj_name);
    var hideselect = document.getElementsByName(obj_name)[0];
    if(obj.style.display=='') {
        obj.style.display='none';
        div_link_obj.attr("class", "plus_arrow");
        link_text_obj.val();
        link_text_obj.html('Show');
        for (var i = 0;i < showhide.length;i++) {
            showhide[i].checked = false;
            if (showhide[i].value == "0") {
                showhide[i].checked = true;
            }
        }
        if (obj_name == 'match_height') {
            $('#'+obj_name+'_min_all').get(0).selectedIndex=0;
            $('#'+obj_name+'_max_all').get(0).selectedIndex=$('#'+obj_name+'_max_all option').length-1;
        }
        if (hideselect != undefined && hideselect.options != undefined) {
            for (var i=0; i < hideselect.options.length; i++) {
                hideselect.options[i].selected = false;
                if (i == (hideselect.options.length - 1)) {
                    hideselect.options[i].selected = true;
                }
            }
        }
        if (obj_name == 'keywords') {
            $("input[name=keywords]").val('optional');
            $("input[name=keywords]").css('color','#818181');
        }
    } else {
        analytics_event_tracking('search_option_select', obj_name);
        obj.style.display='';
        div_link_obj.attr("class", "minus_arrow_down");
        link_text_obj.html('Hide');
    }
}

function show_hide_form() {
    try {
        var board = document.getElementById("past_board");
        if (board.style.display == 'none') {
               board.style.display = ''
        }else{
          board.style.display = 'none'
        }
    } catch(e) {
//        alert(e);
    }
}

function layoutImageBoxMenu(owner, box) {
    try {
        box.style.left = getElementPosX(owner) + owner.width + 'px';
        box.style.top  = getElementPosY(owner) + 'px';
        box.style.visibility = 'visible';
    } catch (e) {
//        alert(e);
    }
}

function showFullImageMenu(owner, url, height) {
    try{
        imageBox = document.getElementById('image_box');
//      imageBoxUrl = document.getElementById('image_box_url');
        var img = new Image();
        img.onload = function() {
            imageBox.src = img.src;
            w = img.width;
            h = img.height;
            max = 300.0;
            if (img.width > max) {
                scale = max / img.width;
                w *= scale;
                h *= scale;
            } else if (img.height > max) {
                scale = max / img.height;
                w *= scale;
                h *= scale;
            }
            imageBox.width = w;
            imageBox.height = h;
            img = null;
            layoutImageBoxMenu(owner, imageBox);
        }
        img.src = url;
//        imageBoxUrl.href = linkto;
    } catch (e) {
//        alert(e);
    }
}

function IsShowSelectProfileError(targetId,frm){
    if(IsSelectProfile(frm)){
        return true;
    } else {
            window.location.href="#";
        target = document.getElementById(targetId);
        target.style.display="";
        return false;
    }
}

function IsSelectProfile(frm){
    var format = /^mark_[0-9]{1,}$/i;
    var userlists="";
    for (i = 0; i < frm.elements.length; i++) {
        try{
           if(format.test(frm.elements[i].name)){
             if(!frm.elements[i].checked) {
                 continue;
             }
             var param=frm.elements[i].name.split("_");
             if(userlists!=""){
                userlists=userlists+"_";
             }
             userlists=userlists+param[1];
           }
        }catch(e){}
    }
    if(userlists=="") {
       return false;
    } else {
        return true;
    }
}

function deleteBatch(theBox,theArray) {
    var has_selected = 0;

    $('input[type="checkbox"][name^="email_"][value*="@"]').each(function() {
        if ($(this).attr('checked')) {
            has_selected = 1;
            return;
        }
    });

    if (has_selected == 0) {
        $('#invite_pending_error_msg').show();
        return;
    }

    $('#invite_pending_error_msg').hide();

    if(confirm('Are you sure you want to remove these emails from invite history?'))
    {
        theArray.delete_batch.value=1;
        theArray.submit();
    }
}

function jquery_show_search_omitted_profile (match_id){
    jQuery("#proflie_show_" + match_id).hide();
    jQuery("#space_" + match_id).hide();
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=search_user_show&match_id=" + match_id,
        success: function(){
        }
    });
}

function dd(show) {
    var min_obj  = $("#min" + show);
    var max_obj  = $("#max" + show);

    if (min_obj.is(":hidden")) {
        min_obj.show();
        max_obj.hide();
    } else {
        min_obj.hide();
        max_obj.show();
    }
}


var starCount = new Array();
var rateArr = new Array("Poor", "Nothing Special", "Worth Watching", "Pretty Cool", "Awesome!");
var isRated = false;
var rateScore;
function showStars(id) {
    if(isRated)
        return false;

    for (var i = 0,j = 1; i < id ; i++,j++)
    {
        starCount[i] = document.getElementById("star_" + j);
        starCount[i].src = "https://images.tmatch.com/stars/red_star.gif";
    }
    for(var i = id,j = id+1; i < 5 ; i++,j++)
    {
        starCount[i] = document.getElementById("star_" + j);
        starCount[i].src = "https://images.tmatch.com/stars/gray_star.gif";
    }

    showRates(id);
}

function showRates(id){
    var msg = document.getElementById("message");
    var msg_content = '';
    if (id > 0) {
        msg_content = rateArr[id-1];
    }
    msg.innerHTML = msg_content;
    rateScore = id;
}

function add_rate_count(video) {
    if(isRated == true) return false;
    
    var http_request;
    http_request=getXMLHttpRequest();
    http_request.open('GET', '/add_rate_count_?video='+video+'&score='+rateScore+'&ajaxRequestUncache='+parseInt(Math.random() * 1000000), true);
    for(var i=1;i<6;i++){
        if(i <= rateScore) {
            document.getElementById("a" + i).innerHTML = "<img border='0' src='https://images.tmatch.com/stars/red_star.gif'>";
         } else {
             document.getElementById("a" + i).innerHTML = "<img border='0' src='https://images.tmatch.com/stars/gray_star.gif'>";
          }
     }
        http_request.onreadystatechange =  function(){
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    var info = http_request.responseText;
                    if(info.trim()=='1'){
                        document.getElementById("thanks").style.display = "block";
                        document.getElementById("message").style.display = "none";
                        document.getElementById("rate").style.display = "none";                  
                    }
                } else {
                    alert('There was a problem with the request.');
            }
       }
    }
    http_request.send(null);
    isRated = true;
}

function highlightStatus(status) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('highlight_status_'),
        data: "status=" + status,
        success: function( msg ){
            window.location='/get_highlight_and_featured?status='+msg;
        }
    });
}

function email_replies(status) {
    var http_request;
    http_request=getXMLHttpRequest();
    http_request.open('GET', '/email_replies_status_?status='+status+'&ajaxRequestUncache='+parseInt(Math.random() * 1000000), true);
        http_request.onreadystatechange =  function(){
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    var info = http_request.responseText;
                    if(jQuery.trim(info)=='1'){
                        window.location.reload();                
                    }
                } else {
                    alert('There was a problem with the request.');
            }
       }
    }
   http_request.send(null);
}

function deleteConfirm()
{
    var count=0;
    var obj = document.forms.del_form.del;
    if (obj == null)
        return false;
    
    if (obj.length == null)//only one
    {
        if( obj.checked)
            count=1;
    }else {
        for(i = 0; i < obj.length; i++)
            if ( obj[i].checked )
                count++;
    }        
    if (count==0)
    {
        tip_text = 'Note: Please select the topics first!';
        $.popup(tip_text, {
            button:[
                {
                    val: "OK",
                }
            ]
        });
        return false;
    } else {
        tip_text = 'Are you sure you want to remove the checked topics?';
        $.popup(tip_text, {
            button:[
                {
                    val: "Yes",
                    callback:function(){
                        $.popup().close();
                        return $("form[name='del_form']")[0].submit();
                    }
                },
                {
                    val: "No",
                }
            ]
        });
        return false;
    }
}

function dyniframesize(iframename) {
  var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
  var FFVersion = getFFVersion.substr(0,2)
  //extra height in px to add to iframe in FireFox 1.0+ browsers
  var FFextraHeight=FFVersion>=0.1? 30 : 0 

  var pTar = null;
  if (document.getElementById){
    pTar = document.getElementById(iframename);
  }
  else{
    eval('pTar = ' + iframename + ';');
  }
  if (pTar && !window.opera){
    //begin resizing iframe
    pTar.style.display="block";
    
    if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){
      //ns6 syntax
      pTar.height = pTar.contentDocument.body.offsetHeight+FFextraHeight; 
      pTar.width = pTar.contentDocument.body.scrollWidth;
    }
    else if (pTar.Document && pTar.Document.body.scrollHeight){
      //ie5+ syntax
      pTar.height = pTar.Document.body.scrollHeight;
      pTar.width = pTar.Document.body.scrollWidth;
    }
  }
}

function dont_allow_newuser_add_favorites (id) {
    jQuery('span#addFavoritesInfo'+id).html('<font color="blue">We are sorry, but you may add to favorites only after your profile has been approved by our staff</font>');
}

function jquery_add_to_favorite_by_class (username, match_id) {
    jQuery(".favorite_add_" + username).html("<b>saving...</b>");
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=favorite_add&match_id=" + match_id,
        success: function(info){
            if (info == 'no_permission') {
                show_no_permission();
                return false;
            }
            jQuery(".favorite_add_" + username).html('Already in <a href="https://www.millionairematch.com/favorites" target="_blank">favorites</a>');
            if (info && info.length > 10) {
                $.popup(info);
            }
        }
    });
}

function jquery_hide_search_profile ( match_id ) {
    //jQuery("#proflie_show_" + match_id).hide();
    //jQuery("#featured_show_" + match_id).hide();
    //jQuery("#proflie_show_" + match_id).html("<b>loading...</b>");

    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=search_user_hide&match_id=" + match_id,
        success: function(){
            $('#proflie_show_' + match_id).hide('normal');
            $('#space_' + match_id).hide();
        }
    });
}

function jquery_show_search_profile ( match_id ) {
    jQuery("#proflie_hide_" + match_id).hide();
    //jQuery("#proflie_show_" + match_id).html("<b>loading...</b>");

    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=search_user_show&match_id=" + match_id,
        success: function(){
            jQuery("#proflie_show_" + match_id).show();
            jQuery("input[name='mark_" + match_id + "']").attr("disabled", "");
        }
    });
}

function add_video_to_favorite(video) {
    var favorite = document.getElementById("is_in_favorite_"+video);
    var favorite_num = document.getElementById("favorite_num");
    jQuery.ajax({
          type: "POST",
          url: url_map_f('add_video_to_favorite_'),
          data: "frompage=videos&video_to_favorite=" + video,
          success: function(info){
                favorite.innerHTML = 'already in <a href="https://www.millionairematch.com/videos?my_favorite=1">favorites</a>';
                favorite_num.innerHTML = "(" + info + ")";
          }
      });
}

function jquery_add_forum_to_favorite (topic_id) {
    jQuery("#save_topic").html("<b><label>saving...</label></b>");

    jQuery.ajax({
        type: "POST",
        url: url_map_f('_forum_by_jquery'),
        data: "action=add&id=" + topic_id,
        success: function(){
            $('#forum_fav_done').show();
            $('#forum_fav').hide();
        }
    });
}

function jquery_remove_forum_from_favorite (topic_id) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_forum_by_jquery'),
        data: "action=remove&id=" + topic_id,
        success: function(){
            $('#forum_fav_done').hide();
            $('#forum_fav').show();
        }
    });
}

function on_search_focus(obj) {
    obj.style.color = '#000000';
    obj.value = '';
}

function on_search_blur(obj) {
  if (obj.value == '') {
        obj.style.color='#818181';
        obj.value = "username or title";
  }
}

function show_whole_comments(obj) {
    $(obj).parent("span").css('display', 'none');
    $(obj).parent("span").next().css('display', 'block');
}


function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ChangeColor(obj){
    document.getElementById("show_color").value=obj.options[obj.selectedIndex].value;
    obj.options[obj.selectedIndex].selected=true;
    document.getElementsByName("c_color").item(0).style.color = obj.options[obj.selectedIndex].value;
    $('#text').css({'color': obj.value});
    obj.style.background = obj.value;
}

function checkImgType(fileURL, allow_pdf, allow_txt_type){
    if (allow_pdf){
        var right_type=new Array(".gif",".jpg",".jpeg",".png",".bmp", ".pdf")
    } else if (allow_txt_type) {
        var right_type=new Array(".doc",".txt", ".pdf")
    } else {
        var right_type=new Array(".gif",".jpg",".jpeg",".png",".bmp")
    }
    var right_typeLen=right_type.length;
    var imgUrl=fileURL.toLowerCase();
    var postfixLen=imgUrl.length;
    var len4=imgUrl.substring(postfixLen-4,postfixLen);
    var len5=imgUrl.substring(postfixLen-5,postfixLen);
    for (i=0;i<right_typeLen;i++) {
        if((len4==right_type[i])||(len5==right_type[i])) {
            return 1;
        }
    }
    return 0;
}

function selectall (name, value) {
    if(value==1){
        $('input[name='+ name + ']').attr('checked',true);
    } else {
        $('input[name=' + name + ']').attr('checked',false);
    }
}

function check_all (name, tag) {
    if(tag==1){
        $('input[name='+ name + ']').each(function() {
            if ($(this).val() != 0) {
                $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });
    } else {
        $('input[name='+ name + ']').each(function() {
            if ($(this).val() != 0) {
                $(this).attr("checked", false);
            } else {
                $(this).attr("checked", true);
            }
        });
    }
}

function saveCallData(usr_id, val, phone_location){
    if(val==1){
        PopUp('/de/censor_call_log_?prof_id=' + usr_id + '&phone_location=' + phone_location, 'user_call_log', 600, 400, 'yes');
    }
}

function sendCallRemind(prof_id, username) {
    if (confirm("Are you sure you want to send this user a chargeback email?")) {
        jQuery.ajax({
            type: "GET",
            url: url_map_f('censor_send_call_remind_?prof_id=' + prof_id + '&username=' + username),
            success: function( msg ) {
               if (jQuery.trim(msg) == '1') {
                   window.location.reload();
               }
            }
        });
    }
}

function send_verification_request(usr_id, to_email) {
    if (usr_id == '' || usr_id <= 1)
        return;

    $.getJSON(
        url_map_f("censor_send_verification_request_"), 
        { prof_id: usr_id, to_email: to_email, random: Math.random() },
        function(info) {
            if (info.ret == 1) {
                $('.verification_request_' + usr_id).html('<b>Sent out successfully!</b>');
            } else {
                alert(info.error);
            }
    });
}

function visible_quote(item) {
    $("#quote_" + item).toggle();
    if ($("#quote_title_" + item).text() == "- Hide quoted text -") {
        $("#quote_title_" + item).html("- Show quoted text -");
    } else {
        $("#quote_title_" + item).html("- Hide quoted text -");
    }
}

function review_picture_size(pixel, custom_size) {
    var max_img_pixel = custom_size * 1024 * 1024;
    var min_img_pixel = 144 * 144;
    if (pixel.files[0]) {
        if (pixel.files[0].size > max_img_pixel) {
            $(".submit_comment_button").attr("disabled","disabled");
            if (custom_size == 5) {
                $.popup('<h2 class="a_float_error"><i></i><span>Sorry! Photo is over 5MB. Please upload another photo.</span><h2>');
            } else {
                $.popup('<h2 class="a_float_error"><i></i><span>Sorry! Photo is over 3MB. Please upload another photo.</span><h2>');
            }
            $(".blog_or_forum_img_error").hide();
        } else if (pixel.files[0].size < min_img_pixel) {
            $(".submit_comment_button").attr("disabled","disabled");
            $(".blog_or_forum_img_error").show();
        } else {
            $(".submit_comment_button").removeAttr("disabled");
            $(".blog_or_forum_img_error").hide();
        }
    }
}
// ######################invite page, check email begin#####################
function error_show(msg) {
    $("#error").show();
    $("#error_msg").html(msg);
    return false;
}

function checkemail(str) {
    if (str.length < 1 || str.length > 100) return false;
    if (str.indexOf('@', 0) == -1 || str == "" || str.indexOf('.', 0) == -1) return false;
    thePos = str.indexOf('@', 0) + 1
    if (str.indexOf('@', thePos) != -1 || str.indexOf(';', thePos) != -1 || str.indexOf(',', thePos) != -1 || str.indexOf(' ', thePos) != -1) return false;
    return true;
}

function flash_element(element_id) {
    var obj = document.getElementById(element_id);
    obj.style.visibility = obj.style.visibility == "hidden" ? "visible" : "hidden";
    setTimeout("flash_element('" + element_id + "')", 500);
}

function YYDD(year,month,day){

    MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var day_value = day.options[day.selectedIndex].value;
    var year_value = year.options[year.selectedIndex].value;
    var n = MonHead[month.selectedIndex];

    if (month.selectedIndex == 1 && IsPinYear(year_value)){
        n++;
    }

    if (day_value > n) {
        day_value = n;
    }

    writeDay(n, day);
    day.value = day_value;
}

function MMDD(year,month,day){

    MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var day_value = day.options[day.selectedIndex].value;
    var year_value = year.options[year.selectedIndex].value;
    var n = MonHead[month.selectedIndex];

    if (month.selectedIndex == 1 && IsPinYear(year_value)){
        n++;
    }
    if (day_value > n) {
        day_value = n;
    }

    writeDay(n, day);
    day.value = day_value;

}

function writeDay(n, day){
    var e = day;
    optionsClear(e);
    for (var i=1; i<(n+1); i++){
        e.options.add(new Option(i,i));
    }
}

function IsPinYear(year){
    return(0 == year%4 && (year%100 !=0 || year%400 == 0));
}

function optionsClear(e){
    for (var i=e.options.length; i>=0; i--)
    e.remove(i);
}

function UpdateCountryInfoByJSON() {
    cou_id = $('select[name=country]').val();
    $.getJSON(
        "js_fill_states.xml",
        {country: cou_id, type: 'json'},
        function(json){
            cLeng = json.countries.length;
            options = '';
            for(var i=1; i < cLeng; i++){
                options += '<option value="' + json.countries[i].value + '">' + json.countries[i].text + '</option>';
            }
            $("select[name=state_id]").empty();
            $("select[name=state_id]").html(options);
        }
    );
}

function jquery_request_photo(about_id, img) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_request_photo'),
        data: "about_id=" + about_id,
        success: function(data){
            if (data == 'no_permission') {
                show_no_permission();
                return false;
            } else {
                var request_photo_id = $('#request_photo_' + about_id);
                if (request_photo_id.length == 0) {
                    request_photo_id = $('.request_photo_' + about_id);
                }
                if (request_photo_id.hasClass('font_deep_blue')) {
                    request_photo_id.removeClass('font_deep_blue');
                    request_photo_id.addClass('font_deep_gray');
                }
                request_photo_id.html('Request sent');
                request_photo_id.parent().css("cursor", "default");
                request_photo_id.parent().removeAttr("onclick");
                request_photo_id.parent().css("background-image", "url('" + img +" ')");
                $('#request_photo_' + about_id + '_2').html('Request successfully sent. Check back soon.');
            }
        }
    });
}

function ask_to_verify(usr_id, about_id, div_has_id) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_request_photo'),
        data: {usr_id: usr_id, about_id: about_id, action: 'request_verify_photo'},
        success: function(msg) {
            if (jQuery.trim(msg) == '1') {
                if (div_has_id) {
                    $('#ask_to_verify_' + about_id).html('Request sent successfully<br />');
                } else {
                    $('#ask_to_verify').html('Request sent successfully<br />');
                }
            } else if (jQuery.trim(msg) == '2') {
                var alert_text = '                    <div class="a_popup_wrapper"><div class="a_popup_container">                        <i class="a_delete"><a href="javascript:void(0)" onclick="$(\'.a_popup_wrapper\').hide();$(\'.a_popup_shadow\').hide();"></a></i>                        <h2>Be accommodating,verify your photos first before sending the request.</h2>                        <div class="a_popup_btns"><a class="a_button a_button_primary" href="https://www.millionairematch.com/verified?verify_action=photo" style="width:auto; padding-left:15px; padding-right:15px; text-decoration:none;">Verify my photos now</a></div>                    </div></div><div class="a_popup_shadow"></div>';
                add_new_item_by_id('ask_to_verify_div', alert_text);
            }
        }
    });
}

function ask_to_verify_income(usr_id, obj) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_request_verify'),
        data: { prof_id: usr_id, action: 'request_verify_income'},
        success: function() {
            var linkDom = $(obj);
            var img_obj = $(obj).find('img');
            img_obj.attr('alt' , 'Request sent' );
            linkDom.removeAttr('onclick');
            img_obj.remove();
            linkDom.html('');
            linkDom.append( img_obj );
            linkDom.append( 'Request sent');
        }
    });
}

function add_new_item_by_id(box_id, text) {
    if ($("#" + box_id).length>0) {
        $("#" + box_id).html(text);
    } else {
        $(document.body).append('<div id="' + box_id + '">' + text + '</div>');
    }
}

function jquery_vote_blog_topic (blog_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&blog_id=" + blog_id,
        success: function(data){
            if (vote == 1) {
                var like_word = ' Like';
                if (data > 1) {
                    like_word = ' Lkes';
                }
                like_word = data + like_word;
                jQuery("#vote_" + blog_id).html('<img src="https://images.tmatch.com/common/like_up_new.png" border="0" title="Already voted" />' + like_word);
            } else {
                jQuery("#vote_" + blog_id).html(data + ' down');
            }
        }
    });
}

function jquery_vote_blog_msg(msg_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&msg_id=" + msg_id,
        success: function(data){
            if (vote == 1) {
                var like_word = ' Like';
                if (data > 1) {
                    like_word = ' Likes';
                }
                like_word = data + like_word;
                jQuery("#msg_" + msg_id).html('<img src="https://images.tmatch.com/common/like_up_new.png" border="0" title="Already voted" />' + like_word);
            } else {
                jQuery("#msg_" + msg_id).html(data + ' down');
            }
        }
    });
}

function jquery_vote_forum(msg_id) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: { vote: 1, forum_msg_id: msg_id},
        success: function(data){
            var like_word = ' Like';
            if (data > 1) {
                like_word = ' Likes';
            }
            like_word = data + like_word;
            jQuery("#forum_likes_" + msg_id).html(like_word);
            jQuery("#forum_likes_" + msg_id).parent().addClass('done').removeAttr('onclick');
        }
    });
}

function on_element_blur(obj, default_val) {
    if (obj.value == '') {
        obj.value = default_val;
        obj.style.color='#818181';
    }
}

function on_element_focus(obj, default_val) {
    if (obj.value == default_val) {
        obj.value = '';
        obj.style.color='#000000';
    }
}

// Photo upload pop on user_details page
var popupStatus = 0;

//loading popup with jQuery magic!
function loadPopup() {
    //loads popup only if it is disabled
    if (popupStatus == 0) {
        $("#backgroundPopup").css({
            "opacity": "0.7"
        });
        $("#backgroundPopup").fadeIn("slow");
        $("#popupContact").fadeIn("slow");
        popupStatus = 1;
    }
}

function disablePopup() {
    //disables popup only if it is enabled
    if (popupStatus == 1) {
        $("#backgroundPopup").fadeOut("slow");
        $("#popupContact").fadeOut("slow");
        popupStatus = 0;
    }
}

function checkUserID () {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_check_authen'),
        success: function(){}
    }); 
}

function add_or_replace_str(source, oldstr, newstr) {
    if (source.indexOf(oldstr) >= 0) {
        source = source.replace(oldstr, newstr);
    } else {
        source = source + newstr;
    }

    return source;
}

function jquery_save_mail_to_draft (obj, to, subject, text, del_draft_msg_id) {
    $(obj).attr('disabled', 'disabled');
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_save_mail_to_draft'),
        data: { to: to, subject: subject, text: text, del_draft_msg_id: del_draft_msg_id },
        success: function(data) {
            $('#del_draft_msg_id').val(data);
            $(obj).val('Saved to draft');
        }
    });
}
function jquery_delete_draft(del_draft_msg_id) {
    jQuery.ajax({
        type: "GET",
        url: url_map_f('_save_mail_to_draft'),
        data: "only_delete_draft=1&del_draft_msg_id=" + del_draft_msg_id,
        success: function() {}
    });
}
function add_card_to_favorite(card) {
    var favorite = document.getElementById("favorite_" + card);
    jQuery.ajax({
        type: "POST",
        url: url_map_f('add_card_to_favorite_'),
        data: "card_id=" + card,
        success: function() {
            favorite.innerHTML = "already in <a href=\"/customize_greeting_cards?favorite=1\">favorites</a>";
        }
    });
}

function add_cards_to_favorite() {
    var checkboxes = $("input[name='cards']");
    var params = '';
    var values = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            params += '&cards_id=' + checkboxes[i].value;
            values.push(checkboxes[i].value);
        }
    }
    jQuery("input[type='checkbox']").attr("checked", false);
    jQuery.ajax({
        type: "POST",
        url: url_map_f('add_card_to_favorite_'),
        data: "favorite=0" + params,
        success: function() {
            show_tip();
        }
    });
    var show_tip = function() {
        for (var i = 0; i < values.length; i++) {
            document.getElementById("favorite_" + values[i]).innerHTML = "already in <a href=\"/customize_greeting_cards?favorite=1\">favorites</a>";
        }
    }
}

function dele_card_from_favorite(card) {
    if (confirm("Are you sure you want to remove the card from your favorites?")) {
        jQuery.ajax({
            type: "POST",
            url: url_map_f('customize_greeting_cards'),
            data: "favorite=1&delete_from_favorite=" + card,
            success: function(){
                window.location.reload();
            }
        });
    }
}

function show_hide_group(div_id, icon_id) {
    var div_obj  = $("#" + div_id);
    var icon_obj = $("#" + icon_id);
    if (div_obj.is(":hidden")) {
        div_obj.show();
        icon_obj.attr("class", "minus"); 
    } else {
        div_obj.hide();
        icon_obj.attr("class", "plus"); 
    }
}

function show_hide_profile(tr_id, icon_id, a_id) {
    var tr_obj_one;
    var tr_obj_two;
    if (tr_id == 'profile_my_video') {
        tr_obj_one = $("#" + tr_id + '_url');
        show_hide_profile_special(tr_id + '_url', tr_id + '_description', icon_id);
    } else if (tr_id == 'profile_customized') {
        tr_obj_one = $("#" + tr_id + '_title');
        show_hide_profile_special(tr_id + '_title', tr_id + '_content', icon_id);
    } else if (tr_id == 'profile_dating_history') {
        tr_obj_one = $("#" + tr_id + '_number');
        show_hide_profile_special(tr_id + '_number', tr_id + '_record', icon_id);
    } else {
        tr_obj_one = $("#" + tr_id);
        show_hide_group_arrow(tr_id, icon_id);
    }
    if (tr_obj_one.is(":hidden")) {
        $("#" + a_id).html('Show');
    } else {
        $("#" + a_id).html('Hide');
    }
}

function show_hide_group_arrow(div_id, icon_id) {
    var div_obj  = $("#" + div_id);
    var icon_obj = $("#" + icon_id);
    if (div_obj.is(":hidden")) {
        div_obj.show();
        icon_obj.attr("class", "minus_arrow_down"); 
    } else {
        div_obj.hide();
        icon_obj.attr("class", "plus_arrow"); 
    }
}

function show_hide_profile_special(tr_id_1, tr_id_2, icon_id) {
    var tr_id_1_obj  = $("#" + tr_id_1);
    var tr_id_2_obj  = $("#" + tr_id_2);
    var icon_obj = $("#" + icon_id);
    if (tr_id_1_obj.is(":hidden")) {
        tr_id_1_obj.show();
        tr_id_2_obj.show();
        icon_obj.attr("class", "minus_arrow_down"); 
    } else {
        tr_id_1_obj.hide();
        tr_id_2_obj.hide();
        icon_obj.attr("class", "plus_arrow"); 
    }
}

var more_text_id = '';
function more_or_less(a) {
    if (more_text_id && more_text_id != a) {
        var prev_obj = $("#" + more_text_id);
        if (prev_obj.html() != 'More') {
            prev_obj.html('More');
        }
    }
    var a_obj = $("#" + a);
    if (a_obj.html() == 'More') {
        a_obj.html('Less');
    } else {
        a_obj.html('More');
    }
    more_text_id = a;
}

function jquery_unblock(unblock_id, no_refresh) {
    if (no_refresh) {
        $('#spinner').show();
    }
    jQuery.ajax({
        type: "get",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=un_block&match_id=" + unblock_id,
        success: function() {
            if (no_refresh) {
                $('#block_user').show();
                $('#unblock_user').hide();
                $('#spinner').hide();
            } else {
                window.location.reload();
            }
        }
    });
}

function jquery_block_member(block_id, comments, need_reason, no_refresh, callback ) {
    if (typeof(need_reason) == 'undefined') {
        need_reason = 1;
    }
    if (no_refresh) {
        $('#spinner').show();
    }
    jQuery.ajax({
        type: "get",
        url: url_map_f('_process_user_info_by_jquery'),
        data: { action: 'block', match_id: block_id, extra_data: comments, block_reason: need_reason },
        success: function(data) {
            if (typeof callback == 'function') {
                callback(data);
            } else if (no_refresh) {
                if (data == 1) {
                    $('#block_user').hide();
                    $('#unblock_user').show();
                }
                $('#spinner').hide();
            } else {
                window.location.reload();
            }
        }
    });
}

function popup_block_prompt(prof_id, from_page) {
    jQuery.ajax({
        type: "get",
        url: url_map_f('/de/modules/popup_prompt_'),
        data: { prof_id: prof_id, from_page: from_page, type: 1 },
        success: function(html) {
            $.popup(html);
        }
    });
}

function popup_favorite_prompt(prof_id) {
    jQuery.ajax({
        type: "get",
        url: url_map_f('/de/modules/popup_prompt_'),
        data: { prof_id: prof_id, type: 0 },
        success: function(html) {
            $.popup(html);
        }
    });
}

function doprint() {
    var bdhtml = window.document.body.innerHTML;
    var sprnstr = "<!--startprint-->";
    var eprnstr = "<!--endprint-->";
    var prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
    var prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
    window.document.body.innerHTML = prnhtml;
    window.print();
    window.location.reload();
}

function IsShowSelectCardsError(targetId, frm) {
    if (IsSelectCards(frm)) {
        target = document.getElementById(targetId);
        target.style.display = "none";
        return true;
    } else {
        window.location.href = "#";
        target = document.getElementById(targetId);
        target.style.display = "";
        return false;
    }
}

function IsSelectCards(frm) {
    var flag = 0;
    for (i = 0; i < frm.elements.length; i++) {
        if (!frm.elements[i].checked) {
            continue;
        } else {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        return true;
    } else {
        return false;
    }
}

function SendToFriends(frm, from_page) {
    var text = '';
    if (frm.del.length) {
        for (var i = 0; i < frm.del.length; i++) {
            if (frm.del[i].checked) {
                text = text + frm.del[i].value + '_';
            }
        }
    } else {
        if (frm.del.checked) {
            text = frm.del.value;
        }
    }
    if (text == '') {
        document.getElementById("error_profile_not_select").style.display = 'block';
        document.location = '#';
    } else {
        window.open('send_friends?from_page=' + from_page + '&user_list=' + text);
    }
}

function IsNum(s)
{
    if( s!=null ){
        var r,re;
        re = /[\d|.]*/i;
        r = s.match(re);
        return (r==s)?true:false;
    }
    return false;
}
var comment_usr_id;
function show_hide_comment (usr_id, username, fav_comment, type) {
    if (comment_usr_id != usr_id) {
        jQuery('#pic_td_' + comment_usr_id).removeAttr('vAlign').removeAttr('style');
        jQuery('#ckbox_td_' + comment_usr_id).removeAttr('vAlign').removeAttr('style');
        jQuery('#comment_td_' + comment_usr_id).hide();
        jQuery('#commend_frame_' + comment_usr_id).attr('src', '');
    }
    if (jQuery('#comment_td_' + usr_id).is(":hidden")) {
        fav_comment = fav_comment ? fav_comment : 0;
        var url = 'favorites_comments_';
        var data = 'active=editcomments&prof_id=' + usr_id + '&username=' + username;
        if (type == 'block') {
            url = 'blocked_';
            data = 'active=editreason&prof_id=' + usr_id + '&username=' + username + '&frompage=who_blocked&blocked_comment=' + fav_comment;
        } else if (type == 'friends') {
            url = 'friends_comments_';
        } else if (type == 'chat_comments') {
            url = 'whom_had_chat_comments_';
        } else if (type == 'match_comments') {
            url = 'compatible_matches_comments_';
        }

        jQuery.ajax({
            type: "POST",
            url: url_map_f(url),
            data: data,
            success: function(data) {
                add_new_item_by_id('send_comment_div', data);
                $('textarea[id=comments]').focus();
            }
        });
        comment_usr_id = usr_id;
    } else {
        jQuery('#pic_td_' + usr_id).removeAttr('vAlign').removeAttr('style');
        jQuery('#ckbox_td_' + usr_id).removeAttr('vAlign').removeAttr('style');
        jQuery('#comment_td_' + usr_id).hide();
        jQuery('#commend_frame_' + usr_id).attr('src', '');
        $('textarea[id=comments]').focus();
    }
}

var hidden_div_id = 0, hidden_icon_id = 0, hidden_level = 0;
function fold_group(div_id, icon_id, level) {
    if (!level) {
        level = 1;
    }
    if (hidden_div_id && hidden_div_id != div_id && hidden_icon_id && hidden_icon_id != icon_id && hidden_level) {
        if (hidden_level > level) {
            var rel_id = $("#" + hidden_div_id).attr("rel");
            var rel_icon_id = "";
            if (rel_id == "earn_gold_ways") {
                rel_icon_id = "earn_gold_icon";
            }
            if (rel_id && rel_icon_id && rel_id != div_id) {
                $("#" + rel_id).hide();
                $("#" + rel_icon_id).attr("class", "plus");
            }
        }
        if (hidden_level >= level) {
            $("#" + hidden_div_id).hide();
            $("#" + hidden_icon_id).attr("class", "plus"); 
        }
    }
    hidden_div_id = div_id;
    hidden_icon_id = icon_id;
    hidden_level = level;
    show_hide_group(div_id, icon_id);
    if ($('#mm_sub_membership_opt_icon').length > 0 && !$('#mm_sub_membership').is(":hidden")) {
        show_hide_group('mm_sub_membership', 'mm_sub_membership_opt_icon');
    }
}

// censor telphone number lengh check.
function censor_check_tel_lengh() {
    var sel_value = $("select[name='type'] option[selected]").val();
    if (sel_value == "telphone") {
        var lengh = $("#arg").val().length;
        if (lengh < 4) {
            $("#telphone_info").html("telphone number should at least 4 symbols/digits");
            return false;
        }
    }
    return true;
}

var writing_ideas_div = "";
var writing_ideas_icon = "";
function show_writing_ideas (div_id, icon_id, url) {
    if (writing_ideas_div && writing_ideas_div != div_id && writing_ideas_icon && writing_ideas_icon != icon_id) {
        $("#" + writing_ideas_div).hide();
        $("#" + writing_ideas_icon).attr("class", "plus"); 
    }
    var div_obj  = $("#" + div_id);
    var icon_obj = $("#" + icon_id);
    if (div_obj.is(":hidden")) {
        div_obj.load(url);
        div_obj.show();
        icon_obj.attr("class", "minus"); 
        writing_ideas_div = div_id;
        writing_ideas_icon = icon_id;
    } else {
        div_obj.html('');
        div_obj.hide();
        icon_obj.attr("class", "plus"); 
    }

}

function remove_travelling(about_id) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_remove_travelling'),
        data: "&about_id=" + about_id,
        success: function(data) {
            $('#show_travelling').hide();
        }
    });
}

function send_password_to_user(email) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('reset_password_'),
        data: { "need_log": 1, "usr_email": email },
        dataType: 'json',
        success: function(data) {
            if (data.ret == 1) {
                alert('Send successfully!');
            } else {
                alert('Send Unsuccessfully!');
            }
        }
    });
}

function set_show_5_stars(state) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('reset_show_5_stars_'),
        data:  "stars_status=" + state,
        success: function(data) {
            if (data == 1) {
                $('#show_5_stars_close').hide();
                $('#show_5_stars_open').show();
            } else {
                $('#show_5_stars_close').show();
                $('#show_5_stars_open').hide();
            }
        }
    });
}

var full_text_hidden = '';
var sub_text_hidden = ''
function show_long_text(more_link, sub_text_id, full_text_id) {
    if (full_text_hidden && full_text_hidden != full_text_id) {
        $('#' + full_text_hidden).hide();
        $('#' + sub_text_hidden).show();
    }
    full_text_hidden = full_text_id;
    sub_text_hidden = sub_text_id;

    var sub_t  = $('#' + sub_text_id);
    var full_t = $('#' + full_text_id);
    if (full_t) {
        full_t.show();
        if (sub_t) {
            sub_t.hide();
        }
    }
}

function jquery_user_view(about_id) {
    if (!about_id) return;
    jQuery.ajax({
        type: "post",
        url: url_map_f('_view_user'),
        data: "about_id=" + about_id
    });
}

function format_positive_number_to_money(number) {
    number += '';

    var pos = number.indexOf('.');
    var suffix = '';
    if (pos > -1) {
        suffix = number.substring(pos);
        number = number.substring(0, pos);
    }

    if (number.length > 3) {
        number = number.split('').reverse().join('');
        number = number.replace(/(\d{3})\B/g, '$1,');
        number = number.split('').reverse().join('');
    }

    return number + suffix;
}

function SetIframeHeight(obj) {
    var cwin = obj;
    if (document.getElementById) {
        if (cwin && !window.opera) {
            if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
                cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS
            else if(cwin.Document && cwin.Document.body.scrollHeight)
                cwin.height = cwin.Document.body.scrollHeight + 10;//IE
        } else {
            if(cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight)
                cwin.height = cwin.contentWindow.document.body.scrollHeight;//Opera
        }
    }
}

function jquery_vote_std_story (story_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&story_id=" + story_id,
        success: function(data){
            jQuery("#msg_" + story_id).html('<img src="https://images.tmatch.com/common/like_up_new.png" border="0" title="Already voted" /> ' + data + ' up');
        }
    });
}

function vote_experience_celeb(board_id, cnt) {
    $.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "board_id=" + board_id + '&vote=1',
        success: function(data){
            $("#experience_vote_cnt_" + board_id).text(cnt + 1);
            $("#experience_vote_img_0_" + board_id).show()
            $("#experience_vote_img_1_" + board_id).hide()
        }
    });
}

function jquery_vote_std_treatment_story (story_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&std_treatment_story_id=" + story_id,
        success: function(data){
            jQuery("#msg_" + story_id).html('<img src="https://images.tmatch.com/common/like_up_new.png" border="0" title="Already voted" /> ' + data + ' up');
        }
    });
}

function remove_profiles_confirm(tip_text) {
    if(!$("input:checked").length) {
        $("#error_profile_not_select").show();
        $(document.body).scrollTop(0);
        return false;
    }
    $("error_profile_not_select").hide();

    tip_text = tip_text || 'Are you sure you want to remove it?';

    $.popup(tip_text, {
        button:[
            {
                buttonClass:"button_white",
                val: "Yes",
                callback:function(){
                    remove_profiles();
                }
            },
            {
                buttonClass:"a_button_primary",
                val: "No, continue"
            }
        ]
    });
}

function remove_profiles() {
    jQuery("input[name=btnDelSel]").val("1");
    $("form[name='del_form']")[0].submit();
}

function isDigit(s) { 
    var patrn = /^[0-9]{1,64}$/;
    if (!patrn.exec(s)) return false;
    return true;
} 

/* {{{ NOTE: DO NOT ADD ANY NONE OF JQUERY PLUGINS RELATED CODES BELOW */

/**
 * jQuery plugins
 *
 * See how to write jQuery plugins: http://docs.jquery.com/Plugins/Authoring
 */
(function($) {

    /**
     * Add picture tips.
     */

    $.fn.add_pic_tips = function(options) {
        var opts = $.extend({}, $.fn.add_pic_tips.defaults, options);
        var img_box = $("#show_big_photo");
        if (img_box.length == 0)
            $('<img id="show_big_photo" style="display: none;" />').appendTo("body"); 
        $(this).live(
            "mouseover mouseout",
            function (event) {
                if (event.type == 'mouseover') {
                    $("#show_big_photo")
                        .attr({src: $(this).attr("src")})
                        .css({position: "absolute", left: $(this).offset().left + opts.left, top: $(this).offset().top + opts.top})
                        .show();
                } else {
                    $("#show_big_photo").hide();
                }
            }
        );
    };

    $.fn.add_pic_tips.defaults = {left: 50, top: 20};

})(jQuery);

/* NOTE: DO NOT ADD ANY NONE OF JQUERY PLUGINS RELATED CODES ABOVE }} */

function delete_blog_confirm(del_message, blog_id, deltopic) {
    var alert_text = deltopic ? 'Are you sure you want to remove all comments and the blog?' : 'Are you sure you want to remove the comment?';

    $.popup(alert_text, {
        button:[
            {
                val: "Yes",
                callback:function(){
                    window.location.href='/blogs/blog_delete?del_message=' + del_message + '&blog_id=' + blog_id + '&deltopic=' + deltopic + '&delete=1';
                }
            },
            {
                val: "Cancel"
            }
        ]
    });
}

function delete_forum_confirm(message_id, topic_id, author_post, from_page, topic_author) {
    var alert_text = author_post ? 'Are you sure you want to delete the post?' : 'Are you sure you want to delete the comment?';

    $.popup(alert_text, {
        button:[
            {
                val: "Yes",
                callback:function(){
                    window.location.href='/forum_delete_post?message_id=' + message_id + '&topic_id=' + topic_id + '&author_post=' + author_post + '&from_page=' + from_page + '&topic_author=' + topic_author + '&delete=1';
                }
            },
            {
                val: "Cancel"
            }
        ]
    });
}

function delete_photo_confirm(pic_url, picno, x, photo_is_verify) {
    var alert_text = '<div align="center" style="width: 640px;">        <div><img src="' + pic_url + '" width="' + (x > 360 ? 360 : x) + '" border="0" /></div><br />        <div style="border: 1px solid #ff9a00; width: 95%; margin: 10xp 0px; padding: 10px; text-align: left; background-color: #f6f0f0;">Remember, you can get 20x more interest and responses with photos on your profile. The more photos you have, the more attention you will get.</div><br />        <div style="color: red; text-align: center; height: 30px; font-weight: bold;"> ' + (photo_is_verify ? "Your verified logo will disappear if all photos are removed." : "Are you sure you want to delete this photo?") + '</div>    </div>';
    $.popup(alert_text, {
        button:[
            {
                val: "Yes",
                callback:function(){
                    window.location.href=url_map_f("/picture_delete_confirm?picno=" + picno + "&clear=1");
                }
            },
            {
                val: "No"
            }
        ]
    });
}

function delete_extra_photo_confirm(manage_link, delete_id, album_type) {
    $.popup('Are you sure you want to delete this photo?', {
        button:[
            {
                val: "Yes",
                callback:function(){
                    window.location.href=url_map_f("/" + manage_link + "?delete_id=" + delete_id + "&album_type=" + album_type);
                }
            },
            {
                val: "No"
            }
        ]
    });
}

function show_move_to_ablum_confirm(pic_url, pic_id, album_type, x, action, picno) {
    var album_type_text = action == 'to_pub' ? "Are you sure you want to move this photo to public album?" : "Are you sure you want to move this photo to private album?";
    var alert_text = '<div align="center" style="width: 640px;">        <div><img src="' + pic_url + '" width="' + (x > 360 ? 360 : x) + '" border="0" /></div><br />        <div style="color: red; text-align: center; height: 30px; font-weight: bold;">' + album_type_text + '</div>    </div>';
    var dom = $( '<div style="width:1px;height:1px;overflow:auto">' + alert_text + '</div>' );
    dom.find( 'img' ).load(function(){
        dom.remove();
        $.popup(alert_text, {
            button:[
                {
                    val: "Yes",
                    callback:function(){
                        window.location.href=url_map_f("/move_photo?" + "pic_id=" + pic_id + "&album_type=" + album_type+ "&action=" + action + "&picno=" + picno);
                    }
                },
                {
                    val: "No"
                }
            ]
        });
    });
    dom.appendTo( $(document.body) );
}
function hide_profile_comment(about_id, del_id , thisObj) {
    $.get( url_map_f("/_perboard_by_jquery") + '?update=1&active=2&about_id=' + about_id + '&update_usr_id=' + del_id , function(data){
        if ( parseInt( data ) == 1) {
            //success
            var p = $(thisObj).parent().parent();
            p.find('.jq_hide').hide();
            p.find('.jq_restore').show();
        }
    });
}

function restore_profile_comment(about_id, del_id , thisObj) {
    $.get( url_map_f("/_perboard_by_jquery") + '?update=1&active=1&about_id=' + about_id + '&update_usr_id=' + del_id , function(data){
        if ( parseInt( data ) == 1) {
            //success
            var p = $(thisObj).parent().parent().parent();
            p.find('.jq_hide').show();
            p.find('.jq_restore').hide();
        }
    });
}

function delete_profile_comment_confirm(about_id, del_id) {
    window.location.href=url_map_f("/perboard") + '?update=1&active=2&about_id=' + about_id + '&update_usr_id=' + del_id;
}

function propose_date(usr_id) {
    $.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "match_id=" + usr_id + "&action=propose_date",
        success: function(data) {
            if (data == 'no_permission') {
                show_no_permission();
                return false;
            } else {
                $("#propose_date_" + usr_id).html("Date proposed");
            }
        }
    });
}

function jquery_date_likes(usr_id) {
    $("#like_date_link_" + usr_id).unbind();
    $.getJSON(
        url_map_f("_process_date_likes"), 
        { match_id: usr_id, rid: Math.random() },
        function(info) {
            if (info.ret == 0) {
                show_no_permission();
                return false;
            } else {
                $("#like_date_link_" + usr_id).show();
                if (info.is_like) {
                    $("#like_button_" + usr_id).html("Liked");
                } else {
                    $("#like_button_" + usr_id).html("Like");
                }
                $("#likes_count_" + usr_id).html('<a href="https://www.millionairematch.com/who_like_date_ideas?prof_id=' + usr_id + '" target="_blank" style="text-decoration: none !important">' + info.likes_count + ' likes</a>');
                $("#likes_count_" + usr_id).parent().show();
                $("#like-seperator").show();
                $("#likes_count_" + usr_id).parent().removeClass('hidden');
                $("#liked_cnt_arrow").show();
            }
        }
    );
}

function jquery_date_likes_activity(usr_id, activity_id) {
    $.getJSON(
        url_map_f("_process_date_likes"), 
        { match_id: usr_id, r: Math.random() },
        function(info) {
            if (info.ret == 0) {
                show_no_permission();
                return false;
            }
            if (info.is_like) {
                $("#like_button_" + activity_id).html('Unlike');
            } else {
                $("#like_button_" + activity_id).html('Like');
            }
            var likes_word = 'like';
            if (info.likes_count > 0) {
                $("#link_date_ideas_likes_" + activity_id).show();
                if (info.likes_count > 1) {
                    likes_word = 'likes';
                }
            } else {
                $("#link_date_ideas_likes_" + activity_id).hide();
            }
            if (info.likes_count > 0) {
                $("#likes_count_" + activity_id).text(info.likes_count);
            } else {
                $("#likes_count_" + activity_id).text('');
            }
            $('#like_date_link_' + activity_id).toggleClass('v14_liked');
        }
    );
}


function show_hide_ride_pop() {
    var tips_text = 'You can only invite a ride after you\'ve viewed 5 or more FULL profiles!';
    $.popup(tips_text, {
        button:[
            {
                val: "OK",
            },
        ]
    });
}

function add_serial_number () {
    var serial_number = 1;
    $(".serial_id").each(function(){
        $(this).html(serial_number  + ".");
        serial_number ++;
    });
}

function show_popup_photo(pic_url, msg, ix) {
    var content = '<div align="center" style="width: 500px;min-height:400px">        <img src="' + pic_url + '" border="0" width="' + ((ix > 0 && ix < 500) ? ix : 500) + '" /><br />';
    if (typeof(msg) != 'undefined')
    {
        content += '<div>' + msg + '</div>';
    }
    content += '</div>';
    $.popup(content);
}
function unblock_wink(){
    jQuery.ajax({
        type: "POST",
        url: url_map_f('flirt_options'),
        data: { sub_wink : 1, accepting_flirting : 1, ajax_sub : 1 },
        success: function(data) {
            $('.a_popup_wrapper').hide();
            $('.a_popup_shadow').hide();
        }
    });
}

function ask_first_date_idea_tips() {
    $.popup($('#perfect_date_popup'));
}

function ask_first_date_idea_note() {
    $.popup($('#ask_first_date_idea_note'));
}

function send_wink_tips_when_hidden_profile () {
    $.popup($('#send_wink_tips_popup'));
}

function featured_member(prof_id, featured_action) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('censor_minor_operation_'),
        data: {prof_id:prof_id, action:featured_action},
        success: function(data){
            if (featured_action == 'featured_member') {
                if (data == 1) {
                    $("#feature_member_" + prof_id).html("Already a homepage featured member (<a href=\"javascript: featured_member(" + prof_id + ", 'cancel_featured_member')\">Cancel it</a>)");
                } else {
                    $.popup('The ratio of photo is wrong!');
                }
            } else if (featured_action == 'cancel_featured_member') {
                $("#feature_member_" + prof_id).html("<a href=\"javascript:featured_member(" + prof_id + ", 'featured_member')\">Select this as homepage featured member</a><span style=\"color: blue\">(Only if the main photo is a full photo of userself, the ratio is 4:3, or it's CS mistake) <a href=\"javascript:void(0)\" onclick=\"PopUp('/modules/featured_member_example_', '', 420, 300)\">example</a></span>");
            }
        }
    });
}
function remove_private_note(prof_id) {
    $('#delete_notes_' + prof_id).hide();
    $('#deleting_notes_' + prof_id).show();
    jQuery.private_notes[prof_id].find('#comments_private_note_error' + prof_id).eq(0).hide();
    jQuery.private_notes[prof_id].find('#comments_private_note_' + prof_id).eq(0).val('');
    $("#searchresults_private_comment_" + prof_id).html('');
    $.ajax({
        type: "POST",
        url: url_map_f('json/update_private_note_'),
        data: { prof_id: prof_id, note: '' },
        dataType: "json",
        success: function(data){
            private_note_toggle(prof_id);
            $('#add_edit_' + prof_id).html('<img src="https://images.tmatch.com/common/edit.png">');
            $('#p_note_date_' + prof_id).empty();
        }
    });
}
function save_private_note(prof_id) {
    var val = jQuery.private_notes[prof_id].find('#comments_private_note_' + prof_id).eq(0).val();
    if (val.length > 2000) {
        jQuery.private_notes[prof_id].find('#comments_private_note_error' + prof_id).eq(0).show();
        return;
    } else if (val.length == 0) {
        jQuery.private_notes[prof_id].find('#comments_private_note_error' + prof_id).eq(0).show();
        jQuery.private_notes[prof_id].find('#comments_private_note_error' + prof_id).eq(0).text('Please enter a message');
        return;
    }
    jQuery.private_notes[prof_id].find('#comments_private_note_error' + prof_id).eq(0).hide();
    var html = val.replace( /(\r\n)|\r/g, "\n" );
    html = html.replace( /(^\n+)|(\n+$)/g, '' );
    html = html.replace( /\n/g, "<br>");
    $('#searchresults_private_comment_' + prof_id).html(html);
    $('#searchresults_private_comment_' + prof_id).show();
    $.ajax({
        type: "POST",
        url: url_map_f('json/update_private_note_'),
        data: { prof_id: prof_id, note: val },
        dataType: "json",
        success: function(data){
            private_note_toggle(prof_id);
            $('#p_note_date_' + prof_id).empty().text('Last updated: ' + new Date().toLocaleDateString()).show();
            $('#add_edit_' + prof_id).html('<img src="https://images.tmatch.com/common/edit.png">');
        }
    });


}

function private_note_toggle(prof_id) {
    var result_obj = $("#searchresults_private_comment_" + prof_id);
    var comment_obj = jQuery.private_notes[prof_id].find('#comments_private_note_' + prof_id).eq(0);
    if (comment_obj.val().length == 0) {
        jQuery.private_notes[prof_id].find('#comments_private_note_error' + prof_id).eq(0).hide();
    }
    var val = result_obj.html();
    val = val.replace( /<br>/g , "\n");
    $('#deleting_notes_' + prof_id).hide();
    if (val) {
        $('#delete_notes_' + prof_id).show();
    } else {
        $('#delete_notes_' + prof_id).hide();
    }
    if ($("#search_results_comment_td_" + prof_id).is(":visible")) {
        comment_obj.val(val);
        result_obj.show();
        $("#search_results_comment_td_" + prof_id).hide();
    } else {
        var note_characters_obj = $('#private_note_characters_' + prof_id);
        if (note_characters_obj.size() > 0) {
            note_characters_obj.html(jQuery.private_notes['max_length'] - comment_obj.val().length);
        }
        result_obj.hide();
        $("#search_results_comment_td_" + prof_id).show();
        $("#search_results_comment_td_" + prof_id).find('div').show();
   }
   comment_obj.focus();
}

function remove_video_url_confirm(usr_id) {
    $.popup('Are you sure you want to delete this video?', {
        button:[
            {
                val: "Yes",
                callback:function(){
                    jQuery('input[name=my_video_url_' + usr_id + ']').val('');
                    jQuery('#delete_video_' + usr_id).toggle();
                    $.popup().close();
                }
            },
            {
                val: "No"
            }
        ]
    });
}
function request_photo_confirm(pic_num, about_id, img) {
    if (pic_num == 0) {
        var alert_head = '<div id="request_photo_alert" style="display: none;">                              <div class="a_popup_wrapper">                                  <div class="a_popup_container">                                      <i class="a_delete"><a onclick="$(\'#request_photo_alert\').hide();" href="javascript: void(0)"></a></i>';
        var alert_foot = '        </div>                              </div>                              <div class="a_popup_shadow"></div>                          </div>';
        var alert_text = alert_head + '<h2>Before sending photo request to this member, you need to first upload your photo.</h2>                                  <div class="a_popup_btns">                                      <a class="a_button a_button_primary a_btn_widthauto" href="https://www.millionairematch.com/my_profile?profile_group=photo">Upload a photo now</a>                                  </div>'
                     + alert_foot;
        $(document.body).append(alert_text);
        $('#request_photo_alert').show();
    } else {
        jquery_request_photo(about_id, img);
    }
}

function show_hide_might_liked_members() {
    if ($("#might_liked_members").is(":hidden")) {
        $("#might_liked_members").css("display", "block");
        $("#show_hide_might_liked_members").attr("class", "minus"); 
    } else {
        $("#show_hide_might_liked_members").attr("class", "plus"); 
        $("#might_liked_members").css("display", "none");
    }
}

function jquery_photo_likes(usr_id, hide_reason, not_show_unlike, pic_id) {

    var reason = $.trim($('#like_photo_reason').val());
    if (hide_reason) {
        $("#like_photo").hide();
        $("#like_photo_tip").html('Sent...');
        $("#like_photo_tip").show();
    }
    $.ajax({
        type: "POST",
        url: url_map_f('_process_photo_likes'),
            data: { about_id: usr_id, reason: reason, change_reason: hide_reason, pic_id: pic_id, random: Math.random() },
            success: function(data) {
                if (data == 'no_permission') {
                    show_no_permission();
                    return false;
                } else {
                    if (data == 1) {
                        $("#like_link").trigger("click");
                        if (hide_reason) {
                            $("#like_photo_tip").html('<span class="font_blue">Sent successfully</span>');
                        } else if (!not_show_unlike) {
                            var like_num = parseInt($.trim($('#like_num').text()));
                            like_num = like_num + 1;
                            $('#like_num').html(like_num);
                            if (like_num > 1) {
                                $('#like_t').text('likes');
                            } else {
                                $('#like_t').text('like');
                            }
                            $('#like_user_photo').hide();
                            $('#unlike_user_photo_img').show();
                        }
                    } else {
                        if (hide_reason) {
                            $("#like_photo_tip").html('<font color="red">Sent failed, you can try it again.</font>');
                            $("#like_photo").show();
                        }
                    }
                }
            }
    });
}

function jquery_photo_likes_by_class(usr_id, like_num) {
    $.getJSON(
        url_map_f("_process_photo_likes"), 
        { about_id: usr_id, change_reason: 0, random: Math.random() },
        function(data) {
            if (data == 1) {
                $(".like_user_photo_" + usr_id).html('<span class="font_blue">You liked this photo!</span>');
                like_num = like_num + 1;
                $('.like_num_' + usr_id).html(like_num);
            }
        }
    );
}

function jquery_photo_unlikes(usr_id) {
    var like_num = parseInt($.trim($('#like_num').text()));
    $.getJSON(
        url_map_f("_process_photo_likes"), 
        { about_id: usr_id, action: 'unlike', random: Math.random() },
        function(data) {
            if (data == 1) {
               like_num = like_num - 1;
                $('#like_num').html(like_num);
                if (like_num > 1) {
                    $('#like_t').text('likes');
                } else {
                    $('#like_t').text('like');
                }
                $('#like_user_photo').show();
                $('#unlike_user_photo_img').hide();
            }
        }
    );
}

function jquery_photo_unlikes_by_class(usr_id, like_num) {
    $.getJSON(
        url_map_f("_process_photo_likes"), 
        { about_id: usr_id, action: 'unlike', random: Math.random() },
        function(data) {
            if (data == 1) {
                $(".unlike_user_photo_" + usr_id).html('<span class="font_blue">You unliked this photo!</span>');
                like_num = like_num - 1;
                if (like_num < 0) {
                    like_num = 0;
                }
                $('.like_num_' + usr_id).html(like_num);
            }
        }
    );
}

function switch_tab(selected_tab, tab_content_id, tab_on_css) {
    if (!tab_on_css) {
        tab_on_css = 'active title title_border';
    }
    $("#selects .active").removeClass(tab_on_css);
    $(selected_tab).addClass(tab_on_css);
    $(".selecte_content").hide();
    $("#" + tab_content_id).show();
}

function show_response_status() {
    jQuery(document).ready(function() {
        $(".user_response_status").each(function() {
            jQuery(this).show();
        });
    });
    $(".page-link a").each(function() {
        var link = $(this).attr('href');
        if ( !link.match(/show_responce_active_status/) ) {
            link = link + '&show_responce_active_status=1';
        } else {
            link = link.replace('show_responce_active_status=0', 'show_responce_active_status=1');
        }
        $(this).attr('href', link);
    });
    $("#results_order > option").each(function() {
        var value = $(this).val();
        if ( !value.match(/show_responce_active_status/) ) {
            $(this).val(value + '&show_responce_active_status=1');
        }
    });
}

function show_fisrt_date_idea(idea, category, location) {
    var content = '<b>My first date idea: </b>' + idea;
    content += '<div style="margin-top: 10px; margin-bottom: 10px;">';
    if (category) {
        content += '<b>Category: </b>' + category;
    }
    if (location) {
        content += '&nbsp;&nbsp;&nbsp;&nbsp;<b>Location: </b>' + location + '</div>';
    }
    $.popup(content);
}

function show_jquery_confirm_box(msg, func, btn_position) {
    $.popup(msg, {
        button:[
            {
                val: "OK",
                callback: func
            },
            {
                val: "Cancel"
            }
        ]
    });
}

function add_favorite_for_gallery(match_id) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=favorite_add&match_id=" + match_id,
        success: function(data){
            if (data == 'no_permission') {
                show_no_permission();
                return false;
            }
            $("#add_favorite_" + match_id).hide();
            $("#in_favorites_" + match_id).show();
            $.popup('<div align="center">' + data + '</div>');
        }
    });
}

function ajax_block_ip(usr_id, block_ip) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('censor_minor_operation_'),
        data: "action=block_one_ip&block_ip=" + block_ip,
        success: function(){
            $('.ip_' + usr_id).text('Blocked');
        }
    });
}

function show_edit_module(edit_div_id, show_div_id, item_name, is_group) {
    is_group = is_group ? 1 : 0;

    $('#' + edit_div_id).show();
    $('#' + show_div_id).hide();
    $('#' + edit_div_id).load('edit_my_profile_?profile_item=' + item_name + '&edit_div_id=' + edit_div_id + '&show_div_id=' + show_div_id + '&is_group=' + is_group + '&ajaxRequestUncache=' + parseInt(Math.random() * 1000000));
}

function hide_edit_module(edit_div_id, show_div_id) {
    $('#' + edit_div_id).hide();
    $('#' + show_div_id).show();
	$('#' + edit_div_id).html('');
}

function scroll(obj) {
    this.oScroll = obj;
    if (this.oScroll == null) return;
    this.offset = this.oScroll.getElementsByTagName('div')[0].offsetWidth + 1;
    this.speed = 5;
    this.begin = 0;
    this.width = 50;
    this.margin = 2 * (this.offset / this.speed - this.width) / this.speed;
    this.oLeft = this.oScroll.currentStyle ? parseInt(this.oScroll.currentStyle.left) : parseInt(document.defaultView.getComputedStyle(this.oScroll, "").getPropertyValue("left"));
}
timeoutid = null;
intervalId = null;
scroll.prototype.init = function() {
    if(this.margin < 0) {
        this.oLeft = 0;
    }
    if(intervalId) {
        clearInterval(intervalId);
    }
    if(timeoutid != null) {
        clearTimeout(timeoutid);
    }
    var begin = this.begin;
    var margin = this.margin;
    var width = this.width;
    var oS = this.oScroll;
    var oL = this.oLeft;
    gooo = this.init.caller;
    if(this.way == 'left') {
        intervalId = setInterval (
            function() {
                begin += 0.5;
                oS.style.left = (oL - (width * begin + (margin * begin * begin) / 2)) + 'px';
                if((50 + margin * begin) <= 0) {
                    clearInterval(intervalId);
                    oS.appendChild(oS.getElementsByTagName('div')[0]);
                    oS.style.left = '-99px';
                }
            }, 5);
    } else if (this.way == 'right') {
        intervalId = setInterval (
            function() {
                begin += 0.5;
                oS.style.left = (oL + (width * begin + (margin * begin * begin) / 2)) + 'px';
                if((50 + margin * begin) <= 0) {
                    clearInterval(intervalId);
                    theLast = oS.lastChild;
                    while(theLast.nodeType == 3) {
                        theLast = theLast.previousSibling;
                    }
                    oS.insertBefore(theLast, oS.getElementsByTagName('div')[0]);
                    oS.style.left = '-99px';
                }
            }, 5);
    }
};
window.onload = function() {
    var objj = document.getElementById('scroll');
    var obj_scroll = new scroll(objj);
    obj_scroll.way = 'right';
}

// only for IE
function getObjScroll(){
     var objj = document.getElementById('scroll');
     return new scroll(objj);
}

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

function jquery_add_comment(usr_id, picture_id, album_type, icon, username) {
    check_login_status(usr_id);
    var comment = $('#comment_' + picture_id).val();
    var comment_count = $('#comment_count_' + picture_id).val();
    if (comment == 'Add a comment...') {
        return false;
    }
    $.getJSON(
        url_map_f("_process_comment_by_jquery"), 
        { action: 'add_user_comment', picture_id: picture_id, album_type: album_type, comment: comment, random: Math.random() },
        function(info) {
            $('#comment_td_' + picture_id).html(info.msg);
            $('#last_comment_table_' + picture_id).show();
            $('#commenter_icon_' + picture_id).attr('src', icon);
            $('#last_comment_' + picture_id).html('<a href="https://www.millionairematch.com/user_details?user=' + username + '" target="_blank"><b>' + username + '</b></a> ' + comment);
            if (info.comment_count > 0){
                $('#comment_count_table_' + picture_id).show();
                $('#comment_count_span_' + picture_id).html(parseInt(info.comment_count) + 1);
            }
        }
    );
}
function check_login_status(usr_id) {
    if (!usr_id || usr_id == 1) {
        window.location='/guest';
        return false;
    }
}

function reply_current_status(prof_id) {
    $.popup({ ajax: 'reply_status_?prof_id=' +  prof_id});
}

function reply_status(prof_id) {
    var text = $("#text_content").val();
    text = $.trim(text);
    if (text == '') {
        $('#no_blank_reply_status').show();
        return false;
    } else {
        $('#no_blank_reply_status').hide();
    }
    $.getJSON(
        url_map_f("_process_status_reponse"),
        { prof_id: prof_id, text: text },
        function(data) {
            if (data.ret == 0) {
                $.popup(data.error);
            }
            if (data.ret == 1) {
                $.popup(data.msg);
            }
        }
    );
}

function jquery_hide_secure_note() {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: 'action=hidden_secure_note',
        success: function(data) {
            if (data == 1) {
                $('#my_secure_note').hide();
            }
        }
    });
}

function jquery_reset_viewed() {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: { action: 'reset_viewed' },
        success: function(data) {
            if (data == 1) {
                $('#reset_viewed').hide();
                $('#viewed').text('0').unwrap();
                $("#reset_zero").text('Viewed 0 times');
            }
            //$("#rest_views").hide();
        }
    });
}

function jquery_vote_answer (answer_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&answer_id=" + answer_id,
        success: function(data){
            jQuery("#msg_" + answer_id).html('<img src="https://images.tmatch.com/common/up.png" border="0" title="Already voted" /> ' + data + ' up');
        }
    });
}

function open_private_album_to_user(link_dom, prof_id) {
    jQuery.ajax({
        url: url_map_f('process_search_results_'),
        dataType: 'json',
        data: {"action_type": "open_private_album_to_user", "prof_id": prof_id},
        success: function(data){
            if (data.status == 1) {
                $(link_dom).removeAttr("onclick");
                $(link_dom).parent("div").addClass('a_visited');
                $(link_dom).html("<span> </span>Shared private photos");
            }
        }
    });
    return false;
}

// ---------------- IM related -------------------------------

var im_win;
function open_chat(username, domain, from) {
    var imurl = url_map_f('message');

    if (domain) {
        imurl = 'http://www.' + domain + imurl;
    }
    if (username) {
        imurl += '#' + username;
    }
    if (im_win == null || !im_win.open || im_win.closed) {
        var userAgent = navigator.userAgent;
        if (from == "ajax_call" && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1) {
            window.location = imurl;
            return;
        } else {
            im_win = window.open(imurl, 'chat', 'width=1100, height=640, scrollbars=yes, resizable=yes');
        }
    }

    if (im_win) {
        if (username && Object.prototype.hasOwnProperty.call(im_win, 'openPrivateChatWith')) {
            // fix for Chrome, Safari browser, make following focus work.
            im_win.blur();
            im_win.openPrivateChatWith(username);
        }
        im_win.focus();
    }
}


function logout_chat() {
    if (im_win != null && im_win.open && !im_win.closed) {
        im_win.blur();
        im_win.logout();
    }
}

function live_support() {
    $.getJSON(
        url_map_f("check_live_support_"),
        function(data) {
            if (data.ret == 0) {
                $.popup({ajax:"/contact_support_"});
            }
            if (data.ret == 1) {
                open_chat('LiveSupport', null, "ajax_call");
            }
        }
    );
}

function mark_unread_ask_chat_msg() {
    var invite_msg = [], ask_to_chat_msgid = [];
    var local_invitation_msg = localStorage.getItem('invitation_msg');
    if (local_invitation_msg) {
        invite_msg = JSON.parse(local_invitation_msg);
    }
    ask_to_chat_msgid = $.map( invite_msg, function(value) {
        return value.id;
    });
    if (ask_to_chat_msgid.length) {
        jQuery.ajax({
            type: "post",
            url: url_map_f('chat/process_user_'),
            data: "action=mark_unread&messageid=" + ask_to_chat_msgid.join(','),
            dataType: 'json',
            success: function(data){
                if (data.code == 0) {
                    localStorage.removeItem('invitation_msg');
                }
            }
        });
    }
}

function popup_want_chat_window(sender) {
    jQuery.ajax({
        type: "post",
        url: url_map_f('chat/get_profiles_by_usernames_'),
        data: "users=" + sender.join(','),
        dataType: 'json',
        success: function(data){
            if (data.status_code == 0) {
                var username, profile="", img_url;
                for (var one in data.users_info) {
                    var user_info = data.users_info[one];
                    username = one;
                    img_url = user_info.icon;
                    if (user_info.profile_hidden == 0) {
                        var user_location = user_info.state || user_info.country;
                        profile = '<h5>'+user_info.age+(user_location?(" | "+user_location):"")+'</h5>';
                        break;
                    }
                }                
                
                var chat_window = '                    <link href="https://images.tmatch.com/common-new/message/ask_chat/ask_chat.css" rel="stylesheet" type="text/css">                    <div class="wanttochat title_border" id="wanttochat">                        <h3 class="title"><span>Someone wants to chat</span></h3>                        <div class="chat_left">                            <label><img src="'+img_url+'" width="144" height="144"></label>                            <h4>'+username+'</h4>'+profile+'<p>Want to send him an message?</p>                        </div>                        <div class="chat_right">                            <a href="javascript: void(0)" onclick="$(this).parent().parent().remove();open_chat(\'' + username + '\');" class="a_button a_button_primary">Message</a>                            <a href="javascript: void(0)" onclick="$(this).parent().parent().remove();mark_unread_ask_chat_msg();">I\'m busy</a>                        </div>                    </div>';
                $('body').append(chat_window);
            }
        }
    });
}

function save_invitation_msg(msg) {
    var invite_msg = [];
    var local_invitation_msg = localStorage.getItem('invitation_msg');
    if (local_invitation_msg) {
        invite_msg = JSON.parse(local_invitation_msg);
    }
    for (var i in invite_msg) {
        if (msg.id == invite_msg[i].id) {
            return;
        }
    }
    invite_msg.push({
        id: msg.id,
        sender: msg.sender,
        message: msg.message,
        time: msg.time
    });
    invite_msg = invite_msg.sort(function (a, b) {
        return b.id - a.id;
    });
    localStorage.setItem('invitation_msg', JSON.stringify(invite_msg));
}

function check_invitation_message(msgs) {
    if (msgs) {
        var clear_storage = 1;
        for (var msg in msgs) {
            if (msgs[msg].type == 'i') {
                save_invitation_msg(msgs[msg]);
                clear_storage = 0;
            }
        }
        if (clear_storage) {
            localStorage.removeItem('invitation_msg');
        }
    }
    var invite_msg = [];
    var local_invitation_msg = localStorage.getItem('invitation_msg');
    if (local_invitation_msg) {
        invite_msg = JSON.parse(local_invitation_msg);
    }
    if (invite_msg.length && $("#wanttochat").length == 0) {
        var ask_to_chat_sender = $.map( invite_msg, function(value) {
            return value.sender;
        });
        popup_want_chat_window(ask_to_chat_sender);
    } else if (invite_msg.length == 0 && $("#wanttochat").length) {
        $("#wanttochat").remove();
    }
}

var maxid;
function get_unread_message_cnt(refresh) {
    jQuery.ajax( {
        type: 'get',
        url: url_map_f('/chat/get_unread_message_cnt_'),
        data: { usr_id: cur_usr_id },
        dataType: 'json',
        beforeSend :function(xmlHttp){
            if (refresh == 1) {
                xmlHttp.setRequestHeader("Cache-Control","max-age=0");
            }
        },
        success: function(data) {
            $('.d_message_nows').attr({'data':(data.count > 0?data.count:0)});
            if (data.count > 0) {
                $(".icon_newmessage").css({'display': 'block'});
                $("#unread_live").text(data.count);
                if ($('#unread_message_bar').size() > 0) {
                    $('#unread_message_bar').text(data.count);
                    $('.d_message_nows').show();
                }
                $("#unread_live").css({'display': 'block'});
                maxid = data.maxid;
                $("a[onclick*='open_chat();']").each(function(i){
                    this.onclick = function(){open_chat('&message'); mark_unread_message();};
                });
                check_invitation_message(data.messages);
            } else {
                $(".icon_newmessage").css({'display': 'none'});
                $(".newmessagepop").css({'display': 'none'});
                $("#unread_live").css({'display': 'none'});
            }
            var unread_email_cnt = $('.d_email_nows').attr('data');
            var unread_winks_cnt = $('.d_winks_nows').attr('data');
            if (unread_email_cnt > 0 || unread_winks_cnt > 0 || data.count > 0) {
                //$('#notification_bar').show();
                $("#wel_note").hide();
                $("#msg_note").show();
            } else {
                $("#wel_note").show();
                $("#msg_note").hide();
            }
        }
    });
}

function mark_unread_message() {
    jQuery.ajax( {
        type: 'get',
        url: url_map_f('/chat/get_unread_message_cnt_'),
        data: { mark_id: maxid ? maxid : 0, ajaxRequestUncache: parseInt(Math.random() * 1000000) },
        dataType: 'json',
        success: function(data) {
//            $(".icon_newmessage").css({'display': 'none'});
//            $(".newmessagepop").css({'display': 'none'});
//            $("#unread_live").css({'display': 'none'});
        }
    });
}

function set_unread_stats(unread) {
    if (unread.match(/^\d+\|\d+/)) {
        var stats = unread.split('|');
        $('.d_email_nows').attr({'data':stats[0]});
        $('.d_winks_nows').attr({'data':stats[1]});
        $('.d_gifts_nows').attr({'data':stats[2]});
        if (stats[0] > 0) {
            $('#unread_email').show().text(stats[0]);
            $('#unread_email_bar').text(stats[0]);
            $('.d_email_nows').show();
        }
        if (stats[1] > 0) {
            $('#unread_wink').show().text(stats[1]);
            $('#unread_wink_bar').text(stats[1]);
            $('.d_winks_nows').show();
        }
        if (stats[2] > 0) {
            $('#unread_gift').show().text(stats[2]);
            $('#unread_gift_bar').text(stats[2]);
            $('.d_gifts_nows').show();
        }
        var unread_message_cnt = $('.d_message_nows').attr('data');
        if (stats[0] > 0 || stats[1] > 0 || stats[2] > 0 || unread_message_cnt > 0) {
            //$("#notification_bar").show();
            $("#wel_note").hide();
            $("#msg_note").show();
        } else {
            $("#wel_note").show();
            $("#msg_note").hide();
        }
    }
}
function get_unread_mails(usr_id) {
    try {
        $.ajax({
            type: "GET",
            url: url_map_f('_get_unread_mails_'),
            cache: true,
            dataType: "text",
            data: {usr_id: usr_id},
            success: function(unread) {
                set_unread_stats($.trim(unread));
            }
        });
    } catch (e) {}
}

function get_unread_notifications() {
    $.ajax({
        type: "GET",
        url: url_map_f('/modules/_get_unread_notification_'),
        cache: true,
        dataType: "json",
        success: function(unread) {
            $('#unread_sys_notifi_bar').nextAll().remove();
            if (unread.cnt) {
                $('#unread_sys_notifi_bar').text(unread.cnt);
                $('#unread_sys_notifi_bar').after(unread.html);
                $('.d_message_notice').show();
            } else {
                $('#unread_sys_notifi_bar').text('0');
                $('.d_message_notice').hide();
            }
        }
    });
}

function mark_read_notification(notifi_type) {
    $.ajax({
        type: "POST",
        url: url_map_f('/modules/_get_unread_notification_'),
        data: { notification_type: notifi_type },
        dataType: "json",
        success: function(status) {
            if (status.error == 0) {
                $('.d_message_notice #notifi_type'+notifi_type).remove();
                var all_cnt = parseInt($('#unread_sys_notifi_bar').text());
                var remove_cnt = parseInt(status.cnt);
                if (all_cnt > remove_cnt) {
                    $('#unread_sys_notifi_bar').text(all_cnt - remove_cnt);
                } else {
                    $('#unread_sys_notifi_bar').text('0');
                    $('.d_message_notice').hide();
                }
            }
        }
    });
}

// -------------------------------------------------------------------


function check_month(month) {
    $('.selected_month_tb').removeClass('upgrade-current');
    $('#selected_month_tb_' + month).addClass('upgrade-current');
    $('.selected_month_').removeClass('selected');
    $('#selected_month_' + month).addClass('selected');
}

function show_no_permission() {
    var html = '<h4 style="text-align:center; padding:20px 0 30px 0; font-size:16px; font-weight:normal;">You have reached the maximum number for sending requests, please try again tomorrow.</h4>';
    $.popup(html, {
        button:[
            {
                val: "OK",
            },
        ]
    });
}

function check_search_username() {
    var error = '<span class="font_red">"Username" is required</span>';
    var user_keyword = $('#user_keyword').val();
    if (!user_keyword) {
        $('#user_keyword_info').html(error);
        return false;
    }
    return true;
}

function CheckPassLenght(c,from)
{
    var i = 4;
    if (from && from == 'affiliate') {
        document.getElementById('view').style.color='#000000';
        i = 6;
    } else {
        document.getElementById('view').style.color='#000000';
    }
    if (from == 'ms') {
        document.getElementById('view').innerHTML = '';
    } else {
        if (i == 4) {
            document.getElementById('view').innerHTML = '(Minimum 4 characters for security reasons. No spaces or special characters.)';
        } else if (i == 6) {
            document.getElementById('view').innerHTML = '(Minimum 6 characters for security reasons. No spaces or special characters.)';
        } else {
            alert("Report translation bug!");
        }
    }
    document.getElementById('view').style.fontWeight = '';
    if ( (c.value.length < i) || (c.value.length > 12) ) {
        if (i == 4) {
            document.getElementById('view').innerHTML = '(Your password must contain between 4 and 12 characters. No spaces or special characters.)';
        } else if (i == 6) {
            document.getElementById('view').innerHTML = '(Your password must contain between 6 and 12 characters. No spaces or special characters.)';
        } else {
            alert("Report translation bug!");
        }
        document.getElementById('view').style.color = '#FF0000';
        c.value = '';
    } else if (c.value.match(/\W/)) {
        document.getElementById('view').innerHTML = 'Your password contains invalid characters! Please choose another password comprised only of letters and numbers with no spaces.';
        document.getElementById('view').style.color = '#FF0000';
        document.getElementById('view').style.fontWeight = 'bold';
        c.value = '';
    }
}

function jquery_add_to_favorite (match_id, username, type, not_show_popup, url_keys) {
    if (username) {
        jQuery("#favorite_add_comment_" + match_id).html("<b>saving...</b>");
    } else {
        jQuery("#favorite_add_" + match_id).html("<b>saving...</b>");
        jQuery("input[name='fav_button']").each(function(){
            jQuery(this).val("saving");
        });
        $('#favorite_link').html("<span>saving</span>");
    }

    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_user_info_by_jquery'),
        data: "action=favorite_add&match_id=" + match_id,
        success: function(info){
            if (jQuery.trim(info) == 'no_permission') {
                show_no_permission();
                return false;
            }
            if (username) {
                if (type == 3) {
                    //new my account You Might Like member
                    $('#home_add_to_favorite_' + match_id).hide();
                    $('#home_already_favorite_' + match_id).show();
                } else if (type == 4) {
                    $('.newsfeed_add_fav_' + match_id).hide();
                    $('.newsfeed_already_fav_' + match_id).show();
                } else {
                    jQuery("#favorite_add_comment_" + match_id).html('Already in <a target="_blank" href="https://www.millionairematch.com/favorites">favorites</a>');
                    jQuery('#fav_comment_title_' + match_id).show();
                    jQuery('#favorite_rank_' + match_id).load('/favorite_rank_?prof_id=' + match_id + '&title=1');
                }
            } else {
                if (type == 1) {
                    jQuery("#favorite_add_comment_" + match_id).html('Already in <a href="https://www.millionairematch.com/favorites" target="_blank">favorites</a>');
                }
                jQuery("#favorite_add_" + match_id).show();
            }
            jQuery("#favorite_add_" + match_id).html('Already in <a href="https://www.millionairematch.com/favorites" target="_blank">favorites</a>');
            jQuery("#home_add_to_favorite_" + match_id).attr({'title':'Already in favorites', 'onclick':''}).html('Already in favorites');
            jQuery('[data-uid="' + match_id + '"]').attr({'title':'Already in favorites', 'onclick':''}).html('Already in favorites');

            jQuery("input[name='fav_button']").each(function(){
                jQuery(this).val("Already in favorites");
                jQuery(this).show();
                var obj = jQuery(this)[0];
                obj.onclick = new Function("window.open('favorites','','')");
            });
            $('#favorite_link').html("<a href=\"/favorites\"><span>Already in favorites</span></a>");
            $('#favorite_link_new_ui').parent('div').addClass('a_visited');
            $('#favorite_link_new_ui').html("<a href=\"/favorites\"><span></span>Already in favorites</a>");
            if (info && info.length > 10) {
                if (not_show_popup != 1) {
                    $.popup( info );
                }
            }
            if (url_keys){
                window.location.href = url_map_f("/add_favorite_success?prof_id=" + match_id + '&url_keys=' + url_keys);
            }
        }
    });
}

function jquery_add_profiles_to_favorite (){
    var match_id;
    var count = 0;
    var del = document.getElementsByName('del');
    for (var i = 0; i < del.length; i++) {
        if( del[i].checked ) {
            match_id = del[i].value;
            jquery_add_to_favorite( match_id, null, 1 );
            count ++;
        }
    }
    if ( count ==0 ){
        alert("You did not select profiles to add to your favorite profile list.")
    }
}

var current_story_pic_code;
var current_story_pic_desc;

function GetStoryShowPic(code, usr_id, max) {
    var now_pic_id;
    if (code > 0) {
        if (max == 3) {
            if (current_story_pic_code == 'photo_show_' + usr_id + '_2') {
                $('#photo_' + usr_id + '_1').hide();
                $('#photo_' + usr_id + '_2').hide();
                $('#photo_' + usr_id + '_3').show();
                current_story_pic_code = 'photo_show_' + usr_id + '_3';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_3';
                now_pic_id = 3;
            } else if (current_story_pic_code == 'photo_show_' + usr_id + '_3') {
                $('#photo_' + usr_id + '_1').show();
                $('#photo_' + usr_id + '_2').hide();
                $('#photo_' + usr_id + '_3').hide();
                current_story_pic_code = 'photo_show_' + usr_id + '_1';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_1';
                now_pic_id = 1;
            } else {
                $('#photo_' + usr_id + '_1').hide();
                $('#photo_' + usr_id + '_2').show();
                $('#photo_' + usr_id + '_3').hide();
                current_story_pic_code = 'photo_show_' + usr_id + '_2';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_2';
                now_pic_id = 2;
            }
        } else if (max == 2) {
            if (current_story_pic_code == 'photo_show_' + usr_id + '_3') {
                $('#photo_' + usr_id + '_2').hide();
                $('#photo_' + usr_id + '_3').show();
                current_story_pic_code = 'photo_show_' + usr_id + '_2';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_2';
                now_pic_id = 1;
            } else {
                $('#photo_' + usr_id + '_2').show();
                $('#photo_' + usr_id + '_3').hide();
                current_story_pic_code = 'photo_show_' + usr_id + '_3';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_3';
                now_pic_id = 2;
            }
        }
    } else {
        if (max == 3) {
            if (current_story_pic_code == 'photo_show_' + usr_id + '_3') {
                $('#photo_' + usr_id + '_1').hide();
                $('#photo_' + usr_id + '_2').show();
                $('#photo_' + usr_id + '_3').hide();
                current_story_pic_code = 'photo_show_' + usr_id + '_2';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_2';
                now_pic_id = 2;
            } else if (current_story_pic_code == 'photo_show_' + usr_id + '_2') {
                $('#photo_' + usr_id + '_1').show();
                $('#photo_' + usr_id + '_2').hide();
                $('#photo_' + usr_id + '_3').hide();
                current_story_pic_code = 'photo_show_' + usr_id + '_1';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_1';
                now_pic_id = 1;
            } else {
                $('#photo_' + usr_id + '_1').hide();
                $('#photo_' + usr_id + '_2').hide();
                $('#photo_' + usr_id + '_3').show();
                current_story_pic_code = 'photo_show_' + usr_id + '_3';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_3';
                now_pic_id = 3;
            }
        } else if (max == 2) {
            if (current_story_pic_code == 'photo_show_' + usr_id + '_3') {
                $('#photo_' + usr_id + '_2').hide();
                $('#photo_' + usr_id + '_3').show();
                current_story_pic_code = 'photo_show_' + usr_id + '_2';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_2';
                now_pic_id = 1;
            } else {
                $('#photo_' + usr_id + '_2').show();
                $('#photo_' + usr_id + '_3').hide();
                current_story_pic_code = 'photo_show_' + usr_id + '_3';
                current_story_pic_desc = 'pic_desc_' + usr_id + '_3';
                now_pic_id = 2;
            }
        }
    }
    $("#show_now_pic_num").html(now_pic_id);
}

function view_bigger_picture_new(u, w, h, decription_div, story_pic_p1, story_pic_p2){
    var html = '<div class="story_bigphoto">'
                + '<div class="pho_num"></div>'
                + '<div class="icon_pre"><a href="javascript:void(0);"></a></div>'
                + '<div class="icon_next"><a href="javascript:void(0);"></a></div>'
                + '<img src="" />'
                + '<p id="picture_decription"></p>'
            + '</div>';
    $.popup().close();
    $.popup( html );
    var dom = $('#a_popup_wrapper');
    dom.bind('contextmenu', function(e) {
        return false;
    });

    var show_num = dom.find('.pho_num');
    var img = dom.find('.story_bigphoto img');
    var arrow_left = dom.find('.story_bigphoto .icon_pre a');
    var arrow_right = dom.find('.story_bigphoto .icon_next a');
    current_story_pic_code = '';
    if (story_pic_p1 && story_pic_p2 > 1) {
        var tmp = decription_div.split(story_pic_p1 + '_');
        var now_pic = parseInt(tmp[tmp.length - 1]);
        current_story_pic_code = 'photo_show_' + story_pic_p1 + '_' + (story_pic_p2 == 3 ? now_pic : ( now_pic == 2 ? 3 : 2));
        show_num.html('(<span id="show_now_pic_num">' + now_pic + '</span> / <span>' + story_pic_p2 + '</span>)');
    }

    function changeImgSize() {
        img.css("width","");
        img.css("height","");
        var w = img.get(0).width;
        var h = img.get(0).height;

        w = parseInt(w);
        h = parseInt(h);
        var k = h/w;
        if (w > 640) {
            w = 640;
            h = w*k;
        }
        if (w < 300) {
            w = 300;
            h = w*k;
        }
        if ( h + 120 > $(window).height() ) {
            h = $(window).height() - 120;
            w = h/k;
        }
        img.width(w);
        img.height(h);
        img.css('visibility', '');
        var top = parseInt(($(window).height() - (h + 30))/2) > 0 ? parseInt(($(window).height() - (h + 30))/2) : 0;
        dom.css('top', top +'px');
    }

    if (!w) {
        img.load(function() {
            img.css("width","");
            img.css("height","");
            changeImgSize();
            var cur_decription_content = current_story_pic_desc ? $("#" + current_story_pic_desc).html() : decription_div ? $("#" + decription_div).html() : $("#about_info").html();
            $('#picture_decription').html(cur_decription_content);
            img.css('visibility', 'visible');
        });
    } else {
        img.load(function() {
            var cur_decription_content = current_story_pic_desc ? $("#" + current_story_pic_desc).html() : decription_div ? $("#" + decription_div).html() : $("#about_info").html();
            $('#picture_decription').html(cur_decription_content);
            img.css('visibility', 'visible');
        });
    }

    var show_img = function() {
        if (story_pic_p1 && story_pic_p2>1) {
            if ($('#' + current_story_pic_code + ' img').attr('original_pic')) {
                img.attr('src', $('#' + current_story_pic_code + ' img').attr('original_pic'));
            } else {
                img.attr('src', $('#' + current_story_pic_code + ' img').attr('src'));
            }
            arrow_left.show();
            arrow_right.show();
            changeImgSize();
        } else {
            if ( story_pic_p2 == 1 ) {
                img.attr('src',u);
                arrow_left.hide();
                arrow_right.hide();
                changeImgSize();
            }
        }
    };
    img.attr('src', '');
    img.css('visibility', 'hidden');
    show_img();
    changeImgSize();
    arrow_left.click(function() {
        $("#picture_decription").html('');
        img.attr('src', '');
        img.css('visibility', 'hidden');
        if (story_pic_p1 && story_pic_p2) {
            GetStoryShowPic(0, story_pic_p1, story_pic_p2);
        } else {
            GetShow(current_code - 1);
        }
        show_img();
    });
    arrow_right.click(function() {
        $("#picture_decription").html('');
        img.attr('src', '');
        img.css('visibility', 'hidden');
        if (story_pic_p1 && story_pic_p2) {
            GetStoryShowPic(1, story_pic_p1, story_pic_p2);
        } else {
            GetShow(current_code + 1);
        }
        show_img();
    });
}

/**
 * view picture with fullscreen mode
 * u : image's url
 * w : image's width
 * h : image's height
 */
function view_bigger_picture(u, w, h, decription_div, story_pic_p1, story_pic_p2, like_usr_id, liked, only_show_one){
    var mask = $(document.createElement('div'));
    mask.css({ 'background': 'none repeat scroll 0 0 #000000', 'position': 'absolute', 'z-index': '2000', 'left': '0px', 'top': '0px', 'display': 'none', 'width': '100%', 'height': '100%', 'opacity': '0.2' });
    $(document.body).append(mask);
    if (like_usr_id) jquery_user_view(like_usr_id);
    var box = $(document.createElement('div'));
    box.css({ 'padding': '0px', 'margin': '0px', 'z-index': '2500', 'position': 'absolute', 'display': 'none', 'width': '48px', 'height': 'auto' });
    box.attr('id', 'pop_up_box');
    box.bind('contextmenu', function(e) {
        return false;
    });

    var header = $(document.createElement('div'));
    header.addClass('pop_header');
    header.append('<div class="tl"></div><div class="bg"></div><div class="tr"></div>');

    box.append(header);

    var close = $(document.createElement('a'));
    close.html('<img src="https://images.tmatch.com/common-de/box_close_square_btn.png" width="27" height="27" border="0" />');
    close.attr('href','javascript: void(0);');
    close.attr('id', 'box_close_link');
    close.click(function() {
        current_story_pic_desc = '';
        box.fadeOut("fast", function() {
            box.replaceWith('');
            mask.fadeOut("fast", function() {
                mask.replaceWith('');
            });
        });
    });
    close.css({ 'right': '15px', 'top': '5px', 'position': 'absolute', 'width': '27px', 'height': '27px' });

    var like_btn;
    var content = $(document.createElement('div'));
    content.addClass('pop_content');

    var top_link = $("#top_link").html();
    if (top_link) {
        content.append('<div align="center" style="font-weight: bold; margin: 0px 10px 0px; background-color: #ffffff; font-size: 13px;">' + top_link + '</div>');
    }

    var loading = $(document.createElement('div'));
    loading.addClass('pop_loading');
    content.append(loading);

    var img = $(document.createElement('img'));
    var show_num = $(document.createElement('div'));
    show_num.attr('class','phptoalbum-next-btn');
    show_num.css({'height': '20px', 'text-align': 'left', 'background-color': '#fff', 'margin': '0px 10px', 'padding': '13px 5px 0px', 'font-size': '14px'});
    if (window.max_code && !only_show_one || (story_pic_p1 && story_pic_p2 > 1)) {
        var show_img = function() {
            if (w && h) {
                changeBoxSize();
            }
            if ($('#poplink').length) {
                if ($('#poplink').attr('href').slice(-3) == 'pay') {
                    window.open($('#poplink').attr('href'), $('#poplink').attr('target'));
                } else {
                    if ($('#poplink img:first').attr('original_pic')) {
                        img.attr('src', $('#poplink img:first').attr('original_pic'));
                    } else {
                        img.attr('src', $('#poplink img:first').attr('src'));
                    }
                }
            } else {
                if ($('#GetInfo').length) {
                    if ($('#GetInfo a:first').attr('href').slice(-3) == 'pay') {
                        img.attr('src', $('#GetInfo img:first').attr('src'));
                        window.open($('#GetInfo a:first').attr('href'), $('#GetInfo a:first').attr('target'));
                    } else {
                        if ($('#GetInfo img:first').attr('original_pic')) {
                            img.attr('src', $('#GetInfo img:first').attr('original_pic'));
                        } else {
                            img.attr('src', $('#GetInfo img:first').attr('src'));
                        }
                    }
                } else {
                    if (story_pic_p1 && story_pic_p2) {
                        setMaskSize();
                        if ($('#' + current_story_pic_code + ' img').attr('original_pic')) {
                            img.attr('src', $('#' + current_story_pic_code + ' img').attr('original_pic'));
                        } else {
                            img.attr('src', $('#' + current_story_pic_code + ' img').attr('src'));
                        }
                        changeImgSize();
                    }
                }
            }
        };

        var arrow_left = $(document.createElement('a'));
        var arrow_right = $(document.createElement('a'));
        arrow_left.html('&lt;&lt; prev');
        arrow_left.attr('href','javascript: void(0);');
        arrow_left.css({'margin-right': '5px', 'float': 'none'});
        arrow_right.html('next &gt;&gt;');
        arrow_right.attr('href','javascript: void(0);');
        arrow_right.css({'margin-left': '5px', 'float': 'none'});
        if (window.max_code) {
            show_num.html('Photo <span id="show_now_pic_num">' + (current_code + 1) + '</span> of <span>' + (max_code + 1) + '</span>');
        } else if (story_pic_p1 && story_pic_p2 > 1) {
            var tmp = decription_div.split(story_pic_p1 + '_');
            var now_pic = parseInt(tmp[tmp.length - 1]);
            current_story_pic_code = 'photo_show_' + story_pic_p1 + '_' + (story_pic_p2 == 3 ? now_pic : ( now_pic == 2 ? 3 : 2));
            show_num.html('(<span id="show_now_pic_num">' + now_pic + '</span> / <span>' + story_pic_p2 + '</span>)');
        }
        arrow_left.click(function() {
            $("#picture_decription").html('');
            img.attr('src', '');
            img.css('visibility', 'hidden');
            if (story_pic_p1 && story_pic_p2) {
                GetStoryShowPic(0, story_pic_p1, story_pic_p2);
            } else {
                GetShow(current_code - 1);
            }
            show_img();
        });
        arrow_right.click(function() {
            $("#picture_decription").html('');
            img.attr('src', '');
            img.css('visibility', 'hidden');
            if (story_pic_p1 && story_pic_p2) {
                GetStoryShowPic(1, story_pic_p1, story_pic_p2);
            } else {
                GetShow(current_code + 1);
            }
            show_img();
        });
        show_num.prepend(arrow_left);
        show_num.append(arrow_right);
        content.prepend(show_num);

        img.mousemove(function(e) {
            var e = e || window.event;
            var mousePosX = parseInt(e.pageX ? e.pageX : (e.clientX + document.body.scrollLeft - document.body.clientLeft));
            if (parseInt(mousePosX - img.offset().left) < parseInt(img.width()/2)) {
                img.css('cursor', 'url("https://images.tmatch.com/common-de/pic_viewer_left.cur"), auto');
            } else {
                img.css('cursor', 'url("https://images.tmatch.com/common-de/pic_viewer_right.cur"), auto');
            }
        });
        img.click(function(e) {
            var e = e || window.event;
            var mousePosX = parseInt(e.pageX ? e.pageX : (e.clientX + document.body.scrollLeft - document.body.clientLeft));
            var isLeftArea = parseInt(mousePosX - img.offset().left) < parseInt(img.width()/2);
            $("#picture_decription").html('');
            img.attr('src', '');
            img.css('visibility', 'hidden');
            if (isLeftArea) {
                if (story_pic_p1 && story_pic_p2) {
                    GetStoryShowPic(0, story_pic_p1, story_pic_p2);
                } else {
                    GetShow(current_code - 1);
                }
            } else {
                if (story_pic_p1 && story_pic_p2) {
                    GetStoryShowPic(1, story_pic_p1, story_pic_p2);
                } else {
                    GetShow(current_code + 1);
                }
            }
            show_img();
        });
    }
    img.css('border', '5px solid #ffffff');
    loading.append(img);

    content.append('<div id="picture_decription" align="center" style="font-weight: bold; margin: 0px 10px 0px; background-color: #ffffff;"></div>');
    content.append(close);
    if (like_btn) {
        content.append(like_btn);
    }
    box.append(content);

    var footer = $(document.createElement('div'));
    footer.addClass('pop_footer');
    footer.append('<div class="bl"></div><div class="bg"></div><div class="br"></div>');
    box.append(footer);

    $(document.body).append(box);

    if (!w) {
        img.load(function() {
            img.css("width","");
            img.css("height","");
            changeImgSize();
            var cur_decription_content = current_story_pic_desc ? $("#" + current_story_pic_desc).html() : decription_div ? $("#" + decription_div).html() : $("#about_info").html();
            $('#picture_decription').html(cur_decription_content);
            box.css('visibility', 'visible');
            img.css('visibility', 'visible');
        });
        initBoxSize();
    } else {
        img.load(function() {
            var cur_decription_content = current_story_pic_desc ? $("#" + current_story_pic_desc).html() : decription_div ? $("#" + decription_div).html() : $("#about_info").html();
            $('#picture_decription').html(cur_decription_content);
            img.css('visibility', 'visible');
        });
    }
    changeBoxSize();
    mask.css('opacity','0');
    mask.fadeTo("slow", 0.2, function() {
        box.show();
        img.attr('src', u);
    });
    mask.click(function() {close.click();});
    function changeImgSize() {
        img.load(function() {
            img.css("width","");
            img.css("height","");
            var w = img.get(0).width;
            var h = img.get(0).height;

            w = parseInt(w);
            h = parseInt(h);
            var k = h/w;
            if (w > 640) {
                w = 640;
                h = w*k;
            }
            if (w < 300) {
                w = 300;
                h = w*k;
            }
            var left = parseInt(($(window).width() - (w + 30))/2) > 0 ? parseInt(($(window).width() - (w + 30))/2) : 100;
            var top = parseInt(($(window).height() - (h + 30))/2) > 0 ? parseInt(($(window).height() - (h + 30))/2) : 100;
            box.css('left', ($(document).scrollLeft() + left) + 'px');
            box.css('top', ($(document).scrollTop() + top) +'px');
            box.css('width', parseInt(w + 30) + 'px');
            box.find(".bg").css('width', parseInt(w + 10) + 'px');
            img.width(w);
            img.height(h);
            $(window).resize(function(){changeBoxSize();});
        });

    }
    function setMaskSize() {
        mask.css('width', $(document).width() + 'px');
        mask.css('height', $(document).height() + 'px');
    }
    function changeBoxSize() {
        setMaskSize();
        changeImgSize();
    }
    function initBoxSize() {
        setMaskSize();
        box.css('visibility', 'hidden');
        box.css('left', $(document).scrollLeft() + 'px');
        box.css('top', $(document).scrollTop() + 'px');
        box.css('width', '30px');
        box.find(".bg").css('width', '10px');
    }
}

function delete_answer_confirm(author_id) {
    var alert_text = 'Are you sure you want to remove the answers from this member?';
    $.popup(alert_text, {
        button:[
            {
                val: "Yes",
                callback:function(){
                    window.location.href=url_map_f('/who_had_answer?delete_answer=1&author_id=' + author_id);
                }
            },
            {
                val: "No"
            }
        ]
    });
}

function refresh_confirm_number(obj, captcha_item) {
    obj.src = 'show_captcha_?item=' + captcha_item + '&r=' + Math.random();
}

function refresh_confirm_number2(obj, username) {
    obj.src = '/modules/show_captcha2_?username=' + username + '&r=' + Math.random();
}

function reply_current_questions(prof_id, n) {
    $.popup({ ajax: 'reply_questions_?prof_id=' +  prof_id + '&n=' + n});
}

function reply_questions(prof_id, n) {
    var text = $("#text_content").val();

    if (text == '')
        return false;

    $.getJSON(
        url_map_f("_process_questions_reponse"),
        { prof_id: prof_id, text: text },
        function(data) {
            if (data.ret == 0) {
                $.popup(data.error);
            }
            if (data.ret == 1) {
                $.popup(data.msg);
                $('#show_answer_' + n).html('<span style="color: blue">My answer: </span>' + $.trim(data.answer));
                $("#re_answer_"  + prof_id).show();
                $("#answer_"  + prof_id).hide();
            }
        }
    );
}

function checkaddress(f) {
    var mailError = 0;
    var mailList = $("#mail_list").val();
    if (mailList == "") {
        mailError = 1;
    }
    if (mailError) {
        return error_show("A valid email address is required!");
    }

    var emails1 = "";
    var email1;
    var noValidAddress = true;
    var maillistarray, maillist;
    var obj = f.elements['mail_list'];
    var text = obj.value.trim();

    maillistarray = text.split(/[,;\n\s]\s*/);
    var wrong_email = '';
    for (maillist in maillistarray) {
        email1 = maillistarray[maillist];
        if (checkemail(email1)) {
            noValidAddress = false;
        } else {
            if (email1.length > 0) {
                wrong_email += email1 + ","
            }
        }
        if (email1.length > 0 && emails1.indexOf(email1 + ",") != -1) {
            return error_show("You have inputted duplicated email address!");
        }
        emails1 += email1 + ",";
    }
    if (noValidAddress) {
        return error_show("You haven't inputted any valid email address!");
    }
    if (wrong_email) {
        return error_show("The following email address is not valid: " + wrong_email.substring(0, wrong_email.length - 1));
    }
    return true;
}

var submitForm, c_form_name, c_formtag, c_text, c_extra;

function check_spell_open(form_text_tag,form_name){
    if (!form_name) form_name ='update';
    var text = document.getElementById(form_text_tag).value;
    var real_url = '/spell_checker_';
    if(text.length < 1000) {
      return PopUpEx( encodeURI( real_url+'?form_name='+form_name+'&form_text_tag='+form_text_tag+'&text='+text ), 'check_spell',500,400,'yes');
    }

    PopUpEx('about:blank','check_spell',500,400,'yes');

    if(typeof(submitForm) == 'undefined') {
        submitForm = document.createElement("FORM");
        document.body.appendChild(submitForm);
        c_form_name = createHiddenFormElement(submitForm, "form_name", form_name);
        c_formtag = createHiddenFormElement(submitForm, "form_text_tag", form_text_tag);
        c_text=  createHiddenFormElement(submitForm, "text", text);
    } else {
        c_form_name.value = form_name;
        c_formtag.value = form_text_tag;
        c_text.value = text;
    }
    submitForm.method = "POST";
    submitForm.target = 'check_spell';
    submitForm.action= real_url;
    submitForm.submit();
}

function check_spell(form_text_tag,form_name){
      if (!form_name) form_name ='update';
      var text = document.getElementById(form_text_tag).value;
      var reg = /\bblog\b|\bblogs\b|\bblogging\b|\bblogland\b|\bbloggers\b/gi;
      text = text.replace(reg,"");
      var real_url = '_check_spell';
      jQuery.ajax({
          type: "POST",
          url: url_map_f(real_url),
          data: {
              form_name: form_name, form_text_tag: form_text_tag, text: escape(text), ajaxRequestUncache: parseInt(Math.random() * 1000000)
          },
          success: function(info){
             if(jQuery.trim(info)=='1'){
                //alert("No misspelling found!");
                var tips_text = 'No misspelling found!';
                $.popup(tips_text, {
                    button:[
                        {
                            val: "OK",
                        },
                    ]
                });
             }else{
                check_spell_open(form_text_tag,form_name);
             }
          }
      });
}

function show_profile_pending_note() {
    var alert_text = '        <div class="a_popup_wrapper"><div class="a_popup_container">            <i class="a_delete"><a href="javascript:void(0)" onclick="$(\'.a_popup_wrapper\').hide();$(\'.a_popup_shadow\').hide();"></a></i>            <h2>Your profile is pending approval within 1 working day. Please check back.</h2>        </div></div><div class="a_popup_shadow"></div>';
    add_new_item_by_id('ask_to_verify_div', alert_text);
}
function profile_incomplete_note(profile_complete) {
    var alert_text = 'Your profile is ' + profile_complete*10 + '% complete. A 100% completed profile = 5x more contacts.';
    var buttons = [{
            val: 'Complete profile now',
            callback: function() {
                window.location.href = '/my_profile?profile_group=own_words';
            }
        }];
    $.popup(alert_text, { button: buttons });
}
var stype = 0;
var sskip_profile = 0;
var sflirttype = 1;
function send_wink(prof_id, skip_profile, type, flirttype, cb) {
    if (type != 0) {
        stype = type;
    }
    if (flirttype == undefined) {
        flirttype = 1;
    }
    sflirttype = flirttype;
    sskip_profile = skip_profile;

    var res = true;
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_wink'),
        async: false,
        data: {send: 0, match_id: prof_id, skip_profile: skip_profile, type: type, flirttype: flirttype, rd: Math.random()},
        success: function(data) {
            res = false;
            add_new_item_by_id('send_wink_div', data);
            if (typeof(cb) === 'object') {
                cb.onSuccess();
            }
        }
    });
    return res;
}

function RevealProfileAjax(prof_id, type) {
    $.ajax({
        type: 'get',
        url: url_map_f('set_hidden_'),
        data: "hide=0&jump=0&ajax=1&ajaxRequestUncache=" + parseInt(Math.random() * 1000000),
        dataType: "json",
        success: function(info){
            if (info.ret == 1)
            {
                $('.a_popup_wrapper').hide();
                $('.a_popup_shadow').hide();
                if (type == 'send_wink') {
                        send_wink(prof_id, sskip_profile, stype, sflirttype);
                }
            }
        }
    });
}

function change_email(reload_parent) {
    var url = 'change_email_form_?reload_parent=' + reload_parent;
    $('#change_email_form').html('').show();
    $('#change_email_form').load(url_map_f(url));
}

function change_comment_btn_availability(checked_element, btn_id) {
    if ($(checked_element).val().trim()) {
        $('#' + btn_id).removeAttr("disabled");
        $('#' + btn_id).removeClass("contentbtn_disabled"); 
    } else {
        $('#' + btn_id).attr("disabled", "disabled");
        $('#' + btn_id).addClass("contentbtn_disabled"); 
    }
}

function jquery_vote_std_question (std_question_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&std_question_id=" + std_question_id,
        success: function(data){
            jQuery("#msg_q_" + std_question_id).html('<a href="javascript: void(0);" title="Already voted" style="text-decoration: none" class="icon_faq done"></a> ' + data + ' up');
        }
    });
}

function jquery_vote_std_answer (std_answer_id, vote) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "vote=" + vote + "&std_answer_id=" + std_answer_id,
        success: function(data){
            jQuery("#msg_a_" + std_answer_id).html('<a href="javascript: void(0);" title="Already voted" style="text-decoration: none" class="icon_faq done"></a> ' + data + ' up');
        }
    });
}

function jquery_comment_like (about_id, comment_id) {
    jQuery.ajax({
        type: "POST",
        url: url_map_f('_process_vote_by_jquery'),
        data: "about_id=" + about_id + "&comment_id=" + comment_id,
        success: function(data){
            jQuery("#like_comment_" + comment_id).unbind("click").removeAttr('onclick');
            jQuery("#like_comment_" + comment_id).html('<img src="https://images.tmatch.com/common-de/like.png" style="margin:1px 1px auto; border:0; float: left;"/><span style="display: inline-block; margin: 1px 0;">Liked(' + data + ')</span>');
        }
    });
}

function cancel_edit_about(pic_id) {
    $('#about_edit_' + pic_id).hide();
    $('#about_orig_' + pic_id).show();
}

function edit_about(pic_id) {
    $('#about_orig_' + pic_id).hide();
    $('#about_edit_' + pic_id).show();
    $('#cancel_edit_about_' + pic_id).show();
    $('#about_edit_' + pic_id +' textarea[name=photo_description]').val( $('#about_orig_text_' + pic_id ).text() );
}

function delete_photo_confirm_by_fancybox(pic_url, picno, x, photo_is_verify) {
    var alert_text = '<div align="center" style="width: 800px; padding: 20px">        <div><img src="' + pic_url + '" width="' + (x > 360 ? 360 : x) + '" border="0" /></div><br />        <div style="border: 1px solid #ff9a00; width: 95%; margin: 10xp 0px; padding: 10px; text-align: left; background-color: #f6f0f0;">Remember, you can get 20x more interest and responses with photos on your profile. The more photos you have, the more attention you will get.</div><br />        <div style="color: red; text-align: center; height: 30px; font-weight: bold;"> ' + (photo_is_verify ? "Your verified logo will disappear if all photos are removed." : "Are you sure you want to delete this photo?") + '</div>        <div><input onclick="$.fancybox.close();" type="button" value="No" class="buttont_details" style="margin-right: 20px;" /><a href="javascript:void(0);" onclick="window.location.href=\'' + url_map_f("/picture_delete_confirm?picno=" + picno + "&clear=1") + '\';" class="buttont_details" style="text-decoration: none;">Yes</a></div>    </div>';
    $.fancybox(alert_text);
}

function show_move_to_ablum_confirm_by_fancybox(pic_url, pic_id, album_type, x, action, picno, use_fancybox) {
    var album_type_text = action == 'to_pub' ? "Are you sure you want to move this photo to public album?" : "Are you sure you want to move this photo to private album?";
    var alert_text = '<div align="center" style="width: 800px; padding: 20px">        <div><img src="' + pic_url + '" width="' + (x > 360 ? 360 : x) + '" border="0" /></div><br />        <div style="color: red; text-align: center; height: 30px; font-weight: bold;">' + album_type_text + '</div>        <div><input onclick="$.fancybox.close();" type="button" value="No" class="buttont_details" style="margin-right: 20px; width: 100px" /><input onclick="window.location.href=\'' + url_map_f("/move_photo?" + "pic_id=" + pic_id + "&album_type=" + album_type+ "&action=" + action + "&picno=" + picno) + '\';" type="button" style="width: 100px" value="Yes, I want" class="buttont_details" /></div>    </div>';
    $.fancybox(alert_text);
}

function popup_pw_tips(content) {
    $.popup($('#pw_tips'));
}

function modify_quadrate_img(obj, aspect) {
    setTimeout(function(){
        var w = obj.get(0).width;
        var h = obj.get(0).height;
    
        var o = ((w / (h / aspect)) - aspect) / 2;
        if (    o == 0 // excluding undefined values
             || o < aspect * 0.3 //in case sometimes you get http://staff.maosongsoft.com/uploads/7074/41/2/141464037458.gif
           ) {
            obj.css('margin-left', '-' + o + 'px');
        }
    },500);    
}

function replace_html( html ) {
    if (!html) return '';

    html = html.replace( /"/g,  '&quot;' );
    html = html.replace( /</g,  '&lt;'   );
    html = html.replace( />/g,  '&gt;'   );
    html = html.replace( /\n/g, '<br />' );

    return html;
}

function html_file_name(obj, id) {
    var name = $(obj).val();
    $('#' + id).html(name);
} 

function edit_photo_by_fancybox(usr_id, id, pic_url, ix, iy) {
    $('#edit_photo_' + usr_id + '_' + id).load(url_map_f('/picture_edit_?usr_id=' + usr_id +'&pic_url=' + pic_url + '&id=' + id + '&ix=' + ix + '&iy=' + iy));
}

function fb_login() {
    var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
        screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
        outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
        outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
        width = 600,
        height = 280,
        left = parseInt(screenX + ((outerWidth - width) / 2), 10),
        top = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
        features = ('width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
    var url = '/fb/login_url_';
    newwindow = window.open(url, '_blank', features);

    if (window.focus) {
        newwindow.focus()
    }
    return false;
}

function check_if_null(input, btn) {
    var text = $.trim($("#" + input).val());
    var btn_obj = $("#" + btn);

    if (text.length > 0) {
        btn_obj.removeAttr('disabled');
        btn_obj.css("background","url('https://images.tmatch.com/common-de/ico_fashion_submit.png') no-repeat center");
    } else {
        btn_obj.attr('disabled', 'disabled');
        btn_obj.css('background','');
    }
}
function send_response(prof_id) {
    jQuery.ajax({
        type: "get",
        url: url_map_f('reply_first_date_ideas_'),
        data: { prof_id : prof_id },
        success: function(html) {
            $.popup(html);
        }
    });
}
function pop_up_page(url) {
    jQuery.ajax({
        type: "get",
        url: url_map_f(url),
        success: function(html) {
            $.popup(html);
        }
    });
}

function toggle_category(num) {
    $('#type_'+num).toggle();
    $('[id^=type_]').not('#type_'+num).hide();
}

function hide_profile_to_upgrade_confirm() {
    var alert_text = 'This feature is for gold members only!';
    $.popup(alert_text, {
        button:[
            {
                val: "Upgrade now",
                callback:function(){
                    window.location.href='/pay';
                }
            }
        ]
    });
}

function send_checked_topic(from_page) {
    checked_value = '';
    $('input[name=del]').each(function(){
        if (this.checked) {
            checked_value += ($(this).val() + ',');
        }
    });
    if (!checked_value) {
        tip_text = "Note:Please select the topics first";
        $.popup(tip_text, {
            button:[
                {
                    val: "OK",
                }
            ]
        });
        return false;
    }
    var return_url = '';
    var items = ['favorite_blog'];
    if (jQuery.inArray( from_page, items ) == -1) {
        return_url = '/send_forum_to_friend?from_page=' + from_page + '&topic_id=' + checked_value;
    } else {
        return_url = '/send_blog_to_friend?from_page=' + from_page + '&blog_id=' + checked_value;
    }
    window.open(return_url)
}

function change_request_state(prof_id, action_type) {
    tip_text = "Are you sure you want to remove it?";
    $.popup(tip_text, {
        button:[
            {
                buttonClass:"button_white",
                val: "Yes",
                callback:function(){
                    send_request();
                }
            },
            {
                buttonClass:"a_button_primary",
                val: "No, continue",
                callback:function(){
                    $.popup().close();
                }
            }
        ]
    });
    function send_request() {
        jQuery.ajax({
            url: url_map_f('process_search_results_'),
            dataType: 'json',
            data: {"action_type": action_type, "prof_id": prof_id},
            success: function(data){
                if (data.status == 1) {
                    window.location.reload();
                }
            }
        }); 
    }
}
// -->
