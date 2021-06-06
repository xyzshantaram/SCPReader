#!/usr/bin/env node

const {
    JSDOM
} = require('jsdom');
const readability = require('readability-nodejs')
const striptags = require("striptags");
const fetch = require("node-fetch");

function fmt(line, width) {
    if (line.trim() === "") return [""]
    let final = [],
        words = [];
    let copy = line;
    let length = 0;
    copy = copy.split(" ");
    for (let i of copy) {
        if (length + i.length + 1 <= width) {
            words.push(i)
            length += i.length + 1
        } else {
            final.push(words.join(" "))
            words = [i]
            length = i.length
        }
    }
    final.push(words.join(" "));
    return final;
}

function sliceArray(arr, size) {
    const numChunks = Math.ceil(arr.length / size);
    const chunks = [];
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks.push(arr.slice(o, size));
    }
    return chunks;
}

function getLines(_articleStr) {
    let articleStr = _articleStr.replace(/&nbsp;/g, " ").replace(/&gt;/, ">").replace(/&lt;/, "<")
    let lines = articleStr.split("\n");
    let final = [];
    let width = process.stdout.columns || 80;
    for (let line of lines) {
        if (line.trim() === "") {
            continue;
        }
        let split = fmt(line, width);
        split.forEach((itm) => final.push(itm));
    }

    return final;
}

function render(document) {
    let article = new readability.Readability(document).parse();
    console.log(article.title);
    let content = striptags(article.content);
    let lines = getLines(content);
    for (let line of lines) {
        console.log(line)
    }
}

function init() {
    let scpNo = -1;
    if (process.argv.length > 2) {
        scpNo = process.argv[2];
    } else {
        console.error("Too few arguments provided.");
        process.exit(0)
    }
    let URL = "http://www.scp-wiki.net/scp-" + scpNo + "/";
    console.log(URL)
    fetch(URL)
        .then(res => res.text())
        .then(body => {
            let document = new JSDOM(body, {
                url: URL
            }).window.document;
            render(document);
        });
}

init();