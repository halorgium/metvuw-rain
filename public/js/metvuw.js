var query_vars = new Object();
window.location.search.replace(
    new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
    function( $0, $1, $2, $3 ){
        query_vars[$1] = $3;
    }
);

var Maps = {
    init: function(timestamp, region) {
        this.timestamp = timestamp;
        this.region = region;
        $('#timestamp').text(timestamp);
        $('#slider').slider({
            min: -180,
            max: -6,
            value: -6,
            step: 6,
            orientation: 'vertical',
            slide: this.change_to
        });
        var slider = $('#slider').slider("option");
        for (var offset = slider.min; offset <= slider.max; offset += slider.step) {
            $("<img>").attr("src", Maps.url_for(-offset));
        }
        this.change_to({}, slider);
    },

    url_for: function(offset) {
        return $.sprintf("http://www.metvuw.com/forecast/%s/rain-%s-%s-%03d.gif", this.timestamp, this.region, this.timestamp, offset);
    },

    change_to: function(event, ui) {
        $('#offset').text(-ui.value);
        $('#map').attr("src", Maps.url_for(-ui.value));
    }
};

$(function() {
    var timestamp = query_vars["timestamp"];
    var region = query_vars["region"];
    if (timestamp === undefined || timestamp === "") {
        var date = new Date(new Date - 6 * 60 * 60 * 1000);
        var hour = Math.floor(date.getUTCHours() / 6) * 6;
        timestamp = $.sprintf("%04d%02d%02d%02d", date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), hour);
    }
    Maps.init(timestamp, region);
});
