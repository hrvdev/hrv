var Tools = (function(){

  var ToolsClass = function(miniMap){
    
    this.miniMap = miniMap;

    this.dom = $('#tools');
    this.toggleLocationImagesBtn = $('#toggleLocationImagesBtn');
    this.init();
  };

  ToolsClass.prototype = {
    init: function(){

      var that = this;

      that.toggleLocationImagesBtn.on('click', function(){
        if(that.toggleLocationImagesBtn.hasClass('open')){
          that.hideLocationImages();
          that.miniMap.goToSmall();
        } else {
          that.showLocationImages();
          that.miniMap.goToLarge();
        }
      });
      
    },
    showLocationImages: function(images){
      this.dom.addClass('open');
      this.toggleLocationImagesBtn.addClass('open');
    },
    hideLocationImages: function(){
      this.dom.removeClass('open');
      this.toggleLocationImagesBtn.removeClass('open');
    }
  };


  return ToolsClass;

})();
