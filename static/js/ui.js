;(function(win, doc){

var MiniMap = (function(){

  var MiniMapClass = function(){
    this.dom = $('#miniMap');
  };

  MiniMapClass.prototype = {
    goToLarge: function(){
      this.dom.addClass('open');
    },
    goToSmall: function(){
      this.dom.removeClass('open');
    }
  };



  return MiniMapClass;

})();

var Tools = (function(){

  var ToolsClass = function(miniMap){
    
    this.miniMap = miniMap;

    this.dom = $('#tools');
    this.toggleLocationImagesBtn = $('#toggleLocationImagesBtn');
    this.locationImagesContainer = $('#locationImagesContainer');
    this.init();
  };

  ToolsClass.prototype = {
    init: function(){

      var that = this;

      that.toggleLocationImagesBtn.on('click', function(){
        if(that.toggleLocationImagesBtn.hasClass('open')){
          that.hideLocationImages();
          that.locationImagesContainer.hide();
          that.miniMap.goToSmall();
        } else {
          that.showLocationImages();
          that.miniMap.goToLarge();
        }
      });
      
    },
    showLocationImages: function(){
      this.dom.addClass('open');
      this.toggleLocationImagesBtn.addClass('open');


      var that = this;
      setTimeout(function(){
        that.renderLocationImages([{
          src: 'imgs/1.jpg',
          title: 'China'
        }, {
          src: 'imgs/2.jpg',
          title: 'China'
        }, {
          src: 'imgs/3.jpg',
          title: 'China'
        }, {
          src: 'imgs/4.jpg',
          title: 'China'
        }, {
          src: 'imgs/1.jpg',
          title: 'China'
        }, {
          src: 'imgs/2.jpg',
          title: 'China'
        }, {
          src: 'imgs/3.jpg',
          title: 'China'
        }, {
          src: 'imgs/4.jpg',
          title: 'China'
        }, {
          src: 'imgs/1.jpg',
          title: 'China'
        }, {
          src: 'imgs/2.jpg',
          title: 'China'
        }, {
          src: 'imgs/3.jpg',
          title: 'China'
        }, {
          src: 'imgs/4.jpg',
          title: 'China'
        }, {
          src: 'imgs/1.jpg',
          title: 'China'
        }, {
          src: 'imgs/2.jpg',
          title: 'China'
        }, {
          src: 'imgs/3.jpg',
          title: 'China'
        }, {
          src: 'imgs/4.jpg',
          title: 'China'
        }]);
      }, 200);
      
    },
    renderLocationImages: function(images){
      this.images = images;

      if(!this.toggleLocationImagesBtn.hasClass('open')){
        return;
      }

      var html = [];
      for(var i = 0; i < images.length; i ++){
        html.push('<div class="location-image">')
        html.push('<img src="' + images[i].src + '" />');
        html.push('<div>' + images[i].title + '</div>');
        html.push('</div>');
      }
      var div = $('<div></div>').html(html.join('')).css('width', images.length * 203 - 3);
      var that = this;
      that.locationImagesContainer.html(div).fadeOut(0, function(){
        that.locationImagesContainer.fadeIn(100);
      });
    },
    hideLocationImages: function(){
      this.dom.removeClass('open');
      this.toggleLocationImagesBtn.removeClass('open');
    }
  };


  return ToolsClass;

})();

var selfCanvas = (function(){
  var canvas = oCanvas.create({
    canvas: '#canvas',
    fps: 60
  });

  var circle = canvas.display.ellipse({
    x: 100,
    y: 100,
    radius_x: 0,
    radius_y: 0,
    fill: '#fff'
  });


  function showCircleAt(pos){
    circle.x = pos.x;
    circle.y = pos.y;
    circle.opacity = 1;
    circle.radius_x = 1;
    circle.radius_y = 1;
    
    canvas.addChild(circle);

    circle.stop().animate({
      radius_x: 15,
      radius_y: 15,
      opacity: 0,
      duration: 300
    }, {
      callback: function(){
        canvas.removeChild(circle);
      }
    });
  }


  return {
    showCircleAt: showCircleAt
  };

})();

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
    
    that.initShowPosition();
  },
  initShowPosition: function(){
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var scene = cesiumViewer.cesiumWidget.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement){
      if(movement.position != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
        if(cartesian) {
          selfCanvas.showCircleAt(movement.position);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
};


win.CesiumUI = MainUI;

})(window, document);
