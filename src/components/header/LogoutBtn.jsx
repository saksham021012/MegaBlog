import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            className="inline-block px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md transition-transform duration-200 hover:bg-red-600 hover:scale-105"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
