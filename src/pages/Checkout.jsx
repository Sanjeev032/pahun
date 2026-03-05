import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import { Check, ArrowRight, ShieldCheck, Truck, CreditCard, Lock } from 'lucide-react';
import SEO from '../components/common/SEO';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const { items, totalAmount } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingData, setShippingData] = useState({
        street: '', city: '', zip: '', phone: ''
    });

    const handleOrder = () => {
        setStep(4);
        setTimeout(() => {
            dispatch(clearCart());
            navigate('/profile');
        }, 3000);
    };

    const steps = [
        { id: 1, name: 'Shipping', icon: <Truck size={18} /> },
        { id: 2, name: 'Payment', icon: <CreditCard size={18} /> },
        { id: 3, name: 'Review', icon: <Check size={18} /> }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 bg-white">
            <SEO title="Checkout" description="Secure your Pahunn masterpiece. 3-step secure checkout process." />
            <div className="container-custom max-w-5xl">
                {/* Progress Bar */}
                <div className="mb-20">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-luxury-gray-light -z-10" />
                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-700 ${step >= s.id ? 'bg-luxury-black border-luxury-black text-white' : 'bg-white border-luxury-gray-light text-luxury-gray-medium'
                                    }`}>
                                    {step > s.id ? <Check size={18} /> : s.icon}
                                </div>
                                <span className={`text-[9px] uppercase tracking-widest font-bold ${step >= s.id ? 'text-luxury-black' : 'text-luxury-gray-medium'
                                    }`}>{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <h2 className="text-2xl font-light uppercase tracking-extra">Shipping Address</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Street Address</label>
                                            <input type="text" className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold uppercase" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">City</label>
                                            <input type="text" className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold uppercase" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gray-medium">Zip Code</label>
                                            <input type="text" className="w-full bg-transparent border-b border-luxury-gray-light py-3 text-xs tracking-widest focus:outline-none focus:border-luxury-gold uppercase" />
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(2)} className="luxury-button w-full">Continue to Payment</button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <h2 className="text-2xl font-light uppercase tracking-extra">Secure Payment</h2>
                                    <div className="space-y-8 p-10 bg-luxury-ivory/50 border border-luxury-gray-light rounded-sm">
                                        <div className="flex items-center gap-4 py-4 border-b border-luxury-gray-light text-[10px] uppercase tracking-widest font-bold">
                                            <div className="w-4 h-4 rounded-full border-2 border-luxury-gold" />
                                            Credit / Debit Card (Stripe Secure)
                                        </div>
                                        <div className="flex gap-2 mb-4">
                                            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                                            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                                            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                                        </div>
                                        <div className="space-y-6 pt-4">
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase tracking-widest text-luxury-gray-medium">Card Number</label>
                                                <input placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-transparent border-b border-luxury-gray-light py-2 text-xs tracking-widest focus:outline-none font-mono" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] uppercase tracking-widest text-luxury-gray-medium">Expiry</label>
                                                    <input placeholder="MM / YY" className="w-full bg-transparent border-b border-luxury-gray-light py-2 text-xs tracking-widest focus:outline-none font-mono" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] uppercase tracking-widest text-luxury-gray-medium">CVV</label>
                                                    <input placeholder="***" className="w-full bg-transparent border-b border-luxury-gray-light py-2 text-xs tracking-widest focus:outline-none font-mono" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(1)} className="luxury-button-outline flex-1">Back</button>
                                        <button onClick={() => setStep(3)} className="luxury-button flex-1">Review Order</button>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-luxury-gray-medium">
                                        <ShieldCheck size={16} />
                                        <span className="text-[9px] uppercase tracking-widest">SSL Encrypted Secure Payment</span>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-12"
                                >
                                    <h2 className="text-2xl font-light uppercase tracking-extra">Final Review</h2>
                                    <div className="space-y-6">
                                        {items.slice(0, 2).map(item => (
                                            <div key={item.id} className="flex justify-between items-center text-xs uppercase tracking-widest">
                                                <span>{item.name} (x{item.quantity})</span>
                                                <span className="font-bold">₹{item.totalPrice.toLocaleString()}</span>
                                            </div>
                                        ))}
                                        {items.length > 2 && <p className="text-[10px] text-luxury-gray-medium uppercase tracking-widest italic">+ {items.length - 2} more items</p>}
                                    </div>
                                    <div className="p-10 border-t border-luxury-black">
                                        <div className="flex justify-between items-baseline mb-12">
                                            <span className="text-sm uppercase tracking-extra font-bold">Total Amount Due</span>
                                            <span className="text-3xl font-light">₹{totalAmount.toLocaleString()}</span>
                                        </div>
                                        <button onClick={handleOrder} className="luxury-button w-full shadow-xl shadow-luxury-black/10">Complete Purchase</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-10">
                                        <Check size={40} />
                                    </div>
                                    <h2 className="text-3xl font-light uppercase tracking-extra mb-4">Masterpiece Secured</h2>
                                    <p className="text-[10px] uppercase tracking-widest text-luxury-gray-medium">
                                        Your order is being prepared in our atelier. <br /> Redirecting to your archive...
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Section / Info */}
                    <div className="w-full lg:w-80">
                        <div className="p-8 bg-luxury-ivory border border-luxury-gray-light">
                            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Shopping Policy</h4>
                            <ul className="space-y-4 text-[9px] uppercase tracking-widest text-luxury-gray-medium leading-relaxed font-light">
                                <li className="flex gap-3"><span>•</span> Complimentary express delivery across India.</li>
                                <li className="flex gap-3"><span>•</span> Signature white-glove packaging included.</li>
                                <li className="flex gap-3"><span>•</span> 14-day boutique exchange policy.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
