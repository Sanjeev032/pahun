import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { addItemToCart, removeItemFromCart } from '../store/slices/cartSlice';
import LuxuryImage from '../components/common/LuxuryImage';
import { formatCurrency } from '../utils/formatters';
import { SHIPPING_CHARGES, FREE_SHIPPING_THRESHOLD } from '../utils/constants';

const Cart = () => {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const shippingPrice = totalAmount > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGES;
    const finalTotal = totalAmount + shippingPrice;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6">
                <div className="mb-8 p-12 bg-luxury-ivory rounded-full">
                    <ShoppingBag size={64} strokeWidth={1} className="text-luxury-gray-medium" />
                </div>
                <h2 className="text-3xl font-light mb-4 tracking-extra uppercase">Your Bag is Empty</h2>
                <p className="text-luxury-gray-medium mb-12 text-sm tracking-widest uppercase font-light">
                    Let's find something extraordinary for you.
                </p>
                <Link to="/shop" className="luxury-button">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-light mb-16 tracking-tight uppercase">Shopping Bag</h1>

                <div className="flex flex-col xl:flex-row gap-16 xl:gap-24">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-12">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    layout
                                    key={`${item._id || item.id}-${item.size}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex gap-8 group pb-12 border-b border-luxury-gray-light last:border-0"
                                >
                                    <div className="w-32 md:w-48 aspect-[3/4] overflow-hidden bg-luxury-ivory">
                                        <LuxuryImage src={item.image} alt={item.name} className="w-full h-full transition-transform duration-1000 group-hover:scale-105" />
                                    </div>

                                    <div className="flex-1 flex flex-col pt-2">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-light tracking-wide uppercase">{item.name}</h3>
                                            <p className="text-sm font-medium tracking-tight">{formatCurrency(item.price * item.quantity)}</p>
                                        </div>

                                        <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium mb-8">
                                            Size: {item.size} / Cat: {item.category}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center border border-luxury-gray-light">
                                                <button
                                                    onClick={() => dispatch(removeItemFromCart({ id: item._id || item.id, size: item.size }))}
                                                    className="p-3 hover:text-luxury-gold transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-12 text-center text-xs font-semibold tabular-nums">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(addItemToCart(item))}
                                                    className="p-3 hover:text-luxury-gold transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => dispatch(removeItemFromCart({ id: item._id || item.id, size: item.size, force: true }))}
                                                className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-700 transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 size={14} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Card */}
                    <div className="w-full xl:w-96">
                        <div className="bg-luxury-ivory p-10 sticky top-32">
                            <h2 className="text-[11px] uppercase tracking-extra font-bold mb-10 pb-6 border-b border-luxury-gray-light">Order Summary</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between text-xs tracking-widest uppercase">
                                    <span className="text-luxury-gray-medium">Subtotal</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-xs tracking-widest uppercase">
                                    <span className="text-luxury-gray-medium">Shipping</span>
                                    {shippingPrice === 0 ? (
                                        <span className="text-luxury-gold">Complimentary</span>
                                    ) : (
                                        <span>{formatCurrency(shippingPrice)}</span>
                                    )}
                                </div>
                                <div className="flex justify-between text-xs tracking-widest uppercase">
                                    <span className="text-luxury-gray-medium">Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-luxury-black mb-12 flex justify-between items-baseline">
                                <span className="text-[11px] uppercase tracking-extra font-bold text-luxury-black">Estimated Total</span>
                                <span className="text-2xl font-light tracking-tight">{formatCurrency(finalTotal)}</span>
                            </div>

                            <Link to="/checkout" className="luxury-button w-full flex items-center justify-center gap-4 group">
                                Checkout Now
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                            </Link>

                            <div className="mt-8 text-[9px] uppercase tracking-widest text-center text-luxury-gray-medium leading-relaxed">
                                Prices include all local taxes. Secure payment guaranteed.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

