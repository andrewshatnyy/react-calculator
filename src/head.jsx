import React from 'react';

class Head extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  genStyle(display) {
    const base = 48;
    const limit = 8;
    if (display.length < (limit + 1)) return {};
    const koef = base / (limit / 2);
    return {
      fontSize: base - ((display.length / limit) * (koef)),
    };
  }

  render() {
    const { store } = this.context;
    const { display } = store.getState();
    const style = this.genStyle(display);
    return (
      <div className="calculator-head">
        <div className="calculator-result" style={style}>{ display || 0}</div>
      </div>
    );
  }
}

Head.contextTypes = {
  store: React.PropTypes.object,
};


export default Head;
