import React from "react";

const Button = ({ text, onClick, type = "button", className, image }) => {
  return (
    <div>
      <button onClick={onClick} className={`cursor-pointer ${className}`}>
        {text}
        <img src={image} />
      </button>
    </div>
  );
};

export default Button;
