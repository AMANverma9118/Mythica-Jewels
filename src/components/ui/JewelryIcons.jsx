import React from 'react';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconShield({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path {...stroke} d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconGem({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M12 2l8 6-8 14L4 8l8-6z" />
      <path {...stroke} d="M4 8h16M12 2v20" />
    </svg>
  );
}

export function IconReturn({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M4 12a8 8 0 0114-5.3M20 7v5h-5" />
      <path {...stroke} d="M20 12a8 8 0 01-14 5.3M4 17v-5h5" />
    </svg>
  );
}

export function IconCraft({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M12 3v3M6 8l2 2M18 8l-2 2M8 14h8M10 18h4" />
      <circle {...stroke} cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconLocation({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle {...stroke} cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconPhone({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M6 4h4l2 5-2.5 1.5a11 11 0 005 5L17 13l5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" />
    </svg>
  );
}

export function IconMail({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M4 6h16v12H4V6z" />
      <path {...stroke} d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function IconLock({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect {...stroke} x="5" y="11" width="14" height="10" rx="2" />
      <path {...stroke} d="M8 11V8a4 4 0 118 0v3" />
    </svg>
  );
}

export function IconTruck({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M3 7h11v8H3V7zM14 10h4l3 3v2h-7v-5z" />
      <circle {...stroke} cx="7" cy="17" r="2" />
      <circle {...stroke} cx="18" cy="17" r="2" />
    </svg>
  );
}

export function BrandMark({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M50 10 L30 30 L20 30 L20 50 L10 60 L50 90 L90 60 L80 50 L80 30 L70 30 Z" />
      <path d="M50 30 L40 40 L40 50 L50 60 L60 50 L60 40 Z" fill="white" opacity="0.25" />
    </svg>
  );
}

export const PDP_TRUST = [
  { Icon: IconShield, label: 'Certified authentic' },
  { Icon: IconGem, label: 'Ethically sourced' },
  { Icon: IconReturn, label: 'Easy returns' },
  { Icon: IconCraft, label: 'Lifetime craftsmanship' },
];
