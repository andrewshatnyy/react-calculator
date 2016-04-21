'use strict';
const ops = {
  add(a, b) {
    return (+a) + (+b);
  },

  sub(a, b) {
    if (a === '') return b;
    return (+a) - (+b);
  },

  div(a, b) {
    // @todo catch div 0
    if (a === '') return b;
    return (+a) / (+b);
  },

  mul(a, b) {
    // @todo catch div 0
    if (a === '') return b;
    return (+a) * (+b);
  },

  per(a) {
    return (+a) * 0.01;
  },
};

function compute(last, { display, mem, reset }) {
  const original = display;
  let computed = display;
  if (!reset) {
    computed = ops[last](mem, display);
  }
  return { display: computed, mem: original, last, reset: true };
}

function run({ display, mem, last, reset }, op) {
  const state = { display, mem, last, reset: true };
  switch (op) {
    case '+':
      return compute('add', { display, mem, reset });
    case '-':
      return compute('sub', { display, mem, reset });
    case '/':
      return compute('div', { display, mem, reset });
    case '*':
      return compute('mul', { display, mem, reset });
    case '%':
      return { display: ops.per(display), mem, last: '', reset: true };
    case '=':
      if (last === '') return state;
      return {
        display: ops[last](mem, display),
        mem: ((reset) ? mem : display),
        last,
        reset: true,
      };
    default:
      return state;
  }
}


function digit({ display, reset, mem, dot }, number) {
  if (number === '.') {
    if (dot) return {};
    return { dot: true, display: `${display}.`, reset };
  }

  if (reset) {
    return { mem: display, reset: false, display: number };
  }
  return { display: (display + number), mem, reset };
}
function reducer(prevState, action) {
  const state = prevState || {
    display: '',
    mem: '',
    dot: false,
    last: '',
    reset: false,
  };
  Object.freeze(state);
  switch (action.type) {
    case 'operator':
      return Object.assign({}, state, run(state, action.value));
    case 'digit':
      return Object.assign({}, state, digit(state, action.value));
    default:
      return state;
  }
}

module.exports = {
  reducer, run,
};
