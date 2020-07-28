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

    data.forEach(p =>  showproject(p))
}
function showproject(data){
    var row = jQuery('<div class="row" id='+data._id +'><div>');
    row.append('<div class="col">'+data.name)
    row.append('<div class="col">'+data._ownerId.username)
    row.append('<div class="col">'+data.environnement)
    row.append('<div class="col">'+data.status)
    if( user._id == data._ownerId._id){
        row.append('<a href="/project/edit/'+data._id+'"><img src="/icons/pen.svg" alt="" width="24" height="24" ></a>')
        row.append('<button class="btn btn-sm delete-project"><img src="/icons/trash.svg" alt="" width="24" height="24"></button>')
    }
    else{
        row.append('<a href="/project/view/'+data._id+'"><img src="/icons/eye.svg" alt="" width="24" height="24"></a>')
        row.append('<button class="btn btn-sm none-project"><img src="/icons/x-circle.svg" alt="" width="24" height="24"></button>')
        

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