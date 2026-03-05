import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#121212] text-white pt-20 pb-10">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl mb-8 tracking-[.2em] font-light">PAHUNN</h2>
                        <p className="text-gray-400 max-w-sm mb-8 text-sm leading-relaxed tracking-wide">
                            Pahunn is a luxury fashion house dedicated to the art of fine craftsmanship and modern elegance. Each piece is a testament to our commitment to quality and timeless design.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-[.2em]">Instagram</a>
                            <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-[.2em]">Twitter</a>
                            <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-[.2em]">Pinterest</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-[.2em] mb-8 font-medium">Boutique</h4>
                        <ul className="flex flex-col gap-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">The Collection</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bespoke Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-[.2em] mb-8 font-medium">Newsletter</h4>
                        <p className="text-sm text-gray-400 mb-6">Join our list for exclusive previews and editorial updates.</p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors uppercase"
                            />
                            <button className="absolute right-0 bottom-3 text-[10px] tracking-widest uppercase hover:text-gold transition-colors">Join</button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-[10px] tracking-[.3em] uppercase text-gray-500">
                    <p>&copy; 2026 Pahunn Luxury. All Rights Reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
