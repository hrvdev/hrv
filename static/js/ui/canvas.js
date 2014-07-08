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
