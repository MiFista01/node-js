$(document).ready(function () {
    $(".hide").slideUp(0);
    $(".game").hover(function () {
            $($(this).children()[0]).slideDown(200);
        }, function () {
            $($(this).children()[0]).slideUp(200);
        }
    );
    $(".restore").click(function (e) { 
        e.preventDefault();
        let btn = this
        $.ajax({
            type: "post",
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
    $(".full_delete").click(function (e) { 
        e.preventDefault();
        let btn = this
        $.ajax({
            type: "post",
            url: "/full_delete",
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
});