import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, subscribe, validatePromo } from '../services/api';
import Loading from '../components/Loading';

function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);

    // Promo code state
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [promoLoading, setPromoLoading] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const data = await getCourse(id);
            setCourse(data);
        } catch (err) {
            setError('Failed to load course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) {
            setPromoError('Please enter a promo code');
            return;
        }

        setPromoLoading(true);
        setPromoError('');

        try {
            const data = await validatePromo(id, promoCode);
            if (data.valid) {
                setPromoApplied(true);
                setDiscountedPrice(data.discountedPrice);
            }
        } catch (err) {
            setPromoError(err.response?.data?.message || 'Invalid promo code');
            setPromoApplied(false);
        } finally {
            setPromoLoading(false);
        }
    };

    const handleSubscribe = async () => {
        setSubscribing(true);
        setError('');

        try {
            const promoToSend = course.price > 0 ? promoCode : null;
            await subscribe(id, promoToSend);
            setSubscribeSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
        } finally {
            setSubscribing(false);
        }
    };

    if (loading) return <Loading />;

    if (!course) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-xl font-semibold text-white mb-2">Course not found</h3>
                <button onClick={() => navigate('/')} className="btn-primary mt-4">
                    Back to Courses
                </button>
            </div>
        );
    }

    const isFree = course.price === 0;

    // Success state
    if (subscribeSuccess) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
                <div className="card p-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✓</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Successfully Subscribed!</h2>
                    <p className="text-gray-400 mb-6">
                        You now have access to <strong className="text-white">{course.title}</strong>
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => navigate('/my-courses')} className="btn-primary">
                            View My Courses
                        </button>
                        <button onClick={() => navigate('/')} className="btn-secondary">
                            Browse More Courses
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
                ← Back to Courses
            </button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Course Image */}
                <div className="card overflow-hidden">
                    <img
                        src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'}
                        alt={course.title}
                        className="w-full h-64 md:h-full object-cover"
                    />
                </div>

                {/* Course Details */}
                <div className="space-y-6">
                    {/* Title & Price */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            {isFree ? (
                                <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    FREE
                                </span>
                            ) : (
                                <>
                                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        ${course.price}
                                    </span>
                                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                                        50% OFF with promo
                                    </span>
                                </>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                    </div>

                    {/* Description */}
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">About this course</h3>
                        <p className="text-gray-400 leading-relaxed">{course.description}</p>
                    </div>

                    {/* Subscription Section */}
                    <div className="card p-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {/* FREE Course */}
                        {isFree ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Price:</span>
                                    <span className="text-2xl font-bold text-green-400">FREE</span>
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    disabled={subscribing}
                                    className="btn-primary w-full disabled:opacity-50"
                                >
                                    {subscribing ? 'Subscribing...' : 'Subscribe Now - FREE'}
                                </button>
                            </div>
                        ) : (
                            /* PAID Course */
                            <div className="space-y-4">
                                {/* Promo Code Input */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Promo Code (Required for paid courses)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => {
                                                setPromoCode(e.target.value.toUpperCase());
                                                setPromoError('');
                                                setPromoApplied(false);
                                            }}
                                            placeholder="Enter promo code"
                                            className="input-field flex-1"
                                            disabled={promoApplied}
                                        />
                                        <button
                                            onClick={handleApplyPromo}
                                            disabled={promoLoading || promoApplied}
                                            className="btn-secondary disabled:opacity-50"
                                        >
                                            {promoLoading ? '...' : promoApplied ? '✓ Applied' : 'Apply'}
                                        </button>
                                    </div>
                                    {promoError && (
                                        <p className="text-red-400 text-sm mt-2">{promoError}</p>
                                    )}
                                    {promoApplied && (
                                        <p className="text-green-400 text-sm mt-2">✓ Promo code applied! 50% discount</p>
                                    )}
                                </div>

                                {/* Hint */}
                                <div className="bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 rounded-xl">
                                    <p className="text-yellow-400 text-sm">
                                        💡 Hint: Use code <strong>BFSALE25</strong> for 50% off!
                                    </p>
                                </div>

                                {/* Price Summary */}
                                <div className="space-y-2 pt-4 border-t border-gray-700">
                                    <div className="flex items-center justify-between text-gray-400">
                                        <span>Original Price:</span>
                                        <span className={promoApplied ? 'line-through' : ''}>${course.price}</span>
                                    </div>
                                    {promoApplied && (
                                        <>
                                            <div className="flex items-center justify-between text-green-400">
                                                <span>Discount (50%):</span>
                                                <span>-${(course.price * 0.5).toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-white text-xl font-bold pt-2 border-t border-gray-700">
                                                <span>Final Price:</span>
                                                <span className="text-pink-400">${discountedPrice?.toFixed(2)}</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Subscribe Button */}
                                <button
                                    onClick={handleSubscribe}
                                    disabled={subscribing || !promoApplied}
                                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {subscribing ? 'Subscribing...' : promoApplied ? `Subscribe - $${discountedPrice?.toFixed(2)}` : 'Apply Promo Code First'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
