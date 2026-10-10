
/* ============================================
   ATLAS PHYSICS
   Interactive Learning Platform
   JavaScript Application
============================================ */

"use strict";

/* ---------- 1. Application State ---------- */

const STORAGE_KEY = "atlasPhysicsData";

const defaultState = {
  xp: 0,
  completedLessons: [],
  answeredQuestions: [],
  theme: "dark"
};

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaultState };
    }

    const parsed = JSON.parse(saved);

    return {
      ...defaultState,
      ...parsed,
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      answeredQuestions: Array.isArray(parsed.answeredQuestions)
        ? parsed.answeredQuestions
        : []
    };
  } catch (error) {
    console.warn("تعذر تحميل التقدم المحفوظ:", error);
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("تعذر حفظ التقدم:", error);
  }
}

/* ---------- 2. Lessons Database ---------- */

const lessons = [
  {
    id: "electric-current",
    title: "شدة التيار الكهربائي",
    category: "electricity",
    icon: "⚡",
    duration: "15 دقيقة",
    difficulty: "سهل",
    description: "تعرّف على شدة التيار الكهربائي ووحدتها وأداة قياسها.",
    introduction:
      "التيار الكهربائي هو حركة الشحنات الكهربائية في دارة كهربائية مغلقة. في الدروس المدرسية نستعمل شدة التيار لوصف مقدار الشحنة التي تعبر مقطعًا من الناقل خلال الزمن.",
    sections: [
      {
        title: "ما هي شدة التيار؟",
        text: "شدة التيار الكهربائي كمية فيزيائية نرمز لها بالحرف I، ووحدتها الأمبير A. نقيسها باستعمال الأمبيرمتر الذي يركب على التسلسل في الدارة."
      },
      {
        title: "كيف نقيسها؟",
        text: "نختار مجال قياس مناسبًا، ثم نركب الأمبيرمتر على التسلسل مع العنصر المراد قياس التيار المار فيه. يجب احترام قطبي الجهاز."
      },
      {
        title: "معلومة مهمة",
        text: "في دارة بسيطة موصولة على التسلسل، تكون شدة التيار نفسها في مختلف نقاط الدارة المثالية."
      }
    ],
    formula: "I = Q / t",
    formulaExplanation:
      "شدة التيار تساوي الشحنة الكهربائية المارة مقسومة على الزمن، عندما تكون الشحنة ثابتة المعدل.",
    example:
      "إذا مرت شحنة مقدارها 6 كولوم خلال 2 ثانية، فإن شدة التيار المتوسطة تساوي 3 أمبير.",
    exercise: {
      question: "ما وحدة قياس شدة التيار الكهربائي؟",
      answers: ["الفولت", "الأمبير", "الأوم", "الواط"],
      correct: 1
    }
  },
  {
    id: "voltage",
    title: "التوتر الكهربائي",
    category: "electricity",
    icon: "🔋",
    duration: "18 دقيقة",
    difficulty: "سهل",
    description: "افهم التوتر الكهربائي وكيفية قياسه بالفولتمتر.",
    introduction:
      "التوتر الكهربائي بين نقطتين يعبّر عن فرق الكمون الكهربائي بينهما، ونرمز له غالبًا بالحرف U.",
    sections: [
      {
        title: "وحدة القياس",
        text: "وحدة قياس التوتر الكهربائي هي الفولت V. نستعمل الفولتمتر لقياس التوتر بين طرفي عنصر كهربائي."
      },
      {
        title: "تركيب الفولتمتر",
        text: "يركب الفولتمتر على التفرع بين طرفي العنصر المراد قياس التوتر بينهما، مع احترام القطبية عند استعمال جهاز مستمر."
      },
      {
        title: "مصدر التوتر",
        text: "البطارية أو المولد يمكن أن يوفر توترًا كهربائيًا للدارة. القيمة الفعلية تعتمد على المصدر وظروف التشغيل."
      }
    ],
    formula: "U = V",
    formulaExplanation:
      "يرمز U إلى التوتر الكهربائي، وتقاس قيمته بالفولت.",
    example:
      "إذا أظهر الفولتمتر 4.5 V بين طرفي بطارية، فالتوتر المقاس يساوي 4.5 فولت.",
    exercise: {
      question: "بأي جهاز نقيس التوتر الكهربائي؟",
      answers: ["الأمبيرمتر", "الميزان", "الفولتمتر", "المحرار"],
      correct: 2
    }
  },
  {
    id: "ohm-law",
    title: "قانون أوم",
    category: "electricity",
    icon: "📐",
    duration: "20 دقيقة",
    difficulty: "متوسط",
    description: "اكتشف العلاقة بين التوتر وشدة التيار والمقاومة.",
    introduction:
      "في مقاومة أومية، يتناسب التوتر بين طرفيها طرديًا مع شدة التيار المار فيها، ضمن شروط درجة الحرارة الثابتة.",
    sections: [
      {
        title: "العلاقة الأساسية",
        text: "قانون أوم للمقاومة الأومية هو U = R × I. نرمز للتوتر بـ U، وللمقاومة بـ R، ولشدة التيار بـ I."
      },
      {
        title: "وحدات القياس",
        text: "التوتر بالفولت V، والمقاومة بالأوم Ω، وشدة التيار بالأمبير A."
      },
      {
        title: "تطبيق القانون",
        text: "إذا كان التوتر 12 V والمقاومة 6 Ω، فإن شدة التيار تساوي I = U / R = 12 / 6 = 2 A."
      }
    ],
    formula: "U = R × I",
    formulaExplanation:
      "يمكن تحويل القانون إلى I = U / R أو R = U / I إذا كانت الكميات الأخرى معروفة.",
    example:
      "مقاومة قيمتها 10 Ω موصولة بتوتر 5 V يمر فيها تيار شدته 0.5 A في النموذج الأومي المثالي.",
    exercise: {
      question: "مقاومة 4 Ω تحت توتر 12 V. ما شدة التيار؟",
      answers: ["2 A", "3 A", "4 A", "48 A"],
      correct: 1
    }
  },
  {
    id: "series-circuit",
    title: "الدارة على التسلسل",
    category: "electricity",
    icon: "🔗",
    duration: "16 دقيقة",
    difficulty: "متوسط",
    description: "تعرف على خصائص التيار والتوتر في دارة التسلسل.",
    introduction:
      "في دارة التسلسل توصل العناصر واحدًا بعد الآخر ضمن مسار واحد للتيار الكهربائي.",
    sections: [
      {
        title: "شدة التيار",
        text: "في الدارة التسلسلية البسيطة تكون شدة التيار نفسها في جميع عناصر المسار الواحد."
      },
      {
        title: "التوتر الكهربائي",
        text: "في النموذج المدرسي المثالي، يساوي توتر المولد مجموع التوترات بين طرفي المستقبلات الموصولة على التسلسل."
      },
      {
        title: "انقطاع الدارة",
        text: "إذا انقطع المسار في نقطة، يتوقف التيار في الدارة التسلسلية كلها."
      }
    ],
    formula: "U = U₁ + U₂",
    formulaExplanation:
      "في دارة تسلسلية بسيطة، مجموع التوترات على العناصر يساوي توتر المولد.",
    example:
      "إذا كان توتر المولد 9 V وتوتر المصباح الأول 4 V، يكون توتر المصباح الثاني 5 V في النموذج المثالي.",
    exercise: {
      question: "ماذا يحدث إذا انقطع سلك في دارة تسلسلية؟",
      answers: [
        "يزداد التيار دائمًا",
        "يستمر كل شيء طبيعيًا",
        "يتوقف التيار في الدارة",
        "يتحول التوتر إلى صفر في كل الحالات"
      ],
      correct: 2
    }
  },
  {
    id: "parallel-circuit",
    title: "الدارة على التفرع",
    category: "electricity",
    icon: "🔀",
    duration: "17 دقيقة",
    difficulty: "متوسط",
    description: "افهم الفروع الكهربائية وتوزيع التيار والتوتر.",
    introduction:
      "في دارة التفرع يوجد أكثر من مسار للتيار الكهربائي، وتتصل العناصر بين عقدتين مشتركتين أو أكثر.",
    sections: [
      {
        title: "التوتر في الفروع",
        text: "العناصر المتصلة على التفرع بين العقدتين نفسيهما لها التوتر نفسه."
      },
      {
        title: "شدة التيار",
        text: "شدة التيار الداخل إلى عقدة تساوي مجموع شدات التيارات الخارجة منها في الحالة المستقرة."
      },
      {
        title: "استقلال الفروع",
        text: "قد يستمر التيار في فروع أخرى إذا انقطع أحد الفروع، ما دامت الدارة تسمح بذلك."
      }
    ],
    formula: "I = I₁ + I₂",
    formulaExplanation:
      "في عقدة تتفرع فيها الدارة، مجموع التيارات الداخلة يساوي مجموع التيارات الخارجة.",
    example:
      "إذا كان التيار الكلي 3 A وتوزع إلى فرعين، أحدهما 1 A، فالتيار في الفرع الثاني 2 A.",
    exercise: {
      question: "في دارة تفرع، إذا كان I = 5 A و I₁ = 2 A، فما قيمة I₂؟",
      answers: ["2 A", "3 A", "5 A", "7 A"],
      correct: 1
    }
  },
  {
    id: "power",
    title: "الاستطاعة الكهربائية",
    category: "electricity",
    icon: "💡",
    duration: "20 دقيقة",
    difficulty: "متوسط",
    description: "احسب الاستطاعة وتعرّف على وحدتها وعلاقتها بالطاقة.",
    introduction:
      "الاستطاعة الكهربائية تعبّر عن معدل تحويل الطاقة أو استهلاكها خلال الزمن، وفق نوع الجهاز وظروف عمله.",
    sections: [
      {
        title: "وحدة الاستطاعة",
        text: "تقاس الاستطاعة بالواط W، ونرمز لها بالحرف P."
      },
      {
        title: "العلاقة الكهربائية",
        text: "في دارة كهربائية، يمكن حساب الاستطاعة الكهربائية بالعلاقة P = U × I عند معرفة التوتر وشدة التيار."
      },
      {
        title: "الطاقة والزمن",
        text: "عند ثبات الاستطاعة، الطاقة المستهلكة تساوي الاستطاعة مضروبة في الزمن. يجب الانتباه إلى وحدات الزمن والطاقة."
      }
    ],
    formula: "P = U × I",
    formulaExplanation:
      "الاستطاعة بالواط تساوي التوتر بالفولت مضروبًا في شدة التيار بالأمبير.",
    example:
      "جهاز يعمل بتوتر 12 V ويمر فيه تيار 2 A، استطاعته الكهربائية 24 W.",
    exercise: {
      question: "جهاز يعمل بتوتر 10 V وتيار 2 A. ما استطاعته؟",
      answers: ["5 W", "12 W", "20 W", "100 W"],
      correct: 2
    }
  },
  {
    id: "chemical-change",
    title: "التحول الكيميائي",
    category: "chemistry",
    icon: "🧪",
    duration: "18 دقيقة",
    difficulty: "متوسط",
    description: "ميّز بين المتفاعلات والنواتج وافهم التحول الكيميائي.",
    introduction:
      "أثناء التحول الكيميائي تختفي بعض الأنواع الكيميائية، تسمى المتفاعلات، وتظهر أنواع أخرى تسمى النواتج.",
    sections: [
      {
        title: "المتفاعلات والنواتج",
        text: "المتفاعلات هي المواد الموجودة قبل التحول، أما النواتج فهي المواد المتشكلة بعده."
      },
      {
        title: "دلائل التحول",
        text: "قد تظهر فقاعات غازية أو يتغير اللون أو تتشكل مادة صلبة جديدة. يجب تفسير هذه الملاحظات حسب التجربة."
      },
      {
        title: "حفظ الذرات",
        text: "في المعادلة الكيميائية الموزونة، يبقى عدد ذرات كل عنصر محفوظًا بين طرفي المعادلة."
      }
    ],
    formula: "متفاعلات → نواتج",
    formulaExplanation:
      "تمثل هذه الكتابة العامة تحول المواد المتفاعلة إلى مواد ناتجة.",
    example:
      "عند حدوث تفاعل كيميائي مناسب، يمكن ملاحظة انطلاق غاز. لا يكفي ظهور الفقاعات وحده لتحديد نوع الغاز.",
    exercise: {
      question: "ما اسم المواد الموجودة بعد التحول الكيميائي؟",
      answers: ["المتفاعلات", "النواتج", "الأدوات", "المذيبات دائمًا"],
      correct: 1
    }
  },
  {
    id: "motion",
    title: "الحركة والسرعة",
    category: "mechanics",
    icon: "🚀",
    duration: "20 دقيقة",
    difficulty: "متوسط",
    description: "احسب السرعة المتوسطة وميّز بين الحركة والسكون.",
    introduction:
      "توصف حركة جسم بالنسبة إلى مرجع معين. وقد يكون الجسم ساكنًا بالنسبة إلى مرجع ومتحركًا بالنسبة إلى مرجع آخر.",
    sections: [
      {
        title: "السرعة المتوسطة",
        text: "تحسب السرعة المتوسطة بقسمة المسافة المقطوعة على المدة الزمنية المستغرقة."
      },
      {
        title: "الوحدات",
        text: "إذا كانت المسافة بالمتر والزمن بالثانية، تكون السرعة بالمتر في الثانية m/s."
      },
      {
        title: "المرجع",
        text: "وصف الحركة يتطلب تحديد المرجع الذي نلاحظ الحركة بالنسبة إليه."
      }
    ],
    formula: "v = d / t",
    formulaExplanation:
      "السرعة المتوسطة تساوي المسافة المقطوعة مقسومة على الزمن المستغرق.",
    example:
      "جسم قطع 100 متر خلال 20 ثانية، سرعته المتوسطة 5 m/s.",
    exercise: {
      question: "قطع جسم 60 مترًا خلال 10 ثوانٍ. ما سرعته المتوسطة؟",
      answers: ["3 m/s", "6 m/s", "10 m/s", "600 m/s"],
      correct: 1
    }
  }
];

