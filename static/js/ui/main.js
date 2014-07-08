var MainUI = function(cesium){
  this.cesium = cesium;

  this.miniMap = new MiniMap();
  this.tools = new Tools(this.miniMap);
};

MainUI.prototype = {
  run: function(){
    var that = this;

    // setTimeout(function(){
    //   that.miniMap.goToLarge();
    //   that.tools.showLocationImages();
    // }, 1000);
    
  }
};
