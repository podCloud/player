import React from "react";

const PlayIcon = ({ color = "#FFF", className }) => (
  <svg fill={color} className={className} viewBox="0 0 36 36">
    <path d="M12.233 7.68l15.75 10.124c.69.443.69 1.45 0 1.892L12.233 29.82a1.125 1.125 0 01-1.733-.947V8.627c0-.89.985-1.428 1.733-.947z" />
  </svg>
);

export default React.memo(PlayIcon);
