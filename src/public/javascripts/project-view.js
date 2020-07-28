
function showtags(key,value){
    var dum = $('<span class="badge badge-info">'+key+':'+value+'</span>')
    dum.attr('id', key);
    $("#tags").append(dum)
}

function showpvc(pv){
    var divrow = $('<div class="row"></div>')
    divrow.append('<div class="col h5">'+pv.name+'</div>')
    divrow.append('<div class="col h5">'+pv.size+' Go</div>')
    divrow.append('<div class="col h5">'+pv.mode+'</div>')
    $("#pvcs").append(divrow)
}




$(document).ready(function () {
    for( key in globaldata.tags){
        showtags(key,globaldata.tags[key])
    }
    for( pv in globaldata.pv){
        showpvc(globaldata.pv[pv])
    }
    
})