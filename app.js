const express = require("express");
const app = express();
const download = require("./server/downloadQuotes");
const view = require("ejs");

const renderTopCompanies = function(req, res) {
  download();
  setInterval(download, 600000);
  return res.render("top_companies.html");
};

app.set("views", __dirname + "/public");
app.engine("html", view.renderFile);
app.set("view engine", "html");
app.get("/topComapnies", renderTopCompanies);
app.use(express.static("./public"));
app.listen(8080, () => console.log("Listening on ", 8080));
