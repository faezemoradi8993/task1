import React from "react";
import "./button.styles.css";

function Button({ onClick, title, isActive, type, style }) {
  switch (type) {
    case "primary":
      return (
        <button
          style={style}
          onClick={onClick}
          className={isActive ? "fm-btn fm-btn--active" : "fm-btn "}
        >
          {title}
        </button>
      );
    case "danger":
      return (
        <button
          style={style}
          onClick={onClick}
          className={isActive ? "fm-btn-d fm-btn-d--active" : "fm-btn-d "}
        >
          {title}
        </button>
      );

    default:
      return (
        <button
          style={style}
          onClick={onClick}
          className={isActive ? "fm-btn fm-btn--active" : "fm-btn "}
        >
          {title}
        </button>
      );
  }
}

export default Button;
