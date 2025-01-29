import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // retrieve theme fromlocalStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(`${savedTheme}-theme`);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // change body class
    document.body.classList.remove(`${theme}-theme`);
    document.body.classList.add(`${newTheme}-theme`);

    // save theme in localStorage
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
