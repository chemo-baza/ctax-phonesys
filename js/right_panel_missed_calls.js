// === START: MISSED CALLS =============================================================================================

$(function() {
    init_missedcalls();
    setInterval(init_missedcalls, 1000 * 60); // update every 1 minute

    function init_missedcalls() {
        $.ajax({
            url: 'ajax/',
            method: 'post',
            data: {
                act: 'missed_calls_update',
                action: 'init'
            }
        }).done(function(res) {
            if (res) update_missedcalls(res);
        });
    }

    function update_missedcalls(r) {
        var divmc = $(".right_tab_missedcalls_list");
        var divpg = $(".right_tab_missedcalls_pager");
        var divtt = $(".right_tab_missedcalls_title");

        r = JSON.parse(r);

        if (r.html) {
            divmc.empty();

            if (r.html.result === 'yes') {
                divmc.append('<table class="missed_calls_list" style="width:100%" cellspacing="0"></table>');

                $.each(r.html.row, function(index, item) {
                    $(".missed_calls_list").append('<tr id="dismiss_call_row_' + item.id + '">' +
                        '<td align="left"><p><span style="font-size: 11px; color: #888;">' + item.timestamp + '</span><br /><span style="font-weight: 600; font-size: 15px;">#' + item.phone + '</span></p></td>' +
                        '<td align="right"><div class="dismiss_button" data-calldismissid="' + item.id + '" title="dismiss">Dismiss</div></td>' +
                        '</tr>');
                });
            } else {
                divmc.append(r.html.row);
            }
        }

        if (r.pager) {
            divpg.empty();
            divpg.html('<div id="right_tab_missing_call_pages" data-pgtotal="' + parseInt(r.pager.total_pages) + '" data-pgspan="' + parseInt(r.pager.per_page) + '" data-pgcurr="' + parseInt(r.pager.page) + '" style="margin-bottom: 10px;" class="paginator"></div>');
        }

        if (r.sort) {
            divtt.empty();
            divtt.html('Missed Calls <a href="#" class="missedcalls_sort ' + r.sort + '" data-sort="' + r.sort + '"></a>');
        }

        missed_calls_paginator();
    }

    // pagination for our missed calls list
    function missed_calls_paginator() {
        $("div#right_tab_missing_call_pages").each(function() {

            $(this).paginator({
                pagesTotal: $(this).data("pgtotal"),
                pagesSpan: $(this).data("pgspan"),
                pageCurrent: $(this).data("pgcurr"),
                baseUrl: "/agent/missed_calls/page/",
                clickHandler: function(page) {
                    $.ajax({
                        url: 'ajax/',
                        method: 'post',
                        data: {
                            act: 'missed_calls_update',
                            action: 'page',
                            page: page
                        }
                    }).done(function(res) {
                        update_missedcalls(res);
                    });

                    return false;
                }
            });
        });
    }

    // sorting missed calls
    $('body').on('click', '.missedcalls_sort', function(e) {

        e.preventDefault();

        $.ajax({
            url: 'ajax/',
            method: 'post',
            data: {
                act: 'missed_calls_update',
                action: 'sort'
            }
        }).done(function(res) {
            update_missedcalls(res);
        });
    });

    // remove missed call from list
    $('body').on('click', '.dismiss_button', function(e) {

        e.preventDefault();

        var dismissid = $(this).data('calldismissid');

        $.ajax({
            url: 'ajax/',
            method: 'post',
            data: {
                act: 'missed_calls_update',
                action: 'dismiss',
                dismissid: dismissid
            }
        }).done(function(res) {
            if (res === 'success') {
                $('#dismiss_call_row_' + dismissid).fadeOut().delay(2000);
                init_missedcalls();
            }
        });
    });

    // TODO: do not delete this cause we need it if we want to display tooltips
    // dusplay tooltips
    // function init_missedcalls_tooltips()
    // {
    //     $(".button_call_back").each(function()
    //     {
    //         if ($(this).data("text") !== '') {
    //             $(this).qtip({
    //                 position: { my: 'right top', at: 'bottom left' },
    //                 content : { text: $(this).data("text") },
    //                 style   : { classes: 'qtip-bootstrap qtip-bulb', width: "200px" }
    //             });
    //         }
    //     });
    // }

    // TODO: do not delete this cause we need it if we want to make recall functionality
    // make a recall
    // function init_missedcalls_call()
    // {
    //     $('body').on('click', '#misscall_btn.green', function(e) {
    //         Agent.log("Placing call");
    //         Agent.place_manual_call( $(this).data('callnum'), $(this).data('callcampid'), true );
    //     });
    // }
});

// === END: MISSED CALLS ===============================================================================================