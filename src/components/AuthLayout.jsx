import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const checkAuth = () => {
            if (authentication && authStatus !== authentication) {
                navigate("/login");
            } else if (!authentication && authStatus !== authentication) {
                navigate("/");
            } else {
                setLoader(false);
            }
        };

        checkAuth();
    }, [authStatus, navigate, authentication]);

    return (
        loader ? (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-lg font-semibold text-gray-700">Loading...</h1>
            </div>
        ) : (
            <>{children}</>
        )
    );
}
