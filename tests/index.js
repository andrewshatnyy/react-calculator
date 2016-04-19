'use strict';
const assert = require('assert');

const { createStore } = require('redux');
const {reducer, run} = require('../src/reducer');

describe('Calculator', function() {
  let store;
  
  beforeEach(function(){
    store = createStore(reducer);
    store.dispatch({type: 'digit', value: '1'});
    store.dispatch({type: 'digit', value: '2'});
    store.dispatch({type: 'digit', value: '4'});
  });

  it('stores display value', function() {
    const state = store.getState();
    assert.equal(state.display, '124');
  });

  it('sets dec points', function(){
    store.dispatch({type: 'dec'});
    store.dispatch({type: 'digit', value: '3'});
    const state = store.getState();
    assert.equal(state.display, '124.3');
  });

  it('adds', function(){
    store.dispatch({type: 'operator', value: '+'});
    store.dispatch({type: 'digit', value: '6'});
    const state = store.getState();
    assert.equal(state.display, '130');
    assert.equal(state.mem, '6');
  }); 


});
