;(function(){

  function currentPosition(scene){
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var pos = {};
      var cartesian = scene.camera.pickEllipsoid(mousePosition, ellipsoid);
      if(cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        pos.ddLong = Cesium.Math.toDegrees(cartographic.longitude);
        pos.ddLat = Cesium.Math.toDegrees(cartographic.latitude);
        pos.ddLong = pos.ddLong.toFixed(6);
        pos.ddLat = pos.ddLat.toFixed(6);
        pos.dmsLong = cesium.convert.ddTodms(pos.ddLong);
        pos.dmsLat = cesium.convert.ddTodms(pos.ddLat);
      }
    return pos;
  }

  cesium.getPosition = function(cesiumViewer,mousePosition){
    var scene = cesiumViewer.scene;
    var position = {};
    position = currentPosition(scene,mousePosition);
    return position;
  };
})();
