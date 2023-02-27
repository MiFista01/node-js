$(document).ready(function () {
    $(".search_news").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "/news_search",
            data: {name:form.search.value},
            dataType: "html",
            success: function (response) {
                $(".page_news").html(response);
                console.log("ok")
            }
        });
    });
    $(".page_news div img").click(function (e) { 
        e.preventDefault();
        let btn = this
        $.ajax({
            type: "post",
            url: "/news_delete",
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