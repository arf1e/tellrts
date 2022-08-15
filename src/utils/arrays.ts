export const toggleArrayElement = (arr: any[], element: any): any[] => {
  const arrayContainsElement = arr.includes(element);
  if (arrayContainsElement) {
    return arr.filter(elt => elt !== element);
  }

  return [...arr, element];
};
