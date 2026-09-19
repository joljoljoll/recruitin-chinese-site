/* ============================================================
   LESSON TEMPLATE — copy me.

   1. Copy this file into the right course folder, e.g.
        data/courses/hsk1/u1l2.js
   2. Change "course" and "id" at the top to match the catalog.
   3. Fill in the parts you have. Anything you leave empty simply
      shows a friendly "not filled in yet" box on the page — the
      lesson still works.
   4. Add the lesson to data/catalog.js and remove its
      status: "draft" line so it becomes clickable.

   Every text field can be written as { en: "...", id: "..." }.
   The site shows the one matching the ID / EN switch in the header.
   ============================================================ */

registerLesson({
  course: "hsk1",          // <- course id from catalog.js
  id: "uXlX",              // <- lesson id from catalog.js, same as this filename

  title: { zh: "", pinyin: "", en: "", id: "" },

  /* ---------- 1. OVERVIEW ---------- */
  overview: { en: "", id: "" },
  reference: { en: "", id: "" },   // optional: textbook pages / audio track numbers
  objectives: [
    // { en: "...", id: "..." },
  ],

  /* ---------- 2. VOCABULARY ----------
     Optional per word:  pos (word class), audio ("hsk1/u1l2/word.mp3") */
  vocab: [
    // {
    //   zh: "", pinyin: "", en: "", id: "", pos: "",
    //   example: { zh: "", pinyin: "", en: "", id: "" }
    // },
  ],

  /* Optional: whole-track recordings shown as buttons above the vocabulary,
     e.g. the textbook's word-list audio. */
  vocabTracks: [
    // { label: { en: "Textbook 1-2", id: "Audio buku 1-2" }, audio: "hsk1/l1/wordlist-1.mp3" },
  ],

  /* ---------- 3. DIALOGUE ---------- */
  dialogue: {
    intro: { en: "", id: "" },
    lines: [
      // { speaker: "A", zh: "", pinyin: "", en: "", id: "" },
    ]
  },

  /* ---------- 4. GRAMMAR ---------- */
  grammar: [
    // {
    //   title: { en: "", id: "" },
    //   formula: "Subject + 是 + Noun",
    //   explain: { en: "", id: "" },
    //   examples: [ { zh: "", pinyin: "", en: "", id: "" } ]
    // },
  ],

  /* ---------- 5. PRONUNCIATION ---------- */
  pronunciation: {
    notes: [
      // { title: { en: "", id: "" }, body: { en: "", id: "" } },
    ],
    drills: [
      // { zh: "", pinyin: "", en: "", id: "" },
    ]
  },

  /* ---------- 6. PRACTICE EXERCISES ----------
     Eight types are available. Copy the ones you need.
     See docs/CONTENT-GUIDE.md for every field. */
  exercises: [

    // { type: "mcq",
    //   prompt: { en: "", id: "" },
    //   stem: "汉字",                      // optional
    //   options: [ { zh: "" }, { en: "", id: "" } ],
    //   answer: 0,                         // 0 = first option
    //   explain: { en: "", id: "" } },

    // { type: "fill",
    //   prompt: { en: "", id: "" },
    //   sentence: "我___学生。",            // ___ marks each blank
    //   answers: [ ["是"] ],               // one array per blank; list alternatives inside
    //   hint: { en: "", id: "" } },

    // { type: "match",
    //   prompt: { en: "", id: "" },
    //   pairs: [ { left: { zh: "" }, right: { en: "", id: "" } } ] },

    // { type: "order",
    //   prompt: { en: "", id: "" },
    //   answer: ["我", "是", "学生"] },     // correct order; shown shuffled

    // { type: "translate",
    //   prompt: { en: "", id: "" },
    //   source: { en: "", id: "" },        // or { zh: "", pinyin: "" }
    //   answers: ["我是学生"] },            // accepted answers

    // { type: "dialogue",
    //   prompt: { en: "", id: "" },
    //   line: { speaker: "A", zh: "", pinyin: "", en: "", id: "" },
    //   options: [ { zh: "" } ],
    //   answer: 0 },

    // { type: "listening",
    //   prompt: { en: "", id: "" },
    //   clip: { zh: "", audio: "" },       // audio optional
    //   options: [ { zh: "" } ],
    //   answer: 0 },

    // { type: "shadow",
    //   prompt: { en: "", id: "" },
    //   items: [ { zh: "", pinyin: "", en: "", id: "" } ] },

  ],

  /* ---------- 7. SPEAKING / SHADOWING ---------- */
  speakingNote: { en: "", id: "" },   // optional: a class instruction, e.g. "read in pairs using real names"
  speaking: [
    // { zh: "", pinyin: "", en: "", id: "" },
  ],

  /* ---------- 8. MINI QUIZ ----------
     Same exercise shapes as above. 5–8 questions works well. */
  quiz: {
    passScore: 70,
    questions: [
      // { type: "mcq", prompt: { en: "", id: "" }, options: [], answer: 0 },
    ]
  }
});
