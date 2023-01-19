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
});