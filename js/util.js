//functions gets cookies, pure utility.
function getCookie(name) {
    var v = null ;
    var cookies = document.cookie.split(";");
    cookies.forEach(function(kv) {
        var k_v = kv.split("=");
        if (k_v[0].trim() == name) {
            v = k_v[1];
        }
    });
    return v;
}

function setCookie(name,value){
    var str = name + "=" + value + ";"
    // var location = "." + window.location.hostname;
    var location = window.location.hostname;
    // var str = `${name}=${value};`;
    var defaults = {
        "domain": location,
        "secure":""
    };

    if(window.location.hostname === "localhost" || window.location.hostname === "47.75.70.109"){
        delete defaults["domain"];
        delete defaults["secure"]
    }

    for (var i in defaults) {
        str += ";"+ i;
    }
    // Object.keys(defaults).forEach(def => {
    //     str += `${def}${(defaults[def]) ? "="+defaults[def] : ""};`;
    // });

    document.cookie = str;
    return true;
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.nauticus.io';
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=nauticus.io';
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + window.location.hostname;
    // document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + window.location.hostname;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/*function decodeToken(){
    return JSON.parse(window.atob(getCookie("idToken").split(".")[1]));
}*/
function decodeToken () {
    var base64Url = getCookie("idToken").split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};



function refreshToken(){
    firebase.auth().currentUser.getIdToken(true).then(function (token){
        setCookie("idToken",token);
    })
}

/**
 * @description used to retrieve GET params from the current url.
 * @author /alexatnauticus
 * @param p the key of the GET param
 * @param url (optional) provide a url that contains the GET param
 * @returns {boolean} false if it dosen't exist, true if it does, string if the GET param has a value associated.
 */
function getParam(p,url){
    var a = (url !== undefined) ? url.substr(url.indexOf("?") + 1) : window.location.search.substr(1);
    a = a.split("&");
    var found = "";
    a.forEach(function(param){
        param = param.split("=");
        if(param[0] === p){
            found = param[1];
        }
    });
    return (found === "") ? false : (found === undefined) ? true : found;
}



/*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        firebase.auth().currentUser.getIdToken(true).then(newToken => {
            setCookie("idToken",newToken);
        });
    }
});*/