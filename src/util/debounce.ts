const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait) as NodeJS.Timeout;
  };
};

export default debounce;
