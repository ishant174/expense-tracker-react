import React from 'react';

import './Price.css';

const Price = (props) => {
  

    return (
        <span className="price">
           {props.currency} {props.amount}
        </span>
    );
};


export default Price;