import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black placeholder-gray-500 outline-none duration-200 transition-all ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
