var MainUI = function(cesium){
  this.cesium = cesium;

  this.miniMap = new MiniMap();
  this.tools = new Tools(this.miniMap);
  this.locationShower = new LocationShower();

  selfCesium.dbclickTofly();
};

MainUI.prototype = {
  run: function(){
    var that = this;

    // setTimeout(function(){
    //   that.miniMap.goToLarge();
    //   that.tools.showLocationImages();
    // }, 1000);
    
    that.initShowPosition();
  },
  initShowPosition: function(){
    var that = this;
    
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var scene = cesiumViewer.cesiumWidget.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement){
      if(movement.position != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
        if(cartesian) {
          selfCanvas.showCircleAt(movement.position);
          var pos = selfCesium.getPosition(win.cesiumViewer, movement.position);

          that.locationShower.show({
            lat: pos.ddLat,
            lng: pos.ddLong,
            lat2: pos.dmsLat,
            lng2: pos.dmsLong
          });
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
};
