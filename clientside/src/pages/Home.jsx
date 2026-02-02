import { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

function Home() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (err) {
            setError('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="animate-fade-in pt-20">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="inline-block mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                        🔥 BLACK FRIDAY SALE - 50% OFF ALL PAID COURSES
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Learn & Grow</span>
                    <br />
                    <span className="text-gray-800">With Our Courses</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    Unlock your potential with our curated collection of courses.
                </p>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8 text-center">
                    {error}
                </div>
            )}

            {/* Courses Grid */}
            {courses.length > 0 ? (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Available Courses</h2>
                        <span className="text-gray-500 text-sm">{courses.length} courses</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses available</h3>
                    <p className="text-gray-500">Check back later for new courses!</p>
                </div>
            )}
        </div>
    );
}

export default Home;
