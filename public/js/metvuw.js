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
        this.images = new Object();
        $R(1,30).each(
            function(value) {
                var i = document.createElement('img');
                i.src = Maps.url_for(value);
                Maps.images[value] = i;
            }
        );
        this.slider = new Control.Slider('handle', 'slider', {
            range: $R(1, 30),
            values: $R(1, 30),
            sliderValue: 1,
            axis: 'vertical',
            onSlide: this.change_to
        });
        this.change_to(1);
    },

    offset_for: function(value) {
        var offset = (value * 6).toString();
        if (offset.length < 2) {
            offset = "0" + offset;
        }
        return offset;
    },

    url_for: function(value) {
        return "http://www.metvuw.com/forecast/" + this.timestamp + "/rain-" + this.region + "-" + this.timestamp + "-" + this.offset_for(value) + ".gif";
    },

    change_to: function(value) {
        $('label').innerHTML = "Offset from " + Maps.timestamp + " is " + Maps.offset_for(value);
        $('map').src = Maps.images[value].src;
    }
};


var timestamp = query_vars["timestamp"];
var region = query_vars["region"];
if (timestamp !== null || timestamp !== "") {
    document.observe('dom:loaded', function() {
        Maps.init(timestamp, region);
    });
}
else {
    new Ajax.Request('timestamps.json', {
      method:'get',
      onSuccess: function(transport){
         var text = transport.responseText;
         var json = text.evalJSON();
         timestamp = json[region];
         Maps.init(timestamp, region);
       }
    });
}
