import React from "react"

export const Button = ({ children, onClick, type = 'button', className = '', disabled }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` text-white rounded-md ${className}`}
    >
      {children}
    </button>
  )
  