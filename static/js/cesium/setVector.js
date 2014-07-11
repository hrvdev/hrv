;(function(){
  cesium.setVector = {
    set:function(url){
      imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : url,
        maximumLevel:'20'
      }),1);
    },
    remove:function(){
      var vector_layer = centralBody.imageryLayers.get(1);
      imageryLayers.remove(vector_layer);
    }
  }
})();
