//根据pinoId及图片的相对坐标位置获取图片的输出流
 function getImagByPanoId(req, res) {
  db = new sqlite3.Database('65676062.tiledb');
  var str = "select * from panotile where panoid = '" + req.query.panoId + "'";
  db.all(str, function(err, rows) {
    var imags = {};
    if (rows) {
      for (var i = 0; i < rows.length; i++) {
        var prefix = "data:image/jpeg;base64,";
        var base64 = new Buffer(rows[i].TILE, 'binary').toString('base64');
        var data = prefix + base64;
        var imag = {};
        imags[rows[i].X.toString() + rows[i].Y.toString()] = data;
      }
      imags = JSON.stringify(imags);
    }
    res.jsonp(imags);
  });
}

module.exports = getImagByPanoId;
