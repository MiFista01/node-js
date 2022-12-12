$(document).ready(function () {
    var clicked = false
    var offset = []
    $(".draggeble").mousedown(function(e) {
        let offset_block = $(".search_block").offset();
        var bottom = offset_block.top-$(window).height()+$(".search_block").height();
        var left = offset_block.left;
        clicked = true
        offset = [
            left - e.clientX,
            bottom - e.clientY
        ]
        $(".draggeble").css("cursor", "grabbing");
    });
    $(".draggeble").mouseup(function () { 
        clicked = false
        $(".draggeble").css("cursor", "grab");
    });
    $(".draggeble").mouseleave(function () { 
        clicked = false
        $(".draggeble").css("cursor", "grab");
    });
    $(".draggeble").mousemove(function (e) { 
        // values: e.clientX, e.clientY, e.pageX, e.pageY
        let offset_parent = $(".search_block").offset();
        var bottom = offset_parent.bottom;
        var left = offset_parent.left;
        if(clicked){
            mousePosition = {
    
                x : e.clientX,
                y : e.clientY-$(window).scrollTop()
    
            };
            let dirX = mousePosition.x + offset[0]
            let dirY = (mousePosition.y + offset[1])*(-1)
            if(dirX < 0){
                dirX = 0
            }
            if(dirX > $(window).width()-$(".search_block").width()-15){
                dirX = $(window).width()-$(".search_block").width()-15
            }
            if(dirY<0){
                dirY=0
            }
            if(dirY > $(window).height()-$(".search_block").height()){
                dirY = $(window).height()-$(".search_block").height()
            }
            $(".search_block").css("left", dirX + 'px');
            $(".search_block").css("bottom", dirY + 'px');
        }
    });
    var deg = 180
    $("#slide").click(function (e) { 
        e.preventDefault();
        $(".search_inputs").slideToggle();
        deg += 180
        deg %= 360
        $("#slide").css("transform", "rotate("+deg+"deg)");
    });
    $("#form_search").submit(function (e) { 
        e.preventDefault();
        let send_data = {}
        let form = this;
        let title = form.title.value
        let asc_desc = form.asc_desc.value
        let issuer = form.issuer.value
        let developer = form.developer.value
        let genre = form.genre.value
        let platform = form.platform.value
        let year = form.year.value
        let month = form.month.value

        if(title != "" && title != null){
            send_data.title = title
        }
        if(asc_desc != "" && asc_desc != null){
            send_data.asc_desc = asc_desc
        }
        if(issuer != "" && issuer != null){
            send_data.issuer = issuer
        }
        if(developer != "" && developer != null){
            send_data.developer = developer
        }
        if(genre != "" && genre != null){
            send_data.genre = genre
        }
        if(platform != "" && platform != null){
            send_data.platform = platform
        }
        if(year != "" && year != null){
            send_data.year = year
        }
        if(month != "" && month != null){
            send_data.month = month
        }
        
        if((title != "" && title != null)||(issuer != "" && issuer != null)||(developer != "" && developer != null)||(genre != "" && genre != null)||(platform != "" && platform != null)||(year != "" && year != null)||(month != "" && month != null)){
            $("main").slideUp(200,function () {
                $("main").empty();
                $.ajax({
                    type: "post",
                    url: "/search_game",
                    data: send_data,
                    dataType: "json",
                    success: async function (response) {
                        if(response.status == 1){
                            $("main").slideDown(200)
                            const size = response.size
                            $("#result").text("Result: "+size);
                            for(let i = 0; i< size;i++){
                                 let game = await $.ajax({
                                    type: "post",
                                    url: "/get_game",
                                    data: {index:i},
                                    dataType: "json",
                                    success: async function (response) {
                                        if(response.status == 1){
                                            let div_game = document.createElement("div")
                                            div_game.className = "game"
                                            let div_delete = document.createElement("div")
                                            div_delete.className = "delete_block"
                                            let delete_img = document.createElement("img")
                                            delete_img.src = "/imgs/trash.png"
                                            delete_img.className = "button_delete"
                                            delete_img.id = response.game.prime.id
                                            deletePost(delete_img)
                                            div_delete.appendChild(delete_img)
                                            div_game.appendChild(div_delete)
                                            let link_image = document.createElement("a")
                                            link_image.href = "/game/"+response.game.prime.id
                                            let img = document.createElement("div")
                                            img.className = "game_img"
                                            img.style.backgroundImage = "url("+response.game.prime.img+")"
                                            link_image.append(img)
                                            div_game.appendChild(link_image)
                                            div_game.style.display =  "none"
                                            let div_info = document.createElement("div")
                                            let title = document.createElement("h2")
                                            title.textContent = response.game.prime.title
                                            let date = document.createElement("p")
                                            $(date).html("<span>Publieshed date: </span>"+response.game.prime.published_date);
                                            let issuer = document.createElement("p")
                                            $(issuer).html("<span>Issuer: </span>"+response.game.prime.issuer);
                                            let developer = document.createElement("p")
                                            $(developer).html("<span>Developer: </span>"+response.game.prime.developer);
                                            let text = "<span>Genres: </span>"
                                            response.game.genres.forEach(element => {
                                                if(element != response.game.genres[response.game.genres.length-1]){
                                                    text += element+"/ "
                                                }else{
                                                    text += element
                                                }
                                            });
                                            let genres = document.createElement("p")
                                            $(genres).html(text);
                                            text = "<span>Platforms: </span>"
                                            response.game.platforms.forEach(element => {
                                                if(element != response.game.platforms[response.game.platforms.length-1]){
                                                    text += element+"/ "
                                                }else{
                                                    text += element
                                                }
                                            });
                                            let platforms = document.createElement("p")
                                            $(platforms).html(text);
                                            let description = document.createElement("p")
                                            $(description).html("<span>Description: </span>"+response.game.prime.description.substring(0,100)+"...");
                                            div_info.appendChild(title)
                                            div_info.appendChild(date)
                                            div_info.appendChild(issuer)
                                            div_info.appendChild(developer)
                                            div_info.appendChild(genres)
                                            div_info.appendChild(platforms)
                                            div_info.appendChild(description)
                                            div_game.appendChild(div_info)
                                            showButton(div_game)
                                            $("#block_games").append(div_game);
                                            $(div_game).slideDown();
                                        }
                                    }
                                }); 
                            }
                        }
                    }
                });
            });
        }
    });
    showButton(".game")
    deletePost(".button_delete")
});
function showButton(obj) {
    $(obj).hover(function () {
        if($($(this).children()[0]).children()[0].className.includes("button_delete")){
            $($($(this).children()[0]).children()[0]).show(100);
        }
        }, function () {
            if($($(this).children()[0]).children()[0].className.includes("button_delete")){
                $($($(this).children()[0]).children()[0]).hide(100);
            }
        }
    );
}
function deletePost(obj) {
    $(obj).click(function (e) { 
        e.preventDefault();
        let button = this
        $.ajax({
            type: "post",
            url: "/drop_game",
            data: {id:button.id},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    $($(button).parentsUntil("main")[1]).hide(300,function (param) {$(button).parentsUntil("main")[1].remove()});
                    
                }
            }
        });
    });
}