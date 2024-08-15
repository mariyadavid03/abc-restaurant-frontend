import React from "react";
import './QuantityStyle.css';

function QuantityScale({ quantity, onIncrease, onDecrease }) {
    return (
        <div className="quantity-selector">
            <button className="quantity-btn" onClick={onDecrease} disabled={quantity <= 1}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="quantity-btn" onClick={onIncrease}>+</button>
        </div>
    );
}

export default QuantityScale;