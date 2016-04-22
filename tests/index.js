/*eslint prefer-arrow-callback: false*/
const assert = require('assert');

const { createStore } = require('redux');
const { reducer } = require('../src/reducer');

describe('Calculator', function calc() {
  'use strict';
  let store = false;

  beforeEach(function b4e() {
    store = createStore(reducer);
    store.dispatch({ type: 'button', value: '1' });
    store.dispatch({ type: 'button', value: '2' });
    store.dispatch({ type: 'button', value: '4' });
  });

  it('stores display value', function val() {
    const state = store.getState();
    assert.equal(state.display, '124');
  });

  it('handle zeroes', function val() {
    store.dispatch({ type: 'button', value: 'AC' });
    store.dispatch({ type: 'button', value: '0' });
    store.dispatch({ type: 'button', value: '0' });
    store.dispatch({ type: 'button', value: '0' });
    const state = store.getState();
    assert.equal(+state.display, 0);
  });  

  it('deals with plus / minus', function pm(){
    store.dispatch({ type: 'operator', value: 'plusminus' });
    let state = store.getState();
    assert.equal(state.display, '-124');
    store.dispatch({ type: 'operator', value: 'plusminus' });
    store.dispatch({ type: 'button', value: '1' });
    state = store.getState();
    assert.equal(state.display, '1241');
  });

  it('cleans state', function clean() {
    store.dispatch({ type: 'button', value: 'AC' });
    const state = store.getState();
    assert.equal(state.display, '');
  });

  it('sets dec points', function points(){
    store.dispatch({ type: 'button', value: '.' });
    store.dispatch({ type: 'button', value: '3' });
    const state = store.getState();
    assert.equal(state.display, '124.3');
  });

  it('adds', function add(){
    let state = false;
    store.dispatch({ type: 'operator', value: 'plus' });
    store.dispatch({ type: 'button', value: '1' });
    store.dispatch({ type: 'button', value: '6' });
    state = store.getState();
    assert.equal(state.display, '16');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: 'plus' });
    state = store.getState();
    assert.equal(state.display, '140');
    assert.equal(state.mem, '16');
    store.dispatch({ type: 'operator', value: 'plus' });
    state = store.getState();
    assert.equal(state.display, '140');
    assert.equal(state.mem, '140');
  });

  it('substracts', function sub(){
    let state = false;
    store.dispatch({ type: 'operator', value: 'minus' });
    store.dispatch({ type: 'button', value: '6' });
    state = store.getState();
    assert.equal(state.display, '6');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: 'minus' });
    state = store.getState();
    assert.equal(state.display, '118');
    assert.equal(state.mem, '6');
    store.dispatch({ type: 'operator', value: 'minus' });
    state = store.getState();
    assert.equal(state.display, '118');
    assert.equal(state.mem, '118');
  });

  it('multiplies', function mul(){
    let state = false;
    store.dispatch({ type: 'operator', value: 'times' });
    store.dispatch({ type: 'button', value: '2' });
    state = store.getState();
    assert.equal(state.display, '2');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: 'times' });
    state = store.getState();
    assert.equal(state.display, '248');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: 'times' });
    state = store.getState();
    assert.equal(state.display, '248');
    assert.equal(state.mem, '248');
  });

  it('divides', function div(){
    let state = false;
    store.dispatch({ type: 'operator', value: 'divide' });
    store.dispatch({ type: 'button', value: '2' });
    state = store.getState();
    assert.equal(state.display, '2');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: 'divide' });
    state = store.getState();
    assert.equal(state.display, '62');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: 'divide' });
    state = store.getState();
    assert.equal(state.display, '62');
    assert.equal(state.mem, '62');
  });

  it('sets percent', function per(){
    let state = false;
    store.dispatch({ type: 'operator', value: 'percent' });
    state = store.getState();
    assert.equal(state.display, '1.24');
    assert.equal(state.mem, '');
    store.dispatch({ type: 'operator', value: 'percent' });
    state = store.getState();
    assert.equal(state.display, '0.0124');
    assert.equal(state.mem, '');
  });
  it('equals', function eq(){
    let state = false;
    store.dispatch({ type: 'operator', value: 'plus' });
    store.dispatch({ type: 'button', value: '2' });
    store.dispatch({ type: 'operator', value: 'equal' });
    state = store.getState();
    assert.equal(state.display, '126');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: 'equal' });
    state = store.getState();
    assert.equal(state.display, '128');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: 'equal' });
    state = store.getState();
    assert.equal(state.display, '130');
    assert.equal(state.mem, '2');
  });

  it('decimals', function dec(){
    let state = false;
    store.dispatch({ type: 'button', value: '.' });
    store.dispatch({ type: 'button', value: '1' });
    store.dispatch({ type: 'button', value: '4' });
    state = store.getState();
    assert.equal(state.display, '124.14');
    store.dispatch({ type: 'button', value: '.' });
    store.dispatch({ type: 'button', value: '1' });
    store.dispatch({ type: 'button', value: '4' });
    state = store.getState();
    assert.equal(state.display, '124.1414');
    store.dispatch({ type: 'operator', value: 'times' });
    store.dispatch({ type: 'button', value: '2' });
    store.dispatch({ type: 'operator', value: 'equal' });
    state = store.getState();
    assert.equal(state.display, '248.2828');
    store.dispatch({ type: 'operator', value: 'minus' });
    store.dispatch({ type: 'button', value: '1' });
    store.dispatch({ type: 'button', value: '0' });
    store.dispatch({ type: 'button', value: '0' });
    store.dispatch({ type: 'operator', value: 'equal' });
    state = store.getState();
    assert.equal(state.display, '148.2828');
  });
});
