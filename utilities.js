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
  if (typeof state.progressFadeIndex === "number") {
    var steps = 5;
    var stage = state.progress - state.progressFadeIndex;
    var step = 1 / steps;
    progressEl.style.opacity = 1 - step * stage;
    if (progressEl.style.opacity <= 0) {
      state.progressFadeIndex = null;
    }
  }

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
