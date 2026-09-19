/* ============================================================
   HSK 1 · Unit 1 · Lesson 1
   Source: 《新HSK教程1》第1课 "AI小语，你好！" (FLTRP)

   Vocabulary, word classes and lesson objectives follow the textbook.
   Example sentences and dialogues here are ORIGINAL — written using only
   words from this lesson, so nothing from the textbook is reproduced.
   Students are pointed to the textbook pages for the official texts.

   Audio: the word-list and tongue-twister tracks are the textbook's own
   recordings, extracted from the PPT. Everything else uses the browser
   voice. See README §5 before publishing the site publicly.
   ============================================================ */

registerLesson({
  course: "hsk1",
  id: "l1",

  title: { zh: "AI小语，你好！", pinyin: "AI Xiǎoyǔ, nǐ hǎo!", en: "Hello, AI Xiaoyu!", id: "Halo, AI Xiaoyu!" },

  /* ---------- 1. OVERVIEW ---------- */
  overview: {
    en: "The first day of school. Wang Yifei greets the AI teaching assistant Xiaoyu, the class learns how to greet each other, and then how to thank someone and say goodbye.",
    id: "Hari pertama sekolah. Wang Yifei menyapa asisten pengajar AI bernama Xiaoyu, kelas belajar cara saling menyapa, lalu cara berterima kasih dan berpamitan."
  },
  reference: {
    en: "Textbook: 《新HSK教程1》第1课. Official texts on pages 1–3; audio tracks 1-1 to 1-7.",
    id: "Buku: 《新HSK教程1》第1课. Teks resmi di halaman 1–3; audio 1-1 sampai 1-7."
  },
  objectives: [
    { en: "Greet one person, a group, and a teacher", id: "Menyapa satu orang, sekelompok orang, dan guru" },
    { en: "Use the polite 您 and know when it is expected", id: "Memakai 您 yang sopan dan tahu kapan harus dipakai" },
    { en: "Say thank you and reply to it", id: "Mengucapkan terima kasih dan menjawabnya" },
    { en: "Say goodbye", id: "Berpamitan" },
    { en: "Make a pronoun plural with 们", id: "Membuat kata ganti jamak dengan 们" }
  ],

  /* ---------- 2. VOCABULARY ----------
     13 words, in textbook order (Text 1, Text 2, Text 3). */
  vocab: [
    { zh: "你好", pinyin: "nǐ hǎo", en: "hello", id: "halo", pos: "greeting",
      example: { zh: "同学，你好！", pinyin: "Tóngxué, nǐ hǎo!", en: "Hello, classmate!", id: "Halo, teman sekelas!" } },

    { zh: "王老师", pinyin: "Wáng lǎoshī", en: "Teacher Wang", id: "Guru Wang", pos: "proper noun",
      example: { zh: "王老师，您好！", pinyin: "Wáng lǎoshī, nín hǎo!", en: "Hello, Teacher Wang!", id: "Halo, Guru Wang!" } },

    { zh: "大家", pinyin: "dàjiā", en: "everybody", id: "semuanya", pos: "pronoun",
      example: { zh: "大家好！", pinyin: "Dàjiā hǎo!", en: "Hello everybody!", id: "Halo semuanya!" } },

    { zh: "好", pinyin: "hǎo", en: "good, fine", id: "baik, bagus", pos: "adjective",
      example: { zh: "老师好！", pinyin: "Lǎoshī hǎo!", en: "Hello, teacher!", id: "Halo, Bu/Pak Guru!" } },

    { zh: "学生", pinyin: "xuéshēng", en: "student", id: "murid, pelajar", pos: "noun",
      example: { zh: "学生们好！", pinyin: "Xuéshēng men hǎo!", en: "Hello, students!", id: "Halo, murid-murid!" } },

    { zh: "们", pinyin: "men", en: "plural suffix for people", id: "akhiran jamak untuk orang", pos: "suffix",
      example: { zh: "同学们，再见！", pinyin: "Tóngxué men, zàijiàn!", en: "Goodbye, classmates!", id: "Sampai jumpa, teman-teman!" } },

    { zh: "老师", pinyin: "lǎoshī", en: "teacher", id: "guru", pos: "noun",
      example: { zh: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", en: "Hello, teacher!", id: "Halo, Bu/Pak Guru!" } },

    { zh: "您", pinyin: "nín", en: "you (polite)", id: "Anda (sopan)", pos: "pronoun",
      example: { zh: "谢谢您！", pinyin: "Xièxie nín!", en: "Thank you!", id: "Terima kasih!" } },

    { zh: "你们", pinyin: "nǐmen", en: "you (plural)", id: "kalian", pos: "pronoun",
      example: { zh: "你们好！", pinyin: "Nǐmen hǎo!", en: "Hello, everyone!", id: "Halo, kalian!" } },

    { zh: "谢谢", pinyin: "xièxie", en: "thank you", id: "terima kasih", pos: "verb",
      example: { zh: "谢谢老师！", pinyin: "Xièxie lǎoshī!", en: "Thank you, teacher!", id: "Terima kasih, Bu/Pak Guru!" } },

    { zh: "不客气", pinyin: "bú kèqi", en: "you're welcome", id: "sama-sama", pos: "expression",
      example: { zh: "谢谢！—— 不客气！", pinyin: "Xièxie! — Bú kèqi!", en: "Thank you! — You're welcome!", id: "Terima kasih! — Sama-sama!" } },

    { zh: "同学", pinyin: "tóngxué", en: "classmate", id: "teman sekelas", pos: "noun",
      example: { zh: "同学，你好！", pinyin: "Tóngxué, nǐ hǎo!", en: "Hello, classmate!", id: "Halo, teman sekelas!" } },

    { zh: "再见", pinyin: "zàijiàn", en: "goodbye", id: "sampai jumpa", pos: "verb",
      example: { zh: "老师，再见！", pinyin: "Lǎoshī, zàijiàn!", en: "Goodbye, teacher!", id: "Sampai jumpa, Bu/Pak Guru!" } }
  ],

  /* Textbook word-list recordings, shown as buttons above the vocabulary. */
  vocabTracks: [
    { label: { en: "Textbook 1-2", id: "Audio buku 1-2" }, audio: "hsk1/l1/wordlist-1.mp3" },
    { label: { en: "Textbook 1-4", id: "Audio buku 1-4" }, audio: "hsk1/l1/wordlist-2.mp3" },
    { label: { en: "Textbook 1-6", id: "Audio buku 1-6" }, audio: "hsk1/l1/wordlist-3.mp3" }
  ],

  /* ---------- 3. DIALOGUE ----------
     Original practice dialogue. It uses ONLY this lesson's 13 words and
     covers all three textbook scenes: greeting, thanking, parting.
     The official 课文 1/2/3 are in the textbook, pages 1–3. */
  dialogue: {
    intro: {
      en: "First day of class. 飞 = Wang Yifei, 语 = Xiaoyu (the AI assistant), 王 = Teacher Wang. The official textbook texts are on pages 1–3.",
      id: "Hari pertama kelas. 飞 = Wang Yifei, 语 = Xiaoyu (asisten AI), 王 = Guru Wang. Teks resmi ada di buku halaman 1–3."
    },
    lines: [
      { speaker: "飞", zh: "小语，你好！", pinyin: "Xiǎoyǔ, nǐ hǎo!", en: "Hello, Xiaoyu!", id: "Halo, Xiaoyu!" },
      { speaker: "语", zh: "你好！", pinyin: "Nǐ hǎo!", en: "Hello!", id: "Halo!" },
      { speaker: "王", zh: "同学们好！", pinyin: "Tóngxué men hǎo!", en: "Hello, class!", id: "Halo, anak-anak!" },
      { speaker: "飞", zh: "王老师好！", pinyin: "Wáng lǎoshī hǎo!", en: "Hello, Teacher Wang!", id: "Halo, Guru Wang!" },
      { speaker: "飞", zh: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", en: "Hello, teacher.", id: "Selamat pagi, Bu/Pak Guru." },
      { speaker: "王", zh: "你们好！", pinyin: "Nǐmen hǎo!", en: "Hello, everyone!", id: "Halo, kalian!" },
      { speaker: "飞", zh: "谢谢您，王老师！", pinyin: "Xièxie nín, Wáng lǎoshī!", en: "Thank you, Teacher Wang!", id: "Terima kasih, Guru Wang!" },
      { speaker: "王", zh: "不客气！", pinyin: "Bú kèqi!", en: "You're welcome!", id: "Sama-sama!" },
      { speaker: "飞", zh: "老师，再见！", pinyin: "Lǎoshī, zàijiàn!", en: "Goodbye, teacher!", id: "Sampai jumpa, Bu/Pak Guru!" },
      { speaker: "王", zh: "同学们，再见！", pinyin: "Tóngxué men, zàijiàn!", en: "Goodbye, class!", id: "Sampai jumpa, anak-anak!" }
    ]
  },

  /* ---------- 4. GRAMMAR ---------- */
  grammar: [
    {
      title: { en: "Greeting with 好", id: "Menyapa dengan 好" },
      formula: "Person + 好 ！",
      explain: {
        en: "Chinese greetings are built by putting 好 after whoever you are greeting. 你好 to one person, 大家好 to a group, 老师好 to a teacher. There is no separate word for 'good morning' at this level — one pattern covers the whole day.",
        id: "Sapaan dalam bahasa Mandarin dibentuk dengan menaruh 好 setelah orang yang disapa. 你好 untuk satu orang, 大家好 untuk sekelompok orang, 老师好 untuk guru. Di level ini tidak ada kata khusus untuk 'selamat pagi' — satu pola dipakai sepanjang hari."
      },
      examples: [
        { zh: "你好！", pinyin: "Nǐ hǎo!", en: "Hello! (to one person)", id: "Halo! (ke satu orang)" },
        { zh: "大家好！", pinyin: "Dàjiā hǎo!", en: "Hello everybody!", id: "Halo semuanya!" },
        { zh: "王老师好！", pinyin: "Wáng lǎoshī hǎo!", en: "Hello, Teacher Wang!", id: "Halo, Guru Wang!" }
      ]
    },
    {
      title: { en: "您 — the polite you", id: "您 — kata 'Anda' yang sopan" },
      formula: "您 = 你 + respect",
      explain: {
        en: "您 is 你 with 心 (heart) underneath. Use it for teachers, elders, customers and anyone senior to you. Using 你 with a teacher is not rude exactly, but 您 is what is expected — and noticing the difference is the etiquette point of this lesson. Note: 您 has no plural. For a group, use 你们 or 大家.",
        id: "您 adalah 你 dengan 心 (hati) di bawahnya. Dipakai untuk guru, orang yang lebih tua, pelanggan, dan siapa pun yang lebih senior. Memakai 你 kepada guru tidak benar-benar kasar, tetapi 您 yang diharapkan — dan menyadari perbedaan ini adalah inti etiket pelajaran ini. Catatan: 您 tidak punya bentuk jamak. Untuk kelompok, pakai 你们 atau 大家."
      },
      examples: [
        { zh: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", en: "Hello, teacher.", id: "Halo, Bu/Pak Guru." },
        { zh: "谢谢您！", pinyin: "Xièxie nín!", en: "Thank you (polite).", id: "Terima kasih (sopan)." },
        { zh: "你们好！", pinyin: "Nǐmen hǎo!", en: "Hello, everyone. (not 您们)", id: "Halo, kalian. (bukan 您们)" }
      ]
    },
    {
      title: { en: "们 — making people plural", id: "们 — membuat kata orang menjadi jamak" },
      formula: "Pronoun / person noun + 们",
      explain: {
        en: "Add 们 to a pronoun or a word for people: 你 → 你们, 同学 → 同学们, 学生 → 学生们. It is only for people, and it is never used together with a number.",
        id: "Tambahkan 们 pada kata ganti atau kata yang merujuk orang: 你 → 你们, 同学 → 同学们, 学生 → 学生们. Hanya untuk orang, dan tidak pernah dipakai bersama angka."
      },
      examples: [
        { zh: "你们好！", pinyin: "Nǐmen hǎo!", en: "Hello, you all!", id: "Halo, kalian!" },
        { zh: "同学们好！", pinyin: "Tóngxué men hǎo!", en: "Hello, classmates!", id: "Halo, teman-teman!" },
        { zh: "学生们，再见！", pinyin: "Xuéshēng men, zàijiàn!", en: "Goodbye, students!", id: "Sampai jumpa, murid-murid!" }
      ]
    }
  ],

  /* ---------- 5. PRONUNCIATION ---------- */
  pronunciation: {
    notes: [
      {
        title: { en: "The four tones", id: "Empat nada" },
        body: {
          en: "Tone 1 stays high and flat, tone 2 rises, tone 3 dips then rises, tone 4 falls sharply. The tone is part of the word: mā (mother), má (flax), mǎ (horse) and mà (to scold) are four different words. The tongue twister below is built entirely out of them.",
          id: "Nada 1 tinggi dan datar, nada 2 naik, nada 3 turun lalu naik, nada 4 turun tajam. Nada adalah bagian dari kata: mā (ibu), má (rami), mǎ (kuda), dan mà (memarahi) adalah empat kata berbeda. Tongue twister di bawah ini seluruhnya dibangun dari kata-kata itu."
        }
      },
      {
        title: { en: "Two third tones in a row", id: "Dua nada ketiga berturut-turut" },
        body: {
          en: "When two third tones meet, the first one is said as a second tone. 你好 is written nǐ hǎo but said ní hǎo. The writing never changes — only the sound.",
          id: "Jika dua nada ketiga bertemu, yang pertama dibaca sebagai nada kedua. 你好 ditulis nǐ hǎo tetapi dibaca ní hǎo. Tulisannya tidak berubah — hanya bunyinya."
        }
      },
      {
        title: { en: "不 changes tone before a fourth tone", id: "不 berubah nada sebelum nada keempat" },
        body: {
          en: "不 is normally bù, but before a fourth-tone syllable it becomes bú. That is why 不客气 is bú kèqi, not bù kèqi.",
          id: "不 biasanya dibaca bù, tetapi sebelum suku kata bernada keempat berubah menjadi bú. Karena itu 不客气 dibaca bú kèqi, bukan bù kèqi."
        }
      }
    ],
    drills: [
      { zh: "妈 种 麻，我 放 马。马 吃 麻，妈 骂 马。",
        pinyin: "Mā zhòng má, wǒ fàng mǎ. Mǎ chī má, mā mà mǎ.",
        en: "Mom plants flax, I tend the horse. The horse eats the flax, Mom scolds the horse. (tongue twister, textbook track 1-7)",
        id: "Ibu menanam rami, saya menggembalakan kuda. Kuda memakan rami, Ibu memarahi kuda. (tongue twister, audio buku 1-7)",
        audio: "hsk1/l1/tongue-twister.mp3" },
      { zh: "你好", pinyin: "nǐ hǎo → ní hǎo", en: "hello", id: "halo" },
      { zh: "不客气", pinyin: "bú kèqi", en: "you're welcome", id: "sama-sama" },
      { zh: "谢谢", pinyin: "xièxie", en: "thank you (second syllable is toneless)", id: "terima kasih (suku kata kedua tanpa nada)" }
    ]
  },

  /* ---------- 6. PRACTICE EXERCISES ---------- */
  exercises: [
    {
      type: "mcq",
      prompt: { en: "What does 大家 mean?", id: "Apa arti 大家?" },
      stem: "大家",
      options: [
        { en: "teacher", id: "guru" },
        { en: "everybody", id: "semuanya" },
        { en: "classmate", id: "teman sekelas" },
        { en: "student", id: "murid" }
      ],
      answer: 1,
      explain: { en: "大 (big) + 家 (family) — the whole group.", id: "大 (besar) + 家 (keluarga) — seluruh kelompok." }
    },
    {
      type: "fill",
      prompt: { en: "Greet your teacher politely.", id: "Sapa gurumu dengan sopan." },
      sentence: "老师，___好！",
      answers: [["您"]],
      hint: { en: "The respectful form of 你.", id: "Bentuk hormat dari 你." },
      explain: { en: "您好 is what a teacher expects to hear.", id: "您好 adalah yang diharapkan didengar oleh seorang guru." }
    },
    {
      type: "match",
      prompt: { en: "Match the Chinese with its meaning.", id: "Jodohkan kata Mandarin dengan artinya." },
      pairs: [
        { left: { zh: "谢谢" }, right: { en: "thank you", id: "terima kasih" } },
        { left: { zh: "不客气" }, right: { en: "you're welcome", id: "sama-sama" } },
        { left: { zh: "再见" }, right: { en: "goodbye", id: "sampai jumpa" } },
        { left: { zh: "同学" }, right: { en: "classmate", id: "teman sekelas" } },
        { left: { zh: "学生" }, right: { en: "student", id: "murid" } }
      ]
    },
    {
      type: "order",
      prompt: { en: "Put the words in the right order.", id: "Susun kata-kata menjadi kalimat yang benar." },
      answer: ["王", "老师", "您", "好"],
      explain: { en: "王老师您好！ — the polite way to greet Teacher Wang.", id: "王老师您好！ — cara sopan menyapa Guru Wang." }
    },
    {
      type: "translate",
      prompt: { en: "Translate into Chinese.", id: "Terjemahkan ke bahasa Mandarin." },
      source: { en: "Thank you, everybody!", id: "Terima kasih, semuanya!" },
      answers: ["谢谢大家", "谢谢大家！"],
      explain: { en: "谢谢 + who you are thanking.", id: "谢谢 + orang yang kamu ucapkan terima kasih." }
    },
    {
      type: "dialogue",
      prompt: { en: "How do you reply?", id: "Bagaimana kamu menjawab?" },
      line: { speaker: "语", zh: "谢谢你！", pinyin: "Xièxie nǐ!", en: "Thank you!", id: "Terima kasih!" },
      options: [
        { zh: "不客气！", pinyin: "Bú kèqi!" },
        { zh: "再见！", pinyin: "Zàijiàn!" },
        { zh: "你好！", pinyin: "Nǐ hǎo!" }
      ],
      answer: 0,
      explain: { en: "谢谢 is answered with 不客气.", id: "谢谢 dijawab dengan 不客气." }
    },
    {
      type: "listening",
      prompt: { en: "Listen, then choose what you heard.", id: "Dengarkan, lalu pilih yang kamu dengar." },
      clip: { zh: "同学们好！" },
      options: [
        { zh: "老师好！" },
        { zh: "同学们好！" },
        { zh: "你们好！" }
      ],
      answer: 1
    },
    {
      type: "shadow",
      prompt: { en: "Listen and repeat out loud.", id: "Dengarkan dan tirukan dengan suara keras." },
      items: [
        { zh: "你好！", pinyin: "Nǐ hǎo!", en: "Hello!", id: "Halo!" },
        { zh: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", en: "Hello, teacher.", id: "Halo, Bu/Pak Guru." },
        { zh: "不客气！", pinyin: "Bú kèqi!", en: "You're welcome!", id: "Sama-sama!" }
      ]
    }
  ],

  /* ---------- 7. SPEAKING / SHADOWING ---------- */
  speakingNote: {
    en: "In class: read the dialogue in roles, then do it again in pairs using your own real names.",
    id: "Di kelas: bacakan dialog sesuai peran, lalu ulangi berpasangan memakai nama asli kalian."
  },
  speaking: [
    { zh: "大家好！", pinyin: "Dàjiā hǎo!", en: "Hello everybody!", id: "Halo semuanya!" },
    { zh: "王老师，您好！", pinyin: "Wáng lǎoshī, nín hǎo!", en: "Hello, Teacher Wang.", id: "Halo, Guru Wang." },
    { zh: "谢谢您！—— 不客气！", pinyin: "Xièxie nín! — Bú kèqi!", en: "Thank you! — You're welcome!", id: "Terima kasih! — Sama-sama!" },
    { zh: "同学们，再见！", pinyin: "Tóngxué men, zàijiàn!", en: "Goodbye, classmates!", id: "Sampai jumpa, teman-teman!" }
  ],

  /* ---------- 8. MINI QUIZ ---------- */
  quiz: {
    passScore: 70,
    questions: [
      {
        type: "mcq",
        prompt: { en: "Which one means 'you're welcome'?", id: "Mana yang berarti 'sama-sama'?" },
        options: [{ zh: "谢谢" }, { zh: "不客气" }, { zh: "再见" }, { zh: "你好" }],
        answer: 1
      },
      {
        type: "mcq",
        prompt: { en: "You meet your teacher in the corridor. What do you say?", id: "Kamu bertemu gurumu di koridor. Apa yang kamu ucapkan?" },
        options: [{ zh: "你好！" }, { zh: "您好！" }, { zh: "大家好！" }],
        answer: 1,
        explain: { en: "您 is the polite form used with teachers.", id: "您 adalah bentuk sopan yang dipakai kepada guru." }
      },
      {
        type: "fill",
        prompt: { en: "Greet the whole class.", id: "Sapa seluruh kelas." },
        sentence: "同学___好！",
        answers: [["们"]]
      },
      {
        type: "order",
        prompt: { en: "Build the sentence.", id: "Susun kalimatnya." },
        answer: ["老师", "您", "好"]
      },
      {
        type: "translate",
        prompt: { en: "Translate into Chinese.", id: "Terjemahkan ke bahasa Mandarin." },
        source: { en: "Goodbye, teacher!", id: "Sampai jumpa, Bu/Pak Guru!" },
        answers: ["老师再见", "老师，再见！", "老师，再见"]
      },
      {
        type: "listening",
        prompt: { en: "What did you hear?", id: "Apa yang kamu dengar?" },
        clip: { zh: "不客气！" },
        options: [{ zh: "谢谢！" }, { zh: "不客气！" }, { zh: "同学好！" }],
        answer: 1
      }
    ]
  }
});
