import React, {useState} from 'react';
import Header from '../../../components/Header/PublicHeader/Header';
import './CartStyle.css';
import QuantityScale from '../../../components/QuantityScale/QuantityScale';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CartPage(){ 
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    
    return(
        <><Header/>
        <div className='cart-page'>
            <h1>Your Cart</h1>
            <div className='cart-page-container'>
                <div className='cart-order-container'>

                    <div className='appetizer-section'>
                        <h5>Selected Appetizers</h5>

                        <div className='item-container'>
                            <div className='item-img'>
                                <img src={require("../../../assets/images/MenuImages/44.jpg")} alt='Cart Item'></img>
                            </div>
                            <div className='item-info'>
                                <h5 className='item-title'>Item Name</h5>
                                <h6 className='item-price'>LKR 1000</h6>
                            </div>
                            <div className='quantity-container'>
                                <QuantityScale
                                    quantity={quantity} 
                                    onIncrease={handleIncrease} 
                                    onDecrease={handleDecrease} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className='main-section'>
                        <h5>Selected Main Dishes</h5>
                    </div>

                    <div className='dessert-section'>
                        <h5>Selected Desserts</h5>
                    </div>

                    <div className='bev-section'>
                        <h5>Selected Beverages</h5>
                    </div>
                </div>
                <div className='order-summary-container'>
                    <div className='order-summary'>
                        <h5>Order Summary</h5>
                        <div className='order-summary-section'>
                            <h6 className='order-summary-title'>Itme Title</h6>
                            <h6 className='order-summary-quantity'>x3</h6>
                            <h6 className='order-summary-price'>LKR. 3000</h6>
                        </div>
                    </div>
                    <div className='summary-total'>
                        <h6>Total Cost: </h6>
                        <h6>LKR 3000</h6>
                    </div>
                    <div className='order-info'>
                        <h5>Order Details</h5>

                        <Form className='query-form'>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Reciever Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Delivery Address" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Contact Number" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label>Note (Optional)</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter Note" required />
                            </Form.Group>

                            <Button variant="primary" type="submit" className='submit-btn'>
                                Proceed to Checkout
                            </Button>
                        </Form>

                    </div>
                </div>
            </div>
            
        </div></>



    );
}
export default CartPage;