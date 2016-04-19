const ops = {};

ops.add = function add(a, b) {
  return (+a) + (+b);
}

ops.sub = function sub(a, b) {
  return (+a) - (+b);
}

ops.div = function div(a, b) {
  // @todo catch div 0
  return (+a)/(+b);
}

ops.mul = function mul(a, b) {
  // @todo catch div 0
  return (+a)*(+b);
}

ops.per = function per(a) {
  return (+a) * 0.01;
}


function run({display, mem, last}, op) {
  rec = display;
  switch(op) {
    case '+':
      display = ops.add(mem, display);
      last = 'add';
      mem = display;
      break;
    case '-':
      display = ops.sub(mem, display);
      last = 'sub';
      mem = display;
      break;
    case '/':
      display = ops.div(mem, display);
      last = 'div';
      mem = display;
      break;
    case '*':
      display = ops.mul(mem, display);
      last = 'mul';
      mem = display;
      break;
    case '%':
      last = '';
      display = ops.per(display);
    case '=':
      if (last === '') break;
      display = ops[last](mem, display);
      break;
  }
  return { display, mem, last };
}

function reducer(state, action){

  state = state || {
    display: '',
    mem: '',
    dot: false,
    last: '',
  };

  switch(action.type) {
    case 'operator':
      state = Object.assign({}, state, run(state, action.value));
      break;
    case 'digit':
      state = Object.assign({}, state, {display: state.display + action.value});
      break;
    case 'dec':
      if (state.dot) return state;
      state = Object.assign({}, state, {dot: true, display: state.display + '.' });
      break;
  }
  return state;

}
module.exports = {
  reducer, run,
};
