import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { User } from '../../interfaces/interface';


export default function Register() {
    const [formData, setFormData] = useState<User>({
        avatarUrl: '',
        userName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
        role: 'USER',
        status: 'NOT-ACTIVE',
        posts: []
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const validate = async () => {
        const errors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            errors.name = 'Cần nhập tên';
        }

        if (!formData.email) {
            errors.email = 'Cần nhập email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email không hợp lệ';
        } else {
            const emailExists = await axios.get(`http://localhost:8888/users?email=${formData.email}`);
            if (emailExists.data.length > 0) {
                errors.email = 'Email đã được sử dụng';
            }
        }

        if (!formData.phone) {
            errors.phone = 'Cần nhập số điện thoại';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ';
        } else {
            const phoneExists = await axios.get(`http://localhost:8888/users?phone=${formData.phone}`);
            if (phoneExists.data.length > 0) {
                errors.phone = 'Số điện thoại đã được sử dụng';
            }
        }

        if (!formData.password) {
            errors.password = 'Cần nhập mật khẩu';
        } else if (formData.password.length < 6) {
            errors.password = 'Cần ít nhất 6 kí tự';
        }

        if (!formData.rePassword) {
            errors.rePassword = 'Cần nhập lại mật khẩu';
        } else if (formData.rePassword !== formData.password) {
            errors.rePassword = 'Mật khẩu nhập lại không khớp';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(formData.password, salt);
        e.preventDefault();

        if (!await validate()) {
            return;
        }

        try {

            const response = await axios.post('http://localhost:8888/users', {
                avatarUrl: '',
                userName:'',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: hashedPassword,
                role: formData.role,
                status: formData.status,
                posts: []
            });

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký người dùng:', error);
        }
    };

    return (
        <div className="border border-solid border-gray-300 p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                    <input
                        className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rePassword">Re-enter Password</label>
                    <input
                        className={`shadow appearance-none border ${errors.rePassword ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.rePassword && <p className="text-red-500 text-xs italic">{errors.rePassword}</p>}
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
