//获取本地所有街景坐标及panoId
function getStreetViewLocation(req, res) {
  db = new sqlite3.Database('65676062.jsondb');
  var str = "select panoid,lat,lng from panojson where lat is not null and lng is not null ";
  db.all(str, function(err, rows) {
    var lables = [];
    var lable = {
      "panoId": "735800648",
      "latitude": 33,
      "longitude": 33
    };
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      lable.panoId = row.PANOID;
      lable.latitude = row.LAT;
      lable.longitude = row.LNG;
      var jsons = JSON.stringify(lable);
      lables.push(jsons);
    }
    res.jsonp(lables);
  });
}

module.exports = getStreetViewLocation;
