/*(function(){
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
  $(".map-tool-location").click(function(){
    cesium.north();
    cesium.setTerrian.set("http://192.168.1.252:8100/terrain/");
    cesium.setVector.set("http://192.168.1.252:8102/map/google-vector");
  })
  $("#miniMapCanvas").click(function(){
    var miniMapGoogleFlag = $("#miniMapSource").html() =="Google"? true:false;
    var args={};
    if(!miniMapGoogleFlag){
      args = {
        layers:["http://192.168.1.252:8102/map/bing/"]
      }
      $("#miniMapSource").html("Google");
    }
    else{
      args = {
        layers:["http://192.168.1.252:8102/map/google/"]
      }
      $("#miniMapSource").html("Bing");
    } 
    cesium.setImagery(args);
  })
  $(".map-tool-settings").click(function(){
    cesium.label.clear();
    cesium.polyline.clear();
    cesium.billboard.clear();
    cesium.setTerrian.remove();
    cesium.setVector.remove();
  });
  cesium.dbclickTofly();
})()*/
