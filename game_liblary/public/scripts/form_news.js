$(document).ready(function () {
    $("#form").submit(function (e) { 
        e.preventDefault();
        let form = this
        let worlds = []
        $("input:checkbox[name=key_world]:checked").each(function() {
            worlds.push($(this).val());
        });
        $.ajax({
            type: "post",
            url: "createrNews",
            data: {title:this.title.value,text:this.news_text.value,link:this.link.value, worlds:worlds},
            dataType: "json",
            success: function (response) {
                if (response.status == 1){
                    form.title.value = null
                    form.news_text.value = null
                    form.link.value = null
                    $("#news_worlds").empty();
                }
            }
        });
    });
    $("#add_worlds").click(function (e) { 
        e.preventDefault();
        if ($("#key_world").val() != "" && $("#key_world").val() != null){
            let div = document.createElement("div")
            let chechbox = document.createElement("input")
            chechbox.type = "checkbox"
            chechbox.checked = "checked"
            chechbox.value =$("#key_world").val();
            chechbox.style.display = "none"
            chechbox.name = "key_world"
            chechbox.className = "box"
            let label = document.createElement("label")
            label.textContent =  $("#key_world").val();
            div.appendChild(chechbox)
            div.appendChild(label)
            $(div).click(function (e) { 
                e.preventDefault();
                $(this).remove();
            });
            $("#news_worlds").append(div);
            $("#key_world").val(null)
        }
    });
});
function inputDataList() {  
    $.ajax({
        type: "post",
        url: "/get_keywords",
        data: "",
        dataType: "json",
        success: function (response) {
            for (i of response.keywords) {
                console.log(i)
            }
        }
    });
}