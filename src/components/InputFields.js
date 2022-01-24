import React, { forwardRef, useState } from 'react';

// styles implemeted in '../styles/components/inputFields.scss'

export const BasicInput = forwardRef(
  (
    { className = '', type = 'text', placeholder = '', name, id, onChange },
    ref
  ) => {
    return (
      <input
        className={`basic-input ${className}`}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        ref={ref}
        onChange={onChange}
      />
    );
  }
);

export const PasswordInput = forwardRef(
  ({ className = '', placeholder = '', name, id, onChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="password-input-container">
        <BasicInput
          className={className}
          placeholder={placeholder}
          name={name}
          id={id}
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => {
            setShowPassword(prev => !prev);
          }}
        >
          {!showPassword && <i className="far fa-eye" />}
          {showPassword && <i className="far fa-eye-slash" />}
        </button>
      </div>
    );
  }
);
