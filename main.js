/**
 * 3D Neo-Futuristic Interactive Portfolio Controller
 * Ayesha Asghar — Software Engineering Student (CUI '29) & AI Intern at FlyRank AI
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  init3DCardTilt();
  initHyperInteractiveIcons();
  initInteractiveChatbot();
  initProjectFilters();
  initCaseStudyModal();
  initSkillsExplorer();
  initContactActions();
  initMobileMenu();
});

/* ==========================================================================
   1. 3D CARD TILT MICRO-INTERACTION
   ========================================================================== */

function init3DCardTilt() {
  const cards = document.querySelectorAll('.card-3d');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle 3D tilt: max 5 degrees
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   2. HYPER-INTERACTIVE CLICKABLE ICONS & TOAST
   ========================================================================== */

function showToastNotification(message) {
  let toast = document.getElementById('interactive-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'interactive-toast';
    toast.className = 'hidden-toast p-3 rounded-xl bg-slate-900/95 border border-orange-500/40 text-xs font-mono text-orange-300 shadow-2xl flex items-center space-x-2';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i data-lucide="sparkles" class="w-4 h-4 text-orange-400 shrink-0"></i>
    <span>${escapeHTML(message)}</span>
  `;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove('hidden-toast');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('hidden-toast');
  }, 2400);
}

function initHyperInteractiveIcons() {
  const docks = document.querySelectorAll('.icon-dock');

  docks.forEach(dock => {
    dock.addEventListener('mouseenter', () => {
      dock.style.borderColor = '#f97316';
      const icon = dock.querySelector('i, svg');
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(4deg)';
        icon.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    });

    dock.addEventListener('mouseleave', () => {
      dock.style.borderColor = '';
      const icon = dock.querySelector('i, svg');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });

    dock.addEventListener('click', () => {
      dock.style.transform = 'scale(0.92)';
      setTimeout(() => {
        dock.style.transform = '';
      }, 150);

      const info = dock.getAttribute('data-info');
      const skillKey = dock.getAttribute('data-skill-jump');

      if (info) {
        showToastNotification(info);
      }

      if (skillKey) {
        selectSkill(skillKey);
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* ==========================================================================
   3. HIGHLY INTERACTIVE FLOATING 3D CHATBOT ("AYESHA AI")
   ========================================================================== */

const chatbotKB = [
  {
    triggers: ["hostel", "management", "control", "c++"],
    response: "Ayesha built the **Hostel Control & Management System in C++** using Object-Oriented Programming (OOP) and file handling! It automates student room allocations, maintains resident databases, tracks fee records, and generates occupancy reports."
  },
  {
    triggers: ["study", "planner", "java", "swing", "gui"],
    response: "The **Smart Study Planner** is built in **Java (OOP)** featuring an interactive **Java Swing GUI**! It structures semester syllabi, schedules study intervals, and helps students track their daily academic progress."
  },
  {
    triggers: ["responsive", "web", "design", "css", "html", "form"],
    response: "Ayesha is certified in **Responsive Web Design**. She creates mobile-first interfaces and **Interactive Multi-Step Forms** built with semantic **HTML & CSS**, featuring clean styling and input validation."
  },
  {
    triggers: ["services", "service", "what you do", "offer"],
    response: "Ayesha provides 3 core services:\n1. **Workflow Automation using n8n** (Automating repetitive tasks, webhooks & API integrations)\n2. **Building Applications using AI** (AI-powered chatbots, intelligent workflows & LLM tools)\n3. **Responsive Web Designs** (Mobile-first, accessible modern websites using HTML & CSS)."
  },
  {
    triggers: ["intern", "flyrank", "experience", "work", "job"],
    response: "Ayesha is currently an **Artificial Intelligence Intern at FlyRank AI** (August 2026 – Present)! Her work focuses on **General AI Fluency**, prompt benchmarking, evaluating LLM outputs across operational scenarios, and workflow optimization."
  },
  {
    triggers: ["education", "comsats", "cui", "university", "degree"],
    response: "She is pursuing her **BS in Software Engineering at COMSATS (CUI '29)** in Lahore, Pakistan (started Feb 2025). Her curriculum covers C++, Java (OOP & Swing), Python, Data Structures, Algorithms, and Software Design."
  },
  {
    triggers: ["skills", "stack", "tech", "n8n", "make", "python", "tools"],
    response: "Ayesha's technical stack:\n• **Languages**: C++, Java (Swing GUI), Python, JavaScript, HTML5, CSS3\n• **Automation & AI**: n8n Workflow Automation, Make.com (Certified), Generative AI, Chatbots\n• **Core Concepts**: Object-Oriented Programming (OOP), Data Structures, Responsive Web Design."
  },
  {
    triggers: ["certif", "coursera", "qualification", "license", "badge"],
    response: "Ayesha holds 5 verified credentials:\n1. **Make Foundation** (Make.com Automation)\n2. **Introduction to Generative AI**\n3. **AI For Everyone** (DeepLearning.AI / Andrew Ng)\n4. **Basics of Python**\n5. **Responsive Web Design**"
  },
  {
    triggers: ["contact", "email", "reach", "hire", "linkedin", "message"],
    response: "You can reach Ayesha directly via:\n📧 Email: **ayeshaasghar224@gmail.com**\n🔗 LinkedIn: **[linkedin.com/in/ayesha-asghar6](https://www.linkedin.com/in/ayesha-asghar6)**\n📍 Located in Lahore, Punjab, Pakistan!"
  }
];

function initInteractiveChatbot() {
  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const promptPills = document.querySelectorAll('.chat-prompt-pill');

  if (toggleBtn && chatWindow) {
    toggleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden-chat');
      if (!chatWindow.classList.contains('hidden-chat')) {
        chatInput && chatInput.focus();
      }
    });
  }

  if (closeBtn && chatWindow) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden-chat');
    });
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      addUserChatMessage(message);
      chatInput.value = '';
      generateBotResponse(message);
    });
  }

  promptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const prompt = pill.getAttribute('data-prompt');
      if (prompt) {
        addUserChatMessage(prompt);
        generateBotResponse(prompt);
      }
    });
  });
}

function addUserChatMessage(text) {
  const container = document.getElementById('chatbot-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = "flex justify-end mb-3";
  msgDiv.innerHTML = `
    <div class="chat-bubble-user max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md">
      ${escapeHTML(text)}
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function showBotTyping() {
  const container = document.getElementById('chatbot-messages');
  if (!container) return null;

  const typingDiv = document.createElement('div');
  typingDiv.id = "chat-typing";
  typingDiv.className = "flex justify-start mb-3 items-end space-x-2";
  typingDiv.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-orange-600/30 border border-orange-500/40 flex items-center justify-center text-[10px] text-orange-400 font-bold">AI</div>
    <div class="chat-bubble-ai px-4 py-3 rounded-2xl flex items-center space-x-1.5">
      <span class="w-2 h-2 rounded-full bg-orange-400 typing-dot-orange"></span>
      <span class="w-2 h-2 rounded-full bg-amber-400 typing-dot-orange"></span>
      <span class="w-2 h-2 rounded-full bg-orange-600 typing-dot-orange"></span>
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
  return typingDiv;
}

function removeBotTyping() {
  const typing = document.getElementById('chat-typing');
  if (typing) typing.remove();
}

function generateBotResponse(userInput) {
  showBotTyping();
  const lower = userInput.toLowerCase();

  let answer = null;
  for (const item of chatbotKB) {
    if (item.triggers.some(t => lower.includes(t))) {
      answer = item.response;
      break;
    }
  }

  if (!answer) {
    answer = "I'm here to help! Ayesha specializes in **Workflow Automation using n8n**, **Building Applications using AI**, and **Responsive Web Designs**. Feel free to email **ayeshaasghar224@gmail.com** or connect on **LinkedIn**!";
  }

  setTimeout(() => {
    removeBotTyping();
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const formatted = formatMarkdown(answer);

    const botDiv = document.createElement('div');
    botDiv.className = "flex justify-start mb-3 items-start space-x-2";
    botDiv.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-orange-600/30 border border-orange-500/40 flex items-center justify-center text-[10px] text-orange-400 font-bold shrink-0 mt-1">AA</div>
      <div class="chat-bubble-ai max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed text-slate-200 shadow-sm border border-slate-800">
        ${formatted}
      </div>
    `;
    container.appendChild(botDiv);
    container.scrollTop = container.scrollHeight;
  }, 650);
}

function formatMarkdown(text) {
  let res = escapeHTML(text);
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-300">$1</strong>');
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-orange-400 underline hover:text-orange-300">$1</a>');
  res = res.replace(/\n/g, '<br/>');
  return res;
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

/* ==========================================================================
   4. PROJECT FILTERS & AUTHENTIC CASE STUDY MODALS
   ========================================================================== */

const caseStudiesData = {
  "hostel-management": {
    title: "Hostel Control & Management System",
    tagline: "Comprehensive student room allocation, resident records, and fee management in C++",
    badge: "Software Engineering in C++",
    tools: ["C++", "Object-Oriented Programming (OOP)", "File Handling", "Data Structures", "System Logic"],
    challenge: "Manual paper registers in university hostels result in room double-bookings, misplaced student records, delayed fee verification, and inaccurate occupancy tracking.",
    solution: "Engineered a robust management system in C++ using object-oriented principles and file handling. Automates student room allocation, manages resident records, tracks payment statuses, and outputs real-time room occupancy logs.",
    architecture: [
      "Student registration and verification module using C++ OOP classes",
      "Room allocation algorithm with capacity checks to prevent double-booking",
      "Persistent file handling for resident records, fee history, and fines",
      "Visitor check-in/checkout and attendance logging subroutines",
      "Administrative reporting console displaying real-time occupancy statistics"
    ],
    impact: "Digitized 100% of resident records, eliminated double-booking errors, and automated hostel administrative reporting."
  },
  "study-planner": {
    title: "Smart Study Planner (Java Swing GUI)",
    tagline: "Desktop academic scheduler and task planner engineered in Java OOP with Swing GUI",
    badge: "Java OOP & Swing GUI",
    tools: ["Java", "OOP Principles", "Java Swing (GUI)", "Event-Driven Programming", "Data Persistence"],
    challenge: "Students struggle to organize semester course loads, track assignments, and maintain structured daily revision routines without visual desktop tools.",
    solution: "Built an interactive desktop application in Java using Swing GUI and OOP design patterns. Enables students to structure syllabi into daily study intervals, track assignment deadlines, and view visual completion status.",
    architecture: [
      "Swing GUI desktop interface with intuitive calendar and task views",
      "Object-oriented data model separating courses, tasks, and schedules",
      "Event listeners handling real-time task creation, editing, and completion",
      "Local file persistence ensuring schedules are saved across sessions",
      "Visual progress indicators showing daily and weekly completion rates"
    ],
    impact: "Provides students with an organized desktop interface to optimize study hours and improve exam preparedness."
  },
  "form-engine": {
    title: "Interactive Multi-Step Form & Responsive Design",
    tagline: "Responsive web design, semantic HTML, modern CSS styling, and structured input validation",
    badge: "Responsive Web Design (HTML & CSS)",
    tools: ["HTML5", "CSS3", "Responsive Web Design", "Input Validation", "Mobile-First"],
    challenge: "Clunky, non-responsive web forms cause user frustration and high abandonment rates on mobile devices.",
    solution: "Created an interactive multi-step form following responsive web design standards using semantic HTML5 and CSS3. Features clean step-by-step layout progression, accessible form controls, and client-side input validation.",
    architecture: [
      "Semantic HTML5 form structure with accessible fieldsets and labels",
      "Responsive CSS3 flexbox and grid styling optimized for all screens",
      "Interactive multi-step visual progression indicating current step",
      "Built-in HTML/CSS validation rules providing instant user feedback",
      "Clean mobile-first design ensuring smooth touch interaction"
    ],
    impact: "Delivers a seamless, mobile-friendly input experience with zero layout breakage across devices."
  },
  "responsive-web": {
    title: "Responsive Web Design Showcase",
    tagline: "Certified responsive website utilizing semantic HTML5, CSS Grid, and mobile-first layouts",
    badge: "Certified Responsive Web Design",
    tools: ["HTML5 Semantic", "CSS3 Grid & Flexbox", "Mobile-First Architecture", "Accessibility (WCAG)"],
    challenge: "Websites often display poorly on smaller mobile screens and fail standard accessibility guidelines.",
    solution: "Developed certified responsive web templates utilizing modern CSS grid, flexbox, and mobile-first media queries to guarantee flawless viewing on smartphones, tablets, and desktop displays.",
    architecture: [
      "Mobile-first responsive media queries with fluid scaling typography",
      "CSS Grid and Flexbox for modern, flexible card and navigation layouts",
      "Semantic HTML markup adhering to accessibility (WCAG) standards",
      "Fast rendering and optimized asset delivery for high performance",
      "Cross-browser testing across Chrome, Safari, Firefox, and Edge"
    ],
    impact: "Achieved 100% responsive test compatibility across all modern device viewports with certified design standards."
  }
};

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn-3d');
  const projectCards = document.querySelectorAll('.project-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      showToastNotification(`Filter: ${btn.textContent.trim()}`);
    });
  });
}

function openCaseStudy(projectId) {
  const data = caseStudiesData[projectId];
  if (!data) return;

  const modalBackdrop = document.getElementById('case-study-modal');
  const modalContent = document.getElementById('modal-case-content');

  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span class="text-xs font-mono px-2.5 py-1 rounded bg-orange-950/80 text-orange-300 border border-orange-500/30">${data.badge}</span>
          <h3 class="text-xl sm:text-2xl font-bold text-white mt-2">${data.title}</h3>
          <p class="text-xs sm:text-sm text-orange-400 font-medium">${data.tagline}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5 pt-1">
        ${data.tools.map(t => `<span class="icon-dock px-2.5 py-1 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700" data-info="Technology: ${t}">${t}</span>`).join('')}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h4 class="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-1 flex items-center gap-1.5">
            <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> The Problem
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">${data.challenge}</p>
        </div>

        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> The Solution
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">${data.solution}</p>
        </div>
      </div>

      <div class="pt-2">
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">Technical Implementation</h4>
        <div class="space-y-1.5">
          ${data.architecture.map((step, idx) => `
            <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 flex items-center space-x-2.5">
              <span class="w-5 h-5 rounded-full bg-orange-600/20 text-orange-400 flex items-center justify-center font-mono text-[10px] shrink-0">${idx + 1}</span>
              <span>${step}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-200 flex items-start space-x-2.5">
        <i data-lucide="trending-up" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
        <div>
          <strong class="text-white">Outcome:</strong> ${data.impact}
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.remove('hidden-modal');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
  initHyperInteractiveIcons();
}

function closeCaseStudy() {
  const modalBackdrop = document.getElementById('case-study-modal');
  if (modalBackdrop) {
    modalBackdrop.classList.add('hidden-modal');
    document.body.style.overflow = 'auto';
  }
}

function initCaseStudyModal() {
  window.openCaseStudy = openCaseStudy;
  window.closeCaseStudy = closeCaseStudy;

  const modalBackdrop = document.getElementById('case-study-modal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudy();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudy();
    }
  });
}

/* ==========================================================================
   5. INTERACTIVE SKILLS EXPLORER
   ========================================================================== */

const skillsCatalog = {
  cpp: {
    name: "C++ & Object-Oriented Programming",
    category: "Software Engineering Core",
    desc: "Used to develop the Hostel Control & Management System. Specialized in C++ OOP architecture, class modeling, file handling, and memory efficiency.",
    tools: "C++, OOP Principles, File I/O, Data Structures, System Logic",
    status: "Academic Core • COMSATS '29"
  },
  java: {
    name: "Java & Swing GUI",
    category: "Desktop Application Engineering",
    desc: "Used to engineer the Smart Study Planner. Proficient in Java OOP principles, event-driven desktop GUI development with Java Swing, and task state management.",
    tools: "Java, Java Swing (GUI), OOP, Event Listeners, Data Modeling",
    status: "Academic Core • COMSATS '29"
  },
  n8n: {
    name: "Workflow Automation using n8n",
    category: "Workflow Automation",
    desc: "Building autonomous workflow orchestrations that connect webhooks, third-party APIs, and databases. Specialized in handling branch conditions, data transformations, and scheduled task automations.",
    tools: "n8n Workflow Automation, Webhook Nodes, Code Nodes, API Connections",
    status: "Core Focus • Active Practice"
  },
  make: {
    name: "Make.com (Integromat)",
    category: "Visual Automation (Certified)",
    desc: "Certified in Make Foundation. Experienced in constructing reliable scenarios with visual error handlers, custom filters, routers, and cross-platform syncs.",
    tools: "Make.com Foundation, Webhooks, Error Routers, Cloud Modules",
    status: "Certified Credential"
  },
  aiApps: {
    name: "Building Applications using AI",
    category: "Generative AI & Applications",
    desc: "Developing intelligent applications using Large Language Models, prompt engineering, custom conversational chatbots, and RAG concepts.",
    tools: "OpenAI API, Prompt Engineering, Guardrails, AI Chatbots",
    status: "FlyRank AI Focus • In Practice"
  },
  python: {
    name: "Python Programming",
    category: "Scripting & Backend",
    desc: "Writing clean, functional scripts for automation, data processing, and API connections. Certified in Basics of Python.",
    tools: "Python 3, Scripting, REST APIs, JSON Handling",
    status: "Certified Basics • Undergrad Studies"
  },
  webdev: {
    name: "Responsive Web Designs (HTML & CSS)",
    category: "Frontend Development (Certified)",
    desc: "Certified in Responsive Web Design. Creating accessible, mobile-first web pages using semantic HTML5, modern CSS Grid/Flexbox layouts, and dynamic validation forms.",
    tools: "HTML5, CSS3, Flexbox & Grid, Mobile-First, Input Validation",
    status: "Certified Credential"
  },
  genai: {
    name: "Generative AI & Fluency",
    category: "Artificial Intelligence",
    desc: "Practical fluency with generative AI foundation models developed through daily internship work at FlyRank AI and formal coursework from DeepLearning.AI.",
    tools: "Generative AI, AI For Everyone, Prompt Benchmarking",
    status: "Internship Focus • Certified"
  }
};

function selectSkill(skillKey) {
  const data = skillsCatalog[skillKey];
  if (!data) return;

  document.querySelectorAll('.skill-tag-3d').forEach(tag => {
    if (tag.getAttribute('data-skill') === skillKey) {
      tag.classList.add('active');
    } else {
      tag.classList.remove('active');
    }
  });

  const inspector = document.getElementById('skill-inspector-panel');
  if (inspector) {
    inspector.innerHTML = `
      <div class="space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold">${data.category}</span>
            <h4 class="text-lg font-bold text-white mt-0.5">${data.name}</h4>
          </div>
          <span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto">
            ${data.status}
          </span>
        </div>

        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${data.desc}</p>

        <div class="pt-2">
          <span class="text-[11px] font-mono uppercase text-slate-400 block mb-1">Key Technologies:</span>
          <span class="text-xs font-mono text-orange-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 block">
            ${data.tools}
          </span>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

function initSkillsExplorer() {
  const tags = document.querySelectorAll('.skill-tag-3d');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const key = tag.getAttribute('data-skill');
      selectSkill(key);
      showToastNotification(`Skill: ${skillsCatalog[key]?.name || key}`);
    });
  });

  selectSkill('cpp');
}

/* ==========================================================================
   6. CONTACT ACTIONS (CLEAN SUBMIT WITHOUT EMAIL ICON)
   ========================================================================== */

function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('ayeshaasghar224@gmail.com').then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 inline mr-1"></i> Copied!`;
        if (window.lucide) window.lucide.createIcons();
        showToastNotification("Email copied: ayeshaasghar224@gmail.com");
        setTimeout(() => {
          copyBtn.innerHTML = orig;
          if (window.lucide) window.lucide.createIcons();
        }, 2200);
      });
    });
  }

  const form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiry-name')?.value || "Visitor";
      const email = document.getElementById('inquiry-email')?.value || "";
      const service = document.getElementById('inquiry-service')?.value || "General Inquiry";
      const message = document.getElementById('inquiry-message')?.value || "";

      const subject = encodeURIComponent(`Message from ${name} regarding ${service}`);
      const body = encodeURIComponent(`Hi Ayesha,\n\nName: ${name}\nEmail: ${email}\nRegarding: ${service}\n\nMessage:\n${message}\n`);

      window.location.href = `mailto:ayeshaasghar224@gmail.com?subject=${subject}&body=${body}`;

      const feedback = document.getElementById('inquiry-feedback');
      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.innerHTML = `
          <div class="p-3 rounded-xl bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs flex items-center space-x-2">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
            <span>Thank you, ${escapeHTML(name)}! Your message draft is ready to send.</span>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }
}

/* ==========================================================================
   7. MOBILE MENU TOGGLE
   ========================================================================== */

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}
