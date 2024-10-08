import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionManager from "../../services/SessionManager";

function MainCourses() {
    const [mainDishes, setMainDishes] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const session = SessionManager.getInstance();

    useEffect(() => {
        const fetchMain = async () => {
            try {
                const response = await axios.get('http://localhost:8080/menu/type/main');
                setMainDishes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchMain();
        const storedCartItems = session.getCartItems();
        setCartItems(storedCartItems);
    }, [session]);


    const handleAddToCart = (itemId) => {
        const user = session.getUser();
        if (user) {
            if (!cartItems.includes(itemId)) {
                const updatedCartItems = [...cartItems, itemId];
                setCartItems(updatedCartItems);
                session.setCartItems(updatedCartItems);
                alert('Item added to cart!');
            } else {
                alert('Item is already in the cart.');
            }
        } else {
            alert('Please log in to add items to the cart.');
        }
    };


    return (
        <div className="menu-grid">
            {mainDishes.map((item) => (
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
                            <div 
                                className={`add-to-cart ${cartItems.includes(item.id) ? 'added' : ''}`}
                                onClick={() => handleAddToCart(item.id)}
                            >
                                <p>{cartItems.includes(item.id) ? '✓' : '+'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MainCourses;