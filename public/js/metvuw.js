var query_vars = new Object();
window.location.search.replace(
    new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
    function( $0, $1, $2, $3 ){
        query_vars[$1] = $3;
    }
);

var Maps = {
    init: function(timestamp, region) {
        Maps.timestamp = timestamp;
        Maps.region = region;
        var load = function() {
            Maps.images = new Object();
            $R(1,30).each(
                function(value) {
                    var i = document.createElement('img');
                    i.src = Maps.url_for(value);
                    Maps.images[value] = i;
                }
            );
            Maps.slider = new Control.Slider('handle', 'slider', {
                range: $R(1, 30),
                values: $R(1, 30),
                sliderValue: 1,
                axis: 'vertical',
                onSlide: Maps.change_to
            });
            Maps.change_to(1);
        };
        Event.observe(window, 'load', load);
    },

    offset_for: function(value) {
        var offset = (value * 6).toString();
        if (offset.length < 2) {
            offset = "0" + offset;
        }
        return offset;
    },

    url_for: function(value) {
        return "http://www.metvuw.com/forecast/" + Maps.timestamp + "/rain-" + Maps.region + "-" + Maps.timestamp + "-" + Maps.offset_for(value) + ".gif";
    },

    change_to: function(value) {
        $('label').innerHTML = "Offset from " + Maps.timestamp + " is " + Maps.offset_for(value);
        $('map').src = Maps.images[value].src;
    }
};

Maps.init(query_vars["timestamp"], query_vars["region"]);
