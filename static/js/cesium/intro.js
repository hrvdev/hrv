;(function(win, doc){
var cesium = {};
var ellipsoid = Cesium.Ellipsoid.WGS84;
var scene = cesiumViewer.scene;
var primitives = scene.primitives;
var polylines = new Cesium.PolylineCollection();
var labels = new Cesium.LabelCollection();
var billboards = new Cesium.BillboardCollection();
var centralBody = primitives.centralBody;
var imageryLayers = centralBody.imageryLayers;
primitives.add(polylines);
primitives.add(labels);
primitives.add(billboards);
