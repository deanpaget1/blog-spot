import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postNum = 0;

var blogTitle = {};
var blogText = {};
var blogTime = {};

var state = 0;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs",{
    webState: state,
  });
});

app.post("/posted", (req, res) => {
  if (req.body["blogTitle"] && req.body["blogText"]) {
    blogTitle[postNum] = req.body["blogTitle"];
    blogText[postNum] = req.body["blogText"];
    blogTime[postNum] = new Date();
    postNum++;
    state = 2;
  }
  res.render("index.ejs", {
    bTitle: blogTitle,
    bText: blogText,
    bAmount: postNum,
    bTime: blogTime,
    webState: state,
  });

  console.log(postNum);
  console.log(blogTitle);
});

app.post("/prepare", (req, res) => {
  state = 1;
  res.render("index.ejs", {
    webState: state,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
