export interface PersonalInfo {
  name: string;
  title: string;
  age: string;
  location: string;
  phone: string;
  phoneFormatted: string;
  telegram: string;
  telegramUrl: string;
  github: string;
  githubUrl: string;
  email?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  status: 'Production (.uz)' | 'In Progress / MVP';
  isNDA: boolean;
  ndaNotice: string;
  category: 'Video & Real-Time' | 'AI & LLM' | 'Monitoring & Maps' | 'HR & Attendance' | 'CRM & Logistics' | 'ERP & Finance' | 'Forms & Services';
  period: string;
  clientOrOrg: string;
  shortSummary: string;
  businessObjective: string;
  architectureSolutions: {
    title: string;
    description: string;
    tags: string[];
  }[];
  keyFeatures: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  challengesAndSolutions: string;
  liveDemoNote: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skillCategories: SkillCategory[];
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  languages: LanguageItem[];
  projects: ProjectCaseStudy[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Valiyev Abduvosid",
    title: "Middle Frontend Developer (React / TypeScript)",
    age: "18 yosh",
    location: "Qo'qon / Toshkent (Masofaviy yoki ofisda ishlashga tayyor)",
    phone: "+998 94 490 09 15",
    phoneFormatted: "+998 (94) 490-09-15",
    telegram: "@Valiyev_0915",
    telegramUrl: "https://t.me/Valiyev_0915",
    github: "github.com/abduvosidvaliyev",
    githubUrl: "https://github.com/abduvosidvaliyev",
  },

  summary:
    "1.5+ yillik amaliy tajribaga ega Frontend dasturchi (React, TypeScript). Davlat va korporativ tashkilotlar uchun ERP, CRM hamda monitoring platformalarini ishlab chiqishda faol ishtirok etgan. Murakkab formalar, foydalanuvchi ruxsatlari tizimi (RBAC), E-Imzo moduli, WebRTC (LiveKit), WebSocket va AI-streaming texnologiyalarini frontendga integratsiya qilish ko'nikmasiga ega.",

  skillCategories: [
    {
      title: "Asosiy texnologiyalar",
      skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3"],
    },
    {
      title: "State & Data Fetching",
      skills: [
        "TanStack Query (React Query)",
        "Redux Toolkit",
        "RESTful API",
        "Axios (Interceptors)",
        "Fetch ReadableStream (SSE)",
      ],
    },
    {
      title: "Real-Time & Integratsiyalar",
      skills: [
        "WebSockets",
        "LiveKit (WebRTC Video/Audio/Chat)",
        "E-Imzo (Elektron raqamli imzo)",
      ],
    },
    {
      title: "UI & Formalar",
      skills: [
        "Tailwind CSS",
        "Ant Design (AntD)",
        "React Hook Form",
        "Virtual Scroll (katta jadvallar optimizatsiyasi)",
      ],
    },
    {
      title: "BaaS & Vositalar",
      skills: ["Supabase", "Firebase", "Git", "GitHub", "Vite"],
    },
  ],

