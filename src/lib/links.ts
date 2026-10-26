import { profile } from '../data/profile';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

/** Returns the URL only if it is a valid absolute https:// URL. */
export function httpsUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).protocol === 'https:' ? value : null;
  } catch {
    return null;
  }
}

/** A site-relative path (e.g. '/resume.pdf') or an https URL. */
function resumeHref(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  return httpsUrl(value);
}

export type ChannelKind = 'email' | 'linkedin' | 'github';

export interface Channel {
  kind: ChannelKind;
  label: string;
  display: string;
  href: string;
  external: boolean;
}

const { email, linkedin, github, resumeUrl } = profile.contact;

export const contactEmail = email && isEmail(email) ? email.trim() : null;

/** Only properly configured contact channels — nothing is shown for missing ones. */
export const channels: Channel[] = [
  contactEmail && {
    kind: 'email' as const,
    label: 'Email',
    display: contactEmail,
    href: `mailto:${contactEmail}`,
    external: false,
  },
  httpsUrl(linkedin) && {
    kind: 'linkedin' as const,
    label: 'LinkedIn',
    display: linkedin!.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: linkedin!,
    external: true,
  },
  httpsUrl(github) && {
    kind: 'github' as const,
    label: 'GitHub',
    display: github!.replace(/^https:\/\//, '').replace(/\/$/, ''),
    href: github!,
    external: true,
  },
].filter((c): c is Channel => Boolean(c));

export const resumeLink = resumeHref(resumeUrl);
