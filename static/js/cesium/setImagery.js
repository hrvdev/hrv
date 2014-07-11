;(function(){
  cesium.setImagery = function(options){
    imageryLayers.removeAll();
    for (var i in options.layers) {
        imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : options.layers[i],
        maximumLevel:'20',
      }));
    }
  }
})();
