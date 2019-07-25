// Do all the preparations to close filter section

function close_filter_section() {
    var $filters_sidebar = $("#filter-sidebar"); // Get filter section reference
    var $filter_icons_list = $("#filter-icons-list"); // Get filters icons list reference
    var $fixed_header = $(".fixedHeader-floating"); // Get dataTables fixed header reference
    var m_right = "mr-15"; // Determine what margin left should be: if there are 3 icons, margin right should be 15px (mr-15 class);


    if ($filter_icons_list.find("li").length === 4) m_right = "mr-7"; // If there are 4 icons - margin right should be 7px (mr-7 class)


    // In case filters section is already closed, do nothing

    if (!$filters_sidebar.hasClass("active")) return;


    // Hide collapse arrow and filters body

    $("#collapse-arrow, .tabs").hide();


    // Shrink the margin of the main container to 60 px

    $("#header-div").animate({
        "margin-left": "60px"
    }, 250);


    // If there is the dataTables fixed header, also adjust it`s offset to comply with main container position

    if ($fixed_header.length) {
        var offset = $fixed_header.offset();


        // When filters section is opened, dataTables`s fixed header left offset is 250 px to the right from it`s original position (it`s the width of opened filters section),
        // so, when filters section is closed, it`s width is 60 px and dataTables`s fixed header left offset should be 60 px to the right. To get it, we can just subtract 190
        // from the current left offset (250 - 190 = 60)

        $fixed_header.animate({
            left: offset.left - 190
        }, 250);
    }


    // Add class to filter icons so they display properly while are in vertical position

    $filter_icons_list.addClass("narrow");


    // When filters section is closed, filters icons should not be outlined, so remove class that gives this outline from all icons

    $(".img-container").removeClass("active");


    // Remove margin left from filter icons

    $filter_icons_list.find("li").removeClass(m_right);


    // Finally shrink filters section to 60 px

    $filters_sidebar.removeClass("active").animate({
        width: "60px"
    }, 250);
}


// If on the page we have something above the filters section (for instance Release Notes), filters section will be displayed lower,
// so filters section should not be fixed, because, otherwise, while scrolling, it will preserve it`s position and we will have blank space above it,
// but still it (filters section) should be fixed while scrolling. To fix both of these issues, we can do the following:
// 1. set initial display property of filters to absolute and set it`s top position to 0 (zero). This way Filers will scroll as scrolls the rest of the page content
// 2. while scrolling down, if slider section reaches top of the screen (viewport), change it`s display to fixed. This way it will be fixed for the rest of scrolling.
// 3. while scrolling up, check if needed position has been reached, then change filter positioning to absolute and set it`s top offset to needed one. This way it wil stay and we can scroll further.
// In this case as "needed position" will be used position of the main content (#header-div)
// So, "should_be_fixed" variable checks the 2nd step
// and "should_be_absolute" variable checks the 3rd step

function position_filters() {
    var $filter_sidebar = $("#filter-sidebar"); // Get filters section reference
    var filter_offset = $filter_sidebar.offset(); // Get current filters section offset (position)
    var content_offset = $("#header-div").offset(); // Get current position of main content div


    // Check is filter container should be fixed (2nd in comment above).
    // Subtract scrolling distance to get filters offset according to viewport and to the document

    var should_be_fixed = $filter_sidebar.css("position") === "absolute" && filter_offset.top - $(document).scrollTop() < 0;


    // Check is filter container should be absolute (3rd in comment above).
    // Subtract scrolling distance to get main container offset according to viewport and to the document

    var should_be_absolute = $filter_sidebar.css("position") === "fixed" && content_offset.top - $(document).scrollTop() > 0;


    // Set filters section positioning

    if (should_be_fixed) $filter_sidebar.css({
        top: 0,
        position: "fixed"
    });
    if (should_be_absolute) $filter_sidebar.css({
        top: content_offset.top,
        position: "absolute"
    });
}


// When user scrolls data table and there is fixed header, adjust it`s left position according to table
// Table moves it`s left position depending on filters section width, so should also do the header

function adjust_fixed_header() {
    // Get header reference

    var $fixed_header = $(".fixedHeader-floating");


    // If there is no fixed header at all, return

    if (!$fixed_header.length) return;


    // Get header and table offsets

    var table_offset = $("#calls").offset();
    var header_offset = $fixed_header.offset();


    // If fixed header is visible and is above the table, it should disappear

    if ($fixed_header.is(":visible") && header_offset.top < table_offset.top) {
        $fixed_header.hide();
        return false;
    }


    // Adjust header left offset to correspond table left offset

    $fixed_header.offset({
        left: (table_offset.left),
        top: header_offset.top
    });


    // If fixed header is not displayed and it should be (user scrolled table vertically), display it

    if (!$fixed_header.is(":visible") && header_offset.top >= table_offset.top) {
        $fixed_header.show();
        return false;
    }
}




