;
(function($) {

    $.fn.paginator = function(s) {
        var options = {
            pagesTotal: 1, //total pages
            pagesSpan: 10, //number of shown pages
            pageCurrent: 1, //current page
            baseUrl: document.location + '&page=%number%', //link template
            builCounter: function(page) { //build function
                return page;
            },
            clickHandler: null,
            returnOrder: false, //reverse page output
            lang: {
                next: "Next",
                last: "Last",
                prior: "Previous",
                first: "First",
                arrowRight: String.fromCharCode(8594),
                arrowLeft: String.fromCharCode(8592)
            }
        };

        $.extend(options, s);

        options.pagesSpan = options.pagesSpan < options.pagesTotal ? options.pagesSpan : options.pagesTotal;
        options.pageCurrent = options.pagesTotal < options.pageCurrent ? options.pagesTotal : options.pageCurrent;
        if (!options.baseUrl.match(/%number%/i)) options.baseUrl += '%number%/';

        var html = {};

        function prepareHtml(el) {
            $(el).html(makePagesTableHtml());
            if (options.pagesTotal == options.pagesSpan) {
                $(el).addClass('fulsize');
            };

            html = {
                holder: el,
                table: $(el).find('table:last'),
                trPages: $(el).find('table:last tr:first'),
                tdsPages: $(el).find('table:last tr:first td'),
                scrollBar: $(el).find('div.scroll_bar'),
                scrollThumb: $(el).find('div.scroll_thumb'),
                pageCurrentMark: $(el).find('div.current_page_mark')
            };
        };

        function getLink(page) {
            return options.baseUrl.replace(/%number%/i, options.builCounter(page));
        }

        function makePagesTableHtml() {
            var next_page = (parseInt(options.pageCurrent) < parseInt(options.pagesTotal)) ? parseInt(options.pageCurrent) + 1 : options.pagesTotal;
            var next = '<a href="' + getLink(next_page) + '" rel="' + next_page + '">%next%</a>';

            var last = '<a href="' + getLink(options.pagesTotal) + '" rel="' + options.pagesTotal + '">%last%</a>';

            var prior_page = (parseInt(options.pageCurrent) > 1) ? parseInt(options.pageCurrent) - 1 : 1;
            var prior = '<a href="' + getLink(prior_page) + '" rel="' + prior_page + '">%prior%</a>';

            var first = '<a href="' + getLink(1) + '" rel="' + 1 + '">%first%</a>';

            if (options.returnOrder) {
                var top_left = options.lang.arrowLeft + ' ' + options.lang.next;
                var bottom_left = options.lang.last;
                var top_right = options.lang.prior + ' ' + options.lang.arrowRight;
                var bottom_right = options.lang.first;

                if (options.pageCurrent !== options.pagesTotal) {
                    top_left = next.replace(/%next%/, top_left);
                    bottom_left = last.replace(/%last%/, bottom_left);
                };

                if (options.pageCurrent !== 1) {
                    top_right = prior.replace(/%prior%/, top_right);
                    bottom_right = first.replace(/%first%/, bottom_right);
                };
            } else {
                var top_left = options.lang.arrowLeft + ' ' + options.lang.prior;
                var top_right = options.lang.next + ' ' + options.lang.arrowRight;
                var bottom_left = options.lang.first;
                var bottom_right = options.lang.last;

                if (options.pageCurrent !== options.pagesTotal) {
                    top_right = next.replace(/%next%/, top_right);
                    bottom_right = last.replace(/%last%/, bottom_right);
                };

                if (options.pageCurrent !== 1) {
                    top_left = prior.replace(/%prior%/, top_left);
                    bottom_left = first.replace(/%first%/, bottom_left);
                };
            };

            tdWidth = (100 / (options.pagesSpan + 2)) + '%';
            tdWidth = 30;

            code =
                '<table>' +
                '<tr>' +
                '<td rowspan="2" align="center">' +
                '<table>' +
                '<tr>';
            for (i = 1; i <= options.pagesSpan; i++) code += '<td width="' + tdWidth + '" />';
            code += '</tr>' +
                '<tr>' +
                '<td colspan="' + options.pagesSpan + '">' +
                '<div class="scroll_bar">' +
                '<div class="scroll_trough" />' +
                '<div class="scroll_thumb">' +
                '<div class="scroll_knob" />' +
                '</div>' +
                '<div class="current_page_mark" />' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>';

            return code;
        };

        function initScrollThumb() {
            html.scrollThumb.widthMin = '8';
            html.scrollThumb.widthPercent = options.pagesSpan / options.pagesTotal * 100;
            html.scrollThumb.xPosPageCurrent = (options.pageCurrent - Math.round(options.pagesSpan / 2)) / options.pagesTotal * $(html.table).width();
            if (options.returnOrder) {
                html.scrollThumb.xPosPageCurrent = $(html.table).width() - (html.scrollThumb.xPosPageCurrent + Math.round(options.pagesSpan / 2) / options.pagesTotal * $(html.table).width());
            }
            html.scrollThumb.xPos = html.scrollThumb.xPosPageCurrent;
            html.scrollThumb.xPosMin = 0;
            html.scrollThumb.xPosMax;
            html.scrollThumb.widthActual;
            setScrollThumbWidth();
        };

        function setScrollThumbWidth() {
            $(html.scrollThumb).css({
                width: html.scrollThumb.widthPercent + "%"
            });
            html.scrollThumb.widthActual = $(html.scrollThumb).width();

            if (html.scrollThumb.widthActual < html.scrollThumb.widthMin)
                $(html.scrollThumb).css('width', html.scrollThumb.widthMin + 'px');

            html.scrollThumb.xPosMax = $(html.table).width - html.scrollThumb.widthActual;
        };

        function moveScrollThumb() {
            $(html.scrollThumb).css("left", html.scrollThumb.xPos + "px");
        }

        function initPageCurrentMark() {
            html.pageCurrentMark.widthMin = '3';
            html.pageCurrentMark.widthPercent = 100 / options.pagesTotal;
            html.pageCurrentMark.widthActual;
            setPageCurrentPointWidth();
            movePageCurrentPoint();
        };

        function setPageCurrentPointWidth() {
            $(html.pageCurrentMark).css("width", html.pageCurrentMark.widthPercent + '%');

            html.pageCurrentMark.widthActual = $(html.pageCurrentMark).width();

            if (html.pageCurrentMark.widthActual < html.pageCurrentMark.widthMin)
                $(html.pageCurrentMark).css("width", html.pageCurrentMark.widthMin + 'px');
        };

        function movePageCurrentPoint() {
            var pos = 0;

            if (html.pageCurrentMark.widthActual < $(html.pageCurrentMark).width()) {
                pos = (options.pageCurrent - 1) / options.pagesTotal * $(html.table).width() - $(html.pageCurrentMark).width() / 2;
            } else {
                pos = (options.pageCurrent - 1) / options.pagesTotal * $(html.table).width();
            };

            if (options.returnOrder) pos = $(html.table).width() - pos - $(html.pageCurrentMark).width();

            $(html.pageCurrentMark).css({
                left: pos + 'px'
            });
        };

        function initEvents() {
            moveScrollThumb();
            options.returnOrder ? drawReturn() : drawPages();
            //drag	
            $(html.scrollThumb).bind('mousedown', function(e) {
                var dx = e.pageX - html.scrollThumb.xPos;

                $(document).bind('mousemove', function(e) {
                    html.scrollThumb.xPos = e.pageX - dx;

                    moveScrollThumb();
                    options.returnOrder ? drawReturn() : drawPages();
                });

                $(document).bind('mouseup', function() {
                    $(document).unbind('mousemove');
                    enableSelection();
                });

                disableSelection();
            });
            //callback click	
            $(html.holder).find('a[rel!=""]').bind('click', function(e) {
                return options.clickHandler($(this).attr('rel'));
            });
            //fix resize	
            $(window).resize(function() {
                setPageCurrentPointWidth();
                movePageCurrentPoint();
                setScrollThumbWidth();
            });
            //execute link function
            function executeLink(el) {
                if ($.isFunction(options.clickHandler)) {
                    $(el).click();
                } else {
                    document.location = $(el).attr('href');
                };
            }
            //keyboard navigation	
            $(document).keydown(function(e) {
                if (e.ctrlKey) {
                    switch (e.keyCode ? e.keyCode : e.which ? e.which : null) {
                        case 0x25: //previous page
                            executeLink($(options.returnOrder ? '.right.top a' : '.left.top a', html.holder));
                            break;

                        case 0x27: //next page
                            executeLink($(options.returnOrder ? '.left.top a' : '.right.top a', html.holder));
                            break;
                    }
                }
            })
        };

        function bindLink(el) {
            if ($.isFunction(options.clickHandler)) {
                $(el).find('a').bind('click', function() {
                    return options.clickHandler(options.builCounter($(this).text()));
                });
            }
        }

        function drawPages() {
            var percentFromLeft = html.scrollThumb.xPos / $(html.table).width();
            var cellFirstValue = Math.round(percentFromLeft * options.pagesTotal);

            var data = "";

            if (cellFirstValue < 1) {
                cellFirstValue = 1;
                html.scrollThumb.xPos = 0;
                moveScrollThumb();
            } else if (cellFirstValue >= options.pagesTotal - options.pagesSpan) {
                cellFirstValue = options.pagesTotal - options.pagesSpan + 1;
                html.scrollThumb.xPos = $(html.table).width() - $(html.scrollThumb).width();
                moveScrollThumb();
            };

            for (var i = 0; i < html.tdsPages.length; i++) {
                var cellCurrentValue = cellFirstValue + i;
                if (cellCurrentValue == options.pageCurrent) {
                    data = '<span><strong>' + parseInt(cellCurrentValue) + '</strong></span>';
                } else {
                    data = '<span><a href="' + getLink(parseInt(cellCurrentValue)) + '" rel="' + parseInt(cellCurrentValue) + '">' + parseInt(cellCurrentValue) + '</a></span>';
                };

                $(html.tdsPages[i]).html(data);

                bindLink(html.tdsPages[i]);
            };
        };

        function drawReturn() {
            var percentFromLeft = html.scrollThumb.xPos / $(html.table).width();
            var cellFirstValue = options.pagesTotal - Math.round(percentFromLeft * options.pagesTotal);

            var data = "";
            if (cellFirstValue < options.pagesSpan) {
                cellFirstValue = options.pagesSpan;
                html.scrollThumb.xPos = $(html.table).width() - $(html.scrollThumb).width();
                moveScrollThumb();
            } else if (cellFirstValue >= options.pagesTotal) {
                cellFirstValue = options.pagesTotal;
                html.scrollThumb.xPos = 0;
                moveScrollThumb();
            };

            for (var i = 0; i < html.tdsPages.length; i++) {
                var cellCurrentValue = cellFirstValue - i;

                if (cellCurrentValue == options.pageCurrent) {
                    data = '<span><strong>' + cellCurrentValue + '</strong></span>';
                } else {
                    data = '<span><a href="' + getLink(cellCurrentValue) + '" rel="' + cellCurrentValue + '">' + cellCurrentValue + '</a></span>';
                };

                $(html.tdsPages[i]).html(data);

                bindLink(html.tdsPages[i]);
            };
        };

        function enableSelection() {
            document.onselectstart = function() {
                return true;
            };
        };

        function disableSelection() {
            document.onselectstart = function() {
                return false;
            };
            $(html.scrollThumb).focus();
        };

        prepareHtml(this);
        initScrollThumb();
        initPageCurrentMark();
        initEvents();

        if (options.pagesTotal == 1) this.hide();
        if (options.pagesTotal <= options.pagesSpan) this.find(".scroll_bar").hide();
    };
})(jQuery);