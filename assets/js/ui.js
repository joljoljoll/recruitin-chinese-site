/* ============================================================
   Shared UI: header, footer, small DOM helpers.
   ============================================================ */

window.UI = (function () {

  /* ---- tiny DOM helper: el("div.card", {}, [child, "text"]) ---- */
  function el(sel, attrs, kids) {
    var parts = String(sel).split(".");
    var tag = parts.shift() || "div";
    var node = document.createElement(tag);
    if (parts.length) node.className = parts.join(" ");
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v == null || v === false) continue;
        if (k === "html") node.innerHTML = v;
        else if (k === "text") node.textContent = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      }
    }
    (kids || []).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  /* ---- header ---------------------------------------------------------- */
  function header(active) {
    var t = window.Lang.t;
    var host = document.getElementById("site-header");
    if (!host) return;

    var links = [
      { href: "index.html",   key: "nav.home",    id: "home" },
      { href: "courses.html", key: "nav.courses", id: "courses" }
    ];

    var nav = el("nav.nav", { id: "main-nav" },
      links.map(function (l) {
        return el("a" + (active === l.id ? ".is-active" : ""), { href: l.href, text: t(l.key) });
      }).concat([langToggle()])
    );

    var burger = el("button.iconbtn.navtoggle", {
      type: "button", "aria-label": t("nav.menu"), html: "&#9776;",
      onclick: function () { nav.classList.toggle("is-open"); }
    });

    host.innerHTML = "";
    host.className = "site-header";
    host.appendChild(
      el("div.wrap", {}, [
        el("div.site-header__inner", {}, [
          el("a.logo", { href: "index.html" }, [
            el("span.logo__mark", { text: window.SITE.logoChar || "中" }),
            el("span.logo__text", {}, [
              el("strong", { text: window.SITE.brand }),
              el("small", { text: window.SITE.kicker || "" })
            ])
          ]),
          nav, burger
        ])
      ])
    );
  }

  function langToggle() {
    var cur = window.Lang.get();
    function b(code, label) {
      return el("button" + (cur === code ? ".is-active" : ""), {
        type: "button", text: label,
        onclick: function () { if (window.Lang.get() !== code) window.Lang.set(code); }
      });
    }
    return el("div.langtoggle", { role: "group", "aria-label": "Language" }, [b("id", "ID"), b("en", "EN")]);
  }

  /* ---- footer ---------------------------------------------------------- */
  function footer() {
    var t = window.Lang.t;
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    host.innerHTML = "";

    var courseLinks = window.Catalog.courses().map(function (c) {
      return el("li", {}, [el("a", { href: "course.html?course=" + c.id, text: window.Lang.pick(c.title) })]);
    });

    var contactLinks = (window.SITE.contact || []).map(function (c) {
      return el("li", {}, [el("a", { href: c.href, text: c.label, rel: "noopener" })]);
    });

    host.appendChild(el("div.wrap", {}, [
      el("div.site-footer__grid", {}, [
        el("div", {}, [
          el("strong", { text: window.SITE.brand }),
          el("p.small", { text: t("footer.note"), style: "opacity:.75;margin-top:.5rem" })
        ]),
        el("div", {}, [el("h4", { text: t("footer.learn") }), el("ul", {}, courseLinks)]),
        el("div", {}, [el("h4", { text: t("footer.contact") }), el("ul", {}, contactLinks)])
      ]),
      el("div.site-footer__bottom", {
        text: "© " + new Date().getFullYear() + " " + (window.SITE.owner || window.SITE.brand)
      })
    ]));
  }

  /* ---- chrome = header + footer + title -------------------------------- */
  function chrome(active) {
    document.documentElement.lang = window.Lang.get();
    header(active);
    footer();
  }

  /* ---- reusable placeholder block -------------------------------------- */
  function placeholder(note) {
    var t = window.Lang.t;
    return el("div.placeholder", {}, [
      el("strong", { text: t("placeholder.title") }),
      el("div", { text: note || t("placeholder.body") })
    ]);
  }

  /* Re-run a page renderer whenever the language changes */
  function onLangChange(fn) { document.addEventListener("langchange", fn); }

  return { el: el, esc: esc, qs: qs, chrome: chrome, placeholder: placeholder, onLangChange: onLangChange };
})();
