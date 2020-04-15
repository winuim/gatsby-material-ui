export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandomArray = (array: any[]): any  => {
  return array[Math.floor(Math.random() * array.length)];
};

export const times = (n: any) => (f: any) => {
  const iter = (i: any) => {
    if (i === n) return;
    f (i);
    iter (i + 1);
  };
  return iter (0);
};
