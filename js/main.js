window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-106742965-4');

$(document).ready(function() {
    $('.chosen-choices .search-field .chosen-search-input.default')
    .after('<div><b></b></div>');
});

var $buoop = {
    vs: {
        i: 10,
        f: 45,
        o: 12.1,
        s: 5.1
    },
    c: 2
};

function $buo_f() {
    var e = document.createElement("script");
    e.src = "js/browser-update.min.js";
    document.body.appendChild(e);
}
try {
    document.addEventListener("DOMContentLoaded", $buo_f, false)
} catch (e) {
    window.attachEvent("onload", $buo_f)
}




// debulked onresize handler
function on_resize(c, t) {
    onresize = function() {
        clearTimeout(t);
        t = setTimeout(c, 100)
    };
    return c
};

function windowHeight() {
    var wH = $(window).height() - 30;
    $('.container > .content').css({
        'min-height': wH,
        'height': "100%"
    });
}

function a2tip() {
    $("a.tip").unbind().click(function() {
        return false;
    }).each(function() {
        var title = $(this).data("title");
        var text = $(this).data("text");
        $(this).qtip({
            position: {
                my: 'left center',
                at: 'center right'
            },
            content: {
                title: title,
                text: text
            },
            style: {
                classes: 'qtip-bootstrap qtip-bulb',
                width: "400px"
            }
        });
    });
}



        // function phone_number_format(phone)
        // {
        //     if (!phone) return ''; // don't convert empty numbers
        //     if (phone.match(/[a-z]/g)) return phone.trim(); // don't touch raw words
        //     phone = phone.replace(/[^0-9]/g, ""); // replace everything but digits
        //     if (phone.length == 10 && phone.charAt(0) == '1') phone = phone.substr(1);
        //     var number = phone.substr(0, 3);
        //     var part2 = phone.substr(3, 3);
        //     var part3 = phone.substr(6);
        //     if (part2) number += part2;
        //     if (part2) number += part3;
        //     return number;
        // }



        function writeCookie() {
            var the_date = new Date("December 31, 2023");
            document.cookie = "users_resolution=" + screen.width + "x" + screen.height + ";expires=" + the_date.toGMTString();
        }

        function int2time(int) {
            // if you modify this function
            // please do the same and for PHP (functions.php)

            if (int == 0) return '<span style="color:#CCC">&mdash;</span>';
            var hours = parseInt(int / 3600);
            var minutes = parseInt(int / 60) % 60;
            var seconds = int % 60;

            if (hours) hours = (hours < 9) ? '0' + hours : hours;

            return (hours > 0 ? hours + ":" : "") + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }


        var get_date_format = null;

        var temp = [
        "export",
        "calls_dialed",
        "calls_received",
        "calls_abandoned",
        "calls_failed",
        "recordings",
        "agent_calls_summary",
        "agent_summary_campaign",
        "agent_performance_historical",
        "agent_status_detail",
        "minute_usage",
        "accesslog",
        "access_log",
        "acd",
        "preview_skip",
        "leads_called",
        "agent_summary_team",
        "fax",
        "calls",
        "agent_declines",
        "performance",
        "trends",
        "messages",
        "agent_status-detail",
        "agent_status_log"
        ];
        var key = 0;

        $(function() {
            /* require(['es6-promise'],function(es6)
             {
                 es6.polyfill();

             });*/

            //var Promise = Promise || ES6Promise.Promise;

            $.each(temp, function(index, value) {
                if (window.location.href.indexOf(value) > -1) {
                    if (get_date_format == 'Y-m-d') get_date_format = 'yy-mm-dd';
                    if (get_date_format == 'm/d/Y') get_date_format = 'mm/dd/yy';
                    if (get_date_format == 'd/m/Y') get_date_format = 'dd/mm/yy';
                    key = 1;
                }
            });
            if (key == 1) {
                $(".datepicker").datepicker({
                    maxDate: "0",
                    dateFormat: get_date_format
                });
                $(".datepicker_yesterday").datepicker({
                    maxDate: "-1d",
                    dateFormat: get_date_format
                });


            } else {
                $(".datepicker").datepicker({
                    maxDate: "0",
                    dateFormat: 'yy-mm-dd'
                });
                $(".datepicker_yesterday").datepicker({
                    maxDate: "-1d",
                    dateFormat: 'yy-mm-dd'
                });
            }

            $("table.report_table")
            .tablesorter()
            .bind("sortEnd", function(e, table) {
                zebra();
            });

            a2tip();
            zebra();
            writeCookie();

            $("input.masked_phone").mask("(999) 999 9999");
            $("input.masked_phone2").mask("999-999-9999");
            $("input.masked_phone3").mask("9?9999999999");
            $("input.masked_zip").mask("99999", {
                placeholder: " "
            });
            $("input.masked_dollar").inputmask("$ [9]{1,10}[.99]", {
                greedy: false
            });

            if ($(".page_help").length) {
                $("h1 .help").css({
                    display: "inline-block"
                });
                $("h1 .help").click(function() {
                    $(".page_help").slideToggle("fast");
                });
            }

            on_resize(function() {
                windowHeight();
            });
            windowHeight();

            $(".close_notification").click(function() {
                var notification_id = $(this).data('notification_id');
                document.cookie = "ic_notification_" + notification_id + "=" + notification_id + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
                $(".un-" + notification_id).hide();
                $(this).parent().prev().css("border-bottom", "1px dashed #AAA");
            });
        });

        function zebra() {
            $(".zebra > tbody > tr > td, .zebra > tr > td").css("background-color", "#FFFFFF");
            $(".zebra > tbody > tr:visible:even > td, .zebra > tr:visible:even > td").css("background-color", "#FAFAFA");
        }

        function order_by(order) {
            document.filter_form.order_by.value = order;
            document.filter_form.submit();
            return false;
        }

        function exxport(type) {
            $("#export_to").val(type);
            document.filter_form.target = "_blank";
            document.filter_form.submit();
            document.filter_form.target = "_self";
            $("#export_to").val('');
            return false;
        }

        function validate_float(s) {
            return /^[0-9]*\.?[0-9]+$/.test(s);
        }

        function validate_float_with_commas(s) {
            return /^[0-9.,]+$/.test(s);
        }

        function validate_digits(s) {
            return /^[0-9]*$/.test(s);
        }

        function validate_email(s) {
            return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(s);
        }

        function validate_email2(s) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s);
        }

        function timeticker() {
            $(".timeticker").each(function() {
                var time = $(this).text();
                if (time.indexOf(":") == -1) return;
                var time = time.split(":").reverse();

                time[0] = Number(time[0]) + 1; // seconds
                if (time[0] == 60) {
                    time[0] = 0;

                    time[1] = Number(time[1]) + 1; // minutes
                    if (time[1] == 60) {
                        time[1] = 0;

                        if (time.length < 3) time[2] = 0; // hours
                        time[2] = Number(time[2]) + 1;
                    }
                    time[1] = ("0" + time[1]).slice(-2);
                }
                time[0] = ("0" + time[0]).slice(-2);
                $(this).text(time.reverse().join(":"));
            });
        }

        if (!window.console) window.console = {
            log: function() {},
            dir: function() {},
            error: function() {}
        };

        // button-player based on jPlayer
        $(function() {
            init_button_player('body');
        });

        function init_button_player(p) {
            var current_button_player;

            $("div.button-player", $(p)).each(function() {
                $(this).append($('<div class="play"/><div class="time"/>'));

                $(this).find(".play").click(function() {
                    var was_playing = $(this).hasClass("playing");

                    // First, stop all players
                    $("#button_jplayer").jPlayer("stop");
                    $("div.button-player .play").removeClass("playing");
                    $("div.button-player .time").text("");
                    $("div.button-player .total_time").show();

                    $(this).closest('.button-player').find('.total_time').hide();

                    if (!was_playing) // start this particular player
                    {
                        current_button_player = $(this).closest("div.button-player");
                        var mp3 = current_button_player.attr("data");

                        $("#button_jplayer").attr("data-jpfid", current_button_player.data("jpfid"));
                        $("#button_jplayer").attr("data-jpftype", current_button_player.data("jpftype"));

                        $(this).addClass("playing");

                        $("#button_jplayer")
                        .jPlayer("stop")
                        .jPlayer("setMedia", {
                            mp3: mp3
                        })
                        .jPlayer("play");
                    }
                });

                if (!$("#button_jplayer").length) {
                    $("body").append("<div id='button_jplayer'/>");

                    // Change the time format
                    $.jPlayer.timeFormat.padMin = true;
                    $.jPlayer.timeFormat.padSec = true;
                    $.jPlayer.timeFormat.sepMin = ":";
                    $.jPlayer.timeFormat.sepSec = "";

                    $("#button_jplayer").jPlayer({
                        ready: function(event) {},
                        timeupdate: function(event) {
                            var file_id = event.target.attributes["data-jpfid"].value;
                            var file_type = event.target.attributes["data-jpftype"].value;

                            var seconds = event.jPlayer.status.currentTime;
                            var time = $.jPlayer.convertTime(seconds);
                            var hundreds = Math.round((seconds - Math.floor(seconds)) * 100);
                            if (hundreds < 10) hundreds = "0" + hundreds;

                            // current_button_player.find(".time").text(parseInt(event.jPlayer.status.currentPercentAbsolute, 10) + "%");
                            if (time == "00:00" && hundreds == "00") $(".jp_" + file_type + "_" + file_id).find(".time").text('');
                            else $(".jp_" + file_type + "_" + file_id).find(".time").text(time);
                        },
                        // progress: function(event){},
                        // play    : function(event){},
                        pause: function(event) {
                            var file_id = event.target.attributes["data-jpfid"].value;
                            var file_type = event.target.attributes["data-jpftype"].value;

                            $(".jp_" + file_type + "_" + file_id).find('.total_time').show();
                        },
                        ended: function(event) {
                            var file_id = event.target.attributes["data-jpfid"].value;
                            var file_type = event.target.attributes["data-jpftype"].value;

                            $(".jp_" + file_type + "_" + file_id).find(".time").text("");
                            $(".jp_" + file_type + "_" + file_id).find(".play").removeClass("playing");
                            $(".jp_" + file_type + "_" + file_id).find('.total_time').show();
                        },
                        swfPath: "/js/jplayer/",
                        supplied: "mp3",
                        wmode: "window"
                    });
                }
            });
}


