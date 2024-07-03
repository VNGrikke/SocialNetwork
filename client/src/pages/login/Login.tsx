import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8888/users?email=${formData.email}`);
            const user = response.data[0];

            if (user && bcrypt.compareSync(formData.password, user.password)) {
                alert('Đăng nhập thành công');
                navigate('/home');
            } else {
                alert('Email hoặc mật khẩu không đúng');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            alert('Đã xảy ra lỗi trong quá trình đăng nhập');
        }
    };

    return (
        <div className="border border-solid border-gray-300 p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between mb-6">
                    <label className="inline-flex items-center text-sm text-gray-700">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="ml-2">Remember me</span>
                    </label>
                    <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Login
                </button>
                <div className="mt-6 text-center">
                    <p className="text-gray-700 text-sm">
                        Tôi không có tài khoản?{' '}
                        <NavLink to="/register" className="text-blue-500 hover:text-blue-800 font-bold">Đăng ký</NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
}
