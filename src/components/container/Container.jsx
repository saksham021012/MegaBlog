import React from "react";

function Container({ children }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-6 bg-gray-200 shadow-lg rounded-lg border border-gray-300">
            {children}
        </div>
    );
}

export default Container;
