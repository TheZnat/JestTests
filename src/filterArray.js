export function filterArray(arr, fnCallback) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (fnCallback(arr[i])) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}
