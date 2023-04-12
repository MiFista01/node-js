$(document).ready(function () {
    $(".window").slideUp(0);
    $("#btn_login").click(function (e) { 
        e.preventDefault();
        $("#window_log").show(0);
        $("body").toggleClass("scroll_off");
    });
    $(".back").click(function (e) { 
        e.preventDefault();
        $("#window_log").hide(0);
        $("body").toggleClass("scroll_off");
    });
    $("#log").submit(function (e) { 
        e.preventDefault();
        let form = this
        let location = window.location
        $.ajax({
            type: "post",
            url: "/login",
            data: {user:form.user.value, password:form.password.value},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    location.reload()
                }else{
                    $(".callback").text("Error, not correct user");
                    setTimeout(function () {
                        $(".callback").html("&#8205;");
                    },2000)
                }
            }
        });
    });
    $("#btn_reg").click(function (e) { 
        e.preventDefault();
        $("#window_reg").show(0);
        $("body").toggleClass("scroll_off");
    });
    $(".back").click(function (e) { 
        e.preventDefault();
        $("#window_reg").hide(0);
        $("body").toggleClass("scroll_off");
    });
    $("#reg").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            url: "/reg",
            method: 'post',
            data: {username:form.username.value, email:form.email.value, password:form.password.value},
            enctype: 'multipart/form-data',
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    location.reload()
                }else{
                    $(".callback").text("Error, not correct name or email");
                    setTimeout(function () {
                        $(".callback").html("&#8205;");
                    },2000)
                }
            }
        })
    });
});