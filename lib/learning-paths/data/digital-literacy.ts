// lib/learning-paths/data/digital-literacy.ts

import { LearningPath } from "../learning-path-types";

export const digitalLiteracyPath: LearningPath = {
  slug: 'digital-literacy',
  title: {
    fa: 'سواد دیجیتال و امنیت آنلاین',
    en: 'Digital Literacy and Online Security',
  },
  description: {
    fa: 'یاد بگیرید چطور در دنیای اینترنت امن بمانید، از اطلاعات‌تان محافظت کنید و تهدیدات رایج را تشخیص دهید',
    en: 'Learn how to stay safe online, protect your information, and recognize common threats',
  },
  targetAudience: {
    fa: 'همه کسانی که از اینترنت استفاده می‌کنند و می‌خواهند امنیت و حریم خصوصی خود را جدی بگیرند',
    en: 'Anyone who uses the internet and wants to take their security and privacy seriously',
  },
  totalSteps: 7,
  estimatedTotalTime: {
    fa: '3-4 هفته',
    en: '3-4 weeks',
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
        fa: 'مبانی امنیت: رمزهای عبور و احراز هویت',
        en: 'Security Basics: Passwords and Authentication',
      },
      description: {
        fa: 'یاد بگیرید چطور رمزهای عبور واقعاً قوی بسازید، آن‌ها را مدیریت کنید و از روش‌های پیشرفته احراز هویت استفاده کنید',
        en: 'Learn how to create truly strong passwords, manage them, and use advanced authentication methods',
      },
      whyImportant: {
        fa: 'رمز عبور شما کلید ورود به زندگی دیجیتال‌تان است. طبق آمار Verizon Data Breach Report، 81% از نقض‌های امنیتی به خاطر رمزهای ضعیف یا دزدیده شده اتفاق می‌افتد. یک رمز عبور ضعیف مثل این است که کلید خانه‌تان را زیر پادری بگذارید.',
        en: 'Your password is the key to your digital life. According to Verizon Data Breach Report, 81% of security breaches happen due to weak or stolen passwords. A weak password is like leaving your house key under the doormat.',
      },
      learningOutcomes: {
        fa: [
          'درک علمی از اینکه چرا رمزهای عبور ساده در عرض ثانیه شکسته می‌شوند',
          'ساخت رمزهای عبور قوی با روش Passphrase که هم امن‌اند هم به یادماندنی',
          'نصب و استفاده حرفه‌ای از مدیر رمزهای عبور (Bitwarden یا 1Password)',
          'فعال‌سازی احراز هویت دو عاملی (2FA) با اپلیکیشن‌های Authenticator',
          'بررسی اینکه آیا رمزهای شما در دیتابیس‌های هک شده لو رفته‌اند',
          'استفاده از کلیدهای امنیتی فیزیکی (Security Keys) برای حساب‌های حساس',
        ],
        en: [
          'Scientific understanding of why simple passwords are cracked in seconds',
          'Creating strong passwords using Passphrase method that are both secure and memorable',
          'Professional installation and use of password managers (Bitwarden or 1Password)',
          'Enabling two-factor authentication (2FA) with Authenticator apps',
          'Checking if your passwords have been leaked in hacked databases',
          'Using physical security keys for sensitive accounts',
        ],
      },
      estimatedTime: '4-5 hours',
      prompts: [
        {
          id: 'dl-1-prompt-1',
          title: {
            fa: 'چرا رمز عبور من ناامن است؟',
            en: 'Why Is My Password Insecure?',
          },
          prompt: {
            fa: `من رمز عبورهایی مثل "Ali1378" یا "Tehran@123" استفاده می‌کنم. فکر می‌کنم خیلی خوب هستند چون ترکیبی از حروف، اعداد و علامت دارند. لطفاً:

1. دقیقاً توضیح بده چرا این رمزها ضعیف هستند و چقدر طول می‌کشد تا شکسته شوند
2. به من بگو هکرها از چه ابزارهایی برای شکستن رمز استفاده می‌کنند (مثل Rainbow Tables، Brute Force، Dictionary Attack)
3. مفهوم Entropy در رمزهای عبور را ساده توضیح بده
4. یک فرمول عملی برای ساخت رمز عبور قوی که بتونم یادم بمونه بهم بده (روش Diceware یا Passphrase)
5. توضیح بده چرا استفاده از یک رمز برای همه جا مثل گذاشتن یک کلید برای خونه، ماشین و محل کار است`,
            en: `I use passwords like "Ali1378" or "Tehran@123". I think they're good because they have letters, numbers, and symbols. Please:

1. Explain exactly why these passwords are weak and how long it takes to crack them
2. Tell me what tools hackers use to crack passwords (like Rainbow Tables, Brute Force, Dictionary Attack)
3. Simply explain the concept of Entropy in passwords
4. Give me a practical formula for creating strong memorable passwords (Diceware or Passphrase method)
5. Explain why using one password everywhere is like having one key for home, car, and office`,
          },
          purpose: {
            fa: 'درک عمیق از ریاضیات و علم پشت امنیت رمزهای عبور',
            en: 'Deep understanding of the mathematics and science behind password security',
          },
        },
        {
          id: 'dl-1-prompt-2',
          title: {
            fa: 'راه‌اندازی کامل مدیر رمز عبور',
            en: 'Complete Password Manager Setup',
          },
          prompt: {
            fa: `می‌خواهم یک مدیر رمز عبور شروع کنم ولی نگرانم. لطفاً:

1. مقایسه کامل بین Bitwarden (رایگان و متن‌باز)، 1Password (پولی و محبوب)، و KeePassXC (آفلاین و محلی) بده
2. توضیح بده اگر شرکت سازنده مدیر رمز عبور هک بشه چی می‌شه؟ رمزهای من امن می‌مونن؟
3. مفهوم Zero-Knowledge Architecture را ساده توضیح بده
4. گام به گام نحوه انتقال رمزهای فعلی از مرورگر به مدیر رمز عبور را بگو
5. بهترین روش برای ساخت Master Password که هیچ وقت فراموش نکنم چیه؟
6. آیا باید از Emergency Access استفاده کنم؟ اگر بمیرم چی می‌شه؟`,
            en: `I want to start using a password manager but I'm worried. Please:

1. Give complete comparison between Bitwarden (free and open-source), 1Password (paid and popular), and KeePassXC (offline and local)
2. Explain what happens if the password manager company gets hacked? Will my passwords stay safe?
3. Simply explain the concept of Zero-Knowledge Architecture
4. Step by step, tell me how to migrate current passwords from browser to password manager
5. What's the best method for creating a Master Password I'll never forget?
6. Should I use Emergency Access? What happens if I die?`,
          },
          purpose: {
            fa: 'راه‌اندازی عملی و حرفه‌ای مدیر رمز عبور با درک کامل امنیت آن',
            en: 'Practical and professional password manager setup with complete security understanding',
          },
        },
        {
          id: 'dl-1-prompt-3',
          title: {
            fa: 'احراز هویت دو عاملی پیشرفته',
            en: 'Advanced Two-Factor Authentication',
          },
          prompt: {
            fa: `می‌خواهم 2FA رو درست راه‌اندازی کنم. لطفاً:

1. تفاوت بین SMS-based 2FA، Authenticator Apps (مثل Google Authenticator، Authy)، و Hardware Keys (مثل YubiKey) را توضیح بده
2. چرا SMS برای 2FA ناامن است؟ حمله SIM Swapping چیه؟
3. گام به گام نحوه فعال‌سازی 2FA با Google Authenticator یا Authy را برای Gmail، Instagram، و حساب بانکی بگو
4. Backup Codes چیه و کجا باید نگهشون دارم؟
5. آیا باید YubiKey بخرم؟ برای چه کسانی ضروریه؟
6. اگر گوشیم رو گم کنم و 2FA داشته باشم چطور وارد حسابم بشم؟`,
            en: `I want to set up 2FA correctly. Please:

1. Explain the difference between SMS-based 2FA, Authenticator Apps (like Google Authenticator, Authy), and Hardware Keys (like YubiKey)
2. Why is SMS insecure for 2FA? What is SIM Swapping attack?
3. Step by step, tell me how to enable 2FA with Google Authenticator or Authy for Gmail, Instagram, and bank account
4. What are Backup Codes and where should I keep them?
5. Should I buy a YubiKey? Who needs it?
6. If I lose my phone with 2FA, how do I access my accounts?`,
          },
          purpose: {
            fa: 'پیاده‌سازی لایه دوم امنیتی با درک کامل از انواع روش‌ها',
            en: 'Implementing second security layer with complete understanding of different methods',
          },
        },
        {
          id: 'dl-1-prompt-4',
          title: {
            fa: 'بررسی نشت رمزهای عبور',
            en: 'Checking Password Leaks',
          },
          prompt: {
            fa: `می‌خواهم بدونم آیا رمزهای من لو رفته‌اند. لطفاً:

1. سایت Have I Been Pwned چیه و چطور کار می‌کنه؟ آیا امن است که ایمیلم رو اونجا چک کنم؟
2. گام به گام نحوه بررسی نشت رمزهای خودم را بگو
3. اگر فهمیدم رمزم لو رفته چه اقدامات فوری باید انجام بدم؟
4. چطور می‌تونم از نشت‌های آینده مطلع بشم؟ (Alert ها)
5. تفاوت بین Data Breach و Password Leak چیه؟`,
            en: `I want to know if my passwords have been leaked. Please:

1. What is Have I Been Pwned and how does it work? Is it safe to check my email there?
2. Step by step, tell me how to check my password leaks
3. If I find out my password was leaked, what immediate actions should I take?
4. How can I be notified of future leaks? (Alerts)
5. What's the difference between Data Breach and Password Leak?`,
          },
          purpose: {
            fa: 'شناسایی و واکنش به نشت اطلاعات شخصی',
            en: 'Identifying and responding to personal data leaks',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای علمی احراز هویت چند عاملی (MFA)',
            en: 'Scientific Guide to Multi-Factor Authentication (MFA)',
          },
          url: 'https://www.cisa.gov/mfa',
          isInternal: false,
          description: {
            fa: 'مستندات رسمی آژانس امنیت سایبری آمریکا درباره MFA',
            en: 'Official documentation from US Cybersecurity Agency about MFA',
          },
        },
        {
          title: {
            fa: 'چگونه رمزهای عبور شکسته می‌شوند؟',
            en: 'How Are Passwords Cracked?',
          },
          url: 'https://arstechnica.com/information-technology/2013/05/how-crackers-make-minced-meat-out-of-your-passwords/',
          isInternal: false,
          description: {
            fa: 'مقاله تخصصی Ars Technica درباره تکنیک‌های شکستن رمز',
            en: 'Technical article from Ars Technica about password cracking techniques',
          },
        },
        {
          title: {
            fa: 'مقایسه مدیرهای رمز عبور توسط Wirecutter',
            en: 'Password Manager Comparison by Wirecutter',
          },
          url: 'https://www.nytimes.com/wirecutter/reviews/best-password-managers/',
          isInternal: false,
          description: {
            fa: 'بررسی مستقل و جامع بهترین مدیرهای رمز عبور',
            en: 'Independent and comprehensive review of best password managers',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'Click Here to Kill Everybody',
            en: 'Click Here to Kill Everybody',
          },
          author: 'Bruce Schneier',
          description: {
            fa: 'کتاب برجسته بروس اشنایر درباره امنیت در عصر اینترنت اشیا. فصل‌های مربوط به احراز هویت و رمزنگاری بسیار آموزنده است.',
            en: 'Bruce Schneier\'s prominent book about security in the IoT era. Chapters on authentication and cryptography are very educational.',
          },
        },
        {
          title: {
            fa: 'Practical Cryptography',
            en: 'Practical Cryptography',
          },
          author: 'Niels Ferguson & Bruce Schneier',
          description: {
            fa: 'برای کسانی که می‌خواهند بفهمند پشت صحنه رمزنگاری و هش کردن رمزها چه خبره',
            en: 'For those who want to understand what happens behind the scenes of encryption and password hashing',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'Password Cracking - Computerphile',
            en: 'Password Cracking - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=7U-RbOKanYs',
          platform: 'youtube',
          duration: '10:24',
          description: {
            fa: 'توضیح علمی و ساده از نحوه شکستن رمزهای عبور توسط دانشگاه ناتینگهام',
            en: 'Scientific and simple explanation of password cracking by University of Nottingham',
          },
        },
        {
          title: {
            fa: 'How to Choose a Password - Computerphile',
            en: 'How to Choose a Password - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=3NjQ9b3pgIg',
          platform: 'youtube',
          duration: '11:07',
          description: {
            fa: 'راهنمای علمی انتخاب رمز عبور قوی',
            en: 'Scientific guide to choosing strong passwords',
          },
        },
        {
          title: {
            fa: 'راهنمای کامل Bitwarden به فارسی',
            en: 'Complete Bitwarden Guide in Persian',
          },
          url: 'https://www.youtube.com/results?search_query=bitwarden+tutorial+persian',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'آموزش گام به گام نصب و استفاده از Bitwarden',
            en: 'Step-by-step tutorial for installing and using Bitwarden',
          },
        },
      ],
    },
    {
      id: 'dl-step-2',
      order: 2,
      title: {
        fa: 'شناسایی کلاهبرداری‌های آنلاین: فیشینگ و مهندسی اجتماعی',
        en: 'Identifying Online Scams: Phishing and Social Engineering',
      },
      description: {
        fa: 'یاد بگیرید چطور ایمیل‌ها، پیام‌ها و سایت‌های جعلی را تشخیص دهید و از ترفندهای روانشناسی کلاهبرداران آگاه شوید',
        en: 'Learn how to detect fake emails, messages, and websites, and become aware of scammers\' psychological tricks',
      },
      whyImportant: {
        fa: 'طبق گزارش FBI IC3، در سال 2023 بیش از 5.5 میلیارد دلار از طریق کلاهبرداری‌های آنلاین از مردم دزدیده شد. فیشینگ ساده‌ترین و مؤثرترین روش حمله است چون به جای شکستن سیستم‌های امنیتی، انسان را هدف می‌گیرد. شما ضعیف‌ترین حلقه زنجیره امنیت هستید.',
        en: 'According to FBI IC3 report, in 2023 over $5.5 billion was stolen from people through online scams. Phishing is the simplest and most effective attack method because instead of breaking security systems, it targets humans. You are the weakest link in the security chain.',
      },
      learningOutcomes: {
        fa: [
          'تشخیص ایمیل‌های فیشینگ با بررسی آدرس فرستنده، لینک‌ها و محتوا',
          'شناسایی سایت‌های جعلی با چک کردن گواهی SSL و آدرس دقیق',
          'درک تکنیک‌های روانشناسی: فوریت کاذب، ترس، طمع، اعتماد',
          'شناسایی حملات Spear Phishing (فیشینگ هدفمند)',
          'تشخیص پیام‌های جعلی در تلگرام، واتساپ و شبکه‌های اجتماعی',
          'واکنش صحیح: گزارش، عدم کلیک، تأیید از کانال‌های رسمی',
        ],
        en: [
          'Detecting phishing emails by checking sender address, links, and content',
          'Identifying fake websites by checking SSL certificate and exact address',
          'Understanding psychological techniques: false urgency, fear, greed, trust',
          'Identifying Spear Phishing attacks (targeted phishing)',
          'Detecting fake messages on Telegram, WhatsApp, and social networks',
          'Correct response: report, don\'t click, verify through official channels',
        ],
      },
      estimatedTime: '5-6 hours',
      prompts: [
        {
          id: 'dl-2-prompt-1',
          title: {
            fa: 'آناتومی یک ایمیل فیشینگ',
            en: 'Anatomy of a Phishing Email',
          },
          prompt: {
            fa: `یک ایمیل دریافت کردم که می‌گه: "حساب بانکی شما مسدود شده. برای فعال‌سازی مجدد روی لینک زیر کلیک کنید. این درخواست تا 24 ساعت اعتبار دارد." لطفاً:

1. دقیقاً توضیح بده چه نشانه‌هایی در این ایمیل باید بررسی کنم (آدرس فرستنده، لینک، زبان، فوریت)
2. نحوه بررسی لینک بدون کلیک روی اون رو بگو (hover کردن، استفاده از ابزارهای آنلاین مثل VirusTotal)
3. تفاوت بین phishing@bank.com و phishing@bank-security.com و phishing@bαnk.com (حمله Homograph) رو توضیح بده
4. اگر اشتباهی کلیک کردم چه اقدامات فوری باید انجام بدم؟
5. چطور این ایمیل رو به بانک و سازمان‌های امنیتی گزارش کنم؟
6. چند نمونه واقعی از ایمیل‌های فیشینگ موفق در ایران و جهان بهم بگو`,
            en: `I received an email saying: "Your bank account has been blocked. Click the link below to reactivate. This request is valid for 24 hours." Please:

1. Explain exactly what signs I should check in this email (sender address, link, language, urgency)
2. Tell me how to check the link without clicking on it (hovering, using online tools like VirusTotal)
3. Explain the difference between phishing@bank.com and phishing@bank-security.com and phishing@bαnk.com (Homograph attack)
4. If I accidentally clicked, what immediate actions should I take?
5. How do I report this email to the bank and security organizations?
6. Give me some real examples of successful phishing emails in Iran and worldwide`,
          },
          purpose: {
            fa: 'توانایی تشخیص و تحلیل ایمیل‌های مشکوک',
            en: 'Ability to detect and analyze suspicious emails',
          },
        },
        {
          id: 'dl-2-prompt-2',
          title: {
            fa: 'مهندسی اجتماعی: حملات روانشناسی',
            en: 'Social Engineering: Psychological Attacks',
          },
          prompt: {
            fa: `می‌خواهم بفهمم مهندسی اجتماعی چطور کار می‌کنه. لطفاً:

1. 6 اصل روانشناسی که مهاجمان استفاده می‌کنند رو توضیح بده: Authority (اقتدار)، Urgency (فوریت)، Scarcity (کمیابی)، Familiarity (آشنایی)، Trust (اعتماد)، Fear (ترس)
2. سناریوی کامل یک حمله Pretexting (جعل هویت) رو شرح بده - مثلاً کسی که خودش رو کارمند بانک معرفی می‌کنه
3. حمله Baiting چیه؟ (مثلاً فلش مموری رها شده در پارکینگ)
4. تفاوت بین Phishing، Spear Phishing، Whaling، و Vishing رو بگو
5. چند مورد واقعی از حملات مهندسی اجتماعی موفق بهم بگو (مثل حمله به Twitter در 2020)
6. چطور می‌تونم خودم و خانواده‌ام رو آموزش بدم که قربانی این حملات نشیم؟`,
            en: `I want to understand how social engineering works. Please:

1. Explain 6 psychological principles attackers use: Authority, Urgency, Scarcity, Familiarity, Trust, Fear
2. Describe complete scenario of a Pretexting attack - e.g., someone pretending to be a bank employee
3. What is Baiting attack? (e.g., USB drive left in parking lot)
4. Tell me the difference between Phishing, Spear Phishing, Whaling, and Vishing
5. Give me some real cases of successful social engineering attacks (like Twitter hack in 2020)
6. How can I train myself and my family not to fall victim to these attacks?`,
          },
          purpose: {
            fa: 'درک عمیق از تکنیک‌های دستکاری روانشناسی',
            en: 'Deep understanding of psychological manipulation techniques',
          },
        },
        {
          id: 'dl-2-prompt-3',
          title: {
            fa: 'تشخیص سایت‌های جعلی',
            en: 'Detecting Fake Websites',
          },
          prompt: {
            fa: `می‌خواهم یاد بگیرم سایت‌های جعلی رو تشخیص بدم. لطفاً:

1. نحوه بررسی گواهی SSL (قفل سبز) و اینکه چرا HTTPS به تنهایی کافی نیست رو توضیح بده
2. تفاوت بین google.com، goog1e.com، googlе.com (با حرف سیریلیک) رو بگو
3. چطور از ابزارهای مرورگر برای بررسی اطلاعات سایت استفاده کنم؟
4. نشانه‌های بصری یک سایت جعلی چیه؟ (طراحی ضعیف، غلط املایی، درخواست اطلاعات غیرعادی)
5. چطور می‌تونم بفهمم یک سایت خرید آنلاین معتبره یا کلاهبرداری؟
6. ابزارهای آنلاین برای بررسی اعتبار سایت‌ها رو معرفی کن (مثل Whois، Scamadviser)`,
            en: `I want to learn to detect fake websites. Please:

1. Explain how to check SSL certificate (green lock) and why HTTPS alone isn't enough
2. Tell me the difference between google.com, goog1e.com, googlе.com (with Cyrillic letter)
3. How do I use browser tools to check website information?
4. What are visual signs of a fake website? (poor design, typos, unusual information requests)
5. How can I tell if an online shopping site is legitimate or a scam?
6. Introduce online tools for checking website credibility (like Whois, Scamadviser)`,
          },
          purpose: {
            fa: 'مهارت تشخیص سایت‌های مخرب قبل از ورود اطلاعات',
            en: 'Skill to detect malicious websites before entering information',
          },
        },
        {
          id: 'dl-2-prompt-4',
          title: {
            fa: 'کلاهبرداری‌های رایج در ایران',
            en: 'Common Scams in Iran',
          },
          prompt: {
            fa: `می‌خواهم از کلاهبرداری‌های رایج در ایران آگاه بشم. لطفاً:

1. کلاهبرداری‌های رایج در تلگرام رو توضیح بده (ربات‌های جعلی، کانال‌های سرمایه‌گذاری، فروش ارز دیجیتال)
2. کلاهبرداری با پیامک جعلی بانکی چطوره؟ چطور تشخیص بدم؟
3. کلاهبرداری‌های خرید و فروش در دیوار و شیپور چیه؟
4. حقه‌های فروش دلار و ارز دیجیتال در فضای مجازی رو بگو
5. کلاهبرداری با عنوان "برنده شدید" یا "جایزه" چطور کار می‌کنه؟
6. چطور می‌تونم این کلاهبرداری ‌ها رو به پلیس فتا گزارش بدم؟`,
            en: `I want to be aware of common scams in Iran. Please:

1. Explain common Telegram scams (fake bots, investment channels, cryptocurrency sales)
2. How does fake bank SMS scam work? How do I detect it?
3. What are buying/selling scams on Divar and Sheypoor?
4. Tell me about currency and cryptocurrency selling tricks in cyberspace
5. How does "you won" or "prize" scam work?
6. How can I report these scams to Cyber Police (FATA)?`,
          },
          purpose: {
            fa: 'آگاهی از کلاهبرداری‌های محلی و فرهنگی',
            en: 'Awareness of local and cultural scams',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای جامع فیشینگ - CISA',
            en: 'Comprehensive Phishing Guide - CISA',
          },
          url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks',
          isInternal: false,
          description: {
            fa: 'راهنمای رسمی آژانس امنیت سایبری آمریکا',
            en: 'Official guide from US Cybersecurity Agency',
          },
        },
        {
          title: {
            fa: 'Social Engineering: The Art of Human Hacking',
            en: 'Social Engineering: The Art of Human Hacking',
          },
          url: 'https://www.social-engineer.org/',
          isInternal: false,
          description: {
            fa: 'وبسایت تخصصی کریستوفر هدناگی درباره مهندسی اجتماعی',
            en: 'Christopher Hadnagy\'s specialized website about social engineering',
          },
        },
        {
          title: {
            fa: 'گزارش سالانه کلاهبرداری‌های اینترنتی FBI',
            en: 'FBI Annual Internet Crime Report',
          },
          url: 'https://www.ic3.gov/Media/PDF/AnnualReport/2023_IC3Report.pdf',
          isInternal: false,
          description: {
            fa: 'آمار و ارقام واقعی کلاهبرداری‌های آنلاین',
            en: 'Real statistics and figures of online scams',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'Social Engineering: The Science of Human Hacking',
            en: 'Social Engineering: The Science of Human Hacking',
          },
          author: 'Christopher Hadnagy',
          description: {
            fa: 'کتاب مرجع در زمینه مهندسی اجتماعی. نویسنده یکی از بزرگترین متخصصان این حوزه است و تکنیک‌های واقعی مهاجمان را توضیح می‌دهد.',
            en: 'Reference book on social engineering. The author is one of the greatest experts in this field and explains real attacker techniques.',
          },
        },
        {
          title: {
            fa: 'The Art of Deception',
            en: 'The Art of Deception',
          },
          author: 'Kevin Mitnick',
          description: {
            fa: 'کوین میتنیک، مشهورترین هکر جهان، داستان‌های واقعی از نفوذهای خود را تعریف می‌کند که همه با مهندسی اجتماعی انجام شده‌اند.',
            en: 'Kevin Mitnick, the world\'s most famous hacker, tells real stories of his intrusions, all done through social engineering.',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'The Perfect Phishing Email - James Veitch',
            en: 'The Perfect Phishing Email - James Veitch',
          },
          url: 'https://www.youtube.com/watch?v=_QdPW8JrYzQ',
          platform: 'youtube',
          duration: '9:49',
          description: {
            fa: 'ویدیوی طنز و آموزنده درباره ایمیل‌های فیشینگ',
            en: 'Humorous and educational video about phishing emails',
          },
        },
        {
          title: {
            fa: 'Social Engineering - Computerphile',
            en: 'Social Engineering - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=lc7scxvKQOo',
          platform: 'youtube',
          duration: '12:35',
          description: {
            fa: 'توضیح علمی تکنیک‌های مهندسی اجتماعی',
            en: 'Scientific explanation of social engineering techniques',
          },
        },
        {
          title: {
            fa: 'کلاهبرداری‌های تلگرامی - آموزش فارسی',
            en: 'Telegram Scams - Persian Tutorial',
          },
          url: 'https://www.youtube.com/results?search_query=کلاهبرداری+تلگرام',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'نمونه‌های واقعی کلاهبرداری در تلگرام',
            en: 'Real examples of Telegram scams',
          },
        },
      ],
    },
    {
      id: 'dl-step-3',
      order: 3,
      title: {
        fa: 'امنیت شبکه: وای‌فای عمومی و VPN',
        en: 'Network Security: Public WiFi and VPN',
      },
      description: {
        fa: 'یاد بگیرید چطور در شبکه‌های عمومی امن بمانید، از VPN استفاده کنید و از حملات شبکه‌ای محافظت کنید',
        en: 'Learn how to stay safe on public networks, use VPN, and protect against network attacks',
      },
      whyImportant: {
        fa: 'وقتی به وای‌فای کافی‌شاپ، فرودگاه یا هتل وصل می‌شوید، ترافیک شما در معرض دید صاحب شبکه و سایر کاربران است. حملات Man-in-the-Middle (MITM) در شبکه‌های عمومی بسیار رایج است و مهاجم می‌تواند رمزهای عبور، پیام‌ها و اطلاعات بانکی شما را بدزدد. در ایران، با توجه به فیلترینگ، استفاده صحیح از VPN هم برای دسترسی و هم برای امنیت ضروری است.',
        en: 'When you connect to WiFi at a cafe, airport, or hotel, your traffic is visible to the network owner and other users. Man-in-the-Middle (MITM) attacks are very common on public networks, and attackers can steal your passwords, messages, and banking information. In Iran, due to filtering, proper use of VPN is essential for both access and security.',
      },
      learningOutcomes: {
        fa: [
          'شناسایی شبکه‌های وای‌فای ناامن و خطرناک',
          'درک حملات Man-in-the-Middle، ARP Spoofing، و Evil Twin',
          'انتخاب و راه‌اندازی VPN مناسب (معیارهای امنیتی، سرعت، حریم خصوصی)',
          'تفاوت بین VPN، Proxy، Tor و کاربرد هر کدام',
          'تنظیمات امنیتی مودم و روتر خانگی',
          'استفاده از DNS امن (DNS over HTTPS)',
          'محافظت از اطلاعات در شبکه‌های عمومی',
        ],
        en: [
          'Identifying insecure and dangerous WiFi networks',
          'Understanding Man-in-the-Middle, ARP Spoofing, and Evil Twin attacks',
          'Choosing and setting up appropriate VPN (security criteria, speed, privacy)',
          'Difference between VPN, Proxy, Tor and use of each',
          'Home modem and router security settings',
          'Using secure DNS (DNS over HTTPS)',
          'Protecting information on public networks',
        ],
      },
      estimatedTime: '4-5 hours',
      prompts: [
        {
          id: 'dl-3-prompt-1',
          title: {
            fa: 'خطرات وای‌فای عمومی',
            en: 'Public WiFi Dangers',
          },
          prompt: {
            fa: `همیشه در کافی‌شاپ‌ها به وای‌فای رایگان وصل می‌شم و کارهای بانکی انجام می‌دم. لطفاً:

1. دقیقاً توضیح بده چه اتفاقی می‌افته وقتی به وای‌فای عمومی وصل می‌شم؟ چه کسی می‌تونه ترافیک من رو ببینه؟
2. حمله Man-in-the-Middle چطور کار می‌کنه؟ با یک مثال ساده توضیح بده
3. حمله Evil Twin چیه؟ (شبکه جعلی با نام مشابه)
4. چطور می‌تونم تشخیص بدم یک وای‌فای عمومی امنه یا نه؟
5. اگر مجبورم از وای‌فای عمومی استفاده کنم، چه اقداماتی باید انجام بدم؟
6. آیا استفاده از HTTPS کافیه؟ چرا یا چرا نه؟
7. تفاوت بین WPA2، WPA3 و شبکه‌های باز (Open) چیه؟`,
            en: `I always connect to free WiFi in cafes and do banking. Please:

1. Explain exactly what happens when I connect to public WiFi? Who can see my traffic?
2. How does Man-in-the-Middle attack work? Explain with a simple example
3. What is Evil Twin attack? (fake network with similar name)
4. How can I tell if a public WiFi is safe or not?
5. If I must use public WiFi, what actions should I take?
6. Is using HTTPS enough? Why or why not?
7. What's the difference between WPA2, WPA3, and Open networks?`,
          },
          purpose: {
            fa: 'درک خطرات واقعی شبکه‌های عمومی',
            en: 'Understanding real dangers of public networks',
          },
        },
        {
          id: 'dl-3-prompt-2',
          title: {
            fa: 'راهنمای جامع انتخاب VPN',
            en: 'Comprehensive VPN Selection Guide',
          },
          prompt: {
            fa: `می‌خواهم یک VPN خوب انتخاب کنم. لطفاً:

1. VPN دقیقاً چطور کار می‌کنه؟ چه چیزی رو رمزنگاری می‌کنه و چه چیزی رو نه؟
2. تفاوت بین VPN رایگان و پولی چیه؟ چرا VPN رایگان خطرناکه؟
3. معیارهای انتخاب VPN امن رو بگو: No-logs policy، Kill Switch، DNS Leak Protection، پروتکل‌های مختلف (OpenVPN، WireGuard، IKEv2)
4. مقایسه کامل بین ProtonVPN، Mullvad، IVPN، و NordVPN بده
5. آیا VPN می‌تونه ترافیک من رو ببینه؟ چطور بهش اعتماد کنم?
6. تفاوت بین VPN، Proxy (مثل Shadowsocks)، و Tor چیه؟ کدوم برای چی بهتره؟
7. در ایران کدوم VPN بهتر کار می‌کنه و چطور باید تنظیمش کنم؟`,
            en: `I want to choose a good VPN. Please:

1. How exactly does VPN work? What does it encrypt and what doesn't it?
2. What's the difference between free and paid VPN? Why is free VPN dangerous?
3. Tell me criteria for choosing secure VPN: No-logs policy, Kill Switch, DNS Leak Protection, different protocols (OpenVPN, WireGuard, IKEv2)
4. Give complete comparison between ProtonVPN, Mullvad, IVPN, and NordVPN
5. Can VPN see my traffic? How do I trust it?
6. What's the difference between VPN, Proxy (like Shadowsocks), and Tor? Which is better for what?
7. In Iran, which VPN works better and how should I configure it?`,
          },
          purpose: {
            fa: 'انتخاب آگاهانه و راه‌اندازی صحیح VPN',
            en: 'Informed choice and correct VPN setup',
          },
        },
        {
          id: 'dl-3-prompt-3',
          title: {
            fa: 'امنیت مودم و شبکه خانگی',
            en: 'Modem and Home Network Security',
          },
          prompt: {
            fa: `می‌خواهم مودم و شبکه خانگی‌ام رو امن کنم. لطفاً:

1. اولین کاری که باید بعد از نصب مودم انجام بدم چیه؟ (تغییر رمز پیش‌فرض ادمین)
2. چطور یک رمز وای‌فای قوی بسازم؟ WPA2 یا WPA3؟
3. آیا باید WPS رو غیرفعال کنم؟ چرا؟
4. چطور ببینم چه دستگاه‌هایی به شبکه‌ام وصل هستند؟
5. Guest Network چیه و چرا باید ازش استفاده کنم؟
6. فیلتر MAC Address چیه و آیا واقعاً امنیت اضافه می‌کنه؟
7. چطور فایروال مودم رو تنظیم کنم؟
8. آیا باید نام شبکه (SSID) رو مخفی کنم؟`,
            en: `I want to secure my modem and home network. Please:

1. What's the first thing I should do after modem installation? (change default admin password)
2. How do I create a strong WiFi password? WPA2 or WPA3?
3. Should I disable WPS? Why?
4. How do I see what devices are connected to my network?
5. What is Guest Network and why should I use it?
6. What is MAC Address filtering and does it really add security?
7. How do I configure modem firewall?
8. Should I hide network name (SSID)?`,
          },
          purpose: {
            fa: 'ایمن‌سازی شبکه خانگی در برابر نفوذ',
            en: 'Securing home network against intrusion',
          },
        },
        {
          id: 'dl-3-prompt-4',
          title: {
            fa: 'DNS امن و حریم خصوصی',
            en: 'Secure DNS and Privacy',
          },
          prompt: {
            fa: `شنیدم DNS مهمه ولی نمی‌دونم چیه. لطفاً:

1. DNS چیه و چطور کار می‌کنه؟ (با مثال ساده)
2. چرا DNS پیش‌فرض اینترنت من ناامنه؟
3. تفاوت بین DNS معمولی، DNS over HTTPS (DoH)، و DNS over TLS (DoT) چیه؟
4. چطور DNS رو تغییر بدم؟ (در ویندوز، مک، اندروید، iOS)
5. مقایسه بین Cloudflare (1.1.1.1)، Google DNS (8.8.8.8)، Quad9، و NextDNS بده
6. آیا تغییر DNS می‌تونه سرعت اینترنت رو بهبود بده؟
7. DNS Leak چیه و چطور بررسی کنم که VPN من DNS Leak نداره؟`,
            en: `I heard DNS is important but I don't know what it is. Please:

1. What is DNS and how does it work? (with simple example)
2. Why is my default internet DNS insecure?
3. What's the difference between regular DNS, DNS over HTTPS (DoH), and DNS over TLS (DoT)?
4. How do I change DNS? (in Windows, Mac, Android, iOS)
5. Give comparison between Cloudflare (1.1.1.1), Google DNS (8.8.8.8), Quad9, and NextDNS
6. Can changing DNS improve internet speed?
7. What is DNS Leak and how do I check if my VPN has DNS Leak?`,
          },
          purpose: {
            fa: 'بهبود حریم خصوصی و امنیت در سطح DNS',
            en: 'Improving privacy and security at DNS level',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای امنیت شبکه‌های بی‌سیم - NIST',
            en: 'Wireless Network Security Guide - NIST',
          },
          url: 'https://csrc.nist.gov/publications/detail/sp/800-153/final',
          isInternal: false,
          description: {
            fa: 'استاندارد رسمی موسسه ملی استانداردها و فناوری آمریکا',
            en: 'Official standard from National Institute of Standards and Technology',
          },
        },
        {
          title: {
            fa: 'مقایسه جامع سرویس‌های VPN - Privacy Guides',
            en: 'Comprehensive VPN Services Comparison - Privacy Guides',
          },
          url: 'https://www.privacyguides.org/en/vpn/',
          isInternal: false,
          description: {
            fa: 'راهنمای مستقل و غیرتجاری انتخاب VPN',
            en: 'Independent and non-commercial VPN selection guide',
          },
        },
        {
          title: {
            fa: 'DNS over HTTPS - Cloudflare',
            en: 'DNS over HTTPS - Cloudflare',
          },
          url: 'https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/',
          isInternal: false,
          description: {
            fa: 'مستندات فنی DNS رمزنگاری شده',
            en: 'Technical documentation of encrypted DNS',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'Network Security Essentials',
            en: 'Network Security Essentials',
          },
          author: 'William Stallings',
          description: {
            fa: 'کتاب درسی دانشگاهی درباره امنیت شبکه. فصل‌های مربوط به رمزنگاری و VPN بسیار مفید است.',
            en: 'University textbook on network security. Chapters on encryption and VPN are very useful.',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'How Does VPN Work? - Computerphile',
            en: 'How Does VPN Work? - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=oJRvPHPBmhw',
          platform: 'youtube',
          duration: '8:14',
          description: {
            fa: 'توضیح ساده و علمی نحوه کار VPN',
            en: 'Simple and scientific explanation of how VPN works',
          },
        },
        {
          title: {
            fa: 'Man in the Middle Attacks - Computerphile',
            en: 'Man in the Middle Attacks - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=DgqID9k83oQ',
          platform: 'youtube',
          duration: '9:42',
          description: {
            fa: 'نحوه انجام حملات MITM',
            en: 'How MITM attacks are performed',
          },
        },
        {
          title: {
            fa: 'آموزش تنظیمات امنیتی مودم - فارسی',
            en: 'Modem Security Settings Tutorial - Persian',
          },
          url: 'https://www.youtube.com/results?search_query=تنظیمات+امنیتی+مودم',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'راهنمای عملی تنظیمات مودم',
            en: 'Practical modem settings guide',
          },
        },
      ],
    },
    {
      id: 'dl-step-4',
      order: 4,
      title: {
        fa: 'امنیت موبایل: محافظت از گوشی هوشمند',
        en: 'Mobile Security: Protecting Your Smartphone',
      },
      description: {
        fa: 'گوشی شما حاوی بیشترین اطلاعات شخصی‌تان است. یاد بگیرید چطور آن را ایمن کنید، مجوزهای اپلیکیشن‌ها را مدیریت کنید و از بدافزارهای موبایلی محافظت کنید',
        en: 'Your phone contains most of your personal information. Learn how to secure it, manage app permissions, and protect against mobile malware',
      },
      whyImportant: {
        fa: 'گوشی هوشمند شما دسترسی به تمام زندگی دیجیتال‌تان دارد: ایمیل، بانک، شبکه‌های اجتماعی، عکس‌ها، مکان، تماس‌ها و پیام‌ها. طبق گزارش Kaspersky، در سال 2023 بیش از 5.6 میلیون حمله بدافزاری به گوشی‌های موبایل ثبت شد. بسیاری از اپلیکیشن‌ها بدون دلیل مجوزهای خطرناکی می‌خواهند و اطلاعات شما را می‌فروشند.',
        en: 'Your smartphone has access to all your digital life: email, banking, social networks, photos, location, calls, and messages. According to Kaspersky report, in 2023 over 5.6 million mobile malware attacks were recorded. Many apps request dangerous permissions without reason and sell your data.',
      },
      learningOutcomes: {
        fa: [
          'تنظیمات امنیتی پیشرفته اندروید و iOS',
          'مدیریت هوشمند مجوزهای اپلیکیشن‌ها',
          'شناسایی اپلیکیشن‌های مخرب و جاسوس‌افزار',
          'رمزگذاری گوشی و استفاده از قفل بیومتریک',
          'پشتیبان‌گیری امن و رمزنگاری شده',
          'محافظت در برابر سرقت و گم شدن گوشی',
          'استفاده امن از اپ‌استورهای جایگزین',
        ],
        en: [
          'Advanced Android and iOS security settings',
          'Smart management of app permissions',
          'Identifying malicious apps and spyware',
          'Phone encryption and biometric lock usage',
          'Secure and encrypted backup',
          'Protection against theft and phone loss',
          'Safe use of alternative app stores',
        ],
      },
      estimatedTime: '4-5 hours',
      prompts: [
        {
          id: 'dl-4-prompt-1',
          title: {
            fa: 'چک‌لیست امنیت گوشی',
            en: 'Phone Security Checklist',
          },
          prompt: {
            fa: `می‌خواهم گوشیم رو کاملاً ایمن کنم. لطفاً یک چک‌لیست کامل بهم بده:

1. تنظیمات امنیتی ضروری در اندروید (قفل صفحه، رمزنگاری، Google Play Protect، Find My Device)
2. تنظیمات امنیتی ضروری در iOS (Face ID/Touch ID، Find My iPhone، iCloud Keychain)
3. چطور بفهمم گوشیم رمزنگاری شده یا نه؟
4. تفاوت بین PIN، Pattern، Password، و Biometric چیه؟ کدوم امن‌تره؟
5. چطور اپلیکیشن‌های مشکوک رو شناسایی و حذف کنم؟
6. آیا باید آنتی‌ویروس روی گوشی نصب کنم؟ کدوم یکی؟
7. چطور از نصب اپلیکیشن‌های ناخواسته جلوگیری کنم؟ (Parental Controls)
8. تنظیمات Developer Options رو باید غیرفعال کنم؟`,
            en: `I want to fully secure my phone. Please give me a complete checklist:

1. Essential security settings in Android (screen lock, encryption, Google Play Protect, Find My Device)
2. Essential security settings in iOS (Face ID/Touch ID, Find My iPhone, iCloud Keychain)
3. How do I know if my phone is encrypted?
4. What's the difference between PIN, Pattern, Password, and Biometric? Which is more secure?
5. How do I identify and remove suspicious apps?
6. Should I install antivirus on my phone? Which one?
7. How do I prevent unwanted app installations? (Parental Controls)
8. Should I disable Developer Options?`,
          },
          purpose: {
            fa: 'پیاده‌سازی تنظیمات امنیتی پایه',
            en: 'Implementing basic security settings',
          },
        },
        {
          id: 'dl-4-prompt-2',
          title: {
            fa: 'مدیریت مجوزهای اپلیکیشن‌ها',
            en: 'Managing App Permissions',
          },
          prompt: {
            fa: `نمی‌دونم کدوم مجوزها رو باید به اپلیکیشن‌ها بدم. لطفاً:

1. انواع مجوزهای خطرناک رو توضیح بده: Location، Camera، Microphone، Contacts، SMS، Storage، Phone
2. چرا یک اپلیکیشن چراغ‌قوه به مخاطبین من نیاز داره؟ (نشانه‌های اپلیکیشن مخرب)
3. چطور مجوزهای اپلیکیشن‌های نصب شده رو بررسی و تغییر بدم؟
4. تفاوت بین مجوزهای "همیشه"، "فقط هنگام استفاده"، و "این بار" چیه؟
5. چطور بفهمم یک اپلیکیشن در پس‌زمینه چه کاری انجام می‌ده؟
6. آیا باید مجوز "نصب از منابع ناشناخته" رو فعال کنم؟
7. چطور اپلیکیشن‌هایی که بیش از حد مجوز می‌خواهند رو شناسایی کنم؟`,
            en: `I don't know which permissions to give to apps. Please:

1. Explain types of dangerous permissions: Location, Camera, Microphone, Contacts, SMS, Storage, Phone
2. Why does a flashlight app need my contacts? (signs of malicious app)
3. How do I review and change permissions of installed apps?
4. What's the difference between "always", "only while using", and "this time" permissions?
5. How do I know what an app is doing in the background?
6. Should I enable "install from unknown sources" permission?
7. How do I identify apps that request excessive permissions?`,
          },
          purpose: {
            fa: 'کنترل دسترسی اپلیکیشن‌ها به اطلاعات حساس',
            en: 'Controlling app access to sensitive information',
          },
        },
        {
          id: 'dl-4-prompt-3',
          title: {
            fa: 'شناسایی بدافزار و جاسوس‌افزار موبایل',
            en: 'Identifying Mobile Malware and Spyware',
          },
          prompt: {
            fa: `فکر می‌کنم گوشیم آلوده شده. لطفاً:

1. نشانه‌های آلودگی گوشی به بدافزار چیه؟ (مصرف باتری، داغ شدن، ترافیک مشکوک، تبلیغات ناخواسته)
2. انواع بدافزار موبایل رو توضیح بده: Trojan، Spyware، Adware، Ransomware، Banking Malware
3. چطور بررسی کنم که کسی گوشیم رو جاسوسی نمی‌کنه؟
4. اپلیکیشن‌های جاسوسی (Stalkerware) چطور کار می‌کنن و چطور پیداشون کنم؟
5. چطور گوشی رو اسکن کنم؟ کدوم ابزارها معتبرند؟ (Malwarebytes، Bitdefender، Kaspersky)
6. اگر گوشیم آلوده شد، چه کارهایی باید انجام بدم؟ (Safe Mode، Factory Reset)
7. چطور از نصب مجدد بدافزار جلوگیری کنم؟
8. آیا Root کردن یا Jailbreak کردن گوشی خطرناکه؟`,
            en: `I think my phone is infected. Please:

1. What are signs of phone malware infection? (battery drain, heating, suspicious traffic, unwanted ads)
2. Explain types of mobile malware: Trojan, Spyware, Adware, Ransomware, Banking Malware
3. How do I check if someone is spying on my phone?
4. How do spyware apps (Stalkerware) work and how do I find them?
5. How do I scan my phone? Which tools are reliable? (Malwarebytes, Bitdefender, Kaspersky)
6. If my phone is infected, what should I do? (Safe Mode, Factory Reset)
7. How do I prevent malware reinstallation?
8. Is rooting or jailbreaking the phone dangerous?`,
          },
          purpose: {
            fa: 'تشخیص و پاکسازی تهدیدات موبایلی',
            en: 'Detecting and removing mobile threats',
          },
        },
        {
          id: 'dl-4-prompt-4',
          title: {
            fa: 'پشتیبان‌گیری امن و بازیابی',
            en: 'Secure Backup and Recovery',
          },
          prompt: {
            fa: `می‌خواهم از اطلاعات گوشیم پشتیبان بگیرم ولی نگران امنیتشم. لطفاً:

1. چه چیزهایی رو باید حتماً پشتیبان بگیرم؟ (عکس‌ها، مخاطبین، پیام‌ها، تنظیمات)
2. تفاوت بین Google Backup، iCloud Backup، و پشتیبان محلی چیه؟
3. آیا پشتیبان‌های ابری امن هستند؟ رمزنگاری می‌شن؟
4. چطور یک پشتیبان رمزنگاری شده محلی بگیرم؟
5. چطور پشتیبان‌گیری خودکار تنظیم کنم؟
6. اگر گوشیم رو گم کردم یا دزدیده شد، چطور اطلاعاتم رو پاک کنم از راه دور؟
7. چطور از پشتیبان بازیابی کنم بدون اینکه بدافزار هم برگرده؟
8. آیا باید از اپلیکیشن‌های شخص ثالث مثل Titanium Backup استفاده کنم؟`,
            en: `I want to backup my phone data but I'm worried about security. Please:

1. What should I definitely backup? (photos, contacts, messages, settings)
2. What's the difference between Google Backup, iCloud Backup, and local backup?
3. Are cloud backups secure? Are they encrypted?
4. How do I take an encrypted local backup?
5. How do I set up automatic backup?
6. If I lose my phone or it's stolen, how do I remotely wipe my data?
7. How do I restore from backup without bringing back malware?
8. Should I use third-party apps like Titanium Backup?`,
          },
          purpose: {
            fa: 'حفاظت از داده‌ها در برابر از دست رفتن',
            en: 'Protecting data against loss',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'گزارش تهدیدات موبایل - Kaspersky',
            en: 'Mobile Threats Report - Kaspersky',
          },
          url: 'https://securelist.com/mobile-malware-evolution-2023/111860/',
          isInternal: false,
          description: {
            fa: 'آمار و تحلیل بدافزارهای موبایل در سال 2023',
            en: 'Statistics and analysis of mobile malware in 2023',
          },
        },
        {
          title: {
            fa: 'راهنمای امنیت موبایل - NIST',
            en: 'Mobile Security Guide - NIST',
          },
          url: 'https://csrc.nist.gov/publications/detail/sp/1800-4/final',
          isInternal: false,
          description: {
            fa: 'استاندارد امنیت دستگاه‌های موبایل',
            en: 'Mobile device security standard',
          },
        },
        {
          title: {
            fa: 'Android Security & Privacy Guide',
            en: 'Android Security & Privacy Guide',
          },
          url: 'https://www.privacyguides.org/en/android/',
          isInternal: false,
          description: {
            fa: 'راهنمای جامع امنیت و حریم خصوصی اندروید',
            en: 'Comprehensive Android security and privacy guide',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'Android Security Internals',
            en: 'Android Security Internals',
          },
          author: 'Nikolay Elenkov',
          description: {
            fa: 'کتاب تخصصی درباره معماری امنیتی اندروید. برای کسانی که می‌خواهند عمیق‌تر بفهمند.',
            en: 'Specialized book about Android security architecture. For those who want deeper understanding.',
          },
        },
        {
          title: {
            fa: 'iOS Application Security',
            en: 'iOS Application Security',
          },
          author: 'David Thiel',
          description: {
            fa: 'راهنمای امنیت اپلیکیشن‌های iOS و نحوه محافظت از داده‌ها',
            en: 'iOS application security guide and data protection methods',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'Mobile Security Explained - Computerphile',
            en: 'Mobile Security Explained - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=BLGFriOKz6U',
          platform: 'youtube',
          duration: '11:23',
          description: {
            fa: 'توضیح علمی امنیت موبایل',
            en: 'Scientific explanation of mobile security',
          },
        },
        {
          title: {
            fa: 'How to Secure Your Android Phone',
            en: 'How to Secure Your Android Phone',
          },
          url: 'https://www.youtube.com/results?search_query=secure+android+phone+2024',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'راهنمای عملی امنیت اندروید',
            en: 'Practical Android security guide',
          },
        },
        {
          title: {
            fa: 'iPhone Security and Privacy Settings',
            en: 'iPhone Security and Privacy Settings',
          },
          url: 'https://www.youtube.com/results?search_query=iphone+security+settings+2024',
          platform: 'youtube',
          duration: '12-18 min',
          description: {
            fa: 'تنظیمات امنیتی iOS',
            en: 'iOS security settings',
          },
        },
      ],
    },
    {
      id: 'dl-step-5',
      order: 5,
      title: {
        fa: 'حریم خصوصی آنلاین و ردپای دیجیتال',
        en: 'Online Privacy and Digital Footprint',
      },
      description: {
        fa: 'یاد بگیرید چطور ردپای دیجیتال خود را کنترل کنید، از ردیابی آنلاین جلوگیری کنید و حریم خصوصی‌تان را در شبکه‌های اجتماعی حفظ کنید',
        en: 'Learn how to control your digital footprint, prevent online tracking, and maintain your privacy on social networks',
      },
      whyImportant: {
        fa: 'هر کلیک، هر جستجو، هر پست در شبکه‌های اجتماعی بخشی از ردپای دیجیتال شماست که برای همیشه باقی می‌ماند. شرکت‌های تبلیغاتی، کارگزاران داده (Data Brokers)، و حتی دولت‌ها این اطلاعات را جمع‌آوری، تحلیل و می‌فروشند. طبق گزارش Privacy International، یک کاربر معمولی توسط بیش از 1000 شرکت در اینترنت ردیابی می‌شود. این اطلاعات می‌تواند برای تبلیغات هدفمند، تبعیض قیمتی، یا حتی سوءاستفاده‌های امنیتی استفاده شود.',
        en: 'Every click, every search, every social media post is part of your digital footprint that remains forever. Advertising companies, data brokers, and even governments collect, analyze, and sell this information. According to Privacy International report, an average user is tracked by over 1000 companies on the internet. This data can be used for targeted advertising, price discrimination, or even security abuses.',
      },
      learningOutcomes: {
        fa: [
          'درک مفهوم ردپای دیجیتال و انواع آن (فعال و غیرفعال)',
          'شناسایی روش‌های ردیابی آنلاین (Cookies، Fingerprinting، Tracking Pixels)',
          'استفاده از ابزارهای ضد ردیابی (Privacy Badger، uBlock Origin)',
          'تنظیمات حریم خصوصی در شبکه‌های اجتماعی (فیسبوک، اینستاگرام، توییتر، تلگرام)',
          'مدیریت اطلاعات شخصی در گوگل و حذف تاریخچه',
          'استفاده از موتورهای جستجوی محافظ حریم خصوصی (DuckDuckGo، Startpage)',
          'حذف اطلاعات شخصی از سایت‌های Data Broker',
          'ایجاد هویت‌های جداگانه برای کارهای مختلف آنلاین',
        ],
        en: [
          'Understanding digital footprint concept and its types (active and passive)',
          'Identifying online tracking methods (Cookies, Fingerprinting, Tracking Pixels)',
          'Using anti-tracking tools (Privacy Badger, uBlock Origin)',
          'Privacy settings in social networks (Facebook, Instagram, Twitter, Telegram)',
          'Managing personal information in Google and deleting history',
          'Using privacy-respecting search engines (DuckDuckGo, Startpage)',
          'Removing personal information from Data Broker sites',
          'Creating separate identities for different online activities',
        ],
      },
      estimatedTime: '5-6 hours',
      prompts: [
        {
          id: 'dl-5-prompt-1',
          title: {
            fa: 'ردپای دیجیتال من چیست؟',
            en: 'What is My Digital Footprint?',
          },
          prompt: {
            fa: `می‌خواهم بدونم چه اطلاعاتی از من در اینترنت موجوده. لطفاً:

1. ردپای دیجیتال چیه؟ تفاوت بین ردپای فعال (Active) و غیرفعال (Passive) رو توضیح بده
2. چطور ردپای دیجیتال خودم رو پیدا کنم؟ (گوگل کردن نام خودم، بررسی نتایج)
3. چه اطلاعاتی از من در دسترس عموم هست؟ (شبکه‌های اجتماعی، سایت‌های عمومی، دیتابیس‌های نشت شده)
4. چطور بفهمم چه شرکت‌هایی اطلاعات من رو دارند؟
5. Data Broker چیه و چطور اطلاعات من رو می‌فروشه؟
6. چطور اطلاعات قدیمی و ناخواسته‌ام رو از اینترنت حذف کنم؟
7. حق فراموشی (Right to be Forgotten) چیه و در ایران اعمال می‌شه؟
8. چطور از ایجاد ردپای بیشتر جلوگیری کنم؟`,
            en: `I want to know what information about me exists on the internet. Please:

1. What is digital footprint? Explain difference between Active and Passive footprint
2. How do I find my own digital footprint? (googling my name, checking results)
3. What information about me is publicly available? (social networks, public sites, leaked databases)
4. How do I know which companies have my data?
5. What is Data Broker and how does it sell my information?
6. How do I remove old and unwanted information about me from the internet?
7. What is Right to be Forgotten and does it apply in Iran?
8. How do I prevent creating more footprint?`,
          },
          purpose: {
            fa: 'آگاهی از حضور دیجیتال خود',
            en: 'Awareness of your digital presence',
          },
        },
        {
          id: 'dl-5-prompt-2',
          title: {
            fa: 'جلوگیری از ردیابی آنلاین',
            en: 'Preventing Online Tracking',
          },
          prompt: {
            fa: `احساس می‌کنم همه‌جا دنبالم می‌کنن! لطفاً:

1. انواع ردیابی آنلاین رو توضیح بده:
   - Cookies (First-party، Third-party)
   - Browser Fingerprinting
   - Tracking Pixels
   - Supercookies و ETag Tracking
2. چطور بفهمم یک سایت من رو ردیابی می‌کنه؟
3. افزونه‌های ضد ردیابی رو معرفی کن: Privacy Badger، uBlock Origin، Ghostery، Decentraleyes
4. تفاوت بین Ad Blocker و Privacy Tool چیه؟
5. چطور Cookie ها رو مدیریت کنم؟ آیا باید همه رو حذف کنم؟
6. حالت Incognito/Private واقعاً خصوصیه؟ چه چیزی رو مخفی می‌کنه و چه چیزی رو نه؟
7. چطور Browser Fingerprinting رو خنثی کنم؟
8. آیا باید از مرورگرهای محافظ حریم خصوصی مثل Brave یا Firefox استفاده کنم؟`,
            en: `I feel like I'm being followed everywhere! Please:

1. Explain types of online tracking:
   - Cookies (First-party, Third-party)
   - Browser Fingerprinting
   - Tracking Pixels
   - Supercookies and ETag Tracking
2. How do I know if a site is tracking me?
3. Introduce anti-tracking extensions: Privacy Badger, uBlock Origin, Ghostery, Decentraleyes
4. What's the difference between Ad Blocker and Privacy Tool?
5. How do I manage Cookies? Should I delete all of them?
6. Is Incognito/Private mode really private? What does it hide and what doesn't it?
7. How do I neutralize Browser Fingerprinting?
8. Should I use privacy-respecting browsers like Brave or Firefox?`,
          },
          purpose: {
            fa: 'کاهش ردیابی توسط شرکت‌های تبلیغاتی',
            en: 'Reducing tracking by advertising companies',
          },
        },
        {
          id: 'dl-5-prompt-3',
          title: {
            fa: 'حریم خصوصی در شبکه‌های اجتماعی',
            en: 'Privacy in Social Networks',
          },
          prompt: {
            fa: `می‌خواهم حریم خصوصی‌ام رو در شبکه‌های اجتماعی حفظ کنم. لطفاً:

1. تنظیمات حریم خصوصی اینستاگرام:
   - چطور اکانتم رو خصوصی کنم؟
   - چطور جلوی ذخیره عکس‌هایم رو بگیرم؟
   - چطور مکان‌یابی رو غیرفعال کنم؟
   - چطور بفهمم چه کسی پروفایلم رو نگاه می‌کنه؟
2. تنظیمات حریم خصوصی تلگرام:
   - تفاوت بین چت معمولی و Secret Chat چیه؟
   - چطور شماره تلفنم رو مخفی کنم؟
   - تنظیمات "آخرین بازدید" و "عکس پروفایل" رو چطور محدود کنم؟
3. تنظیمات حریم خصوصی فیسبوک و توییتر
4. چه اطلاعاتی رو نباید هیچ‌وقت در شبکه‌های اجتماعی به اشتراک بگذارم؟
5. خطرات Oversharing چیه؟ (اشتراک‌گذاری بیش از حد)
6. چطور از سوءاستفاده دیگران از عکس‌ها و اطلاعاتم جلوگیری کنم؟`,
            en: `I want to maintain my privacy on social networks. Please:

1. Instagram privacy settings:
   - How do I make my account private?
   - How do I prevent saving my photos?
   - How do I disable location?
   - How do I know who views my profile?
2. Telegram privacy settings:
   - What's the difference between regular chat and Secret Chat?
   - How do I hide my phone number?
   - How do I restrict "last seen" and "profile photo" settings?
3. Facebook and Twitter privacy settings
4. What information should I never share on social networks?
5. What are the dangers of Oversharing?
6. How do I prevent others from misusing my photos and information?`,
          },
          purpose: {
            fa: 'کنترل اطلاعات شخصی در فضای عمومی',
            en: 'Controlling personal information in public space',
          },
        },
        {
          id: 'dl-5-prompt-4',
          title: {
            fa: 'مدیریت اطلاعات در گوگل',
            en: 'Managing Information in Google',
          },
          prompt: {
            fa: `گوگل همه چیز من رو می‌دونه! لطفاً:

1. گوگل چه اطلاعاتی از من جمع‌آوری می‌کنه؟ (جستجوها، مکان، یوتیوب، Gmail، تقویم)
2. چطور تاریخچه جستجوی گوگل رو ببینم و حذف کنم؟
3. چطور تاریخچه مکان (Location History) رو غیرفعال و حذف کنم؟
4. چطور تاریخچه یوتیوب رو پاک کنم؟
5. Google Takeout چیه و چطور ازش استفاده کنم؟ (دانلود تمام اطلاعات)
6. چطور حساب گوگل رو کاملاً حذف کنم؟
7. آیا باید از موتورهای جستجوی جایگزین استفاده کنم؟ (DuckDuckGo، Startpage، Brave Search)
8. تفاوت بین "حذف تاریخچه" و "غیرفعال کردن ذخیره‌سازی" چیه؟`,
            en: `Google knows everything about me! Please:

1. What information does Google collect about me? (searches, location, YouTube, Gmail, calendar)
2. How do I view and delete Google search history?
3. How do I disable and delete Location History?
4. How do I clear YouTube history?
5. What is Google Takeout and how do I use it? (download all data)
6. How do I completely delete Google account?
7. Should I use alternative search engines? (DuckDuckGo, Startpage, Brave Search)
8. What's the difference between "delete history" and "disable storage"?`,
          },
          purpose: {
            fa: 'کاهش وابستگی به اکوسیستم گوگل',
            en: 'Reducing dependency on Google ecosystem',
          },
        },
        {
          id: 'dl-5-prompt-5',
          title: {
            fa: 'ایجاد هویت‌های جداگانه آنلاین',
            en: 'Creating Separate Online Identities',
          },
          prompt: {
            fa: `می‌خواهم کارهای مختلفم رو از هم جدا کنم. لطفاً:

1. چرا باید هویت‌های جداگانه داشته باشم؟ (کار، شخصی، خرید)
2. چطور یک ایمیل موقت (Disposable Email) بسازم؟ (SimpleLogin، AnonAddy، Guerrilla Mail)
3. چطور از شماره تلفن مجازی استفاده کنم؟
4. آیا باید برای هر سایت یک نام کاربری متفاوت داشته باشم؟
5. چطور از لو رفتن هویت واقعی‌ام جلوگیری کنم؟ (OPSEC - Operational Security)
6. Container Tabs در فایرفاکس چیه و چطور کمک می‌کنه؟
7. چطور یک Profile جداگانه در مرورگر بسازم؟
8. آیا باید از Virtual Machine برای کارهای حساس استفاده کنم؟`,
            en: `I want to separate my different activities. Please:

1. Why should I have separate identities? (work, personal, shopping)
2. How do I create a disposable email? (SimpleLogin, AnonAddy, Guerrilla Mail)
3. How do I use virtual phone number?
4. Should I have a different username for each site?
5. How do I prevent revealing my real identity? (OPSEC - Operational Security)
6. What are Container Tabs in Firefox and how do they help?
7. How do I create a separate Profile in browser?
8. Should I use Virtual Machine for sensitive tasks?`,
          },
          purpose: {
            fa: 'جداسازی فعالیت‌های آنلاین برای امنیت بیشتر',
            en: 'Separating online activities for more security',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای حریم خصوصی آنلاین - EFF',
            en: 'Online Privacy Guide - EFF',
          },
          url: 'https://ssd.eff.org/',
          isInternal: false,
          description: {
            fa: 'راهنمای جامع بنیاد مرز الکترونیکی',
            en: 'Comprehensive guide by Electronic Frontier Foundation',
          },
        },
        {
          title: {
            fa: 'گزارش ردیابی آنلاین - Privacy International',
            en: 'Online Tracking Report - Privacy International',
          },
          url: 'https://privacyinternational.org/learn/tracking',
          isInternal: false,
          description: {
            fa: 'تحقیقات عمیق درباره ردیابی آنلاین',
            en: 'Deep research on online tracking',
          },
        },
        {
          title: {
            fa: 'Privacy Guides - راهنمای جامع',
            en: 'Privacy Guides - Comprehensive Guide',
          },
          url: 'https://www.privacyguides.org/',
          isInternal: false,
          description: {
            fa: 'بهترین ابزارها و سرویس‌های محافظ حریم خصوصی',
            en: 'Best privacy-respecting tools and services',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'Permanent Record',
            en: 'Permanent Record',
          },
          author: 'Edward Snowden',
          description: {
            fa: 'خاطرات ادوارد اسنودن، افشاگر برنامه‌های جاسوسی NSA. کتابی که اهمیت حریم خصوصی را نشان می‌دهد.',
            en: 'Memoirs of Edward Snowden, NSA surveillance program whistleblower. A book that shows the importance of privacy.',
          },
        },
        {
          title: {
            fa: 'Data and Goliath',
            en: 'Data and Goliath',
          },
          author: 'Bruce Schneier',
          description: {
            fa: 'نگاهی به نحوه جمع‌آوری و سوءاستفاده از داده‌های شخصی توسط دولت‌ها و شرکت‌ها',
            en: 'A look at how governments and companies collect and misuse personal data',
          },
        },
        {
          title: {
            fa: 'Extreme Privacy: What It Takes to Disappear',
            en: 'Extreme Privacy: What It Takes to Disappear',
          },
          author: 'Michael Bazzell',
          description: {
            fa: 'راهنمای عملی برای حذف ردپای دیجیتال و محافظت از حریم خصوصی',
            en: 'Practical guide to removing digital footprint and protecting privacy',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'How to Protect Your Privacy Online - TED Talk',
            en: 'How to Protect Your Privacy Online - TED Talk',
          },
          url: 'https://www.youtube.com/results?search_query=protect+privacy+online+ted',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'سخنرانی‌های TED درباره حریم خصوصی',
            en: 'TED talks about privacy',
          },
        },
        {
          title: {
            fa: 'Browser Fingerprinting Explained',
            en: 'Browser Fingerprinting Explained',
          },
          url: 'https://www.youtube.com/watch?v=AYU5eJl_6Xk',
          platform: 'youtube',
          duration: '8:32',
          description: {
            fa: 'توضیح نحوه ردیابی از طریق اثر انگشت مرورگر',
            en: 'Explanation of tracking through browser fingerprinting',
          },
        },
        {
          title: {
            fa: 'The Hated One - Privacy Channel',
            en: 'The Hated One - Privacy Channel',
          },
          url: 'https://www.youtube.com/@TheHatedOne',
          platform: 'youtube',
          duration: 'Various',
          description: {
            fa: 'کانال یوتیوب تخصصی حریم خصوصی و امنیت',
            en: 'Specialized YouTube channel on privacy and security',
          },
        },
      ],
    },
    {
      id: 'dl-step-6',
      order: 6,
      title : {
        fa: 'امنیت مرورگر و افزونه‌ها',
        en: 'Browser Security and Extensions',
      },
      description: {
        fa: 'یاد بگیرید چطور مرورگر خود را ایمن کنید، افزونه‌های مخرب را شناسایی کنید و از ابزارهای امنیتی مرورگر استفاده کنید',
        en: 'Learn how to secure your browser, identify malicious extensions, and use browser security tools',
      },
      whyImportant: {
        fa: 'مرورگر دروازه ورود شما به اینترنت است و بیشترین زمان آنلاین شما در آن می‌گذرد. یک مرورگر ناامن یا افزونه‌های مخرب می‌توانند تمام فعالیت‌های آنلاین شما را رصد کنند، رمزهای عبور را بدزدند، یا بدافزار نصب کنند. طبق گزارش Google، بیش از 280 میلیون افزونه مخرب در سال 2023 از Chrome Web Store حذف شدند. بسیاری از این افزونه‌ها ابتدا مفید به نظر می‌رسیدند اما بعداً به ابزار جاسوسی تبدیل شدند.',
        en: 'Browser is your gateway to the internet and where you spend most of your online time. An insecure browser or malicious extensions can monitor all your online activities, steal passwords, or install malware. According to Google report, over 280 million malicious extensions were removed from Chrome Web Store in 2023. Many of these extensions initially seemed useful but later turned into spyware tools.',
      },
      learningOutcomes: {
        fa: [
          'درک تنظیمات امنیتی مرورگرهای مختلف (Chrome، Firefox، Edge، Brave)',
          'شناسایی افزونه‌های مخرب و خطرناک',
          'استفاده از افزونه‌های امنیتی ضروری (HTTPS Everywhere، uBlock Origin)',
          'مدیریت کوکی‌ها و داده‌های مرورگر',
          'استفاده از مدیر رمز عبور داخلی مرورگر یا افزونه‌های مستقل',
          'شناسایی و جلوگیری از حملات Drive-by Download',
          'استفاده از Sandboxing و Container Tabs',
          'به‌روزرسانی منظم مرورگر و افزونه‌ها',
        ],
        en: [
          'Understanding security settings of different browsers (Chrome, Firefox, Edge, Brave)',
          'Identifying malicious and dangerous extensions',
          'Using essential security extensions (HTTPS Everywhere, uBlock Origin)',
          'Managing cookies and browser data',
          'Using built-in browser password manager or standalone extensions',
          'Identifying and preventing Drive-by Download attacks',
          'Using Sandboxing and Container Tabs',
          'Regular browser and extension updates',
        ],
      },
      estimatedTime: '4-5 hours',
      prompts: [
        {
          id: 'dl-6-prompt-1',
          title: {
            fa: 'انتخاب و تنظیم مرورگر امن',
            en: 'Choosing and Configuring Secure Browser',
          },
          prompt: {
            fa: `می‌خواهم مرورگرم رو ایمن کنم. لطفاً:

1. کدوم مرورگر امن‌تره؟ Chrome، Firefox، Edge، Brave، Safari رو مقایسه کن
2. تفاوت بین Chromium-based browsers چیه؟
3. تنظیمات امنیتی ضروری در Chrome/Chromium:
   - Safe Browsing چیه و چطور فعالش کنم؟
   - چطور Pop-ups و Redirects رو مسدود کنم؟
   - تنظیمات Site Settings (دسترسی به دوربین، مکان، اعلان‌ها)
   - چطور Cookies رو مدیریت کنم؟
4. تنظیمات امنیتی Firefox:
   - Enhanced Tracking Protection چیه؟
   - چطور DNS over HTTPS (DoH) رو فعال کنم؟
   - Container Tabs چیه و چطور استفاده کنم؟
5. آیا باید از مرورگرهای محافظ حریم خصوصی مثل Brave یا Tor استفاده کنم؟
6. چطور مرورگر رو به‌روز نگه دارم؟
7. چطور تاریخچه و Cache رو به صورت خودکار پاک کنم؟
8. چه زمانی باید مرورگر رو Reset کنم؟`,
            en: `I want to secure my browser. Please:

1. Which browser is more secure? Compare Chrome, Firefox, Edge, Brave, Safari
2. What's the difference between Chromium-based browsers?
3. Essential security settings in Chrome/Chromium:
   - What is Safe Browsing and how do I enable it?
   - How do I block Pop-ups and Redirects?
   - Site Settings (camera, location, notifications access)
   - How do I manage Cookies?
4. Firefox security settings:
   - What is Enhanced Tracking Protection?
   - How do I enable DNS over HTTPS (DoH)?
   - What are Container Tabs and how do I use them?
5. Should I use privacy-respecting browsers like Brave or Tor?
6. How do I keep browser updated?
7. How do I automatically clear history and Cache?
8. When should I Reset the browser?`,
          },
          purpose: {
            fa: 'ایجاد پایه‌ای امن برای مرور اینترنت',
            en: 'Creating a secure foundation for internet browsing',
          },
        },
        {
          id: 'dl-6-prompt-2',
          title: {
            fa: 'شناسایی افزونه‌های مخرب',
            en: 'Identifying Malicious Extensions',
          },
          prompt: {
            fa: `نگران افزونه‌های نصب شده‌ام هستم. لطفاً:

1. افزونه‌های مرورگر چطور می‌تونن خطرناک باشن؟
2. نشانه‌های یک افزونه مخرب چیه؟
   - درخواست مجوزهای غیرضروری
   - تبلیغات ناخواسته
   - تغییر صفحه اصلی یا موتور جستجو
   - کند شدن مرورگر
3. چطور افزونه‌های نصب شده رو بررسی کنم؟
4. چه مجوزهایی خطرناک هستند؟ ("Read and change all your data"، "Access your tabs")
5. چطور یک افزونه رو قبل از نصب بررسی کنم؟
   - تعداد نصب و امتیاز
   - نظرات کاربران
   - سازنده و وب‌سایت رسمی
   - تاریخ آخرین به‌روزرسانی
6. چطور افزونه‌های مشکوک رو حذف کنم؟
7. آیا افزونه‌های محبوب هم می‌تونن مخرب بشن؟ (مثال: The Great Suspender)
8. چطور از نصب افزونه‌های جعلی جلوگیری کنم؟`,
            en: `I'm worried about my installed extensions. Please:

1. How can browser extensions be dangerous?
2. What are signs of a malicious extension?
   - Requesting unnecessary permissions
   - Unwanted ads
   - Changing homepage or search engine
   - Slowing down browser
3. How do I review installed extensions?
4. Which permissions are dangerous? ("Read and change all your data", "Access your tabs")
5. How do I check an extension before installing?
   - Number of installs and rating
   - User reviews
   - Developer and official website
   - Last update date
6. How do I remove suspicious extensions?
7. Can popular extensions also become malicious? (example: The Great Suspender)
8. How do I prevent installing fake extensions?`,
          },
          purpose: {
            fa: 'محافظت از مرورگر در برابر افزونه‌های مخرب',
            en: 'Protecting browser against malicious extensions',
          },
        },
        {
          id: 'dl-6-prompt-3',
          title: {
            fa: 'افزونه‌های امنیتی ضروری',
            en: 'Essential Security Extensions',
          },
          prompt: {
            fa: `چه افزونه‌هایی رو باید نصب کنم؟ لطفاً:

1. افزونه‌های امنیتی ضروری رو معرفی کن:
   - uBlock Origin (مسدودکننده تبلیغات و ردیاب‌ها)
   - Privacy Badger (ضد ردیابی)
   - HTTPS Everywhere (اجبار به استفاده از HTTPS)
   - Bitwarden/1Password (مدیر رمز عبور)
   - ClearURLs (حذف پارامترهای ردیابی از URL)
2. تفاوت بین uBlock Origin و AdBlock Plus چیه؟
3. چطور uBlock Origin رو به درستی تنظیم کنم؟
4. آیا باید از VPN Extension استفاده کنم؟ خطراتش چیه؟
5. افزونه‌های ضد فیشینگ کدومند؟ (Netcraft، Web of Trust)
6. چطور بفهمم یک افزونه امنیتی واقعاً کار می‌کنه؟
7. آیا نصب افزونه‌های زیاد مرورگر رو کند می‌کنه؟
8. چه افزونه‌هایی رو نباید نصب کنم؟ (VPN رایگان، Screen Recorder مشکوک)`,
            en: `Which extensions should I install? Please:

1. Introduce essential security extensions:
   - uBlock Origin (ad and tracker blocker)
   - Privacy Badger (anti-tracking)
   - HTTPS Everywhere (force HTTPS usage)
   - Bitwarden/1Password (password manager)
   - ClearURLs (remove tracking parameters from URL)
2. What's the difference between uBlock Origin and AdBlock Plus?
3. How do I properly configure uBlock Origin?
4. Should I use VPN Extension? What are its risks?
5. Which are anti-phishing extensions? (Netcraft, Web of Trust)
6. How do I know if a security extension actually works?
7. Does installing many extensions slow down the browser?
8. Which extensions should I not install? (free VPN, suspicious Screen Recorder)`,
          },
          purpose: {
            fa: 'تقویت امنیت مرورگر با ابزارهای مناسب',
            en: 'Strengthening browser security with appropriate tools',
          },
        },
        {
          id: 'dl-6-prompt-4',
          title: {
            fa: 'مدیریت کوکی‌ها و داده‌های مرورگر',
            en: 'Managing Cookies and Browser Data',
          },
          prompt: {
            fa: `می‌خواهم کوکی‌ها رو درست مدیریت کنم. لطفاً:

1. Cookie دقیقاً چیه و چطور کار می‌کنه؟
2. تفاوت بین First-party و Third-party Cookies چیه؟
3. Session Cookies و Persistent Cookies چه تفاوتی دارند؟
4. چطور کوکی‌های Third-party رو مسدود کنم؟
5. آیا باید همه کوکی‌ها رو حذف کنم؟ عواقبش چیه؟
6. چطور کوکی‌ها رو به صورت خودکار پاک کنم؟ (Cookie AutoDelete)
7. Local Storage و Session Storage چیه؟
8. چطور Cache مرورگر رو مدیریت کنم؟
9. IndexedDB چیه و چرا مهمه؟
10. چطور تمام داده‌های مرورگر رو یکجا پاک کنم؟`,
            en: `I want to properly manage cookies. Please:

1. What exactly is a Cookie and how does it work?
2. What's the difference between First-party and Third-party Cookies?
3. What's the difference between Session Cookies and Persistent Cookies?
4. How do I block Third-party cookies?
5. Should I delete all cookies? What are the consequences?
6. How do I automatically delete cookies? (Cookie AutoDelete)
7. What are Local Storage and Session Storage?
8. How do I manage browser Cache?
9. What is IndexedDB and why is it important?
10. How do I clear all browser data at once?`,
          },
          purpose: {
            fa: 'کنترل داده‌های ذخیره شده در مرورگر',
            en: 'Controlling data stored in browser',
          },
        },
        {
          id: 'dl-6-prompt-5',
          title: {
            fa: 'جلوگیری از حملات مبتنی بر مرورگر',
            en: 'Preventing Browser-Based Attacks',
          },
          prompt: {
            fa: `می‌خواهم از حملات مبتنی بر مرورگر محافظت کنم. لطفاً:

1. Drive-by Download چیه و چطور ازش جلوگیری کنم؟
2. Malvertising (تبلیغات مخرب) چیه؟
3. چطور بفهمم یک سایت سعی داره بدافزار نصب کنه؟
4. Browser Hijacking چیه و چطور برطرفش کنم؟
5. Clickjacking چیه و چطور ازش محافظت کنم؟
6. چطور از حملات XSS (Cross-Site Scripting) جلوگیری کنم؟
7. Content Security Policy (CSP) چیه؟
8. چطور بفهمم مرورگرم Compromised شده؟
9. Sandboxing در مرورگر چیه و چطور کمک می‌کنه؟
10. چطور مرورگر رو به حالت اولیه برگردونم؟`,
            en: `I want to protect against browser-based attacks. Please:

1. What is Drive-by Download and how do I prevent it?
2. What is Malvertising (malicious advertising)?
3. How do I know if a site is trying to install malware?
4. What is Browser Hijacking and how do I fix it?
5. What is Clickjacking and how do I protect against it?
6. How do I prevent XSS (Cross-Site Scripting) attacks?
7. What is Content Security Policy (CSP)?
8. How do I know if my browser is Compromised?
9. What is Sandboxing in browser and how does it help?
10. How do I reset browser to initial state?`,
          },
          purpose: {
            fa: 'شناسایی و دفع حملات پیشرفته',
            en: 'Identifying and repelling advanced attacks',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'راهنمای امنیت مرورگر - CISA',
            en: 'Browser Security Guide - CISA',
          },
          url: 'https://www.cisa.gov/news-events/news/securing-your-web-browser',
          isInternal: false,
          description: {
            fa: 'توصیه‌های رسمی آژانس امنیت سایبری آمریکا',
            en: 'Official recommendations from US Cybersecurity Agency',
          },
        },
        {
          title: {
            fa: 'Browser Extension Security - Google Research',
            en: 'Browser Extension Security - Google Research',
          },
          url: 'https://research.google/pubs/pub48946/',
          isInternal: false,
          description: {
            fa: 'تحقیقات گوگل درباره امنیت افزونه‌ها',
            en: 'Google research on extension security',
          },
        },
        {
          title: {
            fa: 'Privacy Guides - Browser Recommendations',
            en: 'Privacy Guides - Browser Recommendations',
          },
          url: 'https://www.privacyguides.org/en/desktop-browsers/',
          isInternal: false,
          description: {
            fa: 'توصیه‌های مرورگرهای محافظ حریم خصوصی',
            en: 'Privacy-respecting browser recommendations',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'The Tangled Web: A Guide to Securing Modern Web Applications',
            en: 'The Tangled Web: A Guide to Securing Modern Web Applications',
          },
          author: 'Michal Zalewski',
          description: {
            fa: 'کتاب جامع درباره امنیت وب و مرورگر. برای کسانی که می‌خواهند عمیق‌تر بفهمند.',
            en: 'Comprehensive book about web and browser security. For those who want deeper understanding.',
          },
        },
        {
          title: {
            fa: 'Web Browser Engineering',
            en: 'Web Browser Engineering',
          },
          author: 'Pavel Panchekha & Chris Harrelson',
          description: {
            fa: 'درک نحوه کار مرورگرها از درون',
            en: 'Understanding how browsers work from inside',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'How Browser Extensions Work - Computerphile',
            en: 'How Browser Extensions Work - Computerphile',
          },
          url: 'https://www.youtube.com/watch?v=EWjnZyQfdEE',
          platform: 'youtube',
          duration: '10:15',
          description: {
            fa: 'توضیح فنی نحوه کار افزونه‌ها',
            en: 'Technical explanation of how extensions work',
          },
        },
        {
          title: {
            fa: 'Browser Security Explained',
            en: 'Browser Security Explained',
          },
          url: 'https://www.youtube.com/results?search_query=browser+security+explained',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'آموزش جامع امنیت مرورگر',
            en: 'Comprehensive browser security tutorial',
          },
        },
        {
          title: {
            fa: 'The Hated One - Browser Privacy',
            en: 'The Hated One - Browser Privacy',
          },
          url: 'https://www.youtube.com/@TheHatedOne',
          platform: 'youtube',
          duration: 'Various',
          description: {
            fa: 'ویدیوهای تخصصی حریم خصوصی مرورگر',
            en: 'Specialized browser privacy videos',
          },
        },
      ],
    },
    {
      id: 'dl-step-7',
      order: 7,
      title: {
        fa: 'امنیت خرید اینترنتی و تراکنش‌های مالی',
        en: 'Online Shopping Security and Financial Transactions',
      },
      description: {
        fa: 'یاد بگیرید چطور به صورت امن خرید آنلاین کنید، از کلاهبرداری‌های مالی جلوگیری کنید و اطلاعات بانکی خود را محافظت کنید',
        en: 'Learn how to shop online securely, prevent financial fraud, and protect your banking information',
      },
      whyImportant: {
        fa: 'خرید آنلاین و تراکنش‌های مالی دیجیتال بخش جدایی‌ناپذیر زندگی مدرن شده‌اند، اما با خطرات جدی همراه هستند. طبق گزارش FBI IC3، در سال 2023 بیش از 10 میلیارد دلار از طریق کلاهبرداری‌های آنلاین از مردم سرقت شد. در ایران نیز کلاهبرداری‌های دیوار، اینستاگرام، و پیامک‌های جعلی بانکی روزانه قربانی می‌گیرند. یک اشتباه کوچک می‌تواند منجر به سرقت اطلاعات کارت بانکی، خالی شدن حساب، یا سرقت هویت شود.',
        en: 'Online shopping and digital financial transactions have become an inseparable part of modern life, but come with serious risks. According to FBI IC3 report, over $10 billion was stolen from people through online fraud in 2023. In Iran too, Divar scams, Instagram fraud, and fake bank SMS messages claim victims daily. One small mistake can lead to bank card information theft, account drainage, or identity theft.',
      },
      learningOutcomes: {
        fa: [
          'شناسایی سایت‌های خرید معتبر و جعلی',
          'استفاده امن از کارت‌های بانکی آنلاین',
          'شناسایی کلاهبرداری‌های رایج (دیوار، اینستاگرام، تلگرام)',
          'استفاده از کارت‌های مجازی و یکبار مصرف',
          'محافظت از اطلاعات بانکی و CVV2',
          'شناسایی پیامک‌ها و ایمیل‌های جعلی بانکی',
          'استفاده امن از درگاه‌های پرداخت',
          'حقوق مصرف‌کننده در خرید آنلاین',
        ],
        en: [
          'Identifying legitimate and fake shopping sites',
          'Safe use of bank cards online',
          'Identifying common scams (Divar, Instagram, Telegram)',
          'Using virtual and one-time cards',
          'Protecting banking information and CVV2',
          'Identifying fake bank SMS and emails',
          'Safe use of payment gateways',
          'Consumer rights in online shopping',
        ],
      },
      estimatedTime: '5-6 hours',
      prompts: [
        {
          id: 'dl-7-prompt-1',
          title: {
            fa: 'شناسایی سایت‌های خرید معتبر',
            en: 'Identifying Legitimate Shopping Sites',
          },
          prompt: {
            fa: `می‌خواهم از یک سایت خرید کنم ولی نمی‌دونم معتبره یا نه. لطفاً:

1. چطور اعتبار یک سایت خرید رو بررسی کنم؟
   - بررسی گواهی SSL (قفل سبز، HTTPS)
   - بررسی اطلاعات تماس و آدرس فیزیکی
   - جستجوی نظرات کاربران
   - بررسی سن دامنه (Domain Age)
2. نشانه‌های یک سایت جعلی چیه؟
   - قیمت‌های غیرمعقول
   - طراحی ضعیف و اشتباهات املایی
   - فقط پرداخت کارت به کارت
   - عدم وجود شماره ثبت و مجوزها
3. چطور بفهمم یک سایت کپی از سایت معتبر هست? (Typosquatting)
4. ابزارهای بررسی اعتبار سایت کدومند؟ (Whois Lookup، Scamadviser، Trustpilot)
5. چطور از نماد اعتماد الکترونیکی (eNamad) استفاده کنم؟
6. آیا سایت‌های خارجی امن‌ترند؟ (Amazon، eBay، AliExpress)
7. چطور از کلاهبرداری در سایت‌های ایرانی جلوگیری کنم؟ (دیجی‌کالا، دیوار، شیپور)
8. چه موقع باید از خرید منصرف بشم؟`,
            en: `I want to buy from a site but don't know if it's legitimate. Please:

1. How do I check the credibility of a shopping site?
   - Check SSL certificate (green lock, HTTPS)
   - Check contact information and physical address
   - Search user reviews
   - Check Domain Age
2. What are signs of a fake site?
   - Unreasonable prices
   - Poor design and spelling errors
   - Only card-to-card payment
   - No registration number and licenses
3. How do I know if a site is a copy of a legitimate site? (Typosquatting)
4. Which are site credibility checking tools? (Whois Lookup, Scamadviser, Trustpilot)
5. How do I use eNamad (electronic trust symbol)?
6. Are foreign sites more secure? (Amazon, eBay, AliExpress)
7. How do I prevent fraud on Iranian sites? (Digikala, Divar, Sheypoor)
8. When should I abandon the purchase?`,
          },
          purpose: {
            fa: 'جلوگیری از خرید از سایت‌های جعلی',
            en: 'Preventing purchase from fake sites',
          },
        },
        {
          id: 'dl-7-prompt-2',
          title: {
            fa: 'استفاده امن از کارت بانکی آنلاین',
            en: 'Safe Use of Bank Cards Online',
          },
          prompt: {
            fa: `می‌خواهم با کارت بانکی خرید آنلاین کنم. لطفاً:

1. چه اطلاعاتی از کارتم رو نباید به اشتراک بگذارم؟
   - CVV2 (رمز پشت کارت)
   - رمز دوم (پویا)
   - رمز اینترنتی
2. تفاوت بین رمز ثابت، رمز دوم، و رمز اینترنتی چیه؟
3. چطور رمز اینترنتی فعال کنم و مدیریتش کنم؟
4. کارت مجازی چیه و چطور بسازم؟
5. چطور از کارت یکبار مصرف استفاده کنم؟
6. آیا ذخیره اطلاعات کارت در سایت‌ها امنه؟
7. چطور بفهمم اطلاعات کارتم لو رفته؟
8. اگر کارتم کلون شد چه کار کنم؟
9. چطور تراکنش‌های مشکوک رو شناسایی کنم؟
10. چطور از خرید در وای‌فای عمومی جلوگیری کنم؟`,
            en: `I want to shop online with bank card. Please:

1. What card information should I not share?
   - CVV2 (code on back of card)
   - Second password (dynamic)
   - Internet password
2. What's the difference between static password, second password, and internet password?
3. How do I activate and manage internet password?
4. What is virtual card and how do I create one?
5. How do I use one-time card?
6. Is saving card information on sites secure?
7. How do I know if my card information is leaked?
8. What do I do if my card is cloned?
9. How do I identify suspicious transactions?
10. How do I prevent shopping on public WiFi?`,
          },
          purpose: {
            fa: 'محافظت از اطلاعات مالی در تراکنش‌ها',
            en: 'Protecting financial information in transactions',
          },
        },
        {
          id: 'dl-7-prompt-3',
          title: {
            fa: 'شناسایی کلاهبرداری‌های رایج',
            en: 'Identifying Common Scams',
          },
          prompt: {
            fa: `می‌خواهم از کلاهبرداری‌های آنلاین جلوگیری کنم. لطفاً:

1. کلاهبرداری‌های رایج در دیوار و شیپور:
   - فروشنده جعلی با قیمت پایین
   - درخواست واریز پیش‌پرداخت
   - لینک‌های جعلی "پرداخت امن"
   - حساب‌های سرقتی
2. کلاهبرداری‌های اینستاگرام و تلگرام:
   - فروشگاه‌های جعلی
   - قرعه‌کشی‌های فیک
   - پیج‌های تقلبی برندها
   - درخواست رمز یکبار مصرف
3. پیامک‌های جعلی بانکی:
   - "کارت شما مسدود شده"
   - "برنده جایزه شدید"
   - لینک‌های کوتاه مشکوک
   - شماره‌های غیررسمی
4. کلاهبرداری تلفنی:
   - جعل هویت کارمند بانک
   - درخواست رمز دوم یا CVV2
   - ادعای تراکنش مشکوک
5. چطور یک پیشنهاد خرید رو بررسی کنم؟
6. چطور از "پرداخت در محل" امن استفاده کنم؟
7. چطور کلاهبرداری "خرید از خارج" رو تشخیص بدم؟
8. اگر کلاهبرداری شدم چه کار کنم؟ (گزارش به پلیس فتا، بانک)
9. چطور از کلاهبرداری "سرمایه‌گذاری آنلاین" جلوگیری کنم؟
10. نشانه‌های یک معامله امن چیه؟`,
            en: `I want to prevent online fraud. Please:

1. Common scams on Divar and Sheypoor:
   - Fake seller with low price
   - Request for advance payment
   - Fake "secure payment" links
   - Stolen accounts
2. Instagram and Telegram scams:
   - Fake stores
   - Fake lotteries
   - Counterfeit brand pages
   - Request for one-time password
3. Fake bank SMS:
   - "Your card is blocked"
   - "You won a prize"
   - Suspicious short links
   - Unofficial numbers
4. Phone scams:
   - Impersonating bank employee
   - Requesting second password or CVV2
   - Claiming suspicious transaction
5. How do I check a purchase offer?
6. How do I safely use "cash on delivery"?
7. How do I identify "buying from abroad" scam?
8. What do I do if I'm scammed? (Report to Cyber Police, bank)
9. How do I prevent "online investment" scam?
10. What are signs of a safe transaction?`,
          },
          purpose: {
            fa: 'شناخت و اجتناب از روش‌های متداول کلاهبرداری',
            en: 'Recognizing and avoiding common fraud methods',
          },
        },
        {
          id: 'dl-7-prompt-4',
          title: {
            fa: 'استفاده امن از درگاه‌های پرداخت',
            en: 'Safe Use of Payment Gateways',
          },
          prompt: {
            fa: `می‌خواهم درگاه‌های پرداخت رو درست استفاده کنم. لطفاً:

1. درگاه پرداخت چیه و چطور کار می‌کنه؟
2. تفاوت بین درگاه‌های معتبر (زرین‌پال، پی‌پینگ، سامان) و جعلی چیه؟
3. چطور یک درگاه پرداخت رو قبل از وارد کردن اطلاعات بررسی کنم؟
   - بررسی آدرس URL
   - گواهی SSL
   - لوگوی بانک
4. چطور بفهمم به درگاه واقعی بانک وصل شدم؟
5. آیا باید اطلاعات کارت رو در درگاه ذخیره کنم؟
6. چطور از حملات Man-in-the-Middle در درگاه پرداخت جلوگیری کنم؟
7. اگر پرداخت موفق بود ولی سفارش ثبت نشد چه کار کنم؟
8. چطور تراکنش‌های ناموفق رو پیگیری کنم؟
9. آیا درگاه‌های خارجی (PayPal، Stripe) امن‌ترند؟
10. چطور از کلاهبرداری "درگاه جعلی" جلوگیری کنم؟`,
            en: `I want to use payment gateways correctly. Please:

1. What is payment gateway and how does it work?
2. What's the difference between legitimate gateways (ZarinPal, PayPing, Saman) and fake ones?
3. How do I check a payment gateway before entering information?
   - Check URL address
   - SSL certificate
   - Bank logo
4. How do I know I'm connected to real bank gateway?
5. Should I save card information in gateway?
6. How do I prevent Man-in-the-Middle attacks in payment gateway?
7. What do I do if payment succeeded but order not registered?
8. How do I track failed transactions?
9. Are foreign gateways (PayPal, Stripe) more secure?
10. How do I prevent "fake gateway" fraud?`,
          },
          purpose: {
            fa: 'تضمین امنیت در مرحله پرداخت',
            en: 'Ensuring security in payment stage',
          },
        },
        {
          id: 'dl-7-prompt-5',
          title: {
            fa: 'حقوق مصرف‌کننده و بازگشت وجه',
            en: 'Consumer Rights and Refunds',
          },
          prompt: {
            fa: `می‌خواهم حقوقم رو در خرید آنلاین بدونم. لطفاً:

1. حقوق مصرف‌کننده در خرید اینترنتی چیه؟
   - حق استرداد کالا (7 روز)
   - حق انصراف از خرید
   - گارانتی و خدمات پس از فروش
2. چطور از یک خرید اشتباه انصراف بدم؟
3. اگر کالا معیوب بود چه کار کنم؟
4. چطور شکایت خودم رو به سازمان حمایت مصرف‌کننده ارسال کنم؟
5. چطور از فروشنده بازگشت وجه بگیرم؟
6. اگر فروشنده همکاری نکرد چه کار کنم؟
7. چطور از بانک درخواست Chargeback کنم؟
8. آیا می‌تونم از خرید خارجی (آمازون) کالا رو برگردونم؟
9. چطور مدارک خریدم رو نگه دارم؟ (فاکتور، رسید، مکاتبات)
10. چطور از کلاهبرداری "عدم ارسال کالا" جلوگیری کنم؟`,
            en: `I want to know my rights in online shopping. Please:

1. What are consumer rights in online shopping?
   - Right to return goods (7 days)
   - Right to cancel purchase
   - Warranty and after-sales service
2. How do I cancel a wrong purchase?
3. What do I do if product is defective?
4. How do I submit my complaint to Consumer Protection Organization?
5. How do I get refund from seller?
6. What do I do if seller doesn't cooperate?
7. How do I request Chargeback from bank?
8. Can I return product from foreign purchase (Amazon)?
9. How do I keep my purchase documents? (invoice, receipt, correspondence)
10. How do I prevent "non-delivery of goods" fraud?`,
          },
          purpose: {
            fa: 'آگاهی از حقوق قانونی و راه‌های پیگیری',
            en: 'Awareness of legal rights and follow-up methods',
          },
        },
      ],
      articles: [
        {
          title: {
            fa: 'گزارش کلاهبرداری اینترنتی FBI IC3',
            en: 'FBI IC3 Internet Crime Report',
          },
          url: 'https://www.ic3.gov/Media/PDF/AnnualReport/2023_IC3Report.pdf',
          isInternal: false,
          description: {
            fa: 'آمار و روندهای جهانی کلاهبرداری آنلاین',
            en: 'Global online fraud statistics and trends',
          },
        },
        {
          title: {
            fa: 'راهنمای خرید امن آنلاین - FTC',
            en: 'Safe Online Shopping Guide - FTC',
          },
          url: 'https://consumer.ftc.gov/articles/online-shopping',
          isInternal: false,
          description: {
            fa: 'نکات کمیسیون تجارت فدرال آمریکا',
            en: 'Tips from US Federal Trade Commission',
          },
        },
        {
          title: {
            fa: 'نماد اعتماد الکترونیکی - eNamad',
            en: 'Electronic Trust Symbol - eNamad',
          },
          url: 'https://enamad.ir/',
          isInternal: false,
          description: {
            fa: 'راهنمای استفاده و بررسی اعتبار سایت‌های ایرانی',
            en: 'Guide to using and checking credibility of Iranian sites',
          },
        },
        {
          title: {
            fa: 'راهنمای امنیت کارت بانکی - بانک مرکزی',
            en: 'Bank Card Security Guide - Central Bank',
          },
          url: 'https://www.cbi.ir/',
          isInternal: false,
          description: {
            fa: 'توصیه‌های رسمی بانک مرکزی ایران',
            en: 'Official recommendations from Central Bank of Iran',
          },
        },
      ],
      books: [
        {
          title: {
            fa: 'The Art of Invisibility: The World\'s Most Famous Hacker Teaches You How to Be Safe',
            en: 'The Art of Invisibility: The World\'s Most Famous Hacker Teaches You How to Be Safe',
          },
          author: 'Kevin Mitnick',
          description: {
            fa: 'نکات امنیتی از معروف‌ترین هکر جهان، شامل بخش‌های مفصل درباره امنیت مالی آنلاین',
            en: 'Security tips from world\'s most famous hacker, including detailed sections on online financial security',
          },
        },
        {
          title: {
            fa: 'Social Engineering: The Science of Human Hacking',
            en: 'Social Engineering: The Science of Human Hacking',
          },
          author: 'Christopher Hadnagy',
          description: {
            fa: 'درک روش‌های روانشناسی کلاهبرداران برای فریب قربانیان',
            en: 'Understanding psychological methods scammers use to deceive victims',
          },
        },
      ],
      videos: [
        {
          title: {
            fa: 'آموزش شناسایی کلاهبرداری آنلاین - پلیس فتا',
            en: 'Online Fraud Detection Tutorial - Cyber Police',
          },
          url: 'https://www.youtube.com/results?search_query=پلیس+فتا+کلاهبرداری',
          platform: 'youtube',
          duration: '10-15 min',
          description: {
            fa: 'ویدیوهای آموزشی رسمی پلیس فتا ایران',
            en: 'Official educational videos from Iran Cyber Police',
          },
        },
        {
          title: {
            fa: 'How Online Payment Systems Work',
            en: 'How Online Payment Systems Work',
          },
          url: 'https://www.youtube.com/results?search_query=how+payment+gateways+work',
          platform: 'youtube',
          duration: '15-20 min',
          description: {
            fa: 'توضیح فنی نحوه کار درگاه‌های پرداخت',
            en: 'Technical explanation of how payment gateways work',
          },
        },
        {
          title: {
            fa: 'Common Online Scams Explained',
            en: 'Common Online Scams Explained',
          },
          url: 'https://www.youtube.com/results?search_query=common+online+scams',
          platform: 'youtube',
          duration: '20-30 min',
          description: {
            fa: 'بررسی کلاهبرداری‌های رایج و نحوه شناسایی',
            en: 'Review of common scams and how to identify them',
          },
        },
        {
          title: {
            fa: 'آموزش امنیت کارت بانکی',
            en: 'Bank Card Security Tutorial',
          },
          url: 'https://www.aparat.com/result/امنیت_کارت_بانکی',
          platform: 'aparat',
          duration: '10-15 min',
          description: {
            fa: 'نکات عملی محافظت از کارت بانکی به فارسی',
            en: 'Practical tips for protecting bank card in Persian',
          },
        },
      ],
    },
  ],
  prerequisites: {
    fa: [
      'آشنایی اولیه با استفاده از اینترنت و مرورگر',
      'داشتن ایمیل و حساب کاربری در شبکه‌های اجتماعی',
      'تمایل به یادگیری و تغییر عادت‌های ناامن',
    ],
    en: [
      'Basic familiarity with internet and browser usage',
      'Having email and social media accounts',
      'Willingness to learn and change unsafe habits',
    ],
  },
  // targetAudience: {
  //   fa: [
  //     'کاربران عادی اینترنت که نگران امنیت خود هستند',
  //     'افرادی که قربانی کلاهبرداری آنلاین شده‌اند',
  //     'والدین که می‌خواهند فرزندان خود را محافظت کنند',
  //     'کسب‌وکارهای کوچک که به تازگی آنلاین شده‌اند',
  //     'سالمندان و افراد کم‌تجربه در فضای دیجیتال',
  //   ],
  //   en: [
  //     'Regular internet users concerned about their security',
  //     'People who have been victims of online fraud',
  //     'Parents who want to protect their children',
  //     'Small businesses newly online',
  //     'Elderly and inexperienced people in digital space',
  //   ],
  // },
  estimatedTotalTime: '30-35 hours',
  difficulty: 'beginner',
  tags: {
    fa: [
      'امنیت',
      'حریم خصوصی',
      'کلاهبرداری',
      'رمز عبور',
      'فیشینگ',
      'VPN',
      'موبایل',
      'مرورگر',
      'خرید آنلاین',
    ],
    en: [
      'security',
      'privacy',
      'fraud',
      'password',
      'phishing',
      'VPN',
      'mobile',
      'browser',
      'online-shopping',
    ],
  },
  certificationInfo: {
    fa: 'پس از تکمیل این مسیر، شما توانایی محافظت از خود و خانواده‌تان در فضای دیجیتال را خواهید داشت و می‌توانید به دیگران نیز آموزش دهید.',
    en: 'After completing this path, you will have the ability to protect yourself and your family in digital space and can teach others as well.',
  },
  nextSteps: {
    fa: [
      'مسیر امنیت پیشرفته (Advanced Security)',
      'مسیر حریم خصوصی دیجیتال (Digital Privacy)',
      'مسیر امنیت شبکه (Network Security)',
    ],
    en: [
      'Advanced Security Path',
      'Digital Privacy Path',
      'Network Security Path',
    ],
  },
    faqs: [
    {
      question: {
        fa: 'چقدر طول می‌کشد تا این مسیر را کامل کنم؟',
        en: 'How long does it take to complete this path?',
      },
      answer: {
        fa: 'با اختصاص 4-5 ساعت در هفته، می‌توانید این مسیر را در 6-8 هفته کامل کنید. این مسیر 7 مرحله دارد و هر مرحله بین 3 تا 6 ساعت زمان می‌برد. البته سرعت یادگیری هر فرد متفاوت است و مهم‌تر از سرعت، درک عمیق و اجرای عملی مطالب است.',
        en: 'With 4-5 hours per week, you can complete this path in 6-8 weeks. This path has 7 stages and each stage takes 3-6 hours. However, learning speed varies for each person, and more important than speed is deep understanding and practical implementation.',
      },
    },
    {
      question: {
        fa: 'آیا نیاز به دانش فنی قبلی دارم؟',
        en: 'Do I need prior technical knowledge?',
      },
      answer: {
        fa: 'خیر، این مسیر برای افراد مبتدی و بدون دانش فنی طراحی شده است. تنها پیش‌نیاز، آشنایی اولیه با استفاده از اینترنت، مرورگر و داشتن ایمیل است. تمام مفاهیم به زبان ساده و با مثال‌های عملی توضیح داده می‌شوند.',
        en: 'No, this path is designed for beginners without technical knowledge. The only prerequisite is basic familiarity with internet usage, browser, and having email. All concepts are explained in simple language with practical examples.',
      },
    },
    {
      question: {
        fa: 'آیا این مسیر برای سالمندان مناسب است؟',
        en: 'Is this path suitable for elderly people?',
      },
      answer: {
        fa: 'بله، این مسیر با زبان ساده و خودمانی نوشته شده و برای تمام سنین مناسب است. سالمندان می‌توانند با کمک فرزندان یا نزدیکان خود این مسیر را طی کنند. توصیه می‌کنیم هر مرحله را با آرامش و در چند نشست کامل کنید.',
        en: 'Yes, this path is written in simple and friendly language and is suitable for all ages. Elderly people can complete this path with help from their children or relatives. We recommend completing each stage calmly and in multiple sessions.',
      },
    },
    {
      question: {
        fa: 'آیا باید تمام مراحل را به ترتیب طی کنم؟',
        en: 'Do I have to complete all stages in order?',
      },
      answer: {
        fa: 'بله، توصیه می‌کنیم مراحل را به ترتیب طی کنید چون هر مرحله بر مرحله قبلی بنا شده است. مثلاً قبل از یادگیری VPN (مرحله 3)، باید مفاهیم رمز عبور و احراز هویت (مرحله 1) را بدانید. اما اگر در یک موضوع خاص مهارت دارید، می‌توانید آن مرحله را رد کنید.',
        en: 'Yes, we recommend completing stages in order as each stage builds on the previous one. For example, before learning VPN (stage 3), you should know password and authentication concepts (stage 1). However, if you are skilled in a specific topic, you can skip that stage.',
      },
    },
    {
      question: {
        fa: 'آیا این آموزش‌ها برای کاربران ایرانی مناسب است؟',
        en: 'Are these tutorials suitable for Iranian users?',
      },
      answer: {
        fa: 'بله، این مسیر با توجه به شرایط و نیازهای کاربران ایرانی طراحی شده است. مثلاً در مرحله 7 به کلاهبرداری‌های رایج در دیوار، اینستاگرام، پیامک‌های بانکی و نماد اعتماد الکترونیکی پرداخته شده است. همچنین منابع فارسی و ویدیوهای آپارات نیز اضافه شده‌اند.',
        en: 'Yes, this path is designed considering conditions and needs of Iranian users. For example, stage 7 covers common scams on Divar, Instagram, bank SMS, and electronic trust symbol. Persian resources and Aparat videos are also included.',
      },
    },
    {
      question: {
        fa: 'اگر قربانی کلاهبرداری شدم چه کار کنم؟',
        en: 'What should I do if I become a victim of fraud?',
      },
      answer: {
        fa: 'فوراً این کارها را انجام دهید: 1) اگر مالی بود، با بانک تماس بگیرید و کارت را مسدود کنید 2) رمزهای عبور حساب‌های مرتبط را تغییر دهید 3) به پلیس فتا (https://cyberpolice.ir) گزارش دهید 4) اسکرین‌شات و مدارک را نگه دارید 5) به دیگران هشدار دهید. در مرحله 7 این مسیر، راهنمای کامل اقدامات پس از کلاهبرداری آمده است.',
        en: 'Do these immediately: 1) If financial, contact bank and block card 2) Change passwords of related accounts 3) Report to Cyber Police (https://cyberpolice.ir) 4) Keep screenshots and documents 5) Warn others. Stage 7 of this path includes complete guide for actions after fraud.',
      },
    },
    {
      question: {
        fa: 'آیا آنتی‌ویروس نیاز دارم؟',
        en: 'Do I need antivirus?',
      },
      answer: {
        fa: 'برای ویندوز، Windows Defender داخلی کافی است اگر به‌روز نگه دارید و از منابع معتبر دانلود کنید. برای مک، نیاز کمتری به آنتی‌ویروس است. برای موبایل (اندروید/iOS)، مهم‌تر از آنتی‌ویروس، دانلود اپلیکیشن فقط از فروشگاه‌های رسمی است. در مرحله 4 این مسیر، امنیت موبایل کامل توضیح داده شده است.',
        en: 'For Windows, built-in Windows Defender is sufficient if you keep it updated and download from trusted sources. For Mac, less need for antivirus. For mobile (Android/iOS), more important than antivirus is downloading apps only from official stores. Stage 4 of this path fully explains mobile security.',
      },
    },
    {
      question: {
        fa: 'چطور بفهمم گوشی‌ام هک شده؟',
        en: 'How do I know if my phone is hacked?',
      },
      answer: {
        fa: 'نشانه‌های هک شدن گوشی: 1) مصرف باتری غیرعادی 2) گرم شدن بیش از حد 3) مصرف اینترنت زیاد بدون دلیل 4) اپلیکیشن‌های ناشناخته 5) پیام‌های ارسالی که شما نفرستادید 6) کندی غیرعادی. در مرحله 4 این مسیر، راهنمای کامل شناسایی و پاکسازی بدافزار موبایل آمده است.',
        en: 'Signs of hacked phone: 1) Unusual battery drain 2) Excessive heating 3) High internet usage without reason 4) Unknown apps 5) Sent messages you didn\'t send 6) Unusual slowness. Stage 4 of this path includes complete guide for detecting and removing mobile malware.',
      },
    },
    {
      question: {
        fa: 'آیا حذف کوکی‌ها امن است؟',
        en: 'Is deleting cookies safe?',
      },
      answer: {
        fa: 'بله، حذف کوکی‌ها امن است اما باعث می‌شود از تمام سایت‌ها خارج شوید و تنظیمات شخصی‌سازی از بین برود. بهتر است به جای حذف کامل، از مرورگر در حالت Incognito/Private استفاده کنید یا کوکی‌های شخص ثالث را مسدود کنید. در مرحله 6 این مسیر، مدیریت کوکی‌ها کامل توضیح داده شده است.',
        en: 'Yes, deleting cookies is safe but will log you out of all sites and remove personalization settings. Instead of complete deletion, better to use browser in Incognito/Private mode or block third-party cookies. Stage 6 of this path fully explains cookie management.',
      },
    },
    {
      question: {
        fa: 'چطور از فیشینگ در تلگرام جلوگیری کنم؟',
        en: 'How do I prevent phishing on Telegram?',
      },
      answer: {
        fa: 'نکات مهم: 1) هیچ‌وقت روی لینک‌های ناشناس کلیک نکنید 2) از کانال‌های تأیید شده (با تیک آبی) استفاده کنید 3) هیچ‌وقت رمز یکبار مصرف را به کسی ندهید 4) تنظیمات حریم خصوصی را فعال کنید 5) احراز هویت دو مرحله‌ای را روشن کنید. در مرحله 2 این مسیر، شناسایی فیشینگ در پیام‌رسان‌ها کامل توضیح داده شده است.',
        en: 'Important tips: 1) Never click unknown links 2) Use verified channels (with blue tick) 3) Never give one-time password to anyone 4) Enable privacy settings 5) Turn on two-factor authentication. Stage 2 of this path fully explains phishing detection in messengers.',
      },
    },
  ],
  tips: {
    fa: [
      'هر روز 30 دقیقه یادگیری بهتر از یک روز 4 ساعت است - ثبات مهم‌تر از سرعت است',
      'تمام آموخته‌ها را همان روز عملی کنید، نه فقط بخوانید - یادگیری بدون عمل فایده ندارد',
      'رمزهای عبور خود را همین امروز تغییر دهید و از مدیر رمز عبور استفاده کنید',
      'احراز هویت دو مرحله‌ای (2FA) را برای ایمیل و حساب‌های بانکی در اولویت فعال کنید',
      'هیچ‌وقت از یک رمز عبور برای چند سایت استفاده نکنید',
      'قبل از کلیک روی هر لینک، 5 ثانیه مکث کنید و آدرس را بررسی کنید',
      'اپلیکیشن‌ها را فقط از Google Play، App Store یا منابع رسمی دانلود کنید',
      'سیستم‌عامل گوشی و کامپیوتر خود را همیشه به‌روز نگه دارید',
      'هر 6 ماه یک‌بار یک «چکاپ امنیتی» برای حساب‌ها و دستگاه‌های خود انجام دهید',
      'اگر چیزی بیش از حد خوب به نظر می‌رسد (سود بالا، جایزه بزرگ)، احتمالاً کلاهبرداری است',
      'اسکرین‌شات و رسید تراکنش‌های مهم را در جای امن نگه دارید',
      'حریم خصوصی شبکه‌های اجتماعی خود را روی حالت Friends/Private تنظیم کنید',
      'با خانواده، مخصوصاً سالمندان، درباره کلاهبرداری‌های رایج صحبت کنید',
      'امنیت یک کار یک‌باره نیست؛ یک عادت روزانه است',
    ],
    en: [
      '30 minutes daily is better than 4 hours once — consistency matters more than speed',
      'Practice everything the same day — learning without action is useless',
      'Change your passwords today and start using a password manager',
      'Enable 2FA first on email and banking accounts',
      'Never reuse the same password across multiple sites',
      'Pause 5 seconds before clicking any link and check the URL',
      'Download apps only from Google Play, App Store, or official sources',
      'Keep your operating system and apps always updated',
      'Avoid banking on public WiFi unless using a trusted VPN',
      'Do not save card details on unknown websites',
      'Do a “security checkup” of your accounts every 6 months',
      'If something looks too good to be true, it probably is a scam',
      'Keep screenshots and receipts of important transactions safely',
      'Set social media privacy to Friends/Private',
      'Talk to family, especially elderly members, about common scams',
      'Security is not a one-time task; it is a daily habit',
    ],
  },

};
