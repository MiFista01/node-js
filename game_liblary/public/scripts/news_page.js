$(document).ready(function () {
    $(".search_news").submit(function (e) { 
        e.preventDefault();
        
    });
    $(".page_news div img").click(function (e) { 
        e.preventDefault();
        console.log("A")
    });
});