;(function(){
  cesium.setTerrian = {
    set:function(url){
      centralBody.terrainProvider = new Cesium.CesiumTerrainProvider({
        url : url
      });
    },
    remove:function(){
      centralBody.terrainProvider = new Cesium.EllipsoidTerrainProvider();
    }
  }
})();
