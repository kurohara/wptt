
function removeSorroundings(src) {
	return src.replace(/(.*)[ \t]*;/, "$1");
}


console.log(removeSorroundings("abc;"));
console.log(removeSorroundings("abc"));
console.log("'-function()'".replace(/['"][-]{0,1}(.*)['"]/ ,"$1"));
console.log("'function()'".replace(/['"][-]{0,1}(.*)['"]/ ,"$1"));
console.log("'--function()'".replace(/['"][-]{0,1}(.*)['"]/ ,"$1"));

var str = "3c";

console.log("num : " + (parseInt(str, 10) + 0));


var stack = [];
// Array.prototype.top = function () {
//   return this[this.length - 1];
// };
stack.top = function() {
  return this[this.length - 1];
};

stack.push(3);
stack.push(4);
stack.push("abcd");

console.log(stack.top());

