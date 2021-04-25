function join(arr, concatStr) {
  if(arr.length === 0){
    return '';
  }
  let str=arr[0];
    for(let i=1;i<arr.length;i++){
       str+=concatStr+arr[i];
  }
  return str;
}

function repeat(str, times) {
    let newStr="";
    for(let i=0;i<times;i++){
        newStr+=str
    }
    return newStr
}

console.log(join([1, 2, 3], ''));
console.log(repeat('a', 5));
