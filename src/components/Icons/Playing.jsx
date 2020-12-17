import React from "react";

const PlayingIcon = ({ color = "#FFF", className }) => (
  <svg fill={color} className={className} viewBox="0 0 100 100">
    <g transform="rotate(180 50 50)">
      <rect height="74.5573" x="15" width="20">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.6666666666666666s"
          dur="2s"
        ></animate>
      </rect>
      <rect height="11.1511" x="40" width="20">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="0s"
          dur="2s"
        ></animate>
      </rect>
      <rect height="49.2916" x="65" width="20">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.3333333333333333s"
          dur="2s"
        ></animate>
      </rect>
    </g>
  </svg>
);

export default React.memo(PlayingIcon);
