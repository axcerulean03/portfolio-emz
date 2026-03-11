import { useForm } from '@inertiajs/react'
import { Send, Linkedin, Instagram, Github } from 'lucide-react'
import { OWNER } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * ContactSection
 *
 * Uses Inertia's useForm hook to POST to the Laravel ContactController.
 * Flash messages from the controller are shown on success.
 *
 * Laravel route:   Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
 * Controller:      ContactController@store  (see app/Http/Controllers/ContactController.php)
 */
export default function ContactSection({ flash = {} }) {
  const { ref, isVisible } = useScrollReveal()

  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    name:    '',
    email:   '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('contact.store'), {
      onSuccess: () => reset(),
    })
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="section-label">Get in touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            Let's start a<br />
            <em className="text-accent-teal not-italic">project together</em>
          </h2>
          <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
            Whether you have a project in mind, a question, or just want to say hi —
            my inbox is always open.
          </p>

          <a
            href={`mailto:${OWNER.email}`}
            className="inline-block font-mono text-sm text-accent-teal hover:text-teal-300 transition-colors mb-10"
          >
            {OWNER.email}
          </a>

          <div className="flex items-center gap-6">
            {[
              { Icon: Linkedin,  href: OWNER.socials.linkedin,  label: 'LinkedIn'  },
              { Icon: Instagram, href: OWNER.socials.instagram, label: 'Instagram' },
              { Icon: Github,    href: OWNER.socials.behance,   label: 'Behance'   },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-accent-teal transition-colors text-xs font-mono"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div
          className={`card-glass p-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Laravel flash success message */}
          {(wasSuccessful || flash?.success) && (
            <div className="mb-6 p-4 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-sm font-mono">
              ✓ {flash?.success ?? 'Message sent! I\'ll get back to you soon.'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FormField
              label="Your name"
              name="name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              placeholder="Jane Doe"
              error={errors.name}
              required
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="jane@example.com"
              error={errors.email}
              required
            />
            <div>
              <label className="text-xs font-mono text-white/40 tracking-widest uppercase block mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={data.message}
                onChange={e => setData('message', e.target.value)}
                placeholder="Tell me about your project…"
                rows={5}
                required
                className={`w-full bg-dark-900/60 border rounded-xl px-4 py-3 text-sm text-white
                            placeholder-white/20 resize-none focus:outline-none transition-colors ${
                  errors.message
                    ? 'border-accent-coral/50 focus:border-accent-coral'
                    : 'border-white/10 focus:border-accent-teal/50'
                }`}
              />
              {errors.message && <p className="text-xs text-accent-coral mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="btn-teal flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {processing ? 'Sending…' : <><span>Send message</span><Send size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, value, onChange, placeholder, type = 'text', required, error }) {
  return (
    <div>
      <label className="text-xs font-mono text-white/40 tracking-widest uppercase block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-dark-900/60 border rounded-xl px-4 py-3 text-sm text-white
                    placeholder-white/20 focus:outline-none transition-colors ${
          error
            ? 'border-accent-coral/50 focus:border-accent-coral'
            : 'border-white/10 focus:border-accent-teal/50'
        }`}
      />
      {error && <p className="text-xs text-accent-coral mt-1">{error}</p>}
    </div>
  )
}
