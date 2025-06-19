export function removeDuplicatedIds(arr: number[]) {
  const reducedArr: number[] = arr.filter((id, idx, arr) => {
      const nextId = arr[idx + 1] as number; 
      return !nextId || id !== nextId;
    });

  return reducedArr;
};