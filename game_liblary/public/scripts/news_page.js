$(document).ready(function () {
    $(".search_news").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "put",
            url: "/newsSearch",
            data: {name:form.search.value},
            dataType: "html",
            success: function (response) {
                $(".page_news").html(response);
            }
        });
    });
    $(".page_news div img").click(function (e) { 
        e.preventDefault();
        let btn = this
        $.ajax({
            type: "delete",
            url: "/newsRemoval",
            data: {id:$(btn).attr("id")},
            dataType: "json",
            success: function (response) {
                if(response.status = 1){
                    $($(btn).parent()).remove();
                }
            }
        });
    });
});