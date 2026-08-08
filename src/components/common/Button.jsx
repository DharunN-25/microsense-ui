import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold rounded-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 text-white border border-blue-600 shadow-[0_12px_30px_-20px_rgba(37,99,235,0.75)] hover:bg-blue-700 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.45)]',
    secondary: 'bg-white text-slate-700 border border-slate-300 shadow-sm hover:bg-slate-50',
    outline: 'bg-transparent text-blue-600 border border-blue-200 hover:bg-blue-50',
    teal: 'bg-teal-600 text-white border border-teal-600 shadow-sm hover:bg-teal-700',
    danger: 'bg-rose-600 text-white border border-rose-600 shadow-sm hover:bg-rose-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-[22px] h-[22px]" />}
      {children}
    </button>
  );
};

export default Button;
