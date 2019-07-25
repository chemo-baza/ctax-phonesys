(function($) {

    var dataTableId = $('.datatable-tablebox-class').attr("id");

    $('.menu-toggler').click(function() {
        if ($("#" + dataTableId).offset().left == 285) {
            var dataTableOffset = 15;
        } else {
            var dataTableOffset = 285;
        }

        $('body').attr('data-offset-datatable', dataTableOffset);
    });

    $(window).scroll(function() {

        if ($('body').attr('data-fixhead-offset-datatable') == undefined) {
            var dataTablePosition = $("#" + dataTableId).scrollLeft();
        } else {
            var dataTablePosition = $('body').attr('data-fixhead-offset-datatable');
        }

        if ($('body').attr('data-offset-datatable') == undefined) {
            var dataTableOffset = 285;
        } else {
            var dataTableOffset = $('body').attr('data-offset-datatable');
        }

        $(".fixedHeader-floating").css('left', dataTableOffset - dataTablePosition);
    });

    $('.content').on('scroll', function() {
        var dataTablePosition = $('.content').scrollLeft();

        if ($('body').attr('data-offset-datatable') == undefined) {
            var dataTableOffset = 285;
        } else {
            var dataTableOffset = $('body').attr('data-offset-datatable');
        }

        var dataTableFixHeadPos = dataTableOffset - dataTablePosition;

        $('body').attr('data-fixhead-offset-datatable', dataTablePosition);

        $(".fixedHeader-floating").css('left', dataTableFixHeadPos);
    });

    var contentHeight = $('.content').height();
    if (contentHeight < 960) contentHeight = 980;
    $('.menu').css('height', contentHeight);

    $(document).ajaxComplete(function() {
        var contentHeight = $('.content').height();
        $('.menu').css('height', contentHeight);
    });

})(jQuery);