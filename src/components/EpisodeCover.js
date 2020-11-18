import React from "react";

import styles from "./EpisodeCover.module.scss";

const EpisodeCover = ({ currentEpisode, large }) => {
  return (
    <div
      className={large ? styles.large_cover : styles.cover}
      style={{ backgroundImage: `url(${currentEpisode.cover.medium_url})` }}
      alt={`Pochette de ${currentEpisode.title}`}
      aria-label={`Pochette de ${currentEpisode.title}`}
    ></div>
  );
};

export default EpisodeCover;
