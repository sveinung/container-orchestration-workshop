
function addListItem(todo) {
    $("#liste").append(
        "<li>" +
            "<span>" + todo.title + " " + todo.description + "</span>" +
            "<input label='Done?' checked='false'/>" +
        "</li>");
}

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
            addListItem(data);
        })
        .fail(function(error) {
            console.log(error)
        })
    });

    $.ajax("http://localhost:8080/v1")
        .done(function(todos) {
            for (var key in todos) {
                if (todos.hasOwnProperty(key)) {
                    addListItem(todos[key]);
                }
            }
        });
});