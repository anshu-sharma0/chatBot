export const Input = ({ value, setPrompt, placeholder, className = '', onFocus, onBlur }) => (
  <input
    type="text"
    value={value}  // Controlled input value
    onChange={(e) => setPrompt(e.target.value)}  // Update state on input change
    placeholder={placeholder}
    onFocus={onFocus}
    onBlur={onBlur}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
)
