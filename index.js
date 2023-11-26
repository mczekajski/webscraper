const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const url = "https://pewneauto.pl/";

async function scrapeWebsite() {
  try {
    await axios(url).then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const count = $(".main-page-hero__text__counter strong", html)
        .text()
        .replace(/\s+/g, "");
      saveData(count);
    });
  } catch (error) {
    console.error("Error scarping website:", error);
  }
}

function saveData(count) {
  const filePath = path.join(__dirname, "countHistory.txt");
  const timestamp = new Date().toISOString();
  const dataLine = `${timestamp}: ${count}\n`;

  fs.appendFile(filePath, dataLine, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`Data saved: ${dataLine}`);
    }
  });
}

scrapeWebsite();
setInterval(scrapeWebsite, 60000);
