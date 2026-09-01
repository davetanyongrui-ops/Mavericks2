/* ==========================================================================
   THE MAVERICKS - ACTIVITIES DATA
   Each activity: id, date, location, and multilingual content
   ========================================================================== */

const activities = [
  {
    id: "2026-08-30",
    date: "30 Agustus 2026",
    dateEN: "30 August 2026",
    dateZH: "2026年8月30日",
    location: {
      id: "Panti Asuhan Samaria Fao Kasih, Batam",
      en: "Samaria Fao Kasih Orphanage, Batam",
      zh: "Samaria Fao Kasih 孤儿院，巴淡岛"
    },
    cover: "assets/gwc-1.jpg",
    images: [
      { src: "assets/gwc-1.jpg", alt: { id: "Foto 1", en: "Photo 1", zh: "照片 1" } },
      { src: "assets/gwc-2.jpg", alt: { id: "Foto 2", en: "Photo 2", zh: "照片 2" } },
      { src: "assets/gwc-3.jpg", alt: { id: "Foto 3", en: "Photo 3", zh: "照片 3" } },
      { src: "assets/gwc-4.jpg", alt: { id: "Foto 4", en: "Photo 4", zh: "照片 4" } },
      { src: "assets/gwc-5.jpg", alt: { id: "Foto 5", en: "Photo 5", zh: "照片 5" } },
      { src: "assets/gwc-6.jpg", alt: { id: "Foto 6", en: "Photo 6", zh: "照片 6" } },
      { src: "assets/gwc-7.jpg", alt: { id: "Foto 7", en: "Photo 7", zh: "照片 7" } },
      { src: "assets/gwc-8.jpg", alt: { id: "Foto 8", en: "Photo 8", zh: "照片 8" } },
      { src: "assets/gwc-9.jpg", alt: { id: "Foto 9", en: "Photo 9", zh: "照片 9" } },
      { src: "assets/gwc-10.jpg", alt: { id: "Foto 10", en: "Photo 10", zh: "照片 10" } },
      { src: "assets/gwc-11.jpg", alt: { id: "Foto 11", en: "Photo 11", zh: "照片 11" } },
      { src: "assets/gwc-12.jpg", alt: { id: "Foto 12", en: "Photo 12", zh: "照片 12" } },
      { src: "assets/gwc-13.jpg", alt: { id: "Foto 13", en: "Photo 13", zh: "照片 13" } },
      { src: "assets/gwc-14.jpg", alt: { id: "Foto 14", en: "Photo 14", zh: "照片 14" } },
      { src: "assets/gwc-15.jpg", alt: { id: "Foto 15", en: "Photo 15", zh: "照片 15" } },
      { src: "assets/gwc-16.jpg", alt: { id: "Foto 16", en: "Photo 16", zh: "照片 16" } }
    ],
    title: {
      id: "Kunjungan ke Panti Asuhan Samaria Fao Kasih",
      en: "Visit to Samaria Fao Kasih Orphanage",
      zh: "探访 Samaria Fao Kasih 孤儿院"
    },
    subtitle: {
      id: "Permainan Edukatif: Matematika, Sejarah & Bahasa Inggris",
      en: "Educational Games: Mathematics, History & English",
      zh: "教育游戏：数学、历史与英语"
    },
    summary: {
      id: "Kami mengunjungi Panti Asuhan Samaria Fao Kasih di Batam untuk sesi permainan edukatif yang menyenangkan. Anak-anak bermain teka-teki matematika, kuis sejarah dunia, dan aktivitas bahasa Inggris interaktif. Selain itu, kami juga menyerahkan bantuan berupa perlengkapan sekolah dan camilan untuk para penghuni panti.",
      en: "We visited Samaria Fao Kasih Orphanage in Batam for a fun-filled educational game session. The children participated in math puzzles, world history quizzes, and interactive English activities. In addition, we donated school supplies and snacks for the orphanage residents.",
      zh: "我们探访了巴淡岛的 Samaria Fao Kasih 孤儿院，开展了一场充满趣味的教育游戏活动。孩子们参与了数学谜题、世界历史问答和英语互动游戏。此外，我们还向孤儿院的孩子们捐赠了学习用品和零食。"
    },
    highlights: {
      id: [
        "Permainan teka-teki matematika yang melatih logika",
        "Kuis sejarah dunia yang membuka wawasan",
        "Aktivitas bahasa Inggris interaktif",
        "Penyerahan perlengkapan sekolah dan camilan",
        "Foto bersama di depan panti asuhan"
      ],
      en: [
        "Math puzzles to sharpen logical thinking",
        "World history quiz to broaden horizons",
        "Interactive English language activities",
        "Distribution of school supplies and snacks",
        "Group photo in front of the orphanage"
      ],
      zh: [
        "数学谜题训练逻辑思维",
        "世界历史问答拓宽视野",
        "英语互动活动",
        "分发学习用品和零食",
        "孤儿院前合影留念"
      ]
    }
  }
  // Future activities go here, e.g.:
  // {
  //   id: "2026-09-15",
  //   date: "15 September 2026",
  //   ...
  // }
];

/* Helper: get activities sorted newest-first */
function getActivitiesSorted() {
  return [...activities].sort((a, b) => new Date(b.id) - new Date(a.id));
}

/* Helper: find activity by id */
function getActivityById(id) {
  return activities.find(a => a.id === id);
}
