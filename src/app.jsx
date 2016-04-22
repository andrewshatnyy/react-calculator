import React from 'react';

class App extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  render() {
    return this.props.children;
  }
}

App.childContextTypes = {
  store: React.PropTypes.object,
};

export default App;
