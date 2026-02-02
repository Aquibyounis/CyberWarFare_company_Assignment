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
        <nav className="fixed top-[10px] left-1/2 -translate-x-1/2 w-[80svw] bg-white/90 backdrop-blur-xl border border-gray-200 rounded-[25px] z-50 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">🎓</span>
                        </div>
                        <span className="text-xl font-bold gradient-text">CourseHub</span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center space-x-4">
                        {authenticated ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
                                >
                                    Courses
                                </Link>
                                <Link
                                    to="/my-courses"
                                    className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
                                >
                                    My Courses
                                </Link>
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                                    <span className="text-gray-500 text-sm">
                                        {user?.name || user?.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
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
