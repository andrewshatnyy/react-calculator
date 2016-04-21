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

// App.propTypes = {
//   store: React.PropTypes.object,
//   children: React.PropTypes.object,
// };

App.childContextTypes = {
  store: React.PropTypes.object,
};

export default App;
