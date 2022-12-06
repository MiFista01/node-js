$(document).ready(function () {
    $("#btn_creaters").click(function (e) { 
        e.preventDefault();
        $(".managers").slideToggle(200);
    });
    window.onscroll = function (e) {  
        $(".managers").slideUp();
        } 
});