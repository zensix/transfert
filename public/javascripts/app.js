$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        if( $('#sidebar').hasClass( 'active' )){
            $('#sidebarCollapseImage').attr('src', '/icons/box-arrow-in-right.svg');
        } else {
            $('#sidebarCollapseImage').attr('src', '/icons/box-arrow-in-left.svg');
        }
    });
});