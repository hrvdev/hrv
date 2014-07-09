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
