/* ============================================================
   courses.html  (all courses)  and  course.html?course=hsk1  (one course)
   ============================================================ */
(function () {
  var el, pick, t;

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

  /* ---------- all courses ------------------------------------------------- */
  function renderIndex() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    document.title = t("courses.title") + " · " + window.SITE.brand;
    main.appendChild(el("section.section", {}, [
      el("div.wrap", {}, [
        el("div.section__head", {}, [
          el("div.eyebrow", { text: window.SITE.kicker }),
          el("h1", { text: t("courses.title") }),
          el("p.muted", { text: t("courses.lead") })
        ]),
        el("div.grid.grid--3", {}, window.Catalog.courses().map(courseCard))
      ])
    ]));
  }

  /* ---------- one course -------------------------------------------------- */
  function renderCourse(c) {
    var main = document.getElementById("main");
    main.innerHTML = "";
    document.title = pick(c.title) + " · " + window.SITE.brand;
    var st = window.Progress.courseStats(c);

    var wrap = el("div.wrap");
    main.appendChild(wrap);

    wrap.appendChild(el("div.crumbs", {}, [
      el("a", { href: "courses.html", text: t("course.backAll") }),
      el("span", { text: "›" }),
      el("span", { text: pick(c.title) })
    ]));

    wrap.appendChild(el("div.lesson-head", {}, [
      el("div.eyebrow", { text: c.badge || c.id.toUpperCase() }),
      el("h1", {}, [
        el("span", { text: pick(c.title) }),
        c.zh ? el("span.lesson-head__zh", { text: "  " + c.zh }) : null
      ].filter(Boolean)),
      el("p.muted", { text: pick(c.blurb) }),
      el("div.bar", { style: "max-width:420px" }, [el("i", { style: "width:" + st.pct + "%" })]),
      el("div.small.muted", { style: "margin-top:.5rem", text: st.done + " / " + st.total + " " + t("courses.lessons") })
    ]));

    (c.units || []).forEach(function (u, ui) {
      var box = el("section.section", { style: "padding-top:0" });
      box.appendChild(el("div.section__head", { style: "margin-bottom:1rem" }, [
        el("div.eyebrow", { text: t("course.unit") + " " + (ui + 1) }),
        el("h2", {}, [
          el("span", { text: pick(u.title) }),
          u.zh ? el("span.zh", { text: "  " + u.zh, style: "color:var(--tan-deep)" }) : null
        ].filter(Boolean)),
        pick(u.blurb) ? el("p.muted", { text: pick(u.blurb) }) : null
      ].filter(Boolean)));

      var lessons = u.lessons || [];
      if (!lessons.length) {
        box.appendChild(el("p.muted", { text: t("course.empty") }));
      } else {
        box.appendChild(el("div.grid.grid--3", {}, lessons.map(function (l, li) {
          var draft = l.status === "draft";
          var rec = window.Progress.get(c.id, l.id);
          return el((draft ? "div" : "a") + ".card" + (draft ? ".card--muted" : ""),
            draft ? {} : { href: "lesson.html?course=" + c.id + "&lesson=" + l.id },
            [
              el("div.card__top", {}, [
                el("span.chip" + (rec.done ? ".chip--done" : draft ? ".chip--soon" : ""), {
                  text: draft ? t("course.locked") : (rec.done ? "✓ " + t("lesson.done") : t("course.lesson") + " " + (li + 1))
                }),
                l.zh ? el("span.zh", { text: l.zh, style: "color:var(--maroon)" }) : null
              ].filter(Boolean)),
              el("h3.card__title", { text: pick(l.title) }),
              l.pinyin ? el("div.card__meta", { text: l.pinyin }) : null,
              pick(l.blurb) ? el("p.card__meta", { text: pick(l.blurb) }) : null,
              (rec.quizBest != null) ? el("div.small.muted", { text: t("quiz.best") + ": " + rec.quizBest + "%" }) : null
            ].filter(Boolean));
        })));
      }
      wrap.appendChild(box);
    });
  }

  function render() {
    el = window.UI.el; pick = window.Lang.pick; t = window.Lang.t;
    window.UI.chrome("courses");
    var id = window.UI.qs("course");
    var c = id ? window.Catalog.course(id) : null;
    if (id && c) renderCourse(c);
    else renderIndex();
  }

  document.addEventListener("DOMContentLoaded", render);
  window.UI.onLangChange(render);
})();