  workExperience: [
    {
      company: '"Raqamli Nazorat" MChJ (LLC)',
      role: "Frontend Developer",
      period: "Mart 2026 – Oktabr 2026",
      location: "O'zbekiston",
      description:
        "Davlat idoralari va korxonalari uchun ichki tizimlar (ERP, CRM, Monitoring) frontend qismini ishlab chiqish va optimallashtirish:",
      achievements: [
        "Raqamli Muloqot: LiveKit (WebRTC) asosida video-konferensiya va 0ms jonli chat tizimi; Raqamli Passport orqali avtorizatsiya va yig'ilish bayonnomasini shakllantirish.",
        "SI-Assistent: LLM javoblarini real-vaqtda oqimli (SSE / ReadableStream) chiqarish, Markdown syntax highlighting va fayllarni drag-and-drop yuklash paneli.",
        "Unusual Consumption (Gaz Anomaliyalari): Noqonuniy sarf holatlarini O'zbekiston xaritasi va 15+ ustunli jadvallarda monitoring qilish, WebSocket audio signallar va PDF aktlar tuzish.",
        "M-Gaz Nazorat: Hududiy gaz shoxobchalari limitlari, kaskadli hududiy filtrlar va E-Imzo brauzer moduli orqali xesh olib elektron imzolash tizimi.",
        "Raqamli boshqaruv: Xodimlar topshiriqlari ijrosi, KPI va avtomatik oylik maosh hisoblash, real-vaqt WebSocket push-bildirishnomalari.",
        "HGT-Attendance: FaceID/turniket bilan bog'langan jonli davomat tabeli; katta hajmdagi oylik hisobotlarni useMemo va Virtual Scroll bilan optimallashtirish.",
        "ConverCRM: Logistika va yuk yetkazish liniyalari; SuperAdmin tomonidan har bir amal va tugma uchun nozik ruxsatlar (Granular RBAC) boshqaruvi.",
      ],
    },
    {
      company: "Frilans (Mustaqil Frontend Dasturchi)",
      role: "Frontend Developer",
      period: "Mart 2025 – Mart 2026 (1 yil)",
      location: "Masofaviy",
      description:
        "Buyurtmachilar talabi asosida veb-ilovalar va boshqaruv panellarining (Admin Dashboard) MVP hamda to'liq Frontend qismini React, TypeScript va Tailwind CSS yordamida ishlab chiqish.",
      achievements: [
        "Murakkab ko'p bosqichli formalar (Step Wizards), React Hook Form validatsiyalari hamda localStorage draft mexanizmlari.",
        "Rasm va fayllarni brauzerda siqish (client-side image compression) orqali tarmoq trafigini va server yuklamasini kamaytirish.",
        "Axios Interceptors orqali avtomatik Refresh Token almashish, xavfsiz JWT sessiya boshqaruvi va tarmoq xatoliklarini markazlashgan qayta ishlash.",
      ],
    },
  ],

  education: [
    {
      institution: '"Pro Teach" o\'quv markazi (Qo\'qon)',
      degree: "Frontend Development kursi",
      period: "2023 – 2024",
      location: "Qo'qon, O'zbekiston",
      details: "Zamonaviy JavaScript (ES6+), React.js ekotizimi, TypeScript va veb-arxitektura amaliyotlari.",
    },
  ],

  languages: [
    {
      language: "O'zbek tili",
      level: "Ona tili",
    },
    {
      language: "Ingliz tili",
      level: "Texnik hujjatlarni (Documentation) o'qish va tushunish (Reading & Technical comprehension)",
    },
  ],

