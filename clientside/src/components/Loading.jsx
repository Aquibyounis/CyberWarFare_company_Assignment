function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[400px] pt-20">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>
        </div>
    );
}

export default Loading;
