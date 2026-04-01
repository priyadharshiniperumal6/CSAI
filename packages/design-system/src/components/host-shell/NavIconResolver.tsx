import type { ReactNode } from 'react';

import type { NavIconToken } from '../../types/side-nav';

type NavIconSvgProps = {
  children: ReactNode;
  name: string;
};

const warnedIcons = new Set<string>();

const NavIconSvg = ({ children, name }: NavIconSvgProps) => (
  <svg
    aria-hidden="true"
    data-nav-icon={name}
    fill="none"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.75"
    viewBox="0 0 20 20"
    width="1em"
  >
    {children}
  </svg>
);

const TOKEN_MAP: Record<NavIconToken, ReactNode> = {
  insights: (
    <NavIconSvg name="insights">
      <path d="M4 15V9" />
      <path d="M10 15V5" />
      <path d="M16 15v-3" />
      <path d="M3 16h14" />
    </NavIconSvg>
  ),
  studio: (
    <NavIconSvg name="studio">
      <path d="M7 5L3.5 10 7 15" />
      <path d="M13 5l3.5 5-3.5 5" />
      <path d="M11 4l-2 12" />
    </NavIconSvg>
  ),
  cloud: (
    <NavIconSvg name="cloud">
      <path d="M6.5 15.5h7.25a3.25 3.25 0 0 0 .5-6.46 4.5 4.5 0 0 0-8.64 1.13A2.9 2.9 0 0 0 6.5 15.5Z" />
    </NavIconSvg>
  ),
  admin: (
    <NavIconSvg name="admin">
      <circle cx="10" cy="10" r="2.75" />
      <path d="M10 3.5v1.5" />
      <path d="M10 15v1.5" />
      <path d="M3.5 10H5" />
      <path d="M15 10h1.5" />
      <path d="m5.2 5.2 1.1 1.1" />
      <path d="m13.7 13.7 1.1 1.1" />
      <path d="m14.8 5.2-1.1 1.1" />
      <path d="m6.3 13.7-1.1 1.1" />
    </NavIconSvg>
  ),
  agents: (
    <NavIconSvg name="agents">
      <circle cx="6" cy="10" r="2" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="14" cy="14" r="2" />
      <path d="M7.8 9.1 12.2 6.9" />
      <path d="M7.8 10.9l4.4 2.2" />
    </NavIconSvg>
  ),
  skills: (
    <NavIconSvg name="skills">
      <path d="m10 3 1.6 3.3 3.6.5-2.6 2.5.6 3.7L10 11.3 6.8 14l.6-3.7L4.8 7.8l3.6-.5Z" />
    </NavIconSvg>
  ),
  tests: (
    <NavIconSvg name="tests">
      <path d="M6 5.5h8" />
      <path d="M6 10h8" />
      <path d="M6 14.5h5" />
      <path d="m3.8 5.5.9.9 1.6-1.8" />
      <path d="m3.8 10 .9.9 1.6-1.8" />
      <path d="m3.8 14.5.9.9 1.6-1.8" />
    </NavIconSvg>
  ),
  deploy: (
    <NavIconSvg name="deploy">
      <path d="M10 15V4.5" />
      <path d="m6.5 8 3.5-3.5L13.5 8" />
      <path d="M4.5 15.5h11" />
    </NavIconSvg>
  ),
  channels: (
    <NavIconSvg name="channels">
      <circle cx="4.5" cy="6" r="1.5" />
      <circle cx="15.5" cy="6" r="1.5" />
      <circle cx="10" cy="14" r="1.5" />
      <path d="M6 6h8" />
      <path d="m5.4 7.1 3.3 5.1" />
      <path d="m14.6 7.1-3.3 5.1" />
    </NavIconSvg>
  ),
  users: (
    <NavIconSvg name="users">
      <circle cx="7" cy="8" r="2.25" />
      <path d="M3.8 15c.6-2 2.1-3 3.9-3s3.3 1 3.9 3" />
      <circle cx="13.5" cy="8.5" r="1.75" />
      <path d="M12 14.6c.4-1.4 1.6-2.2 3-2.2 1.1 0 2 .4 2.6 1.3" />
    </NavIconSvg>
  ),
  compliance: (
    <NavIconSvg name="compliance">
      <path d="M10 3.5 15.5 6v3.7c0 3.1-2.1 5.9-5.5 6.8-3.4-.9-5.5-3.7-5.5-6.8V6Z" />
      <path d="m7.5 10 1.7 1.7 3.3-3.4" />
    </NavIconSvg>
  ),
  health: (
    <NavIconSvg name="health">
      <path d="M3.5 10h3l1.5-3 2 6 1.8-4h4.7" />
    </NavIconSvg>
  ),
  integrations: (
    <NavIconSvg name="integrations">
      <rect height="4" rx="1" width="4" x="3" y="8" />
      <rect height="4" rx="1" width="4" x="13" y="3" />
      <rect height="4" rx="1" width="4" x="13" y="13" />
      <path d="M7 10h3" />
      <path d="m10 10 3-5" />
      <path d="m10 10 3 5" />
    </NavIconSvg>
  ),
  knowledge: (
    <NavIconSvg name="knowledge">
      <path d="M5 4.5h8.5a1.5 1.5 0 0 1 1.5 1.5v9H6.5A1.5 1.5 0 0 0 5 16.5Z" />
      <path d="M5 4.5v12" />
      <path d="M8 7.5h4.5" />
      <path d="M8 10h4.5" />
    </NavIconSvg>
  ),
  models: (
    <NavIconSvg name="models">
      <path d="m10 3.5 5.5 3.2v6.6L10 16.5l-5.5-3.2V6.7Z" />
      <path d="M10 3.5v13" />
      <path d="m4.5 6.7 5.5 3.3 5.5-3.3" />
    </NavIconSvg>
  ),
  data: (
    <NavIconSvg name="data">
      <ellipse cx="10" cy="5.5" rx="4.5" ry="2" />
      <path d="M5.5 5.5v7c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-7" />
      <path d="M5.5 9c0 1.1 2 2 4.5 2s4.5-.9 4.5-2" />
    </NavIconSvg>
  ),
  reports: (
    <NavIconSvg name="reports">
      <path d="M6 3.5h6l3 3V16.5H6Z" />
      <path d="M12 3.5v3h3" />
      <path d="M8 12.5V10" />
      <path d="M10.5 12.5V8.5" />
      <path d="M13 12.5V11" />
    </NavIconSvg>
  ),
  benchmarks: (
    <NavIconSvg name="benchmarks">
      <circle cx="10" cy="10" r="5.5" />
      <circle cx="10" cy="10" r="2.25" />
      <path d="m10 10 3.5-3.5" />
    </NavIconSvg>
  ),
};

const fallbackIcon = (
  <NavIconSvg name="fallback">
    <circle cx="10" cy="10" r="6.25" />
    <path d="M10 7v3.5" />
    <circle cx="10" cy="13.5" r=".75" fill="currentColor" stroke="none" />
  </NavIconSvg>
);

const isLegacyMaterialSymbolIcon = (icon: string) => /^[a-z0-9_]+$/.test(icon);

export function resolveNavIcon(icon: ReactNode | NavIconToken): ReactNode {
  if (typeof icon !== 'string') {
    return icon;
  }

  if (icon in TOKEN_MAP) {
    return TOKEN_MAP[icon as NavIconToken];
  }

  if (isLegacyMaterialSymbolIcon(icon)) {
    return (
      <span
        aria-hidden="true"
        className="material-symbols-outlined"
        data-nav-icon={icon}
        style={{ fontSize: 'inherit' }}
      >
        {icon}
      </span>
    );
  }

  if (!warnedIcons.has(icon)) {
    warnedIcons.add(icon);
    console.warn(`[HostShell] Unknown NavIconToken: "${icon}". Using fallback icon.`);
  }

  return fallbackIcon;
}
