function refreshprojects(){
    $.ajax({
        method: "GET",
        url: "/api/projects",
      }).done(function(data) {
          showprojects(data)
      });
}

function showprojects(data){
    $("#liste").empty()
    var row = jQuery('<div class="row font-weight-bold"</div>');
    row.append('<div class="col">Nom')
    row.append('<div class="col">Propriétaire')
    row.append('<div class="col">Environnement')
    row.append('<div class="col">Status')
    $("#liste").append(row)
    $("#debug").empty().append(JSON.stringify(data))

    data.forEach(p =>  showproject(p))
}
function showproject(data){
    var row = jQuery('<div class="row" id='+data._id +'><div>');
    row.append('<div class="col">'+data.name)
    row.append('<div class="col">'+data._ownerId.username)
    row.append('<div class="col">'+data.environnement)
    row.append('<div class="col">'+data.status)
    if( user._id == data._ownerId._id || user.admin ){
        row.append('<a href="/project/edit/'+data._id+'"><svg class="bi text-success"  width="24" height="24" fill="currentColor"><use xlink:href="/bootstrap-icons.svg#pen"/></svg></a>')
        row.append('<button class="btn btn-sm delete-project"><svg class="bi text-danger"  width="24" height="24" fill="currentColor"><use xlink:href="/bootstrap-icons.svg#trash-fill"/></button>')
    }
    else{
        //row.append('<a href="/project/view/'+data._id+'"><img src="/icons/eye.svg" alt="" width="24" height="24"></a>')
        row.append('<a href="/project/view/'+data._id+'"><svg class="bi text-info"  width="24" height="24" fill="currentColor"><use xlink:href="/bootstrap-icons.svg#eye"/></svg></a>')
        row.append('<button class="btn btn-sm none-project"><svg class="bi text-secondary"  width="24" height="24" fill="currentColor"><use xlink:href="/bootstrap-icons.svg#shield-slash-fill"/></button>')
        

    }
    $("#liste").append(row)
}

$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/api/projects",
      }).done(function(data) {
          showprojects(data)
      });
    
    $('#new_project').on('click', function () {
        $("#createprojectform").toggleClass("d-none")
    })
    $(document).on("click", ".delete-project", function () {
        var id=$(this).closest('.row').attr('id')
        $.ajax({
            method: "DELETE",
            url: "/api/project/"+id,
            data: { _id: id}
          }).done(function(data) {
                refreshprojects()
          });
    })

    $(document).on("click", ".edit-project", function () {
        var id=$(this).closest('.row').attr('id')
        $.ajax({
            method: "GET",
            url: "/api/project",
            data: { _id: id}
          }).done(function(data) {
            $("#editprojectdiv").toggleClass("d-none")
            $('input[name="name"]').val(data.name)
            alert(data.name)
        })
    })
    
});