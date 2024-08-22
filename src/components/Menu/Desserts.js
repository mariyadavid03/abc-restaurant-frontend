import React, { useEffect, useState } from "react";
import axios from "axios";

function Desserts() {
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/menu/type/dessert');
                setDesserts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchDesserts();
    }, []);

    return (
        <div className="menu-grid">
            {desserts.map((item) => (
                <div key={item.id} className="menu-item">
                    <img
                        src={`data:image/jpeg;base64,${item.item_image_data}`}
                        alt={item.item_name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <div className="menu-item-text-container">
                        <div className="menu-item-text">
                            <h5>{item.item_name}</h5>
                            <p>{item.item_desc}</p>
                        </div>
                        <div>
                            <p>Rs.{item.price}</p>
                            <div className="add-to-cart">
                                <p>+</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Desserts;