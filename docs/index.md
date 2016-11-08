---
layout: default
title: HTML5 Audio Controls
---

# HTML5 Audio Controls

Super-simple controls for your html5 audio elements.

## Demo

{% include demo.html %}

## Usage (basic)

To use these controls, wrap your `<audio>` element inside a `<div>` element:

    <div id="my-audio-player">
      <audio id="my-audio" preload="metadata">
        <source src="audio/hello.mp3" type="audio/mpeg">
      </audio>
    </div>

Then, at the bottom of your `<body>` tag, add the script tag for these controls, and call the `createControls` function, passing in an Element object, a primary color, and a secondary color, like so:

    <script src="https://assets.rpy.xyz/html5-audio-controls.min.js"></script>
    <script>
      var myElement = document.getElementById('my-audio-player');
      var color1 = '#616161';
      var color2 = '#bdbdbd';
      html5AudioControls.createControls(myElement, color1, color2);
    </script>

## Usage (advanced)

If you are compiling your javascript with a tool like browserify, webpack, or rollup, you can integrate these controls into your site using the CommonJS `require()` syntax.

First, add html5-audio-controls as a dev dependency to your project:

    npm install --save-dev html5-audio-controls

Next, import the html5AudioControls module into your javascript:

    var html5AudioControls = require('html5-audio-controls');

Finally, use as you would in the above example:

    var myElement = document.getElementById('my-audio-player');
    var color1 = '#0f0';
    var color2 = '#00f';
    html5AudioControls.createControls(myElement, color1, color2);

(Note: the markup remains the same as in the basic example)

## Contributing

Contributions are welcome! I'd love to hear any ideas for how these controls could be more user-friendly as well as about any bugs or unclear documentation. If you are at all interested in this project, please create an issue or pull request on this project's [github page](https://github.com/esonderegger/html5-audio-controls).

## Copyright and license

Code and documentation copyright 2016 [Evan Sonderegger](https://rpy.xyz) and released under the [MIT License](https://github.com/esonderegger/html5-audio-controls/blob/master/LICENSE).
