$(document).ready(function () {
    $("#auth").slideUp(0);
    $("#login").click(function (e) { 
        e.preventDefault();
        $("#auth").show(200);
        $("body").toggleClass("scroll_off");
    });
    $(".back").click(function (e) { 
        e.preventDefault();
        $("#auth").hide(200);
        $("body").toggleClass("scroll_off");
    });
    $("#log").submit(function (e) { 
        e.preventDefault();
        let form = this
        let location = window.location
        $.ajax({
            type: "post",
            url: "/login",
            data: {name:form.user.value, password:form.password.value},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    location.reload()
                }else{
                    $("#result").text("Error, not correct name or email");
                }
            }
        });
    });
});