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
