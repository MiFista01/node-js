$(document).ready(async function () {
    for(let i of $(".checkboxes").children()){
        $(i).click(function (e) { 
            e.preventDefault();
            $(this).remove();
        });
    }
    $("#form").submit(function (e) { 
        e.preventDefault();
        let form = this
        let genres = [];
        let platforms = []
        $("input:checkbox[name=genre]:checked").each(function() {
            genres.push($(this).val());
        });
        $("input:checkbox[name=platform]:checked").each(function() {
            platforms.push($(this).val());
        });
        let prime = {}
        let values_update = {obj:"game",genres,platforms,id:window.location.href.split("/").pop()}
        if(form.title.value != null && form.title.value != ""){
            prime.title = form.title.value
        }
        if(form.date.value != null && form.date.value != ""){
            prime.published_date = form.date.value
        }
        if(form.issuer.value != null && form.issuer.value != ""){
            prime.issuer = form.issuer.value
        }
        if(form.developer.value != null && form.developer.value != ""){
            prime.developer = form.developer.value
        }
        if(form.description.value != null && form.description.value != ""){
            prime.description = form.description.value
        }
        values_update.prime = prime
        $.ajax({
            type: "put",
            url: "/updater",
            data: values_update,
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    $("#callback").text("Post updated");
                    setTimeout(() => {
                        $("#callback").text("");
                    }, 1000);
                }else{
                    $("#callback").text("Error");
                    setTimeout(() => {
                        $("#callback").text("");
                    }, 1000);
                }
            }
        });
    });
    $("#add_genre").click(function (e) { 
        e.preventDefault();
        if ($("#genre").val() != "" && $("#genre").val() != null){
            let div = document.createElement("div")
            let chechbox = document.createElement("input")
            chechbox.type = "checkbox"
            chechbox.checked = "checked"
            chechbox.value =$("#genre").val();
            chechbox.style.display = "none"
            chechbox.name = "genre"
            chechbox.className = "box"
            let label = document.createElement("label")
            label.textContent =  $("#genre").val();
            div.appendChild(chechbox)
            div.appendChild(label)
            $(div).click(function (e) { 
                e.preventDefault();
                $(this).remove();
            });
            $("#game_genres").append(div);
            $("#genre").val(null)
        }
    });
    $("#add_platform").click(function (e) { 
        e.preventDefault();
        if ($("#platform").val() != "" && $("#platform").val() != null){
            let div = document.createElement("div")
            let chechbox = document.createElement("input")
            chechbox.type = "checkbox"
            chechbox.checked = "checked"
            chechbox.value =$("#platform").val();
            chechbox.style.display = "none"
            chechbox.name = "platform"
            chechbox.className = "box"
            let label = document.createElement("label")
            label.textContent =  $("#platform").val();
            div.appendChild(chechbox)
            div.appendChild(label)
            $(div).click(function (e) { 
                e.preventDefault();
                $(this).remove();
            });
            $("#game_platforms").append(div);
            $("#platform").val(null)
        }
    });
});
