import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = React.memo(() => {
    return (
        <div className="flex-1 max-w-md relative group">
            <input
                type="text"
                placeholder="Search for premium fashion..."
                className="w-full bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100 focus:bg-white focus:border-luxury-gold/30 focus:outline-none transition-all text-sm pl-12"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-luxury-gold transition-colors" size={18} />
        </div>
    );
});

export default SearchBar;
