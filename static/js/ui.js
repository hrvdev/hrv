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


win.CesiumUI = MainUI;

})(window, document);
