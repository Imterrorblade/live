//冒泡
function bubbleSort (list) {
  for (let i = list.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (list[j] > list[j + 1]) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}
//插入排序
function insertSort (list) {
  for (let i = 1; i < list.length; i++) {
    for (let j = i; j > 0; j--) {
      if (list[j] < list[j - 1]) {
        let temp = list[j];
        list[j] = list[j - 1];
        list[j - 1] = temp;
      }
    }
  }
  return list;
}
//选择排序
function selectSort (list) {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[i]) {
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
    }
  }
  return list;
}
//快速排序
function quickSort (list) {
  function quick (list, start, end) {
    if (list.length <= 1) {
      return;
    }
    let lower = start,
      height = end,
      temp = list[Math.floor ((start + end) / 2)];
    while (height > lower) {
      if (list[height] < temp) {
        list[lower++] = list[height];
        while (lower < height) {
          if (list[lower] > temp) {
            list[height] = list[lower];
            break;
          } else {
            lower++;
          }
        }
        list[lower] = temp;
      } else {
        height--;
      }
    }
    quick (list, start, lower);
    quick (list, lower + 1, end);
  }
  quick (list, 0, list.length - 1);
  return list;
}
function quickSort (arr) {
  　　if (arr.length <= 1) {//如果数组长度小于等于1无需判断直接返回即可 
          return arr;
      }
  　　var pivotIndex = Math.floor(arr.length / 2);//取基准点 
  　　var pivot = arr.splice(pivotIndex, 1)[0];//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数
  　　var left = [];//存放比基准点小的数组
  　　var right = [];//存放比基准点大的数组 
  　　for (var i = 0; i < arr.length; i++){ //遍历数组，进行判断分配 
  　　　　if (arr[i] < pivot) {
  　　　　　　left.push(arr[i]);//比基准点小的放在左边数组 
  　　　　} else {
  　　　　　　right.push(arr[i]);//比基准点大的放在右边数组 
  　　　　}
  　　}
           //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1； 
  　　return quickSort(left).concat([pivot], quickSort(right));
  }

function countTimes (list, sortFn) {
  const newList = list.slice (0);
  const start = Date.now ();
  sortFn.call (null, newList);
  //   console.log(newList.toString());
  return Date.now () - start;
}

function countTimesOfArraySort (list) {
  const start = Date.now ();
  list.sort ();
  return Date.now () - start;
}
function makeList (len, start, end) {
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push (Math.ceil (Math.random () * (end - start) + start));
  }
  return list;
}
function makeSortLikeList (len, start) {
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push (start + i);
  }
  return list;
}

function compareSort (list) {
  console.log ('arraySort', countTimesOfArraySort (list));
  console.log ('qucikSort', countTimes (list, quickSort));
  console.log ('bubleSort', countTimes (list, bubbleSort));
  console.log ('insertSort', countTimes (list, insertSort));
  console.log ('selectSrot', countTimes (list, selectSort));
}
const list = makeList (10000, 300, 100000);
const sortLikeList = makeSortLikeList (10000, 300);

compareSort (list);
// compareSort(sortLikeList);

