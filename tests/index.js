const { createStore } = require('redux');
const {reducer, run} = require('../src/reducer');
const store = createStore(reducer);
store.dispatch({type: ''});


describe('Calculator', function() {
  it('stores display value', function() {
    store.dispatch({type: 'digit', value: '1'});
    store.dispatch({type: 'digit', value: '2'});
    store.dispatch({type: 'digit', value: '4'});

    const state = store.getState();
    console.log(state);
    assert.equal(state.display, '124');
  });
});
