import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches, 'isDarkMode');

  return <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>{children}</DarkModeContext.Provider>;
}

export default DarkModeProvider;

export { DarkModeProvider, DarkModeContext };
