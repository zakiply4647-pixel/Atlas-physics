/* =====================================================
   ATLAS PHYSICS PRO MAX
   Interactive learning platform — 4AM Algeria
   ===================================================== */

"use strict";

/* ---------- Helpers and saved state ---------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const STORAGE = {
  theme: "atlas_theme_v1",
  progress: "atlas_progress_v1",
  notes: "atlas_notes_v1",
  settings: "atlas_lab_settings_v1",
  measurements: "atlas_ohm_measurements_v1"
};

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    toast("تعذر الحفظ على هذا الجهاز.");
    return false;
  }
}

function numberValue(id, fallback = 0) {
  const element = document.getElementById(id);
  if (!element) return fallback;
  const value = Number(element.value);
  return Number.isFinite(value) ? value : fallback;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = String(value);
}

function formatNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return "—";
  return Number(value.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function toast(message) {
  const region = $("#toastRegion");
  if (!region) return;

  const item = document.createElement("div");
  item.className = "toast-message";
  item.textContent = message;
  region.appendChild(item);

  while (region.children.length > 4) {
    region.firstElementChild.remove();
  }

  window.setTimeout(() => item.remove(), 3200);
}

/* ---------- Lesson library ---------- */

/*
  These are the initial lesson cards.
  The content is educational material, not a replacement
  for checking the current official Algerian curriculum.
*/

