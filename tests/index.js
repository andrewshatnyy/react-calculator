/*eslint prefer-arrow-callback: false*/
const assert = require('assert');

const { createStore } = require('redux');
const { reducer } = require('../src/reducer');

describe('Calculator', function calc() {
  'use strict';
  let store = false;

  beforeEach(function b4e() {
    store = createStore(reducer);
    store.dispatch({ type: 'digit', value: '1' });
    store.dispatch({ type: 'digit', value: '2' });
    store.dispatch({ type: 'digit', value: '4' });
  });

  it('stores display value', function val() {
    const state = store.getState();
    assert.equal(state.display, '124');
  });

  it('sets dec points', function points(){
    store.dispatch({ type: 'dec' });
    store.dispatch({ type: 'digit', value: '3' });
    const state = store.getState();
    assert.equal(state.display, '124.3');
  });

  it('adds', function add(){
    let state = false;
    store.dispatch({ type: 'operator', value: '+' });
    store.dispatch({ type: 'digit', value: '6' });
    state = store.getState();
    assert.equal(state.display, '6');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: '+' });
    state = store.getState();
    assert.equal(state.display, '130');
    assert.equal(state.mem, '6');
    store.dispatch({ type: 'operator', value: '+' });
    state = store.getState();
    assert.equal(state.display, '130');
    assert.equal(state.mem, '130');
  });

  it('substracts', function sub(){
    let state = false;
    store.dispatch({ type: 'operator', value: '-' });
    store.dispatch({ type: 'digit', value: '6' });
    state = store.getState();
    assert.equal(state.display, '6');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: '-' });
    state = store.getState();
    assert.equal(state.display, '118');
    assert.equal(state.mem, '6');
    store.dispatch({ type: 'operator', value: '-' });
    state = store.getState();
    assert.equal(state.display, '118');
    assert.equal(state.mem, '118');
  });

  it('multiplies', function mul(){
    let state = false;
    store.dispatch({ type: 'operator', value: '*' });
    store.dispatch({ type: 'digit', value: '2' });
    state = store.getState();
    assert.equal(state.display, '2');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: '*' });
    state = store.getState();
    assert.equal(state.display, '248');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: '*' });
    state = store.getState();
    assert.equal(state.display, '248');
    assert.equal(state.mem, '248');
  });

  it('divides', function div(){
    let state = false;
    store.dispatch({ type: 'operator', value: '/' });
    store.dispatch({ type: 'digit', value: '2' });
    state = store.getState();
    assert.equal(state.display, '2');
    assert.equal(state.mem, '124');
    store.dispatch({ type: 'operator', value: '/' });
    state = store.getState();
    assert.equal(state.display, '62');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: '/' });
    state = store.getState();
    assert.equal(state.display, '62');
    assert.equal(state.mem, '62');
  });

  it('sets percent', function per(){
    let state = false;
    store.dispatch({ type: 'operator', value: '%' });
    state = store.getState();
    assert.equal(state.display, '1.24');
    assert.equal(state.mem, '');
    store.dispatch({ type: 'operator', value: '%' });
    state = store.getState();
    assert.equal(state.display, '0.0124');
    assert.equal(state.mem, '');
  });
  it('equals', function eq(){
    let state = false;
    store.dispatch({ type: 'operator', value: '+' });
    store.dispatch({ type: 'digit', value: '2' });
    store.dispatch({ type: 'operator', value: '=' });
    state = store.getState();
    assert.equal(state.display, '126');
    assert.equal(state.mem, '2');
    store.dispatch({ type: 'operator', value: '=' });
    state = store.getState();
    assert.equal(state.display, '128');
    assert.equal(state.mem, '2');
  });
});
