;(function(){
  cesium.setVector = {
    set:function(url){
      imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : "http://192.168.1.252:8102/map/google-vector",
        maximumLevel:'20'
      }),1);
    },
    remove:function(){
      var vector_layer = centralBody.imageryLayers.get(1);
      imageryLayers.remove(vector_layer);
    }
  }
})();
