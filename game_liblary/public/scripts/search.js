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
                                    let element = document.createElement("div");
                                    $(element).html(response);
                                    console.log($(element).find(".button_delete"))
                                    console.log($(element).find(".rating"))
                                    console.log($(element).find(".star"))
                                    console.log($(element).find(".heart"))
                                    showButton($(element).find(".game"))
                                    deletePost($(element).find(".button_delete"))
                                    getRating($(element).find(".rating"))
                                    userFun($(element).find(".star"),$(element).find(".heart"))
                                    $("main").append($(element).find(".game"));
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
function getRating(obj){
    for(let i of $(obj)){
        let rate = i
        $.ajax({
            type: "post",
            url: "/getRating",
            data: {id:$(i).attr("id")},
            dataType: "json",
            success: function (response) {
                $($(rate).find(".numb_rating")).text(response.rating);
                let children = $(rate).children();
                if(response.userRate != null){
                    let n = Math.abs(response.rating); // Change to positive
                    let integer = Math.floor(response.rating) 
                    let decimal = n - Math.floor(n)
                    for(let i = 0; i <= integer-1; i++){
                        $($(children[i]).children()[0]).css("height", "100%");
                    }
                    $($(children[integer]).children()[0]).css("height", decimal*100+"%");
                }else{
                    for(let i = 0; i < response.userRate; i++){
                        $($(children[i]).children()[0]).css("height", "100%");
                    }
                }
            }
        });
    }
}
function userFun(obj,obj2){
    $(obj).click(function (e) { 
        e.preventDefault();
        let btn = this
        for(let i of $(btn).prevAll()){
            $($(i).children()[0]).css("height", "100%");
        }
        for(let i of $(btn).nextAll()){
            $($(i).children()[0]).css("height", "0%");
        }
        $($(btn).children()[0]).css("height", "100%");
        $.ajax({
            type: "post",
            url: "/setRate",
            data: {rate:$(btn).attr("id"), game:$($(btn).parentsUntil(".game")).attr("id")},
            dataType: "json",
            success: function (response) {
                $($($(btn).parent()).find(".numb_rating")).text(response.rating);
            }
        });
    });
    $(obj2).click(function (e) { 
        e.preventDefault();
        let btn = this
        $(btn).toggleClass("black_heart");
        $(btn).toggleClass("fav");
        console.log(window.location)
        $.ajax({
            type: "post",
            url: "/manage_fav",
            data: {id:$(btn).attr("id")},
            dataType: "json",
            success: function (response) {
                
            }
        });
    });
}