
function replace_text_domain(input) {
  return input.replace(/\$\$+/, "'#{theme.name}'");
}

var str = "_e('text ', $$)";

console.log(replace_text_domain(str));

