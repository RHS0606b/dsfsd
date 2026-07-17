(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==================================================
     I18N — bilingual content (ID / EN)
     ================================================== */
  var translations = {
    "nav.services": { id: "Layanan", en: "Services" },
    "nav.process": { id: "Proses", en: "Process" },
    "nav.why": { id: "Kenapa Pilih Kami?", en: "Why Choose Us?" },
    "nav.testimonials": { id: "Testimoni", en: "Testimonials" },
    "nav.contact": { id: "Kontak", en: "Contact" },
    "nav.cta": { id: "Konsultasi Gratis", en: "Free Consultation" },

    "hero.eyebrow": { id: "<jasa-pengembangan-aplikasi>", en: "<app-development-service>" },
    "hero.eyebrow_close": { id: "</jasa-pengembangan-aplikasi>", en: "</app-development-service>" },
    "hero.title": {
      id: 'Aplikasi web yang bikin <span class="highlight">bisnis Anda</span> naik kelas.',
      en: 'Web applications that take <span class="highlight">your business</span> to the next level.'
    },
    "hero.desc": {
      id: "CONTECH.ID merancang & membangun aplikasi berbasis website, sistem informasi, dan tools digital custom — dari ide mentah sampai produk yang benar‑benar dipakai tim Anda tiap hari.",
      en: "CONTECH.ID designs and builds custom web applications, information systems, and digital tools — from raw idea to a product your team actually uses every day."
    },
    "hero.btn_start": { id: "Mulai Proyek Anda", en: "Start Your Project" },
    "hero.btn_how": { id: "Lihat Cara Kerja", en: "See How It Works" },
    "hero.stat1": { id: "Aplikasi Dirilis", en: "Apps Shipped" },
    "hero.stat2": { id: "Klien Puas", en: "Happy Clients" },
    "hero.stat3": { id: "Support Aktif", en: "Active Support" },
    "hero.mockup_chip": { id: "Dashboard", en: "Dashboard" },
    "hero.mini1": { id: "Order Baru", en: "New Orders" },
    "hero.mini2": { id: "Revenue", en: "Revenue" },
    "hero.float1": { id: "Deploy sukses", en: "Deploy successful" },
    "hero.float2": { id: "Growth bulan ini", en: "Growth this month" },

    "marquee.s1": { id: "RETAIL", en: "RETAIL" },
    "marquee.s2": { id: "LOGISTIK", en: "LOGISTICS" },
    "marquee.s3": { id: "PENDIDIKAN", en: "EDUCATION" },
    "marquee.s4": { id: "KESEHATAN", en: "HEALTHCARE" },
    "marquee.s5": { id: "MANUFAKTUR", en: "MANUFACTURING" },
    "marquee.s6": { id: "KEUANGAN", en: "FINANCE" },
    "marquee.s7": { id: "PROPERTI", en: "REAL ESTATE" },

    "services.eyebrow": { id: "<layanan>", en: "<services>" },
    "services.eyebrow_close": { id: "</layanan>", en: "</services>" },
    "services.title": {
      id: "Semua yang bisnis Anda<br>butuhkan, dalam satu tim.",
      en: "Everything your business<br>needs, in one team."
    },
    "services.desc": {
      id: "Dari sistem internal sampai produk yang dipakai pelanggan Anda — kami rancang, bangun, dan rawat semuanya.",
      en: "From internal systems to products your customers use — we design, build, and maintain all of it."
    },
    "services.c1_title": { id: "Aplikasi Web Custom", en: "Custom Web Applications" },
    "services.c1_desc": { id: "Dibangun dari nol sesuai alur kerja bisnis Anda, bukan template yang dipaksakan.", en: "Built from scratch around your business workflow, not a forced template." },
    "services.c2_title": { id: "Sistem Informasi", en: "Information Systems" },
    "services.c2_desc": { id: "Kelola data, laporan, dan operasional tim dalam satu sistem yang rapi dan terukur.", en: "Manage data, reports, and team operations in one clean, measurable system." },
    "services.c3_title": { id: "Company Profile & Landing Page", en: "Company Profile & Landing Pages" },
    "services.c3_desc": { id: "Tampilan depan bisnis Anda yang cepat, meyakinkan, dan enak dilihat di semua perangkat.", en: "Your business's front door — fast, convincing, and great looking on every device." },
    "services.c4_title": { id: "Integrasi & API", en: "Integrations & API" },
    "services.c4_desc": { id: "Sambungkan aplikasi Anda dengan payment gateway, ERP, atau layanan pihak ketiga lainnya.", en: "Connect your app with payment gateways, ERP systems, or other third-party services." },
    "services.c5_title": { id: "UI/UX Design", en: "UI/UX Design" },
    "services.c5_desc": { id: "Antarmuka yang mudah dipahami tim maupun pelanggan sejak pertama kali membuka aplikasi.", en: "Interfaces your team and customers understand from the very first open." },
    "services.c6_title": { id: "Maintenance & Support", en: "Maintenance & Support" },
    "services.c6_desc": { id: "Pantau performa, perbaiki bug, dan kembangkan fitur baru setelah aplikasi Anda live.", en: "We monitor performance, fix bugs, and ship new features after your app goes live." },

    "process.eyebrow": { id: "<proses>", en: "<process>" },
    "process.eyebrow_close": { id: "</proses>", en: "</process>" },
    "process.title": { id: "Proses yang jelas,<br>dari hari pertama.", en: "A clear process,<br>from day one." },
    "process.desc": { id: "Tidak ada tahap yang disembunyikan. Anda tahu persis sedang berada di mana.", en: "No hidden stages. You always know exactly where things stand." },
    "process.s1_title": { id: "Discovery", en: "Discovery" },
    "process.s1_desc": { id: "Kami gali kebutuhan, alur kerja, dan target bisnis Anda lewat sesi konsultasi mendalam.", en: "We dig into your needs, workflow, and business goals through an in-depth consultation." },
    "process.s2_title": { id: "Desain & Arsitektur", en: "Design & Architecture" },
    "process.s2_desc": { id: "Wireframe, UI, dan struktur sistem disusun sebelum satu baris kode pun ditulis.", en: "Wireframes, UI, and system structure are planned before a single line of code is written." },
    "process.s3_title": { id: "Development", en: "Development" },
    "process.s3_desc": { id: "Tim kami membangun aplikasi secara bertahap dengan update progres berkala.", en: "Our team builds the app in stages, with regular progress updates." },
    "process.s4_title": { id: "Testing & QA", en: "Testing & QA" },
    "process.s4_desc": { id: "Setiap fitur diuji di berbagai skenario nyata sebelum sampai ke tangan Anda.", en: "Every feature is tested against real-world scenarios before it reaches you." },
    "process.s5_title": { id: "Launch & Support", en: "Launch & Support" },
    "process.s5_desc": { id: "Aplikasi go‑live, dan kami tetap mendampingi untuk perbaikan serta pengembangan lanjutan.", en: "Your app goes live, and we stay on to support fixes and further development." },

    "why.eyebrow": { id: "<kenapa-pilih-kami>", en: "<why-choose-us>" },
    "why.eyebrow_close": { id: "</kenapa-pilih-kami>", en: "</why-choose-us>" },
    "why.title": { id: "Bukan sekadar vendor, kami mitra pertumbuhan Anda.", en: "Not just a vendor — your growth partner." },
    "why.desc": {
      id: "Kami percaya aplikasi yang baik lahir dari komunikasi yang jujur dan pemahaman bisnis yang dalam — bukan hanya kemampuan teknis semata.",
      en: "We believe great software comes from honest communication and deep business understanding — not technical skill alone."
    },
    "why.r1_title": { id: "Custom dari Awal", en: "Custom From Day One" },
    "why.r1_desc": { id: "Setiap aplikasi dirancang mengikuti proses bisnis Anda, bukan sebaliknya.", en: "Every app is designed around your business process, not the other way around." },
    "why.r2_title": { id: "Komunikasi Transparan", en: "Transparent Communication" },
    "why.r2_desc": { id: "Update progres rutin, tanpa istilah teknis yang membingungkan.", en: "Regular progress updates, no confusing technical jargon." },
    "why.r3_title": { id: "Harga Wajar", en: "Fair Pricing" },
    "why.r3_desc": { id: "Estimasi biaya jelas di awal, tanpa biaya tersembunyi di tengah jalan.", en: "Clear cost estimates upfront, no hidden fees along the way." },
    "why.r4_title": { id: "Support Jangka Panjang", en: "Long-Term Support" },
    "why.r4_desc": { id: "Kami tetap ada setelah aplikasi live, untuk perbaikan maupun pengembangan.", en: "We stick around after launch, for fixes and further development." },

    "testi.eyebrow": { id: "<testimoni>", en: "<testimonials>" },
    "testi.eyebrow_close": { id: "</testimoni>", en: "</testimonials>" },
    "testi.title": { id: "Kata mereka yang<br>sudah bekerja sama.", en: "What our<br>clients say." },
    "testi.q1": { id: "“Timeline dikerjakan sesuai janji dan tim selalu responsif tiap kali kami butuh perubahan kecil.”", en: "“Timelines were kept as promised and the team was always responsive whenever we needed small changes.”" },
    "testi.r1": { id: "Owner, Toko Retail", en: "Owner, Retail Store" },
    "testi.q2": { id: "“Sistem informasi yang dibuat benar‑benar menyederhanakan laporan harian tim operasional kami.”", en: "“The information system truly simplified our operations team's daily reporting.”" },
    "testi.r2": { id: "Ops Manager, Logistik", en: "Ops Manager, Logistics" },
    "testi.q3": { id: "“Proses desain sampai development terasa jelas, kami selalu tahu progres tiap minggunya.”", en: "“The process from design to development felt clear — we always knew our weekly progress.”" },
    "testi.r3": { id: "Founder, Klinik Kesehatan", en: "Founder, Health Clinic" },

    "cta.eyebrow": { id: "<cta>", en: "<cta>" },
    "cta.title": { id: "Siap membangun aplikasi<br>yang mendorong pertumbuhan bisnis Anda?", en: "Ready to build an app<br>that drives your business growth?" },
    "cta.desc": { id: "Ceritakan kebutuhan Anda, kami bantu petakan solusinya — gratis, tanpa komitmen.", en: "Tell us what you need, we'll help map out the solution — free, no commitment." },
    "cta.btn": { id: "Diskusikan Proyek Anda", en: "Discuss Your Project" },

    "footer.brand_desc": {
      id: "Tingkatkan dan kembangkan bisnis Anda ke level berikutnya dengan teknologi terbaru. Your Growth Is Our Pride.",
      en: "Grow your business to the next level with the latest technology. Your Growth Is Our Pride."
    },
    "footer.contact_title": { id: "Hubungi Kami", en: "Contact Us" },
    "footer.hours_title": { id: "Jam Operasional", en: "Operating Hours" },
    "footer.hours1": { id: "Senin - Jumat: 9am - 5pm", en: "Mon - Fri: 9am - 5pm" },
    "footer.hours2": { id: "Sabtu: 9am - 2pm", en: "Sat: 9am - 2pm" },
    "footer.hours3": { id: "Minggu & Tanggal Merah: Tutup", en: "Sun & Public Holidays: Closed" },
    "footer.news_title": { id: "Newsletter", en: "Newsletter" },
    "footer.news_desc": { id: "Dapatkan update teknologi terbaru dari kami.", en: "Get the latest tech updates from us." },
    "footer.news_placeholder": { id: "Email Anda", en: "Your email" },
    "footer.news_btn": { id: "Gabung", en: "Subscribe" },
    "footer.rights": { id: "Seluruh hak cipta dilindungi.", en: "All rights reserved." },
    "footer.badge": { id: "Tersedia untuk proyek baru", en: "Available for new projects" },
    "footer.news_success": { id: "Terima kasih! Cek inbox {email} untuk konfirmasi.", en: "Thanks! Check {email} for a confirmation email." }
  };

  var currentLang = localStorage.getItem("contech_lang") || "id";

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);

    Object.keys(translations).forEach(function (key) {
      var entry = translations[key][lang];
      if (entry === undefined) return;

      document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function (el) {
        el.textContent = entry;
      });
      document.querySelectorAll('[data-i18n-html="' + key + '"]').forEach(function (el) {
        el.innerHTML = entry;
      });
      document.querySelectorAll('[data-i18n-placeholder="' + key + '"]').forEach(function (el) {
        el.setAttribute("placeholder", entry);
      });
    });

    var langLabel = document.getElementById("langLabel");
    if (langLabel) langLabel.textContent = lang === "id" ? "ID" : "EN";

    try { localStorage.setItem("contech_lang", lang); } catch (e) { /* storage unavailable */ }
  }

  var langSwitch = document.getElementById("langSwitch");
  if (langSwitch) {
    langSwitch.addEventListener("click", function () {
      applyLanguage(currentLang === "id" ? "en" : "id");
    });
  }
  applyLanguage(currentLang);

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      burger.classList.toggle("active", isOpen);
      if (isOpen) {
        navLinks.style.display = "flex";
        navLinks.style.position = "absolute";
        navLinks.style.top = "100%";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.flexDirection = "column";
        navLinks.style.background = "rgba(9,11,19,0.98)";
        navLinks.style.padding = "20px 28px";
        navLinks.style.borderBottom = "1px solid rgba(245,243,238,0.08)";
        navLinks.style.gap = "18px";
      } else {
        navLinks.style.display = "";
      }
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navLinks.style.display = "";
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- counter animation ---------- */
  var counters = document.querySelectorAll(".stat__num");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var start = 0;
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if (counters.length && "IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { counterIO.observe(c); });
  }

  /* ---------- typing effect in hero mockup ---------- */
  var typingEl = document.getElementById("typingText");
  var typingPhrases = {
    id: ["npm run build...", "deploying ke server...", "aplikasi Anda siap ✓"],
    en: ["npm run build...", "deploying to server...", "your app is ready ✓"]
  };
  if (typingEl && !reduceMotion) {
    var phraseIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      var phrases = typingPhrases[currentLang] || typingPhrases.id;
      var current = phrases[phraseIndex % phrases.length];
      if (!deleting) {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 30 : 55);
    }
    setTimeout(typeLoop, 700);
  } else if (typingEl) {
    typingEl.textContent = typingPhrases[currentLang][2];
  }

  /* ---------- mockup tilt on mouse move ---------- */
  var mockup = document.getElementById("mockup");
  var heroSection = document.getElementById("hero");
  if (mockup && heroSection && !reduceMotion && window.matchMedia("(min-width: 981px)").matches) {
    heroSection.addEventListener("mousemove", function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var rotY = -6 + x * 10;
      var rotX = 3 - y * 10;
      mockup.style.transform =
        "perspective(1200px) rotateY(" + rotY + "deg) rotateX(" + rotX + "deg)";
    });
    heroSection.addEventListener("mouseleave", function () {
      mockup.style.transform = "perspective(1200px) rotateY(-6deg) rotateX(3deg)";
    });
  }

  /* ---------- newsletter form ---------- */
  var newsletterForm = document.getElementById("newsletterForm");
  var newsletterNote = document.getElementById("newsletterNote");
  if (newsletterForm && newsletterNote) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector(".newsletter__input");
      var template = translations["footer.news_success"][currentLang] || translations["footer.news_success"].id;
      newsletterNote.textContent = template.replace("{email}", input.value);
      newsletterForm.reset();
    });
  }

  /* ---------- cursor glow ---------- */
  var glow = document.getElementById("cursorGlow");
  if (glow && !reduceMotion && window.matchMedia("(min-width: 769px)").matches) {
    window.addEventListener("mousemove", function (e) {
      glow.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px) translate(-50%,-50%)";
    }, { passive: true });
  } else if (glow) {
    glow.style.display = "none";
  }
})();
