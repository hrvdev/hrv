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
