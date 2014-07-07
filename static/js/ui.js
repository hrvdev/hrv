;(function(win, doc){

var MainUI = function(cesium){
  this.cesium = cesium;
};

MainUI.prototype = {
  run: function(){
    var that = this;
    console.log('ui run');

    setTimeout(function(){
      that.cesium.someAPI();
    }, 1000);
  }
};


win.CesiumUI = MainUI;

})(window, document);
