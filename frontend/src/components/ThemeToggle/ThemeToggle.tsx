import useTheme from '../../hooks/useTheme';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme} className={styles.button}>
      {theme === 'light' ? 'Lights out' : 'Lights up'}
    </button>
  );
};

export default ThemeToggle;