import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, type = 'fade-up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animationClass = visible
    ? type === 'slide-right'
      ? 'animate-slide-in-right'
      : 'animate-fade-up'
    : 'opacity-0 translate-y-3';

  return (
    <div ref={ref} className={`${animationClass} ${className}`} style={{ animationDelay: visible ? `${delay}ms` : undefined }}>
      {children}
    </div>
  );
}


