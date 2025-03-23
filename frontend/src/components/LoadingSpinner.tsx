/**
 * LoadingSpinner component
 * @returns
 */
export const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md flex flex-col items-center">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-indigo-600/30 rounded-full"></div>

        {/* Animated arc */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-blue-500 rounded-full animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-0 m-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
      </div>
      <p className="text-blue-100 font-medium">Please wait....</p>
      <p className="text-gray-300 text-sm mt-2">
        Please wait while we process your request
      </p>
    </div>
  </div>
);
