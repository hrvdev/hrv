(function(){
  var pos={
    start:{},
    end:{}
  };
  var ellipsoid = Cesium.Ellipsoid.WGS84;
  var scene = cesiumViewer.scene;
  var firstPosflag = true;
  $(".map-tool-measure").click(function(e){
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement){
      if(movement.position != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
        if(cartesian) {
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          if(firstPosflag){
            pos.start= cartographic;
            firstPosflag = false;
          }
          else{
            pos.end = cartographic;
            var s = cesium.measureDistence(pos);
            var posi = cesium.getPosition()
            console.log(s)
            firstPosflag = true;
            handler.destroy();
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  })
})()
