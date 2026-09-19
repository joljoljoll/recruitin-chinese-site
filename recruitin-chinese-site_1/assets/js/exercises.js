/* ============================================================
   Reusable exercise components.
   Every type takes the same shape and gives instant feedback.

   Supported "type" values:
     mcq | fill | match | order | translate | dialogue | listening | shadow

   See docs/CONTENT-GUIDE.md for the data shape of each one.
   ============================================================ */

window.Exercises = (function () {
  var el = null, pick = null, t = null;
  function boot() { el = window.UI.el; pick = window.Lang.pick; t = window.Lang.t; }

  /* ---------- helpers ---------------------------------------------------- */

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* Make loose text comparison forgiving: ignore case, spaces and punctuation. */
  function norm(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/[\s ]+/g, "")
      .replace(/[.,!?;:'"`~。，！？；：、“”‘’（）()\[\]【】—\-_]/g, "");
  }

  function matchesAny(input, answers) {
    var list = Array.isArray(answers) ? answers : [answers];
    var n = norm(input);
    for (var i = 0; i < list.length; i++) { if (norm(list[i]) === n) return true; }
    return false;
  }

  /* An option can be a plain string or an object {zh,pinyin,en,id}. */
  function optionNode(o) {
    if (o == null) return document.createTextNode("");
    if (typeof o === "string") return el("span", { text: o });
    var box = el("span", {}, []);
    if (o.zh) box.appendChild(el("span.zh", { text: o.zh }));
    if (o.pinyin) box.appendChild(el("span", { text: " " + o.pinyin, style: "color:var(--maroon);font-size:.85rem" }));
    var gloss = pick(o);
    if (!o.zh && gloss) box.appendChild(el("span", { text: gloss }));
    else if (gloss && (o.en || o.id)) box.appendChild(el("span", { text: " — " + gloss, style: "color:var(--text-muted);font-size:.88rem" }));
    return box;
  }

  function feedback() { return el("div.fb", { role: "status" }); }

  function say(fbNode, ok, msg) {
    fbNode.className = "fb " + (ok ? "is-ok" : "is-bad");
    fbNode.innerHTML = "";
    fbNode.appendChild(el("strong", { text: ok ? t("ex.correct") : t("ex.wrong") }));
    if (msg) fbNode.appendChild(el("span", { text: msg }));
  }

  function shell(ex, index, total) {
    var node = el("div.ex", { "data-type": ex.type });
    var head = el("div.ex__head", {}, [
      el("span.ex__kind", { text: t("ex.kind." + ex.type) || ex.type })
    ]);
    if (total) head.appendChild(el("span.ex__n", { text: (index + 1) + " / " + total }));
    node.appendChild(head);
    var p = pick(ex.prompt);
    if (p) node.appendChild(el("div.ex__prompt", { text: p }));
    return node;
  }

  /* ---------- 1. multiple choice ---------------------------------------- */
  function mcq(ex, node, fb, done) {
    if (ex.stem) {
      var stem = (typeof ex.stem === "string") ? { zh: ex.stem, audio: ex.audio } : ex.stem;
      node.appendChild(el("div.ex__stem", {}, [
        el("span.zh", { text: stem.zh || "" }),
        stem.zh ? window.Speak.button(stem) : null
      ].filter(Boolean)));
    }

    var opts = el("div.opts");
    var buttons = [];
    (ex.options || []).forEach(function (o, i) {
      var b = el("button.opt", { type: "button" }, [
        el("span.opt__key", { text: "ABCDEF"[i] }), optionNode(o)
      ]);
      b.addEventListener("click", function () {
        if (b.disabled) return;
        buttons.forEach(function (x) { x.disabled = true; });
        var ok = (i === ex.answer);
        b.classList.add(ok ? "is-correct" : "is-wrong");
        if (!ok) buttons[ex.answer] && buttons[ex.answer].classList.add("is-correct");
        say(fb, ok, pick(ex.explain));
        done(ok);
      });
      buttons.push(b); opts.appendChild(b);
    });
    node.appendChild(opts);
    return { reset: function () {
      buttons.forEach(function (x) { x.disabled = false; x.className = "opt"; });
      fb.className = "fb";
    } };
  }

  /* ---------- 2. fill in the blank -------------------------------------- */
  function fill(ex, node, fb, done) {
    var wrap = el("div.blankwrap");
    var parts = String(ex.sentence || "").split("___");
    var inputs = [];
    parts.forEach(function (chunk, i) {
      wrap.appendChild(document.createTextNode(chunk));
      if (i < parts.length - 1) {
        var inp = el("input.blank", { type: "text", autocomplete: "off", spellcheck: "false" });
        inputs.push(inp); wrap.appendChild(inp);
      }
    });
    node.appendChild(wrap);
    if (ex.hint) node.appendChild(el("div.small.muted", { text: pick(ex.hint), style: "margin-top:.5rem" }));

    var answers = Array.isArray(ex.answers) ? ex.answers : [ex.answers];

    var check = el("button.btn.btn--sm", { type: "button", text: t("ex.check") });
    var reveal = el("button.btn.btn--sm.btn--ghost", { type: "button", text: t("ex.showAnswer") });
    node.appendChild(el("div.ex__actions", {}, [check, reveal]));

    function grade() {
      var allOk = true;
      inputs.forEach(function (inp, i) {
        var expected = answers[i];
        var ok = matchesAny(inp.value, expected);
        inp.className = "blank " + (ok ? "is-correct" : "is-wrong");
        if (!ok) allOk = false;
      });
      say(fb, allOk, allOk ? pick(ex.explain) : (t("ex.answerIs") + " " +
        answers.map(function (a) { return Array.isArray(a) ? a[0] : a; }).join(" / ")));
      done(allOk);
    }
    check.addEventListener("click", grade);
    reveal.addEventListener("click", function () {
      inputs.forEach(function (inp, i) {
        var a = answers[i]; inp.value = Array.isArray(a) ? a[0] : a; inp.className = "blank";
      });
      say(fb, false, t("ex.answerIs") + " " + answers.map(function (a) { return Array.isArray(a) ? a[0] : a; }).join(" / "));
      done(false);
    });
    return {};
  }

  /* ---------- 3. matching ------------------------------------------------ */
  function match(ex, node, fb, done) {
    var pairs = ex.pairs || [];
    var left = el("div.match__col"), right = el("div.match__col");
    var selected = null, solved = 0, mistakes = 0;

    pairs.forEach(function (p, i) {
      var b = el("button.match__item", { type: "button", "data-i": i }, [optionNode(p.left)]);
      b.addEventListener("click", function () {
        if (b.classList.contains("is-done")) return;
        Array.prototype.forEach.call(left.children, function (x) { x.classList.remove("is-sel"); });
        b.classList.add("is-sel"); selected = { i: i, node: b };
      });
      left.appendChild(b);
    });

    shuffle(pairs.map(function (p, i) { return { i: i, p: p }; })).forEach(function (o) {
      var b = el("button.match__item", { type: "button" }, [optionNode(o.p.right)]);
      b.addEventListener("click", function () {
        if (b.classList.contains("is-done") || !selected) return;
        if (selected.i === o.i) {
          b.classList.add("is-done"); selected.node.classList.add("is-done");
          selected.node.classList.remove("is-sel"); selected = null; solved++;
          if (solved === pairs.length) { say(fb, mistakes === 0, pick(ex.explain)); done(mistakes === 0); }
        } else {
          mistakes++;
          b.classList.add("is-wrong");
          setTimeout(function () { b.classList.remove("is-wrong"); }, 380);
        }
      });
      right.appendChild(b);
    });

    node.appendChild(el("div.match", {}, [left, right]));
    return {};
  }

  /* ---------- 4. sentence ordering -------------------------------------- */
  function order(ex, node, fb, done) {
    var answer = ex.answer || [];
    var tray = el("div.tokentray", { "data-placeholder": t("ex.buildHere") });
    var pool = el("div.tokens");
    node.appendChild(tray); node.appendChild(pool);

    function mk(word, home) {
      var b = el("button.token", { type: "button", text: word });
      b.addEventListener("click", function () {
        if (b.parentNode === pool) tray.appendChild(b); else pool.appendChild(b);
        fb.className = "fb";
      });
      home.appendChild(b);
      return b;
    }
    shuffle(answer).forEach(function (w) { mk(w, pool); });

    var check = el("button.btn.btn--sm", { type: "button", text: t("ex.check") });
    var clear = el("button.btn.btn--sm.btn--ghost", { type: "button", text: t("ex.clear") });
    node.appendChild(el("div.ex__actions", {}, [check, clear]));

    check.addEventListener("click", function () {
      var built = Array.prototype.map.call(tray.children, function (x) { return x.textContent; }).join("");
      var ok = norm(built) === norm(answer.join(""));
      say(fb, ok, ok ? pick(ex.explain) : (t("ex.answerIs") + " " + answer.join("")));
      done(ok);
    });
    clear.addEventListener("click", function () {
      Array.prototype.slice.call(tray.children).forEach(function (x) { pool.appendChild(x); });
      fb.className = "fb";
    });
    return {};
  }

  /* ---------- 5. translation -------------------------------------------- */
  function translate(ex, node, fb, done) {
    var src = ex.source;
    var srcText = (typeof src === "string") ? src : (src && (src.zh || pick(src))) || "";
    var box = el("div.ex__stem", {}, [
      el("span" + (src && src.zh ? ".zh" : ""), { text: srcText }),
      (src && src.zh) ? window.Speak.button(src) : null
    ].filter(Boolean));
    node.appendChild(box);
    if (src && src.zh && src.pinyin) node.appendChild(el("div.small", { text: src.pinyin, style: "color:var(--maroon);margin:-.6rem 0 .8rem" }));

    var ta = el("textarea.answerbox", { placeholder: t("ex.typeHere"), rows: "2" });
    node.appendChild(ta);

    var check = el("button.btn.btn--sm", { type: "button", text: t("ex.check") });
    var reveal = el("button.btn.btn--sm.btn--ghost", { type: "button", text: t("ex.showAnswer") });
    node.appendChild(el("div.ex__actions", {}, [check, reveal]));

    var answers = Array.isArray(ex.answers) ? ex.answers : [ex.answers];
    check.addEventListener("click", function () {
      var ok = matchesAny(ta.value, answers);
      say(fb, ok, ok ? pick(ex.explain) : (t("ex.answerIs") + " " + answers[0]));
      done(ok);
    });
    reveal.addEventListener("click", function () {
      ta.value = answers[0];
      say(fb, false, t("ex.answerIs") + " " + answers[0]);
      done(false);
    });
    return {};
  }

  /* ---------- 6. dialogue response --------------------------------------- */
  function dialogue(ex, node, fb, done) {
    var line = ex.line || {};
    node.appendChild(el("div.dlg-line", {}, [
      el("div.dlg-line__who", { text: line.speaker || "A" }),
      el("div.dlg-line__body", {}, [
        el("div.dlg-line__zh", {}, [
          el("span", { text: line.zh || "" }),
          window.Speak.button(line)
        ]),
        line.pinyin ? el("div.dlg-line__py", { text: line.pinyin }) : null,
        pick(line) ? el("div.dlg-line__tr", { text: pick(line) }) : null
      ].filter(Boolean))
    ]));
    node.appendChild(el("div", { style: "height:.9rem" }));
    return mcq(ex, node, fb, done);
  }

  /* ---------- 7. listening ----------------------------------------------- */
  function listening(ex, node, fb, done) {
    var clip = ex.clip || { zh: ex.audioText, audio: ex.audio };
    var play = el("button.btn.btn--tan.btn--sm", { type: "button" }, [
      el("span", { html: "&#9654;" }), el("span", { text: t("ex.listenAgain") })
    ]);
    play.addEventListener("click", function () { window.Speak.play(clip); });
    node.appendChild(el("div", { style: "margin-bottom:1rem" }, [play]));
    // autoplay once when the exercise first appears is intentionally NOT done —
    // browsers block it and it surprises learners.
    var api = mcq({ type: "mcq", options: ex.options, answer: ex.answer, explain: ex.explain }, node, fb, done);
    return api;
  }

  /* ---------- 8. listen & repeat (shadowing) ----------------------------- */
  function shadow(ex, node, fb, done) {
    var items = ex.items || (ex.zh ? [ex] : []);
    items.forEach(function (it) {
      var rate = el("div.rate", {}, [
        rateBtn(t("ex.again")), rateBtn(t("ex.ok")), rateBtn(t("ex.good"))
      ]);
      Array.prototype.forEach.call(rate.children, function (b, i) {
        b.addEventListener("click", function () {
          Array.prototype.forEach.call(rate.children, function (x) { x.classList.remove("is-on"); });
          b.classList.add("is-on");
          done(i >= 1);
        });
      });
      node.appendChild(el("div.shadow-row", {}, [
        window.Speak.button(it),
        el("div.shadow-row__body", {}, [
          el("div.zh", { text: it.zh || "" }),
          it.pinyin ? el("div.py", { text: it.pinyin }) : null,
          pick(it) ? el("div.tr", { text: pick(it) }) : null
        ].filter(Boolean)),
        rate
      ]));
    });
    if (items.length) node.appendChild(el("div.small.muted", { text: t("ex.selfCheck") }));
    return {};
  }
  function rateBtn(label) { return window.UI.el("button", { type: "button", text: label }); }

  var RENDERERS = {
    mcq: mcq, fill: fill, match: match, order: order,
    translate: translate, dialogue: dialogue, listening: listening, shadow: shadow
  };

  /* ---------- public ------------------------------------------------------ */

  /* create(ex, {index, total, onResult}) -> DOM node */
  function create(ex, opts) {
    boot();
    opts = opts || {};
    var fn = RENDERERS[ex.type];
    var node = shell(ex, opts.index || 0, opts.total || 0);
    if (!fn) {
      node.appendChild(window.UI.placeholder('Unknown exercise type: "' + ex.type + '"'));
      return node;
    }
    var fb = feedback();
    var reported = false;
    fn(ex, node, fb, function (ok) {
      if (opts.onResult) opts.onResult(ok, reported);
      reported = true;
    });
    node.appendChild(fb);
    return node;
  }

  /* renderList(list, container, {idPrefix, onResult}) */
  function renderList(list, container, opts) {
    boot();
    opts = opts || {};
    container.innerHTML = "";
    (list || []).forEach(function (ex, i) {
      container.appendChild(create(ex, {
        index: i, total: list.length,
        onResult: function (ok, already) {
          if (opts.onResult) opts.onResult(i, ok, already);
        }
      }));
    });
  }

  return { create: create, renderList: renderList, shuffle: shuffle, norm: norm };
})();
