'use client';

import { useState, useEffect } from 'react';
import { User, ShoppingBag, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cartStorage, orderStorage, CartItem, Order } from '@/lib/storage';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'cart'>('cart');
  

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+880 1234-567890',
    address: 'Dhaka, Bangladesh'
  });
  const [isEditing, setIsEditing] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);

  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    setCart(cartStorage.getCartItems());
    setOrders(orderStorage.getOrders());
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const saveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const updateQuantity = (id: number, delta: number) => {
    const item = cart.find(cartItem => cartItem.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      cartStorage.updateQuantity(id, item.selectedSize, newQuantity);
      setCart(cartStorage.getCartItems()); 
    }
  };

  const removeFromCart = (id: number) => {
    if (confirm('Remove this item from cart?')) {
      const item = cart.find(cartItem => cartItem.id === id);
      if (item) {
        cartStorage.removeFromCart(id, item.selectedSize);
        setCart(cartStorage.getCartItems()); 
      }
    }
  };

  const cartTotal = cartStorage.getCartTotal();
  const cartOriginalTotal = cart.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalSavings = cartOriginalTotal - cartTotal;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your profile, orders, and cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span className="font-medium">Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag size={20} />
                  <span className="font-medium">Orders</span>
                  <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {orders.length}
                  </span>
                </button>
                
                <button
                  onClick={() => setActiveTab('cart')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'cart' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span className="font-medium">Cart</span>
                  <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {cart.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>

         
         
          <div className="lg:col-span-3">
           
           
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={saveProfile}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={profile.address}
                      onChange={(e) => handleProfileChange('address', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}


            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 text-lg">No orders yet</p>
                    <Link href="/shop" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  Size: {item.selectedSize} • Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-bold text-gray-900">৳ {item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                          <p className="font-bold text-gray-900">Total: ৳ {order.total}</p>
                          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

           
            {activeTab === 'cart' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>

                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                      <Link href="/shop" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`} className="font-bold text-gray-900 hover:text-blue-600">
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Size: {item.selectedSize}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-bold text-gray-900">৳ {item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">৳ {item.originalPrice}</span>
                              )}
                              {item.discount && item.discount > 0 && (
                                <span className="text-sm text-green-600 font-medium">Save ৳{item.discount}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">
                              ৳ {item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                 
                {cart.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span>৳ {cartOriginalTotal}</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount</span>
                        <span>- ৳ {totalSavings}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>৳ {cartTotal}</span>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}