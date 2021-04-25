function capitalize(str) {
  return str[0].toUpperCase()+str.slice(1)
}

console.log(capitalize(',hello'));
console.log(capitalize("nick"));
console.log(capitalize("Nick"));
