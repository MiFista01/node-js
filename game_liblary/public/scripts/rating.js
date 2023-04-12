$(document).ready(function () {
    for(let i of $(".rating")){
        let rate = i
        $.ajax({
            type: "post",
            url: "/getRating",
            data: {id:$(i).attr("id")},
            dataType: "json",
            success: function (response) {
                $($(rate).find(".numb_rating")).text(response.rating);
                let children = $(rate).children();
                if(response.userRate != null){
                    let n = Math.abs(response.rating); // Change to positive
                    let integer = Math.floor(response.rating) 
                    let decimal = n - Math.floor(n)
                    for(let i = 0; i <= integer-1; i++){
                        $($(children[i]).children()[0]).css("height", "100%");
                    }
                    $($(children[integer]).children()[0]).css("height", decimal*100+"%");
                }else{
                    for(let i = 0; i < response.userRate; i++){
                        $($(children[i]).children()[0]).css("height", "100%");
                    }
                }
            }
        });
    }

});