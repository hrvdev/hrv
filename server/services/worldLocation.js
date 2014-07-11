//地名搜索
function worldLocation(req, res) {
  console.log(req.query.name + ">>>");
  db = new sqlite3.Database('world.hrv');
  var str = "select name,latlon from geoname where name like '%" + req.query.name + "%' and country = '" + req.query.country + "'"; //  str = str.format(req.query.name,req.query.country);
  console.log(str);
  db.all(str, function(err, rows) {
    var lables = [];
    var lable = {
      "name": "735800648",
      "latitude": 33,
      "longitude": 33
    };
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = row.name;
      var location = row.latlon.split(',');
      var latitude = location[0];
      var longitude = location[1];
      lable.name = name;
      lable.latitude = latitude * 1;
      lable.longitude = longitude * 1;
      var jsons = JSON.stringify(lable);
      lables.push(jsons);
    }
    console.log("[" + lables.join(",") + "]");
    var jsons = JSON.stringify(lables);
    res.jsonp(lables);
  });

}

module.exports = worldLocation;