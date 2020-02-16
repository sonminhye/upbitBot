// 사용자 요청 라우터
module.exports = function(app, fs)
{
  /* 변수 */
  const request = require('request')
  const upbitApi = require('../upbitApi.js');
  const server_url = "https://api.upbit.com";
  // 홈 접속 시, 내 게좌 리스트 노출
  app.get('/',function(req,res){
    //options.url = server_url + "/v1/accounts";
    upbitApi.options.url = server_url + "/v1/accounts";

    request(upbitApi.options, (error, response, body) => {
      if (error) throw new Error(error)
        console.log(body);
         res.render('home', {data:body});
     });
 });

   // 마켓 현황
   app.get('/marketInfo', async function(req,res){
     // 이 때 부터 코인봇 돌아가게 만듬.
     var bodyData = new Array();
     upbitApi.options.url = server_url + "/v1/market/all";
     var resBody = await upbitApi.getMarkets();
     var markets = JSON.parse(resBody);
     var markets = markets.filter(upbitApi.selectMarket);

     // 마켓 정보들만 배열에 담기
     var mktStr = "";
     markets.map((val, idx) => {
       if(idx < markets.length-1){
         mktStr += val.market + ',';
       }else{
         mktStr += val.market;
       }
     });

     var data = await upbitApi.getMarketInfo(mktStr);
     // data 배열에 한글이름 추가
     data.map((value) => {
        value.korean_name = markets.filter((mkt) =>{
            return mkt.market == value.market;
        })[0].korean_name;
     });
     res.render('marketInfo', {data:data, mktStr:mktStr});
  });

  app.get('/channel', function(req,res){
      
  });

}
