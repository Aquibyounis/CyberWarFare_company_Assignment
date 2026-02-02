import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyCourses } from '../services/api';
import Loading from '../components/Loading';

function MyCourses() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            const data = await getMyCourses();
            setSubscriptions(data);
        } catch (err) {
            setError('Failed to load your courses. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return <Loading />;

    return (
        <div className="animate-fade-in pt-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text mb-2">My Courses</h1>
                <p className="text-gray-500">
                    {subscriptions.length > 0
                        ? `You are enrolled in ${subscriptions.length} course${subscriptions.length > 1 ? 's' : ''}`
                        : 'You haven\'t enrolled in any courses yet'
                    }
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8">
                    {error}
                </div>
            )}

            {subscriptions.length > 0 ? (
                <div className="space-y-4">
                    {subscriptions.map(({ subscriptionId, course, pricePaid, subscribedAt }) => (
                        <div key={subscriptionId} className="card p-6 flex flex-col md:flex-row gap-6">
                            <div className="md:w-48 flex-shrink-0">
                                <img
                                    src={course?.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
                                    alt={course?.title}
                                    className="w-full h-32 md:h-full object-cover rounded-xl"
                                />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                            {course?.title || 'Course Unavailable'}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2">
                                            {course?.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        {pricePaid === 0 ? (
                                            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                                                FREE
                                            </span>
                                        ) : (
                                            <div>
                                                <span className="text-lg font-bold text-pink-600">${pricePaid.toFixed(2)}</span>
                                                <p className="text-gray-400 text-xs">paid</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <span>📅</span>
                                        <span>Enrolled: {formatDate(subscribedAt)}</span>
                                    </div>
                                    {pricePaid > 0 && (
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <span>💰</span>
                                            <span>Saved ${(course?.price - pricePaid).toFixed(2)} with promo</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                                        Start Learning →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card p-16 text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses yet</h3>
                    <p className="text-gray-500 mb-6">
                        Start your learning journey by enrolling in a course!
                    </p>
                    <Link to="/" className="btn-primary inline-block">
                        Browse Courses
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MyCourses;
