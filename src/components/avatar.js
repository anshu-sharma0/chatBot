export const Avatar = ({ src, alt, fallback }) => (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm font-medium text-gray-600">{fallback}</span>
      )}
    </div>
  )