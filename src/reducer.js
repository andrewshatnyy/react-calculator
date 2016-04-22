'use strict';
const ops = {
  negate(a) {
    return (-1 * (+a));
  },

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
    case 'plusminus':
      return { display: `${ops.negate(display)}`, mem, reset: false, last };
    case 'plus':
      return compute('add', { display, mem, reset });
    case 'minus':
      return compute('sub', { display, mem, reset });
    case 'divide':
      return compute('div', { display, mem, reset });
    case 'times':
      return compute('mul', { display, mem, reset });
    case 'percent':
      return { display: ops.per(display), mem, last: '', reset: true };
    case 'equal':
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

function cleanState() {
  return {
    display: '',
    mem: '',
    dot: false,
    last: '',
    reset: false,
  };
}

function concat(display, number) {
  const zero = (+display < 1);
  if (zero && number === '0') return `${display}`;
  if (zero && number === '.') return `0${number}`;
  return `${display}${number}`;
}

function digit({ display, reset, mem, dot }, number) {
  if (number === 'AC') return cleanState();
  if (reset) {
    return { mem: display, reset: false, display: number };
  }
  if (number === '.') {
    if (dot) return {};
    return { dot: true, display: concat(display, number), reset };
  }
  return { display: concat(display, number), mem, reset };
}

function reducer(prevState, action) {
  const state = prevState || cleanState();
  Object.freeze(state);
  switch (action.type) {
    case 'operator':
      return Object.assign({}, state, run(state, `${action.value}`));
    case 'button':
      return Object.assign({}, state, digit(state, `${action.value}`));
    default:
      return state;
  }
}

module.exports = {
  reducer, run,
};
