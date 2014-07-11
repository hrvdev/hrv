var someAPI = require('./someAPI.js');
var worldLocation = require('./worldLocation.js');
var getStreetViewLocation = require('./getStreetViewLocation.js');
var getImagByPanoId = require('./getImagByPanoId.js');
var getJsonByPanoId = require('./getJsonByPanoId.js');

// 所有的接口, 都通过module.exports暴露出去
module.exports = {
  someAPI: someAPI,
  getStreetViewLocation: getStreetViewLocation,
  worldLocation: worldLocation,
  getImagByPanoId: getImagByPanoId,
  getJsonByPanoId: getJsonByPanoId
};
