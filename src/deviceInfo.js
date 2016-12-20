tabris.ui.set("toolbarVisible", false);
var page = new tabris.Page({
  topLevel: true
}).open();
//--------------------------------------------------------------------------------------------------------------------------- 

var title = new tabris.TextView({
  centerX: 0, top: 15,
  text: "-Device information-",
  font: "bold 30px"
}).appendTo(page);

var scroll = new tabris.ScrollView({
  top: [title, 5]
}).appendTo(page);

var options = { frequency: 1 };

var text = new tabris.TextView({
  top: 0, centerX: 0,
  alignment: "center",
  font: "16px",
  markupEnabled: true
}).appendTo(scroll);

var text2 = new tabris.TextView({
  top: [text, 10], centerX: 0,
  alignment: "center",
  font: "16px",
  markupEnabled: true
}).appendTo(scroll);


["platform", "version", "model", "language", "orientation", "scaleFactor", "screenHeight", "screenWidth"].forEach(function(property) {
  new tabris.TextView({
    id: property,
    layoutData: {left: 10, right: 10, top: "prev() 10"},
    text: property + ": " + tabris.device.get(property),
    alignment: "center",
    font: "16px"
  }).appendTo(scroll);
});

tabris.device.on("change:orientation", function(target, value) {
  page.find("#orientation").set("text", "orientation: " + value);
});


function onSuccess(acceleration) {
    text.set("text", 'Acceleration X ' + '<br\>' + acceleration.x + '\n' + '<br\>' + ' ' + '<br\>' +
          'Acceleration Y ' + '<br\>' + acceleration.y + '\n' + '<br\>' + ' ' + '<br\>' +
          'Acceleration Z ' + '<br\>' + acceleration.z + '\n' + '<br\>' + ' ' + '<br\>' +
          'Timestamp '      + '<br\>' + acceleration.timestamp + '\n');
  
      var networkState = navigator.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
 
    text2.set("text", 'Connection type: ' + states[networkState]);
}

function onError() {
    text.set("text", 'onError!');
}

var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
