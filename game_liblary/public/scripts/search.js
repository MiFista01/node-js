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
        send_data.page = "search"
        send_data.asc_desc = form.asc_desc.value
            $.ajax({
                type: "post",
                url: "/search_game",
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
                                url: "/get_game",
                                data: {index:i, page:"search"},
                                dataType: "html",
                                success: async function (response) {
                                    $("main").append(response);
                                    showButton(".game")
                                    deletePost(".button_delete")
                                }
                            }); 
                        }
                    }
                }
            });
    });
    deletePost(".button_delete")
});
function showButton(obj) {
    $(obj).hover(function () {
        $($(this).find(".user_btns")).show(200);
    }, function () {
        $($(this).find(".user_btns")).hide(200);
    });
}
function deletePost(obj) {
    $(obj).click(function (e) { 
        e.preventDefault();
        let button = this
        $.ajax({
            type: "post",
            url: "/drop_game",
            data: {id:button.id},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    $($(button).parentsUntil("main")[1]).hide(300,function (param) {$(button).parentsUntil("main")[1].remove()});
                    
                }
            }
        });
    });
}