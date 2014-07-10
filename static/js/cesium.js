;(function(win, doc){

var cesium = {};

;(function(){

  cesium.convert = {
    ddTodms: function(dd){
      // truncate dd to get degrees
      var deg = parseInt(dd);
      // get fractional part 
      var frac = Math.abs(deg -dd); 
      // multiply fraction by 60 and truncate
      var min_float = (frac * 60);
      var min = parseInt(min_float); 
      var sec = (Math.abs(min_float - min)*60).toFixed(4);
      var dmsString = deg + "°" + min + "' " + sec + "\"";
      return dmsString;
    },
    dmsTodd:function(dms){
      var ary = dms.split('.');
      if(ary && ary.length === 2){
        var d = window.parseInt(ary[0], 10);
        var ms = ary[1];
        var m, s;
        if(ms.length <= 2){
          m = window.parseInt(ms);
          s = 0;
        } else {
          m = window.parseInt(ms.substring(0,2));
          var ss = ms.substring(2);
          if(ss.length > 2){
            ss = ss.substring(0,2) + '.' + ss.substring(2);
          }
          s = window.parseFloat(ss);
        }
        var zf = 1;
        var absd = Math.abs(d);
        if(dms.indexOf('-') == 0){
          zf = -1;
        }
        return (absd + m / 60 + s / 3600).toFixed(8) * zf;
      } else if(ary.length === 1) {
        return window.parseInt(ary[0]).toFixed(8);
      } else {
        return Number.NaN;
      }
    }
  };
})();

;(function(){

  function currentPosition(scene,mousePosition){
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var pos = {};
    var cartesian = scene.camera.pickEllipsoid(mousePosition, ellipsoid);
    if(cartesian) {
      var cartographic = ellipsoid.cartesianToCartographic(cartesian);
      pos.ddLong = Cesium.Math.toDegrees(cartographic.longitude);
      pos.ddLat = Cesium.Math.toDegrees(cartographic.latitude);
      pos.ddLong = pos.ddLong.toFixed(6);
      pos.ddLat = pos.ddLat.toFixed(6);
      pos.dmsLong = cesium.convert.ddTodms(pos.ddLong);
      pos.dmsLat = cesium.convert.ddTodms(pos.ddLat);
    }
    return pos;
  }
  cesium.getPosition = function(cesiumViewer,mousePosition){
    var scene = cesiumViewer.scene;
    var position = currentPosition(scene,mousePosition);
    return position;
  };
})();

;(function(){
  function getRad(d){ 
    return d*Math.PI/180.0; 
  } 
  cesium.measureDistence = function(pos){
    var positions={
      start:{
        long:Cesium.Math.toDegrees(pos.start.longitude),
        lat: Cesium.Math.toDegrees(pos.start.latitude)
      },
      end:{
          long:Cesium.Math.toDegrees(pos.end.longitude),
          lat: Cesium.Math.toDegrees(pos.end.latitude)
      }
    }
    //单位KM 
    var EARTH_RADIUS = 6378137.0; 
    var PI = Math.PI; 
    var radLat1 = getRad(positions.start.lat); 
    var radLat2 = getRad(positions.end.lat); 
    var a = radLat1 - radLat2; 
    var b = getRad(positions.start.long) - getRad(positions.end.long); 
    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2))); 
    s = s*EARTH_RADIUS; 
    s = Math.round(s*10000)/10000.0/1000; 
    return s; 
  };
})();

;(function(){

  function someFunction(){

  }

  var someVar;


  cesium.someAPI = function(){
    console.log('someAPI');
  };

})();

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



  win.selfCesium = cesium;

})(window, document);
