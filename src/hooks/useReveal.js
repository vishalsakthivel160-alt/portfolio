import { useEffect, useRef } from "react";

// Attaches an IntersectionObserver to all .reveal elements inside the container.
// Each element animates smoothly when it individually enters the viewport as the user scrolls.
// Respects prefers-reduced-motion for accessibility.
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const elements = Array.from(node.querySelectorAll(".reveal"));
    if (node.classList.contains("reveal")) {
      elements.push(node);
    }

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    const timer = setTimeout(() => {
      const currentElements = Array.from(node.querySelectorAll(".reveal"));
      if (node.classList.contains("reveal")) currentElements.push(node);
      currentElements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return { ref };
}
