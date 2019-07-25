// === START: VOICEMAILS ===============================================================================================

$(function() {
    init_voicemail();
    setInterval(init_voicemail, 1000 * 30); // update every 30 seconds

    var voicemail_list = '';

    function init_buttons() {
        $('.mp3').jmp3({
            backcolor: "496ad4",
            forecolor: "FFFFFF",
            width: 80,
            showdownload: "false"
        });

        $('.delete_vm').click(function(e) {
            e.preventDefault();

            var fn = $(this);

            if (confirm('Are you sure you want to delete message: ' + fn.data('callerid') + ' ?')) {
                var tr = fn.parents('tr');

                tr.css('opacity', '.4');

                $.ajax({
                    url: 'ajax/',
                    method: 'post',
                    dataType: 'json',
                    data: {
                        act: 'delete_voicemail',
                        action: 'delete',
                        id: fn.data('id')
                    }
                }).done(function(r) {
                    if (r.success) {
                        tr.hide();
                        init_voicemail();
                    }
                });

            }

            return false;
        });

        // sort voicemails in right panel menu
        $('body').on('click', '.voicemail_sort', function(e) {

            e.preventDefault();

            var old_datasort = $(this).data('sort') == 'asc' ? 'asc' : 'desc';
            var new_datasort = $(this).data('sort') == 'asc' ? 'desc' : 'asc';

            $.ajax({
                url: "ajax/",
                method: "post",
                dataType: "json",
                data: {
                    act: "voicemail_sort"
                }
            }).done(function(r) {
                $(".voicemail_sort").removeClass(old_datasort).addClass(new_datasort);
                $(".voicemail_sort").data('sort', new_datasort);
                //stop_voicemail();
                init_voicemail();
            });
        });
    }

    function init_voicemail() {
        $.ajax({
            url: 'ajax/',
            method: 'post',
            data: {
                act: 'voicemail',
                action: 'init'
            }
        }).done(function(r) {

            if (JSON.stringify(r) == JSON.stringify(voicemail_list)) return;
            voicemail_list = JSON.parse(r);

            // show notification if voicemail list changed
            if (voicemail_list.has_new_msg && !$('body').hasClass('bookmark-opened')) {
                // toggle voicemail panel through "notification"
                toastr["info"]('<a href="#" class="open-voicemail-panel">click here to toggle voicemail panel</a>', "New Voicemail");
                $('.open-voicemail-panel').unbind().click(function(e) {
                    e.preventDefault();
                    $('#open-voicemail-panel').click();
                    return false;
                });
            }

            update_voicemail(voicemail_list.messages);
        });


        // Update online agents list
        // Updater.add({
        //     what:       "voicemail",
        //     interval:   30,
        //     ajax_vars:  { act : "voicemail" },
        //     done:       function(r)
        //     {
        //         if(JSON.stringify(r) == JSON.stringify(voicemail_list)) return;
        //         voicemail_list = r;
        //
        //         // show notification if voicemail list changed
        //         if (voicemail_list.has_new_msg && !$('body').hasClass('bookmark-opened'))
        //         {
        //             // toggle voicemail panel through "notification"
        //             toastr["info"]('<a href="#" class="open-voicemail-panel">click here to toggle voicemail panel</a>', "New Voicemail");
        //             $('.open-voicemail-panel').unbind().click(function(e){ e.preventDefault(); $('#open-voicemail-panel').click(); return false; });
        //         }
        //
        //         update_voicemail (r.messages);
        //     }
        // });
    }

    // function stop_voicemail ()
    // {
    //     Updater.stop("voicemail");
    // }


    function update_voicemail(voicemails) {
        var table = $(".voicemail_list");
        table.empty();
        if (!voicemails) return;
        var i = 0;
        $.each(voicemails, function(index, item) {
            i++;
            table.append('<tr>' +
                '<td width="100%">' +
                '<span style="color: #888">' + item.origdate + ' <span style="color: #aaa">(' + item.duration + ')</span></span><br>' +
                '<b style="font-size: 15px;"># ' + item.callerid + '</b>' +
                '</td>' +
                '<td width="30">' +
                '<div title="Play Message" class="button-player jp_voicemail_' + item.id + '" data-jpfid="' + item.id + '" data-jpftype="voicemail" data="/devices/' + voicemail_device_id + '/voicemail/listen/' + item.id + '/">' +
                '</div>' +
                '</td>' +
                '<td width="30"><a href="#" class="delete_vm" data-id="' + item.id + '" data-callerid="' + item.callerid + '" title="Delete Message"></a></td>' +
                '</tr>');
        });

        init_buttons();
        init_button_player('#bookmark-container .voicemail_list');
    }


});

// === END: VOICEMAILS =================================================================================================