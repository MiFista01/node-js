$(document).ready(function () {
    $(".buttons_block").slideUp(0);
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
                        $("main").slideUp(200, async ()=>{
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
                            $("main").slideDown(200)
                        });
                        
                    }
                }
            });
    });
    showButton(".game")
    deletePost(".button_delete")
});
function showButton(obj) {
    $(obj).hover(function () {
        if($($(this).children()[0]).children()[0].className.includes("button_delete")){
            $($($(this).children()[0]).children()[0]).show(100);
        }
        }, function () {
            if($($(this).children()[0]).children()[0].className.includes("button_delete")){
                $($($(this).children()[0]).children()[0]).hide(100);
            }
        }
    );
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