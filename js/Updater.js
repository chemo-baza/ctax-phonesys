var Updater = {
    counter: 0,
    queue: [],
    settings: {
        ajax_url: "ajax/", // URL of the AJAX script to be called
        ajax_vars: // Variables to be sent to AJAX script
        {
            act: "agent/update"
        },
        interval: 1000
    }
};


/*
    Init the updater (optional) with some settings
*/

Updater.init = function(settings) {
    $.extend(this.settings, settings);
};

/*
    Add a listener

    Updater.add({
        what: "time",
        params: { test1: '14', test2: 'pam pam' }, // optional, usually not needed
        done: function(r){ console.log("Current time: "+r); },
        interval: 2 // seconds, optional, default=0 => no interval, just one time thing
    });
*/
Updater.add = function(o) {
    if (typeof o.what == "undefined") return;
    if (typeof o.done == "undefined" || !(o.done && o.done.constructor && o.done.call && o.done.apply)) o.done = function() {};
    this.queue.push($.extend({}, o, {
        id: this.counter++,
        last_updater: 0
    }));
    if (this.counter == 1) this.ticker(); // initialize the updater mechanism for the first time
};


/*
    Remove a listener

    Updater.stop("time");
*/
Updater.stop = function(what) {
    for (var i in this.queue)
        if (this.queue[i].what == what)
            this.queue.splice(i, 1);
};


Updater.update = function(what) {
    this.refresh(what);
}
Updater.refresh = function(what) {
    for (var i in this.queue)
        if (this.queue[i].what == what) this.queue[i].last_updated = 0;
};


// =====================================================================================

// Don't touch this!


Updater.delete = function(what) {
    this.stop(what);
};
Updater.remove = function(what) {
    this.stop(what);
};


Updater.ticker = function() {
    var now = new Date().getTime();
    var request = [];
    for (var i in Updater.queue) {
        var d = Updater.queue[i];
        if (d.interval && (now - d.last_updated) / 1000 < d.interval) continue;
        else d.last_updated = now;

        var w = {
            what: d.what,
            id: d.id
        };
        if (d.params) w.params = d.params;
        request.push(w);
    }


    if (request.length)
        $.ajax({
            url: Updater.settings.ajax_url,
            type: "POST",
            dataType: "JSON",
            data: $.extend({}, Updater.settings.ajax_vars, {
                r: request
            })
        })
        .done(function(result) {
            for (var i in result)
                for (var j in Updater.queue) {
                    var d = Updater.queue[j];
                    if (d.id == result[i].id) {
                        d.done(result[i].r);
                        if (!d.interval) Updater.queue.splice(j, 1);
                        break;
                    }
                }
        })
        .then(function() {
            setTimeout(Updater.ticker, Updater.settings.interval);
        });
    else setTimeout(Updater.ticker, Updater.settings.interval); // or, check again in a second
};