/* ============================================================
   THE CATALOG — the map of the whole school.
   Course  ->  Unit  ->  Lesson

   HSK 1 follows 《新HSK教程1》 (New HSK Course 1, FLTRP).
   One 课 in the textbook = one lesson here. Units group several 课.

   Add a lesson here FIRST, then create the matching file at
   data/courses/<course id>/<lesson id>.js

   status: "draft"  = greyed out on the site, not clickable
   (remove the status line once the lesson file is ready)
   ============================================================ */

registerCatalog({
  courses: [

    /* ---------------------------------------------------------- HSK 1 */
    {
      id: "hsk1",
      zh: "一级",
      badge: "HSK 1",
      title: { en: "HSK 1", id: "HSK 1" },
      blurb: {
        en: "Follows 《新HSK教程1》. Greetings, introductions, and the first sentence patterns.",
        id: "Mengikuti 《新HSK教程1》. Sapaan, perkenalan, dan pola kalimat pertama."
      },
      units: [
        {
          id: "u1",
          zh: "第一单元",
          title: { en: "Unit 1 · Greetings & etiquette", id: "Unit 1 · Sapaan & etiket" },
          blurb: {
            en: "Say hello, thank someone, say goodbye — and know when to use 您.",
            id: "Menyapa, berterima kasih, berpamitan — dan tahu kapan memakai 您."
          },
          lessons: [
            {
              id: "l1",
              zh: "AI小语，你好！",
              pinyin: "AI Xiǎoyǔ, nǐ hǎo!",
              title: { en: "Hello, AI Xiaoyu!", id: "Halo, AI Xiaoyu!" },
              blurb: {
                en: "Greetings, thanks and farewells; the polite 您; the plural suffix 们.",
                id: "Sapaan, terima kasih, dan perpisahan; 您 yang sopan; akhiran jamak 们."
              }
            },

            /* Add 第2课, 第3课 … here as each PPT arrives.
               Give each one an id like "l2", create data/courses/hsk1/l2.js,
               then delete its status: "draft" line. */
            { id: "l2", title: { en: "Lesson 2", id: "Pelajaran 2" }, status: "draft" },
            { id: "l3", title: { en: "Lesson 3", id: "Pelajaran 3" }, status: "draft" }
          ]
        }

        /* Add Unit 2 here once you know which 课 belong together. */
      ]
    },

    /* ------------------------------------------------- Future HSK levels */
    {
      id: "hsk2",
      zh: "二级",
      badge: "HSK 2",
      status: "soon",
      title: { en: "HSK 2 and beyond", id: "HSK 2 dan seterusnya" },
      blurb: {
        en: "Levels 2–6 are being written. Same lesson shape, more range.",
        id: "Level 2–6 sedang disusun. Bentuk pelajaran sama, cakupan lebih luas."
      },
      units: []
    },

    /* -------------------------------------------------- Daily Chinese */
    {
      id: "daily",
      zh: "日常汉语",
      badge: "Daily",
      title: { en: "Daily Chinese", id: "Mandarin Sehari-hari" },
      blurb: {
        en: "Ordering food, shopping, directions, small talk — language you use the same day you learn it.",
        id: "Memesan makanan, belanja, arah jalan, obrolan ringan — bahasa yang langsung bisa dipakai."
      },
      units: [
        {
          id: "d1",
          zh: "吃饭",
          title: { en: "Unit 1 · Eating out", id: "Unit 1 · Makan di luar" },
          lessons: [
            { id: "d1l1", zh: "点菜", pinyin: "Diǎn cài",
              title: { en: "Ordering food", id: "Memesan makanan" }, status: "draft" },
            { id: "d1l2", zh: "买单", pinyin: "Mǎi dān",
              title: { en: "Paying the bill", id: "Membayar" }, status: "draft" }
          ]
        }
      ]
    },

    /* ------------------------------------------------- Career Chinese */
    {
      id: "career",
      zh: "职场汉语",
      badge: "Career",
      title: { en: "Career Chinese", id: "Mandarin Karier" },
      blurb: {
        en: "Interviews, workplace etiquette and business vocabulary for working in Chinese companies.",
        id: "Wawancara, etiket kerja, dan kosakata bisnis untuk bekerja di perusahaan Tiongkok."
      },
      units: [
        {
          id: "c1",
          zh: "面试",
          title: { en: "Unit 1 · Job interview", id: "Unit 1 · Wawancara kerja" },
          lessons: [
            { id: "c1l1", zh: "自我介绍", pinyin: "Zìwǒ jièshào",
              title: { en: "Introducing yourself", id: "Memperkenalkan diri" }, status: "draft" },
            { id: "c1l2", zh: "谈工作经验", pinyin: "Tán gōngzuò jīngyàn",
              title: { en: "Talking about experience", id: "Membicarakan pengalaman" }, status: "draft" }
          ]
        }
      ]
    }

  ]
});
