;(function(){
  var points=[];
  var firstPoint_flag = true;
  var current_point,last_Point;
  var sum = 0;
  cesium.startMeasure = function(){
    var mov_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var left_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var db_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    mov_handler.setInputAction(function(movement){
      if(movement.endPosition != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if(cartesian) {
          if(firstPoint_flag){
            return ;
          }
          else{
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            current_point = cartographic;
            cesium.polyline.update({start:last_Point,end:current_point});
            cesium.calcDistence({start:last_Point,end:current_point});
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    left_handler.setInputAction(function(movement){
      if(movement.position != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
          if(cartesian) {
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            if(firstPoint_flag){
              last_Point = cartographic;
              firstPoint_flag = false; 
            }
            else{
              sum += cesium.calcDistence({start:last_Point,end:cartographic});
              var s = sum;
              cesium.polyline.save({start:last_Point,end:cartographic});
              last_Point = cartographic;
              cesium.label.save({position:cartesian,value:s.toFixed(4)});
            }
            cesium.billboard.save(cartographic);
          }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    db_handler.setInputAction(function(){
      firstPoint_flag = true;
      sum = 0;
      cesium.polyline.stop();
      cesium.label.stop();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  };
})();
