import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const iconStroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function ContactIcon({ children, label }) {
  return (
    <div
      className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full ring-1 ring-amber-800/25 dark:ring-amber-500/35 bg-gradient-to-b from-stone-50 to-stone-100/90 dark:from-neutral-900 dark:to-neutral-950 text-amber-900 dark:text-amber-400"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {children}
    </div>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" {...iconStroke}>
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" {...iconStroke}>
      <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005 5L17.5 12.5 21.5 14v3a2 2 0 01-2 2A15.5 15.5 0 014 6.5a2 2 0 012-2.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" {...iconStroke}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" {...iconStroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.2-4 9s1.5 6.2 4 9" />
    </svg>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full ring-1 ring-stone-300/80 dark:ring-stone-600/80 text-stone-700 dark:text-stone-300 hover:ring-amber-800 dark:hover:ring-amber-500 hover:text-amber-900 dark:hover:text-amber-400 transition-colors duration-300"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.5V7.2c0-.7.5-1.2 1.3-1.2H17V4h-2.2C12.8 4 12 5.4 12 7.5V8.5H10v2.2h2V20h2.2v-9.3H16l.4-2.2h-2.4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" {...iconStroke}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.25" />
      <circle cx="17.2" cy="6.8" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 9.5H4v11h2.5v-11zM5.25 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM9 9.5h2.4v1.5h.03c.33-.63 1.15-1.3 2.37-1.3 2.53 0 3 1.67 3 3.83V20.5H14v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.7H9V9.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-10 h-10 text-amber-800 dark:text-amber-400" viewBox="0 0 24 24" {...iconStroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

const CONTACT_ITEMS = [
  {
    id: 'visit',
    title: 'Visit us',
    icon: <LocationIcon />,
    content: (
      <p className="mj-body-muted text-sm leading-relaxed">
        Laxmin Market<br />
        Ballia, Uttar Pradesh 277001<br />
        India
      </p>
    ),
  },
  {
    id: 'call',
    title: 'Call us',
    icon: <PhoneIcon />,
    content: (
      <p className="mj-body-muted text-sm">
        +91 911-835-9330<br />
        Mon–Sat: 10AM – 8PM
      </p>
    ),
  },
  {
    id: 'email',
    title: 'Email us',
    icon: <MailIcon />,
    content: (
      <p className="mj-body-muted text-sm">
        aman.verma3497924@gmail.com<br />
        av3497924@gmail.com
      </p>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="mj-page relative flex items-center justify-center min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="overflow-hidden"
        >
          <div className="text-center mb-12">
            <motion.p variants={fadeUp} className="mj-eyebrow mb-4">
              Concierge
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl mj-section-title mb-4">
              Get in touch
            </motion.h1>
            <motion.p variants={fadeUp} className="mj-body-muted text-lg">
              We&apos;d love to hear from you
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <motion.div variants={fadeUp} className="mj-panel p-8 md:p-10">
              <h2 className="text-2xl mj-section-title mb-8">Contact information</h2>

              <div className="space-y-8">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-start gap-5">
                    <ContactIcon>{item.icon}</ContactIcon>
                    <div>
                      <h3 className="font-medium text-stone-900 dark:text-white mb-2 text-[11px] uppercase tracking-[0.22em]">
                        {item.title}
                      </h3>
                      {item.content}
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-5">
                  <ContactIcon>
                    <GlobeIcon />
                  </ContactIcon>
                  <div>
                    <h3 className="font-medium text-stone-900 dark:text-white mb-3 text-[11px] uppercase tracking-[0.22em]">
                      Follow us
                    </h3>
                    <div className="flex gap-3">
                      <SocialLink href="#" label="Facebook">
                        <FacebookIcon />
                      </SocialLink>
                      <SocialLink href="#" label="Instagram">
                        <InstagramIcon />
                      </SocialLink>
                      <SocialLink href="#" label="LinkedIn">
                        <LinkedInIcon />
                      </SocialLink>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mj-panel p-8 md:p-10">
              <h2 className="text-2xl mj-section-title mb-8">Send us a message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-full ring-1 ring-amber-800/30 dark:ring-amber-500/40 bg-stone-50 dark:bg-neutral-950">
                    <CheckIcon />
                  </div>
                  <h3 className="text-xl mj-section-title mb-2 text-amber-800 dark:text-amber-400">Thank you</h3>
                  <p className="text-stone-800 dark:text-stone-400 text-center text-sm font-light">
                    Your message has been sent.<br />
                    We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-800 dark:text-stone-400 mb-2">Full name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mj-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-800 dark:text-stone-400 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mj-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-800 dark:text-stone-400 mb-2">Your message *</label>
                    <textarea
                      name="message"
                      placeholder="Tell us how we can help you…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mj-input resize-none min-h-[140px]"
                      rows="5"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full mj-btn-primary py-4 rounded-lg text-[11px] uppercase shadow-md"
                  >
                    Send message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-10 mj-panel p-8 text-center">
            <h3 className="text-xl mj-section-title mb-3">Visit our showroom</h3>
            <p className="text-stone-800 dark:text-stone-400 text-sm font-light mb-6 max-w-2xl mx-auto">
              Experience our collections in person. Our consultants can help you find the perfect piece.
            </p>
            <div className="bg-stone-100 dark:bg-slate-800/80 h-56 md:h-64 rounded-lg flex items-center justify-center ring-1 ring-stone-200/80 dark:ring-slate-700">
              <p className="text-stone-500 dark:text-stone-500 text-sm uppercase tracking-wider">Map placeholder</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
