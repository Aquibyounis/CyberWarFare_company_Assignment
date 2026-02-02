import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUser } from '../utils/auth';

function Navbar() {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">🎓</span>
                        </div>
                        <span className="text-xl font-bold gradient-text">CourseHub</span>
                    </Link>

                    {/* Black Friday Badge */}
                    <div className="hidden md:flex items-center">
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            🔥 BLACK FRIDAY SALE
                        </span>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-4">
                        {authenticated ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                                >
                                    Courses
                                </Link>
                                <Link
                                    to="/my-courses"
                                    className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                                >
                                    My Courses
                                </Link>
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
                                    <span className="text-gray-400 text-sm">
                                        {user?.name || user?.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-600/20 text-red-400 hover:bg-red-600/30 px-4 py-2 rounded-lg transition-colors text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn-primary text-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
