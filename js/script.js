function autoLink(str) {
    var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
    var regexp_makeLink = function(all, url, h, href) {
        var link = "./link.html?url=h" + encodeURIComponent(href);
        return '<a target="_blank" href="' + link + '">' + url + '</a>';
    }
    return str.replace(regexp_url, regexp_makeLink);
}

function tweetLink(message) {
    var param = {
        text: message.text + " #SheetBbs",
        url: "https://chypot.github.io/sheet_bbs/"
    };
    return "https://twitter.com/intent/tweet?" + $.param(param);
}

function makeCard(message) {
    return $('<div class="card" style="width: 18rem;">'
             + '<div class="card-header">'+ new Date(message.datetime) +'</div>'
             + '<div class="card-body"><h5 class="card-title">' + message.user + '</h5>'
            // + '<h6 class="card-subtitle mb-2 text-muted">'+ message.datetime +'</h6>'
             + '<p class="card-text">'+ autoLink(message.text) +'</p>'
             + '<a target="_blank" href='+ tweetLink(message) +' class="btn btn-outline-primary">♡</a></div></div>');
}

function kickGAS(param) {
    var dataObj =
        (param.mode == "add") ? {count: param.count, user: param.user, text: param.text} : param;
    console.log(dataObj);
    $.ajax({
        type    : 'GET',
        url     : "https://script.google.com/macros/s/AKfycbwclHIIjjt2oQaoR2tF3FIHCE7bJKL712JsdYcgQPpydm7l4RE/exec",
        data    : $.param(dataObj),
        dataType: 'jsonp',
        jsonpCallback   : 'jsoncallback',
        success : function(messages) {
            console.log(messages);
            if (messages.length != 0) {
                $.each(messages.reverse(), function(index, message) {
                    $("#messages").append(makeCard(message));
                });
                var oldest = messages.pop().datetime;
                successLoading();
                setOldest(oldest);
            } else {
                successLoading();
            }
        }
    });
}

function startLoading() {
    $('#load').prop("disabled", true);
    $('#load').html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
    );
}

function successLoading() {
    $('#load').prop("disabled", false);
    $('#load').html('Load');
}

function setOldest(oldest) {
    console.log("oldest: "+oldest);
    $('#load').data("oldest", oldest);
}

function load(until) {
    startLoading();
    var param = {count: 7, until: until};
    kickGAS(param);
}

function reload() {
    var until = $('#load').data("oldest");
    load(until);
}

function add(user, text) {
    var param = {
        mode: "add",
        user: user,
        text: text
    }
    $("#messages").prepend(makeCard({datetime: new Date(), user:user, text:text}));
    kickGAS(param);
}

$(document).ready(function() {
    console.log("ready");
    var now = new Date();
    load(now);
    $("#ok").click(function() {
        var user = $("#add #user").val();
        var text = $("#add #textbody").val();
        add(user, text);
    });
    $("#load").click(function() {
        reload();
    });
});
