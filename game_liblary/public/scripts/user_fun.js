$(document).ready(function () {
    $($('.game').find(".user_btns")).hide(0);
    $("header .profile .btns").slideUp(0);
    $("header .profile #avatar").click(function (e) { 
        e.preventDefault();
        $("header .profile .btns").toggle(200);
    });
    $(".avatar_img").click(function (e) { 
        e.preventDefault();
        $('#avatar_img').trigger('click');
        
    });
    $(".game").hover(function () {
        $($(this).find(".user_btns")).show(150);
        }, function () {
            $($(this).find(".user_btns")).hide(150);
    });
    $(".star").click(function (e) { 
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
    $(".heart").click(function (e) { 
        e.preventDefault();
        let btn = this
        $(btn).toggleClass("black_heart");
        $(btn).toggleClass("fav");
        console.log($(btn).parentsUntil("main"))
        $.ajax({
            type: "post",
            url: "/manage_fav",
            data: {id:$(btn).attr("id")},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    if(window.location.pathname == "/favourites"){
                        $($(btn).parentsUntil("main")[1]).remove();
                    }
                }
            }
        });
    });







    $("#avatar_img").change(function (e) { 
        e.preventDefault();
        var fr = new FileReader();
        fr.onload = function () {
            $(".avatar").css("background-image", "url("+fr.result+")");
            $(".avatar_img").css("background-image", "url("+fr.result+")");
        }
        fr.readAsDataURL(this.files[0]);
    });
    $("main #avatar").submit(function (e) { 
        e.preventDefault();
        let form = this;
        var fd = new FormData($("form").get(0));
        if(form.avatar.value != ""){
            $.ajax({
                url: "/update_avatar",
                data: fd,
                dataType: 'json',
                type: 'POST',
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.status == 1){
                        $("#avatar_callback").text("Updated");
                        
                    }else{
                        $("#avatar_callback").text("Error");
                    }
                    setTimeout(() => {
                        $("#avatar_callback").html("&#32;");
                    }, 3000);
                    
                }
            });
        }
    });
    $("#profile_data").submit(function (e) { 
        e.preventDefault();
        let form = this
        let childrens = $(form).children()
        childrens.splice(-1);
        childrens.splice(-1);
        let data = {};
        for(let i of childrens){
            if(i.value != ""){
                data[$(i).attr("name")] = i.value;
            }
        }
        $.ajax({
            type: "post",
            url: "/update_profile",
            data: data,
            dataType: "json",
            success: function (response) {
                let callback = ""
                if(response.username == 1){
                    callback += "username updated/"
                    $(".username").text(form.username.value);
                }
                if(response.email == 1){
                    callback += "email updated/"
                }
                if(response.password == 1){
                    callback += "password updated/"
                }
                if(response.status == 1){
                    $("#callback").text(callback);
                    
                }else{
                    $("#callback").text("Error");
                }
                setTimeout(() => {
                    $("#callback").html("&#32;");
                }, 3000);
            }
        });
    });
    $(".formPost").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "/manageComment",
            data: {comment:form.comment.value, game: $(form).attr("id")},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    location.reload();
                }
            }
        });
    });
});