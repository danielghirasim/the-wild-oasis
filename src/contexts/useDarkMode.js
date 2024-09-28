import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext.jsx';

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error('Context is used outside of provider.');
  return context;
}

export { useDarkMode };
