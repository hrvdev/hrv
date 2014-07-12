var MiniMap = (function(){

  var MiniMapClass = function(){
    this.dom = $('#miniMap');

    this.miniMapSource = $('#miniMapSource');

    this.dataSource = ['Bing', 'Google'];
    this.currentDataSource = 1;

    this.init();
  };

  MiniMapClass.prototype = {
    init: function(){
      var that = this;

      that.dom.on('click', function(){
        that.currentDataSource = (that.currentDataSource + 1) % 2;
        that.miniMapSource.removeClass('bing').removeClass('google').addClass(that.dataSource[that.currentDataSource].toLowerCase());
        selfCesium.setImagery({
          layers: ['http://124.65.135.146:8100/map/' + that.dataSource[that.currentDataSource].toLowerCase() + '/']
        });
      });
    },
    goToLarge: function(){
      this.dom.addClass('open');
    },
    goToSmall: function(){
      this.dom.removeClass('open');
    }
  };



  return MiniMapClass;

})();
