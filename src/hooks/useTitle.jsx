import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Safe Harbour | ${title}`;
  });
  return null;
};

export default useTitle;
