;(function(win, doc){
var cesium = {};
var ellipsoid = Cesium.Ellipsoid.WGS84;
var scene = cesiumViewer.scene;
var primitives = scene.primitives;
var polylines = new Cesium.PolylineCollection();
var labels = new Cesium.LabelCollection();
var billboards = new Cesium.BillboardCollection();
var centralBody = primitives.centralBody;
var imageryLayers = centralBody.imageryLayers;
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

        save_billboard.length = 0;
        billboards.removeAll();
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
        outlineColor: new Cesium.Color(1.0, 0, 0.0, 1.0)
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
      save_polyline.length = 0;
      polylines.removeAll();
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
        font : '16px 楷体',
        fillColor : 'white',
        outlineColor : 'white',
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
      save_label.length = 0;
      labels.removeAll();
    },
    stop:function(){
      var that = this;
      var temp_last = save_label.pop();
      labels.remove(temp_last);
    }
  }
})();

;(function(){
  cesium.adjImagery = {
    set: function(ceisumViewer, options){
      if (imageryLayers.length > 0) {
            var layer = imageryLayers.get(0);
            layer.brightness = options.brightness;
            layer.contrast = options.contrast;
            layer.hue = options.hue;
            layer.saturation = options.saturation;
            layer.gamma = options.gamma;
      }
    },
    get:function(ceisumViewer){
      var options = [];
      if (imageryLayers.length > 0) {
        var layer = imageryLayers.get(0);
        options.push(layer.brightness);
        options.push(layer.contrast);
        options.push(layer.hue); 
        options.push(layer.saturation);
        options.push(layer.gamma);
      }
      return options;
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
  cesium.dbclickTofly_enable = true;
  cesium.dbclickTofly = function(){

    var fly_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var ModelID = fly_handler.setInputAction(
    function (movement) {
      if(cesium.dbclickTofly_enable){
        var cartesian3 = scene.camera.pickEllipsoid(movement.position, ellipsoid);
        var cameraZcom = scene.camera.position;
        if(cartesian3) {
          var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
          var cartographic2 = ellipsoid.cartesianToCartographic(cameraZcom);
          var posHeight = cartographic2.height/8;
          if(posHeight<=5) {
            posHeight = 5;
          }
          cartographic.height=posHeight;
          goDestination = ellipsoid.cartographicToCartesian(cartographic);
        }
        var flight = Cesium.CameraFlightPath.createAnimation(scene, {
          destination : goDestination,
          duration: 1000
        });
        scene.animations.add(flight);  
      }
    },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
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
  cesium.north = function(){
    var camera = scene.camera;
    scene.camera.heading=0;
  };

})();

;(function(){
  cesium.setImagery = function(options){
    imageryLayers.removeAll();
    for (var i in options.layers) {
        imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : options.layers[i],
        maximumLevel:'20',
      }));
    }
  }
})();

;(function(){
  cesium.setTerrian = {
    set:function(url){
      centralBody.terrainProvider = new Cesium.CesiumTerrainProvider({
        url : url
      });
    },
    remove:function(){
      centralBody.terrainProvider = new Cesium.EllipsoidTerrainProvider();
    }
  }
})();

;(function(){
  cesium.setVector = {
    set:function(url){
      imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : "http://192.168.1.252:8102/map/google-vector",
        maximumLevel:'20'
      }),1);
    },
    remove:function(){
      var vector_layer = centralBody.imageryLayers.get(1);
      imageryLayers.remove(vector_layer);
    }
  }
})();

;(function(){
  // 将事件处理放在外面, 因为这个方法可能会被连续调用两次
  var handler_rbtn = new Cesium.ScreenSpaceEventHandler(scene.canvas);


  cesium.startAddLabel = function(callback){
    if(handler_rbtn && !handler_rbtn.isDestroyed()){
      handler_rbtn.destroy();
    }

    handler_rbtn = new Cesium.ScreenSpaceEventHandler(scene.canvas);

    handler_rbtn.setInputAction(function(movement){
        if(movement.position != null) {
          var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
          if(cartesian) {
            $("#addLabel").offset({left:movement.position.x,top:movement.position.y});
            $("#addLabel").show().focus();
            win.setTimeout(function(){
              $("#addLabel").focus();
            }, 100);
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

      if(handler_rbtn && !handler_rbtn.isDestroyed()){
        handler_rbtn.destroy();
      }

      if(callback){
        callback();
      }
    });

  };
})();

;(function(){
  var points=[];
  var firstPoint_flag = true;
  var current_point,last_Point;
  var sum = 0;


  // 将事件处理放在外面, 因为这个方法可能会被连续调用两次
  var mov_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  var left_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  var db_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);


  cesium.startMeasure = function(callback){
    if(mov_handler && !mov_handler.isDestroyed()){
      mov_handler.destroy();
    }
    if(left_handler && !left_handler.isDestroyed()){
      left_handler.destroy();
    }
    if(db_handler && !db_handler.isDestroyed()){
      db_handler.destroy();
    }
    mov_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    left_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    db_handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    

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

      mov_handler.destroy();
      left_handler.destroy();
      db_handler.destroy();

      if(callback){
        callback();
      }

      cesium.polyline.stop();
      cesium.label.stop();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  };
})();

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


  win.selfCesium = cesium;
})(window, document);