  projects: [
    {
      id: "raqamli-muloqot",
      title: "Raqamli Muloqot",
      subtitle: "Idoralararo onlayn video-uchrashuvlar va yig'ilishlar boshqaruvi platformasi",
      status: "Production (.uz)",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "Video & Real-Time",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ (Davlat sektori buyurtmasi)',
      shortSummary:
        "Davlat tashkilotlari o'rtasida xavfsiz video-yig'ilishlar o'tkazish, 0ms kechikishdagi chat va majlis yakunida ishtirokchilar ro'yxati hamda bayonnomalar shakllantirish tizimi.",
      businessObjective:
        "Tashqi xorijiy servislardan (Zoom, Google Meet) mustaqil bo'lgan, milliy xavfsizlik va yopiq tarmoq talablariga to'liq javob beruvchi ichki video-konferensiya infratuzilmasini ta'minlash.",
      architectureSolutions: [
        {
          title: "WebRTC Video/Audio (LiveKit)",
          description:
            "LiveKit SDK orqali ko'p foydalanuvchili video streamlar boshqaruvi, mikrofon/kamera holatlari, tarmoq sifati monitoringi va ekranni almashish (Screen Sharing) moduli qurildi.",
          tags: ["LiveKit", "WebRTC", "MediaStream"],
        },
        {
          title: "0ms Kechikishli Jonli Chat & WebSocket",
          description:
            "Majlis davomida xabarlar almashish, fayllar uzatish va qo'l ko'tarish (hand raise) harakatlari alohida WebSocket kanallari orqali zudlik bilan sinxronlandi.",
          tags: ["WebSocket", "Optimistic UI", "TanStack Query"],
        },
        {
          title: "Raqamli Passport & Avtorizatsiya",
          description:
            "Davlat 'Raqamli Passport' servisi orqali xavfsiz autentifikatsiya, ishtirokchilar rollari va majlis yakuniy bayonnomasini PDF shakllantirish tizimi.",
          tags: ["Raqamli Passport", "SSO", "Identity"],
        },
      ],
      keyFeatures: [
        "LiveKit SFU orqali 50+ ishtirokchili barqaror video-konferensiya",
        "Davlat 'Raqamli Passport' orqali shaxsni tasdiqlash va kirish",
        "Yig'ilish yakunida PDF bayonnoma va qatnashchilar ro'yxatini avtomat shakllantirish",
        "Mikrofon faolligini aniqlash (Active Speaker detection) va video tartiblash",
        "Xavfsiz kutish zallari (Waiting Room) va moderator boshqaruv vositalari",
      ],
      techStack: [
        { category: "Core", items: ["React 18", "TypeScript", "Vite"] },
        { category: "Streaming & RTC", items: ["LiveKit Client SDK", "WebRTC", "WebSocket"] },
        { category: "Security & Auth", items: ["Raqamli Passport SSO", "JWT Auth"] },
        { category: "State & Styling", items: ["TanStack Query", "Tailwind CSS", "Lucide Icons"] },
      ],
      challengesAndSolutions:
        "Kam tarmoq tezligida WebRTC videolari qotishining oldini olish uchun adaptiv bitrate va faol so'zlovchiga avtomatik fokuslanish mexanizmi joriy etildi. Xonalar boshqaruvi va ishtirokchilar oqimi xuklar orqali optimallashtirildi.",
      liveDemoNote: "Texnik suhbat chog'ida xonalarni boshqarish arxitekturasi va LiveKit xuklarini jonli ko'rsatishga tayyorman.",
    },

    {
      id: "si-assistent",
      title: "SI-Assistent",
      subtitle: "Korporativ AI (LLM) yordamchisi va hujjatlar intellektual tahlili tizimi",
      status: "Production (.uz)",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "AI & LLM",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ (Korporativ sektor)',
      shortSummary:
        "Korporativ hujjatlar (PDF/Word/Excel) asosida ishlovchi, xavfsiz ichki LLM yordamchisi. Real-vaqtda so'zma-so'z oqimli (SSE) javob berish va hujjatlar bilan o'qitish paneli.",
      businessObjective:
        "Tashkilot xodimlariga minglab sahifalik me'yoriy-huquqiy va ichki korporativ hujjatlardan 3 soniyada aniq ma'lumot topish va tahlil qilish imkonini berish.",
      architectureSolutions: [
        {
          title: "ReadableStream (SSE) Streaming Javoblar",
          description:
            "Fetch API ning ReadableStream va TextDecoder yordamida LLM javoblarini so'zma-so'z ekranga uzluksiz render qilish, foydalanuvchiga ChatGPT kabi silliq tajriba yaratish.",
          tags: ["Fetch API", "ReadableStream", "SSE", "AbortController"],
        },
        {
          title: "Markdown & Dynamic Syntax Highlighting",
          description:
            "AI javobidagi Markdown jadvallari, formulalari va kod bloklarini chiroyli nusxalash (copy button) bilan formatlash.",
          tags: ["Markdown Parser", "PrismJS / Highlight", "Copy Clipboard"],
        },
        {
          title: "Drag-and-Drop Hujjatlar Yuklash & Token Analytics",
          description:
            "PDF, DOCX, XLSX fayllarni bo'laklab yuklash, serverga vektorizatsiya (RAG) uchun uzatish va sarflangan tokenlar/tezlik statistikasini vizuallashtirish.",
          tags: ["File Drag&Drop", "RAG Pipeline UI", "Chart Analytics"],
        },
      ],
      keyFeatures: [
        "LLM generatsiyasini darhol to'xtatish (AbortController integratsiyasi)",
        "Chat sessiyalar tarixi va kontekst bo'yicha qidiruv",
        "Har bir AI javobining qaysi hujjat sahifasidan olinganini ko'rsatuvchi manbalar (Citations) bloki",
        "Korporativ bilimlar bazasiga fayllarni tekshirib yuklash validatsiyasi",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "AI Integratsiya", items: ["Fetch ReadableStream", "Server-Sent Events (SSE)", "AbortController"] },
        { category: "Tools & UX", items: ["React-Markdown", "Lucide React", "TanStack Query"] },
      ],
      challengesAndSolutions:
        "Katta hajmdagi streaming ma'lumotlar oqimida har bir yangi so'z re-render keltirib chiqarishining oldini olish uchun bufferlash va requestAnimationFrame yordamida render sikllari silliqlashtirildi.",
      liveDemoNote: "Streaming hooklari va AbortController arxitekturasini texnik intervyuda tushuntirib bera olaman.",
    },

