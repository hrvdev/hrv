;(function(win, doc){
var cesium = {};
var ellipsoid = Cesium.Ellipsoid.WGS84;
var scene = cesiumViewer.scene;
var primitives = scene.primitives;
var polylines = new Cesium.PolylineCollection();
var labels = new Cesium.LabelCollection();
var billboards = new Cesium.BillboardCollection();
primitives.add(polylines);
primitives.add(labels);
primitives.add(billboards);

;(function(){
  var temp_billboard;
  var save_billboard = [];
  cesium.billboard = {
    add:function(pos){
      var image = new Image();
      image.src = '../imgs/location.png';
      image.onload = function() {
        var textureAtlas = scene.context.createTextureAtlas({
          image : image
        });
        billboards.textureAtlas = textureAtlas;
        var billboard = billboards.add({
          position : ellipsoid.cartographicToCartesian(pos),
          imageIndex : 0
        });
        
      }
    },
    save:function(labelObj){
      var that = this;
      var save_temp = that.add(labelObj);
      save_billboard.push(save_temp);
    },
    clear:function(){
      for(var i in save_billboard){
        save_billboard.remove(save_billboard[i]);
      }
    },
    stop:function(){
      var that = this;
      var temp_last = save_billboard.pop();
      billboards.remove(temp_last);
    }
  }
})();

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

;(function(){
/** 请将屏幕坐标转换成cartesian坐标
**labelObj = {
**position:cartesian,
**value:"text1"
}*/
  var temp_label;
  var save_label = [];
  cesium.label = {
    add:function(labelObj){
      var label = labels.add({
        show : true,
        position : labelObj.position,
        text : labelObj.value,
        font : '20px 楷体',
        fillColor : 'gray',
        outlineColor : 'black',
        outlineWidth  : 0.1,
        style : Cesium.LabelStyle.FILL_AND_OUTLINE ,
        pixelOffset : Cesium.Cartesian2.ZERO,
        eyeOffset : Cesium.Cartesian3.ZERO,
        horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 0.0, 1.5e7, 0.0),
        scale : 1
      });
      
      return label;
    },
    save:function(labelObj){
      var that = this;
      var save_temp = that.add(labelObj);
      save_label.push(save_temp);
    },
    clear:function(){
      for(var i in save_label){
        labels.remove(save_label[i]);
      }
    },
    stop:function(){
      var that = this;
      var temp_last = save_label.pop();
      labels.remove(temp_last);
    }
  }
})();

/**请使用cartographic坐标
*var pos={
*start:cartographic,
*end:cartographic
*};
*/
;(function(){
  function getRad(d){ 
    return d*Math.PI/180.0; 
  } 
  cesium.calcDistence = function(pos){
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
    // s = parseFloat(s.toFixed(4));
    return s; 
  };
})();

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

  function someFunction(){

  }

  var someVar;


  cesium.someAPI = function(){
    console.log('someAPI');
  };

})();

;(function(){
  var points=[];
  var firstPoint_flag = true;
  var current_point,last_Point;
  var sum = 0;
  cesium.startMeasure = function(){
    var mov_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var left_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var db_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    mov_handler.setInputAction(function(movement){
      if(movement.endPosition != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if(cartesian) {
          if(firstPoint_flag){
            return ;
          }
          else{
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            current_point = cartographic;
            cesium.polyline.update({start:last_Point,end:current_point});
            cesium.calcDistence({start:last_Point,end:current_point});
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    left_handler.setInputAction(function(movement){
      if(movement.position != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
          if(cartesian) {
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            if(firstPoint_flag){
              last_Point = cartographic;
              firstPoint_flag = false; 
            }
            else{
              sum += cesium.calcDistence({start:last_Point,end:cartographic});
              var s = sum;
              cesium.polyline.save({start:last_Point,end:cartographic});
              last_Point = cartographic;
              cesium.label.save({position:cartesian,value:s.toFixed(4)});
            }
            cesium.billboard.save(cartographic);
          }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    db_handler.setInputAction(function(){
      firstPoint_flag = true;
      sum = 0;
      cesium.polyline.stop();
      cesium.label.stop();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  };
})();

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


  win.selfCesium = cesium;
})(window, document);
