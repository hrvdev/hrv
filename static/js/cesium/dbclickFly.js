;(function(){
  cesium.dbclickTofly_enable = true;
  cesium.dbclickTofly = function(){

    var fly_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var ModelID = fly_handler.setInputAction(
    function (movement) {
      if(cesium.dbclickTofly_enable){
        var cartesian3 = scene.camera.pickEllipsoid(movement.position, ellipsoid);
        var cameraZcom = scene.camera.position;
        if(cartesian3) {
          var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
          var cartographic2 = ellipsoid.cartesianToCartographic(cameraZcom);
          var posHeight = cartographic2.height/8;
          if(posHeight<=5) {
            posHeight = 5;
          }
          cartographic.height=posHeight;
          goDestination = ellipsoid.cartographicToCartesian(cartographic);
        }
        var flight = Cesium.CameraFlightPath.createAnimation(scene, {
          destination : goDestination,
          duration: 1000
        });
        scene.animations.add(flight);  
      }
    },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
})();
