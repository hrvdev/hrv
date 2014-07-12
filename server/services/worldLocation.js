//地名搜索

// 不引入怎么能使用呢？
var sqlite3 = require('sqlite3');
var path = require('path');

function worldLocation(req, res) {
  var db = new sqlite3.Database(path.join(__dirname, '../../data/world.hrv'));
  // var db = new sqlite3.Database('world.hrv');
  // 去掉了行尾注释
  // 去掉了国家条件

  var str = "select * from WorldLocation where name like '%"+req.query.name+"%'";
  
  db.all(str, function(err, rows) {
    
    var lables = [];
    if(rows){
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var name = row.name;
        var latitude = row.latitude;
        var longitude = row.longitude;

        // var location = row.latlon.split(',');
        // var latitude = location[0];
        // var longitude = location[1];

        // 直接这样即可
        lables.push({
          name: name,
          latitude: latitude,
          longitude: longitude,
          grade: row.country + ',' + row.province
        });
        // lable.name = name;
        // lable.latitude = latitude * 1;
        // lable.longitude = longitude * 1;
        // var jsons = JSON.stringify(lable);
        // lables.push(jsons);
      }
      // 为何要jsonp？
      // res.jsonp(lables);
      res.json({
        hasData: true,
        data: lables
      });
    } else {
      res.json({
        hasData: false
      });
    }

    
  });

}

module.exports = worldLocation;
