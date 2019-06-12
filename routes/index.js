var express = require('express');
var router = express.Router();
import { ajax } from '../service/requset';
// import '../service/example';
/* GET home page. */
// router.get('/', function (req, res, next) {
//   // ajax('/api/provider/card_validate', {
//   //   mobile: '13800138001',
//   //   card_no: 'HT100021A',
//   //   card_pwd: 'REH2FTHR'
//   // })
//   console.log('sdsd',req);
//   res.render('index', { title: 'Express' });
// });
router.all("/*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  let param = req.method.toUpperCase() === 'GET' ? req.query : req.body;
  let url = req.originalUrl;
  console.log('resq',req)
  ajax(url, param, function (data) {
    res.send(data);
  }, function (fail) {
    res.send(fail);
  })
  console.log('url', url, 'param', param, 'parmTyep', typeof param);
  // console.log('sdsd', req);
  // res.send({ code: 0, message: "请求成功" })
})
module.exports = router;
