/* ============================================================
   Lesson page renderer — the 8 fixed sections.
   URL shape:  lesson.html?course=hsk1&lesson=u1l1
   ============================================================ */

(function () {
  var el, pick, t;
  var courseId = window.UI.qs("course");
  var lessonId = window.UI.qs("lesson");
  var loc = null, data = null;

  function boot() { el = window.UI.el; pick = window.Lang.pick; t = window.Lang.t; }

  var SECTIONS = [
    { id: "overview",      key: "lesson.section.overview" },
    { id: "vocab",         key: "lesson.section.vocab" },
    { id: "dialogue",      key: "lesson.section.dialogue" },
    { id: "grammar",       key: "lesson.section.grammar" },
    { id: "pronunciation", key: "lesson.section.pronunciation" },
    { id: "practice",      key: "lesson.section.practice" },
    { id: "speaking",      key: "lesson.section.speaking" },
    { id: "quiz",          key: "lesson.section.quiz" }
  ];

  /* ---------- small builders --------------------------------------------- */

  function blockHead(n, label, tools) {
    return el("div.lblock__head", {}, [
      el("span.lblock__num", { text: String(n) }),
      el("h2", { text: label }),
      tools ? el("div.lblock__tools", {}, tools) : null
    ].filter(Boolean));
  }

  function toggleBtn(labelOnKey, labelOffKey, target, cls) {
    var on = false;
    var b = el("button.btn.btn--sm.btn--ghost", { type: "button", text: t(labelOnKey) });
    b.addEventListener("click", function () {
      on = !on;
      target.classList.toggle(cls, on);
      b.textContent = on ? t(labelOffKey) : t(labelOnKey);
    });
    return b;
  }

  function playAllBtn(items) {
    var playing = false;
    var b = el("button.btn.btn--sm.btn--tan", { type: "button", text: t("lesson.playAll") });
    b.addEventListener("click", function () {
      if (playing) { window.Speak.stop(); playing = false; b.textContent = t("lesson.playAll"); return; }
      playing = true; b.textContent = t("lesson.stop");
      window.Speak.playSequence(items, null, 400).then(function () {
        playing = false; b.textContent = t("lesson.playAll");
      });
    });
    return b;
  }

  /* ---------- 1. overview ------------------------------------------------- */
  function secOverview(host) {
    var body = el("div");
    var any = false;
    if (pick(data.overview)) { body.appendChild(el("p", { text: pick(data.overview) })); any = true; }
    if ((data.objectives || []).length) {
      any = true;
      body.appendChild(el("div.callout", {}, [
        el("strong", { text: t("lesson.objectives") }),
        el("ul.objectives", {}, data.objectives.map(function (o) { return el("li", { text: pick(o) }); }))
      ]));
    }
    if (pick(data.reference)) {
      any = true;
      body.appendChild(el("p.small.muted", { text: pick(data.reference) }));
    }
    if (!any) body.appendChild(window.UI.placeholder());
    host.appendChild(body);
  }

  /* Optional: textbook audio tracks shown as buttons in a section header. */
  function trackButtons(tracks, tools) {
    (tracks || []).forEach(function (tr) {
      var b = el("button.btn.btn--sm.btn--ghost", { type: "button" }, [
        el("span", { html: "&#9654;" }),
        el("span", { text: pick(tr.label) || tr.label || "Audio" })
      ]);
      b.addEventListener("click", function () { window.Speak.play({ audio: tr.audio }); });
      tools.push(b);
    });
  }

  /* ---------- 2. vocabulary ----------------------------------------------- */
  function secVocab(host, headTools) {
    var list = data.vocab || [];
    if (!list.length) { host.appendChild(window.UI.placeholder()); return; }

    var grid = el("div.vocab-grid");
    var wrap = el("div.vocab", {}, [grid]);

    list.forEach(function (v) {
      var card = el("div.vcard", {}, [
        el("div.vcard__top", {}, [
          el("div", { style: "flex:1" }, [
            el("div.vcard__zh", { text: v.zh || "" }),
            el("div.vcard__pinyin", { text: v.pinyin || "" })
          ]),
          window.Speak.button(v)
        ]),
        v.pos ? el("div.vcard__pos", { text: v.pos }) : null,
        el("div.vcard__gloss", {}, [
          el("span", { text: v.en || "" }),
          v.id ? el("span.id", { text: " · " + v.id }) : null
        ].filter(Boolean)),
        v.example ? el("div.vcard__ex", {}, [
          el("div", {}, [
            el("span.zh", { text: v.example.zh || "" }),
            window.Speak.button(v.example)
          ]),
          v.example.pinyin ? el("div.py", { text: v.example.pinyin }) : null,
          pick(v.example) ? el("div.tr", { text: pick(v.example) }) : null
        ].filter(Boolean)) : null
      ].filter(Boolean));
      grid.appendChild(card);
    });

    headTools.push(toggleBtn("lesson.togglePinyin", "lesson.showPinyin", wrap, "hide-pinyin"));
    headTools.push(toggleBtn("lesson.toggleTrans", "lesson.showTrans", wrap, "hide-trans"));
    headTools.push(playAllBtn(list));
    trackButtons(data.vocabTracks, headTools);
    host.appendChild(wrap);
  }

  /* ---------- 3. dialogue -------------------------------------------------- */
  function secDialogue(host, headTools) {
    var d = data.dialogue;
    if (!d || !(d.lines || []).length) { host.appendChild(window.UI.placeholder()); return; }

    var box = el("div.dlg");
    d.lines.forEach(function (l) {
      box.appendChild(el("div.dlg-line", {}, [
        el("div.dlg-line__who", { text: l.speaker || "" }),
        el("div.dlg-line__body", {}, [
          el("div.dlg-line__zh", {}, [el("span", { text: l.zh || "" }), window.Speak.button(l)]),
          l.pinyin ? el("div.dlg-line__py", { text: l.pinyin }) : null,
          pick(l) ? el("div.dlg-line__tr", { text: pick(l) }) : null
        ].filter(Boolean))
      ]));
    });

    if (pick(d.intro)) host.appendChild(el("p.muted", { text: pick(d.intro) }));
    host.appendChild(box);

    headTools.push(toggleBtn("lesson.togglePinyin", "lesson.showPinyin", box, "hide-pinyin"));
    headTools.push(toggleBtn("lesson.toggleTrans", "lesson.showTrans", box, "hide-trans"));
    headTools.push(playAllBtn(d.lines));
  }

  /* ---------- 4. grammar ---------------------------------------------------- */
  function secGrammar(host) {
    var list = data.grammar || [];
    if (!list.length) { host.appendChild(window.UI.placeholder()); return; }
    list.forEach(function (g) {
      host.appendChild(el("div.gpoint", {}, [
        el("h3", { text: pick(g.title) }),
        g.formula ? el("div.formula", { text: g.formula }) : null,
        pick(g.explain) ? el("p", { text: pick(g.explain) }) : null,
        (g.examples || []).length ? el("ul.exlist", {}, g.examples.map(function (e) {
          return el("li", {}, [
            el("div", {}, [el("span.zh", { text: e.zh || "" }), window.Speak.button(e)]),
            e.pinyin ? el("div.py", { text: e.pinyin }) : null,
            pick(e) ? el("div.tr", { text: pick(e) }) : null
          ].filter(Boolean));
        })) : null
      ].filter(Boolean)));
    });
  }

  /* ---------- 5. pronunciation ---------------------------------------------- */
  function secPronunciation(host, headTools) {
    var p = data.pronunciation;
    if (!p || (!(p.notes || []).length && !(p.drills || []).length)) {
      host.appendChild(window.UI.placeholder()); return;
    }
    (p.notes || []).forEach(function (n) {
      host.appendChild(el("div.gpoint", {}, [
        el("h3", { text: pick(n.title) }),
        el("p", { text: pick(n.body) })
      ]));
    });
    if ((p.drills || []).length) {
      var box = el("div");
      p.drills.forEach(function (d) {
        box.appendChild(el("div.drill-row", {}, [
          window.Speak.button(d),
          el("div", { style: "flex:1" }, [
            el("span.zh", { text: d.zh || "" }),
            d.pinyin ? el("span", { text: "  " + d.pinyin, style: "color:var(--maroon);font-size:.9rem" }) : null,
            pick(d) ? el("div.small.muted", { text: pick(d) }) : null
          ].filter(Boolean))
        ]));
      });
      host.appendChild(box);
      headTools.push(playAllBtn(p.drills));
    }
  }

  /* ---------- 6. practice ---------------------------------------------------- */
  function secPractice(host) {
    var list = data.exercises || [];
    if (!list.length) { host.appendChild(window.UI.placeholder()); return; }
    var box = el("div");
    host.appendChild(box);
    window.Exercises.renderList(list, box, {
      onResult: function (i, ok, already) {
        if (!already) window.Progress.setExercise(courseId, lessonId, "p" + i, ok);
      }
    });
  }

  /* ---------- 7. speaking / shadowing ---------------------------------------- */
  function secSpeaking(host, headTools) {
    var list = data.speaking || [];
    if (!list.length) { host.appendChild(window.UI.placeholder()); return; }
    if (pick(data.speakingNote)) {
      host.appendChild(el("div.callout", { text: pick(data.speakingNote) }));
    }
    host.appendChild(window.Exercises.create({ type: "shadow", items: list }, {}));
    headTools.push(playAllBtn(list));
  }

  /* ---------- 8. mini quiz ---------------------------------------------------- */
  function secQuiz(host) {
    var quiz = data.quiz;
    var qs = (quiz && quiz.questions) || [];
    if (!qs.length) { host.appendChild(window.UI.placeholder()); return; }

    var passScore = (quiz && quiz.passScore) || 70;
    var best = window.Progress.get(courseId, lessonId).quizBest;

    var intro = el("div");
    var area = el("div");
    host.appendChild(intro); host.appendChild(area);

    function showIntro() {
      intro.innerHTML = "";
      intro.appendChild(el("div.callout", {}, [
        el("div", { text: qs.length + " " + (window.Lang.get() === "id" ? "soal" : "questions") }),
        best != null ? el("div.small.muted", { text: t("quiz.best") + ": " + best + "%" }) : null,
        el("div", { style: "margin-top:.75rem" }, [
          el("button.btn", { type: "button", text: best == null ? t("quiz.start") : t("quiz.retake"), onclick: run })
        ])
      ].filter(Boolean)));
      area.innerHTML = "";
    }

    function run() {
      intro.innerHTML = "";
      var results = new Array(qs.length).fill(null);
      area.innerHTML = "";
      var box = el("div");
      area.appendChild(box);
      window.Exercises.renderList(qs, box, {
        onResult: function (i, ok, already) { if (!already) results[i] = ok; }
      });

      var submit = el("button.btn", { type: "button", text: t("quiz.submit") });
      area.appendChild(el("div", { style: "margin-top:1rem" }, [submit]));
      submit.addEventListener("click", function () {
        var right = results.filter(function (r) { return r === true; }).length;
        var score = Math.round(right / qs.length * 100);
        window.Progress.setQuizScore(courseId, lessonId, score);
        if (score >= passScore) window.Progress.setDone(courseId, lessonId, true);
        best = window.Progress.get(courseId, lessonId).quizBest;

        area.innerHTML = "";
        area.appendChild(el("div.quiz-result", {}, [
          el("div.small.muted", { text: t("quiz.score") }),
          el("div.quiz-result__score", { text: score + "%" }),
          el("p", { text: score >= passScore ? t("quiz.pass") : t("quiz.fail") }),
          el("button.btn.btn--ghost", { type: "button", text: t("quiz.retake"), onclick: run })
        ]));
        refreshDoneButton();
      });
    }

    showIntro();
  }

  /* ---------- page ------------------------------------------------------------- */

  var doneBtn = null;
  function refreshDoneButton() {
    if (!doneBtn) return;
    var rec = window.Progress.get(courseId, lessonId);
    doneBtn.textContent = rec.done ? "✓ " + t("lesson.done") : t("lesson.markDone");
    doneBtn.className = rec.done ? "btn btn--tan" : "btn";
  }

  function render() {
    boot();
    window.UI.chrome("courses");
    var main = document.getElementById("main");
    main.innerHTML = "";

    if (!loc || !data) {
      main.appendChild(el("div.wrap.section", {}, [
        el("h1", { text: t("lesson.notFound") }),
        el("p", {}, [el("a", { href: "courses.html", text: t("courses.title") })])
      ]));
      return;
    }

    document.title = pick(data.title) + " · " + window.SITE.brand;

    var wrap = el("div.wrap");
    main.appendChild(wrap);

    /* breadcrumbs */
    wrap.appendChild(el("div.crumbs", {}, [
      el("a", { href: "courses.html", text: t("courses.title") }),
      el("span", { text: "›" }),
      el("a", { href: "course.html?course=" + courseId, text: pick(loc.course.title) }),
      el("span", { text: "›" }),
      el("span", { text: pick(loc.unit.title) })
    ]));

    /* header */
    doneBtn = el("button.btn", { type: "button" });
    doneBtn.addEventListener("click", function () {
      var rec = window.Progress.get(courseId, lessonId);
      window.Progress.setDone(courseId, lessonId, !rec.done);
      refreshDoneButton();
    });

    wrap.appendChild(el("div.lesson-head", {}, [
      el("div.eyebrow", { text: t("course.lesson") + " " + (loc.index + 1) + " · " + pick(loc.unit.title) }),
      el("div.lesson-head__title", {}, [
        el("h1", {}, [
          el("span.lesson-head__zh", { text: (data.title && data.title.zh) || "" }),
          el("span", { text: " " })
        ]),
        el("div", { style: "flex:1" }, [
          el("div", { style: "font-size:1.15rem;font-weight:500", text: pick(data.title) }),
          (data.title && data.title.pinyin) ? el("div.muted", { text: data.title.pinyin }) : null
        ].filter(Boolean)),
        doneBtn
      ])
    ]));
    refreshDoneButton();

    /* layout: side nav + sections */
    var navOl = el("ol");
    var sectionsHost = el("div");
    wrap.appendChild(el("div.lesson-layout", {}, [
      el("aside.lesson-nav", {}, [navOl]),
      sectionsHost
    ]));

    var builders = {
      overview: secOverview, vocab: secVocab, dialogue: secDialogue,
      grammar: secGrammar, pronunciation: secPronunciation,
      practice: secPractice, speaking: secSpeaking, quiz: secQuiz
    };

    SECTIONS.forEach(function (s, i) {
      navOl.appendChild(el("li", {}, [el("a", { href: "#sec-" + s.id, text: t(s.key), "data-sec": s.id })]));

      var block = el("section.lblock", { id: "sec-" + s.id });
      var tools = [];
      var body = el("div");
      block.appendChild(el("div", { id: "head-" + s.id }));
      block.appendChild(body);
      builders[s.id](body, tools);
      block.replaceChild(blockHead(i + 1, t(s.key), tools), block.firstChild);
      sectionsHost.appendChild(block);
    });

    /* prev / next */
    sectionsHost.appendChild(el("div.lesson-foot", {}, [
      loc.prev ? el("a.btn.btn--ghost", {
        href: "lesson.html?course=" + courseId + "&lesson=" + loc.prev.lesson.id,
        text: "← " + t("lesson.prev")
      }) : el("span"),
      loc.next ? el("a.btn", {
        href: "lesson.html?course=" + courseId + "&lesson=" + loc.next.lesson.id,
        text: t("lesson.next") + " →"
      }) : el("a.btn.btn--ghost", { href: "course.html?course=" + courseId, text: pick(loc.course.title) })
    ]));

    /* highlight the section you are reading */
    var links = navOl.querySelectorAll("a");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id.replace("sec-", "");
        Array.prototype.forEach.call(links, function (a) {
          a.classList.toggle("is-active", a.getAttribute("data-sec") === id);
        });
      });
    }, { rootMargin: "-90px 0px -65% 0px" });
    SECTIONS.forEach(function (s) {
      var n = document.getElementById("sec-" + s.id); if (n) obs.observe(n);
    });
  }

  function start() {
    boot();
    loc = window.Catalog.locate(courseId, lessonId);
    if (!loc) { render(); return; }
    window.LessonLoader.load(courseId, lessonId).then(function (d) {
      data = d; render();
    }).catch(function (err) {
      console.error(err);
      data = null; render();
    });
  }

  document.addEventListener("DOMContentLoaded", start);
  window.UI.onLangChange(function () { if (data) render(); else start(); });
})();
