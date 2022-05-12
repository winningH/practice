// 冒泡排序
function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

// 选择排序
// 从未排序的序列中找到最大的（或最小的）放在已排序列的末尾（为空则放在起始位置）
// 重复该操作，直到所有数据都已经放入已排序序列中
function selectionSort(arr) {
  let len = arr.length,
    minIndex,
    temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
}

// let arr = [2, 5, 1, 0, 9, 6, 3, 10, 8]

// 插入排序:
// 通过构建有序序列，对于未排序数据，在已排序列中从后向前扫描，找到响应位置并插入
function insertionSort(arr) {
  let len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}
