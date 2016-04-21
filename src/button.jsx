import React from 'react';
import Operator from './operator.jsx';

function mapType(type) {
  return `button--${type}`;
}

function mapClasses(types) {
  const adds = (types || []).map(mapType);
  return `button ${adds.join(' ')}`;
}

function actionType(value, operator) {
  if (operator) return { type: 'operator', value: operator };
  return { type: 'button', value };
}


function Button({ types, value, operator }, { store }) {
  const classes = mapClasses(types);
  const action = actionType(value, operator);
  const operatorNode = (operator) ? <Operator type={operator} /> : value;
  return (
    <div className={classes} onClick={() => store.dispatch(action)}>
      { operatorNode }
    </div>
  );
}


Button.contextTypes = {
  store: React.PropTypes.object,
};

export default Button;
