function makeCard(message) {
    return $('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + message.user + message.datetime +'</h5><p class="card-text">'+ message.text +'</p><a href="#" class="btn">Go somewhere</a></div></div>');
}

function load() {
    console.log("loading...");
    $.ajax({
    type    : 'GET',
    url     : "https://script.google.com/macros/s/AKfycbwclHIIjjt2oQaoR2tF3FIHCE7bJKL712JsdYcgQPpydm7l4RE/exec",
    data    : 'no',
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

$(document).ready(function() {
    console.log("ready");
    load();
    $("#ok").click(function() {
        console.log("clicked!");
        var url = "https://script.google.com/macros/s/AKfycbwclHIIjjt2oQaoR2tF3FIHCE7bJKL712JsdYcgQPpydm7l4RE/exec";

        var datetime = (new Date()).toLocaleString();
        var user = "";
        var message = {
            datetime: datetime,
            user: user,
            text: "TEXT",
        };
        $.post({
            url: url,
            data: JSON.stringify(message),
            dataType: "json"
        }).done (function(res) {
            console.log("DONE");
            console.log(res);
        });

        　});
});
