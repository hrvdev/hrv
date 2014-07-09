;(function(){

  cesium.convert = {
    ddTodms: function(dd){
      var deg = dd | 0; // truncate dd to get degrees
      var frac = Math.abs(dd - deg); // get fractional part
      var min = (frac * 60) | 0; // multiply fraction by 60 and truncate
      var sec = (frac * 3600 - min * 60).toFixed(4);
      return deg + "°" + min + "' " + sec + "\"";
    },
    dmsTodd:function(dms){
      var ary = dms.split('.');
      if(ary && ary.length === 2){
        var d = window.parseInt(ary[0], 10);
        var ms = ary[1];
        var m, s;
        if(ms.length <= 2){
          m = window.parseInt(ms);
          s = 0;
        } else {
          m = window.parseInt(ms.substring(0,2));
          var ss = ms.substring(2);
          if(ss.length > 2){
            ss = ss.substring(0,2) + '.' + ss.substring(2);
          }
          s = window.parseFloat(ss);
        }
        var zf = 1;
        var absd = Math.abs(d);
        if(dms.indexOf('-') == 0){
          zf = -1;
        }
        return (absd + m / 60 + s / 3600).toFixed(8) * zf;
      } else if(ary.length === 1) {
        return window.parseInt(ary[0]).toFixed(8);
      } else {
        return Number.NaN;
      }
    }
  };

})();
