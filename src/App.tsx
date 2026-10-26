import { useEffect, useRef } from 'react';
import { sectionIds } from './data/navigation';
import { findProject } from './data/projects';
import { routeKey } from './lib/routes';
import { useRoute } from './hooks/useRoute';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTheme } from './hooks/useTheme';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Expertise } from './sections/Expertise';
import { Hero } from './sections/Hero';
import { Journey } from './sections/Journey';
import { Process } from './sections/Process';
import { Projects } from './sections/Projects';

const BASE_TITLE = document.title;

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const route = useRoute();
  const { active, scrolled } = useScrollSpy(sectionIds);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const key = routeKey(route);

  // Runs on load and whenever the page (home vs. a project) changes:
  // - project page: start at the top and move focus to the new content;
  // - home: jump to the #section in the URL. The browser's own jump can happen
  //   before React renders or before web fonts shift the layout, so it is
  //   re-applied once fonts are ready.
  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;

    if (route.name === 'project') {
      document.title = `${findProject(route.slug)?.title ?? 'Project not found'} | Bryan Laserna`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (!isFirst) mainRef.current?.focus({ preventScroll: true });
      return;
    }

    document.title = BASE_TITLE;
    const jump = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else if (!isFirst) window.scrollTo({ top: 0, behavior: 'instant' });
    };
    jump();
    document.fonts?.ready.then(jump);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` captures every route change that matters
  }, [key]);

  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          // Don't change the URL hash: on a project page that would navigate away.
          e.preventDefault();
          mainRef.current?.focus();
        }}
        className="sr-only z-[60] rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar
        active={route.name === 'project' ? 'projects' : active}
        scrolled={scrolled || route.name === 'project'}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main ref={mainRef} id="main" tabIndex={-1} className="outline-none">
        {route.name === 'project' ? (
          <ProjectDetail slug={route.slug} />
        ) : (
          <>
            <Hero />
            <About />
            <Journey />
            <Expertise />
            <Process />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
