$(document).ready(function () {
    $("#registr").slideUp(0);
    $("#registration").click(function (e) { 
        e.preventDefault();
        $("#registr").show(200);
        $("body").toggleClass("scroll_off");
    });
    $(".back").click(function (e) { 
        e.preventDefault();
        $("#registr").hide(200);
        $("body").toggleClass("scroll_off");
    });
    $("#reg").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "/create_user",
            data: {name:form.user.value, email:form.email.value, password:form.password.value},
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