/* ---------- 3. Quiz Database ---------- */

const questions = [
  {
    question: "ما وحدة قياس شدة التيار الكهربائي؟",
    answers: ["الفولت", "الأمبير", "الأوم", "الواط"],
    correct: 1,
    explanation: "الأمبير A هي وحدة قياس شدة التيار الكهربائي."
  },
  {
    question: "ما الجهاز المستخدم لقياس التوتر الكهربائي؟",
    answers: ["الأمبيرمتر", "الفولتمتر", "المحرار", "الميزان"],
    correct: 1,
    explanation: "الفولتمتر يقيس التوتر الكهربائي بين طرفي عنصر."
  },
  {
    question: "ما العلاقة الصحيحة لقانون أوم؟",
    answers: ["U = R × I", "U = R + I", "U = I / R", "U = R - I"],
    correct: 0,
    explanation: "قانون أوم للمقاومة الأومية هو U = R × I."
  },
  {
    question: "مقاومة 6 Ω تحت توتر 12 V. ما شدة التيار؟",
    answers: ["0.5 A", "2 A", "6 A", "72 A"],
    correct: 1,
    explanation: "I = U / R = 12 / 6 = 2 A."
  },
  {
    question: "ما وحدة قياس الاستطاعة الكهربائية؟",
    answers: ["الجول", "الأوم", "الواط", "الأمبير"],
    correct: 2,
    explanation: "الواط W هو وحدة قياس الاستطاعة."
  },
  {
    question: "ما العلاقة المبسطة للاستطاعة الكهربائية؟",
    answers: ["P = U × I", "P = U / I", "P = U + I", "P = U - I"],
    correct: 0,
    explanation: "الاستطاعة الكهربائية تساوي التوتر مضروبًا في شدة التيار."
  },
  {
    question: "في دارة تسلسلية بسيطة، ماذا يحدث للتيار عند انقطاع المسار؟",
    answers: [
      "يزداد دائمًا",
      "يستمر دون تغيير",
      "يتوقف التيار في المسار",
      "يتحول إلى توتر"
    ],
    correct: 2,
    explanation: "انقطاع المسار يفتح الدارة ويمنع مرور التيار."
  },
  {
    question: "ما وحدة قياس السرعة عندما تكون المسافة بالمتر والزمن بالثانية؟",
    answers: ["m/s", "kg", "V", "Ω"],
    correct: 0,
    explanation: "وحدة السرعة الموافقة لهاتين الوحدتين هي متر في الثانية."
  },
  {
    question: "ما اسم المواد التي تتشكل بعد تحول كيميائي؟",
    answers: ["المتفاعلات", "النواتج", "القياسات", "المراجع"],
    correct: 1,
    explanation: "تسمى المواد التي تتشكل أثناء التحول الكيميائي بالنواتج."
  },
  {
    question: "إذا كانت المسافة 100 m والزمن 20 s، فما السرعة المتوسطة؟",
    answers: ["2 m/s", "5 m/s", "20 m/s", "2000 m/s"],
    correct: 1,
    explanation: "v = d / t = 100 / 20 = 5 m/s."
  }
];

