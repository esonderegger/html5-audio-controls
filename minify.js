var fs = require('fs');
var UglifyJS = require("uglify-js");

var jsFile = fs.readFileSync('index.js', 'utf8');

var splitLines = jsFile.split('\n');
var slicedLines = splitLines.slice(0, -2);
var joinedLines = slicedLines.join('\n');

var uglified = UglifyJS.minify(joinedLines, {fromString: true});

fs.writeFileSync('docs/html5-audio-controls.min.js', uglified.code);
