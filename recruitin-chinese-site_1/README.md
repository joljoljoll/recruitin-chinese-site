# RecruitIn Chinese — static learning website

A complete Chinese-learning site that runs as **plain files**. No server, no database,
no login, no admin panel. You add lessons by adding small text files.

---

## 1. See it on your own computer (30 seconds)

Double-click **`index.html`**. That's it — it opens in your browser and works.

> Why this matters: most course websites need a "server" running before they work.
> This one does not, because the lesson content is stored in `.js` files instead of
> `.json` files. Same content, but the browser is allowed to open them directly.

If you prefer a proper local preview (nicer URLs, closer to the real thing), open a
terminal in this folder and run:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

---

## 2. Put it online with GitHub Pages

You only do this once.

1. Create a new repository on GitHub, e.g. `chinese-lessons`. Make it **Public**.
2. Upload every file and folder from this project into that repository
   (GitHub's web uploader accepts drag-and-drop of the whole folder).
3. In the repository, go to **Settings → Pages**.
4. Under *Build and deployment* → *Source*, choose **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`. Click **Save**.
6. Wait 1–2 minutes. Your site is live at
   `https://<your-username>.github.io/chinese-lessons/`

After that, **every time you upload a changed file, the live site updates by itself**
(give it a minute).

> The file named `.nojekyll` is already included. It stops GitHub from trying to be
> clever with the folders. Don't delete it.

---

## 3. What is in this folder

```
index.html            Home page
courses.html          List of all courses
course.html           One course → its units and lessons
lesson.html           The lesson player (all 8 sections)
.nojekyll             Needed by GitHub Pages. Leave it alone.

assets/
  css/styles.css      All the styling. Colours are at the very top.
  js/config.js        ← BRAND NAME, tagline, contact links. Edit this first.
  js/i18n.js          Indonesian / English labels for buttons and menus
  js/...              The engine (you normally never touch these)
  audio/              Optional .mp3 files

data/
  catalog.js          ← THE MAP: which courses, units and lessons exist
  courses/
    _TEMPLATE.js      ← Copy this to start a new lesson
    hsk1/u1l1.js      A demo lesson with placeholder content
    hsk2/  daily/  career/

docs/
  CONTENT-GUIDE.md    How to write a lesson file (read this one)
  DESIGN-GUIDE.md     Colours, spacing, and how to keep new pages consistent
```

---

## 4. Adding a new lesson — the whole routine

Three steps, every single time.

**Step 1 — copy the template**

Copy `data/courses/_TEMPLATE.js` into the course folder and rename it to the
lesson id, e.g. `data/courses/hsk1/u1l2.js`.

**Step 2 — fill it in**

Open the new file and change the two lines at the top so they match where it lives:

```js
course: "hsk1",
id: "u1l2",
```

Then fill in the sections. Leave out anything you don't have yet — an empty section
just shows a small "not filled in yet" box, and the rest of the lesson still works.

**Step 3 — announce it in the catalog**

Open `data/catalog.js`, find the unit, and add (or un-draft) the lesson:

```js
{ id: "u1l2", zh: "你叫什么名字", pinyin: "Nǐ jiào shénme míngzi",
  title: { en: "What is your name?", id: "Siapa namamu?" } }
```

If the line has `status: "draft"`, delete that part — that's what makes it clickable.

Full field-by-field reference: **`docs/CONTENT-GUIDE.md`**.

---

## 5. Audio

Every Chinese word and sentence already has a play button. If there is no sound file,
the browser reads the Chinese out loud with its own built-in voice — so audio works
from day one with zero effort.

To use your own recording instead, drop the mp3 into `assets/audio/` and add one line
to that word:

```js
{ zh: "你好", pinyin: "nǐ hǎo", en: "hello", id: "halo",
  audio: "hsk1/u1l1/nihao.mp3" }
```

That path is relative to `assets/audio/`, so the file above lives at
`assets/audio/hsk1/u1l1/nihao.mp3`. If the file is missing, it silently falls back to
the browser voice — nothing breaks.

> Browser voice quality varies by device. Chrome on a computer and Safari on iPhone
> usually have a Chinese voice installed. Some Android phones do not — those students
> will hear nothing until you add real mp3 files.

### Textbook audio already included

Lesson 1 ships with four real recordings pulled out of the 《新HSK教程1》第1课 PPT:

```
assets/audio/hsk1/l1/wordlist-1.mp3     textbook track 1-2
assets/audio/hsk1/l1/wordlist-2.mp3     textbook track 1-4
assets/audio/hsk1/l1/wordlist-3.mp3     textbook track 1-6
assets/audio/hsk1/l1/tongue-twister.mp3 textbook track 1-7
```

**One thing to decide before you publish.** These recordings are the publisher's
(外语教学与研究出版社), and a GitHub Pages site is public to anyone with the link.
Three ways to handle it, in order of least hassle:

1. **Delete the four mp3 files** and delete the `vocabTracks` block plus the `audio:`
   line on the tongue-twister drill in `data/courses/hsk1/l1.js`. Everything still
   works on the browser voice. This is the safe default if the site is public.
2. **Record the word lists yourself** (or have a native-speaker friend do it) and keep
   the same filenames. Better long-term anyway — you control the pace.
3. **Keep them and keep the site unlisted** — share the link only with enrolled
   students rather than putting it anywhere findable.

I'm not a lawyer and this isn't legal advice; it's the practical shape of the risk.
The rest of the lesson content is original, so only these four files are affected.

---

## 6. Student progress

Finished lessons, quiz scores and exercise results are saved in the student's own
browser (`localStorage`). This means:

- no accounts, no passwords, nothing for you to manage
- progress stays on **that one device and browser**
- clearing browser data erases it

That's the expected trade-off for a site with no backend. There is a **"Clear progress"**
button at the bottom of the home page.

---

## 7. Changing the brand

Open `assets/js/config.js`. Everything there is plain text: the school name, the
tagline, the WhatsApp/Instagram links, and which language the site opens in
(`defaultLang: "id"` or `"en"`).

Colours live at the top of `assets/css/styles.css`, under `:root`. Change a colour
there and it updates across the whole site.

---

## 8. If something breaks

| What you see | Almost always means |
|---|---|
| Lesson page says "Pelajaran tidak ditemukan" | The `id` in the lesson file doesn't match the `id` in `catalog.js`, or the filename doesn't match the id |
| A lesson is greyed out and not clickable | It still has `status: "draft"` in `catalog.js` |
| The whole page is blank | A typo in a `.js` file — usually a missing comma or an unclosed `{`. Press **F12** in the browser, open the **Console** tab, and it will name the file and line |
| A section shows the striped "not filled in yet" box | That part of the lesson file is empty — that's normal, not an error |
| Chinese characters look wrong | Save your files as **UTF-8** (any modern editor does this by default) |

The single most common mistake is a missing comma between two items in a list.
If you use [VS Code](https://code.visualstudio.com/) (free), it underlines these in red
before you ever open the browser.

---

## 9. What this site deliberately does not do

- No student accounts, no teacher dashboard, no way to collect answers
- No syncing between a student's phone and laptop
- No payments

All of those need a backend. If you want them later, the lesson data files can be
reused as-is — nothing here would have to be rewritten.
