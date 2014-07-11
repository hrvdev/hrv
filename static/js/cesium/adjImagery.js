;(function(){
  cesium.adjImagery = {
    set: function(ceisumViewer, options){
      if (imageryLayers.length > 0) {
            var layer = imageryLayers.get(0);
            layer.brightness = options.brightness;
            layer.contrast = options.contrast;
            layer.hue = options.hue;
            layer.saturation = options.saturation;
            layer.gamma = options.gamma;
      }
    },
    get:function(ceisumViewer){
      var options = [];
      if (imageryLayers.length > 0) {
        var layer = imageryLayers.get(0);
        options.push(layer.brightness);
        options.push(layer.contrast);
        options.push(layer.hue); 
        options.push(layer.saturation);
        options.push(layer.gamma);
      }
      return options;
    }
  }
})();
