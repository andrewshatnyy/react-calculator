import React from 'react';

class Head extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const { display } = store.getState();
    return (
      <div className="calculator-head">
        <div className="calculator-result">{display || 0}</div>
      </div>
    );
  }
}

Head.contextTypes = {
  store: React.PropTypes.object,
};


export default Head;
