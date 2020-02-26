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
          "ak_bmsc=FE1EF67B12418B64D534A053AEDB053A17D25D14554600009D4D4E5E5D956942~plIm1q7g22VWTQQ0VEMdREt1i7u87FJqTf/X58rIQ0UJy1CF46RfE21CHnQhv54awXfq8uZpVzWLA0afnOgJbkDwwJCwMvOq+tgA1exTRwW6kz8L757MA4Q1qUA7LzDVx9wwaFR4Yvs5M34nE9P9MAAlEk0jb77AhNEwpnOZo0KVOnVh/AK/VLfYu6Eu7Nn4l3ApxypmkcB5lvjm4xEhGOqJmEWfUMKHH/q+Im4TW+Ue4="
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
