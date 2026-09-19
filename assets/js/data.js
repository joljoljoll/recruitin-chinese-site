/* ============================================================
   Data loading.
   Lesson content lives in data/courses/<course>/<lesson>.js
   Each of those files calls registerLesson({ ... }).
   We load them by adding a <script> tag, which means the site also
   works when you just double-click index.html (no server needed).
   ============================================================ */

window.CATALOG = null;
window.LESSONS = {};

window.registerCatalog = function (obj) { window.CATALOG = obj; };
window.registerLesson  = function (obj) {
  if (!obj || !obj.course || !obj.id) { console.warn("registerLesson: missing course/id", obj); return; }
  window.LESSONS[obj.course + "/" + obj.id] = obj;
};

window.Catalog = (function () {
  function courses() { return (window.CATALOG && window.CATALOG.courses) || []; }

  function course(id) {
    return courses().filter(function (c) { return c.id === id; })[0] || null;
  }

  /* Returns { course, unit, lesson, index, prev, next } for a lesson id */
  function locate(courseId, lessonId) {
    var c = course(courseId);
    if (!c) return null;
    var flat = [];
    (c.units || []).forEach(function (u) {
      (u.lessons || []).forEach(function (l) { flat.push({ unit: u, lesson: l }); });
    });
    var i = -1;
    for (var k = 0; k < flat.length; k++) { if (flat[k].lesson.id === lessonId) { i = k; break; } }
    if (i < 0) return null;
    return {
      course: c,
      unit: flat[i].unit,
      lesson: flat[i].lesson,
      index: i,
      prev: i > 0 ? flat[i - 1] : null,
      next: i < flat.length - 1 ? flat[i + 1] : null
    };
  }

  /* Lessons that are actually published (not marked status:"draft") */
  function lessonCount(c) {
    var n = 0;
    (c.units || []).forEach(function (u) {
      (u.lessons || []).forEach(function (l) { if (l.status !== "draft") n++; });
    });
    return n;
  }

  return { courses: courses, course: course, locate: locate, lessonCount: lessonCount };
})();

window.LessonLoader = (function () {
  var pending = {};

  function load(courseId, lessonId) {
    var key = courseId + "/" + lessonId;
    if (window.LESSONS[key]) return Promise.resolve(window.LESSONS[key]);
    if (pending[key]) return pending[key];

    pending[key] = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "data/courses/" + courseId + "/" + lessonId + ".js";
      s.onload = function () {
        if (window.LESSONS[key]) resolve(window.LESSONS[key]);
        else reject(new Error("File loaded but registerLesson() was not called: " + s.src));
      };
      s.onerror = function () { reject(new Error("Could not load " + s.src)); };
      document.head.appendChild(s);
    });
    return pending[key];
  }

  return { load: load };
})();
