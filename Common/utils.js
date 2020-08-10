import { Scheduler } from '../lib/util-2020.1.js';

export function hideMouse(hide) {
  return function () {
    if (hide) {
      $('body').css('cursor', 'none');
    } else {
      $('body').css('cursor', 'default');
    }
    return Scheduler.Event.NEXT;
  };
}

export function getNumberOfFiles(url, datDir) {
  let numDataFiles = 0;
  $.ajax({
    url: url,
    type: 'POST',
    async: false,
    data: { dir: datDir },
  }).done(function (data) {
    numDataFiles = data;
  });
  return numDataFiles;
}

export function getVersionNumber(num, numberOfVersions) {
  return (num % numberOfVersions) + 1;
}

export function mean(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    total += array[i];
  }
  var avg = total / array.length;
  return avg;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Returns a random number between min (inclusive) and max (exclusive)
export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Returns a random int number between min (inclusive) and max (exclusive)
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function loadImages(imagefiles) {
  loadcount = 0;
  loadtotal = imagefiles.length;
  preloaded = false;

  // Load the images
  let loadedimages = [];
  for (let i = 0; i < imagefiles.length; i++) {
    var image = new Image();
    image.onload = function () {
      loadcount++;
      if (loadcount == loadtotal) {
        preloaded = true;
      }
    };

    // set the source and save
    image.src = imagefiles[i];
    loadedimages[i] = image;
  }

  return loadedimages;
}
