
$(function() {
    $("#lagre").click(function() {
        var tittel = $("#tittel").val()
        var beskrivelse = $("#beskrivelse").val()

        $.ajax({
            url: "http://localhost:8080/v1",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                "title": tittel,
                "description": beskrivelse
            })
        })
        .done(function(data) {

        })
        .fail(function(error) {
            console.log(error)
        })
    });

    $.ajax("http://localhost:8080/v1")
        .done(function(todos) {
            for (var key in todos) {
                if (todos.hasOwnProperty(key)) {
                    $("#liste").append("<li>" + todos[key].title + " " + todos[key].description + "</li>");
                }
            }
        });
});