$(function() {
    // This is needed for chosen plugin. It has a problem with displaying it`s selects within hidden parent: it gives them 0 width.
    // To avoid this problem, I made tabs content visible false, but displayable, so it will not be seen on page loading,
    // but "visible" property doesn`t hide the content, so here I hide the content and make it visible. Hiding the content performs
    // after chosen plugin was initialized, so it work properly

    $(".tabs").hide().css({
        visibility: "visible"
    });


    // If any filter icon was clicked, either open that icon content, or close the filter section if the current icon was clicked

    $(".filter-icons-container").click(function() {

        var $filter_sidebar = $("#filter-sidebar"); // Get filters section reference
        var $filter_icons_list = $("#filter-icons-list"); // Get filters icon list reference
        var $header_div = $("#header-div"); // Get main container reference
        var $clicked_icon = $(this).find(".img-container"); // Get clicked icon


        // If filter section is opened, determine whether tab for clicked icon is already opened or not.
        // If it is opened, than user wanted to close it by clicking on it`s icon one more time, so, close the filter section;
        // It it is not opened, than user wanted to open it, so, open it

        if ($filter_sidebar.hasClass("active")) {
            // If content is hidden, show it, else close filter section

            if ($("#" + $clicked_icon.data("tab")).is(":hidden")) {
                $(".img-container").removeClass("active"); // Remove icon outline

                $(".tabs").hide(); // Hide all tabs

                $("#" + $clicked_icon.data("tab")).show(); // Show tab that corresponds to the clicked icon

                $clicked_icon.addClass("active"); // Add outline to the current selected icon
            } else close_filter_section();


            // It is important to return, because "close_filter_section" function removes "active" class from filters sidebar,
            // and this will make next "if" to fire also, so, just beak it here

            return;
        }


        // If filter section is closed, open it and show content for the current clicked icon

        if (!$filter_sidebar.hasClass("active")) {
            var $fixed_header = $(".fixedHeader-floating"); // Get Fixed header reference
            var m_right = "mr-15"; // Determine what margin left should be: if there are 3 icons, margin right should be 15px (mr-15 class);

            if ($filter_icons_list.find("li").length === 4) m_right = "mr-7"; // If there are 4 icons - margin right should be 7px (mr-7 class)


            // Show collapse arrow

            $("#collapse-arrow").show();


            // Move main container by 250 px to the right

            $header_div.animate({
                "margin-left": "250px"
            }, 250);


            // If there is dataTable`s fixed header, move it to the right to comply with main container position

            if ($fixed_header.length) {
                var offset = $fixed_header.offset();


                // It`s current offset already has 60 px (width of the closed filter section), so, to get 250 px, just add 190px to it`s current offset

                $fixed_header.animate({
                    left: offset.left + 190
                }, 250);
            }


            // Open filters section by changing it`s width to 250 px and open current selected tab after the animation is finished

            $filter_sidebar.addClass("active").animate({
                width: "250px"
            }, 250, function() {
                $("#" + $clicked_icon.data("tab")).show();
            });


            // Set outline to current clicked icon

            $clicked_icon.addClass("active");


            // Remove class "narrow" to display filter icons properly, while they are positioned horizontally
            // and add margin left 15px to all icons except the last one

            $filter_icons_list.removeClass("narrow").find("li").addClass(m_right);
        }
    });


    // If user clicked on collapse arrow, close filter section

    $("#collapse-arrow").click(close_filter_section);


    // If user scrolls data table horizontally, adjust dataTables fixed header position
    // Get initial left offset to compare with current one to determine if user scrolled to the left

    var prevLeft = $("#header-div").scrollLeft();

    $("#header-div").scroll(function() {
        var currentLeft = $(this).scrollLeft(); // Get current left offset for comparing


        // Checks if user scrolled to the left

        if (prevLeft !== currentLeft) {
            prevLeft = currentLeft; // Update initial left offset

            adjust_fixed_header();
        }
    });


    // If user scrolls data table vertically, adjust dataTables fixed header position and position the filters

    $(window).scroll(function() {
        adjust_fixed_header();
        position_filters();
    });
});