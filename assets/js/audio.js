/* ============================================================
   Audio.
   1. If the lesson data gives an "audio" filename, play that mp3
      from assets/audio/<filename>.
   2. If there is no file (or the file is missing), fall back to the
      browser's built-in Chinese voice so every word is still playable.
   ============================================================ */

window.Speak = (function () {
  var AUDIO_BASE = "assets/audio/";
  var current = null;      // currently playing HTMLAudioElement
  var queueStop = false;
  var voice = null;

  function pickVoice() {
    if (!("speechSynthesis" in window)) return null;
    var vs = window.speechSynthesis.getVoices() || [];
    voice = vs.filter(function (v) { return /^zh(-|_)?(CN|Hans)?/i.test(v.lang); })[0] ||
            vs.filter(function (v) { return /^zh/i.test(v.lang); })[0] || null;
    return voice;
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  function stop() {
    queueStop = true;
    if (current) { try { current.pause(); } catch (e) {} current = null; }
    if ("speechSynthesis" in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  function tts(text) {
    return new Promise(function (resolve) {
      if (!("speechSynthesis" in window) || !text) { resolve(false); return; }
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.lang = (window.SITE && window.SITE.speech && window.SITE.speech.lang) || "zh-CN";
        u.rate = (window.SITE && window.SITE.speech && window.SITE.speech.rate) || 0.85;
        if (voice) u.voice = voice;
        u.onend = function () { resolve(true); };
        u.onerror = function () { resolve(false); };
        window.speechSynthesis.speak(u);
      } catch (e) { resolve(false); }
    });
  }

  function file(src) {
    return new Promise(function (resolve) {
      var a = new Audio(AUDIO_BASE + src);
      current = a;
      a.onended = function () { current = null; resolve(true); };
      a.onerror = function () { current = null; resolve(false); };
      var p = a.play();
      if (p && p.catch) p.catch(function () { current = null; resolve(false); });
    });
  }

  /* play({ audio: "hsk1/u1l1/nihao.mp3", zh: "你好" }) — or play("你好") */
  function play(item) {
    queueStop = false;
    stopQuiet();
    if (typeof item === "string") return tts(item);
    if (!item) return Promise.resolve(false);
    if (item.audio) {
      return file(item.audio).then(function (ok) { return ok ? true : tts(item.zh); });
    }
    return tts(item.zh);
  }

  function stopQuiet() {
    if (current) { try { current.pause(); } catch (e) {} current = null; }
    if ("speechSynthesis" in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  /* Play a list of items one after another. onStep(index) fires before each. */
  function playSequence(items, onStep, gapMs) {
    queueStop = false;
    var i = 0;
    function next() {
      if (queueStop || i >= items.length) { if (onStep) onStep(-1); return Promise.resolve(); }
      var idx = i++;
      if (onStep) onStep(idx);
      return play(items[idx]).then(function () {
        return new Promise(function (r) { setTimeout(r, gapMs == null ? 350 : gapMs); });
      }).then(next);
    }
    return next();
  }

  /* A reusable little speaker button. */
  function button(item, cls) {
    var b = document.createElement("button");
    b.className = "iconbtn " + (cls || "");
    b.type = "button";
    b.setAttribute("aria-label", "Play audio");
    b.innerHTML = "&#9654;";
    b.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      b.classList.add("is-playing");
      play(item).then(function () { b.classList.remove("is-playing"); });
    });
    return b;
  }

  return { play: play, stop: stop, playSequence: playSequence, button: button };
})();