function yyyymmddhhiss() {
    var tz_offset = 300;
    var d = new Date();
    d = new Date(d.getTime() + (60000 * (d.getTimezoneOffset() - tz_offset)));
    return d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + " " + ("00" + d.getHours()).slice(-2) + ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2)
}

$(document).ready(function() {
    $('.logout-button').click(function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout ?')) {
            $('#logout-form').submit();
        }
        return false;
    })
});


$.extend({
    alert: function(title, message) {
        $("<div></div>").dialog({
            buttons: {
                "Ok": function() {
                    $(this).dialog("close");
                }
            },
            close: function(event, ui) {
                $(this).remove();
            },
            resizable: false,
            title: title,
            width: 400,
            modal: true
        }).html(message);
    }
});



        /**
         * ==== [ Numeric sort for Datatables ] ==================================================
         *
         * This functionality is used for frontend only sorting to sort numeric values with non-numeric strings such as "-" "N/A" etc.
         * Set column type to "numeric" to append this functionality for Datatable column
         */
         (function($) {
            // ==== Ascending sorting ========================================================
            $.fn.dataTableExt.oSort['numeric-asc'] = function(x, y) {
                if (isNaN(x) && isNaN(y)) {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                }

                if (isNaN(x)) {
                    return -1;
                }

                if (isNaN(y)) {
                    return 1;
                }

                x = parseFloat(x);
                y = parseFloat(y);

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            };

            // ==== Descending sorting =========================================================
            $.fn.dataTableExt.oSort['numeric-desc'] = function(x, y) {
                if (isNaN(x) && isNaN(y)) {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                }

                if (isNaN(x)) {
                    return 1;
                }

                if (isNaN(y)) {
                    return -1;
                }

                x = parseFloat(x);
                y = parseFloat(y);

                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            };

        })(jQuery);

        /**
         * ==== [ Upload size validation ] ==================================================
         *
         * This functionality is used automatically on input[type="file"] to prevent php $_FILES errors
         */

         (function($) {
            // === [ Set this option to set uploading file size limit in MB ] ========================================================================
            var FILE_SIZE_LIMIT = 10;

            $(document).on('change', 'input[type="file"]', function(e) {
                if (this.files instanceof FileList) {
                    for (var i = 0; i < this.files.length; i++) {
                        if (this.files[i].size / 1024 / 1024 > FILE_SIZE_LIMIT) {
                            alert('Uploading file size is more than ' + FILE_SIZE_LIMIT + 'MB');
                            this.value = '';
                            break;
                        }
                    }
                }
            });
        })(jQuery);

        // When user clicked update button, count how many filters were used and display this number near filters icon

        function count_used_filters() {
                    var $filters_number = $("#filters-used-number"); // Store reference to number icon
                    var $form_elements = $("#filter_form").serializeArray(); // Get all filters form data
                    var filters_count = 0;
                    var last_value = '';


                    // Get today`s date

                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; // January is 0
                    var yyyy = today.getFullYear();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    today = mm + '/' + dd + '/' + yyyy;


                    // Loop trough all filters and count them using several rules

                    $.each($form_elements, function() {
                        // "request", "page", "order_by", "user_id", "export" fields are not filters (they are hidden fields), so don`t count them
                        // Also no need to count fields with empty values

                        if ($.inArray(this.name, ["request", "page", "order_by", "user_id", "export"]) === -1 && this.value !== 'undefined' && this.value.length > 0) {
                            if (this.name === last_value) return; // This is needed for multi select - no need to count every selection of multi select
                            if (this.name === "filter_call_origin" && this.value === "all") return; // Do not count "Call origin" filter "all" value
                            if ((this.name === "filter_start_date" || this.name === "filter_end_date") && this.value === today) return; // If date filter is today, do not count it
                            if (this.name === "filter_end_date" && last_value === "filter_start_date") return; // If start filter date was already counted, there is no need to count end date

                            filters_count++;
                            last_value = this.name; // Store last value that was counted for multi select not to be counted multiple times
                        }
                    });


                    // Set filter count

                    $filters_number.text(filters_count);


                    // Toggle count icon depending on filter count

                    filters_count ? $filters_number.show() : $filters_number.hide();
                }


                // Document ready

                $(document).ready(function() {

                    //init save as variables
                    var clone_page_id = '';
                    var clone_page_user_id = '';
                    var clone_page_visibility = '';
                    var original_report_name = '';
                    var clone_page_title = '';
                    var clone_page_filters = '';
                    var clone_page_columns = '';

                    if (!original_report_name) original_report_name = (window.location.pathname).replace(/\/|reports/gi, '');
                    $('input[name=original_report_name]').val(original_report_name);



                    // set default form filter values
                    var $form_elements = clone_page_filters ? clone_page_filters : $("#filter_form").serializeArray();

                    $('#calls').on('error.dt', function(e, settings, techNote, message) {
                        alert("Oops, seems like we have a temporary connectivity problem. \n Please try reloading the page.");
                    });

                    var table = $('#calls').DataTable({
                        "stateSave": true,
                        "stateSaveParams": function(settings, data) {
                            data.start = 0;
                            data.length = 100;
                        },
                        "stateDuration": 0,
                        "fixedHeader": {
                            header: true,
                            headerOffset: $('#fixthead').outerHeight(),
                        },
                        "serverSide": true,
                        "bPaginate": true,
                        "processing": true,
                        "bAutoWidth": false,
                        "searching": false,
                        "pageLength": 100,
                        "bLengthChange": false,
                        "language": {
                            "emptyTable": function() {
                                return "No data available at this moment.";
                            },
                            "loadingRecords": "&nbsp;",
                            "processing": "Loading. Please wait...",
                        },

                        'ajax': {
                            "type": "POST",
                            "url": '/reports/calls/',
                            "data": function(d) {
                                // generate variables with values based on form filter data
                                // we need it to prevent change table data without pressing on UPDATE button
                                if ($form_elements) {
                                    var filterFormData = {}; // string -> list<string> map for filter form
                                    // Generating multimap to serialize in traditional way
                                    for (var i in $form_elements) {
                                        var field = $form_elements[i];
                                        var existing = filterFormData[field["name"]];
                                        if (existing) {
                                            existing.push(field["value"]);
                                            filterFormData[field["name"]] = existing;
                                        } else {
                                            filterFormData[field["name"]] = [field["value"]];
                                        }
                                    }

                                    // Adding filter form data, serialized in traditional way, to Datatables data, serialized in non-traditional way
                                    return $.param(d) + "&" + $.param(filterFormData, true);
                                }
                            }
                        },

                        'columns': [{
                            "data": {},
                            "render": function(data) {
                                return '<a href="/reports/calls/details/' + data.callid + '/" class="call-details-link" target="_blank">' + data.calldate + '</a>';
                            },
                            className: 'col-1'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.call_origin;
                            },
                            className: 'col-2'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.calltype;
                            },
                            className: 'col-3'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return '<span class="contact_list_phone">' + data.callsphone + '</span>';
                            },
                            className: 'col-4'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.callerid ? '<span class="contact_list_phone">' + data.callerid + '</span>' : '';
                            },
                            className: 'col-5'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.dnis ? '<span class="contact_list_phone">' + data.dnis + '</span>' : '';
                            },
                            className: 'col-6'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.statusname;
                            },
                            className: 'col-7'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return int2time(data.callduration);
                            },
                            className: 'col-8 center'
                        },

                        {
                            "data": {},
                            "render": function(data) {
                                if (data.ext_rec)
                                    return data.userfield ? '<div class="button-player jp_record_' + data.callid + '" data-jpfid="' + data.callid + '" data-jpftype="record"  data="https://ctax.intelligentcontacts.net/reports/calls/download/' + data.userfield + '/.mp3"><div class="total_time">' + int2time(data.call_duration) + '</div></div>' : '<span class="dash" style="color:#CCC;">&mdash;</span>';
                                else return '<span class="dash" style="color:#CCC;">&mdash;</span>';
                            },
                            className: 'col-9'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.ext_rec)
                                    return data.userfield ? '<a class="download-link" style="margin-right: 6px; vertical-align: -4px;" href="reports/calls/download/' + data.userfield + '/" ><img style="margin-right: 6px; vertical-align: -4px;" src="images/icons/icon_disk_16x16.png"><span class="link_decoration">download</span></a>' : '<span style="color:#CCC;">&mdash;</span>';
                                else return '<span class="dash" style="color:#CCC;">&mdash;</span>';
                            },
                            className: 'col-10'
                        },

                        {
                            "data": {},
                            "render": function(data) {
                                return data.voicemail ? data.voicemail_deleted == '1' ? 'Deleted [' + data.voicemail_deleted_at + ']' : '<div class="button-player jp_voicemail_' + data.voicemail + '" data-jpfid="' + data.voicemail + '" data-jpftype="voicemail" data="https://ctax.intelligentcontacts.net/reports/calls/' + data.voicemail + '/"><div class="total_time">' + int2time(data.voicemail_duration) + '</div>' : '<span style="color:#CCC">&mdash;</span>';
                            },
                            className: 'col-11'
                        },

                        {
                            "data": {},
                            "render": function(data) {
                                return data.agent_name;
                            },
                            className: 'col-12'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.camp_name;
                            },
                            className: 'col-13'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.account_id;
                            },
                            className: 'col-14'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.poolname
                            },
                            className: 'col-15'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.dispcode === 'Unknown')
                                    return '<img style="margin-right: 6px; vertical-align: -4px;" src="images/icons/flag_finish_grey_16x16.png"> Unknown';
                                else {
                                    if (data.disp_deleted === '1') return '<span class="disp-deleted">' + data.dispcode + '</span>';
                                    else return '<a href="call_result/' + data.dispid + '/" class="call_result">' + data.dispcode + '</a>';
                                }
                            },
                            className: 'col-16'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.finalcrc;
                            },
                            className: 'col-17'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.call_final_event;
                            },
                            className: 'col-18'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.missed ? 'Yes' : '<span style="color:#CCC">—</span>';
                            },
                            className: 'col-19'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return int2time(data.talk_time);
                            },
                            className: 'col-20 center'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return int2time(data.wrap_time);
                            },
                            className: 'col-21 center'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return int2time(data.waittime);
                            },
                            className: 'col-22 center'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.revenue;
                            },
                            className: 'col-23 center'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                return data.resulted_in;
                            },
                            className: 'col-24 center'
                        },

                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['ExtName']) {

                                    if (data.attributes['ExtName']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['ExtName']['value'] + '</span>';
                                    else
                                        return data.attributes['ExtName']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-1'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['Lead Provider ID']) {

                                    if (data.attributes['Lead Provider ID']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['Lead Provider ID']['value'] + '</span>';
                                    else
                                        return data.attributes['Lead Provider ID']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-2'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['SetOfficerID']) {

                                    if (data.attributes['SetOfficerID']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['SetOfficerID']['value'] + '</span>';
                                    else
                                        return data.attributes['SetOfficerID']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-3'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['StatusID']) {

                                    if (data.attributes['StatusID']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['StatusID']['value'] + '</span>';
                                    else
                                        return data.attributes['StatusID']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-4'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['Test']) {

                                    if (data.attributes['Test']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['Test']['value'] + '</span>';
                                    else
                                        return data.attributes['Test']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-5'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['Test2']) {

                                    if (data.attributes['Test2']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['Test2']['value'] + '</span>';
                                    else
                                        return data.attributes['Test2']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-6'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['UDF133']) {

                                    if (data.attributes['UDF133']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['UDF133']['value'] + '</span>';
                                    else
                                        return data.attributes['UDF133']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-7'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['UDF134']) {

                                    if (data.attributes['UDF134']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['UDF134']['value'] + '</span>';
                                    else
                                        return data.attributes['UDF134']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-8'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['UDF34']) {

                                    if (data.attributes['UDF34']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['UDF34']['value'] + '</span>';
                                    else
                                        return data.attributes['UDF34']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-9'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['UDF9']) {

                                    if (data.attributes['UDF9']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['UDF9']['value'] + '</span>';
                                    else
                                        return data.attributes['UDF9']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-10'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['productid']) {

                                    if (data.attributes['productid']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['productid']['value'] + '</span>';
                                    else
                                        return data.attributes['productid']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-11'
                        },
                        {
                            "data": {},
                            "render": function(data) {
                                if (data.attributes['teamid']) {

                                    if (data.attributes['teamid']['deleted'])
                                        return '<span style="text-decoration: line-through;color:#b3b3b3;">' + data.attributes['teamid']['value'] + '</span>';
                                    else
                                        return data.attributes['teamid']['value'];
                                }
                                return '';
                            },
                            className: 'col-attr-12'
                        },
                        ],

                        "drawCallback": function(settings) {
                            //hide pagination if 0 row
                            if ($('.dataTables_empty').length) {
                                $('.dataTables_info').hide();
                                $('.dataTables_paginate').hide();
                            } else {
                                $('.dataTables_info').show();
                                $('.dataTables_paginate').show();
                            }

                            init_button_player("body");
                            var hide_column = $.cookie("calls_column");
                            if (typeof hide_column != 'undefined') {

                                hide_column = JSON.parse(hide_column);

                                $.each(hide_column, function(obj, col) {
                                    $(' .' + col).hide();

                                    $(".column-checkbox").find("[data-column='" + col + "']").attr("checked", false);
                                });
                            }

                            // Make h1
                            $("#report-header").css({
                                width: $("#calls").outerWidth()
                            });


                            // $('#calls').show();
                        },
                        "initComplete": function() {

                            $('.iCheck-helper').click(function() {
                                var data_click = $(this).prev('.iCheck').data('column');

                                // Skip non columns checkboxes
                                //TODO it call error Cannot read property 'length' of undefined
                                //if (!data_click.length) return;
                                if (typeof data_click === "undefined") return;

                                if (!$(this).prev('.iCheck').is(":checked")) {
                                    $('.' + data_click).addClass("chameleon-click-one");
                                    $('.' + data_click).fadeToggle(1000);
                                    setTimeout(function() {
                                        $('.' + data_click).removeClass("chameleon-click-one");
                                    }, 1000);
                                } else {
                                    $('.' + data_click).addClass("chameleon-click");
                                    $('.' + data_click).fadeToggle(1000);
                                    setTimeout(function() {
                                        $('.' + data_click).removeClass("chameleon-click");
                                    }, 1000);
                                }

                                var column_array = [];
                                $.each($('#column_settings_form input:not(:checked)'), function() {
                                    column_array.push($(this).data('column'));
                                });
                                $.cookie("calls_column", JSON.stringify(column_array));
                            });


                            var hide_column = '';
                            if ($.cookie("calls_column") && typeof hide_column != 'undefined') {
                                hide_column = $.cookie("calls_column");
                                hide_column = JSON.parse(hide_column);
                                $.each(hide_column, function(obj, col) {
                                    $(' .' + col).hide();
                                    $('#column_' + col).iCheck('uncheck');
                                });
                            }
                        }
                    });



$("#phone_filter").on('input', function() {
    var new_val = $(this).val().replace(/-/g, '');
    $(this).val($.trim(new_val))
});


$('.mp3').jmp3({
    backcolor: "496ad4",
    forecolor: "FFFFFF",
    width: 80,
    showdownload: "true"
});

$('.iCheck').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue'
});


$("#agent").chosen().change(function(evt, params) {
    var chosenValues = $(this).val();
    var selectedParam = params.selected;
    var deselectedParam = params.deselected;

    if (selectedParam == 'active')
        $("#agent option[value='inactive']").remove();

    if (selectedParam == 'inactive')
        $("#agent option[value='active']").remove();

    if (deselectedParam == 'active' && !$("#agent").find("option[value=inactive]").length)
        $("#agent").prepend('<option value="inactive">Inactive users</option>');

    if (deselectedParam == 'inactive' && !$("#agent").find("option[value=active]").length)
        $("#agent").prepend('<option value="active">Active Users</option>');

    $('#agent').trigger("chosen:updated");
});

$('.Voicemail .icheckbox_square-blue').css('float', 'left');



$('#update').click(function(e) {
    e.preventDefault();

    $form_elements = $("#filter_form").serializeArray();

    count_used_filters();

    table.ajax.reload();
    return false;
});


                    // Check if it`s Edge browser and lower font-size to 13px on date filters, because, otherwise, the date doesn`t fit

                    if (/Edge\/\d./i.test(navigator.userAgent)) $("#filter_start_date, #filter_end_date").css({
                        "font-size": 13
                    });


                    // Gives the ability to press "Enter" button on "phone number" and "account id" filters to trigger data update

                    $("#phone_filter, #account_id").keyup(function(e) {
                        if (e.which === 13) { // Enter was pressed
                            $(this).trigger("blur"); // Remove focus
                            $("#update").trigger("click"); // Click on "Update" button
                        }
                    });


                    // Save as functionality block start =======================================================================
                    if (clone_page_id) {
                        $('.clone_title').append(' / ' + clone_page_title);
                        $('a').removeClass('active');
                        $("a[href='" + window.location.pathname + "']").addClass('active');
                    }

                    if (clone_page_columns) { //draw columns
                        $.cookie("calls_column", clone_page_columns)
                    }

                    if (clone_page_filters) { //draw filters
                        $.each(clone_page_filters, function(key, value) {
                            var name = value.name;
                            var new_v = value.value;
                            var v = $('[name="' + name + '"]').val();
                            if (name.indexOf('[]') != -1) {
                                if (!v) v = [];
                                v.push(new_v);
                                $('[name="' + name + '"]').val(v).trigger("chosen:updated");

                            } else $('[name="' + name + '"]').val(new_v).trigger("chosen:updated");

                            if (name == 'check_voicemail') {
                                if (new_v) $('#Voicemail').next('.iCheck-helper').click();
                            }
                            if (name == 'missed') {
                                if (new_v) $('#missed').next('.iCheck-helper').click();
                            }

                        });
                    }


                    // Dislpay filter count
                    count_used_filters();

                    $('body').on('click', '#submit_save_as, #update_as_submit', function(e) {

                        if ($(this).attr('id') == 'update_as_submit')
                            var save_as_val = $('#update_as_form .save_as').val();
                        else
                            var save_as_val = $('#save_as_form .save_as').val();

                        if (save_as_val) {
                            e.preventDefault();

                            var save_as_filter = JSON.stringify($("#filter_form").serializeArray());
                            var save_as_columns = $.cookie("calls_column");

                            if ($(this).attr('id') == 'submit_save_as') {
                                $(' #save_as_filter').val(save_as_filter);
                                $(' #save_as_columns').val(save_as_columns);

                                $('#save_as_form').submit();
                            } else {
                                $('#update_as_filter').val(save_as_filter);
                                $('#update_as_columns').val(save_as_columns);

                                $('#update_as_form').submit();
                            }
                        }
                    });
                });


$(".chosen").chosen({
    disable_search_threshold: 14
});

$(function() {

            //disable autocomplete
            $(document).on('focus', ':input', function() {
                $(this).attr('autocomplete', 'off');
            });

            //fix thead
            $("#fixthead").on('scroll', function() {
                delta = $(this).offset().top - $(this).find(' table thead').offset().top;
                $(this).find(' table thead').children().children().css({
                    "transform": "translate(0px," + (delta > 0 ? delta : 0) + "px)"
                });
                return false;
            });

            $('#fixthead table').tablesorter({
                theme: 'blackice'
            });

            // $(document).ready(function () {
            // // set document height to all container (fix for datatables fixedhead)
            //  var icWindowHeight = $("#intelligentcontacts-container").height();
            // $("#intelligentcontacts-container").css("height", (icWindowHeight + 100)); // add plus 100px
            // });
        });