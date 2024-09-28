import { useEffect, useRef } from 'react';

function useClickOutside(handler, listenCapturing = 'false') {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useClickOutside;
