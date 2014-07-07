//每个api函数, 都要接受req和res参数
function someAPI(req, res){
  res.json({
    hello: 'hello'
  });
}


// 单个api直接暴露处方法即可
module.exports = someAPI;
