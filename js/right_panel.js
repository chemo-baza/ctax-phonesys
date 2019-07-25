$(function() {

    $('#bookmark-menu > li > a').click(function(e) {
        e.preventDefault();
        var fn = $(this);

        if (fn.parent().hasClass('active')) {
            $('body').removeClass('bookmark-opened');
            fn.parent().removeClass('active');
            Agent.stop_my_team_update();
            Agent.stop_my_stats_update();
        } else {
            // menu active, block active
            fn.parent().addClass('active').siblings().removeClass('active');
            $('#' + fn.data('id')).show().siblings().hide();

            if (!$('body').hasClass('bookmark-opened')) $('body').addClass('bookmark-opened');
            Agent.init_my_team_update();
            Agent.init_my_stats_update();
        }
        return false;
    });


});