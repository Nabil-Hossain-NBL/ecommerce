
export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  categories: string[];
  subcategories: string[];
  quantity: number;
  selectedSize: string;
  addedAt: string; 
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: CartItem[];
}


export const cartStorage = {

  getCartItems: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('ecommerce-cart');
    return cart ? JSON.parse(cart) : [];
  },


  addToCart: (item: Omit<CartItem, 'addedAt'>): void => {
    if (typeof window === 'undefined') return;

    const cart = cartStorage.getCartItems();
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
    );

    if (existingItemIndex >= 0) {

      cart[existingItemIndex].quantity += item.quantity;
    } else {

      cart.push({
        ...item,
        addedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
  },


  updateQuantity: (id: number, selectedSize: string, quantity: number): void => {
    if (typeof window === 'undefined') return;

    const cart = cartStorage.getCartItems();
    const itemIndex = cart.findIndex(
      (item) => item.id === id && item.selectedSize === selectedSize
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {

        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
    }
  },


  removeFromCart: (id: number, selectedSize: string): void => {
    if (typeof window === 'undefined') return;

    const cart = cartStorage.getCartItems();
    const filteredCart = cart.filter(
      (item) => !(item.id === id && item.selectedSize === selectedSize)
    );
    localStorage.setItem('ecommerce-cart', JSON.stringify(filteredCart));
  },


  clearCart: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('ecommerce-cart');
  },


  getCartTotal: (): number => {
    const cart = cartStorage.getCartItems();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },


  getCartCount: (): number => {
    const cart = cartStorage.getCartItems();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
};


export const orderStorage = {

  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return [];
    const orders = localStorage.getItem('ecommerce-orders');
    return orders ? JSON.parse(orders) : [];
  },


  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>): void => {
    if (typeof window === 'undefined') return;

    const orders = orderStorage.getOrders();
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
    };

    orders.unshift(newOrder); 
    localStorage.setItem('ecommerce-orders', JSON.stringify(orders));
  },

  updateOrderStatus: (orderId: string, status: string): void => {
    if (typeof window === 'undefined') return;

    const orders = orderStorage.getOrders();
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      localStorage.setItem('ecommerce-orders', JSON.stringify(orders));
    }
  },
};
