;(function(){
  var points=[];
  var firstPoint_flag = true;
  var current_point,last_Point;
  var sum = 0;


  // 将事件处理放在外面, 因为这个方法可能会被连续调用两次
  var mov_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  var left_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  var db_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);


  cesium.startMeasure = function(callback){
    if(mov_handler && !mov_handler.isDestroyed()){
      mov_handler.destroy();
    }
    if(left_handler && !left_handler.isDestroyed()){
      left_handler.destroy();
    }
    if(db_handler && !db_handler.isDestroyed()){
      db_handler.destroy();
    }
    mov_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    left_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    db_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    

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

      mov_handler.destroy();
      left_handler.destroy();
      db_handler.destroy();

      if(callback){
        callback();
      }

      cesium.polyline.stop();
      cesium.label.stop();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  };
})();
