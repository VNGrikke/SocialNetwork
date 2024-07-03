import { NavLink } from 'react-router-dom';

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            <NavLink to="/" className="text-blue-500 hover:text-blue-700 font-bold">
                Go to Home
            </NavLink>
        </div>
    );
}
