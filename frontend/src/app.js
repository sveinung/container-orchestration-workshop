
$(function() {
    $("#lagre").click(function() {
        var tittel = $("#tittel").val()
        var beskrivelse = $("#beskrivelse").val()

        $.post("http://localhost:8080/v1", {
            "title": tittel,
            "description": beskrivelse
        })
        .fail(function(error) {
            console.log(error)
        })
    });

    $.ajax("http://localhost:8080/v1")
        .done(function(todos) {
            for (var key in todos) {
                if (todos.hasOwnProperty(key)) {
                    console.log(key + " -> " + todos[key].title);
                    $("#liste").append("<li>" + todos[key].title + " " + todos[key].description + "</li>");
                }
            }
        });
});