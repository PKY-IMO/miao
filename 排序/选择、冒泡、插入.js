//选择排序：每一趟都选择未排序元素中最小的元素，将它放在正确的位置，重复n趟 O(n^2) 不稳定
function selectSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) {
        let tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
      }
    }
  }
  return array
}


//冒泡排序：每一趟冒泡都比较所有相邻的元素，如果是逆序就交换，重复n趟 O(n^2)
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j+1]) {
        let tmp = array[j+1]
        array[j+1] = array[j]
        array[j] = tmp
      }
    }
  } 
  return array
}

//冒泡排序优化
function bubbleSort2(array) {
  while (true) {
    let cnt = 0
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j+1]) {
        let tmp = array[j+1]
        array[j+1] = array[j]
        array[j] = tmp
        cnt++
      }
    }
    if (cnt == 0) return array
  }
}

//插入排序：从左到右依次将所有的元素插入到已经排好序的数组中
function insertSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j+1]) {
        let tmp = array[j+1]
        array[j+1] = array[j]
        array[j] = tmp
      }
    }
    return array
  }
}

function insertSort(array) {
  for (let i = 0; i < array.length; i++) {
    
  }
}

