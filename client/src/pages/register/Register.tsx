import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate, NavLink } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../config/firebase';
interface Post{
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
}

interface User {
    name: string;
    email: string;
    phone: string;
    password: string;
    rePassword: string;
    role: string;
    status: "ACTIVE" | "NOT-ACTIVE" | "BANNED";
    posts: Post[]
}

export default function Register() {
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
        role: 'USER',
        status: 'NOT-ACTIVE',
        posts: []

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

        if (formData.password !== formData.rePassword) {
            alert('Mật khẩu không khớp');
            return;
        }


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(formData.password, salt);

        try {
            const response = await axios.post('http://localhost:8888/users', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: hashedPassword,
                role: formData.role,
                status: formData.status,
                posts: []
            });

            if (response.status === 201) {
                alert('Đăng ký thành công');
                navigate('/login');
            } else {
                alert('Đăng ký không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký người dùng:', error);
            alert('Đã xảy ra lỗi trong quá trình đăng ký');
        }
    };

    return (
        <div className="border border-solid border-gray-300 p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                    />
                </div>
                <div className="mb-4">
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rePassword">Re-enter Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register
                </button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-gray-700 text-sm">
                    Bạn đã có tài khoản?{' '}
                    <NavLink to="/login" className="text-blue-500 hover:text-blue-800 font-bold">Đăng nhập</NavLink>
                </p>
            </div>
        </div>
    );
}
