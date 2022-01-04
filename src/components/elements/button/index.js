import React from 'react';
import "./button.styles.css"

function Button({onClick , title ,isActive}) {
    return (
        <button
        onClick={onClick}
        className={isActive?"fm-btn fm-btn--active" : "fm-btn "}
      >
        {title}
      </button>
    )
}

export default Button;