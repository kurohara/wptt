
// status defs
var en = 1;
var ESC = ++en,
    SCOMMENT = ++en,
    SLASH = ++en,
    SLITERAL = ++en,
    DLITERAL = ++en,
    BLANK = ++en,
    LBRACE = ++en,
    RBRACE = ++en,
    LSBRACE = ++en,
    RSBRACE = ++en,
    LCBRACE = ++en,
    RCBRACE = ++en,
    COMMA = ++en,
    COLON = ++en,
    SEMICOLON = ++en,
    DOLLAR = ++en,
    DOT = ++en;

// special status defs
var KEEP = 64;
var RETURN = 128;
var POP = 256;
var UNREAD = 512;

// character class defs
var CCNUM = "number";
var CCALPHA = "alpha";
var CCOTHER = "other";

/**
 * determine the character class
 */
function charclass(c) {
  if (/[0-9]/.test(c)) {
    return CCNUM;
  } else if (/[a-z][A-Z]/.test(c)) {
    return CCALPHA;
  }
}

function keyword(str) {
}

var smap = {
  NONE: {
    "\\"    : ESC,
    "#"     : SCOMMENT,
    "/"     : SLASH,
    "'"     : SLITERAL,
    "\""    : DLITERAL,
    " "     : BLANK,
    "\t"    : BLANK,
    "\n"    : BLANK,
    "("     : RETURN + LBRACE,
    ")"     : RETURN + RBRACE,
    "["     : RETURN + LSBRACE,
    "]"     : RETURN + RSBRACE,
    "{"     : RETURN + LCBRACE,
    "}"     : RETURN + RCBRACE,
    ","     : RETURN + COMMA,
    ":"     : RETURN + COLON,
    ";"     : RETURN + SEMICOLON,
    "$"     : RETURN + DOLLAR,
    "."     : DOT,
    CCNUM   : NUMBER,
    CCOTHER : CONSUME,
  },
  SLASH: {
    "/"     : SCOMMENT,
    "*"     : DCOMMENT,
    CCOTHER : RETURN + SLASH + UNREAD + POP, 
  },
  DOT: {
    CCNUM   : NUMBER + POP,
    CCOTHER   : RETURN + DOT + POP + UNREAD,
  },
  NUMBER: {
    __if    : function(c) {},
    "."     : STAY,
    CCNUM   : STAY,
    "e"     : STAY,
    "E"     : STAY,
    "-"     : STAY,
    "+"     : STAY,
    CCOTHER : POP + UNREAD + RETURN + NUMBER,
  },
  ESC: {
    CCOTHER : POP,
  },
  SLITERAL: {
    "'"     : POP,
    "\\"    : ESC,
    CCOTHER : STAY,
  },
  DLITERAL: {
    "\\"    : ESC,
    "\""    : POP,
    CCOTHER : STAY,
  },
  SCOMMENT: {
    "\n"    : POP,
    "\\"    : ESC,
    CCOTHER : STAY,
  },
  DCOMMENT: {
    "*"     : KEEP,
    "*/"    : POP,
    CCOTHER : STAY,
  },
};


