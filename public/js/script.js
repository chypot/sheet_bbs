function makeCard(message) {
    return $('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + message.user + '</h5>'
             + '<h6 class="card-subtitle mb-2 text-muted">'+ message.datetime +'</h6>'
             + '<p class="card-text">'+ message.text +'</p><a href="#" class="btn">Go somewhere</a></div></div>');
}

function kickGAS(param) {
    var dataObj =
        (param.mode == "add") ? {count: param.count, user: param.user, text: param.text} : {count: param.count};
    console.log(dataObj);
    $.ajax({
    type    : 'GET',
    url     : "https://script.google.com/macros/s/AKfycbwclHIIjjt2oQaoR2tF3FIHCE7bJKL712JsdYcgQPpydm7l4RE/exec",
    data    : $.param(dataObj),
    dataType: 'jsonp',
    jsonpCallback   : 'jsoncallback',
    success : function(messages) {
        $.each(messages, function(index, message) {
            console.log(message);
            $("body").append(makeCard(message));
        });

    }
});

}

function load() {
    var param = {count: 3};
    kickGAS(param);
}

function addAndLoad(user, text) {
    var param = {
        count: 1,
        mode: "add",
        user: user,
        text: text
    }
    kickGAS(param);
}

$(document).ready(function() {
    console.log("ready");
    load();
    $("#ok").click(function() {
        console.log("clicked!");
        var user = $("#add [name=user]").val();
        var text = $("#add [name=textbody]").val();
        addAndLoad(user, text);
    });
});