/* ---------- 4. DOM Helpers ---------- */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

function safeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- 5. Lesson Rendering ---------- */

function renderLessons() {
  const grid = $("#lessonGrid");

  if (!grid) return;

  const search = ($("#lessonSearch")?.value || "")
    .trim()
    .toLocaleLowerCase("ar");

  const category = $("#lessonFilter")?.value || "all";

  const filtered = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLocaleLowerCase("ar").includes(search) ||
      lesson.description.toLocaleLowerCase("ar").includes(search);

    const matchesCategory =
      category === "all" || lesson.category === category;

    return matchesSearch && matchesCategory;
  });

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>لم نجد دروسًا مطابقة لبحثك.</p>
        <p>جرّب كلمة أخرى أو اختر تصنيفًا مختلفًا.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((lesson) => {
    const completed = state.completedLessons.includes(lesson.id);

    return `
      <article class="lesson-card ${completed ? "completed" : ""}">
        <div class="lesson-card-top">
          <span class="lesson-icon">${lesson.icon}</span>
          <span class="lesson-tag">
            ${completed ? "✓ مكتمل" : safeText(lesson.difficulty)}
          </span>
        </div>

        <h3>${safeText(lesson.title)}</h3>
        <p>${safeText(lesson.description)}</p>

        <div class="lesson-meta">
          <span>◷ ${safeText(lesson.duration)}</span>
          <span>${completed ? "تمت المراجعة" : "درس تعليمي"}</span>
        </div>
function answerLessonExercise(index) {
  const modal = $("#lessonModal");
  const title = $("#modalTitle", modal);

  if (!title) return;

  const lesson = lessons.find((item) => item.title === title.textContent);

  if (!lesson) return;

  const buttons = $$("[data-exercise-answer]", modal);
  const feedback = $("#lessonExerciseFeedback", modal);

  buttons.forEach((button) => {
    button.disabled = true;

    const answerIndex = Number(button.dataset.exerciseAnswer);

    if (answerIndex === lesson.exercise.correct) {
      button.classList.add("correct");
    } else if (answerIndex === index) {
      button.classList.add("wrong");
    }
  });

  const correct = index === lesson.exercise.correct;

  feedback.textContent = correct
    ? "إجابة صحيحة! أحسنت 👏"
    : "ليست الإجابة الصحيحة. راجع الشرح وحاول مرة أخرى في المراجعة.";

  feedback.className = `quiz-feedback ${correct ? "success" : "error"}`;

  if (correct) {
    const exerciseKey = `exercise-${lesson.id}`;

    if (!state.answeredQuestions.includes(exerciseKey)) {
      state.a
