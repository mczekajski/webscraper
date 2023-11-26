const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://pewneauto.pl/";

async function scrapeWebsite() {
  try {
    axios(url).then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const count = Number(
        $(".main-page-hero__text__counter strong", html)
          .text()
          .replace(/\s+/g, "")
      );
      console.log(count);
    });
  } catch (error) {
    console.error("Error scarping website:", error);
  }
}

scrapeWebsite();
