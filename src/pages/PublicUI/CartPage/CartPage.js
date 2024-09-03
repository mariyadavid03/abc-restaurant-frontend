import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/PublicHeader/Header';
import './CartStyle.css';
import QuantityScale from '../../../components/QuantityScale/QuantityScale';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SessionManager from '../../../services/SessionManager';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const session = SessionManager.getInstance();

    useEffect(() => {
        const fetchCartItems = async () => {
            const cartItemIds = session.getCartItems();
            const fetchedItems = [];

            for (const itemId of cartItemIds) {
                try {
                    const response = await axios.get(`http://localhost:8080/menu/${itemId}`);
                    fetchedItems.push({ ...response.data, quantity: 1 }); 
                } catch (error) {
                    console.error('Error fetching cart item:', error.response ? error.response.data : error.message);
                }
            }

            setCartItems(fetchedItems);
        };

        fetchCartItems();
    }, [session]);

    const handleRemoveItem = (itemId) => {
        if (window.confirm('Are you sure you want to remove to item?')) {
            const cartItemIds = session.getCartItems();
            const updatedCartItemIds = cartItemIds.filter(id => id !== itemId);
            session.setCartItems(updatedCartItemIds);
    
            setCartItems(cartItems.filter(item => item.id !== itemId));
        }
        
    };

    const handleIncrease = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += 1;
        setCartItems(newCartItems);
    };

    const handleDecrease = (index) => {
        const newCartItems = [...cartItems];
        if (newCartItems[index].quantity > 1) {
            newCartItems[index].quantity -= 1;
            setCartItems(newCartItems);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (window.confirm('Are you sure you want to proceed to payment?')) {
            const userId = session.getUserId();
            if (!userId) {
                return;
            }
    
            const deliveryCode = `del${Math.floor(10000 + Math.random() * 90000)}`;
            const deliveryData = {
                delivery_code: deliveryCode,
                user: { id: Number(userId) },
                delivery_address: deliveryAddress,
                special_instructions: specialInstructions,
                status: 'Pending'
            };
    
            try {
                const deliveryResponse = await axios.post('http://localhost:8080/delivery/add', deliveryData);
                if (deliveryResponse.status === 201 && deliveryResponse.data) {
                    const deliveryId = deliveryResponse.data.id;
    
                    const orders = cartItems.map(item => ({
                        delivery: { id: deliveryId }, 
                        menu: { id: item.id }, 
                        quantity: item.quantity,
                        price: item.price
                    }));
    
                    // const orderResponses = await Promise.all(
                    //     orders.map(order => 
                    //         axios.post('http://localhost:8080/order/add', order)
                    //         .then(res => res.data)
                    //         .catch(error => {
                    //             console.error(`Error saving order for item ${order.menu.id}:`, error.response ? error.response.data : error.message);
                    //             throw new Error(`Failed to save order for item ${order.menu.id}`);
                    //         })
                    //     )
                    // );

                    const totalAmount = orders.reduce((total, order) => total + order.price * order.quantity, 0);
                    
                    // Store deliveryId and totalAmount in sessionStorage
                    session.setDeliveryId(deliveryId);
                    session.setTotalAmount(totalAmount);
                    window.location.href = '/cart/payment';
                } else {
                   console.error("Error");
                }
            } catch (error) {
                console.error('Error creating delivery or orders:', error.response ? error.response.data : error.message);
            }
        }
    };
    return (
        <>
            <Header />
            <div className='cart-page'>
                <h1 className='cart-head'>Your Cart</h1>
                <div className='cart-page-container'>
                    {cartItems.length === 0 ? (
                        <div className='empty-cart-message'>
                            <p>Your cart is empty</p>
                        </div>
                    ):(
                        <><div className='cart-order-container'>
                                {cartItems.map((item, index) => (
                                    <div key={item.id} className='item-container'>
                                        <div className='item-img'>
                                            <img src={`data:image/jpeg;base64,${item.item_image_data}`} alt='Cart Item' />
                                        </div>
                                        <div className='item-info-cart'>
                                            <h5 className='item-title-cart'>{item.item_name}</h5>
                                            <h6 className='item-price'>LKR {item.price}</h6>
                                        </div>
                                        <div className='quantity-container'>
                                            <QuantityScale
                                                quantity={item.quantity}
                                                onIncrease={() => handleIncrease(index)}
                                                onDecrease={() => handleDecrease(index)} />
                                        </div>
                                        <Button 
                                            variant="danger" 
                                            className='remove-item-btn' 
                                            onClick={() => handleRemoveItem(item.id)} >
                                            -
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className='order-summary-container'>
                                <div className='order-summary'>
                                    <h5>Order Summary</h5>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className='order-summary-section'>
                                            <h6 className='order-summary-title'>{item.item_name}</h6>
                                            <h6 className='order-summary-quantity'>x{item.quantity}</h6>
                                            <h6 className='order-summary-price'>LKR {item.price * item.quantity}</h6>
                                        </div>
                                    ))}
                                </div>
                                <div className='summary-total'>
                                    <h6>Total Cost: </h6>
                                    <h6>
                                        LKR {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                                    </h6>
                                </div>
                                <div className='order-info'>
                                    <h5>Order Details</h5>

                                    <Form onSubmit={handleSubmit} className="query-form" style={{ padding: "0vh 6vh" }}>
                                        <Form.Group className="mb-3" controlId="formAddress">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Delivery Address"
                                                value={deliveryAddress}
                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formMessage">
                                            <Form.Label>Note (Optional)</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter Note"
                                                value={specialInstructions}
                                                onChange={(e) => setSpecialInstructions(e.target.value)} />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className='submit-btn'>
                                            Proceed to Checkout
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default CartPage;
