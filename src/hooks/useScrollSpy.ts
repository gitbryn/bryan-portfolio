import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in the reading zone of the viewport,
 * and whether the page has been scrolled past the top.
 */
export function useScrollSpy<T extends string>(ids: T[]) {
  const [active, setActive] = useState(ids[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }
      // The active section is the last one whose top has passed 35% of the viewport.
      const line = window.innerHeight * 0.35;
      let current: T = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return { active, scrolled };
}
