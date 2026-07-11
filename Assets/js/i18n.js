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
    "projects.p1.text": "Este projeto é uma aplicação SaaS desenvolvida como parte dos meus estudos em Ciência da Computação. A plataforma oferece [serviço X — ex: gestão de tarefas, controle financeiro, agendamentos online], com foco em simplicidade, escalabilidade e experiência do usuário.",
    "projects.p2.heading": "Portfólio e Site pessoal",
    "projects.p2.text": "Criação de portfólios personalizados, desenvolvidos para destacar de forma profissional os projetos, habilidades e a identidade de cada pessoa. Utilizo design responsivo para garantir uma boa visualização em qualquer dispositivo, além de focar na usabilidade e na organização das informações. Meu objetivo é criar portfólios que não só impressionem visualmente, mas também facilitem a navegação e a comunicação clara do conteúdo.",
    "projects.p3.heading": "Sistema de Recibo Digital",
    "projects.p3.text": "Desenvolvi um site para emissão de recibos e notas fiscais, onde o usuário preenche os dados necessários em um formulário simples e recebe o documento gerado diretamente por e-mail. O projeto foi construído com foco em agilidade e praticidade, automatizando o preenchimento, a geração e o envio do recibo sem a necessidade de ferramentas externas.",
    "projects.p4.heading": "API RESTful",
    "projects.p4.text": "Desenvolvi uma API RESTful utilizando Node.js e o framework Express, projetada para servir como o motor de um sistema de cadastro de usuários. O sistema gerencia o fluxo de dados no servidor, utilizando SQLite para a persistência de informações pessoais como nome, sobrenome, idade e peso. Fui responsável pela arquitetura do backend, desde a modelagem da tabela de usuários até a criação de endpoints para inserção e remoção de dados, incluindo a validação de campos obrigatórios no servidor. O projeto processa as requisições e entrega respostas estruturadas em JSON para a interface web.",

    "experience.title": "Experiências",
    "experience.role": "Desenvolvedor",
    "experience.tech1": "React.js, node.js",
    "experience.tech2": "Micro Serviços",
    "experience.tech3": "AWS Lambda, MongoDb",
    "experience.tech4": "Criação e integração de APIs",
    "experience.tech5": "Chatbots e inteligência artificial",

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
    "page1.text": "Desenvolvi uma plataforma SaaS (Software como Serviço) voltada para pequenos empreendedores que desejam criar e gerenciar suas próprias lojas online de forma simples, rápida e sem a necessidade de conhecimentos técnicos. A aplicação permite que o usuário personalize sua loja, cadastre produtos, controle pedidos e integre métodos de pagamento, tudo por meio de um painel administrativo intuitivo e acessível, oferecendo uma solução escalável, responsiva e fácil de usar.",

    "page2.title": "Portfólio pessoal",
    "page2.cardTitle": "Blendly",
    "page2.text": "Desenvolvi um site pessoal e portfólio para um(a) cliente como uma solução profissional e escalável para fortalecer sua presença online. O projeto foi planejado desde a arquitetura da informação até a implementação final, garantindo uma navegação fluida, visual moderno e compatibilidade com dispositivos móveis. O site funciona como uma plataforma central para destacar os principais projetos, áreas de atuação e experiência profissional da pessoa, além de facilitar o contato com recrutadores, clientes ou parceiros de negócio.",

    "page3.title": "Sistema de Recibo Digital",
    "page3.cardTitle": "Blendly",
    "page3.text": "Desenvolvi um site para emissão de recibos e notas fiscais, onde o usuário preenche os dados necessários em um formulário simples e recebe o documento gerado diretamente por e-mail. O projeto foi construído com foco em agilidade e praticidade, automatizando o preenchimento, a geração e o envio do recibo sem a necessidade de ferramentas externas.",

    "page4.title": "Desenvolvimento de API REST",
    "page4.cardTitle": "Blendly",
    "page4.text": "Implementei uma solução de API Back-end focada no cadastro de usuários, responsável por receber requisições externas, validar dados JSON e realizar a persistência segura em um banco de dados SQLite. O desenvolvimento deste projeto prático foi fundamental para consolidar competências em arquitetura de software, utilizando o framework Express para a criação de endpoints e o domínio do protocolo HTTP para manipulação correta de verbos e Status Codes. Além de aprimorar o tratamento e validação de dados no servidor, apliquei conceitos de persistência assíncrona com async/await e utilizei o ThunderClient para simulações de teste, marcando mais um passo importante na construção de sistemas escaláveis e bem estruturados."
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
    "projects.p1.text": "This project is a SaaS application developed as part of my Computer Science studies. The platform offers [service X — e.g.: task management, financial control, online scheduling], focused on simplicity, scalability and user experience.",
    "projects.p2.heading": "Portfolio & Personal Website",
    "projects.p2.text": "Creation of custom portfolios, developed to professionally showcase each person's projects, skills and identity. I use responsive design to ensure a great viewing experience on any device, while focusing on usability and information organization. My goal is to create portfolios that not only impress visually, but also make navigation and communication of content clear.",
    "projects.p3.heading": "Digital Receipt System",
    "projects.p3.text": "I built a website for issuing receipts and invoices, where the user fills in the required data through a simple form and receives the generated document directly by email. The project was built with a focus on speed and convenience, automating the filling, generation and sending of the receipt without the need for external tools.",
    "projects.p4.heading": "RESTful API",
    "projects.p4.text": "I built a RESTful API using Node.js and the Express framework, designed to power a user registration system. The system manages server-side data flow, using SQLite to persist personal information such as first name, last name, age and weight. I was responsible for the backend architecture, from modeling the users table to creating endpoints for inserting and deleting data, including required field validation on the server. The project processes requests and returns structured JSON responses for the web interface.",

    "experience.title": "Experience",
    "experience.role": "Developer",
    "experience.tech1": "React.js, node.js",
    "experience.tech2": "Microservices",
    "experience.tech3": "AWS Lambda, MongoDb",
    "experience.tech4": "API creation and integration",
    "experience.tech5": "Chatbots and artificial intelligence",

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
    "page1.text": "I developed a SaaS (Software as a Service) platform aimed at small business owners who want to create and manage their own online stores simply, quickly, and without needing technical knowledge. The application lets users customize their store, register products, manage orders and integrate payment methods, all through an intuitive, accessible admin panel — delivering a scalable, responsive and easy-to-use solution.",

    "page2.title": "Personal Portfolio",
    "page2.cardTitle": "Blendly",
    "page2.text": "I developed a personal website and portfolio for a client as a professional, scalable solution to strengthen their online presence. The project was planned from information architecture through to final implementation, ensuring smooth navigation, a modern look and mobile compatibility. The site serves as a central hub to showcase the person's key projects, areas of expertise and professional experience, while making it easier for recruiters, clients or business partners to get in touch.",

    "page3.title": "Digital Receipt System",
    "page3.cardTitle": "Blendly",
    "page3.text": "I developed a web application for issuing receipts and invoices, allowing users to fill out the required information through an intuitive form and receive the generated document automatically via email. The system streamlines the entire process of completing, generating, and sending documents, providing greater speed, convenience, and reducing the need for manual processes or external tools.",

    "page4.title": "REST API Development",
    "page4.cardTitle": "Blendly",
    "page4.text": "I implemented a back-end API solution focused on user registration, responsible for receiving external requests, validating JSON data and securely persisting it in an SQLite database. Building this hands-on project was key to consolidating my software architecture skills, using the Express framework to create endpoints and mastering the HTTP protocol to correctly handle verbs and status codes. Besides improving server-side data handling and validation, I applied asynchronous persistence concepts with async/await and used ThunderClient for test simulations — another important step in building scalable, well-structured systems."
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
