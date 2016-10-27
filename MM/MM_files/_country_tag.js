
// global flag
var isIE = false;

// global req_countryuest and XML document objects
var req_country;


// retrieve XML document (reusable generic function);
// parameter is URL string (relative or complete) to
// an .xml file whose Content-Type is a valid XML
// type, such as text/xml; XML source must be from
// same domain as HTML file
function loadCountryXMLDoc(url) {
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req_country = new XMLHttpRequest();
        req_country.onreadystatechange = processreq_countryChange;
        req_country.open("GET", url, true);
        req_country.send(null);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        isIE = true;
            try {
                req_country = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    req_country = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        if (req_country) {
            req_country.onreadystatechange = processreq_countryChange;
            req_country.open("GET", url, true);
            req_country.send();
        }
    }
}

// handle onreadystatechange event of req_country object
function processreq_countryChange() {
    // only if req_country shows "loaded"
    if (req_country.readyState == 4) {
        // only if "OK"
        if (req_country.status == 200) {
     // ...processing statements go here...
            clearList();
            buildList();
            try { 
                var sel = document.update.r_country;
                var func = "country_change_ultra_func("+sel.options[sel.selectedIndex].value+")";
                eval(func); //# RT9475 
            } catch(e) {}
         }
    }
}

// add item to select element the less
// elegant, but compatible way.
function appendToSelect(select, value, content, selected, text) {
    var opt;
    opt = document.createElement("option");
    opt.value = value;
    opt.appendChild(content);
    if (selected) {
        opt.selected = 'selected';
    }
    select.appendChild(opt);
}


// retrieve text of an XML document element, including
// elements using namespaces
function getElementTextNS(prefix, local, parentElem, index) {
    var result = "";
    if (prefix && isIE) {
        // IE/Windows way of handling namespaces
        result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
    } else {
        // the namespace versions of this method 
        // (getElementsByTagNameNS()) operate
        // differently in Safari and Mozilla, but both
        // return value with just local name, provided 
        // there aren't conflicts with non-namespace element
        // names
        result = parentElem.getElementsByTagName(local)[index];
    }
    if (result) {
        // get text, accounting for possible
        // whitespace (carriage return) text nodes 
        if (result.childNodes.length > 1) {
            return result.childNodes[1].nodeValue;
        } else {
            if (result.firstChild){
                 return result.firstChild.nodeValue;
            }else{
                 return "";
            }
        }
    } else {
        return "n/a";
    }
}

// fill  select list with items from
// the current XML document
function buildList() {
    var select = document.update.match_r_state_id;
    var items = req_country.responseXML.getElementsByTagName("item");
    // loop through <item> elements, and add each nested
    // <label> element to  select element
    for (var i = 0; i < items.length; i++) {
        appendToSelect(
            select, 
            getElementTextNS("", "value", items[i], 0),
            document.createTextNode(getElementTextNS("", "label", items[i], 0)),
            i == 0 ? 'selected' : '',
            getElementTextNS("", "label", items[i], 0)
        );
    }
    if (items.length == 0) {
        appendToSelect(select, 0, document.createTextNode('No preference'), 'selected', 'No preference');
    }
}

// empty select list content
function clearList() {
    var select = document.update.match_r_state_id;
    while (select.length > 0) {
        select.remove(0);
    }

}

function showwait(waitid,waittxt){
    var html='<b><font color=#ff000>'+waittxt+'</font></b>';

    if(document.getElementById(waitid+'Disp')) {
        document.getElementById(waitid+'Disp').style.display=waittxt?"":"none";
    } else if (document.getElementById(waitid)) {
        document.getElementById(waitid).style.display = waittxt ? "" : "none";
    }
    if (document.all && document.all.UpdateCountryInfo){
            document.all.UpdateCountryInfo.innerHTML = html;
    }else if (document.getElementById(waitid)){
            document.getElementById(waitid).innerHTML = html;
    }    
}

function UpdateCountryInfo() {
  try {
      var sel = document.update.r_country;
      if (sel.disabled) {return; }
      var cou = sel.options[sel.selectedIndex].value;
      var stats_select = document.getElementById('match_r_state_id').innerHTML;
      if (cou) {
          document.getElementById('match_r_state_id' + '_no').style.display = "none";
          document.getElementById('match_r_state_id').style.display = "";
          if(document.getElementById('bottom_hint')){
          document.getElementById('bottom_hint').style.display="";
          }
          window.setTimeout('UpdateCountryInfoXML()', 500);
      } else {
          document.getElementById('match_r_state_id').style.display = "none";
          if(document.getElementById('bottom_hint')){
          document.getElementById('bottom_hint').style.display="none";
          }
          document.getElementById('match_r_state_id' + '_no').style.display = "";
          document.getElementById('match_r_state_id' + '_no').innerHTML = '<font color="gray" class="state_not_applicable">Not Applicable</font>';
      }
  } catch(e) {alert(e)}
}

function UpdateCountryInfoXML() {
    showwait('UpdateCountryInfo','Please wait...');
    var sel = document.update.r_country;
    if (sel.disabled) {return; }
    var cou = sel.options[sel.selectedIndex].value;
    try {
         loadCountryXMLDoc("/js_fill_states.xml?country="+cou);
         showwait('UpdateCountryInfo','');
    }catch(e) {
         var msg = (typeof e == "string") ? e : ((e.message) ? e.message : "Unknown Error");
         showwait('UpdateCountryInfo','Unable to get XML data:' + msg);
         return;
    }
}

function UpdateState(state_id){
    if (!state_id) {
        state_id = "";
    }
    for (var i = 0; i < document.update.match_r_state_id.length; i++) {
        if (document.update.match_r_state_id[i].value == state_id)
            document.update.match_r_state_id.selectedIndex = i;
    }
}
