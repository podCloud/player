import React from "react";

const FullScreenIcon = ({ color = "#FFF", className }) => (
  <svg
    viewBox="0 0 1000 1000"
    fill={color}
    className={className}
    style={{ margin: "0 10px" }}
  >
    <path d="M647.23 58.31v48.31h175.99L697.15 232.69 571.31 358.52l34.97 35.2 35.2 34.97 125.84-125.84 126.07-126.06v175.99H990V10H647.23v48.31zM232.46 697.38L106.62 823.22V647.23H10V990h342.77v-96.62H176.78L301.7 768.46c68.55-68.55 124.69-125.84 124.69-126.99 0-1.38-15.18-17.71-34.05-36.35l-33.82-33.82-126.06 126.08z" />
  </svg>
);

export default React.memo(FullScreenIcon);
