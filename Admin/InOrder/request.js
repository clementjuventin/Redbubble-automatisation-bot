let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 
/*
axios.get('https://bubbletrends.herokuapp.com/trends')
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
            const $ = cheerio.load(html); 
            console.log(html)
    }
    }, (error) => console.log(err) );
*/
const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
  const page = await browser.newPage();
  const url = 'https://www.chromestatus.com/features';

  await page.goto(url);

  let bodyHTML = await page.evaluate(() => document.body.innerHTML);

  console.log(bodyHTML)
  //browser.close();
});