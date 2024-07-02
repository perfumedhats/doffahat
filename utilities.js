function syncUI() {
  var act = story.acts[state.actNum];
  updateText();
  if (act.isEndgame) {
    if (state.endStateCounter > 3 && state.endStateCounter <= 10) {
      var step = 1 / (10 - 3);
      document.body.style.opacity = 1 - step * (state.endStateCounter - 3);
    }
    if (state.endStateCounter === 10) {
      document.body.innerHTML = "";
    }
  }

  var progressEl = document.getElementById("progress");
  progressEl.textContent = state.progress + "/29";
  if (typeof state.statusFadeIndex === "number") {
    var steps = 5;
    var stage = state.progress - state.statusFadeIndex;
    var step = 1 / steps;
    var statusBar = document.getElementById("statusBar");
    statusBar.style.opacity = 1 - step * stage;
    if (statusBar.style.opacity <= 0) {
      state.statusFadeIndex = null;
    }
  }

  var stationEl = document.getElementById("station");
  stationEl.textContent =
    "Your Station: " + stations[Math.round(state.station)];

  if (act.showDoNothing) {
    act.showDoNothing = false;
    enableButton("doNothing");
  }

  if (act.hideDoff) {
    act.hideDoff = false;
    disableButton("doff");
    disableButton("doNotDoff");
  }
}

function disableButton(elementID) {
  var element = document.getElementById(elementID);
  element.style.opacity = 0;
  element.classList.remove("clickable");
  element.onclick = "";
}

function enableButton(elementID) {
  var element = document.getElementById(elementID);
  element.style.opacity = 1;
  element.classList.add("clickable");
  element.onclick = clickAction;
}

function startAudio() {
  state.audio = new Audio("chopin-waltz-e-minor.mp3");
  state.audio.loop = true;
  state.audio.play();
}

function preloadImages() {
  galleryImages.forEach((url) => {
    var img = new Image();
    img.src = url;
  });
}

function updateScenario() {
  var act = story.acts[state.actNum];
  var newSentence = state.scenario;
  while (newSentence === state.scenario) {
    newSentence = [act.preamble, act.encounter, act.person]
      .map(_.sample)
      .join(" ")
      .trim()
      .replace(/^./, function (text) {
        return text.toUpperCase();
      });
  }
  state.scenario = newSentence;
}

// Standard Normal variate using Box-Muller transform.
// From https://stackoverflow.com/a/36481059
function gaussianRandom({ mean = 0, stdev = 1, min, max }) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  let value = z * stdev + mean;

  if (min !== undefined) {
    value = Math.max(min, value);
  }
  if (max !== undefined) {
    value = Math.min(max, value);
  }

  return value;
}

function showWarning() {
  if (Math.random() <= 0.25) {
    alert("CAREFUL!");
  } else if (Math.random() <= 0.5) {
    alert(
      "Your " +
        _.sample(observers.attributes) +
        " has been " +
        _.sample(observers.verbs) +
        " by " +
        _.sample(observers.people)
    );
  } else {
    alert("Embarrased, you resolve to be more thoughtful");
  }
}

function updateStation() {
  if (Math.random() > 0.25) {
    state.station += state.direction * Math.random() * 3;
  } else if (Math.random() > 0.125) {
    alert("SPLENDID ETIQUETTE!");
    state.station += 5 + Math.random() * 5;
  } else {
    alert(
      "Tragically, your lapse was noticed by " + _.sample(observers.people)
    );
    state.station -= 5 + Math.random() * 5;
  }
}
