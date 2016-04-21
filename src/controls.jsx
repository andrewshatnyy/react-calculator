import React from 'react';
import Button from './button.jsx';

function Row({ children }) {
  return <div className="button-row">{ children }</div>;
}

function Controls() {
  return (
    <div className="calculator-buttons">
      <Row>
        <Button types={['gray', 'gray--dark', 'small-text']} value="AC" />
        <Button types={['gray', 'gray--dark']} operator="plusminus" />
        <Button types={['gray', 'gray--dark']} operator="percent" />
        <Button operator="divide" />
      </Row>
      <Row>
        { [7, 8, 9].map((num) => <Button key={num} types={['gray']} value={num} />) }
        <Button operator="times" />
      </Row>
      <Row>
        { [4, 5, 6].map((num) => <Button key={num} types={['gray']} value={num} />) }
        <Button operator="minus" />
      </Row>
      <Row>
        { [1, 2, 3].map((num) => <Button key={num} types={['gray']} value={num} />) }
        <Button operator="plus" />
      </Row>
      <Row>
        <Button types={['gray', 'gray--wide']} value="0" />
        <Button types={['gray']} value="." />
        <Button operator="equal" />
      </Row>
    </div>
  );
}

export default Controls;

