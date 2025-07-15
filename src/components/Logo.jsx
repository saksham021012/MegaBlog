import React from 'react';

function Logo({ width = '100px' }) {
    return (
        <div
            style={{ width }}
            className="text-2xl font-bold text-blue-600 font-sans whitespace-nowrap"
        >
            Mega<span className="text-pink-500">Blog</span>
        </div>
    );
}

export default Logo;
