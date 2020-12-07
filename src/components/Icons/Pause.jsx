import React from "react";

const PauseIcon = ({ color = "#FFF", className }) => (
  <svg viewBox="0 0 24 24" fill={color} class={className}>
    <path d="M10 3a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1h4zm8 0a1 1 0 011 1v16a1 1 0 01-1 1h-4a1 1 0 01-1-1V4a1 1 0 011-1h4z" />
  </svg>
);

export default React.memo(PauseIcon);
