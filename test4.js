
  var list = {
    '__': 1,
    '_e': 1,
    '_x': 2',
    'esc_html__':1,
    'esc_html_e':1,
    'esc_html_x':2,
    'esc_attr__':1,
    'esc_attr_e':1,
    'esc_attr_x':2,
    '_ex':2,
    '_n':2,
    '_nx':4,
    '_n_noop':2,
    '_nx_noop':3
  };

  var str  = "_e ( 'text a' ) ";

  var regexp = /([_a-zA-Z][_a-zA-Z0-9]*)[ \t]*\((.*)/ ;

  var matched = str.match(regexp);

  if (matched) {
    for (key in list) {
      if (matched[1] === key) {
         
      }
    }
  }

  console.log(matched);


