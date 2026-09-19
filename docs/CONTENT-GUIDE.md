# Content guide — how to write a lesson

Everything a learner sees comes from one file per lesson:
`data/courses/<course>/<lesson>.js`

Start by copying `data/courses/_TEMPLATE.js`.

---

## The one rule that makes bilingual text work

Any text a student reads can be written as an object with two languages:

```js
{ en: "Are you a student?", id: "Apakah kamu murid?" }
```

The site shows whichever matches the **ID / EN** switch in the header. If you only
write one of them, that one is used for everybody — so it is fine to fill in
Indonesian first and add English later.

Chinese is never translated by the switch. It always uses its own fields:
`zh` (characters) and `pinyin`.

---

## Writing conventions — please keep these consistent

| Field | Rule | Example |
|---|---|---|
| `zh` | Simplified characters only. No pinyin mixed in. | `你好` |
| `pinyin` | **Tone marks, not numbers.** Lowercase, spaces between words, not syllables. | `nǐ hǎo`, `xuésheng`, not `ni3 hao3` or `nǐhǎo` |
| `en` | Lowercase for single words, sentence case for sentences. | `teacher` / `I am a student.` |
| `id` | Same as English. Use the word a student would actually say. | `guru` / `Saya murid.` |
| `pos` | Optional word class, short and lowercase. | `noun`, `verb`, `particle` |
| Names in dialogue | Use the Chinese surname character, one character. | `林`, `安` |

Where a word has two meanings, separate with a comma: `en: "good, well"`.

Proper nouns keep capitals: `Zhōngguó`.

---

## Turning a PPT into a lesson file

A practical order of work, so nothing gets lost:

1. **Vocabulary first.** Go through the slides and list every new word into `vocab`.
   Write `zh`, `pinyin`, `en`, `id`. Add an `example` sentence for each — the example
   is what makes the card useful, so it is worth the extra minute.
2. **Dialogue.** Copy the dialogue verbatim into `dialogue.lines`, one entry per turn.
3. **Grammar.** Each slide that explains a pattern becomes one entry in `grammar`,
   with a `formula` line (the pattern in shorthand) and 1–3 `examples`.
4. **Pronunciation.** Only the points this lesson introduces. Keep it to 1–2 notes.
5. **Exercises.** Aim for 6–8, and **vary the type** — see the list below.
6. **Quiz.** 5 questions drawn from what the lesson actually taught. Nothing new.
7. Add the lesson to `data/catalog.js` and remove `status: "draft"`.

You do not have to do all seven in one sitting. A half-filled lesson still opens;
the missing sections just show a small "not filled in yet" box.

### What the 《新HSK教程》 PPTs do and don't contain

Worth knowing before you open the next one, because it saves a hunt:

| In the PPT | Not in the PPT |
|---|---|
| Lesson title and objectives slide | **The 课文 dialogues** — the slides only say "see textbook p.X" |
| Every new word, with pinyin, word class and English gloss | Indonesian glosses |
| Two example sentences per word, and common collocations | Grammar explanations (they are implied by the examples) |
| The tongue twister / pronunciation drill | |
| The 课文练习 class instructions | |
| Embedded mp3 tracks (in `ppt/media/`) | |

So the reliable path is: **take the word list from the PPT, and write the dialogue and
grammar sections yourself** from the textbook page, or from what you actually teach.

### About the textbook's own sentences

The example sentences in the PPT belong to the publisher (外语教学与研究出版社). The
words themselves are just vocabulary — nobody owns "你好 = hello" — but the sentences
are their writing.

The approach used in Lesson 1, and worth repeating: write your own example sentences
using **only the words from that lesson**, and add a `reference` line pointing students
to the textbook page. This has a side benefit — the textbook's examples often use words
from much later lessons (你们学校有多少学生？ in Lesson 1), while yours stay on-level.

The same applies to the mp3 tracks. Lesson 1 uses four of them; see README §5.

---

## Section reference

### 1. Overview

```js
overview: { en: "...", id: "..." },
reference: { en: "Textbook: 《新HSK教程1》第1课, pages 1–3.", id: "..." },   // optional
objectives: [
  { en: "Greet someone and say goodbye", id: "Menyapa dan berpamitan" }
]
```

Objectives are written as things the student **can do**, not topics. Three to five.

`reference` prints one small grey line under the overview. Use it to point students at
the textbook pages and audio track numbers for the official material.

### 2. Vocabulary

```js
vocab: [
  { zh: "老师", pinyin: "lǎoshī", en: "teacher", id: "guru", pos: "noun",
    audio: "hsk1/u1l1/laoshi.mp3",              // optional
    example: { zh: "他是老师。", pinyin: "Tā shì lǎoshī.",
               en: "He is a teacher.", id: "Dia guru." } }
]
```

Each card gets a play button, and the student can hide the pinyin or hide the
translation to self-test. **8–13 words per lesson** is the comfortable range.

If you have a single recording of the whole word list (the textbook audio tracks are
like this), add it as a button above the cards:

```js
vocabTracks: [
  { label: { en: "Textbook 1-2", id: "Audio buku 1-2" }, audio: "hsk1/l1/wordlist-1.mp3" }
]
```

### 3. Dialogue

```js
dialogue: {
  intro: { en: "Two people meet at a language school.", id: "..." },
  lines: [
    { speaker: "安", zh: "你好！", pinyin: "Nǐ hǎo!", en: "Hello!", id: "Halo!" }
  ]
}
```

Speakers alternate colour automatically. 6–10 lines reads well.

