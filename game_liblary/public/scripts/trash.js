$(document).ready(function () {
    $(".user_btns").hide(0);
    $("#form_search").submit(function (e) { 
        e.preventDefault();
        let send_data = {}
        let form = this;
        for(let i of $("#form_search :input")){
            if(i.name != "asc_desc" && i.value != ""){
                send_data[i.name] = i.value
            }
        }
        send_data.asc_desc = form.asc_desc.value
            $.ajax({
                type: "post",
                url: "/searchGame",
                data: send_data,
                dataType: "json",
                success: async function (response) {
                    if(response.status == 1){
                        $("main").empty();
                        const size = response.size
                        $("#result").text("Result: "+size);
                        for(let i = 0; i < size; i++){
                            await $.ajax({
                                type: "post",
                                url: "/getGame",
                                data: {index:i, page:"trash"},
                                dataType: "html",
                                success: async function (response) {
                                    $("main").append(response);
                                    showButton(".game")
                                    restore(".restore")
                                    fullDelete(".full_delete")
                                }
                            }); 
                        }
                    }
                }
            });
    });
    restore(".restore")
    fullDelete(".full_delete")
});
function showButton(obj) {
    $(obj).hover(function () {
        $($(this).find(".user_btns")).show(200);
    }, function () {
        $($(this).find(".user_btns")).hide(200);
    });
}
function restore(obj){
    $(obj).click(function (e) { 
        e.preventDefault();
        let btn = this
        $.ajax({
            type: "put",
            url: "/restore",
            data: {index:btn.id, obj:$(this).attr("obj")},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    $($(btn).parent().parent()).slideUp(200, function (){
                        $($(btn).parent().parent()).remove();
                    });
                }
            }
        });
    });
}
function fullDelete(obj) {
    $(obj).click(function (e) { 
        e.preventDefault();
        let btn = this
        $.ajax({
            type: "delete",
            url: "/removal",
            data: {index:btn.id, obj:$(this).attr("obj")},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    $($(btn).parent().parent()).hide(200, function (){
                        $($(btn).parent().parent()).remove();
                    });
                }
            }
        });
    });
}