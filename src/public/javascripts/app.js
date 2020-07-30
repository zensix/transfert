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