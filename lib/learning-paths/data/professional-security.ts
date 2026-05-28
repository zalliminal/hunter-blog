// lib/learning-paths/data/professional-security.ts

import { LearningPath } from "../learning-path-types";

export const professionalSecurityPath: LearningPath = {
  slug: 'professional-security',
  title: {
    fa: 'امنیت حرفه‌ای',
    en: 'Professional Security',
  },
  description: {
    fa: 'مسیر پیشرفته برای متخصصان امنیت، شامل تحلیل تهدید، تست نفوذ، پاسخ به حوادث و مدیریت ریسک سازمانی',
    en: 'An advanced path for security professionals covering threat modeling, penetration testing, incident response, and enterprise risk management',
  },
  targetAudience: {
    fa: 'متخصصان فناوری اطلاعات، مهندسان امنیت، و کسانی که قصد ورود به حوزه امنیت سایبری حرفه‌ای را دارند',
    en: 'IT professionals, security engineers, and those aiming to enter professional cybersecurity roles',
  },
  totalSteps: 5,
  estimatedTotalTime: {
    fa: '6-8 هفته',
    en: '6-8 weeks',
  },
  difficulty: 'advanced',
  color: {
    primary: 'violet',
    gradient: 'from-violet-600 to-purple-600',
    bgGradient: 'from-violet-600/10 via-purple-600/5 to-transparent',
    light: 'text-violet-400',
  },
  icon: 'ShieldAlert',
  steps: [
    {
      id: 'ps-step-1',
      order: 1,
      title: {
        fa: 'مدل‌سازی تهدید (Threat Modeling)',
        en: 'Threat Modeling',
      },
      description: {
        fa: 'شناسایی تهدیدات بالقوه در سیستم‌ها با استفاده از چارچوب‌هایی مانند STRIDE و DREAD',
        en: 'Identifying potential threats in systems using frameworks like STRIDE and DREAD',
      },
      whyImportant: {
        fa: 'مدل‌سازی تهدید به شما کمک می‌کند قبل از وقوع حمله، نقاط ضعف را پیدا کنید و منابع را به‌طور هوشمندانه تخصیص دهید.',
        en: 'Threat modeling helps you find weaknesses before attacks happen and allocate resources intelligently.',
      },
      learningOutcomes: {
        fa: [
          'استفاده از چارچوب STRIDE برای شناسایی تهدیدات',
          'رسم نمودارهای داده‌جریان (Data Flow Diagrams)',
          'ارزیابی ریسک با DREAD یا PASTA',
          'ادغام مدل‌سازی تهدید در چرخه توسعه نرم‌افزار (SDLC)',
        ],
        en: [
          'Apply STRIDE framework to identify threats',
          'Create Data Flow Diagrams (DFDs)',
          'Assess risk using DREAD or PASTA',
          'Integrate threat modeling into SDLC',
        ],
      },
      estimatedTime: '8 hours',
      prompts: [
        {
          id: 'ps-1-prompt-1',
          title: {
            fa: 'مدل‌سازی تهدید برای یک API بانکی',
            en: 'Threat Modeling for a Banking API',
          },
          prompt: {
            fa: 'من یک API بانکی برای انتقال وجه طراحی کرده‌ام. لطفاً:\n1. یک نمودار داده‌جریان (DFD) ساده طراحی کن\n2. با استفاده از STRIDE، تهدیدات را برای هر مؤلفه شناسایی کن\n3. ریسک هر تهدید را با DREAD ارزیابی کن\n4. کنترل‌های امنیتی پیشنهادی برای مهم‌ترین تهدیدات بده',
            en: 'I’ve designed a banking API for money transfers. Please:\n1. Create a simple Data Flow Diagram (DFD)\n2. Use STRIDE to identify threats for each component\n3. Assess each threat’s risk using DREAD\n4. Recommend security controls for the highest-risk threats',
          },
          purpose: {
            fa: 'اجرای عملی مدل‌سازی تهدید در یک سیستم حساس',
            en: 'Practical application of threat modeling in a sensitive system',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'STRIDE: چارچوب مدل‌سازی تهدید مایکروسافت',
            en: 'STRIDE: Microsoft’s Threat Modeling Framework',
          },
          url: '/fa/glossary/stride',
          isInternal: true,
        },
      ],
      books: [
        {
          title: {
            fa: 'مدل‌سازی تهدید: طراحی برای امنیت',
            en: 'Threat Modeling: Designing for Security',
          },
          author: 'Adam Shostack',
          description: {
            fa: 'کتاب مرجع در زمینه مدل‌سازی تهدید برای مهندسان نرم‌افزار',
            en: 'The definitive guide to threat modeling for software engineers',
          },
        },
      ],
      videos: [],
    },
    {
      id: 'ps-step-2',
      order: 2,
      title: {
        fa: 'تست نفوذ و ارزیابی آسیب‌پذیری',
        en: 'Penetration Testing and Vulnerability Assessment',
      },
      description: {
        fa: 'یادگیری فرآیند تست نفوذ، ابزارهای استاندارد (مثل Burp Suite, Nmap)، و گزارش‌نویسی حرفه‌ای',
        en: 'Learning penetration testing methodology, standard tools (e.g., Burp Suite, Nmap), and professional reporting',
      },
      whyImportant: {
        fa: 'تست نفوذ تنها راه برای اطمینان از امنیت واقعی سیستم‌هاست. بسیاری از آسیب‌پذیری‌ها فقط با تست فعال قابل کشف هستند.',
        en: 'Penetration testing is the only way to verify real-world security. Many vulnerabilities are only detectable through active testing.',
      },
      learningOutcomes: {
        fa: [
          'اجرای تست نفوذ مبتنی بر OWASP Testing Guide',
          'استفاده از Nmap، Burp Suite و Metasploit',
          'تشخیص آسیب‌پذیری‌های رایج (مثل XSS, SQLi)',
          'نوشتن گزارش حرفه‌ای با راهکارهای عملی',
        ],
        en: [
          'Conduct penetration tests based on OWASP Testing Guide',
          'Use Nmap, Burp Suite, and Metasploit',
          'Identify common vulnerabilities (e.g., XSS, SQLi)',
          'Write professional reports with actionable remediation',
        ],
      },
      estimatedTime: '12 hours',
      prompts: [
        {
          id: 'ps-2-prompt-1',
          title: {
            fa: 'برنامه‌ریزی تست نفوذ برای یک وب‌اپلیکیشن',
            en: 'Planning a Penetration Test for a Web App',
          },
          prompt: {
            fa: 'می‌خواهم یک وب‌اپلیکیشن را تست نفوذ کنم. لطفاً:\n1. مراحل استاندارد یک تست نفوذ را لیست کن\n2. ابزارهای مناسب برای هر مرحله پیشنهاد بده\n3. نحوه تشخیص و اولویت‌بندی آسیب‌پذیری‌ها را توضیح بده\n4. ساختار یک گزارش حرفه‌ای تست نفوذ را مشخص کن',
            en: 'I want to penetration test a web app. Please:\n1. List standard phases of a pen test\n2. Recommend appropriate tools for each phase\n3. Explain how to identify and prioritize vulnerabilities\n4. Outline the structure of a professional pen test report',
          },
          purpose: {
            fa: 'برنامه‌ریزی و اجرای یک تست نفوذ حرفه‌ای',
            en: 'Planning and executing a professional penetration test',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'OWASP Top 10: مهم‌ترین آسیب‌پذیری‌های وب',
            en: 'OWASP Top 10: Critical Web Vulnerabilities',
          },
          url: '/fa/glossary/owasp-top-10',
          isInternal: true,
        },
      ],
      books: [],
      videos: [
        {
          title: {
            fa: 'آموزش Burp Suite برای تست نفوذ',
            en: 'Burp Suite Tutorial for Penetration Testing',
          },
          url: 'https://www.youtube.com/watch?v=burp-example',
          platform: 'youtube',
          duration: '45:00',
        },
      ],
    },
    {
      id: 'ps-step-3',
      order: 3,
      title: {
        fa: 'پاسخ به حوادث امنیتی (Incident Response)',
        en: 'Incident Response',
      },
      description: {
        fa: 'فرآیند شناسایی، حاوی‌سازی، ریشه‌یابی و بازیابی از حوادث امنیتی',
        en: 'The process of detecting, containing, eradicating, and recovering from security incidents',
      },
      whyImportant: {
        fa: 'حتی بهترین سیستم‌ها نقض می‌شوند. نحوه پاسخ به حادثه تعیین‌کننده خسارت نهایی است.',
        en: 'Even the best systems get breached. How you respond determines the final damage.',
      },
      learningOutcomes: {
        fa: [
          'اجرای چرخه پاسخ به حادثه NIST',
          'جمع‌آوری و حفظ شواهد دیجیتال',
          'تحلیل لاگ‌ها برای شناسایی مهاجم',
          'مستندسازی و گزارش‌دهی پس از حادثه',
        ],
        en: [
          'Execute the NIST incident response lifecycle',
          'Collect and preserve digital evidence',
          'Analyze logs to identify attackers',
          'Document and report post-incident',
        ],
      },
      estimatedTime: '10 hours',
      prompts: [
        {
          id: 'ps-3-prompt-1',
          title: {
            fa: 'شبیه‌سازی پاسخ به حادثه رانسوم‌وار',
            en: 'Simulating Ransomware Incident Response',
          },
          prompt: {
            fa: 'سیستم‌های ما توسط رانسوم‌وار آلوده شده‌اند. لطفاً:\n1. مراحل فوری پاسخ را بر اساس NIST شرح بده\n2. نحوه حاوی‌سازی حادثه را توضیح بده\n3. چه شواهدی باید جمع‌آوری شود؟\n4. برنامه بازیابی و جلوگیری از تکرار را پیشنهاد بده',
            en: 'Our systems are infected with ransomware. Please:\n1. Describe immediate response steps per NIST\n2. Explain how to contain the incident\n3. What evidence should be collected?\n4. Propose a recovery and prevention plan',
          },
          purpose: {
            fa: 'آمادگی عملی برای مقابله با حوادث امنیتی جدی',
            en: 'Practical readiness to handle serious security incidents',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'چرخه پاسخ به حادثه NIST',
            en: 'NIST Incident Response Lifecycle',
          },
          url: '/fa/glossary/incident-response',
          isInternal: true,
        },
      ],
      books: [],
      videos: [],
    },
    {
      id: 'ps-step-4',
      order: 4,
      title: {
        fa: 'امنیت ابری و DevSecOps',
        en: 'Cloud Security and DevSecOps',
      },
      description: {
        fa: 'ادغام امنیت در فرآیندهای توسعه و استقرار در محیط‌های ابری (AWS, Azure, GCP)',
        en: 'Integrating security into development and deployment pipelines in cloud environments (AWS, Azure, GCP)',
      },
      whyImportant: {
        fa: 'با مهاجرت به ابر، مسئولیت امنیت بین سازمان و ارائه‌دهنده ابر تقسیم می‌شود. بسیاری از نقض‌ها ناشی از پیکربندی نادرست هستند.',
        en: 'With cloud migration, security responsibility is shared. Most breaches stem from misconfigurations.',
      },
      learningOutcomes: {
        fa: [
          'درک مدل مسئولیت مشترک در ابر',
          'استفاده از ابزارهای اسکن IaC (مثل Checkov)',
          'اجرای امنیت در CI/CD Pipeline',
          'مدیریت هویت و دسترسی در AWS/Azure',
        ],
        en: [
          'Understand shared responsibility model in cloud',
          'Use IaC scanning tools (e.g., Checkov)',
          'Implement security in CI/CD pipelines',
          'Manage identity and access in AWS/Azure',
        ],
      },
      estimatedTime: '10 hours',
      prompts: [
        {
          id: 'ps-4-prompt-1',
          title: {
            fa: 'طراحی یک Pipeline امن DevSecOps',
            en: 'Designing a Secure DevSecOps Pipeline',
          },
          prompt: {
            fa: 'می‌خواهم یک pipeline مستمر برای استقرار در AWS داشته باشم. لطفاً:\n1. مراحل ادغام امنیت در هر فاز (کد، ساخت، تست، استقرار) را مشخص کن\n2. ابزارهای مناسب برای اسکن کد، وابستگی‌ها و زیرساخت را پیشنهاد بده\n3. نحوه مدیریت رازها (Secrets) را توضیح بده\n4. خطرات رایج در محیط‌های ابری را لیست کن',
            en: 'I want a continuous deployment pipeline on AWS. Please:\n1. Specify how to integrate security at each stage (code, build, test, deploy)\n2. Recommend tools for scanning code, dependencies, and infrastructure\n3. Explain secrets management\n4. List common cloud security risks',
          },
          purpose: {
            fa: 'ساخت یک فرآیند توسعه ایمن و خودکار',
            en: 'Building a secure and automated development process',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'امنیت در AWS: بهترین روش‌ها',
            en: 'AWS Security Best Practices',
          },
          url: '/fa/guides/aws-security',
          isInternal: true,
        },
      ],
      books: [],
      videos: [],
    },
    {
      id: 'ps-step-5',
      order: 5,
      title: {
        fa: 'مدیریت ریسک و انطباق (Compliance)',
        en: 'Risk Management and Compliance',
      },
      description: {
        fa: 'اجرای چارچوب‌های مدیریت ریسک (مثل ISO 27001, NIST CSF) و انطباق با مقررات (GDPR, HIPAA)',
        en: 'Implementing risk management frameworks (e.g., ISO 27001, NIST CSF) and regulatory compliance (GDPR, HIPAA)',
      },
      whyImportant: {
        fa: 'سازمان‌ها نه‌تنها باید امن باشند، بلکه باید بتوانند امنیت خود را اثبات کنند. عدم انطباق می‌تواند منجر به جریمه‌های سنگین شود.',
        en: 'Organizations must not only be secure but prove it. Non-compliance can lead to heavy fines.',
      },
      learningOutcomes: {
        fa: [
          'اجرای چارچوب ISO 27001 برای ISMS',
          'ارزیابی انطباق با GDPR یا قوانین محلی',
          'اجرای کنترل‌های امنیتی بر اساس NIST CSF',
          'آماده‌سازی برای حسابرسی امنیتی',
        ],
        en: [
          'Implement ISO 27001 for ISMS',
          'Assess compliance with GDPR or local regulations',
          'Apply security controls based on NIST CSF',
          'Prepare for security audits',
        ],
      },
      estimatedTime: '8 hours',
      prompts: [
        {
          id: 'ps-5-prompt-1',
          title: {
            fa: 'راه‌اندازی ISMS بر اساس ISO 27001',
            en: 'Implementing ISMS Based on ISO 27001',
          },
          prompt: {
            fa: 'شرکت ما می‌خواهد گواهی ISO 27001 دریافت کند. لطفاً:\n1. مراحل اجرای یک سیستم مدیریت امنیت اطلاعات (ISMS) را شرح بده\n2. مهم‌ترین کنترل‌های Annex A را لیست کن\n3. نحوه انجام ارزیابی ریسک را توضیح بده\n4. فرآیند حسابرسی داخلی و خارجی را مشخص کن',
            en: 'Our company wants ISO 27001 certification. Please:\n1. Describe steps to implement an Information Security Management System (ISMS)\n2. List key Annex A controls\n3. Explain how to perform risk assessment\n4. Outline internal and external audit processes',
          },
          purpose: {
            fa: 'اجرای یک سیستم مدیریت امنیت اطلاعات استاندارد',
            en: 'Implementing a standardized information security management system',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'ISO 27001 در عمل',
            en: 'ISO 27001 in Practice',
          },
          url: '/fa/guides/iso27001-guide',
          isInternal: true,
        },
      ],
      books: [
        {
          title: {
            fa: 'راهنمای کامل ISO 27001',
            en: 'ISO 27001 Complete Guide',
          },
          author: 'Alan Calder',
          description: {
            fa: 'راهنمای جامع برای پیاده‌سازی و گواهی‌گیری ISO 27001',
            en: 'A comprehensive guide to implementing and certifying ISO 27001',
          },
        },
      ],
      videos: [],
    },
  ],
  faqs: [
    {
      question: {
        fa: 'آیا این مسیر برای گذراندن گواهینامه‌هایی مثل CEH یا CISSP مفید است؟',
        en: 'Is this path useful for certifications like CEH or CISSP?',
      },
      answer: {
        fa: 'بله، مفاهیم این مسیر پایه‌های اصلی بسیاری از گواهینامه‌های حرفه‌ای هستند، هرچند مطالعه اضافی نیاز است.',
        en: 'Yes, this path covers core concepts of many professional certifications, though additional study is required.',
      },
    },
    {
      question: {
        fa: 'آیا نیاز به دسترسی به محیط آزمایشگاهی دارم؟',
        en: 'Do I need access to a lab environment?',
      },
      answer: {
        fa: 'برای برخی مراحل (مثل تست نفوذ)، استفاده از محیط‌های آزمایشی مانند TryHackMe یا Hack The Box توصیه می‌شود.',
        en: 'For some steps (e.g., penetration testing), using labs like TryHackMe or Hack The Box is recommended.',
      },
    },
  ],
  tips: {
    fa: [
      'از محیط‌های آزمایشی برای تمرین تست نفوذ استفاده کنید',
      'گزارش‌های واقعی حوادث امنیتی را مطالعه کنید',
      'در جامعه امنیتی مشارکت کنید (مثل GitHub, Reddit)',
      'مستندسازی را جدی بگیرید — یک گزارش خوب نصف موفقیت است',
    ],
    en: [
      'Use practice labs for penetration testing',
      'Study real-world incident reports',
      'Engage with the security community (e.g., GitHub, Reddit)',
      'Take documentation seriously — a good report is half the battle',
    ],
  },
};