const lessons = [
  {
    id: "electric-charge",
    title: "التكهرب وطرق التكهرب",
    category: "electricity",
    icon: "⚡",
    duration: "15 دقيقة",
    level: "أساسي",
    description: "تعرف على الشحنات الكهربائية والتكهرب بالدلك واللمس والتأثير.",
    objectives: [
      "التعرف على الجسم المتكهرب والجسم المتعادل.",
      "التمييز بين الشحنة الموجبة والسالبة.",
      "شرح انتقال الإلكترونات في التكهرب."
    ],
    sections: [
      {
        title: "مفهوم التكهرب",
        body: "يصبح الجسم متكهربًا عندما يكتسب فائضًا من الشحنات الكهربائية أو يفقد بعض الإلكترونات. في الأجسام الصلبة، انتقال الإلكترونات هو الذي يفسر كثيرًا من ظواهر التكهرب."
      },
      {
        title: "طرق التكهرب",
        body: "يمكن أن يحدث التكهرب بالدلك أو باللمس أو بالتأثير. في الدلك تنتقل إلكترونات بين مادتين، وفي اللمس يحدث انتقال للشحنات بالتلامس، أما التأثير فيحدث فيه إعادة توزيع للشحنات بسبب جسم مشحون قريب."
      },
      {
        title: "الشحنات الكهربائية",
        body: "الشحنات المتشابهة تتنافر، والشحنات المختلفة تتجاذب. الجسم المتعادل يحتوي على مجموع متساوٍ من الشحنات الموجبة والسالبة."
      }
    ],
    formula: "الشحنات المتشابهة تتنافر، والمختلفة تتجاذب.",
    lab: "circuit"
  },
  {
    id: "electroscope",
    title: "الكاشف الكهربائي",
    category: "electricity",
    icon: "🔬",
    duration: "12 دقيقة",
    level: "أساسي",
    description: "اكتشف كيف يكشف الكاشف الكهربائي وجود الشحنات.",
    objectives: [
      "التعرف على أجزاء الكاشف الكهربائي.",
      "تفسير انفراج ورقتي الكاشف.",
      "فهم تأثير تقريب جسم مشحون."
    ],
    sections: [
      {
        title: "مبدأ عمل الكاشف",
        body: "يتكون الكاشف الكهربائي المدرسي عادة من قرص معدني متصل بساق معدنية وورقتين رقيقتين. عندما تتوزع شحنات متماثلة على الورقتين، تتنافران فتبتعدان عن بعضهما."
      },
      {
        title: "التجربة",
        body: "قرّب قضيبًا مشحونًا من قرص الكاشف دون لمسه، وراقب حركة الورقتين. ثم أبعد القضيب ولاحظ ما يتغير. النتيجة تعتمد على حالة الكاشف وطريقة شحنه."
      }
    ],
    formula: "انفراج الورقتين دليل على توزع الشحنات المتماثلة عليهما.",
    lab: "circuit"
  },
  {
    id: "atomic-model",
    title: "بنية الذرة والشحنات",
    category: "matter",
    icon: "⚛️",
    duration: "15 دقيقة",
    level: "أساسي",
    description: "تعرّف على النواة والبروتونات والنيوترونات والإلكترونات.",
    objectives: [
      "تحديد مكونات الذرة.",
      "معرفة الشحنات النسبية للجسيمات.",
      "فهم التعادل الكهربائي للذرة."
    ],
    sections: [
      {
        title: "مكونات الذرة",
        body: "تتكون الذرة من نواة تحتوي على البروتونات والنيوترونات، وتوجد الإلكترونات في المنطقة المحيطة بالنواة. البروتون موجب الشحنة، والإلكترون سالب الشحنة، والنيوترون متعادل."
      },
      {
        title: "الذرة المتعادلة",
        body: "في الذرة المتعادلة كهربائيًا، يساوي عدد الإلكترونات عدد البروتونات. إذا فقدت الذرة إلكترونات أصبحت أيونًا موجبًا، وإذا اكتسبت إلكترونات أصبحت أيونًا سالبًا."
      },
      {
        title: "مثال: الأكسجين",
        body: "العدد الذري للأكسجين هو 8، لذلك تحتوي نواته على 8 بروتونات. ذرة الأكسجين المتعادلة لها 8 إلكترونات."
      }
    ],
    formula: "الذرة المتعادلة: عدد البروتونات = عدد الإلكترونات.",
    lab: "circuit"
  },
  {
    id: "current",
    title: "التيار الكهربائي",
    category: "electricity",
    icon: "🔌",
    duration: "18 دقيقة",
    level: "متوسط",
    description: "افهم شروط مرور التيار الكهربائي واتجاهه في الدارة.",
    objectives: [
      "معرفة دور المولد والقاطعة.",
      "التمييز بين الدارة المفتوحة والمغلقة.",
      "التعرف على اتجاه التيار الاصطلاحي."
    ],
    sections: [
      {
        title: "شروط مرور التيار",
        body: "في الدارة الكهربائية المدرسية، يحتاج التيار إلى مسار موصل مغلق ومصدر كهربائي مناسب. عند فتح القاطعة ينقطع المسار فلا يمر تيار في الدارة المثالية."
      },
      {
        title: "اتجاه التيار",
        body: "الاتجاه الاصطلاحي للتيار خارج المولد هو من قطبه الموجب نحو قطبه السالب. أما حركة الإلكترونات في الموصل المعدني فتكون في الاتجاه المعاكس."
      }
    ],
    formula: "شدة التيار I تقاس بالأمبير (A).",
    lab: "circuit"
  },
  {
    id: "voltage",
    title: "التوتر الكهربائي",
    category: "electricity",
    icon: "📏",
    duration: "15 دقيقة",
    level: "متوسط",
    description: "تعلم مفهوم التوتر وكيفية قياسه باستعمال الفولطمتر.",
    objectives: [
      "معرفة رمز التوتر ووحدته.",
      "فهم دور الفولطمتر.",
      "التعرف على توتر المولد والمستقبل."
    ],
    sections: [
      {
        title: "تعريف التوتر",
        body: "التوتر الكهربائي بين نقطتين هو فرق الكمون الكهربائي بينهما، ويرمز له غالبًا بالحرف U، وتقاس قيمته بالفولط (V)."
      },
      {
        title: "القياس",
        body: "يوصل الفولطمتر على التوازي مع العنصر المراد قياس التوتر بين طرفيه، مع احترام قطبيته عند استعمال جهاز ذي أطراف محددة."
      }
    ],
    formula: "U تقاس بالفولط (V).",
    lab: "circuit"
  },
  {
    id: "ohm-law",
    title: "قانون أوم والمقاومة",
    category: "electricity",
    icon: "📈",
    duration: "20 دقيقة",
    level: "متوسط",
    description: "اربط بين التوتر وشدة التيار وقيمة المقاومة.",
    objectives: [
      "تطبيق قانون أوم.",
      "حساب شدة التيار أو التوتر أو المقاومة.",
      "قراءة منحنى التوتر بدلالة شدة التيار."
    ],
    sections: [
      {
        title: "قانون أوم",
        body: "بالنسبة لناقل أومي وفي شروط ثابتة، يتناسب التوتر بين طرفيه طرديًا مع شدة التيار المار فيه. ثابت التناسب هو المقاومة الكهربائية."
      },
      {
        title: "مثال محلول",
        body: "إذا كان التوتر U = 6 V والمقاومة R = 10 Ω، فإن شدة التيار I = U ÷ R = 6 ÷ 10 = 0.6 A."
      }
    ],
    formula: "U = R × I",
    lab: "ohm"
  },
  {
    id: "series-circuits",
    title: "التوصيل على التسلسل",
    category: "electricity",
    icon: "🔗",
    duration: "18 دقيقة",
    level: "متوسط",
    description: "اكتشف خصائص الدارة التي تحتوي على عناصر موصولة على التسلسل.",
    objectives: [
      "معرفة أن شدة التيار واحدة في عناصر تسلسل مثالي.",
      "فهم توزيع التوتر.",
      "حساب المقاومة المكافئة لمقاومات تسلسلية."
    ],
    sections: [
      {
        title: "خصائص التوصيل",
        body: "في دارة تسلسلية بسيطة يمر التيار نفسه في جميع العناصر، ويتوزع توتر المولد على المستقبلات. انقطاع المسار في عنصر واحد يقطع التيار في الدارة كلها."
      },
      {
        title: "المقاومة المكافئة",
        body: "عند توصيل مقاومات مثالية على التسلسل، تساوي المقاومة المكافئة مجموع المقاومات."
      }
    ],
    formula: "Rₑq = R₁ + R₂ + R₃ + …",
    lab: "series"
  },
  {
    id: "parallel-circuits",
    title: "التوصيل على التفرع",
    category: "electricity",
    icon: "🔀",
    duration: "18 دقيقة",
    level: "متوسط",
    description: "افهم الفروع الكهربائية وكيفية توزيع التيار والتوتر.",
    objectives: [
      "التعرف على العقد والفروع.",
      "فهم خصائص التوتر في الفروع المتوازية.",
      "مقارنة التوصيل على التسلسل والتفرع."
    ],
    sections: [
      {
        title: "خصائص التفرع",
        body: "في فروع متوازية متصلة بالنقطتين نفسيهما، يكون التوتر بين طرفي كل فرع متساويًا. وتتوزع شدة التيار الكلي على الفروع."
      },
      {
        title: "اختلاف التوصيل",
        body: "التوصيل على التفرع يسمح ببقاء بعض الفروع عاملة إذا انقطع فرع آخر، ما دام لكل فرع مسار مغلق ومصدر مناسب."
      }
    ],
    formula: "I الكلي = مجموع شدات التيار في الفروع.",
    lab: "series"
  },
  {
    id: "electrical-power",
    title: "الاستطاعة الكهربائية",
    category: "energy",
    icon: "💡",
    duration: "15 دقيقة",
    level: "متوسط",
    description: "احسب استطاعة جهاز كهربائي باستعمال التوتر وشدة التيار.",
    objectives: [
      "فهم معنى الاستطاعة.",
      "تطبيق العلاقة P = U × I.",
      "التعرف على الواط كوحدة للاستطاعة."
    ],
    sections: [
      {
        title: "مفهوم الاستطاعة",
        body: "الاستطاعة الكهربائية تعبر عن معدل تحويل الطاقة أو استهلاكها مع الزمن. تعتمد الاستطاعة الكهربائية في هذا النموذج على التوتر وشدة التيار."
      },
      {
        title: "مثال محلول",
        body: "جهاز يعمل تحت توتر 12 V ويمر فيه تيار شدته 5 A. استطاعته P = 12 × 5 = 60 W."
      }
    ],
    formula: "P = U × I",
    lab: "power"
  },
  {
    id: "electrical-energy",
    title: "الطاقة الكهربائية",
    category: "energy",
    icon: "🔋",
    duration: "18 دقيقة",
    level: "متوسط",
    description: "احسب الطاقة المستهلكة باستعمال الاستطاعة ومدة التشغيل.",
    objectives: [
      "ربط الطاقة بالاستطاعة والزمن.",
      "التعرف على Wh وJ.",
      "حل مسائل الاستهلاك الكهربائي."
    ],
    sections: [
      {
        title: "حساب الطاقة",
        body: "إذا كانت الاستطاعة ثابتة خلال مدة زمنية، يمكن حساب الطاقة المستهلكة بضرب الاستطاعة في الزمن، مع توحيد الوحدات."
      },
      {
        title: "تحويل الوحدات",
        body: "عند استخدام الاستطاعة بالواط والزمن بالثانية، تكون الطاقة بالجول. كما أن 1 Wh يساوي 3600 J."
      }
    ],
    formula: "E = P × t",
    lab: "power"
  },
  {
    id: "motion",
    title: "الحركة والسكون",
    category: "mechanics",
    icon: "🏎️",
    duration: "15 دقيقة",
    level: "أساسي",
    description: "تعرف على المسار والحركة والسكون بالنسبة إلى مرجع.",
    objectives: [
      "تحديد المرجع.",
      "التمييز بين الحركة والسكون.",
      "وصف المسار."
    ],
    sections: [
      {
        title: "الحركة بالنسبة إلى مرجع",
        body: "نقول إن جسمًا متحرك إذا تغير موضعه بالنسبة إلى مرجع معين مع الزمن. وقد يكون الجسم ساكنًا بالنسبة إلى مرجع ومتحركًا بالنسبة إلى مرجع آخر."
      },
      {
        title: "المسار",
        body: "المسار هو مجموعة المواضع المتتالية التي يشغلها الجسم أثناء حركته. يمكن أن يكون مستقيمًا أو منحنيًا أو دائريًا."
      }
    ],
    formula: "وصف الحركة يتطلب تحديد المرجع.",
    lab: "motion"
  },
  {
    id: "speed",
    title: "السرعة المتوسطة",
    category: "mechanics",
    icon: "⏱️",
    duration: "20 دقيقة",
    level: "متوسط",
    description: "احسب السرعة المتوسطة من المسافة المقطوعة والزمن المستغرق.",
    objectives: [
      "استخدام العلاقة الرياضية للسرعة.",
      "تمييز وحدات السرعة.",
      "حل مسائل تطبيقية."
    ],
    sections: [
      {
        title: "السرعة المتوسطة",
        body: "السرعة المتوسطة هي المسافة الكلية المقطوعة مقسومة على المدة الزمنية المستغرقة، عند استعمال وحدات متوافقة."
      },
      {
        title: "مثال محلول",
        body: "إذا قطع جسم 100 m خلال 10 s، فالسرعة المتوسطة تساوي 100 ÷ 10 = 10 m/s."
      }
    ],
    formula: "v = d ÷ t",
    lab: "motion"
  },
  {
    id: "chemical-change",
    title: "التحول الكيميائي",
    category: "matter",
    icon: "🧪",
    duration: "20 دقيقة",
    level: "متوسط",
    description: "تعرف على المتفاعلات والنواتج وكيفية تمثيل التحول الكيميائي.",
    objectives: [
      "تمييز التحول الفيزيائي عن الكيميائي.",
      "تحديد المتفاعلات والنواتج.",
      "فهم مبدأ انحفاظ الذرات في التفاعل."
    ],
    sections: [
      {
        title: "مفهوم التحول الكيميائي",
        body: "في التحول الكيميائي تختفي بعض الأنواع الكيميائية وتتشكل أنواع جديدة. تسمى المواد التي تبدأ بها العملية بالمتفاعلات، والمواد المتشكلة بالنواتج."
      },
      {
        title: "انحفاظ الذرات",
        body: "في النموذج الكيميائي المعتاد، لا تختفي الذرات ولا تُخلق أثناء التفاعل؛ بل يعاد ترتيبها لتكوين مواد جديدة. لذلك يجب موازنة المعادلة الكيميائية."
      }
    ],
    formula: "عدد ذرات كل عنصر محفوظ عند موازنة المعادلة.",
    lab: "motion"
  }
];

