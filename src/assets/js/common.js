// 冒泡排序
export function bubbleSort({ arr, sortName, order }) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (sortName) {
        if (!order) {
          if (arr[j][sortName] > arr[j + 1][sortName]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        } else {
          if (arr[j][sortName] < arr[j + 1][sortName]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      } else {
        if (!order) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        } else {
          if (arr[j] < arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
    }
  }
  return arr;
}
export default {
  bubbleSort
};
