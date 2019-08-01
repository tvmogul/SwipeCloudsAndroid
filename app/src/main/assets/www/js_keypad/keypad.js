
function GetKeypad(z) {

    if (z == "Up") {
        $("#btnUpperLower").text("Lo");
        $(".ui-btn-corner-x").each(function () {
            $(this).text($(this).text().toUpperCase());
        });
    }
    else if (z == "Lo") {
        $("#btnUpperLower").text("Up");
        $(".ui-btn-corner-x").each(function () {
            $(this).text($(this).text().toLowerCase());
        });
    }
    else if (z == "123") {
        showHide("alpha_pad");
        showHide("num_pad");
        $("#btnNumAlpha").text("abc");
    }
    else if (z == "abc") {
        showHide("alpha_pad");
        showHide("num_pad");
        $("#btnNumAlpha").text("123");
    }
    else {
        if ((z == "clr") || (z == "CLR")) {
            zsearch.value = "";
        }
        else if ((z == "del") || (z == "DEL")) {
            var theString = zsearch.value;
            if (theString.length > 0) {
                zsearch.value = theString.slice(0, -1);
            }
        }
        else if ((z == "sp") || (z == "SP")) {
            zsearch.value = zsearch.value + " ";
        }
        else {
            zsearch.value = zsearch.value + z;
        }
    }

}

//$(document).delegate('#btnUpperLower', 'click', function () {
//    //<button id="btnUpperLower" class="ui-btn ui-btn-inline" data-corners="false">Upper</button>
//    event.preventDefault();
//    var _text = $(this).text();
//    if (_text == "Up") {
//        $("#btnUpperLower").text("Lo");
//        $(".ui-btn-corner-x").each(function () {
//            $(this).text($(this).text().toUpperCase());
//        });
//    }
//    if (_text == "Lo") {
//        $("#btnUpperLower").text("Up");
//        $(".ui-btn-corner-x").each(function () {
//            $(this).text($(this).text().toLowerCase());
//        });
//    }
//    return false;
//});

function showHide(divId) {
    var theDiv = document.getElementById(divId);
    if (theDiv.style.display == "none") {
        theDiv.style.display = "";
    } else {
        theDiv.style.display = "none";
    }
}

//$(document).delegate('#btnNumAlpha', 'click', function () {
//    event.preventDefault();
//    //<button id="btnNumAlpha"class="ui-btn ui-btn-inline" data-corners="false">Num</button>
//    showHide("alpha_pad");
//    showHide("num_pad");
//    var _text = $(this).text();
//    alert("btnNumAlpha: " + _text)
//    if (_text == "123") {
//        //$("#btnNumAlpha").text("abc");
//    }
//    if (_text == "abc") {
//        $("#btnNumAlpha").text("123");
//    }
//});

//$(document).delegate('.ui-btn-corner-x', 'click', function () {
//    //event.preventDefault();
//    //var zid = $(this).data("id");
//    var zid = $(this).text();
//    alert("alpha: " + zid);
//    if ((zid == "clr") || (zid == "CLR")) {
//        zsearch.value = "";
//    }
//    else if ((zid == "del") || (zid == "DEL")) {
//        var theString = zsearch.value;
//        if (theString.length > 0) {
//            zsearch.value = theString.slice(0, -1);
//        }
//    }
//    else if ((zid == "sp") || (zid == "SP")) {
//        zsearch.value = zsearch.value + " ";
//    }
//    else {
//        zsearch.value = zsearch.value + zid;
//    }
//});

//$(document).delegate('.ui-btn-corner-num', 'click', function () {
//    //event.preventDefault();
//    //var zid = $(this).data("id");
//    var zid = $(this).text();
//    alert("num: " + zid);
//    zsearch.value = zsearch.value + zid;
//});

//$(document).delegate('.ui-btn-corner-c', 'click', function () {
//    //event.preventDefault();
//    //var zid = $(this).data("id");
//    var zid = $(this).text();
//    if ((zid == "clr") || (zid == "CLR")) {
//        zsearch.value = "";
//    }
//    else if ((zid == "del") || (zid == "DEL")) {
//        var theString = zsearch.value;
//        if (theString.length > 0) {
//            zsearch.value = theString.slice(0, -1);
//        }
//    }
//    else if ((zid == "sp") || (zid == "SP")) {
//        zsearch.value = zsearch.value + " ";
//    }
//    else {
//        zsearch.value = zsearch.value + zid;
//    }
//});