function refreshlist(){
    $.ajax({
        method: "GET",
        url: "/api/users",
      }).done(function(data) {
          showusers(data)
      });
}

function showusers(data){
    $("#liste").empty()
    var row = jQuery('<div class="row font-weight-bold"</div>');
    row.append('<div class="col">Compte')
    row.append('<div class="col">Admin')
    row.append('<div class="col">Actif')
    $("#liste").append(row)

    data.forEach(p =>  showuser(p))
}

function showuser(data){
    var row = jQuery('<div class="row" id='+data._id +'></div>');
    row.append('<div class="col">'+data.username)
    if(data.admin){
      //  row.append('<div class="col"><button class="btn btn-sm toggle-admin"><img src="/icons/toggle-on.svg">')
      row.append('<div class="col"><button class="btn btn-sm toggle-admin"><svg class="bi text-success" width="24" height="24"><use xlink:href="/bootstrap-icons.svg#toggle-on"/></svg></button></div>')
     // row.append('<div class="col"><button class="btn btn-sm toggle-admin"><img src="/icons/toggle-off.svg">')
    } else {
      row.append('<div class="col"><button class="btn btn-sm toggle-admin"><svg class="bi text-danger" width="24" height="24"><use xlink:href="/bootstrap-icons.svg#toggle-off"/></svg></button></div>')

    }
    if(data.active){
        row.append('<div class="col"><button class="btn btn-sm toggle-active"><svg class="bi text-success" width="24" height="24"><use xlink:href="/bootstrap-icons.svg#toggle-on"/></svg></button></div>')

    // row.append('<div class="col"><button class="btn btn-sm text-success"><img src="/icons/toggle-on.svg">')
    } else {
        row.append('<div class="col"><button class="btn btn-sm toggle-active"><svg class="bi text-danger" width="24" height="24"><use xlink:href="/bootstrap-icons.svg#toggle-off"/></svg></button></div>')

  //      row.append('<div class="col"><button class="btn btn-sm text.danger"><img src="/icons/toggle-off.svg">')
    }
    $("#liste").append(row)
}

$(document).ready(function () {
    refreshlist()
    
    $(document).on("click", ".toggle-admin", function () {
        var id=$(this).closest('.row').attr('id')
        $.ajax({
            method: "POST",
            url: "/api/user/switch-admin/"+id,
            data: { _id: id }
          }).done(function(data) {
            refreshlist()
          });
    })

    $(document).on("click", ".toggle-active", function () {
        var id=$(this).closest('.row').attr('id')
        $.ajax({
            method: "POST",
            url: "/api/user/switch-active/"+id
          }).done(function(data) {
            refreshlist()
        })
    })
    
});