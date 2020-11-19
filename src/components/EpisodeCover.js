import React from "react";

import styles from "./EpisodeCover.module.scss";

const EpisodeCover = ({ currentEpisode, large }) => {
  return (
    <div className={styles.cover}>
      <img
        src={currentEpisode.cover.medium_url}
        alt={`Pochette de ${currentEpisode.title}`}
      />
    </div>
  );
};

export default EpisodeCover;
