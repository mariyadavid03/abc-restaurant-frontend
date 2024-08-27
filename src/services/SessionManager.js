class SessionManager {
    static instance = null;

    static getInstance() {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    // Setters
    setUserId(userId) {
        sessionStorage.setItem('userId', userId);
    }

    setRole(role) {
        sessionStorage.setItem('role', role);
    }

    setUser(user) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    setIsLoggedIn(isLoggedIn) {
        sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    }

    setCartItems(cartItems) {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    setDeliveryId(deliveryId) {
        sessionStorage.setItem('deliveryId', deliveryId);
    }

    setTotalAmount(totalAmount) {
        sessionStorage.setItem('totalAmount', totalAmount);
    }

    // Getters
    getUserId() {
        return sessionStorage.getItem('userId');
    }

    getRole() {
        return sessionStorage.getItem('role');
    }

    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getIsLoggedIn() {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    getCartItems() {
        const cartItems = sessionStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    }

    getDeliveryId() {
        return sessionStorage.getItem('deliveryId');
    }

    getTotalAmount() {
        return sessionStorage.getItem('totalAmount');
    }

    // Clear session
    clearUserSession() {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('isLoggedIn');
    }

    clearCart() {
        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('deliveryId');
        sessionStorage.removeItem('totalAmount');
    }

    clearAll() {
        sessionStorage.clear();
    }
}

export default SessionManager;
