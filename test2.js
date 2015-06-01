
var conf = {
  'esc_html_e': 2
};

var line = "test(esc_html_e('abc', get_my_titile('x', 3)))";

function getscan(str) {
  var carr = str.split("");
  carr.index = 0;
  carr.next = function() {
    if (index >= this.length) {
      return null;
    } else {
      return this[this.index++];
    }
  };
  carr.skip = function() {
    this.index++;
  };
  carr.peeknext = function() {
    if (index + 1 >= this.length) {
      return null;
    } else {
      return this[this.index + 1];
    }
  };
}

function parseline(str) {
  var carr = str.split("");
  carr.index = 0;

  var stack = [];
  stack.top = function () { return this[this.length - 1]; };
  stack.push(STATS.NONE);
  var token = "";
  nexttoken: {
    parse(stack.top(), token);
    c = carr.next();
    while (c) {
      switch (stack.top()) {
      case STATS.NONE:
        switch (c) {
        case '\\':
          stack.push(STATS.ESCAPE);
          break;
        case '(':
          stack.push(STATS.LIST);
          break nexttoken;
        case ')':
          stack.pop();
          break nexttoken;
          break;
        case ',':
          break;
        case '"':
          stack.push(STATS.DSTRING);
          break;
        case "'":
          stack.push(STATS.SSTRING);
          break;
        case " ":
        case "\t":
        case "\n":
          break;
        case "/":
          if (carr.peeknext() === '*') {
            carr.skip();
            stack.push(STATS.MCOMMENT);
            break nexttoken;
          } else if (carr.peeknext() === '/') {
            carr.skip();
            stack.push(STATS.SCOMMENT);
            break nexttoken;
          }
          break;
        case "#":
          break;
        default:
          break;
        }
        break;
      case STATS.MCOMMENT:
        switch (c) {
        case 
        }
        break;
      case STATS.DSTRING:
        switch (c) {
        case '\\':
          stack.push(STATS.ESCAPE);
          break nexttoken;
        case '"':
          stack.pop();
          break;
        default:
          break;
        }
        break;
      case STATS.SSTRING:
        switch (carr[index]) {
        case '\\':
          stack.push(STATS.ESCAPE);
          break nextchar;
        case "'":
          stack.pop();
          break;
        default:
          break;
        }
        break;
      case STATS.ESCAPE:
        break;
      case STATS.ARGLIST:
        break;
  
      token += c;
    }
  }
}


parseline(line);

