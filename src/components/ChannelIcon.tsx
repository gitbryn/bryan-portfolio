import { Code, Link2, Mail, type LucideProps } from 'lucide-react';
import type { ChannelKind } from '../lib/links';

const icons = { email: Mail, linkedin: Link2, github: Code };

export function ChannelIcon({ kind, ...props }: { kind: ChannelKind } & LucideProps) {
  const Icon = icons[kind];
  return <Icon aria-hidden="true" {...props} />;
}
