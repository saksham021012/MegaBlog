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
                id={id}
                ref={ref}
                {...props}
                className={`w-full px-3 py-2 rounded-md bg-white text-black border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition-all duration-200 ${className}`}
            />
        </div>
    );
});

export default Input;
