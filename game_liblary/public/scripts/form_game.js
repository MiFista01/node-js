$(document).ready(function () {
    $('#form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) { 
          e.preventDefault();
          return false;
        }
    });
    inputDataList()
    $("#add_image").click(function (e) { 
        e.preventDefault();
        $("#img").trigger("click");
    });
    var image = "";
    $("#img").change(async function (e) { 
        e.preventDefault();
        function readFile(event) {
            image = event.target.result;
            $(".image").css({
                "background-image": "url("+image+")",
                "background-size": "cover",
                "border": "none",
                
            });
        }
        var file = form.img.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsDataURL(file);
    });
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
        if(form.img.value!=""){
            $.ajax({
                type: "post",
                url: "/createrGame",
                data: {title:form.title.value,
                    published_date:form.date.value,
                    issuer:form.issuer.value,
                    developer:form.developer.value,
                    description:form.description.value,
                    img: image.toString(),
                    genres,
                    platforms},
                    dataType: "json",
                success: function (response) {
                    if(response.status == 1){
                        form.title.value = null
                        form.date.value = null
                        form.issuer.value = null
                        form.developer.value = null
                        form.description.value = null
                        form.img.value = null
                        $(".checkboxes").empty();
                        $(".image").css({
                            "background-image": "url(../imgs/add_image.svg)",
                            "background-size": "80%",
                            "border": "20px solid rgb(0, 0, 0)",
                            
                        });
                        inputDataList()
                        $("#message").text("Created");
                    }else{
                        $("#message").text("Error");
                    }
                    setTimeout(()=>{
                        $("#message").text("");
                    },3000)
                }
            });
        }else{
            $("#add_image").css("background-color", "rgba(255, 0, 0, 0.501)");
            setTimeout(() => {
                $("#add_image").css("background-color", "rgba(255, 0, 0, 0)");
            }, 200);
        }
        
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

function inputDataList() {  
    $.ajax({
        type: "get",
        url: "/datalists",
        data: "",
        dataType: "json",
        success: function (response) {
            $("#genres").empty()
            $("#platforms").empty()
            response.genres.forEach(element => {
                let option = document.createElement("option")
                option.textContent = element.name
                $("#genres").append(option);
            });
            response.platforms.forEach(element => {
                let option = document.createElement("option")
                option.textContent = element.name
                $("#platforms").append(option);
            });
        }
    });
}