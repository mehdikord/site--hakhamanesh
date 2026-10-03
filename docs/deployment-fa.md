# استقرار روی لینوکس با systemd و npm start

این راهنما برای یک سرور/یک فرایند Next.js است. پیش‌نیازها: **Node.js 24 LTS نصب‌شدهٔ سیستمی**، npm، systemd و در صورت استفاده از دامنه Nginx و TLS. حداقل دو گیگابایت RAM برای build پیشنهاد می‌شود.

## ۱. کاربر و مسیرها

با دسترسی مدیریتی، فقط اگر کاربر از قبل وجود ندارد:

```bash
sudo useradd --system --create-home --home-dir /var/lib/hakhamanesh --shell /usr/sbin/nologin hakhamanesh
sudo mkdir -p /opt/hakhamanesh /var/lib/hakhamanesh/requests
```

محتوای پوشهٔ پروژه را در `/opt/hakhamanesh` کپی کنید؛ `package.json` باید مستقیم داخل همین مسیر باشد. سپس:

```bash
sudo chown -R hakhamanesh:hakhamanesh /opt/hakhamanesh /var/lib/hakhamanesh
sudo chmod 700 /var/lib/hakhamanesh /var/lib/hakhamanesh/requests
node --version
command -v node
command -v npm
```

مسیر npm در فایل سرویس باید با نتیجهٔ `command -v npm` یکسان باشد. نصب nvm داخل home کاربر شخصی برای این فایل سرویس مناسب نیست؛ systemd پوستهٔ تعاملی و `.bashrc` را بارگذاری نمی‌کند و `ProtectHome=true` است.

## ۲. نصب، تنظیم و build

```bash
sudo -u hakhamanesh -H sh -c 'cd /opt/hakhamanesh && npm ci && npm run setup'
sudo -u hakhamanesh nano /opt/hakhamanesh/.env.local
```

در فایل محیطی:

- `SITE_URL=https://دامنه-واقعی` با دامنهٔ معتبر؛
- `DATA_DIR=/var/lib/hakhamanesh/requests`؛
- `LEADS_ENCRYPTION_KEY` همان کلید تصادفی ساخته‌شده با setup؛
- `TRUST_PROXY=1` در صورت استفاده از Nginx نمونه؛
- URLهای عمومی شبکه‌های اجتماعی در صورت وجود.

```bash
sudo chmod 600 /opt/hakhamanesh/.env.local
sudo -u hakhamanesh -H sh -c 'cd /opt/hakhamanesh && npm run check && npm run build'
```

**قبل از build از `npm ci --omit=dev` استفاده نکنید**؛ Tailwind، TypeScript و ابزارهای build لازم‌اند. پوشهٔ `.next` باید روی همین سرور یا محیط هم‌معماری ساخته شود. بستهٔ ZIP عمداً `node_modules`، `.next` و کلید خصوصی ندارد.

## ۳. نصب و اجرای سرویس

```bash
sudo cp /opt/hakhamanesh/deployment/hakhamanesh.service /etc/systemd/system/hakhamanesh.service
sudo systemctl daemon-reload
sudo systemctl enable --now hakhamanesh
sudo systemctl status hakhamanesh --no-pager
curl --fail http://127.0.0.1:3000/api/health
```

پاسخ health باید `{"status":"ok"}` باشد. این endpoint زنده بودن برنامه را نشان می‌دهد، نه سلامت دیسک/ثبت فرم. بعد از نصب، یک درخواست آزمایشی هم ثبت و با دستور زیر بررسی کنید:

```bash
sudo -u hakhamanesh -H sh -c 'cd /opt/hakhamanesh && npm run requests'
```

خروجی این دستور حاوی اطلاعات مشتری است؛ آن را در لاگ عمومی، چت یا مخزن کد قرار ندهید.

لاگ و کنترل سرویس:

```bash
sudo journalctl -u hakhamanesh -n 100 --no-pager
sudo journalctl -u hakhamanesh -f
sudo systemctl restart hakhamanesh
sudo systemctl stop hakhamanesh
```

`ExecStart` دقیقاً `npm start` است. سرویس build نمی‌کند؛ build باید پیش از راه‌اندازی یا پس از هر تغییر کد انجام شده باشد.

## ۴. Nginx و HTTPS

