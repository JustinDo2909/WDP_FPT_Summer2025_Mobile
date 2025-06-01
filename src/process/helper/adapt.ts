
export  function Array2Enum<T extends readonly string[]>(arr: T) {
  return Object.fromEntries(arr.map((key) => [key, key])) as {
    [K in T[number]]: K;
  };
}

