const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign

/* 업비트 엑세스 정보 */
const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = process.env.UPBIT_SERVER;

const payload = {
    access_key: access_key,
    nonce: uuidv4()
};

const token = sign(payload, secret_key);

const options = {
    method: "GET",
    headers: {Authorization: `Bearer ${token}`}
};

// 거래가능한 모든 마켓 정보 가져오기
function getMarkets(){
  return new Promise(function(resolve, reject){
    request(options, (error, response, body) => {
        return resolve(body);
    });
  });
}

// 마켓 시세 가져오기
function getMarketInfo(mktStr) {
   options.url = server_url + "/v1/ticker";
   options.qs = {markets:mktStr};
   // 시세정보들가져오기
   return new Promise(function(resolve, reject){
        request(options, (error, response, body) => {
              jsonBody = JSON.parse(body);
              //console.log(jsonBody);
              resolve(jsonBody);
        });
   });
}

// 어떤 마켓정보만을 가져올 것인지 (KRW)
function selectMarket(jsonObj){
    return jsonObj.market.substr(0,3) == 'KRW';
}


repeat = setInterval( function () {
   // 특정 화폐의 일봉 정보를 가져오기.
   // 특정 화폐의 주봉 정보 가져오기.
   // 분봉 로직.
   // 1. 최신 분봉 정보를 찾는다. 아예 없으면 최대 30개를 가져온다.
   // 2. 분봉을 가져올 때마다 n과 n-1의 차이를 구한다. 양/음 값을 모두 구한다. db저장 후 각 양/음값의 14일 평균을 구한다.
   // 3. 이를 가지고 rsi를 구해서 저장한다.

   }, 3000);

function startMonitor(){
    if(repeat==null){
      // ticker 를 매 10초마다 쌓던, 아니면 모니터링을 계속 해서 하든... 필요한 로직은 알아서 짜기.
      repeat = setInterval( function () {
            console.log('시작합니당.');
         }, 3000);
    }else{
      console.log('이미실행중');
    }
}

function stopMonitor(){
    clearInterval(repeat);
    console.log('모니터링 종료');
    repeat = null;
}

function changeInterval(bool){
    if(bool){
       setInterval(repeat, 3000);
    }else{
       clearInterval(repeat);
    }
}

module.exports = {
    options,
    getMarkets,
    getMarketInfo,
    selectMarket,
    changeInterval,
    stopMonitor,
    startMonitor
}
