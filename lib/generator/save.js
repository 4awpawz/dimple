const { parse } = require("path");
const beautify = require("js-beautify").html;
const { outputFileSync } = require("fs-extra");
const prefixUrls = require("./prefixUrls");
const removeDataAttributes = require("./removeDataAttributes");
const removeComments = require("./removeComments");
const config = require("../config");

module.exports = ($, frag) => {
    // Files with names that start with and underscore ("_")
    // do not generate a page. They are only used to model the
    // generation (via their callbacks) of other pages based on them,
    // such as the blog category/tags blog pages.
    // They serve a similar purpose as the blog index page serves
    // but differ in that the blog index page is actually generated
    // whereas files with names preceding with an underscore
    // are not generated.
    if (parse(frag.path).name[0] !== "_") {
        if (process.env.TRIO_ENV === "release") {
            prefixUrls($);
            removeDataAttributes($);
            removeComments($);
        }
        outputFileSync(frag.destPath, config.userConfig.beautifyHTML
            ? beautify($.html(), { preserve_newlines: true, max_preserve_newlines: 1 })
            : $.html());
    }
};