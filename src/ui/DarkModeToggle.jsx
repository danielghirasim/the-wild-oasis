import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import { useEffect } from 'react';
import { useDarkMode } from '../contexts/useDarkMode.js';

function DarkModeToggle() {
  const { isDarkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    document.querySelector('html').classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return <ButtonIcon onClick={() => setDarkMode((mode) => !mode)}>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>;
}

export default DarkModeToggle;
