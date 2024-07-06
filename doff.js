// TODO - If you get to the final station, it should handle this somehow
// TODO - Fix how images come up during gameplay
// TODO - More pictures
// TODO - Downsample images
// TODO - Expand the people and encounter lists
// TODO - Code review
// TODO - Put on-line
const DELAY = 200;
const galleryImages = [
  "costermonger.webp",
  "gendarme.webp",
  "priest.webp",
  "rabbi.webp",
  "roma.webp",
  "slavs.webp",
  "soldier.webp",
  "tronk.webp",
  "washerwoman.webp",
];

var state = {
  activeScreen: null,
  started: false,
  actNum: 0,
  progress: 0,
  endStateCounter: 0,
  lastClick: 0,
  scenario: "",
  afterAccident: false,

  station: null,
  // The index of yeoman. The 0 value above which stations are good, and below which they are bad
  stationMidpoint: null,
  direction: Math.random() >= 0.2 ? 1 : -1,

  // The index at which the status bar starts to fade
  statusFadeIndex: null,
  audio: null,
};

document.addEventListener("DOMContentLoaded", initialize);
function initialize() {
  preloadImages();
  changeToScreen("screenIntro");
}

function startGame(e) {
  // Prevent the user from clicking the checkbox twice
  if (state.started) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  // Yeoman is the neutral starting point
  state.stationMidpoint = stations.indexOf("yeoman");
  // Start most likely below yeoman
  state.station = state.stationMidpoint + Math.random() * 15 - 10;

  state.started = true;
  startAudio();
  updateScenario();
  syncUI();
  showImage();
}

function showImage(callback) {
  document.getElementById("gallery").src = _.sample(galleryImages);
  changeToScreen("screenGallery", function () {
    setTimeout(function () {
      if (callback) {
        callback();
      }
      changeToScreen("screenQuestions");
    }, 2000);
  });
}

function changeToScreen(id, callback) {
  if (state.activeScreen) {
    state.activeScreen.classList.remove("fade-in");
    state.activeScreen.classList.add("fade-out");
    setTimeout(fadeIn.bind(this, id, callback), 2000);
  } else {
    fadeIn(id, callback);
  }
}

function fadeIn(id, callback) {
  if (state.activeScreen) {
    state.activeScreen.style.display = "none";
  }
  state.activeScreen = document.getElementById(id);
  state.activeScreen.style.display = "flex";
  state.activeScreen.classList.remove("fade-out");
  state.activeScreen.classList.add("fade-in");
  if (callback) callback();
}

function clickAction() {
  // Don't allow clicking more than once a second
  // otherwise mucksavage bogmen click too fast and miss the game
  var time = Date.now();
  if (time - state.lastClick < DELAY) {
    return;
  }
  state.lastClick = time;

  nextScenario();
}

function nextScenario() {
  state.progress++;
  let act = story.acts[state.actNum];
  let displayedAlert = false;
  if (act.callback) act.callback();
  if (!state.afterAccident) {
    const capriciousFate = Math.random();
    let delta;
    if (capriciousFate < 4 / 6) {
      delta = state.direction * Math.random() * 3;
    } else if (capriciousFate < 5 / 6) {
      delta = 5 + Math.random() * 5;
    } else {
      delta = -1 * 5 + Math.random() * 5;
    }

    if (state.station + delta < 0) {
      delta = 15 + Math.random() * 5;
    } else if (state.station + delta > stations.length - 1) {
      delta = 15 + Math.random() * 5;
    }

    if (delta > 4) {
      showAccolade();
      displayedAlert = true;
    } else if (delta < -4) {
      showWarning();
      displayedAlert = true;
    }

    state.station += delta;
  }

  act.counter--;
  if (act.counter === 0) state.actNum++;

  updateScenario();

  if (act.allowImages && !displayedAlert && Math.random() < 0.33) {
    showImage(function () {
      syncUI();
    });
  } else {
    syncUI();
  }
}

function updateText() {
  var questionEl = document.getElementById("question");
  questionEl.classList.remove("fade-in");
  questionEl.classList.add("fade-out");
  setTimeout(
    function () {
      questionEl.textContent = state.scenario;
      questionEl.classList.remove("fade-out");
      questionEl.classList.add("fade-in");
    },
    questionEl.innerHTML === "" ? 0 : DELAY
  );
}
