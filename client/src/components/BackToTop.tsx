import { useState, useEffect, useRef } from 'react';

export default function BackToTop() {
  const [isShow, setIsShow] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const lockRef = useRef(false);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (lockRef.current) return;

      if (window.scrollY >= 100) {
        if (!isShow) {
          setIsShow(true);
        }
      } else if (isShow) {
        setIsShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isShow]);

  const handleClick = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIsLeaving(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsEnding(true);
    }, 120);

    setTimeout(() => {
      setIsShow(false);
    }, 1500);

    setTimeout(() => {
      lockRef.current = false;
      setIsLeaving(false);
      setIsEnding(false);
    }, 2000);
  };

  return (
    <div
      ref={btnRef}
      data-testid="button-back-to-top"
      className={`back-to-top ${isShow ? 'load' : ''} ${isLeaving ? 'ani-leave' : ''} ${isEnding ? 'ending' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => btnRef.current?.classList.add('hover')}
      onMouseLeave={() => btnRef.current?.classList.remove('hover')}
    />
  );
}