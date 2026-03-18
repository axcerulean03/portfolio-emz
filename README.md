# Eman Sernal — Portfolio
### Laravel 11 + Inertia.js + React 18 + Tailwind CSS

---

## 📁 Project Structure

```
├── app/
│   └── Http/
│       ├── Controllers/
│       │   ├── PortfolioController.php   ← renders Inertia pages
│       │   └── ContactController.php     ← handles contact form POST
│       ├── Middleware/
│       │   └── HandleInertiaRequests.php ← shares flash + auth to all pages
│       └── Requests/
│           └── ContactRequest.php        ← server-side form validation
│
├── resources/
│   ├── views/
│   │   └── app.blade.php                 ← single Blade root (Inertia entry)
│   ├── css/
│   │   └── app.css                       ← Tailwind + global styles
│   └── js/
│       ├── app.jsx                       ← Inertia bootstrap entry point
│       ├── data/
│       │   └── portfolio.js              ← ✏️  Edit ALL your content here
│       ├── hooks/
│       │   └── useScrollReveal.js        ← IntersectionObserver reveal hook
│       ├── pages/
│       │   └── Home.jsx                  ← Inertia page (maps to GET /)
│       └── components/
│           ├── layout/
│           │   ├── MainLayout.jsx        ← Navbar + Footer wrapper
│           │   ├── Navbar.jsx            ← fixed top nav, scroll-aware
│           │   └── Footer.jsx            ← social links + copyright
│           └── sections/
│               ├── HeroSection.jsx       ← hero with floating card collage
│               ├── ProjectsSection.jsx   ← project grid, accepts DB props
│               ├── DesignsSection.jsx    ← visual gallery
│               ├── AboutSection.jsx      ← bio + skills
│               ├── ResumeSection.jsx     ← timeline + skill bars + CV link
│               └── ContactSection.jsx   ← Inertia useForm contact form
│
└── routes/
    └── web.php                           ← all page + form routes
```

---

## 🚀 Installation

### 1. Create a new Laravel project and copy these files in

```bash
composer create-project laravel/laravel portfolio
cd portfolio
```

Copy the contents of this zip into your Laravel project root.

### 2. Install PHP dependencies

```bash
composer require inertiajs/inertia-laravel
```

### 3. Publish the Inertia middleware

```bash
php artisan inertia:middleware
```

Then register it in `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        \App\Http\Middleware\HandleInertiaRequests::class,
    ]);
})
```

### 4. Install JS dependencies and run Vite

```bash
npm install
npm run dev
```

### 5. Configure your `.env`

```env
APP_NAME="Laura González Portfolio"
APP_URL=http://localhost:8000

# For the contact form email (optional)
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS=hello@lauragonzalez.design
MAIL_FROM_NAME="Laura González"
```

### 6. Serve

```bash
php artisan serve
# In another terminal:
npm run dev
```

Visit `http://localhost:8000` 🎉

---

## ✏️ Customizing Content

**All portfolio content lives in one file:** `resources/js/data/portfolio.js`

- `OWNER` — your name, title, bio, email, socials, location
- `PROJECTS` — your work with images, tags, colors
- `EXPERIENCE` — work history for the resume timeline
- `SKILLS` — your toolset categories

---

## 🔌 Connecting to a Database (optional)

To load projects dynamically from a database instead of the static data file:

**1. Uncomment in `PortfolioController@home`:**
```php
'projects' => \App\Models\Project::latest()->get(),
```

**2. Create the migration:**
```bash
php artisan make:model Project -m
```

**3. The `ProjectsSection` component automatically uses DB props when available,**
falling back to the static file for local dev without a DB.

---

## 📧 Contact Form

The form POSTs to `POST /contact` → `ContactController@store`.

Three options in the controller (uncomment as needed):
- **Mail** — sends via Laravel Mail to your configured address
- **Log** — writes to `storage/logs/laravel.log` (default, great for testing)
- **Database** — saves to a `contact_submissions` table

Validation errors from `ContactRequest` are automatically surfaced in the form.

---

## 🎨 Theme

Edit `tailwind.config.js` to change accent colors:

```js
accent: {
  teal:  '#2dd4bf',  // primary CTA color
  coral: '#f97171',  // secondary
  gold:  '#f5c842',  // tertiary
}
```
