import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CircleAlert, Download, Info } from 'lucide-react';
import { channels, contactEmail, isEmail, resumeLink } from '../lib/links';
import { ChannelIcon } from '../components/ChannelIcon';
import { Reveal } from '../components/Reveal';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (!f.name.trim()) errors.name = 'Please enter your name.';
  if (!f.email.trim()) errors.email = 'Please enter your email address.';
  else if (!isEmail(f.email)) errors.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.';
  return errors;
}

const inputClass =
  'mt-2 w-full rounded-xl border bg-bg-2 px-4 py-3 text-[15px] text-fg placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-accent-soft';

/**
 * Only rendered when a contact email is configured. It hands the message to the
 * visitor's own email app — nothing is sent from the site.
 */
function MessageForm({ to }: { to: string }) {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setOpened(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name.trim()}`);
    const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  const fieldProps = (key: keyof Fields) => ({
    id: `contact-${key}`,
    name: key,
    value: fields[key],
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    className: `${inputClass} ${errors[key] ? 'border-red-400' : 'border-line'}`,
  });

  const error = (key: keyof Fields) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="mt-2 flex items-center gap-1.5 text-[13px] text-red-400">
        <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
        {errors[key]}
      </p>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <p className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
        This form doesn't send messages from the site. Submitting opens your own email app with the message filled in.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-[14px] font-semibold text-fg">
            Name
          </label>
          <input type="text" autoComplete="name" onChange={(e) => update('name', e.target.value)} {...fieldProps('name')} />
          {error('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-[14px] font-semibold text-fg">
            Email
          </label>
          <input type="email" autoComplete="email" onChange={(e) => update('email', e.target.value)} {...fieldProps('email')} />
          {error('email')}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="text-[14px] font-semibold text-fg">
          Message
        </label>
        <textarea rows={5} onChange={(e) => update('message', e.target.value)} {...fieldProps('message')} />
        {error('message')}
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
      >
        Open in email app
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </button>
      <div aria-live="polite">
        {opened && (
          <p className="rounded-xl border border-accent-line bg-accent-soft px-4 py-3 text-[14px] text-fg">
            Your email app should open with this message ready. It's only sent once you send it from there.
          </p>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  const hasLinks = channels.length > 0 || resumeLink !== null;
  // With a form, use a two-column layout; otherwise centre the call to action.
  const split = contactEmail !== null;
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-line-soft py-24 md:py-32"
    >
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className={`grid gap-12 ${split ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16' : ''}`}>
          <Reveal className={split ? '' : 'mx-auto max-w-2xl text-center'}>
            <p
              className={`flex items-center gap-3 font-mono text-[12px] font-medium tracking-[0.18em] text-accent uppercase ${
                split ? '' : 'justify-center'
              }`}
            >
              <span className="h-px w-8 bg-accent-line" aria-hidden="true" />
              Contact
              {!split && <span className="h-px w-8 bg-accent-line" aria-hidden="true" />}
            </p>
            <h2
              id="contact-title"
              className="mt-4 font-display text-4xl leading-[1.1] font-extrabold tracking-tight text-fg sm:text-5xl"
            >
              Let's build <span className="text-accent">better software.</span>
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Interested in collaborating or discussing quality engineering opportunities? Let's connect.
            </p>

            {hasLinks ? (
              <div className={`mt-9 flex flex-col gap-3 ${split ? '' : 'items-center'}`}>
                <ul className={`flex flex-wrap gap-3 ${split ? '' : 'justify-center'}`}>
                  {channels.map((c) => (
                    <li key={c.kind}>
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent-line"
                      >
                        <ChannelIcon kind={c.kind} className="size-[18px] text-accent" />
                        <span className="text-left">
                          <span className="block text-[13px] font-semibold text-fg">{c.label}</span>
                          <span className="block max-w-[16rem] truncate text-[13px] text-muted">{c.display}</span>
                        </span>
                        {c.external && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  ))}
                </ul>
                {resumeLink && (
                  <a
                    href={resumeLink}
                    download
                    className="inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download résumé
                  </a>
                )}
              </div>
            ) : (
              <p className="mx-auto mt-9 w-fit rounded-xl border border-line bg-surface px-5 py-3 text-[14.5px] text-muted">
                Contact details will be published here shortly.
              </p>
            )}
          </Reveal>

          {contactEmail && (
            <Reveal delay={120}>
              <MessageForm to={contactEmail} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
