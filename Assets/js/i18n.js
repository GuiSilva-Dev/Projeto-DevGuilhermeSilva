// Dicionário de traduções PT/EN e lógica de troca de idioma
const translations = {
  pt: {
    "nav.inicio": "INÍCIO",
    "nav.sobre": "SOBRE",
    "nav.projetos": "PROJETOS",
    "nav.experiencias": "EXPERIÊNCIAS",
    "nav.contato": "CONTATO",

    "hero.role": "Software Developer",

    "about.title": "Sobre",
    "about.journeyTitle": "// Minha Jornada()",
    "about.journeyText": "Desenvolvedor e estudante de bacharelado em Ciência da Computação, entusiasmado com o desenvolvimento de soluções tecnológicas criativas, funcionais e alinhadas às necessidades reais dos usuários. Tenho paixão por programação, tecnologia da informação e desenvolvimento de sistemas, buscando constantemente aprimorar minhas habilidades em um cenário marcado pela inovação e evolução contínua. Acredito no aprendizado contínuo, na troca de experiências e na colaboração como pilares do crescimento profissional. Busco oportunidades que me desafiem a aplicar meus conhecimentos em projetos inovadores, com foco em eficiência, usabilidade e impacto positivo na experiência digital dos usuários.",
    "about.downloadCv": "BAIXAR CV",
    "about.role": "Desenvolvedor",
    "about.hire": "Contrate",

    "skills.tools": "Ferramentas",
    "skills.frontend": "Front-End",
    "skills.backend": "Back-End",
    "skills.database": "Banco de dados",

    "projects.title": "Projetos",
    "projects.learnMore": "Saiba Mais",
    "projects.p1.heading": "Desenvolvimento Saas",
    "projects.p1.text": "Vitrine de um SaaS para gestão de negócios online, simples e escalável — do cadastro ao pagamento, tudo em um só lugar.",
    "projects.p2.heading": "Portfólio e Site pessoal",
    "projects.p2.text": "Portfólios personalizados que combinam design responsivo e identidade única, criados para impressionar e converter.",
    "projects.p3.heading": "Sistema de Recibo Digital",
    "projects.p3.text": "Emissão de recibos e notas fiscais em segundos: preencha, gere e receba por e-mail — sem papel, sem complicações.",
    "projects.p4.heading": "API RESTful",
    "projects.p4.text": "API RESTful robusta em Node.js e Express, com persistência em SQLite e endpoints prontos para cadastro de usuários.",

    "experience.title": "Experiências",
    "experience.role": "Desenvolvedor FullStack",
    "experience.tech1": "React.js, node.js",
    "experience.tech2": "Micro Serviços",
    "experience.tech3": "AWS, MongoDb",
    "experience.tech4": "integração de APIs",
    "experience.tech5": "Chatbots e LLMs",

    "contact.title": "Contato",
    "contact.text": "Tem um projeto em mente ou precisa de uma solução digital? Entre em contato e vamos conversar!",
    "contact.namePlaceholder": "Seu nome",
    "contact.phonePlaceholder": "Seu numero",
    "contact.emailPlaceholder": "seu e-mail",
    "contact.messagePlaceholder": "Descreva sua mensagem aqui...",
    "contact.send": "Enviar",
    "contact.connectTitle": "Conecte-se comigo",
    "contact.connect": "Vamos se Conectar",

    "footer.rights": "© 2025 Todos os direitos reservados.",
    "footer.devBy": "Desenvolvido por GS│Dev.",

    "subpage.techUsed": "Tecnologias Usadas",
    "subpage.sourceCode": "Código Fonte",
    "subpage.liveLink": "Live Link",

    "page1.title": "Projeto SaaS",
    "page1.cardTitle": "Blendly",
    "page1.text": "Solução digital para empresas de assistência técnica em eletrodomésticos, estruturada como funil completo de conversão — da apresentação dos serviços à captação de leads via formulário e WhatsApp. Construída com foco em escalabilidade, podendo ser replicada e adaptada para outras empresas do setor.",

    "page2.title": "Portfólio pessoal",
    "page2.cardTitle": "Website pessoal",
    "page2.text": "Site de portfólio pessoal desenvolvido para um cliente, planejado da arquitetura da informação ao design final. Destaca projetos, áreas de atuação e experiência profissional, com navegação fluida, visual moderno e total responsividade em qualquer dispositivo.",

    "page3.title": "Sistema de Recibo Digital",
    "page3.cardTitle": "Blendly",
    "page3.text": "Aplicação web para emissão de recibos e notas fiscais. O usuário preenche os dados em um formulário simples e recebe o documento gerado automaticamente por e-mail, eliminando a necessidade de ferramentas externas ou processos manuais.",

    "page4.title": "Desenvolvimento de API REST",
    "page4.cardTitle": "Blendly",
    "page4.text": "API back-end desenvolvida em Node.js e Express para cadastro de usuários, com validação de dados JSON e persistência segura em banco SQLite. O projeto aplica boas práticas de arquitetura, endpoints RESTful, tratamento do protocolo HTTP e persistência assíncrona com async/await."
  },
  en: {
    "nav.inicio": "HOME",
    "nav.sobre": "ABOUT",
    "nav.projetos": "PROJECTS",
    "nav.experiencias": "EXPERIENCE",
    "nav.contato": "CONTACT",

    "hero.role": "Software Developer",

    "about.title": "About",
    "about.journeyTitle": "// My Journey()",
    "about.journeyText": "Developer and Computer Science undergraduate student, passionate about building creative, functional technology solutions aligned with users' real needs. I have a passion for programming, information technology and systems development, constantly seeking to improve my skills in a scenario marked by innovation and continuous evolution. I believe in continuous learning, exchange of experiences and collaboration as pillars of professional growth. I look for opportunities that challenge me to apply my knowledge to innovative projects, focusing on efficiency, usability and a positive impact on users' digital experience.",
    "about.downloadCv": "DOWNLOAD CV",
    "about.role": "Developer",
    "about.hire": "Hire me",

    "skills.tools": "Tools",
    "skills.frontend": "Front-End",
    "skills.backend": "Back-End",
    "skills.database": "Databases",

    "projects.title": "Projects",
    "projects.learnMore": "Learn More",
    "projects.p1.heading": "SaaS Development",
    "projects.p1.text": "A showcase site for a SaaS platform to manage online businesses — simple and scalable, from sign-up to payment, all in one place.",
    "projects.p2.heading": "Portfolio & Personal Website",
    "projects.p2.text": "Custom portfolios blending responsive design and unique identity, built to impress and convert.",
    "projects.p3.heading": "Digital Receipt System",
    "projects.p3.text": "Issue receipts and invoices in seconds: fill in, generate and receive by email — no paper, no hassle.",
    "projects.p4.heading": "RESTful API",
    "projects.p4.text": "A robust RESTful API in Node.js and Express, with SQLite persistence and ready-to-use user registration endpoints.",

    "experience.title": "Experience",
    "experience.role": "Full-Stack Developer",
    "experience.tech1": "React.js, node.js",
    "experience.tech2": "Microservices",
    "experience.tech3": "AWS, MongoDb",
    "experience.tech4": "API integration",
    "experience.tech5": "Chatbots and LLMs",

    "contact.title": "Contact",
    "contact.text": "Have a project in mind or need a digital solution? Get in touch and let's talk!",
    "contact.namePlaceholder": "Your name",
    "contact.phonePlaceholder": "Your phone number",
    "contact.emailPlaceholder": "your e-mail",
    "contact.messagePlaceholder": "Describe your message here...",
    "contact.send": "Send",
    "contact.connectTitle": "Connect with me",
    "contact.connect": "Let's Connect",

    "footer.rights": "© 2025 All rights reserved.",
    "footer.devBy": "Developed by GS│Dev.",

    "subpage.techUsed": "Technologies Used",
    "subpage.sourceCode": "Source Code",
    "subpage.liveLink": "Live Link",

    "page1.title": "SaaS Project",
    "page1.cardTitle": "Blendly",
    "page1.text": "A digital solution for home-appliance repair businesses, built as a complete conversion funnel — from showcasing the services to capturing leads through a form and WhatsApp. Designed with scalability in mind, so it can be replicated and adapted for other companies in the industry.",

    "page2.title": "Personal Portfolio",
    "page2.cardTitle": "Personal Website",
    "page2.text": "Personal portfolio website built for a client, planned from information architecture through to final design. It showcases projects, areas of expertise and professional experience, with fluid navigation, a modern look and full responsiveness on every device.",

    "page3.title": "Digital Receipt System",
    "page3.cardTitle": "Blendly",
    "page3.text": "Web application for issuing receipts and invoices. Users fill in the required data through a simple form and automatically receive the generated document by email, removing the need for external tools or manual processes.",

    "page4.title": "REST API Development",
    "page4.cardTitle": "Blendly",
    "page4.text": "Back-end API built with Node.js and Express for user registration, featuring JSON data validation and secure persistence in an SQLite database. The project applies solid architecture practices, RESTful endpoints, proper HTTP handling and asynchronous persistence with async/await."
  }
};

(function () {
  var STORAGE_KEY = "portfolio-lang";
  var supported = Object.keys(translations);

  function detectDefaultLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.indexOf(saved) !== -1) return saved;
    var browserLang = (navigator.language || "pt").slice(0, 2);
    return supported.indexOf(browserLang) !== -1 ? browserLang : "pt";
  }

  function applyLang(lang) {
    var dict = translations[lang] || translations.pt;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    document.documentElement.lang = lang === "en" ? "en" : "pt-br";

    var toggleBtn = document.getElementById("langToggle");
    if (toggleBtn) {
      toggleBtn.textContent = lang === "pt" ? "EN - EUA" : "PT - BR";
      toggleBtn.setAttribute("aria-label", lang === "pt" ? "Switch to English" : "Mudar para Português");
    }

    localStorage.setItem(STORAGE_KEY, lang);
    window.currentLang = lang;
  }

  function toggleLang() {
    var next = window.currentLang === "pt" ? "en" : "pt";
    applyLang(next);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectDefaultLang());

    var toggleBtn = document.getElementById("langToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleLang);
    }
  });
})();
