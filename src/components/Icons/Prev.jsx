import React from "react";

const PrevIcon = ({ color = "#FFF", className }) => (
  <svg
    fill="none"
    strokeLinecap="square"
    strokeMiterlimit="10"
    viewBox="0 0 40 40"
  >
    <clipPath id="a">
      <path d="M0 0h40v40H0V0z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path fill="none" d="M0 0h40v40H0z" />
      <path
        fill="none"
        d="M20.895 5.167a15.969 15.969 0 11-10.036 27.8l10.71-11.846zM20.895 5.167a15.969 15.969 0 11-10.036 27.8"
      />
      <path
        stroke={color}
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M20.895 5.167h0a15.969 15.969 0 11-10.036 27.8"
      />
      <path
        fill={color}
        fill-rule="evenodd"
        d="M21.593 9.93L13.53 5.27 21.593.607z"
      />
      <path fill="none" d="M-6.467 9.854h42.834v22.551H-6.467z" />
      <path
        fill={color}
        d="M11.304 28.33H8.476V17.453L5.1 18.501v-2.297l5.89-2.109h.313v14.234zm5.037-7l.812-7.22h7.969v2.36h-5.656l-.344 3.047q1-.531 2.14-.531 2.032 0 3.173 1.265 1.156 1.25 1.156 3.516 0 1.375-.578 2.469-.578 1.093-1.672 1.703-1.078.594-2.547.594-1.297 0-2.406-.516-1.094-.531-1.735-1.484-.64-.954-.672-2.157h2.782q.093.89.625 1.39.53.485 1.39.485.953 0 1.469-.687.531-.688.531-1.953 0-1.203-.61-1.844-.593-.656-1.687-.656-1 0-1.625.53l-.265.25-2.25-.562z"
      />
    </g>
  </svg>
);

export default React.memo(PrevIcon);
