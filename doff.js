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

  station: null,
  direction: Math.random() >= 0.2 ? 1 : -1,

  // The index at which the status bar starts to fade
  statusFadeIndex: null,

  // The progress points at which the CAREFUL alert will be displayed
  interruptions: [
    1 + Math.floor(Math.random() * 6),
    7 + Math.floor(Math.random() * 6),
    13 + Math.floor(Math.random() * 6),
  ],
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
  state.station = stations.indexOf("yeoman") + Math.random() * 21 - 10;

  state.started = true;
  startAudio();
  updateScenario();
  syncUI();
  showImage();
}

function showImage() {
  document.getElementById("gallery").src = _.sample(galleryImages);
  changeToScreen("screenGallery", function () {
    setTimeout(function () {
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
  var act = story.acts[state.actNum];
  if (act.callback) act.callback();
  if (state.interruptions.includes(state.progress)) {
    showWarning();
    // TODO this can trigger another warning
    // TODO can this get a color?
    // TODO Have the music fade out so it's obviously intentional
    // TODO the fading out of the progress is a bit janky, can it be smoothed over more steps?
    // TODO stop the SPLENDID ETIQUETTE alerts after ernest's freefall starts
    updateStation();
  } else if (Math.random() <= 0.4) {
    // Update the station unless Ernest is in freefall
    if (typeof state.statusFadeIndex !== "number") {
      updateStation();
    }
  }

  act.counter--;
  if (act.counter === 0) state.actNum++;

  updateScenario();
  syncUI();

  // if (
  //   !state.interruptions.includes(state.progress) &&
  //   act.allowImages &&
  //   Math.floor(Math.random() * 1) === 0
  // ) {
  //   showImage();
  // } else {
  //   syncUI();
  // }
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
