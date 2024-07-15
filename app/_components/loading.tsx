import React, { useEffect } from 'react';

const Loading: React.FC = () => {
  useEffect(() => {
    const loader = document.querySelector('.loader') as HTMLElement | null;
    if (loader) {
      window.addEventListener('load', () => {
        loader.classList.add('opacity-0');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 400);
      });
    }
  }, []);

  return (
    <div className="loader fixed inset-0 flex justify-center items-center bg-white">
      {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, index) => (
        <span
          key={index}
          className={`text-green-700 text-6xl md:text-8xl lg:text-9xl font-bold mx-1 animate-pulse`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Loading;
