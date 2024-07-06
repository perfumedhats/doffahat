function syncUI() {
  var act = story.acts[state.actNum];
  updateText();
  if (act.isEndgame) {
    if (act.counter <= 8) {
      document.body.style.opacity = (act.counter - 1) / 7;
    }
    if (act.counter === 1) {
      document.body.innerHTML = "";
      return;
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
  stationEl.textContent = stations[Math.round(state.station)];
  stationEl.style.color = stationColor();

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

function fadeAudio() {
  state.audio.volume = Math.max(0, state.audio.volume - 0.1);
  if (state.audio.volume <= 0) {
    state.audio.pause();
  } else {
    setTimeout(fadeAudio, 40);
  }
}

function preloadImages() {
  state.galleryImages.forEach((url) => {
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

function showAccolade() {
  const capriciousFate = Math.random();
  if (capriciousFate < 0.5) {
    showVerboseAlert(true);
  } else {
    alert("SPLENDID ETIQUETTE!");
  }
}

function showWarning() {
  const capriciousFate = Math.random();
  if (capriciousFate < 0.5) {
    showVerboseAlert(false);
  } else {
    alert(
      _.sample(["Embarrased, you resolve to be more thoughtful", "CAREFUL!"])
    );
  }
}

function showVerboseAlert(isGood) {
  alert(
    (isGood ? "Your " : "Tragically, your ") +
      _.sample(observers.attributes) +
      " has been " +
      _.sample(observers.verbs) +
      " by " +
      _.sample(observers.people)
  );
}

function stationColor() {
  const standing = state.station - state.stationMidpoint,
    // How far from neutral you can go
    maxGood = stations.length - state.stationMidpoint - 1,
    maxBad = state.stationMidpoint,
    // A percentage
    relativeStanding = standing > 0 ? standing / maxGood : standing / maxBad,
    hue = standing > 0 ? 120 : 0;

  // 42 is the maximum luminocity that looks good
  return (
    "hsl(" + hue + ", 100%, " + (10 + 32 * Math.abs(relativeStanding)) + "%)"
  );
}
