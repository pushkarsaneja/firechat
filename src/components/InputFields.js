import React, { forwardRef, useEffect, useRef, useState } from 'react';

// styles implemeted in '../styles/components/inputFields.scss'

export const BasicInput = forwardRef(
  (
    {
      className = '',
      type = 'text',
      placeholder = '',
      name,
      id,
      onChange,
      value,
    },
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
        value={value}
      />
    );
  }
);

export const PasswordInput = forwardRef(
  ({ className = '', placeholder = '', name, id, onChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inFocus, setInFocus] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
      inputRef.current.addEventListener('focusin', () => {
        setInFocus(true);
      });

      inputRef.current.addEventListener('focusout', () => {
        setInFocus(false);
      });

      if (inFocus) {
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
      }
    });

    return (
      <div className="password-input-container">
        <BasicInput
          className={className}
          placeholder={placeholder}
          name={name}
          id={id}
          type={showPassword ? 'text' : 'password'}
          ref={inputRef}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => {
            setShowPassword(prev => !prev);
            inputRef.current.focus();
          }}
        >
          {!showPassword && <i className="far fa-eye" />}
          {showPassword && <i className="far fa-eye-slash" />}
        </button>
      </div>
    );
  }
);
