import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import { IconLock, IconShield, IconTruck, IconReturn, IconLocation, IconPhone, IconMail } from '../ui/JewelryIcons';

const FOOTER_TRUST = [
  { Icon: IconLock, label: 'Secure payment' },
  { Icon: IconShield, label: 'Certified authentic' },
  { Icon: IconTruck, label: 'Complimentary shipping' },
  { Icon: IconReturn, label: 'Easy returns' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-5">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed font-light max-w-xs">
              Crafting timeless elegance and celebrating life&apos;s precious moments since 1990.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium mb-5 text-stone-400 uppercase tracking-[0.25em]">
              Quick links
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About us' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-stone-500 hover:text-stone-200 transition-colors text-sm font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-medium mb-5 text-stone-400 uppercase tracking-[0.25em]">
              Customer service
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              {['Shipping & delivery', 'Returns & exchanges', 'Size guide', 'FAQs'].map((label) => (
                <li key={label}>
                  <span className="text-stone-500 hover:text-stone-300 transition-colors cursor-default">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-medium mb-5 text-stone-400 uppercase tracking-[0.25em]">
              Contact
            </h3>
            <ul className="space-y-4 text-sm font-light text-stone-500">
              <li className="flex items-start gap-3">
                <IconLocation className="w-4 h-4 mt-0.5 shrink-0 text-stone-500" />
                <span>
                  Laxmi Market,
                  <br />
                  Ballia, Uttar Pradesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone className="w-4 h-4 shrink-0 text-stone-500" />
                <span>+91 911-835-9330</span>
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="w-4 h-4 shrink-0 text-stone-500" />
                <a
                  href="mailto:aman.verma3497924@gmail.com"
                  className="hover:text-stone-200 transition-colors break-all"
                >
                  aman.verma3497924@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-stone-500 text-sm font-light text-center md:text-left">
              © {currentYear}{' '}
              <span className="text-stone-300">MYTHICA JEWELS™</span>. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-light">
              {['Privacy policy', 'Terms & conditions', 'Cookie policy'].map((label) => (
                <span key={label} className="text-stone-500 hover:text-stone-300 transition-colors cursor-default">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {FOOTER_TRUST.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 border border-stone-800 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-stone-500"
            >
              <Icon className="w-3.5 h-3.5 text-stone-500" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
