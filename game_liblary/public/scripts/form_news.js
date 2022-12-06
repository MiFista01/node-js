$(document).ready(function () {
    $("#form").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "create_news",
            data: {title:this.title.value,text:this.news_text.value,link:this.link.value},
            dataType: "json",
            success: function (response) {
                if (response.status == 1){
                    form.title.value = null
                    form.news_text.value = null
                    form.link.value = null
                }
            }
        });
    });
});