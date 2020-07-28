(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

function refreshdata(){
    var id=globaldata._id
    $.ajax({
        method: "GET",
        url: "/api/project/"+id
      }).done(function(data) {
        globaldata =  data
        $("#tags").empty()
        for( key in globaldata.tags){
            addtagbtn(key,globaldata.tags[key])
        }
      });
}
function updateproject(data){
    var id=globaldata._id
    $.ajax({
        method: "POST",
        url: "/api/project/"+id,
        data: data
      }).done(function(data) {
        window.location.href = '/project/edit/'+id;
      });
}

function addtag(id,key,value){
    $.ajax({
        method: "POST",
        url: "/api/project/"+id+"/addtag",
        data: {key:key,value:value}
      }).done(function(data) {
        refreshdata()
      });
}
function deltag(id,key){
    $.ajax({
        method: "POST",
        url: "/api/project/"+id+"/deltag",
        data: {key:key}
      }).done(function(data) {
        refreshdata()
      });
}
function addtagbtn(key,value){
    var dum = $("<button></button>").append('<span class="label">'+key+':'+value+'</span>'); 
    dum.attr('id', key);
    dum.addClass("btn btn-primary btn-sm delete-tag");
    $("#tags").append(dum)
}

function showpvc(){
    var dum = $("<button></button>").append('<span class="label">'+key+':'+value+'</span>'); 
    dum.attr('id', key);
    dum.addClass("btn btn-primary btn-sm delete-tag");
    $("#tags").append(dum)
}



$(document).ready(function () {
    for( key in globaldata.tags){
        addtagbtn(key,globaldata.tags[key])
        $('#notes').text(globaldata.notes.replace(/\n/g, '\r\n'))

    }

    $("#tagsTextarea").keyup(function(e){
        if((e.keyCode || e.which) == 13) { //Enter keycode
            data=$(this).val();
            var re = /(\w+)=(\w+)/;
           if(re.test(data)){
                var key = data.replace(re, '$1').trim();
                var value = data.replace(re, '$2').trim();
                //globaldata.tags.set(key,value)
                tags.set(key,value)
                console.log(tags)
                $(this).val("");
                addtag(globaldata._id,key,value)
            }
        }
    });

    $("#name").on("change", function(e) { 
        updateproject({ name: $(this).val()})
    });

    $("#environnement").on("change", function(e) { 
        updateproject({ environnement: $(this).val()})
    });

    $("#status").on("change", function(e) { 
        updateproject({ status: $(this).val()})
    });

    $("#notes").on("change", function(e) { 
         updateproject({ notes: $(this).val().replace(/\n/g, '\\n')})
    });

    $(document).on("click", ".delete-tag", function(e) { 
        key=$(this).attr("id")
        deltag(globaldata._id,key)
    });

    $( "#addpvcform" ).submit(function( event ) {
        event.preventDefault();
        var data = $(this).serializeFormJSON();
        var id=globaldata._id
        $.ajax({
            method: "POST",
            url: "/api/project/"+id+"/addpv",
            data: data
          }).done(function(data) {
            window.location.href = '/project/edit/'+id;
          });

    });

    $( ".pvcupdate" ).submit(function( event ) {
        event.preventDefault();
        var data = $(this).serializeFormJSON();
        var id=globaldata._id
        $.ajax({
            method: "POST",
            url: "/api/project/"+id+"/updatepvc",
            data: data
          }).done(function(data) {
            window.location.href = '/project/edit/'+id;
          });

    });

    $( ".btn-pvc-remove" ).click(function( event ) {
        event.preventDefault();
        var pvcid = $(this).attr('id');;
        var id=globaldata._id
        $.ajax({
            method: "POST",
            url: "/api/project/"+id+"/removepvc",
            data: {pvcid:pvcid}
          }).done(function(data) {
            window.location.href = '/project/edit/'+id;
          });
    });
    
})