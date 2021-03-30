//This script sets a global variable called userID using cookies.
//If the userID cookie exists, it reads that
//Otherwise, it sets the userID to random integer
//userID cookie expires after 24 hours

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkUserIDExists() {
    var username = getCookie("userID");
    if (username != "") {
        return true
    } else {
        return false
    }
}

function setUserID(exdays) {
    //cookie lasts 1 day
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();

    cvalue = getRandomInt(100)

    document.cookie = "userID=" + cvalue + ";" + expires + ";path=/";
}

let globalUserID;
if (checkUserIDExists()) {
    globalUserID = getCookie('userID')
} else {
    setUserID(1)
    globalUserID = getCookie('userID')
}

console.log('Signed in as random userID: '+globalUserID)