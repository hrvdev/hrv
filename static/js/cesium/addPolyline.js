/**
*请使用cartographic坐标
* var pos={
* start:cartographic,
* end:cartographic
*/
;(function(){
  var temp = null;
  var save_polyline = [];
  cesium.polyline = {
    add: function(pos){
      var longIndex = Math.abs((pos.end.longitude-pos.start.longitude)/100);
      var latIndex =  Math.abs((pos.end.latitude-pos.start.latitude)/100);
      var long_offset = pos.end.longitude > pos.start.longitude? 1:-1;
      var lat_offset = pos.end.latitude > pos.start.latitude? 1:-1;
      var points = [];
      for (var i = 0; i <= 100; i++) {
        var tempPoint = new Cesium.Cartographic();
        tempPoint.longitude = pos.start.longitude + longIndex*i*long_offset;
        tempPoint.latitude = pos.start.latitude + latIndex*i*lat_offset;
        points.push(tempPoint);
      }
      material = Cesium.Material.fromType(Cesium.Material.PolylineOutlineType, {
        width: 2.0,
        outlineWidth: 2.0,
        color: new Cesium.Color(1.0, 0, 0.0, 1.0),
        outlineColor: new Cesium.Color(1.0, 1, 1.0, 1.0)
      });
      var polyline = polylines.add({
        positions : ellipsoid.cartographicArrayToCartesianArray(points),
        material : material,
         width : 1.0
      }); 
      return polyline
    },
    update: function(pos){
      var that = this;
      if(temp){
        polylines.remove(temp);
      }
      temp = that.add(pos);
    },
    save:function(pos){
      var that = this;
      var save_temp = that.add(pos);
      save_polyline.push(save_temp);
    },
    stop:function(){
      var that = this;
      polylines.remove(temp);
    },
    clear:function(){
      for(var i in save_polyline){
        polylines.remove(save_polyline[i]);
      }
    }
  }
})();
