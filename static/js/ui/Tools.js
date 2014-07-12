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


      that.dom.on('click', '.map-tool-location', function(){
        selfCesium.north();
      }).on('click', '.map-tool-measure', function(){
        var dom = $(this).addClass('active');
        selfCesium.dbclickTofly_enable = false;
        selfCesium.startMeasure(function(){
          dom.removeClass('active');
          selfCesium.dbclickTofly_enable = true;
        });

      }).on('click', '.location-images-toggle', function(){
        if(that.toggleLocationImagesBtn.hasClass('open')){
          that.hideLocationImages();
          that.locationImagesContainer.hide();
          that.miniMap.goToSmall();
        } else {
          that.showLocationImages();
          that.miniMap.goToLarge();
        }
      }).on('click', '.map-tool-addlabel', function(){
        
        var dom = $(this).addClass('active');

        selfCesium.startAddLabel(function(){
          dom.removeClass('active');
        });
      }).on('click', '.map-tool-vector', function(){
        var dom = $(this);
        if(dom.hasClass('active')){
          dom.removeClass('active');
          selfCesium.setVector.remove();
        } else {
          dom.addClass('active');
          selfCesium.setVector.set("http://124.65.135.146:8100/map/google-vector/");
        }
      }).on('click', '.map-tool-terrian', function(){
        var dom = $(this);
        if(dom.hasClass('active')){
          dom.removeClass('active');
          selfCesium.setTerrian.remove();
        } else {
          dom.addClass('active');
          selfCesium.setTerrian.set("http://124.65.135.146:8100/terrain/");
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
