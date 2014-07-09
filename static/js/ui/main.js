var MainUI = function(cesium){
  this.cesium = cesium;

  this.miniMap = new MiniMap();
  this.tools = new Tools(this.miniMap);
  this.locationShower = new LocationShower();
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
          that.locationShower.show({
            lat: 10.34,
            lng: 202.123,
            lat2: '12 234\' 23\'\'',
            lng2: '202 234\' 23\'\''
          });
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
};
