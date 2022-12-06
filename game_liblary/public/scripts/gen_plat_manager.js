$(document).ready(function () {
    $(".buttons").slideToggle(0);
    function wheel(div,deltaY){
        var step = -0.15;
        var pos = $(div).scrollTop();;
        var nextPos = pos + (step*(-deltaY))
        div.scrollTop(nextPos);
     }
     
     $('.objs').bind('mousewheel', function(event) {
        wheel($(this),event.originalEvent.deltaY);
        event.preventDefault();
        // $(".buttons").slideUp(100);
     });
    $("#add_genre").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "/create_genre",
            data: {name:form.name.value},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    if(response.created){
                        let row = document.createElement("div")
                        row.className = "row"
                        let events = document.createElement("div")
                        events.className = "events"
                        let text = document.createElement("p")
                        text.textContent = form.name.value
                        text.id = response.id
                        text.className = "hover btn"
                        addClick(text)
                        let buttons = document.createElement("div")
                        buttons.className = "buttons"
                        let update_btn = document.createElement("p")
                        update_btn.className = "hover update_btn"
                        update_btn.textContent = "Update"
                        showForm(update_btn)
                        let delete_btn = document.createElement("p")
                        delete_btn.className = "hover delete_btn"
                        delete_btn.textContent = "Delete"
                        addDelete(delete_btn)
                        events.appendChild(text)
                        buttons.appendChild(update_btn)
                        buttons.appendChild(delete_btn)
                        $(buttons).slideToggle();
                        events.appendChild(buttons)
                        let form_upd = document.createElement("form")
                        form_upd.id = "update_form"
                        form_upd.className = "update"
                        update(form_upd)
                        let input = document.createElement("input")
                        input.type = "text"
                        input.value = form.name.value
                        input.id = response.id
                        input.name = "name"
                        $(input).attr("value", form.name.value);
                        $(input).attr("obj", "genre");
                        let btn_update = document.createElement("button")
                        btn_update.textContent = "Update"
                        form_upd.appendChild(input)
                        form_upd.appendChild(btn_update)
                        row.appendChild(events)
                        row.appendChild(form_upd)
                        $($($(form).next()).children()[1]).append(row);
                    }
                    form.name.value = null
                }
            }
        });
    });
    $("#add_platform").submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "/create_platform",
            data: {name:form.name.value},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    if(response.created){
                        let row = document.createElement("div")
                        row.className = "row"
                        let events = document.createElement("div")
                        events.className = "events"
                        let text = document.createElement("p")
                        text.textContent = form.name.value
                        text.id = response.id
                        text.className = "hover btn"
                        addClick(text)
                        let buttons = document.createElement("div")
                        buttons.className = "buttons"
                        let update_btn = document.createElement("p")
                        update_btn.className = "hover update_btn"
                        update_btn.textContent = "Update"
                        showForm(update_btn)
                        let delete_btn = document.createElement("p")
                        delete_btn.className = "hover delete_btn"
                        delete_btn.textContent = "Delete"
                        addDelete(delete_btn)
                        events.appendChild(text)
                        buttons.appendChild(update_btn)
                        buttons.appendChild(delete_btn)
                        $(buttons).slideToggle();
                        events.appendChild(buttons)
                        let form_upd = document.createElement("form")
                        form_upd.id = "update_form"
                        form_upd.className = "update"
                        update(form_upd)
                        let input = document.createElement("input")
                        input.type = "text"
                        input.value = form.name.value
                        input.id = response.id
                        input.name = "name"
                        $(input).attr("value", form.name.value);
                        $(input).attr("obj", "platform");
                        let btn_update = document.createElement("button")
                        btn_update.textContent = "Update"
                        form_upd.appendChild(input)
                        form_upd.appendChild(btn_update)
                        row.appendChild(events)
                        row.appendChild(form_upd)
                        $($($(form).next()).children()[1]).append(row);
                    }
                    form.name.value = null
                }
            }
        });
    });
    addClick(".btn")
    addDelete(".delete_btn")
    showForm(".update_btn")
    update(".update")
});
function addClick(obj){
    $(obj).click(function (e) { 
        e.preventDefault();
        $($(this).next()).slideToggle();
        $(this).parent().next().slideUp()
    });
}
function addDelete(obj){
    $(obj).click(function (e) { 
        e.preventDefault();
        let id = $($($(this).parent()).prev()).attr("id");
        let btn = this
        $.ajax({
            type: "post",
            url: "/drop_genre",
            data: {id:id},
            dataType: "json",
            success: function (response) {
                if(response.status = 1){
                    $($(btn).parentsUntil(".objs")).remove();
                }
            }
        });
    });
}
function showForm(obj) {  
    $(obj).click(function (e) { 
        e.preventDefault();
        $(this).parent().parent().next().slideToggle()
    });
}
function update(form_upd) {
    console.log(form_upd)
    $(form_upd).submit(function (e) { 
        e.preventDefault();
        let form = this
        $.ajax({
            type: "post",
            url: "/updater",
            data: {obj:$(form.name).attr("obj"),id:$(form.name).attr("id"), value:form.name.value},
            dataType: "json",
            success: function (response) {
                if(response.status == 1){
                    $(form.name).css("background", "rgba(194, 255, 187, 0.432)");
                    $($($(form).prev()).children()[0]).text(form.name.value);
                    setTimeout(function(){
                        $(form.name).css("background", "none");
                    },1000)
                }else{
                    $(form.name).css("background-color", "rgba(255, 187, 187, 0.432)");
                }
            }
        });
    });
}