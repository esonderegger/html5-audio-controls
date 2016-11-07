var html5AudioControls = (function() {
  'use strict';

  function zeroPad(n, p, c) {
    var padChar = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(padChar);
    return (pad + n).slice(-pad.length);
  }

  function prettyTime(floatSeconds) {
    if (!parseFloat(floatSeconds)) {
      floatSeconds = 0.0;
    }
    var outStr = '';
    var hours = Math.floor(floatSeconds / 3600);
    floatSeconds -= hours * 3600;
    var minutes = Math.floor(floatSeconds / 60);
    floatSeconds -= minutes * 60;
    if (hours > 0) {
      outStr += hours + ':' + zeroPad(minutes, 2) + ':';
    } else {
      outStr += minutes + ':';
    }
    outStr += zeroPad(Math.round(floatSeconds), 2);
    return outStr;
  }

  function createCounter(parent, height, width, left, color) {
    var counter = document.createElement('div');
    parent.appendChild(counter);
    counter.style.width = width + 'px';
    counter.style.height = height + 'px';
    counter.style.textAlign = 'center';
    counter.style.lineHeight = height + 'px';
    counter.style.position = 'absolute';
    counter.style.left = left + 'px';
    counter.style.color = color;
    return counter;
  }

  function createBlock(parent, height, width, top, left, color) {
    var block = document.createElement('div');
    parent.appendChild(block);
    block.style.width = width + 'px';
    block.style.height = height + 'px';
    block.style.position = 'absolute';
    block.style.top = top + 'px';
    block.style.left = left + 'px';
    block.style.backgroundColor = color;
    return block;
  }

  var svgViewBox = '0 0 1792 1792';

  var playSvgPath = 'M1312 896q0 37-32 55l-544 320q-15 9-32 9-16 ';
  playSvgPath += '0-32-8-32-19-32-56v-640q0-37 32-56 33-18 64 1l544 320q32 ';
  playSvgPath += '18 32 55zm128 0q0-148-73-273t-198-198-273-73-273 73-198 ';
  playSvgPath += '198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224';
  playSvgPath += ' 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-';
  playSvgPath += '279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 ';
  playSvgPath += '103 279.5 279.5 103 385.5z';

  var pauseSvgPath = 'M896 128q209 0 385.5 103t279.5 279.5 103 385.5-103 ';
  pauseSvgPath += '385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5';
  pauseSvgPath += ' 103-385.5 279.5-279.5 385.5-103zm0 1312q148 0 ';
  pauseSvgPath += '273-73t198-198 73-273-73-273-198-198-273-73-273 73-198 ';
  pauseSvgPath += '198-73 273 73 273 198 198 273 73zm96-224q-14 ';
  pauseSvgPath += '0-23-9t-9-23v-576q0-14 9-23t23-9h192q14 0 23 9t9 23v576q0 ';
  pauseSvgPath += '14-9 23t-23 9h-192zm-384 0q-14 0-23-9t-9-23v-576q0-14 ';
  pauseSvgPath += '9-23t23-9h192q14 0 23 9t9 23v576q0 14-9 23t-23 9h-192z';

  function createSvg(width, height, viewBox, path, fill) {
    var svgElement = document.createElement('svg');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('width', width);
    svgElement.setAttribute('height', height);
    svgElement.setAttribute('viewBox', viewBox);
    var pathElement = document.createElement('path');
    pathElement.setAttribute('d', path);
    pathElement.setAttribute('fill', fill);
    svgElement.appendChild(pathElement);
    return svgElement.outerHTML;
  }

  function createPlayPause(parent, size, color) {
    var playPause = document.createElement('div');
    playPause.style.width = size + 'px';
    playPause.style.height = size + 'px';
    playPause.style.border = 'none';
    playPause.style.cursor = 'pointer';
    return playPause;
  }

  function createControls(domElement, color1, color2) {
    var elementWidth = domElement.clientWidth;
    var elementHeight = domElement.clientHeight;
    if (!elementHeight) {
      domElement.style.height = '2em';
      elementHeight = domElement.clientHeight;
    }
    domElement.style.position = 'relative';
    var audioElement = domElement.getElementsByTagName('audio')[0];
    var playPause = createPlayPause(domElement, elementHeight, color1);
    var playSvg = createSvg(elementHeight, elementHeight, svgViewBox,
                            playSvgPath, color1);
    var pauseSvg = createSvg(elementHeight, elementHeight, svgViewBox,
                             pauseSvgPath, color1);
    playPause.innerHTML = playSvg;

    playPause.addEventListener('click', function(event) {
      if (audioElement.duration > 0 && !audioElement.paused) {
        audioElement.pause();
        playPause.innerHTML = playSvg;
      } else {
        audioElement.play();
        playPause.innerHTML = pauseSvg;
      }
    }, false);

    var timePlayed = createCounter(domElement, elementHeight, elementHeight,
                                   elementHeight, color1);
    timePlayed.textContent = prettyTime(audioElement.currentTime);
    var timeTotal = createCounter(domElement, elementHeight, elementHeight,
                                  elementWidth - elementHeight, color1);
    timeTotal.textContent = prettyTime(audioElement.duration);

    var progressHeight = 8;
    var progressWidth = elementWidth - (elementHeight * 3);
    var progressTop = elementHeight / 2 - progressHeight / 2;
    var progressLeft = elementHeight * 2;

    var progressTotal = createBlock(domElement, progressHeight, progressWidth,
                                    progressTop, progressLeft, color2);
    var progressPlayed = createBlock(domElement, progressHeight, 0, progressTop,
                                     progressLeft, color1);

    audioElement.addEventListener('timeupdate', function() {
      var playedRatio = audioElement.currentTime / audioElement.duration;
      progressPlayed.style.width = playedRatio * progressWidth + 'px';
      timePlayed.textContent = prettyTime(audioElement.currentTime);
      timeTotal.textContent = prettyTime(audioElement.duration);
    });

    audioElement.addEventListener('ended', function() {
      playPause.innerHTML = playSvg;
    });

    domElement.appendChild(playPause);
  }

  return {
    createControls: createControls
  };
})();

module.exports = html5AudioControls;
