;(function(win, doc){

var LocationShower = (function(){

  var LocationShowerClass = function(){
    this.dom = $('#locationShow');
    this.content = $('#locationShowC');
    this.init();
  };

  LocationShowerClass.prototype = {
    init: function(){
      var that = this;

      $('#locationShowClose').on('click', function(){
        that.hide();
      });
    },
    hide: function(){
      this.dom.removeClass('showing');
    },
    show: function(obj){
      var that = this;
      var html = [];
      html.push('<div><span>\u7ECF\u5EA6:</span><span>' + obj.lng + '</span><span>(' + obj.lng2 + ')</span></div>');
      html.push('<div><span>\u7EAC\u5EA6:</span><span>' + obj.lat + '</span><span>(' + obj.lat2 + ')</span></div>')
      that.content.html(html.join(''));
      that.hide();
      setTimeout(function(){
        that.dom.addClass('showing');
      },200);
    }
  };


  return LocationShowerClass;

})();

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
          selfCesium.setVector.set("http://192.168.1.252:8102/map/google-vector");
        }
      }).on('click', '.map-tool-terrian', function(){
        var dom = $(this);
        if(dom.hasClass('active')){
          dom.removeClass('active');
          selfCesium.setTerrian.remove();
        } else {
          dom.addClass('active');
          selfCesium.setTerrian.set("http://192.168.1.252:8100/terrain/");
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
  this.locationShower = new LocationShower();

  this.searchBar = new SearchBar();

  selfCesium.dbclickTofly();
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
    var that = this;
    
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var scene = cesiumViewer.cesiumWidget.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement){
      if(movement.position != null) {
        var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
        if(cartesian) {
          selfCanvas.showCircleAt(movement.position);
          var pos = selfCesium.getPosition(win.cesiumViewer, movement.position);

          that.locationShower.show({
            lat: pos.ddLat,
            lng: pos.ddLong,
            lat2: pos.dmsLat,
            lng2: pos.dmsLong
          });
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
};


win.CesiumUI = MainUI;

})(window, document);

var SearchBar = (function(){

  var SearchBarClass = function(){
    this.input = $('#searchInput');

    this.searchResult = $('#searchResult');

    this.init();
  };

  SearchBarClass.prototype.init = function(){
    var that = this;

    that.input.on('change', function(){
      that.doSearch();
    });

    $('#searchButton').on('click', function(){
      that.doSearch();
    });
  };

  SearchBarClass.prototype.doSearch = function(){
    var that = this;
    $.get('/worldLocation', {name: that.input.val()}, function(res){

    });
  };

  SearchBarClass.prototype.renderSearchResult = function(){

  };


  return SearchBarClass;

})();
