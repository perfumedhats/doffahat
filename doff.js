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

  // The index at which the progress bar starts to fade
  progressFadeIndex: null,

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
  state.started = true;
  startAudio();
  updateScenario();
  syncUI();
  showImage();
}

function showImage() {
  document.getElementById("gallery").src = _.sample(galleryImages, 1)[0];
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
  if (act.callback) callback();
  if (state.interruptions.includes(state.progress)) {
    alert("CAREFUL!");
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
