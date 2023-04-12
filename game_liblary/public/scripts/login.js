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
                    console.log("A")
                }else{
                    $("#result").text("Error, not correct name or email");
                }
            }
        });
    });
});