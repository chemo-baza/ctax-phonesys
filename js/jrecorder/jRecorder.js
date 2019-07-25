/*
 * jRecorder Plugin for jQuery JavaScript Library (Alpha)
 * http://www.sajithmr.me/jrecorder
 *
 * Copyright (c) 2011 - 2013 Sajithmr.ME
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Sajith Amma
 * Modification by: Gabriel Cebrian / Harrison Gordon
 * Version: 1.1
 * Date: 18 March 2013
 */

(function($) {
    var methods = {
        play: function(options) {
            alert(options);
        },
        pause: function() {}
    };

    var jRecorderSettings = {};

    $.jRecorder = function(options, element) {

        // Allow instantiation without initializing for simple inheritance
        if (typeof(options) == "string") {
            if (methods[options]) {
                return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
            }
            return false;
        }

        // If the element to be appended is not defined, append to body
        if (element == undefined) {
            element = $("body");
        }

        // Default settings
        var settings = {
            'rec_width': '230',
            'rec_height': '220',
            'rec_top': '0px',
            'rec_left': '0px',
            'recorderlayout_id': 'flashrecarea',
            'recorder_id': 'audiorecorder',
            'recorder_name': 'audiorecorder',
            'wmode': 'window',
            'bgcolor': '#FAFAFA',
            'swf_path': 'jRecorder.swf',
            'host': 'acceptfile.php?filename=hello.wav',
            'callback_started_recording': function() {},
            'callback_finished_recording': function() {},
            'callback_stopped_recording': function() {},
            'callback_error_recording': function() {},
            'callback_activityTime': function(time) {},
            'callback_activityLevel': function(level) {},
            'log': function(info) {
                console.log(info)
            },
            'debug': false
        };

        // If option array is passed, merge the values
        if (options) {
            $.extend(settings, options);
        }

        jRecorderSettings = settings;

        if (!$.support.leadingWhitespace) {

            // var objStr = '<object  name="'+ settings['recorder_name'] +'" id="' + settings['recorder_id'] + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+ settings['rec_width'] +'" height="'+ settings['rec_height']+'"></object>';
            //
            // var paramStr = [
            //     '<param name="movie" value="'+ settings['swf_path'] + '?host=' + settings['host'] +  '" />',
            //
            //     '<param name="allowScriptAccess" value="always" />',
            //     '<param name="bgcolor" value="' + settings['bgcolor'] + '" />',
            //     '<param name="wmode" value="' +  settings['wmode'] + '" />'
            // ];
            //
            // //htmlObj = document.createElement(objStr);
            // htmlObj = document.createElement('object');
            //
            // htmlObj.setAttribute("name", settings['recorder_name'] );
            // htmlObj.setAttribute("id", settings['recorder_id'] );
            // htmlObj.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" );
            // htmlObj.setAttribute("width", settings['rec_width'] );
            // htmlObj.setAttribute("height", settings['rec_height'] );
            //
            //
            // for(var i=0; i < paramStr.length; i++)
            // {
            //     htmlObj.appendChild(document.createElement(paramStr[i]));
            // }
        }
        // else
        // {
        var createParam = function(el, n, v) {
            var p = document.createElement("param");
            p.setAttribute("name", n);
            p.setAttribute("value", v);
            el.appendChild(p);
        };

        htmlObj = document.createElement("object");
        htmlObj.setAttribute("id", settings['recorder_id']);
        htmlObj.setAttribute("name", settings['recorder_name']);
        htmlObj.setAttribute("data", settings['swf_path'] + '?host=' + settings['host']);
        htmlObj.setAttribute("type", "application/x-shockwave-flash");
        htmlObj.setAttribute("width", settings['rec_width']); // Non-zero
        htmlObj.setAttribute("height", settings['rec_height']); // Non-zero

        createParam(htmlObj, "allowscriptaccess", "always");
        createParam(htmlObj, "bgcolor", settings['bgcolor']);
        createParam(htmlObj, "wmode", settings['wmode']);
        // }

        var divObj = document.createElement("div");

        divObj.setAttribute("id", settings['recorderlayout_id']);
        divObj.setAttribute("style", "text-align: center; top:" + settings['rec_top'] + ";left:" + settings['rec_left'] + ";z-index:-1");

        divObj.appendChild(htmlObj);

        element.append(divObj);
    };

    // Function call to start a recording
    $.jRecorder.record = function(max_time) {
        // Change z-index to make it top
        $('#' + jRecorderSettings['recorderlayout_id']).css('z-index', 1000);
        getFlashMovie(jRecorderSettings['recorder_name']).jStartRecording(max_time);
    }

    // Function call to stop recording
    $.jRecorder.stop = function() {
        getFlashMovie(jRecorderSettings['recorder_name']).jStopRecording();
    }

    $.jRecorder.playPreview = function() {
        getFlashMovie(jRecorderSettings['recorder_name']).jStartPreview();
    }

    $.jRecorder.stopPreview = function() {
        getFlashMovie(jRecorderSettings['recorder_name']).jStopPreview();
    }

    $.jRecorder.addParameter = function(key, val) {
        getFlashMovie(jRecorderSettings['recorder_name']).jAddParameter(key, val);
    }

    $.jRecorder.removeParameter = function(key) {
        getFlashMovie(jRecorderSettings['recorder_name']).jRemoveParameter(key);
    }

    //function call to send wav data to server url from the init configuration
    $.jRecorder.sendData = function() {
        getFlashMovie(jRecorderSettings['recorder_name']).jSendFileToServer();
    }

    $.jRecorder.callback_started_recording = function() {
        jRecorderSettings['callback_started_recording']();
    }


    $.jRecorder.callback_finished_recording = function() {
        jRecorderSettings['callback_finished_recording']();
    }

    $.jRecorder.callback_error_recording = function() {
        jRecorderSettings['callback_error_recording']();
    }

    $.jRecorder.callback_stopped_recording = function() {
        jRecorderSettings['callback_stopped_recording']();
    }


    $.jRecorder.callback_finished_sending = function(data) {
        jRecorderSettings['callback_finished_sending'](data);
    }

    $.jRecorder.callback_activityLevel = function(level) {
        jRecorderSettings['callback_activityLevel'](level);
    }

    $.jRecorder.callback_activityTime = function(time) {
        // Put back flash while recording
        $('#' + jRecorderSettings['recorderlayout_id']).css('z-index', -1);

        jRecorderSettings['callback_activityTime'](time);
    }

    $.jRecorder.callback_preview_complete = function() {
        jRecorderSettings['callback_preview_complete']();
    }

    $.jRecorder.log = function(log) {
        if (jRecorderSettings['debug']) {
            jRecorderSettings['log'](log);
        }
    }


    // Function to return flash object from name
    function getFlashMovie(movieName) {
        var isIE = navigator.appName.indexOf("Microsoft") != -1;
        return (isIE) ? window[movieName] : document[movieName];
    }
})(jQuery);