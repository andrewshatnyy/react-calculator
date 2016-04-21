import React from 'react';
function Operator({ type }) {
  const classes = `operator operator-${type}`;
  return (
    <span className={classes}>
      {(type === 'plusminus') ? <span /> : null}
    </ span>
  );
}

Operator.propTypes = {
  type: React.PropTypes.string,
};

export default Operator;
