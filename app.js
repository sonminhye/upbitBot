// ENV
require('dotenv').config();

// DEPENDENCIES
var express = require('express');
var ejs = require('ejs');
var app = express();
var fs = require("fs");
var mongoose = require('mongoose');
var chatBot = require('./bot.js');
var upbitApi = require('./upbitApi.js');

app.use(express.static('public'));
app.set('views', __dirname + '/views'); // view 관련 파일들은 /views 폴더 안에 있음.
app.set('view engine', 'ejs'); // view engine 으로 ejs 를 지정
// app.use(express.bodyParser()); bodyParser 의 경우, 현재는 express 모듈과 번들로 제공 X

var server = app.listen(3000, function(){
   console.log("서버시작");
   // 챗봇 시작(push, poll봇 모두 시작)
   //chatBot.pushBot();
   //chatBot.pollBot();
   // 모니터링 시작.]
});

// 몽고디비 연결
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true ,
    useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


var router = require('./routes/index')(app, fs, mongoose); // 사용자로부터 request 를 받았을 때, 이에 대한 라우팅 정보를 담고 있음.