let completedLessons = new Set(loadJSON(STORAGE.progress, []));
let currentLesson = null;

function renderLessons() {
  const grid = $("#lessonGrid");
  if (!grid) return;

  const search = ($("#lessonSearch")?.value || "").trim().toLowerCase();
  const filter = $("#lessonFilter")?.value || "all";

  const visible = lessons.filter(lesson => {
    const text = [
      lesson.title,
      lesson.description,
      lesson.category,
      ...lesson.objectives
    ].join(" ").toLowerCase();

    const matchesSearch = text.includes(search);
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && completedLessons.has(lesson.id)) ||
      lesson.category === filter;

    return matchesSearch && matchesFilter;
  });

  if (!visible.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <span>🔎</span>
        <p>لم نعثر على درس مطابق. جرّب كلمة أخرى.</p>
      </div>`;
    return;
  }

  grid.innerHTML = visible.map(lesson => {
    const done = completedLessons.has(lesson.id);

    return `
      <article class="lesson-card ${done ? "is-completed" : ""}">
        <div class="lesson-card-top">
          <span class="lesson-icon">${escapeHTML(lesson.icon)}</span>
          <span class="lesson-tag">${done ? "✓ مكتمل" : escapeHTML(lesson.level)}</span>
        </div>
        <h3>${escapeHTML(lesson.title)}</h3>
        <p>${escapeHTML(lesson.description)}</p>
        <div class="lesson-meta">
          <span>◷ ${escapeHTML(lesson.duration)}</span>
          <span>${lesson.sections.length} محاور</span>
        </div>
        <button class="button button-primary lesson-open"
          type="button" data-open-lesson="${escapeHTML(lesson.id)}">
          ${done ? "مراجعة الدرس" : "افتح الدرس ←"}
        </button>
      </article>`;
  }).join("");
}

function updateProgress() {
  const total = lessons.length;
  const completed = lessons.filter(item =>
    completedLessons.has(item.id)
  ).length;

  const percent = total ? Math.round(completed / total * 100) : 0;

  setText("totalLessonsCount", total);
  setText("completedLessonsCount", completed);
  setText("progressPercent", `${percent}%`);

  const bar = $("#learningProgressBar");
  if (bar) bar.style.width = `${percent}%`;

  const nextLesson = lessons.find(item => !completedLessons.has(item.id));

  setText(
    "resumeTitle",
    nextLesson ? nextLesson.title : "أكملت جميع الدروس المتاحة!"
  );

  setText(
    "resumeDescription",
    nextLesson
      ? `الدرس التالي المقترح: ${nextLesson.title}`
      : "أحسنت! يمكنك مراجعة الدروس في أي وقت."
  );

  const link = $("#resumeLink");
  if (link) {
    link.textContent = nextLesson ? "تابع التعلّم ←" : "راجع الدروس ←";
    link.href = "#lessons";
    link.onclick = event => {
      if (!nextLesson) return;
      event.preventDefault();
      openLesson(nextLesson.id);
    };
  }
}

function openLesson(id) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) return;

  currentLesson = lesson;

  $("#lessonModal")?.remove();

  const modal = document.createElement("div");
  modal.id = "lessonModal";
  modal.className = "lesson-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modalLessonTitle");

  const sectionsHTML = lesson.sections.map(section => `
    <section>
      <h3>${escapeHTML(section.title)}</h3>
      <p>${escapeHTML(section.body)}</p>
    </section>
  `).join("");

  const objectivesHTML = lesson.objectives.map(objective =>
    `<li>${escapeHTML(objective)}</li>`
  ).join("");

  const done = completedLessons.has(lesson.id);

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" type="button"
        aria-label="إغلاق الدرس">✕</button>
      <span class="eyebrow">${escapeHTML(lesson.category)}</span>
      <h2 id="modalLessonTitle">${escapeHTML(lesson.icon)} ${escapeHTML(lesson.title)}</h2>
      <p>${escapeHTML(lesson.description)}</p>

      <h3>أهداف الدرس</h3>
      <ul>${objectivesHTML}</ul>

      ${sectionsHTML}

      <div class="modal-formula">${escapeHTML(lesson.formula)}</div>

      <button class="button button-primary" type="button" id="completeLesson">
        ${done ? "✓ الدرس مكتمل" : "✓ تحديد الدرس كمكتمل"}
      </button>
      <button class="button button-secondary" type="button" id="goToLessonLab">
        ⚗️ الانتقال إلى المختبر
      </button>
    </div>`;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  $(".modal-close", modal)?.focus();

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = "";
    currentLesson = null;
  };

  $(".modal-close", modal)?.addEventListener("click", closeModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  const escapeHandler = event => {
    if (event.key === "Escape" && $("#lessonModal")) {
      closeModal();
      document.removeEventListener("keydown", escapeHandler);
    }
  };

  document.addEventListener("keydown", escapeHandler);

  $("#completeLesson", modal)?.addEventListener("click", () => {
    completedLessons.add(lesson.id);
    saveJSON(STORAGE.progress, [...completedLessons]);
    renderLessons();
    updateProgress();
    toast("تم حفظ تقدمك في هذا الدرس.");
    closeModal();
  });

  $("#goToLessonLab", modal)?.addEventListener("click", () => {
    closeModal();
    const labTab = $(`[data-lab-tab="${lesson.lab}"]`);
    if (labTab) labTab.click();
    $("#laboratory")?.scrollIntoView({ behavior: "smooth" });
  });
}

$("#lessonGrid")?.addEventListener("click", event => {
  const button = event.target.closest("[data-open-lesson]");
  if (button) openLesson(button.dataset.openLesson);
});

$("#lessonSearch")?.addEventListener("input", renderLessons);
$("#lessonFilter")?.addEventListener("change", renderLessons);

/* ---------- Navigation and theme ---------- */

const themeButton = $("#themeToggle");
const menuButton = $("#menuToggle");
const mainNav = $("#mainNav");

function applyTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");
  if (themeButton) {
    themeButton.textContent = theme === "light" ? "🌙" : "☀️";
    themeButton.setAttribute(
      "aria-label",
      theme === "light" ? "تفعيل المظهر الداكن" : "تفعيل المظهر الفاتح"
    );
  }
}

applyTheme(loadJSON(STORAGE.theme, "dark"));

themeButton?.addEventLis
