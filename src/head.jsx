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
    const digits = display.length;
    if (digits < (limit + 1)) return {};
    const koef = (base / (limit / 2));
    return {
      fontSize: base - ((digits / limit) * (koef)),
    };
  }

  render() {
    const { store } = this.context;
    const { display } = store.getState();
    const result = `${display || 0}`;
    const style = this.genStyle(result);
    return (
      <div className="calculator-head">
        <div className="calculator-result" style={style}>{ result }</div>
      </div>
    );
  }
}

Head.contextTypes = {
  store: React.PropTypes.object,
};


export default Head;
