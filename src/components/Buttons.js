import React from 'react';

// styles implemented in "../styles/components/buttons.scss"

// if active, buttons have background of primary colour.
// if not active, buttons have transparent background and border of primary color.
// <span>(provided as children using props) inside PrimaryButton1 and PrimaryButton2
// will disappear on smaller screens
// slim property will make the button shorter in height and font size is also reduced

export const PrimaryButton1 = React.forwardRef(
  ({ active, children, onClick, id, slim, hide, disabled, className }, ref) => {
    return (
      <button
        type="button"
        className={`primary-button-1 ${active ? ' active' : ''} ${
          slim ? 'slim-button' : ''
        } ${hide ? 'hide' : ''} ${
          disabled ? 'disable-button' : ''
        } ${className}`}
        onClick={onClick}
        id={id}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export const PrimaryButton2 = React.forwardRef(
  ({ active, children, onClick, id, slim, hide, disabled, className }, ref) => {
    return (
      <button
        type="button"
        className={`primary-button-2 ${active ? 'active' : ''} ${
          slim ? 'slim-button' : ''
        } ${hide ? 'hide' : ''} ${
          disabled ? 'disable-button' : ''
        } ${className}`}
        onClick={onClick}
        id={id}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

// FileSelector returns a circular label to the input[type="file"] element.
// The actual input itself is hidden.
// an id must be provided while using.
// children can be <div> or <i>.
// accept takes in a string of acceptable file types. eg: ".jpeg,.jpg,.png".
// if active, buttons have background of primary colour.
// if not active, buttons have transparent background and border of primary color.
// small makes the button smaller on screens with width less than 500px

export const FileSelector = ({
  children,
  id,
  active,
  accept,
  name,
  onChange,
  className,
  small,
}) => {
  return (
    <div className="file-selector-button">
      <label
        htmlFor={id}
        className={`${className} ${active ? `active` : ''} ${
          small ? 'small' : ''
        }`}
      >
        {children}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

// returns a circular button
// can take <i> or <div> as children through props.
export const CircularButton = ({
  active,
  children,
  onClick,
  id,
  className,
  small,
}) => {
  return (
    <div className={`circular-button-container ${className}`}>
      <button
        type="button"
        className={`circular-button ${active ? 'active' : ''} ${
          small ? 'small' : ''
        }`}
        onClick={onClick}
        id={id}
      >
        {children}
      </button>
    </div>
  );
};

//returns a close X button

export const CloseButton = ({ onClick, id, className }) => {
  return (
    <button
      type="button"
      className={`close-button ${className}`}
      onClick={onClick}
      id={id}
    >
      <i className="fas fa-times"></i>
    </button>
  );
};

// returns a transparent button with the icon inside it

export const IconAsButton = ({ children, onClick, id, className }) => {
  return (
    <button
      type="button"
      className={`icon-as-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
