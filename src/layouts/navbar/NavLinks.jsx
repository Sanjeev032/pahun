import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';

const NavLinks = React.memo(({ isAdmin }) => {
    return (
        <ul className="flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-[0.1em] text-gray-700">
            {NAV_LINKS.map((link) => (
                <li key={link.name}>
                    <Link 
                        to={link.href} 
                        className="hover:text-luxury-gold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-luxury-gold hover:after:w-full after:transition-all"
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
            {isAdmin && (
                <li>
                    <Link 
                        to="/admin" 
                        className="text-luxury-gold font-black hover:text-luxury-gold/80 transition-all flex items-center gap-1.5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                        Admin
                    </Link>
                </li>
            )}
        </ul>
    );
});

export default NavLinks;
