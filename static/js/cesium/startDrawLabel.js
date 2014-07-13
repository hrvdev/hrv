;(function(){
  // 将事件处理放在外面, 因为这个方法可能会被连续调用两次
  var handler_rbtn = new Cesium.ScreenSpaceEventHandler(scene.canvas);


  cesium.startAddLabel = function(callback){
    if(handler_rbtn && !handler_rbtn.isDestroyed()){
      handler_rbtn.destroy();
    }

    handler_rbtn = new Cesium.ScreenSpaceEventHandler(scene.canvas);

    handler_rbtn.setInputAction(function(movement){
        if(movement.position != null) {
          var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
          if(cartesian) {
            $("#addLabel").offset({left:movement.position.x,top:movement.position.y});
            $("#addLabel").show();
          }
        }
      },Cesium.ScreenSpaceEventType.LEFT_CLICK);

    $("#labelInput").change(function(){
      var text = $("#labelInput").val();
      var left = $("#addLabel").offset().left;
      var top = $("#addLabel").offset().top;
      var cartesian = scene.camera.pickEllipsoid({x:left,y:top}, ellipsoid);
      var labelObj ={
        position:cartesian,
        value:text
      }
      cesium.label.save(labelObj);
      $("#labelInput").val("");
      $("#addLabel").hide();

      if(handler_rbtn && !handler_rbtn.isDestroyed()){
        handler_rbtn.destroy();
      }

      if(callback){
        callback();
      }
    });

  };
})();
