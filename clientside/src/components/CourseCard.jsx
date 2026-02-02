import { Link } from 'react-router-dom';

function CourseCard({ course }) {
    const isFree = course.price === 0;

    return (
        <Link to={`/course/${course._id}`} className="card group overflow-hidden animate-fade-in">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                    {isFree ? (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            FREE
                        </span>
                    ) : (
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ${course.price}
                        </span>
                    )}
                </div>
                {/* Black Friday Badge for paid courses */}
                {!isFree && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            50% OFF
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                    {course.description}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                        {isFree ? (
                            <span className="text-green-600 font-medium">Enroll Now</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <span className="line-through text-gray-400">${course.price}</span>
                                <span className="text-pink-600 font-semibold">${(course.price * 0.5).toFixed(2)}</span>
                            </span>
                        )}
                    </div>
                    <span className="text-purple-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        View →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default CourseCard;
