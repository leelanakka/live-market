const request = require("request");
const fs = require("fs");

const downloadJson = onJson => {
  request(
    {
      url:
        "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json",
      headers: {
        Accept: "*/*",
        Cookie:
          "ak_bmsc=8921B3C9B678E950CC133E2B1F4AB87417D25D8530430000E8734B5ED4DA7657~pl7uO7xPxLQsfQUmXPpNkjTCsvnOtVDGQ2uo8GqZ6al9qjB/xXRTUchPCQTx7q8r81I3NP/JpHNu/TrY3dKkteKK/SeOMtV58cQPtXcFjyHsY935jfAHXsAYSETldlk8pq/DNW+X8E9FDftMrKFpuzF8UBE4xI7+RRVoUAkzdpcPlo1T6HcNzDC3AnX0Nn/fbClP2Nyq9B+8TE/wItx2teQkFXABLI2cDli/9ZEBWd1aA="
      }
    },
    (err, res, body) => {
      onJson(body);
    }
  );
};

const writeQuotes = function(text) {
  fs.writeFileSync("./public/data/nifty.json", text);
};

const download = () => downloadJson(writeQuotes);
module.exports = download;
