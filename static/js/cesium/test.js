(function(){
  var pos={
    start:{},
    end:{}
  };
  var firstPosflag = true;
  $(".map-tool-measure").click(function(e){
    cesium.startMeasure();
  })
  var handler_rbtn = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler_rbtn.setInputAction(function(movement){
        if(movement.position != null) {
          var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
          if(cartesian) {
            $("#addLabel").offset({left:movement.position.x,top:movement.position.y});
            $("#addLabel").show();
          }
        }
      },Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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
   })
})()
