import React from "react";

const BackgroundCover = ({ currentEpisode }) => (
  <div
    style={{
      backgroundImage: `url(${currentEpisode.cover.small_url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(50px)",
      transform: "scale(1.25)",
      position: "fixed",
      bottom: 0,
      right: 0,
      width: "100vw",
      height: "100vh",
      zIndex: -1,
      overflow: "hidden",
    }}
  ></div>
);

export default BackgroundCover;
