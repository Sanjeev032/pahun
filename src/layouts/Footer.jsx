import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, SOCIAL_LINKS, FOOTER_LINKS } from '../utils/constants';

const Footer = () => {
    return (
        <footer className="bg-luxury-black text-white pt-24 pb-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl tracking-extra font-light mb-8">{COMPANY_NAME}</h2>
                        <p className="text-luxury-gray-medium max-w-sm mb-10 text-sm leading-relaxed font-light tracking-wide">
                            Defining the future of luxury through heritage craftsmanship and visionary design. Join us in the pursuit of timeless elegance.
                        </p>
                        <div className="flex gap-8">
                            <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-luxury-gray-medium hover:text-luxury-gold transition-all"><Instagram size={20} strokeWidth={1} /></a>
                            <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noopener noreferrer" className="text-luxury-gray-medium hover:text-luxury-gold transition-all"><Twitter size={20} strokeWidth={1} /></a>
                            <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-luxury-gray-medium hover:text-luxury-gold transition-all"><Facebook size={20} strokeWidth={1} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-semibold mb-8">The House</h4>
                        <ul className="flex flex-col gap-4 text-sm text-luxury-gray-medium font-light">
                            {FOOTER_LINKS.HOUSE.map(link => (
                                <li key={link.name}><Link to={link.href} className="hover:text-white transition-all">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-semibold mb-8">Support</h4>
                        <ul className="flex flex-col gap-4 text-sm text-luxury-gray-medium font-light">
                            {FOOTER_LINKS.SUPPORT.map(link => (
                                <li key={link.name}><Link to={link.href} className="hover:text-white transition-all">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-semibold mb-8">Newsletter</h4>
                        <p className="text-xs text-luxury-gray-medium mb-8 uppercase tracking-widest leading-loose">
                            Join the {COMPANY_NAME.toLowerCase()} circle for early access and editorial stories.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-luxury-gray-dark py-4 text-[10px] tracking-widest focus:outline-none focus:border-luxury-gold transition-all uppercase placeholder:text-luxury-gray-dark"
                            />
                            <button className="absolute right-0 bottom-4 text-[10px] tracking-widest uppercase font-semibold text-luxury-gray-medium group-hover:text-luxury-gold transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-luxury-gray-dark text-[9px] tracking-[.4em] uppercase text-luxury-gray-medium">
                    <p>&copy; {new Date().getFullYear()} {COMPANY_NAME} Couture. All Rights Reserved.</p>
                    <div className="flex gap-10 mt-6 md:mt-0">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

