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