```bash
sudo cp /opt/hakhamanesh/deployment/nginx.conf /etc/nginx/sites-available/hakhamanesh
sudo nano /etc/nginx/sites-available/hakhamanesh
# your-domain.example را با دامنهٔ واقعی عوض کنید.
sudo ln -s /etc/nginx/sites-available/hakhamanesh /etc/nginx/sites-enabled/hakhamanesh
sudo nginx -t
sudo systemctl reload nginx
```

اگر symlink از قبل وجود دارد دوباره نسازید. DNS باید به همین سرور اشاره کند. سپس برای دامنه گواهی TLS معتبر تهیه کنید، HTTPS را فعال و HTTP را به HTTPS هدایت کنید. قبل از فعال بودن TLS، فرم حاوی اطلاعات واقعی مشتری را استفاده نکنید.

**پورت 3000 را با فایروال سرور از اینترنت عمومی مسدود نگه دارید** و فقط Nginx به آن دسترسی داشته باشد؛ برنامه طبق `npm start` روی `0.0.0.0` گوش می‌کند. تنظیم فایروال باید بدون قطع دسترسی SSH و متناسب با سیاست سرور انجام شود.

Nginx نمونه هدرهای `X-Real-IP` و `X-Forwarded-Host` را خودش تعیین می‌کند. تنها در این حالت `TRUST_PROXY=1` معتبر است. اگر CDN یا reverse proxy دیگری جلوی Nginx دارید، real IP را فقط از محدوده‌های مورد اعتماد آن سرویس بپذیرید.

## ۵. داده، پشتیبان‌گیری و حریم خصوصی

- داده‌های فرم در `/var/lib/hakhamanesh/requests`، خارج از فایل‌های عمومی و کد برنامه هستند.
- هر فایل با AES-256-GCM و nonce مجزا رمز شده؛ کلید فقط در محیط سرور است.
- از پوشهٔ داده و کلید به‌صورت امن و با دسترسی محدود بکاپ بگیرید. بازیابی را هم آزمایش کنید.
- با استقرار نسخهٔ جدید، کلید قبلی و داده‌ها را حفظ کنید. تغییر خودسرانهٔ کلید داده‌های قبلی را غیرقابل خواندن می‌کند.
- برای حذف درخواست یک مشتری، مدیر مجاز پس از شناسایی کد، فایل متناظر را از دادهٔ اصلی و مطابق سیاست نگهداری از بکاپ‌ها حذف کند. حذف/لغو عضویت در این نسخه پنل عمومی ندارد.
- محدودیت نرخ برنامه برای **یک فرایند** در حافظه نگهداری می‌شود؛ برای چند instance، آن را به Redis/سرویس مشترک انتقال دهید. به‌تنهایی جای WAF یا دفاع جامع ضداسپم را نمی‌گیرد.
- نبود کلید/مجوز نوشتن/فضای دیسک موجب پاسخ 503 فرم‌ها می‌شود؛ لاگ سرویس را بررسی کنید. خطا، پیام موفقیت نمایشی تولید نمی‌کند.
- این نسخه ایمیل/پیامک/خبرنامه ارسال نمی‌کند. برای عملیات واقعی، درخواست‌های ثبت‌شده باید در فرایند داخلی مجموعه یا CRM مصرف شوند.

## ۶. به‌روزرسانی ساده

در پنجرهٔ نگهداری، بکاپ گرفته و سرویس را متوقف کنید؛ **هنگام اجرا، پوشهٔ `.next` همان instance را جایگزین نکنید**:

```bash
sudo systemctl stop hakhamanesh
# کد جدید را کپی کنید؛ .env.local و /var/lib/hakhamanesh را حفظ کنید.
sudo -u hakhamanesh -H sh -c 'cd /opt/hakhamanesh && npm ci && npm run check && npm run build'
sudo systemctl start hakhamanesh
curl --fail http://127.0.0.1:3000/api/health
```

برای استقرار بدون وقفه، release directory و تعویض کنترل‌شدهٔ symlink/دو instance لازم است؛ فایل حاضر عمداً سناریوی سادهٔ تک‌سرویس را پوشش می‌دهد.

## دامنهٔ بررسی این تحویل

`npm run build` و `npm start` در لینوکس اجرا و صفحات/API در مرورگر آزمایش شدند. فایل‌های systemd و Nginx نمونهٔ آمادهٔ استقرار هستند؛ روی سرور واقعی شما نصب نشده‌اند و اجرای `systemctl` در محیط ساخت این تحویل انجام نشده است.
