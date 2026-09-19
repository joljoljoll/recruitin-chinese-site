/* ============================================================
   Home page
   ============================================================ */
(function () {
  var el, pick, t;

  var FLOW = [
    { n: "1", key: "lesson.section.overview" },
    { n: "2", key: "lesson.section.vocab" },
    { n: "3", key: "lesson.section.dialogue" },
    { n: "4", key: "lesson.section.grammar" },
    { n: "5", key: "lesson.section.pronunciation" },
    { n: "6", key: "lesson.section.practice" },
    { n: "7", key: "lesson.section.speaking" },
    { n: "8", key: "lesson.section.quiz" }
  ];

  function firstLessonHref() {
    var cs = window.Catalog.courses();
    for (var i = 0; i < cs.length; i++) {
      var units = cs[i].units || [];
      for (var j = 0; j < units.length; j++) {
        var ls = units[j].lessons || [];
        for (var k = 0; k < ls.length; k++) {
          if (ls[k].status !== "draft") return "lesson.html?course=" + cs[i].id + "&lesson=" + ls[k].id;
        }
      }
    }
    return "courses.html";
  }

  function courseCard(c) {
    var st = window.Progress.courseStats(c);
    var soon = c.status === "soon";
    return el((soon ? "div" : "a") + ".card" + (soon ? ".card--muted" : ""),
      soon ? {} : { href: "course.html?course=" + c.id },
      [
        el("div.card__top", {}, [
          el("span.chip" + (soon ? ".chip--soon" : ""), { text: c.badge || (soon ? t("courses.soon") : c.id.toUpperCase()) }),
          c.zh ? el("span.zh", { text: c.zh, style: "font-size:1.4rem;color:var(--tan-deep)" }) : null
        ].filter(Boolean)),
        el("h3.card__title", { text: pick(c.title) }),
        el("p.card__meta", { text: pick(c.blurb) }),
        soon ? null : el("div.card__meta.small", {
          text: (c.units || []).length + " " + t("courses.units") + " · " + window.Catalog.lessonCount(c) + " " + t("courses.lessons")
        }),
        soon ? null : el("div.bar", {}, [el("i", { style: "width:" + st.pct + "%" })])
      ].filter(Boolean));
  }

  function progressPanel() {
    var rows = [];
    window.Catalog.courses().forEach(function (c) {
      if (c.status === "soon") return;
      var st = window.Progress.courseStats(c);
      if (!st.total) return;
      rows.push(el("div.card", {}, [
        el("div.card__top", {}, [
          el("strong", { text: pick(c.title) }),
          el("span.chip" + (st.pct === 100 ? ".chip--done" : ""), { text: st.done + " / " + st.total })
        ]),
        el("div.bar", {}, [el("i", { style: "width:" + st.pct + "%" })])
      ]));
    });
    return rows;
  }

  function render() {
    el = window.UI.el; pick = window.Lang.pick; t = window.Lang.t;
    window.UI.chrome("home");
    document.title = window.SITE.brand;

    var main = document.getElementById("main");
    main.innerHTML = "";

    /* hero */
    main.appendChild(el("section.hero", {}, [
      el("div.wrap", {}, [
        el("div.hero__grid", {}, [
          el("div", {}, [
            el("div.eyebrow", { text: window.SITE.kicker }),
            el("h1", { text: pick(window.SITE.tagline) }),
            el("p.hero__lead", { text: pick(window.SITE.intro) }),
            el("div.hero__cta", {}, [
              el("a.btn", { href: firstLessonHref(), text: t("home.start") }),
              el("a.btn.btn--ghost", { href: "courses.html", text: t("home.browse") })
            ])
          ]),
          el("div.hero__card", {}, [
            el("div.hero__char", { text: window.SITE.logoChar || "中" }),
            el("div.center.muted.small", { text: "zhōng" }),
            el("div.bar", {}, [el("i", { style: "width:35%" })]),
            el("p.small.muted.center", { style: "margin-top:1rem;margin-bottom:0", text: t("home.progressLead") })
          ])
        ])
      ])
    ]));

    /* courses */
    main.appendChild(el("section.section", {}, [
      el("div.wrap", {}, [
        el("div.section__head", {}, [
          el("div.eyebrow", { text: t("nav.courses") }),
          el("h2", { text: t("home.coursesTitle") }),
          el("p.muted", { text: t("home.coursesLead") })
        ]),
        el("div.grid.grid--3", {}, window.Catalog.courses().map(courseCard))
      ])
    ]));

    /* lesson shape */
    main.appendChild(el("section.section.section--alt", {}, [
      el("div.wrap", {}, [
        el("div.section__head", {}, [
          el("h2", { text: t("home.howTitle") }),
          el("p.muted", { text: t("home.howLead") })
        ]),
        el("div.grid.grid--3", {}, FLOW.map(function (f) {
          return el("div.card", {}, [
            el("div.card__top", {}, [el("span.lblock__num", { text: f.n })]),
            el("strong", { text: t(f.key) })
          ]);
        }))
      ])
    ]));

    /* progress */
    var rows = progressPanel();
    main.appendChild(el("section.section", {}, [
      el("div.wrap", {}, [
        el("div.section__head", {}, [
          el("h2", { text: t("home.progressTitle") }),
          el("p.muted", { text: t("home.progressLead") })
        ]),
        rows.length ? el("div.grid.grid--3", {}, rows) : el("p.muted", { text: t("home.noProgress") }),
        el("div", { style: "margin-top:1.5rem" }, [
          el("button.btn.btn--ghost.btn--sm", {
            type: "button", text: t("home.reset"),
            onclick: function () { if (confirm(t("home.resetConfirm"))) { window.Progress.reset(); render(); } }
          })
        ])
      ])
    ]));
  }

  document.addEventListener("DOMContentLoaded", render);
  window.UI.onLangChange(render);
})();
