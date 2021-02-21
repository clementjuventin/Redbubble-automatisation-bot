let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');
/*
axios.get('https://www.redbubble.com/shop/?query=chat&ref=search_box')
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
            console.log(html)
            const $ = cheerio.load(html); 
    }
    }, (error) => console.log(err) );
*/
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://jsonplaceholder.typicode.com/posts/1');
xhr.send();

xhr.onload = function() {
    console.log(xhr.response);
};