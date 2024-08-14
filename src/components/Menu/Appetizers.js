import React from "react";

function Appetizers() {
    return (
        <div className="menu-grid">
            <div className="menu-item">
                <img src={require("../../assets/images/MenuImages/44.jpg")} alt="Menu Item"/>
                <div className="menu-item-text-container">
                    <div className="menu-item-text">
                        <h5>Menu Item 1</h5>
                        <p>Savory snack filled with vegetables, rolled & fried</p>
                    </div>
                    <div>
                        <p>Rs.10000</p>
                    </div>
                </div>
            </div>
            <div className="menu-item">Item 2</div>
            <div className="menu-item">Item 3</div>
            <div className="menu-item"><img src={require("../../assets/images/MenuImages/44.jpg")} alt="Menu Item"/>
                <div className="menu-item-text-container">
                    <div className="menu-item-text">
                        <h5>Menu Item 1</h5>
                        <p>Savory snack filled with vegetables, rolled & fried</p>
                    </div>
                    <div>
                        <p>Rs.10000</p>
                    </div>
                </div></div>
            <div className="menu-item">Item 5</div>
            <div className="menu-item">Item 6</div>
        </div>
    );
}

export default Appetizers;