import React from 'react';

const BidAsk = ({ price, size }) => {
  return (
    <div>&yen;{price.toLocaleString()}: {size}</div>
  );
}

export default BidAsk;
