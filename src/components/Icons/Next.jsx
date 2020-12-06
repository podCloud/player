import React from "react";

const NextIcon = ({ color = "#FFF", className }) => (
  <svg
    fill="none"
    strokeLinecap="square"
    strokeMiterlimit="10"
    viewBox="0 0 40 40"
  >
    <clipPath id="a">
      <path d="M0 0h40v40H0V0z" />
    </clipPath>
    <g clip-path="url(#a)">
      <path fill="none" d="M0 0h40v40H0z" />
      <path
        fill="none"
        d="M19.147 5.167a15.969 15.969 0 1010.035 27.8L18.474 21.121zM19.147 5.167a15.969 15.969 0 1010.035 27.8"
      />
      <path
        stroke={color}
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M19.147 5.167h0a15.969 15.969 0 1010.035 27.8"
      />
      <path
        fill={color}
        fillRule="evenodd"
        d="M18.448 9.93l8.063-4.66L18.448.607z"
      />
      <path fill="none" d="M2.504 9.767h42.835v22.551H2.504z" />
      <path
        fill={color}
        d="M20.275 28.243h-2.828V17.368l-3.375 1.047v-2.297l5.89-2.11h.313v14.235zm5.037-7l.812-7.219h7.97v2.36h-5.657l-.344 3.046q1-.531 2.14-.531 2.032 0 3.173 1.266 1.156 1.25 1.156 3.515 0 1.375-.578 2.469-.578 1.094-1.672 1.703-1.078.594-2.547.594-1.297 0-2.406-.516-1.094-.531-1.735-1.484-.64-.953-.671-2.156h2.78q.095.89.626 1.39.531.485 1.39.485.954 0 1.47-.688.53-.687.53-1.953 0-1.203-.609-1.844-.594-.656-1.687-.656-1 0-1.625.531l-.266.25-2.25-.562z"
      />
    </g>
  </svg>
);

export default React.memo(NextIcon);
