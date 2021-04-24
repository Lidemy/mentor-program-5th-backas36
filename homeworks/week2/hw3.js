function reverse(str) {
    let newStr="";
    for (let i=(str.length-1);i>=0;i--){
        newStr+=str[i];
  }
  console.log(newStr)
}

reverse('1,2,3,2,1');
reverse('yoyoyo');
reverse('1abc2');