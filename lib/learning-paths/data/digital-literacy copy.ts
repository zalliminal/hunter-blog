// lib/learning-paths/data/digital-literacy.ts

import { LearningPath } from "../learning-path-types";

export const digitalLiteracyPath: LearningPath = {
  slug: 'digital-literacy',
  title: {
    fa: 'سواد دیجیتال',
    en: 'Digital Literacy',
  },
  description: {
    fa: 'پایه و اساس امنیت، شناخت تهدیدات روزمره و محافظت از خود در دنیای دیجیتال',
    en: 'Foundation of security, understanding everyday threats and protecting yourself in the digital world',
  },
  targetAudience: {
    fa: 'افرادی که می‌خواهند امنیت شخصی خود را در فضای دیجیتال بهبود بخشند',
    en: 'Individuals who want to improve their personal security in the digital space',
  },
  totalSteps: 5,
  estimatedTotalTime: {
    fa: '2-3 هفته',
    en: '2-3 weeks',
  },
  difficulty: 'beginner',
  color: {
    primary: 'cyan',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    light: 'text-cyan-400',
  },
  icon: 'Shield',
  steps: [
    {
      id: 'dl-step-1',
      order: 1,
      title: {
        fa: 'رمزهای عبور قوی و مدیریت آن‌ها',
        en: 'Strong Passwords and Password Management',
      },
      description: {
        fa: 'یادگیری اصول ساخت رمز عبور قوی، استفاده از مدیر رمزهای عبور و فعال‌سازی احراز هویت دو مرحله‌ای',
        en: 'Learning principles of creating strong passwords, using password managers, and enabling two-factor authentication',
      },
      whyImportant: {
        fa: 'رمز عبور ضعیف اولین دروازه ورود هکرها به حساب‌های شماست. بیش از 80% حملات سایبری از رمزهای ضعیف شروع می‌شوند.',
        en: 'Weak passwords are the first gateway for hackers to access your accounts. Over 80% of cyber attacks start with weak passwords.',
      },
      learningOutcomes: {
        fa: [
          'ساخت رمزهای عبور قوی و منحصر به فرد',
          'استفاده از مدیر رمزهای عبور مانند Bitwarden',
          'فعال‌سازی 2FA در تمام سرویس‌های مهم',
          'شناسایی رمزهای عبور در معرض خطر',
        ],
        en: [
          'Creating strong and unique passwords',
          'Using password managers like Bitwarden',
          'Enabling 2FA on all important services',
          'Identifying compromised passwords',
        ],
      },
      estimatedTime: '3-4 hours',
      prompts: [
        {
          id: 'dl-1-prompt-1',
          title: {
            fa: 'تحلیل امنیت رمز عبور',
            en: 'Password Security Analysis',
          },
          prompt: {
            fa: 'من می‌خواهم رمزهای عبور خود را بهبود بخشم. لطفاً:\n1. توضیح بده چرا رمزهای عبور مانند "123456" یا "password" خطرناک هستند\n2. یک فرمول برای ساخت رمز عبور قوی و به یادماندنی به من بده\n3. توضیح بده چرا نباید از یک رمز عبور برای همه سرویس‌ها استفاده کنم\n4. مزایا و معایب مدیرهای رمز عبور را شرح بده',
            en: 'I want to improve my passwords. Please:\n1. Explain why passwords like "123456" or "password" are dangerous\n2. Give me a formula for creating strong and memorable passwords\n3. Explain why I shouldn\'t use one password for all services\n4. Describe pros and cons of password managers',
          },
          purpose: {
            fa: 'درک عمیق از اهمیت رمزهای قوی و نحوه مدیریت آن‌ها',
            en: 'Deep understanding of the importance of strong passwords and how to manage them',
          },
        },
        {
          id: 'dl-1-prompt-2',
          title: {
            fa: 'راهنمای انتخاب مدیر رمز عبور',
            en: 'Password Manager Selection Guide',
          },
          prompt: {
            fa: 'می‌خواهم یک مدیر رمز عبور انتخاب کنم. لطفاً:\n1. مقایسه‌ای بین Bitwarden، 1Password، و LastPass ارائه بده\n2. معیارهای انتخاب یک مدیر رمز عبور امن را توضیح بده\n3. نحوه انتقال رمزهای فعلی به مدیر رمز عبور را شرح بده\n4. بهترین روش‌های استفاده از مدیر رمز عبور را بگو',
            en: 'I want to choose a password manager. Please:\n1. Provide a comparison between Bitwarden, 1Password, and LastPass\n2. Explain criteria for choosing a secure password manager\n3. Describe how to migrate current passwords to a password manager\n4. Share best practices for using a password manager',
          },
          purpose: {
            fa: 'انتخاب و راه‌اندازی صحیح مدیر رمز عبور',
            en: 'Proper selection and setup of a password manager',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای جامع احراز هویت دو مرحله‌ای',
            en: 'Complete Guide to Two-Factor Authentication',
          },
          url: '/fa/glossary/two-factor-authentication',
          isInternal: true,
          description: {
            fa: 'همه چیز درباره 2FA و نحوه فعال‌سازی آن',
            en: 'Everything about 2FA and how to enable it',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'امنیت شخصی در عصر دیجیتال',
            en: 'Personal Security in the Digital Age',
          },
          author: 'Bruce Schneier',
          description: {
            fa: 'کتابی جامع درباره امنیت شخصی و نحوه محافظت از اطلاعات در دنیای دیجیتال',
            en: 'A comprehensive book about personal security and protecting information in the digital world',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'چگونه یک رمز عبور قوی بسازیم؟',
            en: 'How to Create a Strong Password?',
          },
          url: 'https://www.youtube.com/watch?v=example1',
          platform: 'youtube',
          duration: '12:30',
          description: {
            fa: 'آموزش تصویری ساخت رمز عبور قوی',
            en: 'Visual tutorial on creating strong passwords',
          },
        },
      ],
    },
    {
      id: 'dl-step-2',
      order: 2,
      title: {
        fa: 'شناسایی فیشینگ و مهندسی اجتماعی',
        en: 'Identifying Phishing and Social Engineering',
      },
      description: {
        fa: 'یادگیری تشخیص ایمیل‌ها، پیام‌ها و وب‌سایت‌های جعلی و محافظت در برابر حملات مهندسی اجتماعی',
        en: 'Learning to detect fake emails, messages, and websites, and protecting against social engineering attacks',
      },
      whyImportant: {
        fa: 'فیشینگ یکی از رایج‌ترین روش‌های سرقت اطلاعات است. هر روز میلیون‌ها ایمیل فیشینگ ارسال می‌شود.',
        en: 'Phishing is one of the most common methods of data theft. Millions of phishing emails are sent every day.',
      },
      learningOutcomes: {
        fa: [
          'تشخیص ایمیل‌های فیشینگ',
          'بررسی صحت لینک‌ها قبل از کلیک',
          'شناسایی تکنیک‌های مهندسی اجتماعی',
          'واکنش صحیح به حملات فیشینگ',
        ],
        en: [
          'Detecting phishing emails',
          'Verifying links before clicking',
          'Identifying social engineering techniques',
          'Proper response to phishing attacks',
        ],
      },
      estimatedTime: '4-5 hours',
      prompts: [
        {
          id: 'dl-2-prompt-1',
          title: {
            fa: 'تحلیل ایمیل مشکوک',
            en: 'Suspicious Email Analysis',
          },
          prompt: {
            fa: 'یک ایمیل دریافت کرده‌ام که ادعا می‌کند از بانکم است و می‌گوید باید فوراً روی لینک کلیک کنم. چطور می‌توانم تشخیص بدهم این ایمیل واقعی است یا فیشینگ؟ لطفاً:\n1. نشانه‌های یک ایمیل فیشینگ را لیست کن\n2. نحوه بررسی لینک‌ها را توضیح بده\n3. اقداماتی که باید انجام دهم را شرح بده\n4. نحوه گزارش فیشینگ را بگو',
            en: 'I received an email claiming to be from my bank saying I must click a link immediately. How can I tell if this email is real or phishing? Please:\n1. List signs of a phishing email\n2. Explain how to check links\n3. Describe actions I should take\n4. Tell me how to report phishing',
          },
          purpose: {
            fa: 'توانایی تشخیص و واکنش صحیح به ایمیل‌های فیشینگ',
            en: 'Ability to detect and respond correctly to phishing emails',
          },
        },
        {
          id: 'dl-2-prompt-2',
          title: {
            fa: 'سناریوهای مهندسی اجتماعی',
            en: 'Social Engineering Scenarios',
          },
          prompt: {
            fa: 'می‌خواهم درباره مهندسی اجتماعی بیشتر بدانم. لطفاً:\n1. 5 سناریوی رایج مهندسی اجتماعی را شرح بده\n2. تکنیک‌های روانشناسی که مهاجمان استفاده می‌کنند را توضیح بده\n3. نحوه محافظت در برابر این حملات را بگو\n4. مثال‌هایی از حملات موفق مهندسی اجتماعی در دنیای واقعی بیاور',
            en: 'I want to learn more about social engineering. Please:\n1. Describe 5 common social engineering scenarios\n2. Explain psychological techniques attackers use\n3. Tell me how to protect against these attacks\n4. Give examples of successful real-world social engineering attacks',
          },
          purpose: {
            fa: 'آگاهی از تکنیک‌های مهندسی اجتماعی و نحوه مقابله',
            en: 'Awareness of social engineering techniques and how to counter them',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای کامل فیشینگ',
            en: 'Complete Phishing Guide',
          },
          url: '/fa/glossary/phishing',
          isInternal: true,
        },
      ],
      books: [],
      videos: [
        {
          title: {
            fa: 'نمونه‌های واقعی حملات فیشینگ',
            en: 'Real Examples of Phishing Attacks',
          },
          url: 'https://www.youtube.com/watch?v=example2',
          platform: 'youtube',
          duration: '18:45',
        },
      ],
    },
    {
      id: 'dl-step-3',
      order: 3,
      title: {
        fa: 'امنیت شبکه‌های وای‌فای و اتصالات عمومی',
        en: 'WiFi Security and Public Connections',
      },
      description: {
        fa: 'یادگیری استفاده امن از شبکه‌های وای‌فای عمومی، VPN و محافظت از اطلاعات در شبکه‌های ناامن',
        en: 'Learning safe use of public WiFi networks, VPN, and protecting data on insecure networks',
      },
      whyImportant: {
        fa: 'شبکه‌های وای‌فای عمومی یکی از خطرناک‌ترین محیط‌ها برای سرقت اطلاعات هستند. حملات Man-in-the-Middle در این شبکه‌ها بسیار رایج است.',
        en: 'Public WiFi networks are one of the most dangerous environments for data theft. Man-in-the-Middle attacks are very common on these networks.',
      },
      learningOutcomes: {
        fa: [
          'شناسایی شبکه‌های وای‌فای ناامن',
          'استفاده صحیح از VPN',
          'محافظت از اطلاعات در شبکه‌های عمومی',
          'تنظیمات امنیتی مودم خانگی',
        ],
        en: [
          'Identifying insecure WiFi networks',
          'Proper use of VPN',
          'Protecting data on public networks',
          'Home router security settings',
        ],
      },
      estimatedTime: '3 hours',
      prompts: [
        {
          id: 'dl-3-prompt-1',
          title: {
            fa: 'راهنمای انتخاب VPN',
            en: 'VPN Selection Guide',
          },
          prompt: {
            fa: 'می‌خواهم یک VPN برای محافظت از خود در شبکه‌های عمومی استفاده کنم. لطفاً:\n1. توضیح بده VPN چیست و چگونه کار می‌کند\n2. معیارهای انتخاب یک VPN امن را بگو\n3. مقایسه‌ای بین VPN رایگان و پولی ارائه بده\n4. نحوه راه‌اندازی و استفاده از VPN را شرح بده',
            en: 'I want to use a VPN to protect myself on public networks. Please:\n1. Explain what VPN is and how it works\n2. Tell me criteria for choosing a secure VPN\n3. Provide a comparison between free and paid VPNs\n4. Describe how to set up and use a VPN',
          },
          purpose: {
            fa: 'انتخاب و استفاده صحیح از VPN',
            en: 'Proper selection and use of VPN',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'حملات Man-in-the-Middle',
            en: 'Man-in-the-Middle Attacks',
          },
          url: '/fa/glossary/man-in-the-middle',
          isInternal: true,
        },
      ],
      books: [],
      videos: [],
    },
    {
      id: 'dl-step-4',
      order: 4,
      title: {
        fa: 'امنیت موبایل و اپلیکیشن‌ها',
        en: 'Mobile and App Security',
      },
      description: {
        fa: 'محافظت از گوشی هوشمند، مدیریت مجوزهای اپلیکیشن‌ها و شناسایی اپلیکیشن‌های مخرب',
        en: 'Protecting smartphones, managing app permissions, and identifying malicious apps',
      },
      whyImportant: {
        fa: 'گوشی هوشمند شما حاوی بیشترین اطلاعات شخصی شماست. از عکس‌ها و پیام‌ها تا اطلاعات بانکی و موقعیت مکانی.',
        en: 'Your smartphone contains most of your personal information, from photos and messages to banking details and location data.',
      },
      learningOutcomes: {
        fa: [
          'تنظیمات امنیتی گوشی',
          'مدیریت مجوزهای اپلیکیشن‌ها',
          'شناسایی اپلیکیشن‌های مخرب',
          'رمزگذاری و پشتیبان‌گیری',
        ],
        en: [
          'Phone security settings',
          'Managing app permissions',
          'Identifying malicious apps',
          'Encryption and backup',
        ],
      },
      estimatedTime: '3-4 hours',
      prompts: [
        {
          id: 'dl-4-prompt-1',
          title: {
            fa: 'بررسی امنیت گوشی',
            en: 'Phone Security Audit',
          },
          prompt: {
            fa: 'می‌خواهم امنیت گوشی خود را بررسی کنم. لطفاً یک چک‌لیست کامل برای:\n1. تنظیمات امنیتی اندروید/iOS\n2. مجوزهای اپلیکیشن‌ها که باید بررسی شوند\n3. نشانه‌های اپلیکیشن‌های مخرب\n4. بهترین روش‌های پشتیبان‌گیری امن\nبه من بده.',
            en: 'I want to audit my phone security. Please give me a complete checklist for:\n1. Android/iOS security settings\n2. App permissions that should be reviewed\n3. Signs of malicious apps\n4. Best practices for secure backup',
          },
          purpose: {
            fa: 'ارزیابی و بهبود امنیت گوشی هوشمند',
            en: 'Evaluating and improving smartphone security',
          },
        },
      ],
      articles: [],
      books: [],
      videos: [],
    },
    {
      id: 'dl-step-5',
      order: 5,
      title: {
        fa: 'حریم خصوصی آنلاین و ردپای دیجیتال',
        en: 'Online Privacy and Digital Footprint',
      },
      description: {
        fa: 'مدیریت حریم خصوصی در شبکه‌های اجتماعی، کنترل ردپای دیجیتال و محافظت از اطلاعات شخصی',
        en: 'Managing privacy on social networks, controlling digital footprint, and protecting personal information',
      },
      whyImportant: {
        fa: 'هر چیزی که آنلاین به اشتراک می‌گذارید، برای همیشه باقی می‌ماند. ردپای دیجیتال شما می‌تواند علیه شما استفاده شود.',
        en: 'Everything you share online stays forever. Your digital footprint can be used against you.',
      },
      learningOutcomes: {
        fa: [
          'تنظیمات حریم خصوصی شبکه‌های اجتماعی',
          'مدیریت اطلاعات شخصی آنلاین',
          'استفاده از ابزارهای حفظ حریم خصوصی',
          'کنترل ردپای دیجیتال',
        ],
        en: [
          'Social media privacy settings',
          'Managing personal information online',
          'Using privacy tools',
          'Controlling digital footprint',
        ],
      },
      estimatedTime: '4 hours',
      prompts: [
        {
          id: 'dl-5-prompt-1',
          title: {
            fa: 'ممیزی حریم خصوصی',
            en: 'Privacy Audit',
          },
          prompt: {
            fa: 'می‌خواهم حریم خصوصی آنلاین خود را بهبود بخشم. لطفاً:\n1. راهنمای تنظیمات حریم خصوصی برای Instagram، Twitter، Facebook و LinkedIn\n2. نحوه حذف اطلاعات قدیمی از اینترنت\n3. ابزارهای حفظ حریم خصوصی که باید استفاده کنم\n4. نحوه بررسی ردپای دیجیتال خود\nرا به من بگو.',
            en: 'I want to improve my online privacy. Please tell me:\n1. Privacy settings guide for Instagram, Twitter, Facebook, and LinkedIn\n2. How to remove old information from the internet\n3. Privacy tools I should use\n4. How to check my digital footprint',
          },
          purpose: {
            fa: 'بهبود حریم خصوصی و کنترل اطلاعات شخصی آنلاین',
            en: 'Improving privacy and controlling personal information online',
          },
        },
      ],
      articles: [],
      books: [
        {
          title: {
            fa: 'هیچ چیز برای پنهان کردن ندارم',
            en: 'Nothing to Hide',
          },
          author: 'Daniel J. Solove',
          description: {
            fa: 'کتابی درباره اهمیت حریم خصوصی در عصر دیجیتال',
            en: 'A book about the importance of privacy in the digital age',
          },
        },
      ],
      videos: [],
    },
  ],
  faqs: [
    {
      question: {
        fa: 'چقدر طول می‌کشد تا این مسیر را کامل کنم؟',
        en: 'How long does it take to complete this path?',
      },
      answer: {
        fa: 'با اختصاص 3-4 ساعت در هفته، می‌توانید این مسیر را در 2-3 هفته کامل کنید. البته سرعت یادگیری هر فرد متفاوت است.',
        en: 'With 3-4 hours per week, you can complete this path in 2-3 weeks. However, learning speed varies for each person.',
      },
    },
    {
      question: {
        fa: 'آیا نیاز به دانش فنی قبلی دارم؟',
        en: 'Do I need prior technical knowledge?',
      },
      answer: {
        fa: 'خیر، این مسیر برای افراد بدون دانش فنی طراحی شده است. تنها نیاز به استفاده پایه از کامپیوتر و اینترنت دارید.',
        en: 'No, this path is designed for people without technical knowledge. You only need basic computer and internet usage skills.',
      },
    },
  ],
  tips: {
    fa: [
      'هر روز 30 دقیقه وقت بگذارید بهتر از یک روز 3 ساعت است',
      'تمام آموخته‌ها را عملی کنید، نه فقط بخوانید',
      'رمزهای عبور خود را همین امروز تغییر دهید',
      'با خانواده و دوستان خود این دانش را به اشتراک بگذارید',
    ],
    en: [
      '30 minutes daily is better than 3 hours once',
      'Practice everything you learn, don\'t just read',
      'Change your passwords today',
      'Share this knowledge with family and friends',
    ],
  },
};
