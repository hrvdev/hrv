//根据panoId获取显示街景需要的json文件;
function getJsonByPanoId(req, res) {
  db = new sqlite3.Database('65676062.jsondb');
  console.log(req.query.panoId)
  var str = "select * from panojson where panoid = '" + req.query.panoId + "'";
  db.all(str, function(err, rows) {
    var panoJson = "";
    if (rows && rows.length > 0) {
      panoJson = rows[0].JSON;
    }
    res.jsonp(panoJson);
  });
  
}

module.exports = getJsonByPanoId;
