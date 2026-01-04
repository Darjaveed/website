/**
 * VideoThumbnail Component
 * Displays a video thumbnail with play button overlay
 * Currently placeholder component for future video functionality
 */

const VideoThumbnail = ({ src, alt = "Video thumbnail", className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
        {src ? (
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity cursor-pointer">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
            <svg 
              className="w-8 h-8 text-blue-600 ml-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;

