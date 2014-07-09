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
