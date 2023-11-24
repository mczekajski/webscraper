const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const articles = [];

const app = express();

const url = "https://www.onet.pl";

axios(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    $(".TitleWrapper_titleWrapper__1v73l", html).each(function () {
      const title = $(this).text();
      console.log(title);
      articles.push(title);
    });
  })
  .then(console.log(articles));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
