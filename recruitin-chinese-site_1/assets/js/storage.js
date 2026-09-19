/* ============================================================
   Progress saved in the browser (localStorage). No login, no server.
   Shape:
   {
     "hsk1/u1l1": {
       done: true,
       quizBest: 80,
       ex: { "practice-0": true, "practice-1": false },
       updated: 1716900000000
     }
   }
   ============================================================ */

window.Progress = (function () {
  var KEY = "rc.progress.v1";
  var cache = null;

  function readAll() {
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { cache = {}; }
    return cache;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
    document.dispatchEvent(new CustomEvent("progresschange"));
  }

  function key(courseId, lessonId) { return courseId + "/" + lessonId; }

  function get(courseId, lessonId) {
    var all = readAll();
    return all[key(courseId, lessonId)] || { done: false, quizBest: null, ex: {} };
  }

  function patch(courseId, lessonId, changes) {
    var all = readAll();
    var k = key(courseId, lessonId);
    var rec = all[k] || { done: false, quizBest: null, ex: {} };
    for (var p in changes) { if (Object.prototype.hasOwnProperty.call(changes, p)) rec[p] = changes[p]; }
    rec.updated = Date.now();
    all[k] = rec;
    save();
    return rec;
  }

  function setDone(courseId, lessonId, value) {
    return patch(courseId, lessonId, { done: !!value });
  }

  function setExercise(courseId, lessonId, exId, correct) {
    var rec = get(courseId, lessonId);
    var ex = rec.ex || {};
    ex[exId] = !!correct;
    return patch(courseId, lessonId, { ex: ex });
  }

  function setQuizScore(courseId, lessonId, score) {
    var rec = get(courseId, lessonId);
    var best = (rec.quizBest == null) ? score : Math.max(rec.quizBest, score);
    return patch(courseId, lessonId, { quizBest: best, lastQuiz: score });
  }

  /* how many lessons of a course are finished */
  function courseStats(course) {
    var total = 0, done = 0;
    (course.units || []).forEach(function (u) {
      (u.lessons || []).forEach(function (l) {
        if (l.status === "draft") return;
        total++;
        if (get(course.id, l.id).done) done++;
      });
    });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }

  function reset() {
    cache = {};
    try { localStorage.removeItem(KEY); } catch (e) {}
    document.dispatchEvent(new CustomEvent("progresschange"));
  }

  return {
    get: get, setDone: setDone, setExercise: setExercise,
    setQuizScore: setQuizScore, courseStats: courseStats, reset: reset
  };
})();
