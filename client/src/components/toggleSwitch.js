import React from "react";
import "../styles/toggleSwitch.css";

const ToggleSwitch = ({ name, checked, change }) => {
  return (
    <div className="toggle-switch" onClick={() => change(!checked)}>
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={name}
        checked={checked}
        onChange={(e) => change(e.target.checked)}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner"></span>
        <span className="toggle-switch-switch"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
