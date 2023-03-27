$(document).ready(function () {
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
            type: "post",
            url: "/create_user",
            data: {user:form.user.value, email:form.email.value, password:form.password.value},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    for(let i of $(form).children()){
                        i.value = null
                    }
                    $("#reg_result").text("User registered");
                }else{
                    $("#reg_result").text("Error, not correct name or email");
                }
            }
        });
    });
});