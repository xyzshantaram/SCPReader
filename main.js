const { JSDOM } = require('jsdom');
const request = require("request");
const Readability = require('readability');
const strip = require("strip_tags");

function render() {
    let article = new Readability(globalThis.document).parse();
    console.log(article.title);
    console.log(strip(article.content))
}

globalThis.setDocument = function (arg, url) {
    this.DOMStr = arg;
    this.document = new JSDOM(globalThis.DOMStr, {url: url}).window.document;
    render();
}

function init() {
    let URL = "http://www.scp-wiki.net/scp-" + process.argv[2] + "/";
    console.log(URL)
    request({
        uri: URL,
    }, (error, response, body) => {
        globalThis.setDocument(body, URL);
    });
}

init();