    {
      id: "unusual-consumption",
      title: "Unusual Consumption (Gaz Anomaliyalari)",
      subtitle: "Noqonuniy gaz sarfini tahlil qilish va dispetcherlik nazorati platformasi",
      status: "Production (.uz)",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "Monitoring & Maps",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ (Energetika sektori)',
      shortSummary:
        "O'zbekiston xaritasi va 15+ ustunli jadvallarda gaz iste'molidagi keskin anomaliyalarni aniqlash, ovozli WebSocket ogohlantirishlar va PDF aktlar tuzish tizimi.",
      businessObjective:
        "Energiya resurslarining noqonuniy sarfi va o'g'irlik holatlarini real-vaqt rejimida avtomatlashtirilgan tarzda fosh qilish va inspektorlar ishini nazorat qilish.",
      architectureSolutions: [
        {
          title: "Interaktiv Xarita & Klasterlash",
          description:
            "Hududlar kesimida minglab gaz o'lchash nuqtalarini klasterlar orqali tezkor ko'rsatish, favqulodda zonalarni vizual belgilash.",
          tags: ["Leaflet/Mapbox", "Marker Clustering", "GeoJSON"],
        },
        {
          title: "Ovozli Alertlar & WebSocket Eshituvchi",
          description:
            "Kritik anomaliya yuz berganda dispetcher brauzerida audio signal va miltillovchi vizual bildirishnoma chiqarish mexanizmi.",
          tags: ["Web Audio API", "WebSocket Listener", "Desktop Notifications"],
        },
        {
          title: "Inspeksiya Aktlari (PDF) & Rasm Siqish",
          description:
            "Joyiga chiqqan inspektorlar yuklagan noqonuniy ulanish fotosuratlarini brauzerda siqish va elektron dalolatnoma (PDF) generatsiya qilish.",
          tags: ["Client-side Compression", "PDFMake / jsPDF", "FormData Upload"],
        },
      ],
      keyFeatures: [
        "15+ ustunli murakkab analitik jadvallarda multi-sort va oraliq filtrlar",
        "Jonli WebSocket orqali keluvchi kritik anomaliyalar oqimi",
        "Inspektorlar xulosasini PDF dalolatnoma ko'rinishida chop etish",
        "O'zbekiston viloyatlari bo'yicha rangli issiqlik xaritasi (Heatmap)",
      ],
      techStack: [
        { category: "Core", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Map & Viz", items: ["Interactive Maps", "Leaflet GeoJSON", "Recharts"] },
        { category: "Data & PDF", items: ["TanStack Query", "Client Image Compressor", "PDF Generator"] },
      ],
      challengesAndSolutions:
        "Minglab xarita nuqtalarini filtrlashda brauzer qotib qolmasligi uchun Web Worker yordamida ma'lumotlarni saralash va xaritada faqat ko'rinib turgan maydon (Bounding Box) obyektlarini yuklash yo'lga qo'yildi.",
      liveDemoNote: "Xarita klasterlash algoritmlari va WebSocket audio alertlar strukturasini jonli ko'rsatish mumkin.",
    },

    {
      id: "m-gaz-nazorat",
      title: "M-Gaz Nazorat",
      subtitle: "Hududiy gaz hisob-kitoblari va E-Imzo bilan imzolash boshqaruv portali",
      status: "In Progress / MVP",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "Monitoring & Maps",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ',
      shortSummary:
        "Gaz shoxobchalari (AGTKSH) limitlari, kaskadli filtrlash tizimi (Viloyat > Tuman > Shoxobcha) va E-Imzo xesh olish moduli integratsiyasi.",
      businessObjective:
        "Gaz yetkazib berish shartnomalari, kunlik/oylik limitlar va haqiqiy ko'rsatkichlarni solishtirib, hisob-faktura va dalolatnomalarni raqamli imzolash.",
      architectureSolutions: [
        {
          title: "E-Imzo Brauzer Integratsiyasi (PKCS#7)",
          description:
            "E-Imzo USB kalit yoki faylli sertifikatlar ro'yxatini olish, hujjat xeshini hisoblash va xavfsiz raqamli imzo qo'yish oqimi.",
          tags: ["E-Imzo API", "Digital Signature", "Browser Extension Interop"],
        },
        {
          title: "Kaskadli 3-Bosqichli Filtrlash",
          description:
            "Viloyat tanlanganda tumanlarni, tuman tanlanganda shoxobchalarni asinxron React Query keshidan kechikishsiz oluvchi bog'liq selektlar.",
          tags: ["Dependent Queries", "Debounce Filter", "Cascading Dropdowns"],
        },
      ],
      keyFeatures: [
        "E-Imzo sertifikatining amal qilish muddatini tekshirish",
        "Kunlik iste'mol grafigi va limitdan oshgan holatlarni avtomatik qizil rangda belgilash",
        "O'zbekiston hududlari bo'yicha tahliliy kartochkalar",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Crypto", items: ["E-Imzo Native Wrapper", "SHA-256 Hashing"] },
        { category: "State", items: ["TanStack Query", "Zustand"] },
      ],
      challengesAndSolutions:
        "E-Imzo plaginining turli xil operatsion tizimlardagi kutilmagan javoblarini qayta ishlash uchun xatoliklar qamrab olinadigan universal wrapper yozildi.",
      liveDemoNote: "E-Imzo integratsiyasi qanday ishlashini batafsil tushuntirib bera olaman.",
    },

    {
      id: "raqamli-boshqaruv",
      title: "Raqamli boshqaruv",
      subtitle: "Ichki korporativ vazifalar, xodimlar KPI va avtomatik oylik hisoblash tizimi",
      status: "Production (.uz)",
      isNDA: false,
      ndaNotice:
        "Ushbu tizim hamma uchun ochiq korporativ boshqaruv platformasi hisoblanadi.",
      category: "HR & Attendance",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ (Boshqaruv tizimi)',
      shortSummary:
        "Xodimlar vazifalari ijrosi, jarima/bonuslar hisobi, har oyning 4-sanasida avtomatik oylik shakllantirish va real-vaqt bildirishnomalari platformasi.",
      businessObjective:
        "Korxona bo'limlari o'rtasida shaffof KPI reytingini yuritish, topshiriqlar muddatini nazorat qilish va inson omilisiz oylik maosh hisobini yo'lga qo'yish.",
      architectureSolutions: [
        {
          title: "Debounced Qidiruv & Optimistik Yangilanishlar",
          description:
            "Katta vazifalar ro'yxatida tezkor qidiruv, vazifa statusini o'zgartirganda server javobini kutmasdan UI ni yangilovchi Optimistic Updates.",
          tags: ["Debounce Hook", "Optimistic Mutation", "React Query"],
        },
        {
          title: "Avtomatik Oylik Hisoblash Algoritmi",
          description:
            "Har oyning 4-sanasida xodimning KPI ballari, kechikish daqiqalari va topshiriqlar holatini jamlab oylik vedomostini generatsiya qilish.",
          tags: ["Financial Calculation", "Monthly Aggregator", "Data Grid"],
        },
      ],
      keyFeatures: [
        "Kanban va Ro'yxat ko'rinishidagi topshiriqlar boshqaruvi",
        "Xodim profilida shaxsiy KPI grafigi va jarimalar tarixi",
        "Yangi topshiriq va sharhlar haqida real-vaqt WebSocket push-bildirishnomalari",
      ],
      techStack: [
        { category: "Tech", items: ["React", "TypeScript", "Tailwind CSS", "React Query", "WebSocket"] },
      ],
      challengesAndSolutions:
        "Ko'plab o'zgaruvchi topshiriqlar oqimida keshni to'g'ri yangilash uchun React Query kesh kalitlari (Query Key Factory) tizimi yo'lga qo'yildi.",
      liveDemoNote: "Vazifalar boshqaruvi va hisob-kitob jadvallarining to'liq kod tuzilmasi mavjud.",
    },

    {
      id: "hgt-attendance",
      title: "HGT-Attendance",
      subtitle: "FaceID va elektron turniketlar bilan integratsiyalangan jonli davomat tizimi",
      status: "Production (.uz)",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "HR & Attendance",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ',
      shortSummary:
        "Xodimlar FaceID/Turniketdan o'tgan onda WebSocket orqali jonli yangilanuvchi oylik tabel va hisobotlarni Excel/PDF/CSV formatlarida eksport qilish.",
      businessObjective:
        "Yuzlab xodimlarning ishga kelib-ketish vaqtlarini soniyasigacha avtomatlashtirilgan tarzda qayd etish va oylik ish vaqti hisobotini shakllantirish.",
      architectureSolutions: [
        {
          title: "Virtual Scroll & Katta Tabellar Optimizatsiyasi",
          description:
            "Oylik 31 kunlik katakchalar va 500+ xodim ma'lumotlarini qotishlarsiz chiqarish uchun Virtual Scroll va chuqur memoizatsiya (useMemo, React.memo).",
          tags: ["Virtual Scroll", "useMemo", "DOM Recyling"],
        },
        {
          title: "FaceID WebSocket Oqimi",
          description:
            "Turniketdan o'tilganda xodim rasmi va vaqti darhol dispetcher monitorida paydo bo'lishini ta'minlovchi doimiy WebSocket oqimi.",
          tags: ["WebSocket Stream", "Event Dispatcher", "Audio Beep"],
        },
        {
          title: "Multi-Format Export (Excel / CSV / PDF)",
          description:
            "HR bo'limi uchun rasmiy davomat tabeli shablonini brauzerning o'zida XLSX va PDF formatlarida chiroyli generatsiya qilish.",
          tags: ["SheetJS (XLSX)", "AutoTable PDF", "Blob Stream"],
        },
      ],
      keyFeatures: [
        "Kechikishlar, erta ketishlar va sababli qoldirishlar statistikasi",
        "Oylik ish soatlari va smenalar balansi kalkulyatori",
        "Oylik hisobotni 1 tugma bilan Excel va chop etishga tayyor PDF qilish",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Optimization", items: ["Virtual Windowing", "useMemo", "React.memo"] },
        { category: "Real-time & Export", items: ["WebSocket", "SheetJS (XLSX)", "jsPDF"] },
      ],
      challengesAndSolutions:
        "Har kuni minglab yozuvlar kelib tushganda oylik jadval qayta hisoblanishini sekundiga 60 FPS darajasida ushlab turish uchun ma'lumotlar tuzilmasi Hash Map shaklida normallashtirildi.",
      liveDemoNote: "Virtual Scroll va WebSocket oqimini jonli taqdimotda ko'rsatishga tayyorman.",
    },

    {
      id: "conver-frontend",
      title: "ConverCRM",
      subtitle: "Yuk yetkazish liniyalari, ombor kirim-chiqimi va Granular RBAC boshqaruv tizimi",
      status: "Production (.uz)",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "CRM & Logistics",
      period: "2026",
      clientOrOrg: '"Raqamli Nazorat" MChJ (Logistika xoldingi)',
      shortSummary:
        "Xalqaro yuk tashish liniyalari, ombor harakatlari va SuperAdmin tomonidan har bir tugma va sahifaga individual ruxsat (Granular RBAC) beruvchi CRM tizimi.",
      businessObjective:
        "Xalqaro va mahalliy yuk harakatlarini, haydovchilar to'lovlarini va bojxona statuslarini yagona platformada birlashtirib, xavfsizlikni to'liq ta'minlash.",
      architectureSolutions: [
        {
          title: "Granular RBAC (Dynamic Permissions)",
          description:
            "Foydalanuvchi roli ichida har bir forma, eksport tugmasi yoki narx ustuni uchun ruxsatlarni dinamik tekshiruvchi <Can do='...' /> va Custom Hook tizimi.",
          tags: ["Granular RBAC", "Security Context", "Permission Gate"],
        },
        {
          title: "Redux Toolkit & Katta Holat Boshqaruvi",
          description:
            "Murakkab buyurtma jarayoni, ombor kirimlari va ko'p bosqichli holat o'zgarishlarini boshqarish uchun Redux Toolkit slice'lari arxitekturasi.",
          tags: ["Redux Toolkit", "RTK Query", "Immutable State"],
        },
      ],
      keyFeatures: [
        "Yuk yo'nalishlari va konteynerlar statusini kuzatish",
        "Har bir foydalanuvchi roli uchun nozik ruxsatlar boshqaruv paneli",
        "Moliyaviy hisobotlar va mijozlar balansini hisoblash",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS"] },
      ],
      challengesAndSolutions:
        "Dinamik ruxsatlar o'zgarganda sahifani qayta yuklamasdan menyular va harakat tugmalarini avtomatik moslashtiruvchi Permission Context ishlab chiqildi.",
      liveDemoNote: "RBAC arxitekturasini kod orqali jonli ko'rsatib bera olaman.",
    },

    {
      id: "raqamli-sovchi",
      title: "Raqamli Sovchi",
      subtitle: "Ko'p bosqichli Step-Wizard, rasm siqish va moderatorlik xizmati platformasi",
      status: "Production (.uz)",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "Forms & Services",
      period: "2025 – 2026",
      clientOrOrg: "Xususiy buyurtma (Platforma)",
      shortSummary:
        "4-5 bosqichli Step Wizard anketa to'ldirish, brauzerda rasmlarni siqish, localStorage draft saqlash va moderatorlar uchun ko'p parametrli filtrli CRM paneli.",
      businessObjective:
        "Foydalanuvchilar uchun konversiyasi yuqori, uzluksiz ishlaydigan anketalar to'ldirish va moderatorlar tomonidan arizalarni qulay tekshirish tizimini qurish.",
      architectureSolutions: [
        {
          title: "Step Wizard & Auto-Save Draft",
          description:
            "React Hook Form orqali har bir qadamni tekshirish va sahifa yangilansa ham ma'lumotlar yo'qolmasligi uchun localStorage ga avtomatik qoralamani saqlash.",
          tags: ["React Hook Form", "Step Wizard", "Auto-Save"],
        },
        {
          title: "Client-Side Rasm Siqish (Canvas API)",
          description:
            "Foydalanuvchi 15 MB lik rasmlar yuklaganda, brauzerning o'zida sifatini yo'qotmagan holda 500 KB gacha siqib keyin serverga yuborish mexanizmi.",
          tags: ["Canvas API", "Image Compression", "WebP Converter"],
        },
      ],
      keyFeatures: [
        "Mobil qurilmalarga to'liq moslashgan qulay anketalar oqimi",
        "Moderatorlar uchun rasmlarni solishtirish va tasdiqlash paneli",
        "WebSocket orqali anketaning yangi statusi haqida bildirishnoma",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "React Hook Form", "Tailwind CSS"] },
      ],
      challengesAndSolutions:
        "Katta rasmlar yuklanishida mobil brauzerlarning xotirasi to'lib ketishini oldini olish uchun fayllarni ketma-ketlikda siqish navbati (queue) joriy etildi.",
      liveDemoNote: "Step Wizard va rasm siqish algoritmini ko'rsatishga tayyor.",
    },

    {
      id: "gilam-erp",
      title: "Gilam-ERP (To'qimachilik & Ishlab chiqarish)",
      subtitle: "Gilam fabrikasi uchun metraj, tannarx va ombor qoldig'i hisob-kitob tizimi",
      status: "In Progress / MVP",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "ERP & Finance",
      period: "2026",
      clientOrOrg: 'Ishlab chiqarish korxonasi ("Raqamli Nazorat" MChJ)',
      shortSummary:
        "15+ ustunli ishlab chiqarish metrajlari, xom-ashyo qoldig'i va tannarxini dinamik formulalar bilan hisoblovchi Virtual Scroll jadvallar tizimi.",
      businessObjective:
        "To'qimachilik fabrikasida xom-ashyodan tayyor gilamgacha bo'lgan zanjirda yo'qotishlarni kamaytirish va har bir partiyaning aniq tannarxini avtomatik hisoblash.",
      architectureSolutions: [
        {
          title: "Dinamik Matematik Formulali Custom Hooklar",
          description:
            "Eni, bo'yi, zichligi va ip turlariga qarab har bir kvadrat metr tannarxini jonli hisoblab boruvchi hisob-kitob dvigateli.",
          tags: ["Custom Math Hooks", "Dynamic Formulas", "Formula Engine"],
        },
        {
          title: "Katta Jadvallar & Tezkor Tahrirlash (Inline Editing)",
          description:
            "Jadvaldagi istalgan katakchani bosib to'g'ridan-to'g'ri o'zgartirish va natijalarni darhol umumiy balansga aks ettirish imkoniyati.",
          tags: ["Inline Edit Grid", "Virtualization", "Performance"],
        },
      ],
      keyFeatures: [
        "15+ ustunli murakkab texnologik parametrlar jadvali",
        "Xom-ashyo kam qolganda avtomatik ogohlantiruvchi indikatorlar",
        "Ishlab chiqarish partiyalari bo'yicha tahliliy hisobotlar",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "TanStack Table", "Zustand"] },
      ],
      challengesAndSolutions:
        "Jadvaldagi bir katak o'zgarganda butun jadval qayta hisoblanishini cheklash uchun hujayralar holati markazlashgan reaktiv reestrga ajratildi.",
      liveDemoNote: "Matematik formulali jadvallar va Custom hooklar strukturasini ko'rsatish mumkin.",
    },

    {
      id: "enterprise-erp",
      title: "Enterprise ERP (Moliya, HR va Xaridlar)",
      subtitle: "Yirik korxonalar uchun Ant Design va ko'p bosqichli talabnomalar tizimi",
      status: "In Progress / MVP",
      isNDA: true,
      ndaNotice:
        "Ushbu tizim davlat/korporativ xavfsizlik siyosati (NDA) bilan himoyalangan. Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud.",
      category: "ERP & Finance",
      period: "2026",
      clientOrOrg: "Davlat va korporativ tashkilotlar",
      shortSummary:
        "Xavfsiz kirish, Ant Design asosidagi modulli interfeys, ko'p bosqichli xarid talabnomalari va PDF shartnomalar generatsiyasi.",
      businessObjective:
        "Korxona moliyaviy oqimlari, xodimlar shtat jadvali va xarid arizalarini yagona, qat'iy nazorat ostidagi tizimga birlashtirish.",
      architectureSolutions: [
        {
          title: "Xavfsiz Korporativ SSO Integratsiyasi",
          description:
            "Yagona autentifikatsiya tizimi orqali foydalanuvchilarning rollarini tekshirib avtomatik kabinetga yo'naltirish.",
          tags: ["SSO", "OAuth2 / OIDC", "Identity Provider"],
        },
        {
          title: "Ko'p Bosqichli Talabnoma Marshruti (Approval Workflow)",
          description:
            "Arizaning bo'lim boshlig'i, moliya va direktor tomonidan ketma-ketlikda tasdiqlanish jarayonini vizual ko'rsatuvchi Timeline moduli.",
          tags: ["Approval Workflow", "Ant Design Steps", "Audit Trail"],
        },
      ],
      keyFeatures: [
        "Ant Design komponentlari bilan qat'iy korporativ interfeys",
        "PDF shartnomalar va aktlarni avtomat generatsiya qilish",
        "Barcha xarid jarayonlari bo'yicha to'liq audit jurnali",
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Ant Design", "Tailwind CSS", "Axios"] },
        { category: "Security", items: ["SSO Auth", "RBAC"] },
      ],
      challengesAndSolutions:
        "Murakkab tasdiqlash zanjirida foydalanuvchilar harakatlarini real vaqtda yangilab turish va ziddiyatli o'zgarishlarni tekshirish mexanizmi qurildi.",
      liveDemoNote: "Modulli tizim arxitekturasini tushuntirib berishga tayyor.",
    },
  ],
};
