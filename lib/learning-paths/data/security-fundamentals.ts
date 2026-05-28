// lib/learning-paths/data/security-fundamentals.ts

import { LearningPath } from "../learning-path-types";

export const securityFundamentalsPath: LearningPath = {
  slug: 'security-fundamentals',
  title: {
    fa: 'مبانی امنیت سایبری',
    en: 'Cybersecurity Fundamentals',
  },
  description: {
    fa: 'درک مفاهیم پایه‌ای امنیت سایبری، تهدیدات رایج و بهترین روش‌های دفاعی برای کاربران فنی و غیرفنی',
    en: 'Understanding core cybersecurity concepts, common threats, and best defensive practices for both technical and non-technical users',
  },
  targetAudience: {
    fa: 'دانشجویان، توسعه‌دهندگان مبتدی، و هر کسی که می‌خواهد پایه‌های امنیت سایبری را بیاموزد',
    en: 'Students, beginner developers, and anyone who wants to learn the foundations of cybersecurity',
  },
  totalSteps: 4,
  estimatedTotalTime: {
    fa: '3-4 هفته',
    en: '3-4 weeks',
  },
  difficulty: 'beginner',
  color: {
    primary: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    light: 'text-emerald-400',
  },
  icon: 'Lock',
  steps: [
    {
      id: 'sf-step-1',
      order: 1,
      title: {
        fa: 'مفاهیم پایه امنیت: CIA Triad',
        en: 'Core Security Concepts: The CIA Triad',
      },
      description: {
        fa: 'آشنایی با سه ستون اصلی امنیت: محرمانگی (Confidentiality)، یکپارچگی (Integrity)، و در دسترس بودن (Availability)',
        en: 'Introduction to the three pillars of security: Confidentiality, Integrity, and Availability (CIA Triad)',
      },
      whyImportant: {
        fa: 'CIA Triad چارچوبی است که تمام تصمیمات امنیتی بر اساس آن ساخته می‌شوند. بدون درک این مفاهیم، نمی‌توان سیستم‌های امن طراحی کرد.',
        en: 'The CIA Triad is the framework upon which all security decisions are built. Without understanding these concepts, secure systems cannot be designed.',
      },
      learningOutcomes: {
        fa: [
          'تعریف و تشخیص محرمانگی، یکپارچگی و در دسترس بودن',
          'ارزیابی سناریوهای واقعی بر اساس CIA Triad',
          'درک تعادل بین سه مؤلفه',
          'شناسایی نقض‌های امنیتی با استفاده از این مدل',
        ],
        en: [
          'Define and identify confidentiality, integrity, and availability',
          'Evaluate real-world scenarios using the CIA Triad',
          'Understand trade-offs between the three components',
          'Identify security breaches using this model',
        ],
      },
      estimatedTime: '4 hours',
      prompts: [
        {
          id: 'sf-1-prompt-1',
          title: {
            fa: 'تحلیل سناریو با CIA Triad',
            en: 'Scenario Analysis Using CIA Triad',
          },
          prompt: {
            fa: 'فرض کن یک بیمارستان سیستم الکترونیک پرونده بیمار دارد. لطفاً:\n1. توضیح بده چرا هر یک از مؤلفه‌های CIA در این سیستم حیاتی است\n2. یک حمله فرضی طراحی کن که هر مؤلفه را جداگانه نقض کند\n3. راهکارهای دفاعی برای هر مورد پیشنهاد بده\n4. توضیح بده چرا گاهی باید بین CIA تعادل برقرار کرد',
            en: 'Imagine a hospital with an electronic patient record system. Please:\n1. Explain why each component of CIA is critical in this system\n2. Design a hypothetical attack that violates each component separately\n3. Suggest defensive measures for each case\n4. Explain why trade-offs between CIA components are sometimes necessary',
          },
          purpose: {
            fa: 'درک عمیق و کاربردی CIA Triad در محیط‌های واقعی',
            en: 'Deep and practical understanding of the CIA Triad in real-world contexts',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'CIA Triad: ستون‌های امنیت سایبری',
            en: 'CIA Triad: The Pillars of Cybersecurity',
          },
          url: '/fa/glossary/cia-triad',
          isInternal: true,
        },
      ],
      books: [
        {
          title: {
            fa: 'مبانی امنیت سایبری',
            en: 'Cybersecurity Essentials',
          },
          author: 'Charles J. Brooks et al.',
          description: {
            fa: 'کتابی مناسب برای شروع یادگیری مفاهیم پایه امنیت سایبری',
            en: 'A great introductory book for learning foundational cybersecurity concepts',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'CIA Triad به زبان ساده',
            en: 'CIA Triad Explained Simply',
          },
          url: 'https://www.youtube.com/watch?v=cia-example',
          platform: 'youtube',
          duration: '15:20',
        },
      ],
    },
    {
      id: 'sf-step-2',
      order: 2,
      title: {
        fa: 'تهدیدات، آسیب‌پذیری‌ها و ریسک',
        en: 'Threats, Vulnerabilities, and Risk',
      },
      description: {
        fa: 'تفاوت بین تهدید، آسیب‌پذیری و ریسک؛ و نحوه مدیریت آن‌ها در سیستم‌های دیجیتال',
        en: 'Distinguishing threats, vulnerabilities, and risk; and how to manage them in digital systems',
      },
      whyImportant: {
        fa: 'بدون درک این سه مفهوم، نمی‌توان به‌درستی اولویت‌بندی امنیتی انجام داد یا منابع را به‌خوبی تخصیص داد.',
        en: 'Without understanding these three concepts, you cannot properly prioritize security efforts or allocate resources effectively.',
      },
      learningOutcomes: {
        fa: [
          'تشخیص تفاوت بین تهدید، آسیب‌پذیری و ریسک',
          'شناسایی تهدیدات رایج (مثل بدافزار، هکرها، خطاهای انسانی)',
          'ارزیابی ریسک با استفاده از ماتریس ساده',
          'درک مفهوم "Attack Surface"',
        ],
        en: [
          'Differentiate between threat, vulnerability, and risk',
          'Identify common threats (e.g., malware, hackers, human error)',
          'Assess risk using a simple risk matrix',
          'Understand the concept of "Attack Surface"',
        ],
      },
      estimatedTime: '5 hours',
      prompts: [
        {
          id: 'sf-2-prompt-1',
          title: {
            fa: 'مدل‌سازی ریسک برای یک وب‌سایت شخصی',
            en: 'Risk Modeling for a Personal Website',
          },
          prompt: {
            fa: 'من یک وب‌سایت شخصی دارم که شامل فرم تماس و بلاگ است. لطفاً:\n1. لیستی از تهدیدات احتمالی برای این سایت بده\n2. آسیب‌پذیری‌های بالقوه را شناسایی کن\n3. یک ماتریس ریسک ساده (احتمال × تأثیر) برای هر مورد بساز\n4. پیشنهادهایی برای کاهش ریسک ارائه بده',
            en: 'I have a personal website with a contact form and blog. Please:\n1. List potential threats to this site\n2. Identify possible vulnerabilities\n3. Create a simple risk matrix (likelihood × impact) for each\n4. Suggest ways to reduce risk',
          },
          purpose: {
            fa: 'توانایی ارزیابی ریسک در یک پروژه واقعی',
            en: 'Ability to assess risk in a real-world project',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'مدیریت ریسک امنیتی',
            en: 'Security Risk Management',
          },
          url: '/fa/glossary/security-risk',
          isInternal: true,
        },
      ],
      books: [],
      videos: [
        {
          title: {
            fa: 'تهدید در مقابل آسیب‌پذیری: چه تفاوتی دارند؟',
            en: 'Threat vs. Vulnerability: What’s the Difference?',
          },
          url: 'https://www.youtube.com/watch?v=threat-vuln-example',
          platform: 'youtube',
          duration: '12:10',
        },
      ],
    },
    {
      id: 'sf-step-3',
      order: 3,
      title: {
        fa: 'احراز هویت، صدور مجوز و کنترل دسترسی',
        en: 'Authentication, Authorization, and Access Control',
      },
      description: {
        fa: 'یادگیری تفاوت بین احراز هویت (Authentication) و صدور مجوز (Authorization)، و مدل‌های کنترل دسترسی',
        en: 'Learning the difference between authentication and authorization, and access control models',
      },
      whyImportant: {
        fa: 'بسیاری از نقض‌های امنیتی ناشی از پیکربندی نادرست دسترسی‌ها هستند. درک این مفاهیم برای جلوگیری از دسترسی غیرمجاز ضروری است.',
        en: 'Many security breaches stem from misconfigured access controls. Understanding these concepts is essential to prevent unauthorized access.',
      },
      learningOutcomes: {
        fa: [
          'تفکیک Authentication و Authorization',
          'درک مدل‌های DAC, MAC, RBAC',
          'اجرای اصل حداقل دسترسی (Principle of Least Privilege)',
          'شناسایی خطاهای رایج در مدیریت دسترسی',
        ],
        en: [
          'Differentiate authentication from authorization',
          'Understand DAC, MAC, and RBAC models',
          'Apply the Principle of Least Privilege',
          'Identify common access control mistakes',
        ],
      },
      estimatedTime: '4 hours',
      prompts: [
        {
          id: 'sf-3-prompt-1',
          title: {
            fa: 'طراحی سیستم دسترسی برای یک اپلیکیشن',
            en: 'Designing an Access Control System',
          },
          prompt: {
            fa: 'می‌خواهم یک اپلیکیشن مدیریت پروژه بسازم با نقش‌های کاربر، مدیر و ادمین. لطفاً:\n1. توضیح بده چه نوع احراز هویت و صدور مجوزی نیاز دارم\n2. مدل دسترسی مناسب (مثل RBAC) را پیشنهاد بده\n3. نحوه پیاده‌سازی اصل حداقل دسترسی را شرح بده\n4. خطرات احتمالی را لیست کن',
            en: 'I’m building a project management app with user, manager, and admin roles. Please:\n1. Explain what kind of authentication and authorization I need\n2. Recommend a suitable access model (e.g., RBAC)\n3. Describe how to implement the Principle of Least Privilege\n4. List potential risks',
          },
          purpose: {
            fa: 'طراحی امن سیستم‌های دسترسی در اپلیکیشن‌ها',
            en: 'Secure design of access control systems in applications',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'RBAC و مدل‌های کنترل دسترسی',
            en: 'RBAC and Access Control Models',
          },
          url: '/fa/glossary/rbac',
          isInternal: true,
        },
      ],
      books: [],
      videos: [],
    },
    {
      id: 'sf-step-4',
      order: 4,
      title: {
        fa: 'رمزنگاری و امنیت داده',
        en: 'Cryptography and Data Security',
      },
      description: {
        fa: 'مفاهیم پایه رمزنگاری، تفاوت بین رمزنگاری متقارن و نامتقارن، و کاربردهای عملی آن',
        en: 'Basic cryptography concepts, symmetric vs. asymmetric encryption, and practical applications',
      },
      whyImportant: {
        fa: 'رمزنگاری ستون اصلی امنیت داده است. بدون آن، اطلاعات در حال انتقال یا ذخیره‌سازی در معرض سرقت قرار دارند.',
        en: 'Cryptography is the backbone of data security. Without it, data in transit or at rest is vulnerable to theft.',
      },
      learningOutcomes: {
        fa: [
          'درک تفاوت رمزنگاری متقارن و نامتقارن',
          'کاربرد SSL/TLS، HTTPS و کلیدهای عمومی/خصوصی',
          'استفاده امن از توابع هش (مثل SHA-256)',
          'شناسایی موقعیت‌هایی که نیاز به رمزنگاری داریم',
        ],
        en: [
          'Understand symmetric vs. asymmetric encryption',
          'Use of SSL/TLS, HTTPS, and public/private keys',
          'Secure use of hash functions (e.g., SHA-256)',
          'Identify when encryption is needed',
        ],
      },
      estimatedTime: '5 hours',
      prompts: [
        {
          id: 'sf-4-prompt-1',
          title: {
            fa: 'مقایسه الگوریتم‌های رمزنگاری',
            en: 'Comparing Cryptographic Algorithms',
          },
          prompt: {
            fa: 'می‌خواهم برای یک اپلیکیشن تصمیم بگیرم که از چه روش رمزنگاری استفاده کنم. لطفاً:\n1. تفاوت AES، RSA و SHA-256 را توضیح بده\n2. کاربرد هر کدام را مشخص کن\n3. بهترین روش برای ذخیره رمز عبور کاربران چیست؟\n4. چرا نباید از MD5 یا SHA-1 استفاده کرد؟',
            en: 'I need to choose a cryptographic method for my app. Please:\n1. Explain the differences between AES, RSA, and SHA-256\n2. Specify the use case for each\n3. What’s the best way to store user passwords?\n4. Why shouldn’t I use MD5 or SHA-1?',
          },
          purpose: {
            fa: 'انتخاب صحیح روش‌های رمزنگاری برای سناریوهای مختلف',
            en: 'Choosing the right cryptographic methods for different scenarios',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'رمزنگاری در عمل: از تئوری تا پیاده‌سازی',
            en: 'Cryptography in Practice: From Theory to Implementation',
          },
          url: '/fa/glossary/cryptography-basics',
          isInternal: true,
        },
      ],
      books: [
        {
          title: {
            fa: 'هنر رمزنگاری',
            en: 'The Art of Cryptography',
          },
          author: 'Whitfield Diffie & Martin Hellman',
          description: {
            fa: 'مقدمه‌ای تاریخی و فنی به دنیای رمزنگاری مدرن',
            en: 'A historical and technical introduction to modern cryptography',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'رمزنگاری متقارن در مقابل نامتقارن',
            en: 'Symmetric vs. Asymmetric Encryption',
          },
          url: 'https://www.youtube.com/watch?v=crypto-example',
          platform: 'youtube',
          duration: '18:00',
        },
      ],
    },
  ],
  faqs: [
    {
      question: {
        fa: 'آیا این مسیر برای کسانی است که می‌خواهند در آینده متخصص امنیت شوند؟',
        en: 'Is this path for people who want to become security professionals?',
      },
      answer: {
        fa: 'بله! این مسیر پایه‌ای عالی برای شروع حرفه در امنیت سایبری است و پیش‌نیاز مسیر "امنیت حرفه‌ای" محسوب می‌شود.',
        en: 'Yes! This path is an excellent foundation for starting a career in cybersecurity and is a prerequisite for the "Professional Security" path.',
      },
    },
    {
      question: {
        fa: 'آیا نیاز به کدنویسی دارم؟',
        en: 'Do I need coding skills?',
      },
      answer: {
        fa: 'خیر، اما آشنایی با مفاهیم فنی مفید است. برخی مفاهیم برای توسعه‌دهندگان کاربردی‌تر است، اما همه می‌توانند از آن بهره ببرند.',
        en: 'No, but familiarity with technical concepts helps. Some topics are more relevant to developers, but everyone can benefit.',
      },
    },
  ],
  tips: {
    fa: [
      'هر مفهوم را با مثال‌های واقعی درک کنید',
      'از ابزارهای آنلاین برای تست مفاهیم رمزنگاری استفاده کنید',
      'CIA Triad را در هر تصمیم امنیتی در نظر بگیرید',
      'با دوستان خود سناریوهای تهدید طراحی کنید',
    ],
    en: [
      'Understand each concept through real-world examples',
      'Use online tools to experiment with cryptographic concepts',
      'Consider the CIA Triad in every security decision',
      'Design threat scenarios with friends',
    ],
  },
};