### 4. Grammar

```js
grammar: [
  { title: { en: "Saying what something is: 是", id: "Menyatakan sesuatu: 是" },
    formula: "Subject + 是 + Noun",
    explain: { en: "...", id: "..." },
    examples: [ { zh: "我是学生。", pinyin: "Wǒ shì xuésheng.", en: "...", id: "..." } ] }
]
```

Keep `explain` to two or three sentences. If it needs more, it is two grammar points.

### 5. Pronunciation

```js
pronunciation: {
  notes:  [ { title: { en: "", id: "" }, body: { en: "", id: "" } } ],
  drills: [ { zh: "妈 麻 马 骂", pinyin: "mā má mǎ mà", en: "", id: "" } ]
}
```

Drills get a play button and a "Play all" button.

### 6 & 8. Exercises and quiz

Both use the same eight shapes. `exercises` is the practice section;
`quiz.questions` is the scored mini quiz at the end.

---

## The eight exercise types

Every one gives instant feedback the moment the student answers.

**`mcq` — multiple choice**
```js
{ type: "mcq",
  prompt: { en: "What does 老师 mean?", id: "Apa arti 老师?" },
  stem: "老师",                                  // optional Chinese shown big, with audio
  options: [ { en: "student", id: "murid" }, { en: "teacher", id: "guru" } ],
  answer: 1,                                     // 0 = first option
  explain: { en: "老 + 师 = teacher.", id: "..." } }
```
An option can be a plain string, `{ zh, pinyin }`, or `{ en, id }`.

**`fill` — fill in the blank**
```js
{ type: "fill",
  prompt: { en: "Fill in the missing word.", id: "..." },
  sentence: "我___学生。",                       // ___ marks each blank
  answers: [ ["是"] ],                           // one array per blank
  hint: { en: "The verb 'to be'.", id: "..." } }
```
Two blanks means two arrays. Alternatives go inside one array: `["是", "就是"]`.
Spaces, capitals and punctuation are ignored when checking.

**`match` — matching**
```js
{ type: "match",
  prompt: { en: "Match the word with its meaning.", id: "..." },
  pairs: [ { left: { zh: "你好" }, right: { en: "hello", id: "halo" } } ] }
```
The right column is shuffled automatically. 4–6 pairs.

**`order` — sentence ordering**
```js
{ type: "order",
  prompt: { en: "Put the words in order.", id: "..." },
  answer: ["你", "是", "学生", "吗"] }
```
Write the words in the **correct** order — the site shuffles them for the student.
Split by word, not by character.

**`translate` — translation**
```js
{ type: "translate",
  prompt: { en: "Translate into Chinese.", id: "..." },
  source: { en: "I am a teacher.", id: "Saya guru." },   // or { zh, pinyin } for the other direction
  answers: ["我是老师"] }                                 // list every acceptable version
```

**`dialogue` — dialogue response**
```js
{ type: "dialogue",
  prompt: { en: "How do you reply?", id: "..." },
  line: { speaker: "林", zh: "你是学生吗？", pinyin: "...", en: "...", id: "..." },
  options: [ { zh: "我是学生。" }, { zh: "再见！" } ],
  answer: 0 }
```

**`listening` — listening question**
```js
{ type: "listening",
  prompt: { en: "Listen, then choose what you heard.", id: "..." },
  clip: { zh: "我是老师。", audio: "hsk1/u1l1/q1.mp3" },   // audio optional
  options: [ { zh: "我是学生。" }, { zh: "我是老师。" } ],
  answer: 1 }
```
There is no autoplay — the student presses play. That is deliberate; browsers block
autoplay anyway, and it startles people on shared devices.

**`shadow` — listen and repeat**
```js
{ type: "shadow",
  prompt: { en: "Listen and repeat out loud.", id: "..." },
  items: [ { zh: "你好！", pinyin: "Nǐ hǎo!", en: "Hello!", id: "Halo!" } ] }
```
Not auto-graded — the student rates themselves. Use it for rhythm and confidence.

### 7. Speaking / shadowing section

```js
speakingNote: { en: "Read in pairs using your real names.", id: "..." },   // optional
speaking: [
  { zh: "你好！", pinyin: "Nǐ hǎo!", en: "Hello!", id: "Halo!" }
]
```
The same self-rating rows, as a standalone section. 3–5 lines from the dialogue.
`speakingNote` shows a cream callout above them — good for the class instruction that
goes with the 课文练习 slides.

### Quiz settings

```js
quiz: {
  passScore: 70,        // percent needed to mark the lesson complete
  questions: [ /* any of the eight shapes above */ ]
}
```

Passing the quiz automatically marks the lesson as done.

---

## Balance that tends to work

| Section | Amount |
|---|---|
| Vocabulary | 8–12 words, each with an example |
| Dialogue | 6–10 lines |
| Grammar | 2–3 points |
| Pronunciation | 1–2 notes + 3–4 drills |
| Practice | 6–8 exercises, at least four different types |
| Speaking | 3–5 lines |
| Quiz | 5 questions, nothing new |

That is roughly a 45–60 minute class, or 20 minutes of self-study.

---

## Before you publish a lesson — quick check

- [ ] `course` and `id` at the top match `catalog.js` and the filename
- [ ] Every pinyin has tone marks
- [ ] Every `answer` number points at the right option (remember: 0 is the first)
- [ ] The quiz only tests things this lesson taught
- [ ] Opened the lesson in a browser and clicked through all 8 sections
- [ ] Removed `status: "draft"` from `catalog.js`
