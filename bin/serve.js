#!/usr/bin/env node
// Create a Browsersync instance
var bs = require("browser-sync").create();

// Listen to change events on HTML and reload
bs.watch("public/**/*.html").on("change", bs.reload);

// Provide a callback to capture ALL events to CSS
// files - then filter for 'change' and reload all
// css files on the page.
bs.watch("public/css/*.css", function (event, file) {
    if (event === "change") {
        bs.reload("*.css");
    }
});

// Now init the Browsersync server
bs.init({
    server: {
        baseDir: "./public",
        serveStaticOptions: {
            extensions: ["html"]
        }
    }
});