const request = require("request");
// const fs = require("fs");

const downloadHtml = () => {
  request(
    {
      url:
        "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json",
      headers: {
        Accept: "*/*",
        Cookie:
          "ak_bmsc=93A450192201C1DC01725B7EE26827BF17D25D853043000094584A5E75901B3F~plqGjefxptaGNo3nzRXZLiGKMgVZslUn4CG7eLZjDVdHQxOnY50zqczHQ+SI57qV0EAr7NdyV23M5lGNpH4cou0Mgmn2b+xT1sLKRZPKET1RCeS6yIdV/TzmgCxrBCuLlfT1BRB2hD/Zgs1hpFnqgyjplrlBKLfApzh2m3a+v7kvejlOCq3dRBGqt52GII8pVLn771liPKAdovRqEHWYUO2bds7OdyNFQnpid4lZ36wGY="
      }
    },
    (err, res, body) => {
      console.log(body);
      //   onJson(body);
    }
  );
};

console.log(downloadHtml());

// const writeQuotes = function(text) {
//   fs.writeFileSync("./public/data/nifty.json", text);
// };

// const download = () => downloadHtml(writeQuotes);
// module.exports = download;
